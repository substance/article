"use strict";

var Text = require("../text");


var Heading = function(node, document) {
  Text.call(this, node, document);
};

Heading.type = {
  "parent": "content",
  "properties": {
    "content": "string",
    "level": "number"
  }
};

Heading.properties = {
  mergeableWith: ["paragraph", "heading"],
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};


Heading.Prototype = function() {

};

Heading.Prototype.prototype = Text.prototype;
Heading.prototype = new Heading.Prototype();

Object.defineProperties(Heading.prototype, {
  level: {
    get: function () {
      return this.properties.level;
    }
  }
});

module.exports = Heading;
