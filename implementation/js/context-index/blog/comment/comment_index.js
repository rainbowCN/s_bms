(function(app) {
    app.regional('Comment', {
        className: 'panel panel-default',
        template: '#index-comment-tpl', //{article}
        actions: {
            _bubble: true,
            'add': function($triggerTag, e) {
                this.form.trigger('region:load-view', 'CommentForm', {});
            }
        },
        onShow: function() {
            var self = this;
            this.datagrid.trigger('region:load-view', 'Datagrid', {
                className: 'table table-hover',
                columns: [{
                    name: 'id',
                    label: '#Id',
                    icon: 'fa fa-github-alt',
                    cell: ''
                }, {
                    name: 'title',
                    label: '#title',
                    icon: 'fa fa-github-alt',
                    cell: ''
                }, {
                    name: 'content',
                    label: '#Content',
                    icon: 'fa fa-envelope',
                    cell: 'operate'
                }, {
                    cell: 'operate',
                    label: 'operation',
                    icon: 'fa fa-cog',
                    actions: {
                        edit: {
                            fn: function() {
                                self.editForm(this.model.attributes);
                            }
                        },
                        remove: {
                            fn: function() {
                                self.deleteForm(this.model.attributes);
                            }
                        }
                    }
                }]
            });
            var datagrid = this.datagrid.currentView;
            this.pagination.trigger('region:load-view', 'Paginator', {
                target: datagrid,
                className: 'pagination pagination-sm pull-right'
            });
            datagrid.trigger('view:load-page', {
                url: 'comment',
                page: 1,
                pageSize: 5
            });
        },

        editForm: function(options) {
            this.form.trigger('region:load-view', 'CommentForm', options);
        },

        deleteForm: function(options) {
            var self = this;
            Application.remote({
                entity: 'comment',
                payload: {
                    _id: options.id
                }
            }).done(function() {
                self.form.currentView.close();
                self.datagrid.currentView.trigger('view:load-page', {});
            });
        },

        // Triggered by the event of submit from CommentForm
        onUpdateForm: function() {
            this.form.currentView.close();
            this.datagrid.currentView.trigger('view:load-page', {});
        }
    });

    app.Util.Tpl.build('index-comment-tpl', [
        '<div class="panel-body">',
        '<div class="model-info hidden">',
        '<div class="title text-primary">Comment</div>',
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