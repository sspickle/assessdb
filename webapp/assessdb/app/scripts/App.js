define(['jquery', 'backbone', 'entities/personObjects', 'entities/instrumentObjects','views/PersonListView', 'views/InstrumentListView', 'views/HeaderView', 'views/StaticView','backbone.marionette'],
    function ($, Backbone, PersonObjects, InstrumentObjects, PeopleView, InstrumentsView, HeaderView, StaticView) {

    var App = new Backbone.Marionette.Application();

    var RegionContainer =  Backbone.Marionette.LayoutView.extend({
        el: "#app-container",

        regions: {
            main: "#main-region",
            header: "#header-region",
            display: "#display-region",
            footer: "#footer-region"
            }
    });
         
    RouterClass = Backbone.Marionette.AppRouter.extend({
           //"index" must be a method in AppRouter's controller
           appRoutes: {
               "": "index",
               "home": "index",
               "instruments": "instruments",
               "contact":"confunc"
           }
       });

    ControllerClass = Backbone.Marionette.Object.extend({
            initialize:function (options) {
            
                this.myPersonCollection = new PersonObjects.PersonCollection();
                this.myPersonCollection.fetch();
        
                this.myInstrumentCollection = new InstrumentObjects.InstrumentCollection();
                this.myInstrumentCollection.fetch();
        
                App.regions.main.show(new PeopleView({collection: this.myPersonCollection}));
                App.regions.header.show(new HeaderView());
            },

            index:function () {
                App.regions.main.show(new PeopleView({collection: this.myPersonCollection}));
            },
            
            instruments: function() {
                App.regions.main.show(new InstrumentsView({collection: this.myInstrumentCollection}));
            },
            
            confunc: function() {
                App.regions.main.show(new StaticView());
            }
        });
    
    App.on("before:start", function() {
         App.regions = new RegionContainer();
    });

    App.on("show:instrument", function(childView) {
        App.regions.display.show(childView);
    });
    
    App.on("start", function() {
    
        //
        // Add router/controller
        //
        
        var myRouter = new RouterClass(
            {controller: new ControllerClass({})}
            );
            
        Backbone.history.start();
    })

    return App;
});
