const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main'});
const fortune = require('./lib/fortune.js');

var app = express();

// start handlebars engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' &&
		req.query.test === '1';
	next();
})

// 1. get method, for pages,
// must be earlier ,than use method
// 2. handlebars used for render
app.get('/', function(req, res){
		res.render('home');
});

app.get('/about', function(req, res){
		res.render('about', { 
			fortune: fortune.getFortune(),
			pageTestSrcipt: './qa/tests-about.js' 
		});
});

app.use(function(req, res) {
			res.status(404);
			res.render('404');
});

app.use(function(err, req, res, next) {
			console.error(err.stack);
			res.type('text/plain');
			res.render('500');
});

app.listen(app.get('port'), function(){
								console.log('Express server started on http://localhost:' + app.get('port') 
								+ ', press Ctrl+C to stop...');
});