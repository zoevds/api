const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders_details", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one orders_details
router.get("/:id", (req, res) => {
  try {
    res.send({ id: req.params.id });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
router.post("/", (req, res) => {
  const { order_detail_id, order_id, product_id, price, sku, quantity } =
    req.body;
  try {
    con.query(
      `insert into order_details (order_detail_id,order_id,product_id,price,sku,quantity) values ('${order_detail_id}','${order_id}', '${product_id}','${price}','${sku}', '${quantity}')`,
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
