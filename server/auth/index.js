const router = require("express").Router();
const { User } = require("../db");

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)});
  } catch (err) {
    next(err)
  }
})


router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})

router.post('/register', async (req, res, next) => {
  try {
    res.send(await User.register(req.body))
  } catch (error) {
    next(error)
  }
})

module.exports = router