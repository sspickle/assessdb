var Backbone = require('backbone');
var Person = require('./personObject.js');

var PersonCollection = Backbone.Collection.extend({
        model: Person,
        url:'/restapi/persons'
    });

module.exports = PersonCollection;