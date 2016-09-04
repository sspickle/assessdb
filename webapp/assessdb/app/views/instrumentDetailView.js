
var Mn = require('backbone.marionette');

var InstrumentDetailView = Mn.View.extend({
        initialize: function(options) {
            this.model = options.model;
        },
        template: require('../templates/instrumentDetailView.html'),
    });
    
module.exports = InstrumentDetailView;
