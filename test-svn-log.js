var _ = require('underscore');
var fs = require('fs');

// Parse SVN log file to organize modified resources into groups

var file = '/path/to/milos-svn-log';
var svncommand = 'svn diff -rREV:HEAD';


fs.readFile(file, {
	encoding: 'UTF-8'
}, function(err, data){

	getFiles(data.split('\n'), function(files) {
		files = _.uniq(files).sort();
		printFiles(files);
		console.log('==========================================');
		//printDiffComands( groupFiles(files) );
		console.log( svncommand + ' ' + files.join(' ') );
	});
});


// Functions

var getFiles = function(lines, done) {
	var svnroot = '';// If other than 'trunk'

	done(_.reduce(lines, function(memo, line) {
		if (line.indexOf('M ' + svnroot) !== -1) {
			line = line.replace('M ' + svnroot, '').trim();
			memo.push(line);
		}
		return memo;
	}, []));
}


var printFiles = function(files) {
	var len = files.length
	  , i = len;
	while (i--) {
		console.log( files[len - i] );
	}
}


var groupFiles = function(files) {
	var groups = [
		'lib',
		'lib/core',
		'public'
	];
	
	var grouped = {};
	_.each(groups, function(group){
		grouped[ group.replace('/', '-') ] = [];
	});
	grouped['other'] = [];
	
	return _.reduce(files, function(memo, file) {
		var i = groups.length
		  , key;
		while (i--) {
			if (file.indexOf(groups[i]) === 0) {
				memo[ groups[i].replace('/', '-') ].push(file);
				return memo;
			}
		}
		memo['other'].push(file);
		return memo;
	}, grouped);
}


var printDiffComands = function(groups) {
	var fileprefix = 'milos-svn-diff';
	
	_.each(groups, function(val, key){
		var command = svncommand + ' ' + val.join(' ') +
			' > ' + fileprefix + '-' + key;
		console.log(command);
	});
}
