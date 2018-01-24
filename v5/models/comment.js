var mongoose = require('mongoose');
//set up Schema

var commentSchema = mongoose.Schema({
	text: String,
	author: String
});


//model setup remember Models traditionally start with a 
//capital letter, this line of code makes us a model that
//we can use to create Campgrounds. We can use the CRUD methods
//on Campgound now.
module.exports = mongoose.model("Comment", commentSchema);