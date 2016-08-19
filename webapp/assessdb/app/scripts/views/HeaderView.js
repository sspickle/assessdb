define(['backbone', 'templates', 'backbone.marionette'], function(Backbone, JST) {
    return Backbone.Marionette.ItemView.extend(
        {
            template:JST["app/scripts/templates/header.ejs"],
            
            events: {
                'click a': "onClickLink"
            },
            
            onClickLink : function(e) {
                this.$('li.active').toggleClass('active', false); // turn previously-selected nav link off
                $(e.target).blur()
                    .closest('li').toggleClass('active', true); // turn on new link
            }
            
        });
});
