require('./setup.js');

var Backbone = require('backbone');
var Radio = require('backbone.radio');
var Marionette = require('backbone.marionette');

var PersonCollection = require('./models/personCollection.js');
var InstrumentCollection = require('./models/instrumentCollection.js');
var CourseCollection = require('./models/courseCollection.js');

var PeopleView = require('./views/peopleView.js');
var InstrumentsView = require('./views/instrumentListView.js');
var InstrumentDetailView = require('./views/instrumentDetailView.js');
var CoursesView = require('./views/enrollmentListView.js');
var HeaderView = require('./views/headerView.js');
var StaticView = require('./views/staticView.js');
var EmptyView = require('./views/emptyView.js');

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

    initialize: function() {
    },
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
            this.myHeader = new HeaderView();
            App.regions.showChildView('header', this.myHeader);
        },
        
        index:function () {
            this.updateHeader("home");
            App.regions.showChildView('main',new PeopleView({collection: this.myPersonCollection}));
            App.regions.showChildView('display', new EmptyView());
        },
        
        instruments: function() {
            this.updateHeader("instruments");

            var anInstrumentsView = new InstrumentsView({collection: this.myInstrumentCollection});
            this.listenTo(anInstrumentsView, "childview:instrument:clicked", this.displayInstrument);

            App.regions.showChildView('main', anInstrumentsView);
            App.regions.showChildView('display', new EmptyView());
        },
        
        confunc: function() {
            this.updateHeader("contact");
            App.regions.showChildView('main', new StaticView());
            App.regions.showChildView('display', new EmptyView());
        },
        
        displayInstrument: function(thing1, thing2) {
            var newView = new InstrumentDetailView({model:thing1});
            App.regions.showChildView('display',newView);
        },
        
        updateHeader: function(theTab) {
            this.myHeader.setActiveTab(theTab);
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
