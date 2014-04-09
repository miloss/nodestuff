var _ = require('underscore');
var fs = require('fs');

// Generate PHP classes from JSON description file

var file = '/path/to/class-description.json';


fs.readFile(file, {
	encoding: 'UTF-8'
}, function(err, data){
	var json = JSON.parse(data);
	printInterface(json.actions);
	printClass(json.actions);
});


// Functions

var printInterface = function(actions) {
	_.each(actions, function(action){
		var string = '';

		var params = _.keys(action.request).map(function(item){
			return '$'+item;
		}).join(', ');

		string = '\t'+'function '+action.name+'('+params+');';
		console.log(string);
		console.log();
	});
};

var printClass = function(actions) {
	_.each(actions, function(action){
		var string = '';

		var params = _.keys(action.request).map(function(item){
			return '$'+item;
		}).join(', ');

		console.log('\t'+'//'+action.description);
		console.log('\t'+'function '+action.name+'('+params+') {');
		console.log('\t'+'}');
		console.log();
	});
};
