// DIRECTIVES
cadwolfApp.directive("datasetMain", function() {
    }
);

cadwolfApp.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeHandler);
    }
  };
});

cadwolfApp.directive('customOnChangeExcel', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChangeExcel);
      element.bind('change', onChangeHandler);
    }
  };
});