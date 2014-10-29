(function(app) {app.widget('{{name}}Form', function(){//{Name}
        return app.view({
        	effect: 'fade',
            className: 'panel panel-default',
            template: '#form-{{alias}}-tpl', //{article}
            initialize: function(options){ 
            	this.id = options.id;
            	this.listenTo(this, 'editor:focusout', this.immediatelyVal);
            },  
            immediatelyVal: function(name) {
            	this.getEditor(name).validate(true);
            },
            editors: {
            	 {{#editors}} 
            	 	{{key}}":{"
            	 		"type:"{{value.type}}
            	 	"}"
            	 {{/editors}}
            },
            actions: {
                _bubble: false,
                'cancel': function($triggerTag, e){
                	this.close();
                },
                'submit': function($triggerTag, e){
                	var self = this;
                	if(!this.validate(true)){
                		var _data = this.getValues();
                		if(_data.id==="-1"){ _.omit(_data, 'id'); } else { _data._id = _data.id; }
                		app.remote({
                		    entity: '{{alias}}', //{article}
                		    payload: _data
                		}).done(function(){
                			self.close();
                			self.parentCt.trigger("view:update-form", _data);
                		});
                	}
                }
            },            
            onShow: function() {   
                if(this.id){
                    var that = this;                	
                    app.remote({
                        entity: '{{alias}}', //{article} 
                        _id: this.id
                    }).done(function(data){
                    	_.map(data, function(val, key){ 
                    		{{#showProperties}}
                    			if(key==={{key}}) that.getEditor(key).setVal(val, val);
                    		{{/showProperties}}
                    		//if(key==='id'||key==='title'||key==='content') that.getEditor(key).setVal(val, val);
                    	});               
                    });
                } else {
                	this.getEditor("id").setVal('-1');
                	this.getEditor("id").disable(true);
                }
            }
        }); 
    });
	app.Util.Tpl.build('form-{{alias}}-tpl', [ //{article}
        '<div class="panel-body">',
			'<form class="form-horizontal">',
				'<fieldset>',
					'<legend>{{name}} Info</legend>', //{Name}
            		{{#showProperties}}
						'<div editor="{{key}}"></div>',
        			{{/showProperties}}					
					'<div class="form-group">',
				      	'<div class="col-md-10 col-md-offset-4">',
				      		'<button class="btn btn-primary" type="button" action="submit" style="margin-right:10px">Submit</button>',
				      		'<button class="btn btn-default" type="button" action="cancel">Cancel</button>',
				      	'</div>',
				    '</div>',						
				'</fieldset>',
			'</form>',			
	  	'</div>'     
	]);

})(Application);

