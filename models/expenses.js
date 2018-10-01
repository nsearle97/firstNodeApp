var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var expenseSchema = new mongoose.Schema({
	date: String,
	category: String,
	subcategory: String,
	amount: String
	// owner: {
	// 	type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
	// }
});

expenseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Expense", expenseSchema);