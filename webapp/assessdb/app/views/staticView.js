var Backbone = require('backbone');

module.exports = Backbone.Marionette.View.extend({
            template:'<div> This is a Contact Page: Not done</div>',
            onFoo:function(theChild) {
                console.log("In static view onFoo");
                }
        });
