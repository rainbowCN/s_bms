(function(app) {
    app.widget('CommentForm', function() { //{Name}
        return app.view({
            effect: 'fade',
            className: 'panel panel-default',
            template: '#form-comment-tpl', //{article}
            initialize: function(options) {
                this.id = options.id;
                this.listenTo(this, 'editor:focusout', this.immediatelyVal);
            },
            immediatelyVal: function(name) {
                this.getEditor(name).validate(true);
            },
            editors: {
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
                    }
                },
                content: {
                    type: 'textarea',
                    label: 'Content',
                    layout: {
                        label: 'col-sm-2',
                        field: 'col-sm-6'
                    }
                },
            },
            actions: {
                _bubble: false,
                'cancel': function($triggerTag, e) {
                    this.close();
                },
                'submit': function($triggerTag, e) {
                    var self = this;
                    if (!this.validate(true)) {
                        var _data = this.getValues();
                        if (_data.id === "-1") {
                            _.omit(_data, 'id');
                        } else {
                            _data._id = _data.id;
                        }
                        app.remote({
                            entity: 'comment', //{article}
                            payload: _data
                        }).done(function() {
                            self.close();
                            self.parentCt.trigger("view:update-form", _data);
                        });
                    }
                }
            },
            onShow: function() {
                if (this.id) {
                    var that = this;
                    app.remote({
                        entity: 'comment', //{article} 
                        _id: this.id
                    }).done(function(data) {
                        _.map(data, function(val, key) {
                            //if(key==='id'||key==='title'||key==='content') that.getEditor(key).setVal(val, val);
                            if (key === 'id' || key === 'title' || key === 'content') that.getEditor(key).setVal(val, val);
                        });
                    });
                } else {
                    this.getEditor("id").setVal('-1');
                    this.getEditor("id").disable(true);
                }
            }
        });
    });
    app.Util.Tpl.build('form-comment-tpl', [ //{article}
        '<div class="panel-body">',
            '<form class="form-horizontal">',
                '<fieldset>',
                    '<legend>Comment Info</legend>', //{Name}
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