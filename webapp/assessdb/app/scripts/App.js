define(['jquery', 'backbone', 'entities/personObjects', 'views/PersonListView', 'views/HeaderView', 'backbone.marionette'],
    function ($, Backbone, Entities, PeopleView, HeaderView) {

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

        var myCollection = new Entities.PersonCollection();
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

    return App;
});
