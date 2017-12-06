var express = require('express');
const multer = require("multer");
const path = require("path");

const upload = express.Router();
const dest = "public/static/img/";

const uploadMid = multer({dest: dest});

var users = express.Router();
const {UserModel, ArticalModel} = require("../models");

users.all("/*", function(req, res, next) {
	if (req.session.userId) {
		next()
	} else {
		res.redirect("/login");
	}
});
/* GET users listing. */
users.get("/", function(req, res, next) {
	const user = req.session.username;
	UserModel.findById(req.session.userId)
	.then((doc) => {
		if (!doc.avatar) {
			doc.avatar = "/static/img/defaultAvatar.jpg"
		}
		ArticalModel.find({author: doc.username})
		.then((docs) => {
			res.render("usercenter", {username: user, user: doc, articles: docs});
		})
	})
	.catch((e) => {
		if (e) {
			console.log("Error: ", e);
		}	
		next(e);
	})
})
// 设置 头像
users.post("/setavatar", uploadMid.single("avatar"), function(req, res, next) {
	console.log("File :", req.file);
	// \\\
	req.file.path.replace(/\\/g, "/");
	const start = req.file.path.indexOf("/");
	// 生成前端可以访问到的路径；
	const path = req.file.path.substr(start);
	UserModel.findById(req.session.userId)
	.then((doc) => {
		doc.avatar = path;
		doc.save();
		res.redirect("/user");
	})
	.catch((err) => {
		console.log("Error :", err);	
		next(err);
	})

})

users.get("/logout", function(req, res, next) {
	req.session.destroy();
	res.redirect("/");
})

module.exports = users;
