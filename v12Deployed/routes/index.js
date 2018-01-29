var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');


router.get("/", function(req, res){
	res.render("landing", {currentUser : req.user});
});

/**************************

User Auth Routes commonly placed in index.js

**************************/

//show register form
router.get('/register', function(req, res){
	res.render("register");
});

//signup logic
router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			req.flash("error", "User registration error: " + err.message);
			return res.redirect('/register');
		}
		//once user has signed up, log them in with authenticate
		//and redirect to the campgrounds page
		passport.authenticate('local')(req, res, function(){
			req.flash("success", "Successfully signed up, welcome to YelpCamp " + user.username);
			res.redirect('/campgrounds');
		});

	})
});

//show login form

router.get("/login", function(req, res){
	res.render("login");
});

//login logic

router.post("/login", passport.authenticate("local", 
	{
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash: true
	}), function(req, res){

});

//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/campgrounds");
});


module.exports = router;
