const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedShows` array in User.js

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

// const showSchema = new Schema({
//   authors: [
//     {
//       type: String,
//     },
//   ],
//   description: {
//     type: String,
//     required: true,
//   },
//   // saved book id from GoogleBooks
//   showID: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },
//   link: {
//     type: String,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
// });

module.exports = showSchema;
