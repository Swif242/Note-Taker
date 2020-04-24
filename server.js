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
// creates empty array to store notes
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
    try {
        // giving Notes an ID
        req.body.id = notes.length;
        console.log(notes);
        
        if (!Array.isArray(notes)) {
            notes = JSON.parse(notes);
        }




        notes.push(req.body)
        fs.writeFile('./db/db.json', JSON.stringify(notes), 'utf8', err => {
            if (err) {
                throw err;
            }
        });

        res.json(notes);

    } catch (err) {
        console.log("")
    }
});

// deletes the stored note when the delete button is pressed
app.delete("/api/notes/:id", function (req, res) {
    try {
        notes = fs.readFileSync("./db/db.json", "utf8");
        notes = JSON.parse(notes);
        // Deletes Old Notes from Array
        notes = notes.filter(note => {
            return note.id != req.params.id;
        });
        notes = JSON.stringify(notes);
        // Write New Note to File
        fs.writeFile("./db/db.json", notes, "utf8", err => {
            if (err)
                throw err;
        });
        res.json(JSON.parse(notes));
        // Error Handling
    } catch (err) {
        throw err;
    }
});
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