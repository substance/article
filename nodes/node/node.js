"use strict";

var _ = require("underscore");

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
  }
};

// Define node behavior
// --------

Node.properties = {
  abstract: true,
  immutable: true,
  mergeableWith: [],
  preventEmpty: true,
  allowedAnnotations: []
};

Node.Prototype = function() {
  this.toJSON = function() {
    return _.clone(this.properties);
  };
};

Node.prototype = new Node.Prototype();
Node.prototype.constructor = Node;


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
  }
});


module.exports = Node;