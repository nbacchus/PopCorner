const { Schema } = require('mongoose');

const showSchema = new Schema({
  genre: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
  },
  url: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  showID: {
    type: String,
    required: true
  }
});

module.exports = showSchema;
