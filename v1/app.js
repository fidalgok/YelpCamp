var express = require('express');
var app = express();
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
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds: campgrounds});
});

app.listen(3000, function(req, res){
	console.log('YelpCamp Server has started!');
});