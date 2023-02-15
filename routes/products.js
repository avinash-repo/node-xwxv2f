const express = require("express");
const router = express.Router();
const db = require("../database/db");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  let startValue;
  let endValue;

  if (page > 0) {
    startValue = page * limit - limit; // 0,10,20,30
    endValue = page * limit;
  } else {
    startValue = 0;
    endValue = 10;
  }

  db.query("SELECT * FROM products p JOIN categories c ON c.id = p.cat_id", {
    replacements: [],
    type: db.QueryTypes.SELECT,
  }).then((err) => {
    if (err) console.log(err);
    else res.json(results);
  });
});

// GET SINGLE PRODUCT BY ID
router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  db.query("SELECT * FROM products p JOIN categories c ON c.id = p.cat_id WHERE p.id = ?", {
    replacements: [productId],
    type: db.QueryTypes.SELECT,
  }).then((err) => {   
      if (err) console.log(err);
      else res.json(results[0]);    
});
});

module.exports = router;
