var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

//==========
//Comments routes
//=============

router.get("/new", isLoggedIn ,function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground:campground});
		}
	});
	
});

//Comments Create Post route
router.post("/", isLoggedIn,function(req, res){
	//Find Campground
	//create new post, on success reference it within the campground
	Campground.findById(req.params.id, function(err, campground){
				if(err){
					console.log("error finding campground from post route.");
					console.log(err);
					res.redirect("/campgrounds");
				} else {
					Comment.create(req.body.comment, function(err, comment){
						if (err){
							console.log("error from comment create post route")
							console.log(err);
						} else {
							//add username and id to comment
							comment.author.id = req.user._id;
							comment.author.username = req.user.username;
							//save comment
							
							comment.save();
							campground.comments.push(comment._id);
							campground.save();
							res.redirect("/campgrounds/" + campground._id);
			
						}
					});
					

				}
			});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

module.exports = router;