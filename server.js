const express = require('express');
const handlebars = require('express-handlebars').create({ defaultLayout: 'main'});

var app = express();

// start handlebars engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

var fortunes = [
	'Рекам нужны истоки.',
	'Не бойся неведомого.',
	'Будь проще везде где это возможно'
]

// 1. get method, for pages,
// must be earlier ,than use method
// 2. handlebars used for render
app.get('/', function(req, res){
		res.render('home');
});

app.get('/about', function(req, res){
		var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
		res.render('about', { fortune: randomFortune });
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