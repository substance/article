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
    "url": "string",
    "caption": "paragraph"
  }
};

Image.properties = {
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: ["idea", "question", "error"]
};

Image.Prototype = function() {

  // An image is ()
  this.getLength = function() {
    if (this.hasCaption()) {
      return this.document.get(this.properties.caption) + 1;
    } else {
      return 1;
    }
  };

  this.insertOperation = function(startChar, text) {
    if (startChar === 0) {
      throw new Error("The image char is not addressable.");
    }

    if (this.hasCaption()) {
      return this.caption.insertOperation(startChar-1, text);
    }

    return null;
  };

  this.deleteOperation = function(startChar, endChar) {
    if (startChar === 0) {
      console.log("Tried to delete the image char. Don't do that, hmmmkay?");
      return;
    }

    if (this.hasCaption()) {
      return this.caption.deleteOperation(startChar-1, endChar-1);
    }

    return null;
  };

  this.hasCaption = function() {
    return (!!this.properties.caption);
  };

};

Image.Prototype.prototype = Node.prototype;
Image.prototype = new Image.Prototype();
Image.prototype.constructor = Image;

Object.defineProperties(Image.prototype, {
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
      // HACK: this is not yet a real solution
      if (this.properties.caption) {
        return this.document.get(this.properties.caption);
      } else {
        return "";
      }
    }
  }
});

module.exports = Image;
