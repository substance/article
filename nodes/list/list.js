"use strict";

var Node = require("../node");
var _ = require("underscore");
var Operator = require("substance-operator");
var ObjectOperation = Operator.ObjectOperation;
var ArrayOperation = Operator.ArrayOperation;

var List = function(node, document) {
  Node.call(this, node, document);
};

List.type = {
  "parent": "content",
  "properties": {
    "items": ["array", "paragraph"],
    "ordered": "boolean"
  }
};

List.properties = {
  mergeableWith: ["paragraph", "heading"],
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};

List.Prototype = function() {

  this.getLength = function() {
    var l = 0;
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      l += items[i].length;
    }
    return l;
  };

  this.insertOperation = function(charPos, text) {

    var items = this.items;
    var pos = 0;
    var l, i;
    for (i = 0; i < items.length; i++) {
      var item = items[i];
      l = items[i].length;

      if (charPos < pos + l) {
        return item.insertOperation(charPos-pos, text);
      }

      pos += l;
    }

    console.error("There is a bug in List.insertOperation(). Fix me, would you?");
    return null;
  };

  // TODO: this should be generalized some how
  // Would be greate if we could reuse the transformer implementation somehow
  this.deleteOperation = function(startChar, endChar) {
    var ops = [];
    var deletedItems = [];

    var pos = 0;
    var l;
    var items = this.items;
    var i;
    for (i = 0; i < items.length; i++) {
      var item = items[i];
      l = items[i].length;

      if (startChar < pos + l) {
        if (endChar >= pos + l) {
          ops.push(ObjectOperation.Delete([item.id], item));
          deletedItems.push({
            id: item.id,
            pos: i
          });
        } else {
          var s = startChar-pos;
          var e = endChar-pos;
          ops.push(item.deleteOperation(s, e));
        }
      }
      pos += l;
    }

    for (i = deletedItems.length - 1; i >= 0; i--) {
      var diff = ArrayOperation.Delete(deletedItems[i].pos, deletedItems.id);
      ops.push(ObjectOperation.Update([this.id, "items"], diff));
    }

    return ObjectOperation.Compound(ops);
  };

};

List.Prototype.prototype = Node.prototype;
List.prototype = new List.Prototype();
List.prototype.constructor = List;

Object.defineProperties(List.prototype, {
  level: {
    get: function () {
      return this.properties.level;
    }
  },
  items: {
    get: function () {
      return _.map(this.properties.items, function(i) {
        return this.document.get(i);
      }, this);
    }
  },
  content: {
    get: function () {
      return "just to prevent stuff from breaking";
    }
  },
  length: {
    get: function () {
      return _.reduce(this.items, function(memo, i) {
        return memo + i.content.length;
      }, 0);
    }
  }
});

module.exports = List;
