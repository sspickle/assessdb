
var Backbone = require('backbone');

var PersonView = Backbone.Marionette.View.extend({
        tagName : 'li',
        template:  require("../templates/personItemView.html"),
        events: {
            'click': function(e) {
                console.log("Person View We got it!:" + e);
            }
        }
    });
        

var PeopleView = Backbone.Marionette.CollectionView.extend({
        tagName : 'ul',
        childView: PersonView,
});

module.exports = PeopleView;
