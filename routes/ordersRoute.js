const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const con = require("../lib/dbConnection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
  }
});
// Gets one orders
router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders where order_id =${req.params.id}`,
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
  const {
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `INSERT into orders (user_id,amount,shipping_address,order_email,order_date,order_status) values ('${user_id}', '${amount}','${shipping_address}','${order_email}', '${order_date}', '${order_status}')`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// PUT - EDIT ORDER
router.put("/:id", (req, res) => {
  const {
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `UPDATE orders SET user_id="${user_id}",amount="${amount}",shipping_address="${shipping_address}",order_email="${order_email}",order_date="${order_date}",order_status="${order_status}" WHERE order_id="${req.params.id}"`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

// DELETE ORDER
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE from orders WHERE order_id="${req.params.id}"`,
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
