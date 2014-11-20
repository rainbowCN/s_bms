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
exec = require('child_process').exec; 

handlebars.registerHelper('display', function(items) {
	for(var i=0, l=items.length; i<l; i++){
		items[i] = "key==='"+items[i].key+"'";	
	}
	return items.join("||");
});

handlebars.registerHelper('list', function(items) {
	var content = "222";
	for(var i=0, l=items.length; i<l; i++){
		//content +='<div editor="'>+items[i].key+'"></div>';
		content+=items[i].key;
	}
	return content;
});

// CREATE JAVASCRIPT INDEX.
fs.readFile('templates/model_index.js', 'UTF-8', function(err, data){
	var tpl = handlebars.compile(data);
	fs.readFile('templates/meta.json', 'UTF-8', function(err, data){
		var data = JSON.parse(data);
		var code = tpl(data);
		code = js_beautify(code);
		var f = filed('./output/'+data.alias+'_index.js');
		f.write(code);
		f.end();		
	});
});

// CREATE JAVASCRIPT FORM.
fs.readFile('templates/model_form.js', 'UTF-8', function(err, data){
	var tpl = handlebars.compile(data);
	fs.readFile('templates/meta.json', 'UTF-8', function(err, data){
		var data = JSON.parse(data);
		var code = tpl(data);
		code = js_beautify(code);
		var f = filed('./output/'+data.alias+'_form.js');
		f.write(code);
		f.end();		
	});
});

// CREATE SQL SCRIPT FOR MySQL.
fs.readFile('templates/model.sql', 'UTF-8', function(err, data){
	var tpl = handlebars.compile(data);
	fs.readFile('templates/meta.json', 'UTF-8', function(err, data){
		var data = JSON.parse(data);
		var code = tpl(data);
		var sql_file = "./output/"+data.alias+".sql"; 
		fs.writeFile(sql_file, code, function (err) {
		  	if (err) throw err;
		  	console.log("BMS_CREATE::SQL("+data.alias+".sql) IS OK!");
			var cmd = "mysql -utester -p123456 --default-character-set=utf8 bms < "+sql_file;
			exec(cmd, function callback(err) { 
				if(err) throw err;
				console.log("BMS_EXECUTE::SQL("+data.alias+".sql) IS OK!");
			});	
		});	
	});
});

// CREATE PHP SCRIPT.
fs.readFile('templates/model.php', 'UTF-8', function(err, data){
	var tpl = handlebars.compile(data);
	fs.readFile('templates/meta.json', 'UTF-8', function(err, data){
		var data = JSON.parse(data);
		var code = tpl(data);
		var f = filed('./output/'+data.alias+'.php');
		f.write(code);
		f.end();		
	});
});
