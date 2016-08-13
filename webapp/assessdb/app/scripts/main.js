require.config({
  paths: {
    'jquery': 'vendor/jquery/dist/jquery',
    'underscore': 'vendor/underscore/underscore',
    'backbone': 'vendor/backbone/backbone',
    'backbone.babysitter': 'vendor/backbone.babysitter/lib/backbone.babysitter',
    'backbone.wreqr': 'vendor/backbone.wreqr/lib/backbone.wreqr',
    'backbone.marionette': 'vendor/marionette/lib/backbone.marionette',
    'mathquill': 'vendor/mathquill-0.10.1/mathquill',
    'etch': 'vendor/etch/scripts/etch',
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    marionette: {
      exports: 'Backbone.Marionette',
      deps: ['backbone']
    },
    mathquill: {
      exports: 'MathQuill',
      deps: ['jquery']
    },
    etch: {
      exports: 'etch',
      deps: ['backbone']
    },
  },
  deps: ['jquery', 'underscore']
});
 
require(['views/app'], function(AppView) {
  new AppView; 
});
