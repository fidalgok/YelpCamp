var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/YelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//set up Schema

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String
});

//model setup remember Models traditionally start with a 
//capital letter, this line of code makes us a model that
//we can use to create Campgrounds. We can use the CRUD methods
//on Campgound now.
var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [
		{
			name: "Salmon Path", image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b"
		},
		{
			name: "Yodel Mountain", image: "https://images.unsplash.com/photo-1484960055659-a39d25adcb3c"
		},
		{
			name: "Stoney Path", image: "https://images.unsplash.com/photo-1487730116645-74489c95b41b"
		},
		{
			name: "Alabama Hills", image: "https://images.unsplash.com/photo-1499363145340-41a1b6ed3630"
		}
	];

//routes

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});

app.post("/campgrounds", function(req, res){
	//get data from form and add to campgrounds array
	
	var name = req.body.campgroundName;
	var image = req.body.imgUrl;
	var newCampground = {name: name, image: image};
	campgrounds.push(newCampground);
	
	//redirect back to campgrounds page
	res.redirect("/campgrounds");
});

//listener

app.listen(3000, function(req, res){
	console.log('YelpCamp Server has started!');
});