define(["entities/entitiesObject"], function( Entities ) {

    Entities.Person = Backbone.Model.extend({
        defaults :{
            first : '',
            last : '',
            upid : '',
            email: ''
        }
    });

    Entities.PersonCollection = Backbone.Collection.extend({
        model: Entities.Person,
        url:'/restapi/persons'
    });

    return Entities;
});

