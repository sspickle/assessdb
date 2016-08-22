//
// For toying around, just build everything here. 
// As the UI model becomes clearer we can modularize etc.
//
define(['backbone','templates','backbone.marionette'], function(Backbone,JST) {

    var InstrumentView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: JST["app/scripts/templates/instrumentItemView.ejs"],
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
    
  return InstrumentsView;
});
