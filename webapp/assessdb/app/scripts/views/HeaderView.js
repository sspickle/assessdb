define(['backbone', 'templates', 'backbone.marionette'], function(Backbone, JST) {
    return Backbone.Marionette.ItemView.extend({template:JST["app/scripts/templates/header.ejs"]});
});
