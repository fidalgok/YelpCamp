#YelpCamp v1
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
	* Name
	* Image
	[
		{name: "Salmon Creek", image: "http://www.image.com"},
		{name: "Salmon Creek", image: "http://www.image.com"}

	]
* Some fake campground images
	* https://images.unsplash.com/photo-1504280390367-361c6d9f38f4
	* https://images.unsplash.com/photo-1479741044197-d28c298f8c77
	* https://images.unsplash.com/photo-1503265192943-9d7eea6fc77a
	* https://images.unsplash.com/photo-1445308394109-4ec2920981b1


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


# YelpCamp v3

## Refactor App.js
* refactor mongoose code
* use module.exports
* require everything correctly

## Seed Database
* add seeds.js file
* run the seeds file to initialize database each time we run the server to 
aid in testing.

## Add the comment Model
* make errors go away
* display comments on the campground show page


# YelpCamp v4

RESTful ROUTES
name 	URL 			Verb 	description
=======================================================
NEW 	campgrounds/:id/comments/new GET
CREATE 	campgrounds/:id/comments 	 POST

## New Routes
* Discuss nested routes
	* Nest the routes as seen in the table above
* Add the comment new and create routes
* add the new comment form





