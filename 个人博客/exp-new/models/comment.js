const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
	content: {
		type: String,
	},
	// author 可用存User 的 ObjectId, 可以存 User 的 username
	author: {
		type: String,
		required: true
	},
	artical: {
		type: mongoose.Schema.types.ObjectId,
		required: true,
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});
