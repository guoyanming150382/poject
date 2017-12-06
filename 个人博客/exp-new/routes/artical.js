const express = require("express");
const artical = express.Router();
const {ArticalModel} = require("../models");

artical.get("/:id", function(req, res, next) {
	// /article/?id=1231serst
	const id = req.params.id;
	ArticalModel.findById(id)
	.then((doc) => {
		res.render("artical", {article: doc});
	})
	.catch((e) => {
		console.log("Error:", e);	
		next(e);
	})
});

module.exports = artical;