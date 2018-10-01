var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Expense = require("./expenses");

var userSchema = new mongoose.Schema({
	username: String, 
	password: String,
	firstName: String,
	lastName: String,
	expenses: [{
		name: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Expense'
		},
		date: String,
		category: String,
		subcategory: String,
		amount: String
	}]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);