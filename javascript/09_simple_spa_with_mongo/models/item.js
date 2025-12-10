const mongoose = require("mongoose");

let Schema = mongoose.Schema({
	type:{type:String,index:true},
	count:Number,
	price:Number
})

module.exports = mongoose.model("Item",Schema);