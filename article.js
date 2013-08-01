"use strict";

var util = require("substance-util");
var html = util.html;

// Substance.Article
// -----------------

var Article = function(node) {
  
};

// Define available views
// --------

Article.views = ["content"];


// Register node types
// --------

Article.nodes = {
  "paragraph": require("./paragraph/paragraph"),
  "heading": require("./paragraph/heading"),
  "image": require("./paragraph/image"),
  "codeblock": require("./paragraph/codeblock")
};


// Define annotation types
// --------

Article.annotations = {
  // Annotations
  "annotation": {
    "properties": {
      "node": "content",
      "property": "string",
      "range": "object"
      // path: ["array", "string"] -> could be ["text_1", "content"]
    }
  },

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

// Custom schema definitions
// --------
// 
// Holds comments

Article.schema = {
  // The generic ones should live in the document module
  // -------------
  
  // Specific type for substance documents, holding all content elements
  "content": {
    "properties": {
    }
  },

  // Abstract node nodetype
  "node": {
    "parent": "content",
    "properties": {
      "content": "string"
    }
  },

  // Comments
  "comment": {
    "properties": {
      "content": "string",
      "created_at": "string", // should be date
      "creator": "string", // should be date
      "node": "node" // references either a content node or annotation
    }
  }
};

// Custom schema definitions
// --------
// 

Article.indexes = {
  // all comments are now indexed by node association
  "comments": {
    "type": "comment",
    "properties": ["node"]
  },
  // All annotations are now indexed by node
  "annotations": {
    "type": "annotation",
    "properties": ["node"]
  }
};




// Does not define any properties
// since it's read only and immutable

var SCHEMA = {
  // Static indexes
  "indexes": {

  },

  "types": {


    "paragraph": {
      "parent": "content",
      "properties": {
        "content": "string"
      }
    },

    "document": {
      "properties": {
        "views": ["array", "view"],
        "guid": "string",
        "creator": "string",
        "title": "string",
        "abstract": "string",
        "keywords": ["array", "string"]
      }
    },

    "view": {
      "properties": {
        "nodes": ["array", "content"]
      }
    },

    "codeblock": {
      "parent": "content",
      "properties": {
        "content": "string"
      }
    },

    "codeline": {
      "parent": "content",
      "properties": {
        "content": "string"
      }
    },

    "image": {
      "parent": "content",
      "properties": {
        "large": "string",
        "medium": "string",
        "url": "string",
        "content": "string"
      }
    },

    "heading": {
      "parent": "content",
      "properties": {
        "content": "string",
        "level": "number"
      }
    },



  }
};





// Node.properties = {
//   immutable: true,
//   mergeableWith: [],
//   preventEmpty: true,
//   allowedAnnotations: []
// };


Article.Prototype = function() {

};

Article.prototype = new Article.Prototype();


// TODO: Construct dynamically using schema

// Object.defineProperties(Node.prototype, {
//   id: {
//     get: function () {
//       return this.properties.id;
//     }
//   },
//   type: {
//     get: function () {
//       return this.properties.type;
//     }
//   },
//   content: {
//     get: function () {
//       return [
//         {"type": "paragraph", "name": "Paragraph"},
//         {"type": "heading", "name": "Heading"},
//         {"type": "image", "name": "Image"},
//         {"type": "codeblock", "name": "Codeblock"}
//       ]
//     }
//   }
// });


// Substance.Node.Transformer
// -----------------
//
// Manipulation interface for all node types
// This behavior can overriden by the concrete node types

// var NodeTransformer = function(document, node) {
//   // Usually you get passed in a simulation here
//   this.document = document;
//   this.node = node;
// };


NodeView.Prototype.prototype = View.prototype;
NodeView.prototype = new NodeView.Prototype();


Node.Transformer = NodeTransformer;
Node.View = NodeView;

module.exports = Node;
