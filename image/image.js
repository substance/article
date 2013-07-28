"use strict";

var Image = function(node) {

};

Image.properties = {
  isText: false,
  deletion: {
    preventEmpty: true,
    attemptMerge: false
  },
  allowedAnnotations: ["idea", "question", "error"]
};

module.exports = Image;