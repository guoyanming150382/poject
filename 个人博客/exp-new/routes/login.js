var express = require('express');
var login = express.Router();
const { UserModel } = require("../models");
const hmac = require("../utils/hash");
const getCcap = require("../utils/ccap");


/* GET home page. */
login.get("/", function(req, res,next) {
	const cap = getCcap();
	console.log("Cap text: ", cap.text);
	req.session.captcha = cap.text;
	res.render("login", {captcha: cap.buffer.toString("base64")});
});
login.post("/", function(req, res, next) {
	const form = req.body;
	console.log("Post :", form);
	UserModel.findOne({username: form.user})
	.then((doc) => {
		if (!doc) {
			console.log("Emputy Doc");	
			return res.render("login", {
				errMessage: "登录失败 用户不存在 User: " + form.user
			});
		}

		if (req.session.captcha !== form.captcha) {
			const cap = getCcap();
			req.session.captcha = cap.text;
			return res.render("login", {
				captcha: cap.buffer.toString("base64"),
				errMessage: "验证码错误，请重新输入"			});

		}
		if (doc.password === hmac(form.password)) {
			req.session.userId = doc._id;
			req.session.username = doc.username;
			res.redirect("/");
		} else {
			return res.render("login", {
				errMessage: "登录失败 密码错误 User: " + form.user
			});
		}
	})
	.catch((err) => {
		console.log("Error :", err);	
		next(err);
	});
});

module.exports = login;