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

  var _createSpans = function(str) {
    var chars = str.split('');
    return _.map(chars, function(ch) {
      if (ch === " ") ch = " ";
      // if (ch === "\n") return $('<br/>')[0];
      // if (ch === " ") return $('<span class="space">'+ch+'</span>')[0];
      // My resume: jquery ... nope. Stop.
      // Exchanging this has lead to a speed-up of factor 10x (initial rendering)
      // var span $('<span>'+ch+'</span>')[0];
      var span = document.createElement("SPAN");
      span.innerHTML = ch;
      return span;
    });
  };

  // Rendering
  // =============================
  //

  this.render = function() {
    var tic = Date.now();
    this.$el.html(html.tpl('text', this.node));
    this.renderContent();
    return this;
  };

  this.dispose = function() {
    console.log('disposing paragraph view');
    this.stopListening();
  };

  this.renderContent = function() {
    content = this.el.querySelector(".content");

    var newContent = document.createDocumentFragment();
    var charEls = _createSpans(this.node.content);
    for (i = 0; i < charEls.length; i++) {
      newContent.appendChild(charEls[i]);
    }

    content.innerHTML = "";
    content.appendChild(newContent);
  };

  this.insert = function(pos, str) {
    var content = this.$('.content')[0];

    var spans = content.children;
    var charEls = _createSpans(str);

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
