var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//GET ircLinks from db page
router.get('/ircLinks', function(req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	console.log(collection.find({},{},function(a){console.log("a" + a);}));
	collection.find({},{},
		function (e, docs){
			res.render('ircLinks', {
				"ircLinks" : docs
			});
		});
});


module.exports = router;
