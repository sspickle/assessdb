window._ = require('underscore'); // Backbone can't see it otherwise
window.$ = require('jquery');

var Backbone = require('backbone');
Backbone.$ = window.$; // Use the jQuery from the script tag
Backbone.Marionette = require('backbone.marionette');
