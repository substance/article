"use strict";

var Heading = function() {

};

Heading.properties = {
  isText: true,
  deletion: {
    preventEmpty: false,
    attemptMerge: true,
  },
  split: {
    splittable: true,
    nodeType: "paragraph"
  },
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};

module.exports = Heading;