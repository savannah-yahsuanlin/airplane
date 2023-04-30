const router = require("express").Router();
const { User } = require("../db");
const passport = require("passport");


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

router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async (req, res) => {
    const passportId = req.user[0].dataValues.passportId;
    const token = await User.authenticateViaSocial(passportId);
    res.send(
    `
      <html>
        <body>
          <script>
            window.localStorage.setItem('token', '${token}');
            window.document.location = '/';
          </script>
        </body>
      </html>
    `
  );s
  }
);



router.get("/logout/google", function(req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router