var path = require("path");
var fs = require("fs");
var express = require("express");
// ========================================================================

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ========================================================================

// should return index.html file
app.get(" * ", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "index.html"));
});


// should return notes.html file
app.get("/notes", function (req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "notes.html"));
});

// ========================================================================









// ========================================================================

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});