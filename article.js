"use strict";

var _ = require("underscore");
var util = require("substance-util");
var Document = require("substance-document");

// Substance.Article
// -----------------

var Article = function(options) {
  options = options || {};

  // Extend Schema
  // --------

  options.schema = util.deepclone(Document.schema);

  // Merge in custom types
  _.each(Article.types, function(type, key) {
    options.schema.types[key] = type;
  });

  // Register annotation types
  _.each(Article.annotations, function(aType, key) {
    options.schema.types[key] = aType;
  });


  // Merge in node types
  _.each(Article.nodes, function(node, key) {
    options.schema.types[key] = node.type;
  });

  // Merge in custom indexes
  _.each(Article.indexes, function(index, key) {
    options.schema.indexes[key] = index;
  });


  // Call parent constructor
  // --------

  Document.call(this, options);

  // Seed the doc
  // --------

  // Create the document node

  this.create({
    id: "document",
    type: "document",
    guid: options.id, // external global document id
    creator: options.creator,
    created_at: options.created_at,
    views: ["content"], // is views really needed on the instance level
    title: "",
    abstract: ""
  });

  // Create views on the doc
  _.each(Article.views, function(view) {
    this.create({
      id: view,
      "type": "view",
      nodes: []
    });
  }, this);

};


Article.Prototype = function() {

};



// Factory method
// --------
//
// TODO: Ensure the snapshot doesn't get chronicled

Article.fromSnapshot = function(data, options) {
  options = options || {};
  // options.seed = [];
  var doc = new Article(options);

  _.each(data.nodes, function(n) {
    if (doc.get(n.id)) return; // skip existing nodes
    doc.create(n);
  });

  return doc;
};


// Define available views
// --------

Article.views = ["content"];


// Register node types
// --------

Article.nodes = {
  "node": require("./nodes/node"),
  "paragraph": require("./nodes/paragraph"),
  "heading": require("./nodes/heading"),
  "image": require("./nodes/image"),
  "codeblock": require("./nodes/codeblock")
};

// Define annotation types
// --------

Article.annotations = {

  "strong": {
    "parent": "annotation",
    "properties": {
    }
  },

  "emphasis": {
    "properties": {
    },
    "parent": "annotation"
  },

  "code": {
    "parent": "annotation",
    "properties": {
    }
  },

  "link": {
    "parent": "annotation",
    "properties": {
      "url": "string"
    }
  },

  "idea": {
    "parent": "annotation",
    "properties": {
    }
  },

  "error": {
    "parent": "annotation",
    "properties": {
    }
  },

  "question": {
    "parent": "annotation",
    "properties": {
    }
  }
};

// Custom type definitions
// --------
// 
// Holds comments

Article.types = {

  // Abstarct Annotation Node
  // --------

  "annotation": {
    "properties": {
      "path": ["array", "string"], // -> e.g. ["text_1", "content"]
      "range": "object"
    }
  },

  // Document
  // --------

  "document": {
    "properties": {
      "views": ["array", "view"],
      "guid": "string",
      "creator": "string",
      "title": "string",
      "abstract": "string"
    }
  },

  // Comments
  // --------

  "comment": {
    "properties": {
      "content": "string",
      "created_at": "string", // should be date
      "creator": "string", // should be date
      "node": "node" // references either a content node or annotation
    }
  }
};

// Custom indexes
// --------
// 

Article.indexes = {
  // All annotations are now indexed by node
  // "annotations": {
  //   "type": "annotation",
  //   "properties": ["node"]
  // },
  // all comments are now indexed by node association
  "comments": {
    "type": "comment",
    "properties": ["node"]
  }
};


Article.Prototype.prototype = Document.prototype;
Article.prototype = new Article.Prototype();


// Add convenience accessors for builtin document attributes
Object.defineProperties(Document.prototype, {
  id: {
    get: function () {
      return this.get("document").guid;
    },
    set: function() {
      throw "doc.id is immutable";
    }
  },
  creator: {
    get: function () {
      return this.get("document").creator;
    }
  },
  created_at: {
    get: function () {
      return this.get("document").created_at;
    }
  },
  title: {
    get: function () {
      return this.get("document").title;
    }
  },
  abstract: {
    get: function () {
      return this.get("document").abstract;
    }
  },
  views: {
    get: function () {
      // Note: returing a copy to avoid inadvertent changes
      return this.get("document").views.slice(0);
    }
  },
});

module.exports = Article;
