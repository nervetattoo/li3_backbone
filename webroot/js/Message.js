var Message = Backbone.Model.extend({
    tagName : 'div',
    initialize: function()
    {
        if (!this.get("username"))
            this.set({username : ""});
        if (!this.get("post"))
            this.set({post : ""});
    },
    url : function()
    {
        return '/messages/';
    }
});

var Messages = Backbone.Collection.extend({
    url : '/messages/index',
    model: Message,

    comparator : function(model) {
        return model.get("created").toLowerCase();
    }
});
