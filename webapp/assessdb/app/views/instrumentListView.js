
var Backbone = require('backbone');
var Radio = require('backbone.radio');

var InstrumentView = Backbone.Marionette.View.extend({
        tagName : 'li',
        template: require('../templates/instrumentItemView.html'),
        events: {
            'click': function(e) {
                this.trigger('instrument:clicked', this.model);
            }
        }
    });
    
var InstrumentsView = Backbone.Marionette.CollectionView.extend({
        tagName : 'ul',
        childView: InstrumentView,
    });
    
module.exports = InstrumentsView;
