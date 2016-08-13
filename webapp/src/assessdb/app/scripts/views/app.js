//
// For toying around, just build everything here. 
// As the UI model becomes clearer we can modularize etc.
//


define(['backbone','backbone.marionette',], function(Backbone,Mnt) {
  var App = Backbone.View.extend({
    initialize: function() {
        console.log("Got it!");
        peopleView.collection = new PersonCollection();
        peopleView.collection.fetch();
        peopleView.render();
    }
  });
  
//
// first declare some backbone models
//
    
    Person = Backbone.Model.extend({
        defaults :{
            firstName : '',
            lastName : '',
            studentID : '',
            email: ''
        }
    });

    Class = Backbone.Model.extend({
        defaults :{
            name : '',
            startDate : '',
            endDate : ''
        }
    });

    Role = Backbone.Model.extend({
        defaults :{
            name : ''
        }
    });

    Section = Backbone.Model.extend({
        defaults :{
            name : '',
            classID : ''
        }
    });

    PersonCollection = Backbone.Collection.extend({
        model: Person,
        url: '/restapi/persons',
        initialize: function () {
          this.listenTo(this.model, 'change', this.render);    
          }
    });


    var PersonView = Backbone.Marionette.ItemView.extend({
            tagName : 'li',
            template: '#personTemplate'
    });

    var PeopleView = Backbone.Marionette.CollectionView.extend({
            tagName : 'ul',
            el: '#content',
            childView: PersonView,
    });

    var peopleView = new PeopleView();
        
  return App;
});
