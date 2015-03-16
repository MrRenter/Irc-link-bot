var irc = require('irc');
var fs = require('fs');

var mong = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ircLink');
var col = db.get("channels");

col.find({}, {}, function(err, rec){
	rec.forEach(function(chan){
		console.log(chan['channel']);
	});	
});
