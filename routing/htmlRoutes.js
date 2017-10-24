// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content

    // Home Page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });

    // Example XYZ (Placeholder)
    app.get("/example", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/example.html"));
    });

    // If no matching route is found, default to the Home Page
    app.get(function(req, res) {
        res.sendFile(path.join(__dirname, "/../public/index.html"));
    });

    // Passport Below********
    // app.get("/pages/login.html", function(req, res) {
    //     // If the user already has an account send them to the members page
    //     if (req.user) {
    //         res.redirect("../pages/index.html");
    //     }
    //     res.sendFile(path.join(__dirname + "../public/pages/login.html"));
    //     res.sendFile(path.join(__dirname, "/pages/aboutus.html"));

    // });
};