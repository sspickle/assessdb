//
// For toying around, just build everything here. 
// As the UI model becomes clearer we can modularize etc.
//
define(['backbone','backbone.marionette'], function(Backbone,Mnt) {
  var ILView = Backbone.View.extend({
    initialize: function() {
        console.log("Got In InstrumentList View");
        var instrumentsView = new InstrumentsView();
        instrumentsView.collection = new InstrumentCollection();
        instrumentsView.collection.fetch();
        instrumentsView.render();
    }
  });
  
//
// first declare some backbone models
//
    
    Instrument = Backbone.Model.extend({
        defaults :{
            name: '',
            description: '',
        }
    });

    InstrumentCollection = Backbone.Collection.extend({
        model: Instrument,
        url: '/restapi/instruments',
        initialize: function () {
          this.listenTo(this.model, 'change', this.render);    
          }
    });


    var InstrumentView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: '#instrumentTemplate'
    });

    var InstrumentsView = Backbone.Marionette.CollectionView.extend({
            el: '#content',
            childView: InstrumentView,
    });
    
  return ILView;
});
