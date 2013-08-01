var NodeTransformer = require('../node').Transformer;

// Image.Transformer
// -----------------
//

var ImageTransformer = function(document, node) {
  NodeTransformer.call(this, document, node);
};

ImageTransformer.behaviors = {
  deletion: {
    preventEmpty: false,
    attemptMerge: true
  },
  isText: false
};

ImageTransformer.Prototype = function() {

};

ImageTransformer.Prototype.prototype = NodeTransformer.prototype;
ImageTransformer.prototype = new ImageTransformer.Prototype();

module.exports = ImageTransformer;