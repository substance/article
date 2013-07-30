"use strict";

var Paragraph = function() {

};

Paragraph.properties = {
  mergeableWith: ["paragraph", "heading"], // maybe remove heading here
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "link", "idea", "question", "error"]
};

module.exports = Paragraph;