const express = require("express");
const fs = require("fs");
const path = require("path");
// ========================================================================
// Tells node that we are creating an "express" server
const app = express();
// Sets an initial port
const PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// creats empty array to store notes
let notes = [];

// ========================================================================

app.get("/api/notes", (req, res) => {
    let returnedNotes = "";
    try {
        returnedNotes = fs.readFileSync("./db/db.json", "utf8");
    }
    catch (err) {
        console.log("")
    }
    res.json(JSON.parse(returnedNotes));
})
// pushes the new written note into the notes array when the save button is pressed
app.post("/api/notes", (req, res) => {
    notes.push(req.body)
    fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', err => {
        if (err) {
            throw err;
        }
    });
    res.json(notes);
})
// deletes the stored note when the delete button is pressed

//  ========================================================================

// HTML Routes
// opens up the Notes.html page when the notes button is clicked in the index
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})
// opens up the Main Index.html page when server starts
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// ========================================================================

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});