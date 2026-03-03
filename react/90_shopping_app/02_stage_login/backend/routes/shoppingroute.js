const express = require("express");
const itemModel = require("../models/item");

const router = express.Router();

router.get("/shopping",function(req,res) {
	itemModel.find().then(function(items) {
		return res.status(200).json(items);
	}).catch(function(err) {
		console.log("Failed to find shopping items. Reason",err);
		return res.status(500).json({"Message":"Internal server error"});
	})
})

router.post("/shopping",function(req,res) {
	if(!req.body || !req.body.type) {
		return res.status(400).json({"Message":"Bad request"})
	}
	const item = new itemModel({
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	})
	item.save().then(function(item) {
		return res.status(201).json(item);
	}).catch(function(err) {
		console.log("Failed to create new item. Reason",err);
		return res.status(500).json({"Message":"Internal server error"});
	})
})

router.delete("/shopping/:id",function(req,res) {
	itemModel.deleteOne({"_id":req.params.id}).then(function() {
		return res.status(200).json({"Message":"Success"})	
	}).catch(function(err) {
		console.log("Failed to delete item. Reason",err);
		return res.status(500).json({"Message":"Internal server error"});
	})
})

router.put("/shopping/:id",function(req,res) {
	if(!req.body || !req.body.type) {
		return res.status(400).json({"Message":"Bad request"})
	}
	const item = {
		type:req.body.type,
		count:req.body.count,
		price:req.body.price
	}
	itemModel.replaceOne({"_id":req.params.id},item).then(function() {
		return res.status(201).json({"Message":"Success"});
	}).catch(function(err) {
		console.log("Failed to edit item. Reason",err);
		return res.status(500).json({"Message":"Internal server error"});
	})	
})


module.exports = router;