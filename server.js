var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var productHuntAPI = require('producthunt');
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8082;

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/client/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ph;
var productHunt = new productHuntAPI({
  client_id: process.env.PH_KEY,
  client_secret: process.env.PH_SECRET,
  grant_type: 'client_credentials'
});

// List all live events and filter by category
productHunt.posts.index({search: {category: 'tech'}}, function (err, res) {
  ph = JSON.parse(res.body);
});

// set the home page route
app.get('/', function(req, res) {

    // make sure index is in the right directory. In this case /app/index.html
    res.render('index');
});

// send producthunt data to client
app.get('/producthunt.json', function(req, res) {
    res.send(ph);
});

// for heroku config vars
app.get('/firebaseurl.js', function(req, res){
       
       res.write("var FIREBASE_URL='"+process.env.FIREBASE_URL+"'" + '\n');
       res.write("var API_KEY='"+process.env.API_KEY+"'" + '\n');
       res.write("var AUTH_DOM='"+process.env.AUTH_DOM+"'" + '\n');
       res.write("var STRG_BUCKET='"+process.env.STRG_BUCKET+"'" + '\n');
       res.write("var MSG_SND_ID='"+process.env.MSG_SND_ID+"'" + '\n');
       res.end();
});

// Send comment route
app.post('/sendmail', function(req, res){
    var options = {
        auth: {

            api_key: process.env.SEND_GRID_KEY
            
        }
    }
    
    var mailer = nodemailer.createTransport(sgTransport(options));
    mailer.sendMail(req.body, function(error, info){
        
        if(error){
            res.status('401').json({err: info});
        }else{
            res.status('200').json({success: true});
        }
    });
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});