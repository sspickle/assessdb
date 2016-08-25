var Backbone = require('backbone');
var Instrument = require('./instrumentObject.js');

var InstrumentCollection = Backbone.Collection.extend({
        model: Instrument,
        url:'/restapi/instruments'
    });

module.exports = InstrumentCollection;
