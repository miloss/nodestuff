var _ = require('underscore');
var fs = require('fs');

// Get selector for a particular string in CSS file

var dirname = '/path/to/css/folder';
var filename = 'style.css';
var csstowatch = 'background: url';


fs.readFile(dirname + '/' + filename, {
	encoding: 'UTF-8'
}, function(err, data){
	var lines = data.split('\n');
	var result = {};
	_.each(lines, function(line, i) {
		if (line.indexOf(csstowatch) >= 0 ) {
			var selector = findSelector(lines, i);
			result[selector] = line;
		}
	});
	console.log(result);
});

function findSelector(lines, i) {
	while (i--) {
		var str = lines[i].trim();
		if (str.slice(-1) === '{') {
			return str.replace('{', '').trim();
		}
	}
}
