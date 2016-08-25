var Backbone = require('backbone');

var Person = Backbone.Model.extend({
        defaults :{
            first : '',
            last : '',
            upid : '',
            email: ''
        }
    });

module.exports = Person;