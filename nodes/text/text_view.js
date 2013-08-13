var DocumentNode = require('../node');
var Document = require("substance-document");
var Annotator = Document.Annotator;

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
    var el = document.createTextNode(this.node.content+" ");
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
    return Math.min(this.node.content.length, str.length);
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

  var createAnnotationElement = function(entry) {
    var el = document.createElement("SPAN");
    el.classList.add("annotation");
    el.classList.add(entry.type);
    el.setAttribute("id", entry.id);
    return el;
  };

  this.renderAnnotations = function(annotations) {
    var text = this.node.content;
    var fragment = document.createDocumentFragment();


    var fragmenter = new Annotator.Fragmenter(fragment, text, annotations);

    fragmenter.onText = function(context, text) {
      context.appendChild(document.createTextNode(text));
    };

    fragmenter.onEnter = function(entry, parentContext) {
      var el = createAnnotationElement(entry);
      parentContext.appendChild(el);
      return el;
    };

    // this calls onText and onEnter in turns...
    fragmenter.start(fragment, text, annotations);

    // append a trailing white-space to improve the browser's behaviour with softbreaks at the end
    // of a node.
    fragment.appendChild(document.createTextNode(" "));

    // set the content
    this.content.innerHTML = "";
    this.content.appendChild(fragment);
  };
};

TextView.Prototype.prototype = DocumentNode.View.prototype;
TextView.prototype = new TextView.Prototype();

module.exports = TextView;
