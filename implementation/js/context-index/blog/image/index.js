(function(app) {
    app.regional('Image', {
        className: 'panel panel-default',
		template: '@model/model.html',
        actions: { 
        	_bubble: true,
            'add': function($triggerTag, e){
            	this.form.trigger('region:load-view', 'ImageForm', {});
            }          
        },     
        onShow: function() {
        	var self  = this;
        	this.datagrid.trigger('region:load-view', 'Datagrid', {
        	    className: 'table table-hover',
        	    columns: [
              	        {
              	            name: 'id',
              	            label: '#ID'
              	        },
              	        {
              	            name: 'title',
              	            icon: 'fa fa-github-alt'
              	        },
              	        {
              	            name: 'content',
              	            label: 'Content',
                  	        icon: 'fa fa-envelope'
              	        },
              	        {
              	            cell: 'operate',
              	            label: 'operation',
              	            icon: 'fa fa-cog',
              	            actions: {
              	                edit: {
              	                    fn: function(){
              	                    	self.editForm(this.model.attributes);
              	                    }
              	                },
              	        		remove: {
              	                    fn: function(){
              	                    	self.deleteForm(this.model.attributes);
              	                    }
              	        		}
              	            }
              	        }
              	    ]
        	});    
        	var datagrid = this.datagrid.currentView;     
        	this.pagination.trigger('region:load-view', 'Paginator', {
        	    target: datagrid,
        	    className: 'pagination pagination-sm pull-right'
        	});     
        	datagrid.trigger('view:load-page', {
        	    url: 'image', // {image}
        	    page: 1,
        	    pageSize: 5
        	});        	
        },
        
        editForm: function(options){
        	this.form.trigger('region:load-view', 'ImageForm', options); // {Image}Form
        },
        
        deleteForm: function(options){
        	var self = this;
        	Application.remote({
        	    entity: 'image', // {image}
        	    payload: { _id: options.id }
        	}).done(function(){
        		self.form.currentView.close();
        		self.datagrid.currentView.trigger('view:load-page', {});
        	});
        },
        
        // Triggered by the event of submit from BlogForm
        onUpdateForm: function(){
        	this.form.currentView.close();
			this.datagrid.currentView.trigger('view:load-page', {});
        }             
    });
})(Application);

