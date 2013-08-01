"use strict";

var Article = require("./article");

Article.Node = require('./nodes/node');
Article.Paragraph = require('./nodes/paragraph');
Article.Heading = require('./nodes/heading');
Article.Image = require('./nodes/image');
Article.Codeblock = require('./nodes/codeblock');

Article.nodes = {
  "node": Article.Node,
  "paragraph": Article.Paragraph,
  "heading": Article.Heading,
  "image": Article.Image,
  "codeblock": Article.Codeblock
};

module.exports = Article;