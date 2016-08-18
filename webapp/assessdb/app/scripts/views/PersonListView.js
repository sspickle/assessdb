
define(['backbone', 'templates','backbone.marionette'], function(Backbone, JST) {
    var PersonView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template:  JST["app/scripts/templates/personItemView.ejs"]
    });

    var PeopleView = Backbone.Marionette.CollectionView.extend({
            tagName : 'ul',
            childView: PersonView,
    });
    
    return PeopleView;
});
