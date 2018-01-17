var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	Campground = require('./models/campground'),
	Comment = require('./models/comment'),
	User = require('./models/user'),
	seedDB = require('./seeds');


//Delete all data, then seed database with new info.
seedDB();
mongoose.connect("mongodb://localhost/YelpCamp");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
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
			res.render("campgrounds/index", {campgrounds : allCampgrounds});
		}
	});
	
});

//NEW route, form to make a new campground
app.get("/campgrounds/new", function(req, res){
	res.render("campgrounds/new");
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
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

//==========
//Comments routes
//=============

app.get("/campgrounds/:id/comments/new", function(req, res){
	//find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground:campground});
		}
	});
	
});

//Comments Post route
app.post("/campgrounds/:id/comments", function(req, res){
	//Find Campground
	//create new post, on success reference it within the campground
	Campground.findById(req.params.id, function(err, campground){
				if(err){
					console.log("error finding campground from post route.");
					console.log(err);
					res.redirect("/campgrounds");
				} else {
					Comment.create(req.body.comment, function(err, comment){
						if (err){
							console.log("error from comment create post route")
							console.log(err);
						} else {
					
							campground.comments.push(comment._id);
							campground.save();
							res.redirect("/campgrounds/" + campground._id);
			
						}
					});
					

				}
			});


	
});

/**************************

User Auth Routes

**************************/

//show register form
app.get('/register', function(req, res){
	res.render("register");
});

//signup logic
app.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log("User registration error:" + err);
			return res.render('register');
		}
		//once user has signed up, log them in with authenticate
		//and redirect to the campgrounds page
		passport.authenticate('local')(req, res, function(){
			res.redirect('/campgrounds');
		});

	})
});


//listener

app.listen(3000, function(req, res){
	console.log('YelpCamp Server has started!');
});