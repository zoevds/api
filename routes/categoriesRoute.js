const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM categories", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one categories
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM categories where categories_id =${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `insert into categories (name,description,thumbnail) values ('${name}', '${description}','${thumbnail}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
// PUT - EDIT catergories
router.put("/:id", (req, res) => {
  const { name, description, thumbnail } = req.body;
  try {
    con.query(
      `UPDATE categories SET name="${name}",description="${description}",thumbnail="${thumbnail}"WHERE category_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// DELETE catergories
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE from catergories WHERE category_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
