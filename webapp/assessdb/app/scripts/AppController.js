define(['App', 'backbone', 'backbone.marionette', 'views/PersonListView', 'views/HeaderView'],
    function (App, Backbone, Marionette, PLView, HeaderView) {
    return Backbone.Marionette.Controller.extend({
        initialize:function (options) {
            App.headerRegion.show(new HeaderView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            App.mainRegion.show(new PLView());
        }
    });
});