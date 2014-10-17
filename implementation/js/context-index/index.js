(function(app) {
	
    app.context('Index', {
        template: [
            '<div class="container">',                   
	       		'<div class="row">',
	   				'<div class="col-sm-3" region="sidebar"></div>', 
	       			'<div class="col-sm-9" region="content"></div>',
	       		'</div>',
       		'</div>'
        ],
        navRegion: 'content',
        initialize: function() {
        	console.log("initialize");
        },
        onNavigateTo: function(subpath) {
        	if(subpath) {
            	console.log("NAVIGATE TO SUBPATH:: "+subpath);
            	this.sidebar.currentView.trigger('view:navigate-to', subpath);        		
        	}
        },
    	onShow: function(){
            this.sidebar.trigger('region:load-view', "Menu", {dataURL: 'menu'});   
            this.content.trigger('region:load-view', "User");
    	},
    	onNavigateToSubView: function(subpath){
    	}
    });
})(Application);