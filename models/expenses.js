var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var expenseSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, default: Date.now },
	category: String,
	subcategory: String,
	amount: Number,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
         	ref: "User"
         },
		username: String
	}
});

expenseSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Expense", expenseSchema);