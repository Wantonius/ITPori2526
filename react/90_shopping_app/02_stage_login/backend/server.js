const express = require("express");
const mongoose = require("mongoose");
const shoppingroute = require("./routes/shoppingroute");
const bcrypt = require("bcrypt");
const userModel = require("./models/user");
const sessionModel = require("./models/session");
const crypto = require("crypto");


const app = express();

app.use(express.json());
/*
const mongo_url = process.env.MONGODB_URL;
const mongo_user = process.env.MONGODB_USER;
const mongo_password = process.env.MONGODB_PASSWORD;

const url = "mongodb+srv://"+mongo_user+":"+mongo_password+"@"+mongo_url+"/?appName=testiklusteri"
*/

const url = "mongodb://localhost:27017/shoppingapp"
mongoose.set("toJSON",{virtuals:true});

console.log(url);

mongoose.connect(url).then(
	() => console.log("Connected to mongodb"),
	(err) => console.log("Failed to connect to mongodb. Reason:",err)
)
//HELPERS AND MIDDLEWARE

const time_to_live_diff = 3600000

createToken = () => {
	const token = crypto.randomBytes(64);
	return token.toString("hex");
}

//Middleware to authenticate and personalize user and data.
//User needs to have the token in the request headers and 
//the session still needs to be alive. Successfully navigating
//the filter middleware updates the time to live to an hour again.
//If anything fails we return 403 forbidden.

isUserLogged = (req,res,next) => {
	if(!req.headers.token) {
		return res.status(403).json({"Message":"Forbidden"});
	}
	sessionModel.findOne({"token":req.headers.token}.then(function(session) {
		if(!session) {
			return res.status(403).json({"Message":"Forbidden"});
		}
		let now = Date.now();
		if(now > session.ttl) {
			sessionModel.deleteOne({"_id":session._id}).then(function() {
				return res.status(403).json({"Message":"Forbidden"});
			}).catch(function(err) {
				console.log("Session deletion failed, Reason",err);
				return res.status(403).json({"Message":"Forbidden"});
			})
		} else {
			session.ttl = now + time_to_live_diff;
			req.session = {};
			req.session.user = session.user;
			session.save().then(function() {
				return next();
			}).catch(function(err) {
				consoie.log("Saving session failed, Reason",err);
				return next();
			})
		}
	}).catch(function(err) {
		console.log("Looking for session failed, Reason",err);
		return res.status(403).json({"Message":"Forbidden"});
	})
)}

//LOGIN API

app.post("/register",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(!req.body.username ||!req.body.password) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad request"})
	}
	bcrypt.hash(req.body.password,14,function(err,hash) {
		if(err) {
			return res.status(500).json({"Message":"Internal server error"})
		}
		const user = new userModel({
			username:req.body.username,
			password:hash
		})
		console.log(user)
		user.save().then(function() {
			return res.status(200).json({"Message":"Register Success"})
		}).catch(function(err) {
			if(err.code === 11000) {
				return res.status(409).json({"Message":"Username already in use"});
			}
			return res.status(500).json({"Message":"Internal server error"});
		});
	})
})

app.post("/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(!req.body.username ||!req.body.password) {
		return res.status(400).json({"Message":"Bad request"})
	}
	if(req.body.username.length < 4 || req.body.password.length < 8) {
		return res.status(400).json({"Message":"Bad request"})
	}
	userModel.findOne({"username":req.body.username}).then(function(user) {
		if(!user) {
			return res.status(401).json({"Message":"Unauthorized"});
		}
		bcrypt.compare(req.body.password,user.password,function(err,success) {
			if(err) {
				console.log("BCrypt compare failed, reason",err);
				return res.status(500).json({"Message":"Internal Server Error"})
				if(!success) {
					return res.status(401).json({"Message":"Unauthorized"});
				}
				const token = createToken();
				const now = Date.now();
				const session = new sessionModel({
					user:req.body.username,
					token:token,
					ttl:now+time_to_live_diff
				});
				session.save().then(function() {
					return res.status(200).json({"token":token})
				}).catch(function(err) {
					console.log("Session saving failed, Reason",err);
					return res.status(500).json({"Message":"Internal Server Error"})
				})
			}
		})
	}).catch(function(err) {
		console.log("Error in finding user, reason",err);
		return res.status(500).json({"Message":"Internal Server Error"});
	})
})

app.post("/logout",function(req,res) {
	if(!req.headers.token) {
		return res.status(404).json({"Message","Not Found"});
	} else {
		sessionModel.deleteOne({"token":req.headers.token}).then(function() {
			return res.status(200).json({"Message":"Logged out"});
		}).catch(function(err) {
			console.log("Session deletion failed, Reason",err);
			return res.status(500).json({"Message":"Internal Server Error"});
		})
	}
})

app.use("/api",isUserLogged,shoppingroute);

console.log("Running in port 3000");

app.listen(3000);