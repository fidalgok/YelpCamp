var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	seedDB = require('./seeds');

//Delete all data, then seed database with new info.
seedDB();
mongoose.connect("mongodb://localhost/YelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



//routes

app.get("/", function(req, res){
	res.render("landing");
});

//Index Route, Display list of all campgrounds
app.get("/campgrounds", function(req, res){
	//get all campgrounds from db
	Campground.find({}, function(err,allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("index", {campgrounds : allCampgrounds});
		}
	});
	
});

//NEW route, form to make a new campground
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

//CREATE route, Add new campground to database
app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	
	var name = req.body.campgroundName;
	var image = req.body.imgUrl;
	var description = req.body.description;
	var newCampground = {name: name, image: image, description: description};
	//create new campground and save to database
	Campground.create(newCampground, function(err, campground){
		if(err){
			console.log(err);
		}else{
			console.log("campground created!");
			console.log(campground);
			//redirect back to campgrounds page
			res.redirect("/campgrounds");
		}
	});
});

//SHOW route, shows an individual campground

app.get("/campgrounds/:id", function(req, res){
	//find campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			//render the show template
			console.log(foundCampground);
			res.render("show", {campground: foundCampground});
		}
	});
});

//listener

app.listen(3000, function(req, res){
	console.log('YelpCamp Server has started!');
});