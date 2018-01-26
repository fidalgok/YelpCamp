var mongoose = require('mongoose');
//set up Schema


var campgroundSchema = mongoose.Schema({
	name: String,
	image: String,
	description: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});


//model setup remember Models traditionally start with a 
//capital letter, this line of code makes us a model that
//we can use to create Campgrounds. We can use the CRUD methods
//on Campgound now.
module.exports = mongoose.model("Campground", campgroundSchema);