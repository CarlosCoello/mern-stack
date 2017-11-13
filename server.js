const express = require('express'); // import express
const app = express(); // initialize express
const router = express.Router(); 
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const blogs = require('./routes/blogs')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 2000;

mongoose.Promise = global.Promise;
mongoose.connect(config.uri,{ useMongoClient: true }, (err) => {
    if(err){
        console.log('not able to connect to db: ', err);
    } else {
        console.log('connected to db: ', config.db);
    }
});

app.use( cors({ origin: 'https://shrouded-forest-43181.herokuapp.com/' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/build'));
app.use('/blogs', blogs);

app.get( '/*', (req, res) => {
    res.sendFile( path.join(__dirname + '/build/index.html'));
});

app.listen( port, () => {
    console.log('listening on port: ', port);
});