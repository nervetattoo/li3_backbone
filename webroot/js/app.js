/**
 * Override the backbone sync
 * @author Raymond Julin
 */
Backbone.sync = function(method, model, success, error)
{
    var typeMap = {
        'create': 'POST',
        'update': 'PUT',
        'delete': 'DELETE',
        'read'  : 'GET'
    };
    var methodMap = {
        'create': 'add',
        'update': 'edit',
        'delete': 'destroy',
        'read'  : 'view'
    };
    var type = typeMap[method];
    var method = methodMap[method];
    var modelJSON = (method === 'add' || method === 'edit') ?
        JSON.stringify(model.toJSON()) : null;
    var url = model.url() + 
        ((method) ? method : '') +
        ((model.id) ? '/'+model.id : '') + '.json';

    // Default JSON-request options.
    var params = {
        url: url,
        type : type,
        contentType: 'application/json',
        data: modelJSON,
        dataType: 'json',
        processData:  false,
        success: function(data, textStatus, request) {
            if (data.errors) {
                if (_.isFunction(error))
                    error(data, textStatus, request);
            }
            else {
                if (_.isFunction(success))
                    success(data, textStatus, request);
            }
        },
        error: error
    };

    // Make the request.
    $.ajax(params);
};

App = Backbone.Controller.extend({
    el : $("#content"),

    initialize : function(options) {
        this.messages = new Messages;
    },

    routes : {
        "" : "index",
        "post" : "post"
    },

    index : function() {
        this.view = new IndexView({
            el : this.el,
            messages : this.messages
        }).render();
    }
});
