/**
 * @author James Yu (x.james.yu@gmail.com)
 * @updated 2014.10.20
 */

//env args.
var args = process.argv.slice(2);

//load libs.
var fs = require('fs'),
handlebars = require('handlebars'),
js_beautify = require('js-beautify').js_beautify,
filed = require('filed'),
mysql = require('mysql');
var exec = require('child_process').exec; 

	
function exec_sql() {

	var cmd = "mysql -utester -p123456 --default-character-set=utf8 bms < ./output/comment.sql";
	exec(cmd, function callback(error, stdout, stderr) { 
		console.log(error);
		console.log(stderr);
		console.log(stdout);
	});
	/**
	var connection = mysql.createConnection({
		host     : 'localhost',
	  	user     : 'root',
	  	password : ''
	});

	connection.connect(function(err) {
	  	if (err) {
	    	console.error('error connecting: ' + err.stack);
	    	return;
	 	}	

	 	var import = "mysql -u root -p --default-character-set=utf8 USER_DATABASE < ./output/comment.sql" 
			var query = connection.query(import, function(err, rows, fields) {
  				if (err) throw err;
  				console.log('exec sql: ', query.sql);
			});			
	 	
	  	fs.readFile('./output/comment.sql', 'UTF-8', function(err, data){
			console.log(data);

			var query = connection.query(data, function(err, rows, fields) {
  				if (err) throw err;
  				console.log('exec sql: ', query.sql);
			});			
		});

	  	console.log('connected as id ' + connection.threadId);
	});
*/
}

exec_sql();
