define(['backbone', 'backbone.marionette','bootstrap'],
    function (Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:'#dumbTemplate'
        });
    });