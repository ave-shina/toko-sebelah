const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stuffSchema = new Schema({
  username: { type: String, required: true },
  price: { type:  Number, required: true },
  duration: { type: Date, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Stuff = mongoose.model('Stuff', stuffSchema);

module.exports = Stuff;