const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  body: { type: String, required: true },
  postedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});


module.exports = mongoose.model( 'Blog', blogSchema );
