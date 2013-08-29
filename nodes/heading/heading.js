"use strict";

var Document = require("substance-document");
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

Heading.Prototype = function() {
  this.splitInto = 'paragraph';
};

Heading.Prototype.prototype = Text.prototype;
Heading.prototype = new Heading.Prototype();
Heading.prototype.constructor = Heading;

Document.Node.defineProperties(Heading.prototype, ["level"]);

module.exports = Heading;
