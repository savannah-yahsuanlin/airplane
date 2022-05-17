const router = require("express").Router();
const { Product } = require("../db");
const { Op } = require("sequelize");

//get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/filter", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        alliance: {
          [Op.or]: ["OW", "SA", "ST"],
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
