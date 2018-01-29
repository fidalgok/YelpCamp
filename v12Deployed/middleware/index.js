//all middleware goes here
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		

		//otherwise also redirect
		Campground.findById(req.params.id, function(err, campground){
			if(err || !campground){
				req.flash("error", "Campground not found");
				res.redirect("back");
			} else if(campground.author.id.equals(req.user._id)){
				//does user own campground?
				/*use the mongoose method .equals to compare the 
				author id object to the id string from the request user object*/
				req.campground = campground;
				next();
	
			} else {
					req.flash("error", "You don't have permission to do that")
					res.redirect("back");
			}
			
		});
	

	} else { //if no user logged in, redirect
		req.flash("error", "You need to be logged in to do that!");
		res.redirect("back"); //sends user to previous page they were on
	}
}

middlewareObj.isLoggedIn = function (req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that.");
	res.redirect("/login");
}

middlewareObj.checkCommentOwnership = function (req, res, next){
	if(req.isAuthenticated()){
		

		//otherwise also redirect
		Comment.findById(req.params.commentId, function(err, comment){
			if(err || !comment){
				console.log(err);
				req.flash("error", "Comment not found");
				res.redirect("back");
			} else if(comment.author.id.equals(req.user._id)){
				//does user own comment?
				/*use the mongoose method .equals to compare the 
				author id object to the id string from the request user object*/
				
					req.comment = comment;
					next();
	
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			
		});

	} else { //if no user logged in, redirect
		req.flash("error","you need to be logged in to do that!");
		res.redirect("back"); //sends user to previous page they were on
	}
}


module.exports = middlewareObj;