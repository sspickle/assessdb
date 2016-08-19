//
// For toying around, just build everything here. 
// As the UI model becomes clearer we can modularize etc.
//
define(['backbone','templates','backbone.marionette'], function(Backbone,JST) {

    var InstrumentView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: JST["app/scripts/templates/instrumentItemView.ejs"]
    });

    var InstrumentsView = Backbone.Marionette.CollectionView.extend({
            tagName : 'ul',
            childView: InstrumentView,
    });
    
  return InstrumentsView;
});
