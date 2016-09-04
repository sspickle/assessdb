
var Backbone = require('backbone');

var CourseView = Backbone.Marionette.View.extend({
        tagName : 'li',
        template:  require("../templates/courseItemView.html")
});

var CoursesView = Backbone.Marionette.CollectionView.extend({
        tagName : 'ul',
        childView: CourseView,
});

module.exports = CoursesView;
