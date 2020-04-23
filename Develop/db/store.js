
const router = require("express").Router();
const store = require("../db/store");

//write necessary functions


// GET "/api/notes" responds with all notes from the database
router.get("/notes", function (req, res) {
    store
        .getNotes()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});





//read()
function read (){
router.get("/api/notes", function (req, res) {
    res.readFileAsync("db/db.json", "utf8")
})
}


//write()
function write (note){
router.post("/api/notes", function (req, res) {
    res.writeFileAsync("db/db.json", "utf8");
})
}

//removeNotes()
function removeNotes (){
router.delete("/api/notes/:id", function(req, res){
    res.writeFile("db/db.json", "utf8")
})    
}






//getNotes()

//addNotes()

