const router = require('express').Router();
const fs = require ("fs");
// The code below imports the 'UUIDV4'function from the 'UUID' module to generate unique identifiers.
const { v4: uuidv4 } = require('uuid');

// The codes create route for request to '/api/notes'. 
router.get('/api/notes', async (req, res) => {
  const dbJsonFile = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(dbJsonFile);
});

// The codes post request.
router.post('/api/notes', (req, res) => {
  const dbJsonFile = JSON.parse(fs.readFileSync("db/db.json","utf8"));
  const latestNotes = {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
  };
  dbJsonFile.push(latestNotes);
  fs.writeFileSync("db/db.json",JSON.stringify(dbJsonFile));
  res.json(dbJsonFile);
});

// The codes below is for the BONUS DELETE requests requirement.
router.delete('/api/notes/:id', (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8");
  const notes =  JSON.parse(data);
  const deleteNotes = notes.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json",JSON.stringify(deleteNotes));
  res.json("Your note is deleted.");
});

module.exports = router; 