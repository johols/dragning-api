module.exports = (app) => {
    const talks = require('../controllers/talk.controller.js');

    // Create a new Talk
    app.post('/talks', talks.create);

    // Retrieve all talks
    app.get('/talks', talks.findAll);

    // Retrieve a single Talk with talkId
    app.get('/talks/:talkId', talks.findOne);

    // Update a Talk with talkId
    app.put('/talks/:talkId', talks.update);

    // Delete a Talk with talkId
    app.delete('/talks/:talkId', talks.delete);
}