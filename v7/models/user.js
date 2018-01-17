var mongoose = require('mongoose'),
	passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
	username: String,
	password: String
});
//adds functionality to our user model like adiitional methods
//we can call later
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);