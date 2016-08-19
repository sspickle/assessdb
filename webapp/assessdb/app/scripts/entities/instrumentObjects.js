define(["entities/entitiesObject"], function( Entities ) {

    Entities.Instrument = Backbone.Model.extend({
        defaults :{
            id : '',
            name : '',
            description : '',
        }
    });

    Entities.InstrumentCollection = Backbone.Collection.extend({
        model: Entities.Instrument,
        url:'/restapi/instruments'
    });

    return Entities;
});

