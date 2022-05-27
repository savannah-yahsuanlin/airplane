const router = require("express").Router();
const { User } = require("../db");
const jwt = require("jsonwebtoken");

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};


User.authenticateViaSocial = async function (passportId) {
  const user = await this.findOne({ where: { passportId } });
  if (!user) {
    const error = Error("No user exists");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

router.get('/', async(req, res, next) => {
	try {
		const user = await User.findAll()
		res.json(user)
	} catch (error) {
		next(error)
	}
})






module.exports = router;