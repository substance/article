"use strict";

var Node = require("../node");

var Image = function(node, document) {
  Node.call(this, node, document);
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

};

Image.Prototype.prototype = Node.prototype;
Image.prototype = new Image.Prototype();


Object.defineProperties(Image.prototype, {
  content: {
    // Image acts as a single character
    get: function () {
      return " ";
    }
  },
  medium: {
    get: function() { return this.properties.medium; }
  },
  large: {
    get: function() { return this.properties.large; }
  },
  url: {
    get: function() { return this.properties.url; }
  },
  caption: {
    get: function() {
      if (this.properties.caption) {
        return this.document.get(this.properties.caption);
      } else {
        return "";
      }
    }
  }
});

module.exports = Image;
