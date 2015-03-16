var irc = require('irc');
var fs = require('fs');

var mong = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/ircLink');
var col = db.get("channels");

var chans = [];

col.find({}, {}, function(err, rec){
	rec.forEach(function(chan){
		chans.push("#" + chan['channel']);
	});
});




var bot = new irc.Client('irc.twitch.tv', 'rntr200', {
	channels: chans,
	port: 6667,
	debug: true,
	password: 'oauth:pvr3gr18zantot71qucw5mfl6qx8bw',
   	sasl:true
	});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
	if (/^(?:ftp|http|https)?:?\/?\/?(?:[\w\.\-\+]+:{0,1}[\w\.\-\+]*@)?(?:[a-z0-9\-\.]+)(?::[0-9]+)?(?:\/|\/(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+)|\?(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+))?$/.test(text)){
		fs.appendFile('urllog.html', "\n" + text, function(err){
			if (err){
				console.log("ERR: ----- " + err + " -----");
			}
			var date = new Date();
			console.log("\n(" + date.getHours() + ":" + date.getMinutes() + ")" + from + ": " + text);
		});
	}
	
 });
