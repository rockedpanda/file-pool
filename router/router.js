var express = require('express');
var router = express.Router();


router.get('/',function(req,res) {
	res.send('<h1>hello!</h1>');
});

router.get('/upload', function(res,req) {
	
});



module.exports = router;