/**
	Cologne.Dog B2B application
  */

var express = require('express'),
    htmlDir = './public/',
    path = require('path'),
    app = express(),
    favicon = require('serve-favicon'),
    bodyParser = require('body-parser'),
    MongoClient = require('mongodb').MongoClient,
    url = "mongodb://localhost:27017/colognedog";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  	var dbo = db.db("mydb");

	dbo.createCollection("leads", function(err, res) {
		if (err) throw err;
		console.log("Collection created!");
	});

	app.post('/contact', function(request, response) {
	    let document = request.body;
	    // send or write
	    if (!document) response.setStatus(400).json({status: 400});
		dbo.collection("leads").insertOne(document, function(err, res) {
			if (err) response.setStatus(400).json({status: 400});
			console.log('wrote lead to db')
			response.json({status: 200});
		});
	});
});


app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())

app.get('/', function(request, response) {
    response.sendFile(path.resolve(htmlDir, 'index.html'));
});

app.get('/health', function(request, response) {
    response.json({status: 200});
});

app.get('*', function(request, response) {
    response.redirect('/')
});


var port = process.env.PORT || 8179;
app.listen(port, function() {
  console.log("Listening on " + port);
});