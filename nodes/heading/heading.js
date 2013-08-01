"use strict";

var Heading = function() {

};

Heading.properties = {
  mergeableWith: ["paragraph", "heading"],
  preventEmpty: false,
  splitInto: 'paragraph',
  allowedAnnotations: ["emphasis", "strong", "idea", "question", "error"]
};


module.exports = Heading;