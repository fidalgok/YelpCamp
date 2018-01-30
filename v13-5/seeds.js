	// * https://images.unsplash.com/photo-1504280390367-361c6d9f38f4
	// * https://images.unsplash.com/photo-1479741044197-d28c298f8c77
	// * https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a
	// *whispy peak https://images.unsplash.com/photo-1445308394109-4ec2920981b1
var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4",
		description: "Sleep among the clouds at this great site. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
						"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
						"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"+
						"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"+
						"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"+
						"proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
	},
	{
		name: "Cat's Peak",
		image: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77",
		description: "Wild cats overrun this beautiful campsite. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
						"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
						"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"+
						"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"+
						"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"+
						"proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
	},
	{
		name: "Granite Path",
		image: "https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a",
		description: "The most granite anywhere! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
						"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
						"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"+
						"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"+
						"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"+
						"proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
	},
	{
		name: "Lake Puckwudgie",
		image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1",
		description: "Pristine swimming can be found here.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod" +
						"tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"+
						"quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo"+
						"consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse"+
						"cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non"+
						"proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
	}
];
function seedDB(){
	//remove everything from the database to have a fresh start
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("removed campgrounds");
			//create some campgrounds, place inside the remove callback
			//so that all campgrounds are removed first then, the callback 
			//function gets executed and we can create campgrounds while being
			//sure that they won't get removed by the original method being called.
			data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if(err){
						console.log(err);
					} else {
						console.log("campground created");
						//create comments
						Comment.create(
						{
							text: "This place was great.",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								campground.comments.push(comment._id);
								campground.save();
								console.log("comment created");
							}
						});
					}
				});
			});
		}

	});

}

//pass the function to the app.js file, remember when passing a function
//just pass the name, adding the () will attempt to call it immediately 
//which will cause an error
module.exports = seedDB;