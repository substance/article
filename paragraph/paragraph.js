"use strict";

var Paragraph = function() {

};

Paragraph.properties = {
  isText: true,
  deletion: {
    preventEmpty: false,
    attemptMerge: true
  },
  split: {
    splittable: true,
    nodeType: "paragraph"
  },
  allowedAnnotations: ["emphasis", "strong", "link", "idea", "question", "error"]
};

module.exports = Paragraph;