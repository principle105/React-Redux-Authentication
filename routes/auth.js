const router = require("express").Router();
const discordAuthRouter = require("./discordAuth");
// const localAuthRouter = require("./localAuth");

router.use("/discord", discordAuthRouter)

// router.use("/local", localAuthRouter)

router.get("/data", (req,res) => {
  res.json(req.user || null);
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;