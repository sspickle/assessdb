var Backbone = require('backbone');

var HeaderView = Backbone.Marionette.View.extend(
        {
            template:require("../templates/header.html"),
            
            events: {
                'click a': "onClickLink"
            },
            
            ui: {
                home: "#homeHeader",
                instruments: "#instrumentsHeader",
                contact: "#contactHeader"
            },

            clearTabs: function() {
                this.$('li.active').toggleClass('active', false); // turn any previously-selected nav link off
            },

            setActiveTab: function(theTab) {
                this.clearTabs();
                var thisTab = this.getUI(theTab);
                thisTab.addClass('active');
            }
        });
        
module.exports = HeaderView;
