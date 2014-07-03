"use strict";

var _ = require("underscore");

/*
  For the future we should bump the schema version whenever

  - a node type is added, removed, or renamed
  - a node property is added, removed, renamed
  - also if the semantic of our composer changes!
    Example: figure.caption is a text node in the previous version and
    in the new version is used as a 'rich' paragraph.

  After such a shema version bump you should get the change log using:
    $ git log  --oneline --decorate <since-sha>..<until-sha>
  and add relevant changes to the documentation of a new migration function.

  Give the new migration function a name such as

    function v040_to_v050(v040_data) {}

  To resolve schema differences follow this guide-line:

  - node type added: nothing to be done
  - node type removed: remove all nodes of that type
  - node type renamed: rename nodes of that type
  - node property added: add the property to all nodes using an appropriate default value
  - node property removed: remove that property
  - node property renamed: rename the property
  - other things: do other things
  - unrevoverable issues: add an error to the migration report

  The migration functions are called incrementally.
  Each of these functions must migrate from the previous version to the version it is assigned to.

  E.g. a migration function for "0.1.1" receives data of version "0.1.0".
  Or, if after "0.1.1" came "0.2.0", the migrator for the latter version is called
  with data of version "0.1.1".

  A migrator function is called with a Migrator instance as argument.
  The Migrator provides certain helper functions to accomplish this task.
  However you can do anything you wish using our own helpers.
  The json data object can be accessed using
      migrator.data
*/

var v040_to_v050 = function (migrator) {
  // Note: Until now we did not manage the schema version.

  // $ git log  --oneline --decorate 1020e73a3cf49b395d490cf36827453870317910..9f50c813080c180ffb5bfbd7491db2670d4fcc3f
  // 2de810b Video killed the radio star.
  // 76a16a1 Replace images, webpage support.
  // c253237 Video and Audio support.
  // b463730 Implemented webpage.
  // 7f5aa16 Codeblock -> CodeBlock
  // e9aad83 Webpage -> Webresource
  // cb277b4 Plain list implementation.
  // 7651571 Add a dedicated 'document' node.
  // 5526fd2 Blobs for image display.
  // 72f2e2d Update figure.js
  // 3bbb3f8 Link -> Webpage
  // 406b2a9 Adjust schema of Contributor nodes.

  // Note: Article migration is supported beginning from version 0.5.0
  // Migration from 0.4.0 to 0.5.0 is only a stub

  migrator.addProperty("web_page", "width", "400px");
  migrator.addProperty("web_page", "height", "400px");
};


var v050_to_v060 = function (migrator) {
  // Use n.url as a default for new property n.title
  _.each(migrator.data.nodes, function(n) {
    if (n.type === "web_resource") {
      n.title = n.url;
    }
  });
};


var NOP = function() {};

var migrations = {
  "0.4.0": NOP,
  "0.5.0": v040_to_v050,
  "0.6.0": v050_to_v060
};

module.exports = migrations;
