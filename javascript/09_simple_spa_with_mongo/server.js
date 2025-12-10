const express = require("express");
const mongoose = require("mongoose");
const itemModel = require("./models/item");

const app = express();

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_pw = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_pw+"@"+mongo_url+"/porishopping?appName=testiklusteri";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)

//Checks if the "Content-Type"-header is "application/json" and then translates it into request body (req.body)

app.use(express.json());

//Services static files at "frontend" folder

app.use("/",express.static("frontend"));

//REST API
//base address: /api/shopping
//GET /api/shopping get the shoppinglist
//POST /api/shopping post new shopping item
//DELETE /api/shopping/:id remove item with id :id
//PUT /api/shopping/:id edit item with id :id

//Shopping item
//id: Number
//type:String
//count:Number
//price:Number

app.get("/api/shopping",function(req,res) {
	itemModel.find().then(function(contacts) {
		return res.status(200).json(contacts);
	}).catch(function(err) {
		console.log("Failed to find contacts. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.post("/api/shopping",function(req,res) {
	let item = new itemModel({
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	})
	item.save().then(function() {
		return res.status(201).json({"Message":"Created"});
	}).catch(function(err) {
		console.log("Failed to add new contact. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.delete("/api/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id}).then(function() {
		return res.status(200).json({"Message":"Success"})
	}).catch(function(err) {
		console.log("Failed to remove contact. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.put("/api/shopping/:id",function(req,res) {
	let item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	itemModel.replaceOne({"_id":req.params.id},item).then(function(){
		return res.status(200).json({"Message":"Success"});
	}).catch(function(err) {
		console.log("Failed to edit contact. Reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

console.log("Running in port 3000");

app.listen(3000);