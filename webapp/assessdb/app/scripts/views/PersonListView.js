
define(['backbone', 'backbone.marionette'], function(Backbone) {
  var PLView = Backbone.View.extend({
    initialize: function() {
        console.log("Got it! PLV");
        var peopleView = new PeopleView();
        peopleView.collection = new PersonCollection([
        {first:'Joe', last:'Smith'},
        {first:'Sam', last:'Spade'}]);
//        peopleView.collection.fetch();
        peopleView.doRender();
    }
  });
  
//
// first declare some backbone models
//
    
    Person = Backbone.Model.extend({
        defaults :{
            first : '',
            last : '',
            upid : '',
            email: ''
        }
    });

    PersonCollection = Backbone.Collection.extend({
        model: Person,
//        url: '/restapi/persons',
    });

    var PersonView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: '#personTemplate'
    });

    var PeopleView = Backbone.Marionette.CollectionView.extend({
            tagName : 'ul',
            childView: PersonView,
            doRender: function() {
                debugger;
                this.render();
            },
    });
    
  return PLView;
});
