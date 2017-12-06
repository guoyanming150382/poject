const express = require("express");
const { UserModel } = require("../models");
const hmac = require("../utils/hash");

const signup = express.Router();

signup.get("/", function(req, res, next) {
	res.render("signup");
});

signup.post("/", function(req, res, next) {
	const form = req.body;
	console.log("Form :", form);
	var check = {};
	if (form.password !== form.password1) {
		check.passErr = "两次输入的密码不一样";
		console.log("!==")
		return res.render("signup", {check: check});
	}
	const hashPass = hmac(form.password);
	const user = new UserModel({
		username: form.user,
		password: hashPass,
		phone: form.phone,
		email: form.email,
	});
	user.save((err, doc) => {
		console.log("save")
		if (!err) {
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.redirect("/");
			return
		}	
		console.log("Error :", err);
		if (err.message.indexOf('duplicate key error') !== -1) {
			check.userErr = "用户名已经存在";
			console.log("Check", check);
		}
		res.render("signup", {check: check});
	})
});

module.exports = signup;