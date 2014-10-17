(function(app) {
	app.widget('ImageForm', function(){ //{Image}
        return app.view({
        	effect: 'fade',
            className: 'panel panel-default',
            template: '@model/form.html',
            initialize: function(options){
            	this.id = options.id;            	
        		this.model = app.model({'modelName':'mageTest'});
            	this.listenTo(this, 'editor:focusout', this.immediatelyVal);
            },  
            immediatelyVal: function(name) {
            	this.getEditor(name).validate(true);
            },
            editors: { //{editors}
                id: {
                    type: 'text',
                    label: 'Id',
                    layout: {
                    	label: 'col-sm-2',
                    	field: 'col-sm-6'
                    }
                },            	
                title: {
                    type: 'text',
                    label: 'Title',
                    layout: {
                    	label: 'col-sm-2',
                    	field: 'col-sm-6'
                    },
                    validate: { 
                        required: {
                            msg: 'Name cann\'t be null!',
                        } 
                    }	
                },               
                content: {
                    type: 'textarea',
                    label: 'Content',
                    layout: {
                    	label: 'col-sm-2',
                    	field: 'col-sm-6'
                    },
                    validate: { 
                        required: {
                            msg: 'Name cann\'t be null!',
                        } 
                    }	
                }             
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
                		    entity: 'image', //{image}
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
                        entity: 'image', //{image} 
                        _id: this.id
                    }).done(function(data){
                    	_.map(data, function(val, key){ 
                    		//{title} {content}
                    		if(key==='id'||key==='title'||key==='content') that.getEditor(key).setVal(val, val);
                    	});               
                    });
                } else {
                	this.getEditor("id").setVal('-1');
                	this.getEditor("id").disable(true);
                }
            }
        }); 
    });
})(Application);

