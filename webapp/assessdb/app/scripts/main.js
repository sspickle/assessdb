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
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      exports: 'Backbone',
      deps: ['jquery', 'underscore']
    },
    bootstrap: {
        exports: 'Bootstrap',
        deps: ['jquery']
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

require(["App", "AppRouter", "AppController", "bootstrap"],
    function (App, AppRouter, AppController) {
        App.appRouter = new AppRouter({
            controller:new AppController()
        });
        App.start();
    });