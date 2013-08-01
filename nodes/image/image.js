"use strict";

var Node = require("../node");

var Image = function(node) {
  Node.call(this, node);
};

Image.type = {
  "parent": "content",
  "properties": {
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

};

Image.Prototype.prototype = Node.prototype;
Image.prototype = new Image.Prototype();


Object.defineProperties(Image.prototype, {
  content: {
    // Image acts as a single character
    get: function () {
      return " ";
    }
  }
});

module.exports = Image;