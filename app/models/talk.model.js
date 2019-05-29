const mongoose = require('mongoose');

const TalkSchema = mongoose.Schema({
  title: String,
  speaker: String,
  imageurl: String,
  summary: String,
  body: String,
  about: String,
  grade: String,
  startnr: String,
  comment: String,
  buzzone: String,
  buzztwo: String,
  buzzthree: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Talk', TalkSchema);