var Backbone = require('backbone');

var Instrument = Backbone.Model.extend({
        defaults :{
            id : '',
            name : '',
            description : '',
        }
    });

module.exports = Instrument;
