const express = require("express");
const {ArticalModel} = require("../models");

const editor = express.Router();

editor.all("/*", function(req, res, next) {
	if (req.session.userId) {
		next();
	} else {
		res.redirect("/login");
	}
});

editor.get("/", function(req, res, next) {
	res.render("editor", {username: req.session.username});
});

editor.post("/", function(req, res, next) {
	const userId = req.session.userId;
	const form = req.body;
	console.log("Form :", form);
	const art = new ArticalModel({
		title: form.title,
		content: form.content,
		author: req.session.username,
	});
	art.save((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/user");
	});
});

module.exports = editor;