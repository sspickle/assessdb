define(['App', 'backbone', 'backbone.marionette', 'views/PersonListView', 'views/HeaderView'],
    function (App, Backbone, Marionette, ILView, HeaderView) {
    return Backbone.Marionette.Object.extend({
        initialize:function (options) {
            console.log("In init func");
            App.regions.header.show(new HeaderView());
        },
        //gets mapped to in AppRouter's appRoutes
        index:function () {
            console.log("In index func");
            var newView = new ILView();
            App.regions.main.show(newView);
        }
    });
});
