"use strict";

var Image = function(node) {

};

Image.properties = {
  isText: false,
  deletion: {
    preventEmpty: true,
    attemptMerge: false
  },
  split: {
    splittable: false
  },
  allowedAnnotations: ["idea", "question", "error"]
};

module.exports = Image;