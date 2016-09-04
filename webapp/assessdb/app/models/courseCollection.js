var Backbone = require('backbone');
var Course = require('./courseObject.js');

var CourseCollection = Backbone.Collection.extend({
        model: Course,
        url:'/restapi/courses'
    });

module.exports = CourseCollection;
