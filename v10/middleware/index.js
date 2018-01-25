//all middleware goes here
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		

		//otherwise also redirect
		Campground.findById(req.params.id, function(err, campground){
			if(err){
				console.log(err);
				res.redirect("back");
			} else{
				//does user own campground?
				/*use the mongoose method .equals to compare the 
				author id object to the id string from the request user object*/
				if(campground.author.id.equals(req.user._id)){
					next();
	
				} else {
					res.redirect("back");
				}
			}
		});

	} else { //if no user logged in, redirect
		console.log("you need to be logged in to do that!");
		res.redirect("back"); //sends user to previous page they were on
	}
}

middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		

		//otherwise also redirect
		Comment.findById(req.params.commentId, function(err, comment){
			if(err){
				console.log(err);
				res.redirect("back");
			} else{
				//does user own comment?
				/*use the mongoose method .equals to compare the 
				author id object to the id string from the request user object*/
				if(comment.author.id.equals(req.user._id)){
					next();
	
				} else {
					res.redirect("back");
				}
			}
		});

	} else { //if no user logged in, redirect
		console.log("you need to be logged in to do that!");
		res.redirect("back"); //sends user to previous page they were on
	}
}


module.exports = middlewareObj;