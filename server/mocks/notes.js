module.exports = function (app) {
  var express = require('express');
  var notesRouter = express.Router();

  // Use the body-parser library in this service
  var bodyParser = require('body-parser');
  app.use(bodyParser.json());

  // Create an embedded table using NEDB if it doesn't exist yet
  var nedb = require('nedb');
  var noteDB = new nedb({filename: 'notes', autoload: true});

  notesRouter.get('/', function (req, res) {
    noteDB.find(req.query).exec(function (error, notes) {
      res.send({
        'notes': notes
      })
    })
  });

  notesRouter.post('/', function (req, res) {

    // Look for the most recently created record
    noteDB.find({}).sort({id: -1}).limit(1).exec(function (err, notes) {

      if (notes.length != 0)
        req.body.note.id = notes[0].id + 1;
      else
        req.body.note.id = 1;

      // Insert the new record
      noteDB.insert(req.body.note, function (err, newNote) {
        res.status(201);
        res.send(JSON.stringify({note: newNote}));
      })
    });
  });

  // unchanged
  notesRouter.get('/:id', function (req, res) {
    res.send({
      'notes': {
        id: req.params.id
      }
    });
  });

  notesRouter.put('/:id', function (req, res) {
    var id = parseInt(req.params.id);

    noteDB.update({id: id}, {$set: req.body.note},
        function (err, numReplaced, newNotes) {
          res.send({'notes': {id: id}});
        }
    );
  });

  notesRouter.delete('/:id', function (req, res) {
    var id = parseInt(req.params.id);

    noteDB.remove({id: id}, function (err, numRemoved) {
      res.status(204).end();
    });
  });

  app.use('/api/notes', notesRouter);
};
