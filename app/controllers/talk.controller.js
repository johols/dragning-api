const Talk = require('../models/talk.model.js');

// Create and Save a new Talk
exports.create = (req, res) => {
  // Validate request
  if(!req.body.title) {
      return res.status(400).send({
          message: "Talk content can not be empty"
      });
  }

  // Create a Talk
  const talk = new Talk({
    title: req.body.title || "Untitled Talk", 
    imageurl: req.body.imageurl,
    summary: req.body.summary,
    body: req.body.body,
    speaker: req.body.speaker,
    about: req.body.about,
    grade: req.body.grade,
    startnr: req.body.startnr,
    comment: req.body.comment,
    buzzone: req.body.buzzone,
    buzztwo: req.body.buzztwo,
    buzzthree: req.body.buzzthree
  });

  // Save Talkn the database
  talk.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while creating the Talk."
      });
  });
};

// Retrieve and return all talks from the database.
exports.findAll = (req, res) => {
  Talk.find()
  .then(talks => {
      res.send(talks);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving talks."
      });
  });
};

// Find a single talk with a talkId
exports.findOne = (req, res) => {
  Talk.findById(req.params.talkId)
  .then(talk => {
      if(!talk) {
          return res.status(404).send({
              message: "Talkte not found with id " + req.params.talkId
          });            
      }
      res.send(talk);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Talk not found with id " + req.params.talkId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving talk with id " + req.params.talkId
      });
  });
};

// Update a talk identified by the talkId in the request
exports.update = (req, res) => {
  // Validate Request
  if(!req.body.content) {
      return res.status(400).send({
          message: "Talk content can not be empty"
      });
  }

  // Find talk and update it with the request body
  Talk.findByIdAndUpdate(req.params.talkId, {
    title: req.body.title || "Untitled Talk", 
    imageurl: req.body.imageurl,
    summary: req.body.summary,
    body: req.body.body,
    speaker: req.body.speaker,
    about: req.body.about,
    grade: req.body.grade,
    startnr: req.body.startnr,
    comment: req.body.comment,
    buzzone: req.body.buzzone,
    buzztwo: req.body.buzztwo,
    buzzthree: req.body.buzzthree
  }, {new: true})
  .then(talk => {
      if(!talk) {
          return res.status(404).send({
              message: "Talk not found with id " + req.params.talkId
          });
      }
      res.send(talk);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Talk not found with id " + req.params.talkId
          });                
      }
      return res.status(500).send({
          message: "Error updating talk with id " + req.params.talkId
      });
  });
};

// Delete a talk with the specified talkId in the request
exports.delete = (req, res) => {
  Talk.findByIdAndRemove(req.params.talkId)
  .then(talk => {
      if(!talk) {
          return res.status(404).send({
              message: "Talk not found with id " + req.params.talkId
          });
      }
      res.send({message: "Talk deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Talk not found with id " + req.params.talkId
          });                
      }
      return res.status(500).send({
          message: "Could not delete talk with id " + req.params.talkId
      });
  });
};