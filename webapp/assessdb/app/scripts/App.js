define(['jquery', 'backbone', 'entities/personObjects', 'views/PersonListView', 'views/HeaderView', 'backbone.marionette'],
    function ($, Backbone, Entities, PeopleView, HeaderView) {

    var App = new Backbone.Marionette.Application();

    var RegionContainer =  Backbone.Marionette.LayoutView.extend({
        el: "#app-container",

        regions: {
            main: "#main-region",
            header: "#header-region",
            footer: "#footer-region"
            }
    });
         
    RouterClass = Backbone.Marionette.AppRouter.extend({
           //"index" must be a method in AppRouter's controller
           appRoutes: {
               "": "index",
               "home": "index",
               "contact":"confunc"
           }
       });

    ControllerClass = Backbone.Marionette.Object.extend({
            initialize:function (options) {
                this.listView = options.listView;
            },
            //gets mapped to in AppRouter's appRoutes
            index:function () {
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

        App.myPersonCollection = new Entities.PersonCollection();
        App.myPersonCollection.fetch();
        
        var myPersonListView = new PeopleView({collection: App.myPersonCollection});
        var myHeaderView = new HeaderView();

        App.regions.main.show(myPersonListView);
        App.regions.header.show(myHeaderView);

        var myRouter = new RouterClass(
            {controller: new ControllerClass({
                listView:myPersonListView
                })
            });
            
        Backbone.history.start();
    })

    return App;
});
