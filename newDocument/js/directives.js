// DIRECTIVES
documentApp.directive("documentMain", function() {
    
});


// This is the standard directive that handles the case where a user hits enter when focused on an input
documentApp.directive('ngEnter', function() {
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


// Bind a mathjax item to update whenever it is changed
documentApp.directive("mathjaxBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.mathjaxBind, function(texExpression) {
                        var texScript = angular.element("<script type='math/tex'>").html(texExpression ? texExpression :  "");
                        $element.html("");
                        $element.removeClass('solvingClass');
                        $element.append(texScript);
                        MathJax.Hub.Queue(["Reprocess", MathJax.Hub, $element[0]]);
                    });
                }]
        };
}); 


// Directive for a text object
documentApp.directive("textObject", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/textObject.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


// Directive for a table. Template outputs data using other directives
documentApp.directive("tableObject", function($templateRequest, $compile) {
    return {
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/tableObject.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("tableAddDeleteCols", function($templateRequest, $compile) {
    return {
        restrict    : "A",
        scope       : { numcols: '=', showlabels:"=", tableid: '<' },
        link        : function(scope, element, attrs){
                        scope.$watch("[numcols, showlabels]", function() {
                            var thisText='<td class="empty" width="15px">&nbsp</td><td class="empty" width="15px">&nbsp</td><td ng-if="'+scope.showlabels+'" class="empty" width="25px">&nbsp</td>';
                            for (var a=0; a<scope.numcols; a++){ thisText=thisText+'<td class="empty"><div ng-click="$parent.deleteTableColumn(\''+scope.tableid+'\', '+a+')" class="tcdelete">&nbsp</div><div ng-click="$parent.addTableColumn(\''+scope.tableid+'\', '+a+')" class="tcadd"></div></td>'; }  
                            var template = $compile(angular.element(thisText))(scope);
                            element.children().remove();
                            element.append(template);
                        });
        }
    };
}); 


// Directive that shows the columns headers for a table
documentApp.directive("tableShowColHeaders", function($templateRequest, $compile) {
    return {
        restrict    : "A",
        scope       : { numcols: '=', showlabels:"=", tableid: '<' },
        link        : function(scope, element){
                        scope.$watch("[numcols, showlabels]", function() {
                            console.log('The show labels is '+scope.showlabels);
                            var thisText='<th class="empty" width="15px">&nbsp</th><th class="empty" width="15px">&nbsp</th><th ng-if="'+scope.showlabels+'" class="empty" width="25px">&nbsp</th>';
                            for (var a=0; a<scope.numcols; a++){ thisText=thisText+'<th ng-click="editTableHeader(\''+scope.tableid+'\', '+a+')">'+String.fromCharCode('A'.charCodeAt() + (a));	+'</th>'; }  
                            var template = $compile(angular.element(thisText))(scope);
                            element.children().remove();
                            element.append(template);
                        });
        }
    };
}); 

// Directive to toggle active table cells
documentApp.directive('toggleTableData', function() {
    return {
        restrict    : 'A',
        link        : function(scope, element, attrs) {
                            element.bind('click', function() { element.parent().parent().children('tr').children('td').removeClass('activeTD'); element.addClass('activeTD');  });
        }
    };
});

documentApp.directive("textSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/textSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


documentApp.directive("eqSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/eqSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("symSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/symSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("tableSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/tableSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


documentApp.directive("plotSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/plotSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        },controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.plotSpecBind, function(plotData) {
                        myObj=plotData;
                    });
                }]
        };
});

documentApp.directive("surfSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/surfaceSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        },controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.surfSpecBind, function(surfData) {
                        myObj=surfData;
                    });
                }]
        };
});

// Directive that binds changes in plot data to re-update the plot
documentApp.directive("plotBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.plotBind, function(plotObj) {   $scope.makeChart(plotObj.Format_id); });
                }]
        };
}); 

// Directive that binds changes in plot data to re-update the plot
documentApp.directive("surfaceBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.surfaceBind, function(plotObj) {   console.log('Surface changed'); });
                }]
        };
}); 

// These two directives toggle the "active" class of an item on the plot data line and the tabs in the plot specifics view
documentApp.directive('toggleActive', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() { element.parent().children('dataplot_subtab_active').removeClass('dataplot_subtab_active'); element.addClass('dataplot_subtab_active');  });           
        }
    };
});
documentApp.directive('toggleActiveName', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() { element.parent().parent().children().children().removeClass('plot_dataline_active'); element.addClass('plot_dataline_active');  });
        }
    };
});



documentApp.directive("imageSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/imageSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


documentApp.directive("videoSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/videoSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


documentApp.directive("referenceObject", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/references.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("forloopSpecBind", function($templateRequest, $compile) {
    return {
        restrict    : "A",
        link        : function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/forLoopSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("whileloopSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/whileLoopSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

documentApp.directive("ifelseSpecBind", function($templateRequest, $compile) {
    return {
        restrict: "A",
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/ifelseSpec.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 


// Directives related to the for loops
documentApp.directive("forLoopObject", function($templateRequest, $compile) {
    return {
        restrict    : "A",
        controller: ["$scope", "$element", "$attrs",
            function($scope, $element, $attrs) {
                if ($scope.subObj!==undefined) {   $scope.obj=$scope.subObj;    }
            }],
        link        : function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/forloops.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

// Directives related to the if else statements
documentApp.directive("ifElseObject", function($templateRequest, $compile) {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
            function($scope, $element, $attrs) {
                if ($scope.subObj!==undefined) {   $scope.obj=$scope.subObj;    }
            }],
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/ifelse.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

// Directives related to the if else statements
documentApp.directive("whileLoopObject", function($templateRequest, $compile) {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
            function($scope, $element, $attrs) {
                if ($scope.subObj!==undefined) {   $scope.obj=$scope.subObj;    }
            }],
        link: function(scope, element){
            $templateRequest("http://www.cadwolf.com/js/documents/whileloop.html").then(function(html){
                var template = angular.element(html);
                element.append(template);
                $compile(template)(scope);
            });
        }
    };
}); 

// Directive that shows the references for an object
documentApp.directive("refNum2", function($compile) {
    return {
        restrict    : "A",
        link: function(scope, element, attrs) 
              {     
                  
                    scope.$watch("[obj.Values.References, cadwolf_references]", function() {
                        dirScope=scope;
                        console.log('The object refs are ...');
                        for (var a=0; a<scope.obj.Values.References.length; a++){console.log(scope.obj.Values.References[a]);}
                        console.log('The worksheet refs are ...');
                        for (var a=0; a<scope.cadwolf_references.length; a++){console.log(scope.cadwolf_references[a]['refID']);}
                        var thisText='', thisNum=0;
                            for (var a=0; a<scope.obj.Values.References.length; a++) 
                            {   for (var b=0; b<scope.cadwolf_references.length; b++)
                                {   if (scope.obj.Values.References[a]==scope.cadwolf_references[b]['refID'])
                                    {   thisNum=parseInt(b+1);
                                        var thisText=thisText+'<div class="refline"><div class="reficon_wrapper"><div class="reficon">'+thisNum+'</div></div></div>';
                                    }
                                }
                            }
                            element.children().remove();
                            element.append(thisText);
                    });
                }
    };
}); 



// Bind a reference item to update whenever it is changed
documentApp.directive("refNum", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.refNum, function() {
                        thisText='<div class="refline"><div class="refSection">';
                        for (var a=0; a<$scope.cadwolf_references.length; a++) 
                        {   for (var b=0; b<$scope.obj.Values.References.length; b++)
                            {   if ($scope.obj.Values.References[b]==$scope.cadwolf_references[a]['refID'])
                                {   thisNum=parseInt(a+1);
                                    thisText=thisText+'<div class="reficon_wrapper"><div class="reficon">'+thisNum+'</div></div>';
                                }
                            }
                        }
                        thisText=thisText+'</div></div>';
                        if ($scope.obj.Values.References===undefined){ $scope.obj.Values.References=[]; }
                        if ($scope.obj.Values.References.length>0)
                        {   $element.children().remove();
                            $element.append(thisText);
                        }
                    }, true);
                }]
        };
}); 

documentApp.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
    return {
        link: function( $scope, $element, $attributes ){
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function(event){
                    var isChild = $element.find(event.target).length > 0;

                    if(!isChild) {
                        $scope.$apply(scopeExpression);
                    }
                };

            $document.on("click", onDocumentClick);

            $element.on('$destroy', function() {
                $document.off("click", onDocumentClick);
            });
        }
    }
}]);

