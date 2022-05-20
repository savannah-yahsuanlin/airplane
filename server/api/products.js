const router = require("express").Router();
const { Product } = require("../db");


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

router.get("/:id", async (req, res, next) => {
  try {
    res.json(await Product.findByPk(req.params.id));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
