var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
	console.log("Session :", req.session);
	console.log("Session Id:", req.session.id)
	console.log("Cookie :", req.cookies.Carp)
	let username = ""
	if (req.session.username) {
		username = req.session.username;
	}
	res.render("index", {username: username});
});

module.exports = router;
