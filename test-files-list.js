var _ = require('underscore');
var fs = require('fs');

var file = '/path/to/milos-files-list';


fs.readFile(file, {
	encoding: 'UTF-8'
}, function(err, data){
	var files = data.split('\n');
	files = _.uniq(files).sort();
	printFiles(files);
});


// Functions

var printFiles = function(files) {
	var len = files.length
	  , i = len;
	while (i--) {
		console.log( files[len - i] );
	}
};
