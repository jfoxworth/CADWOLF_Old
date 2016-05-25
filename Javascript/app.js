// Module
var cadwolfApp = angular.module('cadwolfApp', ['ngSanitize', 'ngDialog']);

//cadwolfApp.run(function($rootScope, $templateCache) {
//   $rootScope.$on('$viewContentLoaded', function() {
//      $templateCache.removeAll();
//   });
//});

cadwolfApp.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);
