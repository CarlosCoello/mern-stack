const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let bodyLength = ( body ) => {
  if( !body ){
    return false;
  } else {
    if( body.length < 50 || body.length > 200 ){
      return false;
    } else {
      return true;
    }
  }
};

const bodyValidators = [
  {
    validator: bodyLength,
    message: 'Body length must be at least 50 characters but no more than 100'
  }
];

const blogSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  body: { type: String, required: true, validate: bodyValidators },
  postedBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});


module.exports = mongoose.model( 'Blog', blogSchema );
