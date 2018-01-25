var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	methodOverride = require('method-override'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');
//set up routes here
var commentRoutes = require('./routes/comments'),
	campgroundRoutes = require('./routes/campgrounds'),
	indexRoutes = require('./routes/index');


//Delete all data, then seed database with new info.
//seedDB(); // seed database
mongoose.connect("mongodb://localhost/YelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
//creates a path starting from the root directory of where this file (app.js)
//lives __dirname points to ~/Documents/webdev/yelpcamp etc all the way to this
//path so that we can point to the correct location of folders to use.
app.use(express.static(__dirname + "/public"));

/*
	configure Passport
*/

app.use(require('express-session')({
	secret:"space cat",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/*
	rather than passing req.user to every route manually we can
	write our own middleware. app.use will use it on every route we
	create so we can access our user throughout the site
*/

app.use(function(req, res, next){
	//whatever we put inside of res.locals is what's 
	//available inside of our template
	//req.user is coming from passport
	res.locals.currentUser = req.user;
	next();
});

/*has to show up below our middle ware function or the website
	will throw errors about not knowing what the current user is*/
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes); //don't forget to set merge params on routes file
app.use(indexRoutes);

//listener

app.listen(3000, function(req, res){
	console.log('YelpCamp Server has started!');
});