// DIRECTIVES
surfaceApp.directive("surfaceMain", function() {
    }
);


// This is the standard directive that handles the case where a user hits enter when focused on an input
surfaceApp.directive('ngEnter', function() {
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

surfaceApp.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
    return {
        link: function( $scope, $element, $attributes ){
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function(event){
                    var isChild = $element.find('canvas').length > 0;
                    if(!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };
            $document.on("click", onDocumentClick);

            $element.on('$destroy', function() { $document.off("click", onDocumentClick); });
        }
    }
}]);
