require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    'backbone.marionette': 'vendor/marionette/lib/backbone.marionette',
    'mathquill': 'vendor/mathquill-0.10.1/mathquill',
    'etch': 'vendor/etch/scripts/etch',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    bootstrap: {
        exports: 'Bootstrap',
        deps: ['jquery']
    },
    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    },
    mathquill: {
      exports: 'MathQuill',
      deps: ['jquery']
    },
    etch: {
      exports: 'etch',
      deps: ['backbone']
    },
  },
  deps: ['jquery', 'underscore']
});

require(["backbone","backbone.marionette","templates"],
    function (Backbone,Mn,JST) {

    var Person = Backbone.Model.extend({
        defaults :{
            first : '',
            last : '',
            upid : '',
            email: ''
        }
    });

    var PersonCollection = Backbone.Collection.extend({
        model: Person,
        url:'/restapi/persons'
    });

    var PersonView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: JST["app/scripts/templates/personItemView.ejs"]
    });

    var PeopleView = Backbone.Marionette.CollectionView.extend({
            tagName : 'ul',
            childView: PersonView,
    });

    var HeaderView = Backbone.Marionette.ItemView.extend({template:JST["app/scripts/templates/header.ejs"]});
    var App = new Backbone.Marionette.Application();

    var RegionContainer =  Backbone.Marionette.LayoutView.extend({
        el: "#app-container",

        regions: {
            main: "#main-region",
            header: "#header-region"
            }
    });
         
    RouterClass = Backbone.Marionette.AppRouter.extend({
           //"index" must be a method in AppRouter's controller
           appRoutes: {
               "": "index",
               "contact":"confunc"
           }
       });

    ControllerClass = Backbone.Marionette.Object.extend({
            initialize:function (options) {
                this.listView = options.listView;
                console.log("In controller init func" + this.listView);
            },
            //gets mapped to in AppRouter's appRoutes
            index:function () {
                console.log("In index func"+ this.listView);
                App.regions.main.show(this.listView);
            },
            confunc: function() {
                console.log("in contact func");
            }
        });
    
    App.on("before:start", function() {
         App.regions = new RegionContainer();
    });

    App.on("start", function() {
    
        //
        // Add router/controller
        //

        var myCollection = new PersonCollection();
        myCollection.fetch();
        
        var myListView = new PeopleView({collection: myCollection});
        
        var myHeaderView = new HeaderView();

        App.regions.main.show(myListView);
        App.regions.header.show(myHeaderView);    

        var myRouter = new RouterClass(
            {controller: new ControllerClass({
                listView:myListView
                })
            });
            
        Backbone.history.start();
    })

    App.start();    
});