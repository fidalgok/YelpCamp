var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');

//Campground routes

//Index Route, Display list of all campgrounds
router.get("/", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {
				campgrounds : allCampgrounds,
				currentUser : req.user //username and id of logged in user
			});
		}
	});
	
});

//NEW route, form to make a new campground
router.get("/new", isLoggedIn ,function(req, res){
	res.render("campgrounds/new");
});

//CREATE route, Add new campground to database
router.post("/", isLoggedIn, function(req, res){
	//get data from form and add to campgrounds array
	
	var name = req.body.campgroundName;
	var image = req.body.imgUrl;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author:author};
	//create new campground and save to database
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		}else{
			console.log("campground created!");

		
			//console.log(campground);
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//SHOW route, shows an individual campground

router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//render the show template
			//console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//Edit campground route
router.get("/:id/edit", checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		res.render("campgrounds/edit", {campground: campground});
	});	
});

//update campground route

router.put("/:id", checkCampgroundOwnership,function(req, res){
	//find and update the correct campground
	// console.log(req.body.campground);
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, 
		function(err, campground){
			if(err){
				res.redirect("/campgrounds");
			} else {
				//redirect somewhere (Show page)
				// console.log(campground);
				res.redirect("/campgrounds/" + req.params.id);
			}
		});
	
});

//DESTROYYYYY

router.delete("/:id", checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds")
		}
	});
});

//Middleware

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next){
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

module.exports = router;