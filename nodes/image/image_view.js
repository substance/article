"use strict";

var _ = require('underscore');
var util = require('substance-util');
var html = util.html;
var Node = require("../node");
var ParagraphView = require("../paragraph").View;

// Substance.Image.View
// ==========================================================================

var ImageView = function(node) {
  Node.View.call(this, node);


  this.$el.addClass('image');
  this.$el.attr('id', this.node.id);
};

ImageView.Prototype = function() {

  // Rendering
  // =============================
  //

  var _indexOf = Array.prototype.indexOf;

  // Render Markup
  // --------
  // 
  // div.content
  //   div.img-char
  //     .img

  this.render = function() {

    var content = document.createElement('div');
    content.className = 'content';

    var imgChar = document.createElement('div');
    imgChar.className = 'image-char';

    var img = document.createElement('img');
    img.src = this.node.url || this.node.medium;
    img.alt = "alt text";
    img.title = "alt text";
    imgChar.appendChild(img);

    content.appendChild(imgChar);

    // Add caption
    var caption = new ParagraphView(this.node.caption);
    content.appendChild(caption.render().el);

    // Add content
    this.el.appendChild(content);
    
    this._imgPos = _indexOf.call(imgChar.childNodes, img);

    return this;
  };

  this.dispose = function() {
    console.log('disposing image view');
    this.stopListening();
  };

  this.delete = function(pos, length) {
    var content = this.$('.content')[0];
    var spans = content.childNodes;
    for (var i = length - 1; i >= 0; i--) {
      content.removeChild(spans[pos+i]);
    }
  };

  this.getCharPosition = function(el, offset) {
    // TODO: is there a more general approach? this is kind of manually coded.
    if (!$(el).is("div.image-char")) {
      throw new Error("Ooops. Expecting div.image-char as source element for looking up the char pos");
    }
    return (offset > this._imgPos) ? 1 : 0;
  };

  this.getDOMPosition = function(charPos) {
    var content = this.$('.content')[0];
    var img = content.querySelector("img");
    var range = document.createRange();

    if (charPos === 0) {
      range.setStartBefore(content.childNodes[0]);
    } else {
      range.setStartAfter(content);
    }

    return range;
  };
};

ImageView.Prototype.prototype = Node.View.prototype;
ImageView.prototype = new ImageView.Prototype();

module.exports = ImageView;
