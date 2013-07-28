"use strict";

var Codeblock = function() {

};

Codeblock.properties = {
  isText: true,
  deletion: {
    preventEmpty: false,
    attemptMerge: false
  },
  split: {
    splittable: true,
    nodeType: "paragraph"
  },
  allowedAnnotations: ["idea", "question", "error"]
};

module.exports = Codeblock;