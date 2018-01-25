var express = require('express');
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware')

//==========
//Comments routes
//=============

router.get("/new", middleware.isLoggedIn ,function(req, res){
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
router.post("/", middleware.isLoggedIn,function(req, res){
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

/********************************
	Comments Edit Routes
********************************/

router.get("/:commentId/edit", middleware.checkCommentOwnership,function(req, res){
	//get the comment by it's id
	Comment.findById(req.params.commentId, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {comment: comment, campgroundId: req.params.id});
		}
		
	});
	
});

router.put("/:commentId", middleware.checkCommentOwnership,function(req, res){
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});

/********************
	Comments Destroy
********************/

router.delete("/:commentId", middleware.checkCommentOwnership,function(req, res){
	//findbyidandremove
	Comment.findByIdAndRemove(req.params.commentId, function(err){
		if(err){
			res.redirect("back");
		} else {
			//back to the show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
	
});

module.exports = router;