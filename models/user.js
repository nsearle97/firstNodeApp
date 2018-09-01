var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	username: String, 
	password: String,
	firstName: String,
	lastName: String,
	expenses: [{
		id: mongoose.Schema.Types.ObjectId,
		date: {type: Date, default: Date.now},
		category: String,
		subcategory: String,
		amount: Number
	}]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);