var mongoose = require('mongoose');
var mongoURI = 'mongodb://@localhost:27017/test';
var Schema = mongoose.Schema;

mongoose.connect(mongoURI, { useNewUrlParser: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var movieDatabaseSchema = new Schema({
                            title: String,
                            description: String
                          })
var movieDatabase = mongoose.model('movies', movieDatabaseSchema);

module.exports = movieDatabase;