"use strict";

const connection = require("./connection");

const orm = {
  selectAll: function(tableInput, cb) {
    let queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, (err, result));
  }
};
