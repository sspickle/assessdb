var Backbone = require('backbone');

var HeaderView = Backbone.Marionette.View.extend(
        {
            template:require("../templates/header.html"),
            
            events: {
                'click a': "onClickLink"
            },
            
            onClickLink : function(e) {
                this.$('li.active').toggleClass('active', false); // turn previously-selected nav link off
                $(e.target).blur()
                    .closest('li').toggleClass('active', true); // turn on new link
            }
        });
        
module.exports = HeaderView;
