"use strict";

var Document = require("substance-document");

var Figure = function(node, document) {
  Document.Composite.call(this, node, document);
};

Figure.type = {
  "parent": "content",
  "properties": {
    "image": "image",
    "caption": "paragraph"
  }
};

Figure.Prototype = function() {

  this.insertOperation = function(startChar, text) {
    return null;
  };

  this.deleteOperation = function(startChar, endChar) {
    return null;
  };

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

  this.getNodes = function() {
    var nodes = [this.properties.image];
    if (this.properties.caption) nodes.push(this.properties.caption);
    return nodes;
  };

  this.getImage = function() {
    if (this.properties.image) return this.document.get(this.properties.image);
  };

  this.getCaption = function() {
    if (this.properties.caption) return this.document.get(this.properties.caption);
  };
};

Figure.Prototype.prototype = Document.Composite.prototype;
Figure.prototype = new Figure.Prototype();
Figure.prototype.constructor = Figure;

Document.Node.defineProperties(Figure.prototype, ["image", "caption"]);

module.exports = Figure;
