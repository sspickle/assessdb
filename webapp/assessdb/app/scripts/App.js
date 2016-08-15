define(['jquery', 'backbone', 'backbone.marionette'],
    function ($, Backbone, Marionette) {
        var App = new Backbone.Marionette.Application();
        var RegionContainer =  Backbone.Marionette.LayoutView.extend({
            el: "#app-container",
    
            regions: {
                main: "#main-region",
                header: "#header-region"
                }
        });
                 
        App.addInitializer(function () {
            App.regions = new RegionContainer();
        });

        return App;
    });
