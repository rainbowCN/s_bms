(function(app) {
	app.widget('Menu', function(){
        var TreeNode = Backbone.Model.extend({
            initialize: function(){
                var nodes = this.get("nodes");
                if (nodes){
                    this.nodes = new TreeNodeCollection(nodes);
                    this.unset("nodes");
                }
            }        
        });
        var TreeNodeCollection = Backbone.Collection.extend({
            model: TreeNode
        });
        
        var item = app.view({
    		type: 'CompositeView',
            template: '#node-template',
            tagName: 'ul',
            isBranch: false,
            isShow: false,
            initialize: function(){
            	if(this.model.nodes){
            		this.$el.addClass("branch");
            		this.isBranch = true;
            		this.collection = this.model.nodes;
            	} else {
            		this.$el.addClass("leaf");
            	}
            },     
            onShow: function() {
            	$(".menu ul:first-child li").addClass("active");
                if(this.isBranch){
                	this.$el.children("li").find("span").removeClass("glyphicon-minus").addClass("glyphicon-plus");
                	this.$el.children("ul").hide();
                }
            },
            events: {
                'click li:first': 'toggle'
            },    
            toggle: function(event) {
                event.stopPropagation();
                if (this.isBranch) {
                	//active selected item.
                	$("li").removeClass("active");
                	this.$el.children("li").toggleClass("active");
                	//hide children item.
                	this.$el.children("ul").toggle();
                	//exchange icon status in "+-".
                	var _dom = this.$el.children("li").find("span");
                	if(_dom.hasClass("glyphicon-plus")) {
                		_dom.removeClass("glyphicon-plus").addClass("glyphicon-minus");
                	} else {
                		_dom.removeClass("glyphicon-minus").addClass("glyphicon-plus");
                	}                    	
                }
            }
    	});        
        
        var UI = app.view({
        	type: 'CollectionView',
        	className: 'menu',
        	collection: new TreeNodeCollection(),
        	itemView: item,
            initialize: function(options){
            	this.dataURL = options.dataURL;
            },          	
    		onNavigateTo: function(subpath) {	
    			if(subpath) {
        			var parts = subpath.split('/');
        			var subView = parts.pop();
        			this.parentCtx.trigger('view:navigate-to-sub-view', subView);    				
    			}
    		},
        	onShow: function(){
        		var that = this;
                app.remote(this.dataURL).done(function(data){
                    that.trigger('view:render-data', data);
                });
        	}
        }); 
        
    	return UI;
    });
	app.Util.Tpl.build('node-template', [
	    "<li><a href='{{action}}'><span class='glyphicon glyphicon-minus'></span>{{nodeName}}</a></li>"  
	]);


})(Application);


