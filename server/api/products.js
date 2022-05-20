const router = require("express").Router();
const { Product } = require("../db");
const Sequelize = require("sequelize");
const { Op } = Sequelize;

//get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:alliance", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {
        alliance: req.params.alliance,
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:query", async (req, res, next) => {
  const term = req.params.query;
  try {
    const product = await Product.findAll({
      where: {
        name: {
          [Op.like]: "%" + term + "%",
        },
      },
    });
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
