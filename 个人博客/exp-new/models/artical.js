const mongoose = require("mongoose");

const ArticalSchema = new mongoose.Schema({
	title: {
		type: String,
		require: true
	},
	content: {
		type: String,
	},
	// author 可用存User 的 ObjectId, 可以存 User 的 username
	author: {
		type: String,
		required: true
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});

const ArticalModel = mongoose.model("artical", ArticalSchema, "artical");

module.exports = ArticalModel;