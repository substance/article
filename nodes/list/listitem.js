"use strict";

var Node = require("../node");

var ListItem = function(node, document) {
  Node.call(this, node, document);
};

ListItem.type = {
  "properties": {
    "content": "string",
    "level": "number"
  }
};


ListItem.Prototype = function() {

};

ListItem.Prototype.prototype = Node.prototype;
ListItem.prototype = new ListItem.Prototype();

Object.defineProperties(ListItem.prototype, {
  level: {
    get: function () {
      return this.properties.level;
    }
  },
  content: {
    get: function () {
      return this.properties.content
    }
  }
});

module.exports = ListItem;
