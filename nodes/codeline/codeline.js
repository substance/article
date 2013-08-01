"use strict";

var Codeline = function() {

};


Codeline.properties = {
  mergeableWith: ["codeline"],
  preventEmpty: false,
  splitInto: 'codeline',
  allowedAnnotations: ["idea", "question", "error"]
};

module.exports = Codeline;