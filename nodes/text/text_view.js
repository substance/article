var _ = require('underscore');
var Node = require('../node');
var util = require("substance-util");
var html = util.html;

// Substance.Text.View
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

var TextView = function(node) {
  Node.View.call(this, node);

  this.$el.addClass('content-node text');
  this.$el.attr('id', this.node.id);
};

TextView.Prototype = function() {

  // Rendering
  // =============================
  //

  this.render = function() {
    this.$el.html(html.tpl('text', this.node));
    this.renderContent();
    return this;
  };

  this.dispose = function() {
    console.log('disposing paragraph view');
    this.stopListening();
  };

  this.renderContent = function() {
    this.$('.content').empty();
    this.insert(0, this.node.content);
    // Insert invisble char
  };

  this.insert = function(pos, str) {
    var content = this.$('.content')[0];

    // TODO: explain why this whitespace thingie is necessary
    var chars = str.split('');
    var charEls = _.map(chars, function(ch) {
      if (ch === " ") ch = " ";
      // if (ch === "\n") return $('<br/>')[0];
      // if (ch === " ") return $('<span class="space">'+ch+'</span>')[0];
      return $('<span>'+ch+'</span>')[0];
    });

    var spans = content.childNodes;
    var i;
    if (pos >= spans.length) {
      for (i = 0; i < charEls.length; i++) {
        content.appendChild(charEls[i]);
      }
    } else {
      var refNode = spans[pos];
      for (i = 0; i < charEls.length; i++) {
        content.insertBefore(charEls[i], refNode);
      }
    }
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };
};

TextView.Prototype.prototype = Node.View.prototype;
TextView.prototype = new TextView.Prototype();

module.exports = TextView;