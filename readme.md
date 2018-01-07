#Y elpCamp v1
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
	* Name
	* Image
	[
		{name: "Salmon Creek", image: "http://www.image.com"},
		{name: "Salmon Creek", image: "http://www.image.com"}

	]

* Used the Git Bash commands to set up my Linux box to push changes to Github.
adding more material to see if it shows up.

# Layout and basic Styling
* Create our header and footer partials
* Add in Bootstrap

# Creating new campgrounds
* set up new campground post route
* add in body-parser 
* setup route to show form and added some text
* and some more
* add basic unstyled form

# style the campgrounds page
* add a better title
* Make campgrounds display in a grid

# style the navbar and form
* Add a navbar to all templates
* style the new campground form

# YelpCamp v2
## Install and configure Mongoose
* Setup Campground Model
* Use the model inside of our routes

## Show Page
* review the RESTful routes we've seen so far
* add description to our campground model
* Show db.collection.drop()
* add a show route/template

RESTful ROUTES
name 	URL 			Verb 	description
=======================================================
INDEX 	/dogs 			GET 	Displays a list of all dogs
NEW 	/dogs/new 		GET 	Form to create a new dog
CREATE 	/dogs			POST 	Add new dog to the database, then										redirect somewhere
SHOW 	/dogs/:id 		GET		Gets info about one dog
EDIT 	/dogs/:id/edit 	GET 	Gets a form to edit a dog
UPDATE 	/dogs/:id 		PUT 	Update dog info, then redirect
DESTROY /dogs/:id 		DELETE 	Delete dog, then redirect





