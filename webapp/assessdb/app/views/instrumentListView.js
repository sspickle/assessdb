
var Mn = require('backbone.marionette');

var InstrumentView = Mn.View.extend({
        tagName : 'li',
        template: require('../templates/instrumentItemView.html'),
        events: {
            'click': function(e) {
                this.trigger('instrument:clicked', this.model);
            }
        }
    });
    
var InstrumentsView = Mn.CollectionView.extend({
        tagName : 'ul',
        childView: InstrumentView,
    });
    
module.exports = InstrumentsView;
