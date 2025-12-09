const express = require("express");

const app = express();

let database = [];
let id = 100;

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
	return res.status(200).json(database);
})

app.post("/api/shopping",function(req,res) {
	let item = {
		id:id,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	id++;
	database.push(item);
	return res.status(201).json(item);
})

app.delete("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	database = database.filter(item => item.id !== tempId);
	return res.status(200).json({"Message":"Success"});
})

app.put("/api/shopping/:id",function(req,res) {
	let tempId = parseInt(req.params.id);
	let item = {
		id:tempId,
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	for(let i=0;i<database.length;i++) {
		if(database[i].id === tempId) {
			database.splice(i,1,item);
			return res.status(200).json({"Message":"Success"})
		}
	}
	return res.status(404).json({"Message":"Not found"})
})

console.log("Running in port 3000");

app.listen(3000);