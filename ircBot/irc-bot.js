var irc = require('irc');
var fs = require('fs');
var bot = new irc.Client('irc.twitch.tv', 'mrrenter', {
	channels: ['#mrrenter'],
	port: 6667,
	debug: true,
	password: 'oauth:z6qkos2sn74h5yzpba1twxmjlfu7m0',
    	sasl:true
	});

// Listen for any message, say to him/her in the room
 bot.addListener("message#mrrenter", function(from, text, message) {
	if (/^(?:ftp|http|https)?:?\/?\/?(?:[\w\.\-\+]+:{0,1}[\w\.\-\+]*@)?(?:[a-z0-9\-\.]+)(?::[0-9]+)?(?:\/|\/(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+)|\?(?:[\w#!:\.\?\+=&%@!\-\/\(\)]+))?$/.test(text)){
		fs.appendFile('urllog.html', text, function(err){
			if (err){
				console.log("ERR: ----- " + err + " -----");
			}
			var date = new Date();
			console.log("\n(" + date.getHours() + ":" + date.getMinutes() + ")" + from + ": " + text);
		});
	}
	
 });
