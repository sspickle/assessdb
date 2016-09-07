var Backbone = require('backbone');

module.exports = Backbone.Marionette.View.extend({
        regions: {
            main: "#main-region",
            header: "#header-region",
            display: "#display-region",
            footer: "#footer-region"
            },

        template: require('../templates/mainBodyView.html')
    });

