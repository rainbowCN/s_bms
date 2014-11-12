(function(app) {
    app.regional('{{name}}', {
        className: 'panel panel-default',
        template: '#index-{{alias}}-tpl', //{article}
        actions: { 
        	_bubble: true,
            'add': function($triggerTag, e){
            	this.form.trigger('region:load-view', '{{name}}Form', {});
            }          
        },     
        onShow: function() {
        	var self  = this;
        	this.datagrid.trigger('region:load-view', 'Datagrid', {
        	    className: 'table table-hover',
        	    columns: [
                 {{#columns}}
                  {
                    name: '{{key}}',
                    label: '{{value.label}}',
                    icon: '{{value.icon}}',
                    cell: '{{value.cell}}'
                  },
                  {{/columns}}                        
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
        	    url: '{{alias}}',
        	    page: 1,
        	    pageSize: 5
        	});        	
        },
        
        editForm: function(options){
        	this.form.trigger('region:load-view', '{{name}}Form', options);
        },
        
        deleteForm: function(options){
        	var self = this;
        	Application.remote({
        	    entity: '{{alias}}',
        	    payload: { _id: options.id }
        	}).done(function(){
        		self.form.currentView.close();
        		self.datagrid.currentView.trigger('view:load-page', {});
        	});
        },
        
        // Triggered by the event of submit from {{name}}Form
        onUpdateForm: function(){
        	this.form.currentView.close();
			this.datagrid.currentView.trigger('view:load-page', {});
        }             
    });
    
    app.Util.Tpl.build('index-{{alias}}-tpl', [ 
      '<div class="panel-body">',
        '<div class="model-info hidden">',
        '<div class="title text-primary">{{name}}</div>',
          '<ol class="breadcrumb"><li><a href="#">1</a></li></ol>',
        '</div>',
        '<div class="model-header clearfix">',
          '<div class="pull-right"><button type="button" class="btn btn-primary" action="add">Add</button></div> ',
        '</div>',
        '<div class="model-body">',
          '<div region="datagrid"></div>',
          '<div region="pagination" class="clearfix"></div>',    
          '<div region="form" view="App::Blank"></div>',
        '</div>',
        '<div class="model-footer"></div>',
      '</div>'     
    ]);    
})(Application);


