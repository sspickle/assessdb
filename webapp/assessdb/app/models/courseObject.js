var Backbone = require('backbone');

var Course = Backbone.Model.extend({
        defaults :{
            id : '',
            subject : '',
            num : 0,
            sect: '',
            term: 0,
            CRN:0
        }
    });

module.exports = Course;