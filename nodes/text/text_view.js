var _ = require('underscore');
var DocumentNode = require('../node');

// Substance.Text.View
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

var TextView = function(node) {
  DocumentNode.View.call(this, node);

  this.$el.addClass('content-node text');
  this.$el.attr('id', this.node.id);
};

TextView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.content = $('<div class="content">')[0];
    this.$el.append(this.content);
    this.renderContent();
    return this;
  };

  this.dispose = function() {
    console.log('disposing paragraph view');
    this.stopListening();
  };

  this.renderContent = function() {
    var el = document.createTextNode(this.node.content);
    this.content.appendChild(el);
  };

  this.insert = function(pos, str) {
    var range = this.getDOMPosition(pos);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    var text = textNode.textContent;
    text = text.substring(0, offset) + str + text.substring(offset);
    textNode.textContent = text;
  };

  this.delete = function(pos, length) {
    var range = this.getDOMPosition(pos);
    var textNode = range.startContainer;
    var offset = range.startOffset;
    var text = textNode.textContent;
    text = text.substring(0, offset) + text.substring(offset+length);
    textNode.textContent = text;
  };

  this.getCharPosition = function(el, offset) {
    // lookup the given element and compute a
    // the corresponding char position in the plain document
    var range = document.createRange();

    range.setStart(this.content.childNodes[0], 0);
    range.setEnd(el, offset);
    var str = range.toString();
    return str.length;
  };

  // Returns the corresponding DOM element position for the given character
  // --------
  //
  // A DOM position is specified by a tuple of element and offset.
  // In the case of text nodes it is a TEXT element.

  this.getDOMPosition = function(charPos) {
    if (this.content === undefined) {
      throw new Error("Not rendered yet.");
    }

    var range = document.createRange();

    if (this.node.content.length === 0) {
      range.setStart(this.content.childNodes[0], 0);
      return range;
    }

    // if the requested charPos is at the end
    // return the last position immediately
    // if (charPos === this.node.content.length) {
    //   var last = _.last(this.content.childNodes);
    //   if (last.nodeType !== Node.TEXT_NODE) {
    //     last = document.createTextNode("");
    //     this.content.appendChild(last);
    //   }
    //   range.setStart(last, last.length);
    //   return range;
    // }

    // otherwise look for the containing node in DFS order
    // TODO: this could be optimized using some indexing or caching?
    var stack = [this.content];
    while(stack.length > 0) {
      var el = stack.pop();
      if (el.nodeType === Node.TEXT_NODE) {
        var text = el;
        if (text.length >= charPos) {
          range.setStart(el, charPos);
          return range;
        } else {
          charPos -= text.length;
        }
      } else if (el.childNodes.length > 0) {
        // push in reverse order to have a left bound DFS
        for (var i = el.childNodes.length - 1; i >= 0; i--) {
          stack.push(el.childNodes[i]);
        }
      }
    }

    throw new Error("should not reach here");
  };

  this.renderAnnotations = function(annotations) {
    var text = this.node.content;
    var fragment = TextView.createAnnotatedFragment(text, annotations);
    this.content.innerHTML = "";
    this.content.appendChild(fragment);
  };

  this.updateAnnotation = function(annotation) {
  };
};

TextView.Prototype.prototype = DocumentNode.View.prototype;
TextView.prototype = new TextView.Prototype();

// This is a sweep algorithm wich uses a set of ENTER/EXIT entries
// to manage a stack of active elements.
// Whenever a new element is entered it will be appended to its parent element.
// The stack is ordered by the annotation types.
//
// Examples:
//
// - simple case:
//
//       [top] -> ENTER(idea1) -> [top, idea1]
//
//   Creates a new 'idea' element and appends it to 'top'
//
// - stacked ENTER:
//
//       [top, idea1] -> ENTER(bold1) -> [top, idea1, bold1]
//
//   Creates a new 'bold' element and appends it to 'idea1'
//
// - simple EXIT:
//
//       [top, idea1] -> EXIT(idea1) -> [top]
//
//   Removes 'idea1' from stack.
//
// - reordering ENTER:
//
//       [top, bold1] -> ENTER(idea1) -> [top, idea1, bold1]
//
//   Inserts 'idea1' at 2nd position, creates a new 'bold1', and appends itself to 'top'
//
// - reordering EXIT
//
//       [top, idea1, bold1] -> EXIT(idea1)) -> [top, bold1]
//
//   Removes 'idea1' from stack and creates a new 'bold1'
//

// provisionally hard coded
var _levels = {
  idea: 1,
  question: 1,
  error: 1,
  link: 1,
  strong: 2,
  emphasis: 2,
  code: 2
};

var ENTER = 1;
var EXIT = -1;

// Orders sweep events according to following precedences:
//
// 1. pos
// 2. EXIT < ENTER
// 3. if both ENTER: ascending level
// 4. if both EXIT: descending level

var _compare = function(a, b) {
  if (a.pos < b.pos) return -1;
  if (a.pos > b.pos) return 1;

  if (a.mode < b.mode) return -1;
  if (a.mode > b.mode) return 1;

  if (a.mode === ENTER) {
    if (a.level < b.level) return -1;
    if (a.level > b.level) return 1;
  }

  if (a.mode === EXIT) {
    if (a.level > b.level) return -1;
    if (a.level < b.level) return 1;
  }

  return 0;
};

var extractEntries = function(annotations) {
  var entries = [];
  _.each(annotations, function(a) {
    var l = _levels[a.type];
    entries.push({ pos : a.range[0], mode: ENTER, level: l, id: a.id, type: a.type });
    entries.push({ pos : a.range[1], mode: EXIT, level: l, id: a.id, type: a.type });
  });
  return entries;
};

var createAnnotationElement = function(entry) {
  var el = document.createElement("SPAN");
  el.classList.add("annotation");
  el.classList.add(entry.type);
  el.setAttribute("data-id", entry.id);
  return el;
};

TextView.createAnnotatedFragment = function(text, annotations) {

  // sort annotations by range[0] and level
  var entries = extractEntries(annotations);
  entries.sort(_compare);

  var fragment = document.createDocumentFragment();
  var stack = [{entry: null, el: fragment }];

  var pos = 0;
  var el, level;

  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];

    // in any case we add the last text to the current element
    el = document.createTextNode(text.substring(pos, entry.pos));
    stack[stack.length-1].el.appendChild(el);
    pos = entry.pos;

    level = 1;
    if (entry.mode === ENTER) {
      // find the correct position and insert an entry
      for (; level < stack.length; level++) {
        if (_compare(entry, stack[level].entry) === 1) {
          break;
        }
      }
      stack.splice(level, 0, {entry: entry,  el: null});
    } else if (entry.mode === EXIT) {
      // find the according entry and remove it from the stack
      for (; level < stack.length; level++) {
        if (stack[level].entry.id === entry.id) {
          break;
        }
      }
      stack.splice(level, 1);
    }

    // create new elements for all lower entries
    for (; level < stack.length; level++) {
      el = createAnnotationElement(stack[level].entry);
      stack[level-1].el.appendChild(el);
      stack[level].el = el;
    }
  }

  // Finally append a trailing text node
  el = document.createTextNode(text.substring(pos));
  fragment.appendChild(el);

  return fragment;
};

module.exports = TextView;
