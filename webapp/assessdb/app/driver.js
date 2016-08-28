require('./setup.js');

var Backbone = require('backbone');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

var PersonCollection = require('./models/personCollection.js');
var InstrumentCollection = require('./models/instrumentCollection.js');

var PeopleView = require('./views/peopleView.js');
var InstrumentsView = require('./views/instrumentListView.js');
var HeaderView = require('./views/headerView.js');
var StaticView = require('./views/staticView.js');

var App = new Backbone.Marionette.Application();

var RegionContainer =  Backbone.Marionette.View.extend({
    el: "#app-container",

    regions: {
        main: "#main-region",
        header: "#header-region",
        display: "#display-region",
        footer: "#footer-region"
        }
});
         
var RouterClass = Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           "": "index",
           "home": "index",
           "instruments": "instruments",
           "contact":"confunc",
           "instrument/:id":"displayInstrument"
       }
   });

var ControllerClass = Backbone.Marionette.Object.extend({
        initialize:function (options) {
        
            this.myPersonCollection = new PersonCollection();
            this.myPersonCollection.fetch();
    
            this.myInstrumentCollection = new InstrumentCollection();
            this.myInstrumentCollection.fetch();
    
            App.regions.showChildView('main',new PeopleView({collection: this.myPersonCollection}));
            App.regions.showChildView('header',new HeaderView());
        },

        index:function () {
            App.regions.showChildView('main',new PeopleView({collection: this.myPersonCollection}));
        },
        
        instruments: function() {
            App.regions.showChildView('main', new InstrumentsView({collection: this.myInstrumentCollection}));
        },
        
        confunc: function() {
            App.regions.showChildView('main', new StaticView());
        },
        
        displayInstrument: function(id) {
            App.regions.showChildView('display',new StaticView());
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
});

App.start();
