var _ = require('underscore');
var SubstanceNode = require('./node');
var View = require('substance-application').View;
var NodeTransformer = SubstanceNode.Transformer;
var util = require('substance-util');
var html = util.html;

// Substance.Text
// -----------------
//

var Text = function() {

};

Text.prototype = SubstanceNode.prototype;


// Substance.Text.Transformer
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

var TextTransformer = function(document, node) {
  NodeTransformer.call(this, document, node);
};

TextTransformer.Prototype = function() {
  
};

TextTransformer.Prototype.prototype = NodeTransformer.prototype;
TextTransformer.prototype = new TextTransformer.Prototype();

// Substance.Text.View
// -----------------
//
// Manipulation interface shared by all textish types (paragraphs, headings)
// This behavior can overriden by the concrete node types

// Substance.Text.View
// ==========================================================================

var TextView = function(node) {
  View.call(this);
  this.node = node;

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

TextView.Prototype.prototype = View.prototype;
TextView.prototype = new TextView.Prototype();


Text.Transformer = TextTransformer;
Text.View = TextView;

module.exports = Text;