"use strict";

var Codeblock = function() {

};

Codeblock.properties = {
  mergeableWith: ["codeblock"],
  preventEmpty: false,
  splitInto: 'codeblock',
  allowedAnnotations: ["idea", "question", "error"]
};

module.exports = Codeblock;