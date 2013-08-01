"use strict";

var util = require("substance-util");

// Substance.Node
// -----------------

var Node = function(node) {
  this.properties = node;
};

// Type definition
// --------
// 

Node.type = {
  "parent": "content",
  "properties": {
    "content": ["array", "object"]
  }
};


// Define node behavior
// --------

Node.properties = {
  immutable: true,
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};

Node.Prototype = function() {

};

Node.prototype = new Node.Prototype();

// TODO: Construct dynamically using schema

Object.defineProperties(Node.prototype, {
  id: {
    get: function () {
      return this.properties.id;
    }
  },
  type: {
    get: function () {
      return this.properties.type;
    }
  },
  content: {
    get: function () {
      return [
        {"type": "paragraph", "name": "Paragraph"},
        {"type": "heading", "name": "Heading"},
        {"type": "image", "name": "Image"},
        {"type": "codeblock", "name": "Codeblock"}
      ]
    }
  }
});


module.exports = Node;
