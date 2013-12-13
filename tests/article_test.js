"use strict";

// Import
// ========

var _ = require("underscore");
var Test = require('substance-test');
var Operator = require('substance-operator');
var assert = Test.assert;
var registerTest = Test.registerTest;
var Document = require('substance-document');
var Article = require('../index');

// Test
// ========

var ArticleTest = function () {

  this.setup = function() {
    this.doc = new Article({
      id: "substance_doc"
    });
  };

  this.actions = [
    // TODO: create meaningful tests
    // Article pulls together everything: document, nodes, etc.
    // Thus this is the best place to have integration tests.
    // We should evolve user stories and implement them here
    function() { assert.fail("Not implemented."); }
  ];
};

registerTest(['Substance.Article', 'Article Nodes'], new ArticleTest());
