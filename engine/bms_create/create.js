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
filed = require('filed');

handlebars.registerHelper('validate', function(text) { 
	  text = Handlebars.Utils.escapeExpression(text); 
	  return new Handlebars.SafeString(text); 
	});

fs.readFile('templates/js_form_tpl.js', 'UTF-8', function(err, data){
	var tpl = handlebars.compile(data);
	fs.readFile('templates/meta.json', 'UTF-8', function(err, data){
		var code = tpl(JSON.parse(data));
		code = js_beautify(code);
		var f = filed('./model.js');
		f.write(code);
		f.end();		
	});
});

