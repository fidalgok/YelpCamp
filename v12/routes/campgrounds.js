var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware'); //will automatically require index.js for us

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
router.get("/new", middleware.isLoggedIn ,function(req, res){
	
	res.render("campgrounds/new");
});

//CREATE route, Add new campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
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
			//console.log("campground created!");

		
			//console.log(campground);
			//redirect back to campgrounds page
			req.flash("success", "Created campground " + campground.name);
			res.redirect("/campgrounds");
		}
	});
});

//SHOW route, shows an individual campground

router.get("/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err || !foundCampground){
			req.flash("error", "Sorry, campground not found");
			res.redirect("/campgrounds");
		}else{
			//render the show template
			//console.log(foundCampground);
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
		console.log(req.campground);
		res.render("campgrounds/edit", {campground: req.campground});
});

//update campground route

router.put("/:id", middleware.checkCampgroundOwnership,function(req, res){
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

router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		} else {
			req.flash("success", "Deleted campground");
			res.redirect("/campgrounds")
		}
	});
});



module.exports = router;