"use script";
const express = require("express");
const router = express.Router();

const burger = require("../server.js");

router.get("/", (req, res) => {
  burger.selectAll(function(data) {
    const burgerObj = {
      burger: data
    };
    console.log(burgerObj);
    res.render("index", burgerObj);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.create(["name", "devour"], [req.body.name, req.body.devour], function(
    result
  ) {
    res.json({ id: result.insertId });
  });
});

router.put("/apt/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;
  console.log("condition", condition);

  burger.update(
    {
      devour: req.body.devour
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", (req, res) => {
  const condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
