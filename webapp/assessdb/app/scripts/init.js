// Include Desktop Specific JavaScript files here (or inside of your Desktop Controller, or differentiate based off App.mobile === false)
require(["App", "AppRouter", "AppController", "jquery", "backbone", "backbone.marionette"],
    function (App, AppRouter, AppController, $, Backbone, Marionette) {
        App.appRouter = new AppRouter({
            controller:new AppController()
        });
        App.start();
    });