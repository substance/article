"use strict";

var _ = require("underscore");
var util = require("substance-util");
var Document = require("substance-document");
var Annotator = Document.Annotator;

// Substance.Article
// -----------------

var Article = function(options) {
  options = options || {};

  // TODO: Check if format is compatible

  // Extend Schema
  // --------

  options.schema = util.deepclone(Document.schema);
  options.schema.id = "substance-article";
  options.schema.version = "0.3.0";

  // Merge in custom types
  _.each(Article.types, function(type, key) {
    options.schema.types[key] = type;
  });

  // Merge in node types
  _.each(Article.nodeTypes, function(node, key) {
    options.schema.types[key] = node.Model.type;
  });

  // Merge in custom indexes
  _.each(Article.indexes, function(index, key) {
    options.schema.indexes[key] = index;
  });

  // Call parent constructor
  // --------

  Document.call(this, options);

  this.nodeTypes = Article.nodeTypes;

  // Seed the doc
  // --------

  if (options.seed === undefined) {
    this.create({
      id: "document",
      type: "document",
      guid: options.id, // external global document id
      creator: options.creator,
      created_at: options.created_at,
      views: ["content"], // is views really needed on the instance level
      title: "",
      abstract: "",
    });

    // Create views on the doc
    _.each(Article.views, function(view) {
      this.create({
        id: view,
        "type": "view",
        nodes: []
      });
    }, this);
  }
};


Article.Prototype = function() {

  this.fromSnapshot = function(data, options) {
    return Article.fromSnapshot(data, options);
  };

  this.getAuthorNames = function() {
    var authorNames = [];
    var collaboratorsIndex = this.addIndex({types: ["collaborator"]});
    var collaborators = collaboratorsIndex.get();
    _.each(collaborators, function(collaborator) {
      if (collaborator.role !== "author") {
        return;
      }
      authorNames.push(collaborator.name);
    });
    return authorNames;
  };
};

// Factory method
// --------
//
// TODO: Ensure the snapshot doesn't get chronicled

Article.fromSnapshot = function(data, options) {
  options = options || {};
  options.seed = data;
  return new Article(options);
};


// Define available views
// --------

Article.views = ["content", "figures", "citations", "info"];

// Register node types
// --------


Article.nodeTypes = require("../nodes");


// Define annotation types
// --------

Article.annotationBehavior = {
  groups: {
    "emphasis": "style",
    "strong": "style",
    "link": "style",
    "math": "style",
    "issue": "marker"
  },
  expansion: {
    "emphasis": {
      left: Annotator.isOnNodeStart,
    },
    "strong": {
      left: Annotator.isOnNodeStart,
    }
  },
  split: ["emphasis", "strong"],
  levels: {
    idea: 1,
    question: 1,
    remark: 1,
    error: 1,
    issue: 1,
    link: 1,
    math: 1,
    strong: 2,
    emphasis: 2,
    code: 2,
    subscript: 2,
    superscript: 2,
    underline: 2,
    cross_reference: 1,
    figure_reference: 1,
    person_reference: 1,
    collaborator_reference: 1,
    citation_reference: 1
  }
};

// Custom type definitions
// --------
//

Article.types = {

  // Document
  // --------

  "document": {
    "properties": {
      "views": ["array", "view"],
      "guid": "string",
      "creator": "string",
      "title": "string",
      "abstract": "string",
      "published_on": "date", // should be part of the main type?
      "meta": "object"
    }
  }
};

// Custom indexes
// --------
//

Article.indexes = {
  // all comments are now indexed by node association
  "comments": {
    "type": "comment",
    "properties": ["node"]
  }
};


// From article definitions generate a nice reference document
// --------
//

var ARTICLE_DOC_SEED = {
  "id": "article",
  "nodes": {
    "document": {
      "type": "document",
      "id": "document",
      "views": [
        "content",
        "info"
      ],
      "title": "The Anatomy of a Substance Article",
      "collaborators": ["collaborator_1", "collaborator_2"],
      "guid": "lens_article"
    },

    "content": {
      "type": "view",
      "id": "content",
      "nodes": [
        "cover",
      ]
    },

    "cover": {
      "id": "cover",
      "type": "cover",
      "collaborators": ["collaborator_1", "collaborator_2"]
    },

    "collaborator_1": {
      "id": "collaborator_1",
      "type": "collaborator",
      "name": "Michael Aufreiter"
    },

    "collaborator_2": {
      "id": "collaborator_2",
      "type": "collaborator",
      "name": "Oliver Buchtala"
    }
  }
};


Article.describe = function() {
  var doc = new Article({seed: ARTICLE_DOC_SEED});

  var id = 0;

  _.each(Article.nodeTypes, function(nodeType, key) {
    if (key === "composite") return;
    nodeType = nodeType.Model;

    // Create a heading for each node type
    var headingId = "heading_"+nodeType.type.id;

    doc.create({
      id: headingId,
      type: "heading",
      content: nodeType.description.name,
      level: 1
    });

    // Turn remarks and description into an introduction paragraph
    var introText = nodeType.description.remarks.join(' ');
    var introId = "text_"+nodeType.type.id+"_intro";

    doc.create({
      id: introId,
      type: "text",
      content: introText,
    });


    // Show it in the content view
    doc.show("content", [headingId, introId], -1);


    // Include property description
    // --------
    //

    doc.create({
      id: headingId+"_properties",
      type: "text",
      content: nodeType.description.name+ " uses the following properties:"
    });

    doc.show("content", [headingId+"_properties"], -1);

    var items = [];

    _.each(nodeType.description.properties, function(propertyDescr, key) {

      var listItemId = "text_" + (++id);
      doc.create({
        id: listItemId,
        type: "text",
        content: key +": " + propertyDescr
      });

      // Create code annotation for the propertyName
      doc.create({
        "id": id+"_annotation",
        "type": "code",
        "path": [listItemId, "content"],
        "range":[0, key.length]
      });

      items.push(listItemId);
    });

    // Create list
    doc.create({
      id: headingId+"_property_list",
      type: "list",
      items: items,
      ordered: false
    });

    // And show it
    doc.show("content", [headingId+"_property_list"], -1);

    // Include example
    // --------

    if (nodeType.example) {
      doc.create({
        id: headingId+"_example",
        type: "text",
        content: "Here's an example:"
      });

      doc.create({
        id: headingId+"_example_codeblock",
        type: "codeblock",
        content: JSON.stringify(nodeType.example, null, '  '),
      });
      doc.show("content", [headingId+"_example", headingId+"_example_codeblock"], -1);
    }
  });

  return doc;
};


Article.Prototype.prototype = Document.prototype;
Article.prototype = new Article.Prototype();
Article.prototype.constructor = Article;

// Add convenience accessors for builtin document attributes
Object.defineProperties(Article.prototype, {
  id: {
    get: function() {
      return this.get("document").guid;
    },
    set: function(id) {
      this.get("document").guid = id;
    }
  },
  creator: {
    get: function() {
      return this.get("document").creator;
    },
    set: function(creator) {
      this.get("document").creator = creator;
    }
  },
  created_at: {
    get: function() {
      return this.get("document").created_at;
    },
    set: function(created_at) {
      this.get("document").created_at = created_at;
    }
  },
  published_on: {
    get: function() {
      return this.get("document").published_on;
    },
    set: function(published_on) {
      this.get("document").published_on = published_on;
    }
  },
  title: {
    get: function() {
      return this.get("document").title;
    },
    set: function(title) {
      this.get("document").title = title;
    }
  },
  abstract: {
    get: function() {
      return this.get("document").abstract;
    },
    set: function(value) {
      this.get("document").abstract = value;
    }
  },
  views: {
    get: function() {
      // Note: returing a copy to avoid inadvertent changes
      return this.get("document").views.slice(0);
    }
  }
});

module.exports = Article;