
var Backbone = require('backbone');

var InstrumentView = Backbone.Marionette.ItemView.extend({
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
        childEvents : {
            'instrument:clicked': function(childView, model) {
                console.log(childView,model);
                this.trigger("show:instrument", childView);
            }
        }
});
    
module.exports = InstrumentsView;
