const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_pw = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_pw+"@"+mongo_url+"/appName=testiklusteri";

mongoose.connect(url).then(
	() => console.log("Connected to MongoDB"),
	(error) => console.log("Failed to connect to MongoDB. Reason",error)
)

app.listen(3000);

console.log("Running in port 3000");
