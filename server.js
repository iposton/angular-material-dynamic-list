var express = require('express');
var app = express();


// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8082;

//GET FIREBASE
var FIREBASE_URL = process.env.FIREBASE_URL;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/client/app'));

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index');
});

app.get('/firebaseurl.js', function(req, res){
    res.send("var FIREBASE_URL='"+process.env.FIREBASE_URL+"'");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});