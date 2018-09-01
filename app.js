var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require("body-parser");
var session = require("express-session");
var User = require("./models/user");
var flash = require("connect-flash");
var port = process.env.PORT || 28017;
var ip = process.env.IP || "127.0.0.1";
var url = "mongodb://heroku_1p8hlz07:issf6foq9elr0fs66krnt9nadq@ds159661.mlab.com:59661/heroku_1p8hlz07";

mongoose.Promise = global.Promise;
mongoose.connect(url);
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(require("express-session")({
    secret: "Blah",
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
	if(req.isAuthenticated()){
		res.render("home", {user: req.user});
	} else {
		res.redirect("/login");
	}
})

app.get("/register", function(req, res){
	res.render("register");
})

app.post("/register", function(req, res) {
	var newUser = new User({username: req.body.username, firstName: req.body.firstName, lastName: req.body.lastName})
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.redirect("/register");
		} 
		passport.authenticate("local")(req, res, function(){
			res.redirect("/");
			console.log(newUser);
		})
	})
})

app.get("/login", function(req, res){
	res.render("login");
})

app.post("/login", passport.isAuthenticated("local",
	{
		successRedirect: "/",
		failureRedirect: "/login",
		successFlash: "Welcome to your dashboard!",
		failureFlash: true
	}), function(req, res){
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/login");
});

// app.get("/*", function(req, res){
// 	if(req.isAuthenticated()){
// 		res.send("Secret");
// 		console.log(req.user.username);
// 	} else {
// 		res.send("You must be logged in to do that");
// 	}	
// })

app.listen(port, function(){
	console.log("Server has started on port " + port + "!")
})