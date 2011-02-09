IndexView = Backbone.View.extend({
    initialize: function(options) {
        _.bindAll(this, "render", "textarea", "post");
        this.messages = options.messages;
    },

    /**
     * Bind events to methods
     */ 
    events : {
        "focus textarea" : 'textarea',
        "submit form" : 'post',
        "click button" : 'post',
    },

    post : function(e) {
        e.preventDefault();
        var post = this.area.val(),
            username = this.username.val();

        var message = this.messages.create();
        message.save({
            post : post,
            username : username
        });
    },

    textarea : function() {
        if (this.area.data('modified') == 0) {
            this.area.val("").data('modified', 1);
        }
    },

    render : function() {
        var messages = this.messages.map(function(model) {
            var arr = model.toJSON();
            arr.created = new Date(arr.created);
            return arr;
        });
        var viewData = {
            messages : messages
        };

        this.el.html(
            $("#tmpl-status").tmpl(viewData)
        );
        this.area = this.$("textarea");
        this.username = this.$("#username");
    }
});
