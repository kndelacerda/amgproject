// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var session = require("express-session");
// var passport = require("./config/passport");
// var db = require("./models");


// Create an instance of the express app.
var app = express();

// Specify the port.
var PORT = 4000;


// BodyParser makes it possible for our server to interpret data sent to it.
// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static('/public'));
app.use(express.static(process.cwd() + "/public"));

// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// ================================================================================
// ROUTER 
// require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes.js")(app);
// ================================================================================

// Syncing our database and logging a message to the user upon success
// db.sequelize.sync().then(function() {
//     app.listen(PORT, function() {
//         console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
//     });
// });

app.listen(process.env.PORT || PORT, function() {
    console.log(process.env.PORT)
    console.log('App listening on PORT ' + PORT);
});