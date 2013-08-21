"use strict";

var Document = require("substance-document");

var Image = function(node, document) {
  Document.Node.call(this, node, document);
};

Image.type = {
  "parent": "content",
  "properties": {
    "title": "string",
    "large": "string",
    "medium": "string",
    "url": "string"
  }
};

Image.properties = {
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: ["idea", "question", "error"]
};

Image.Prototype = function() {

  // An image is a single element
  this.getLength = function() {
    return 1;
  };

  this.insertOperation = function(startChar, text) {
    return null;
  };

  this.deleteOperation = function(startChar, endChar) {
    return null;
  };
};

Image.Prototype.prototype = Document.Node.prototype;
Image.prototype = new Image.Prototype();
Image.prototype.constructor = Image;

Document.Node.defineProperties(Image.prototype, ["medium", "large", "url"]);

module.exports = Image;
