// DIRECTIVES
chartApp.directive("chartMain", function() {
    }
);


// This is the standard directive that handles the case where a user hits enter when focused on an input
chartApp.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });                 
                    event.preventDefault();
                }
            });
        };
});
