// DIRECTIVES
cadwolfApp.directive("documentMain", function() {
    
});


// This is the standard directive that handles the case where a user hits enter when focused on an input
cadwolfApp.directive('ngEnter', function() {
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
cadwolfApp.directive("mathjaxBind", function() {
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
cadwolfApp.directive("textObject", function($templateRequest, $compile) {
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
cadwolfApp.directive("tableObject", function($templateRequest, $compile) {
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

cadwolfApp.directive("tableAddDeleteCols", function($templateRequest, $compile) {
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
cadwolfApp.directive("tableShowColHeaders", function($templateRequest, $compile) {
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
cadwolfApp.directive('toggleTableData', function() {
    return {
        restrict    : 'A',
        link        : function(scope, element, attrs) {
                            element.bind('click', function() { element.parent().parent().children('tr').children('td').removeClass('activeTD'); element.addClass('activeTD');  });
        }
    };
});

cadwolfApp.directive("textSpecBind", function($templateRequest, $compile) {
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


cadwolfApp.directive("eqSpecBind", function($templateRequest, $compile) {
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

cadwolfApp.directive("symSpecBind", function($templateRequest, $compile) {
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

cadwolfApp.directive("tableSpecBind", function($templateRequest, $compile) {
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


cadwolfApp.directive("plotSpecBind", function($templateRequest, $compile) {
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

cadwolfApp.directive("surfSpecBind", function($templateRequest, $compile) {
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
// Whenever the needsUpdateFlag is tripped on the plot, this directive called and then makes the chart again
cadwolfApp.directive("plotBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.plotBind, function(plotObj) 
                    {   if (plotObj.Plot.needsUpdateFlag==1)
                        {   console.log('Making the plot from the directive');  
                            plotObj.Plot.needsUpdateFlag=0;
                  
                            var chartData=plotObj.Plot;
                            console.log('Make Charts was called with '+plotObj.Plot.Format_id+' to make a '+chartData.Chart_type);
                            if (chartData.newType==1){ chartData.Chart_dataobj=[]; chartData.newType=0; }
                            var datafinal=new Array();
                            thischart={}; thischart.chart={}; thischart.series=new Array();	thischart.title={};	thischart.subtitle={};	thischart.xAxis=new Array();
                            thischart.yAxis=new Array();	thischart.legend={};	thischart.yAxis[0]={};	thischart.xAxis[0]={};		thischart.plotOptions={};	
                            thischart.chart.renderTo=plotObj.Plot.Format_id;
                            if (thischart.Chart_type!="combo") { thischart.chart.type=chartData.Chart_type;	}
                            thischart.chart.margin='['+chartData.Chart_margintop+', '+chartData.Chart_marginright+', '+chartData.Chart_marginbottom+', '+chartData.Chart_marginleft+']';
                            thischart.chart.backgroundColor='transparent';
                            thischart.chart.height=chartData.Chart_height.replace(/[a-z]+$/,'');				
                            thischart.chart.width=chartData.Chart_width.replace(/[a-z]+$/,'');
                            if (chartData.Title_onoff===true) 		
                            {	thischart.title.margin=15; thischart.title.text=chartData.Title_text; 	thischart.title.floating=true;
                            }else { thischart.title.margin=0; thischart.title.text=''; }		
                            if (chartData.Subtitle_onoff===true) { thischart.subtitle.text=chartData.Subtitle_text; }else { thischart.subtitle.text=''; }	
                            thischart.title.x=chartData.Title_xoffset;			thischart.title.y=chartData.Title_yoffset;		
                            thischart.subtitle.x=chartData.Subtitle_xoffset;	thischart.subtitle.y=chartData.Subtitle_yoffset;
                            thischart.chart.marginBottom=chartData.Chart_marginbottom;		thischart.chart.marginTop=chartData.Chart_margintop;			
                            thischart.chart.marginLeft=chartData.Chart_marginleft;			thischart.chart.marginRight=chartData.Chart_marginright;		
                            thischart.tooltip={};	thischart.tooltip.shared=true;	thischart.tooltip.crosshairs=true;
                            thischart.tooltip.formatter= "";
                            if(thischart.chart.type=="heatmap") {		thischart.tooltip.pointFormat='{series.name}: X is {point.x} : Y is {point.y} : the value is {point.value}<br/>';
                            }else if(thischart.chart.type=="pie") {	thischart.tooltip.pointFormat='{point.name} - {point.y}<br/>';
                            }else if(thischart.chart.type!="bubble"){	thischart.tooltip.pointFormat='{series.name}: X is {point.x} : Y is {point.y}<br/>';	}
                            thischart.tooltip.headerFormat='';

                            if (thischart.chart.type=="heatmap")		
                            {	thischart.colorAxis={};
                                if (chartData.colorAxis===undefined) { thischart.colorAxis={};  window[plotObj.Plot.Format_id].colorAxis={}; }			
                                if (chartData.colorAxis.min!==undefined) { thischart.colorAxis.min=window[plotObj.Plot.Format_id].colorAxis.min; }else{ chartData.colorAxis.min=0; }	
                                if (chartData.colorAxis.max!==undefined) { thischart.colorAxis.max=window[plotObj.Plot.Format_id].colorAxis.max; }	
                                if (chartData.colorAxis.type===undefined) { thischart.colorAxis.type="linear"; chartData.colorAxis.type="linear"; }else { thischart.colorAxis.type=chartData.colorAxis.type; }
                                if (chartData.colorAxis.stops!==undefined) 
                                {	thischart.colorAxis.stops=new Array();
                                    for (var a=0; a<window[PlotID].colorAxis.stops.length; a++)	
                                    {	thischart.colorAxis.stops[a]=new Array();
                                        thischart.colorAxis.stops[a]['0']=window[PlotID].colorAxis.stops[a]['0'];
                                        thischart.colorAxis.stops[a]['1']=window[PlotID].colorAxis.stops[a]['1']; }
                                }else 				
                                {	thischart.colorAxis.stops=new Array();
                                    thischart.colorAxis.stops['0']=new Array();		thischart.colorAxis.stops['1']=new Array();		thischart.colorAxis.stops['2']=new Array();	
                                    thischart.colorAxis.stops['0']['0']=0;		    thischart.colorAxis.stops['0']['1']='#3060cf'; 
                                    thischart.colorAxis.stops['1']['0']=0.5;	    thischart.colorAxis.stops['1']['1']='#fffbbc'; 
                                    thischart.colorAxis.stops['2']['0']=1;		    thischart.colorAxis.stops['2']['1']='#c4463a'; 
                                    chartData.colorAxis.stops=new Array();
                                    chartData.colorAxis.stops['0']=new Array();		chartData.colorAxis.stops['1']=new Array();		chartData.colorAxis.stops['2']=new Array();	
                                    chartData.colorAxis.stops['0']['0']=0;		    chartData.colorAxis.stops['0']['1']='#3060cf'; 
                                    chartData.colorAxis.stops['1']['0']=0.5;	    chartData.colorAxis.stops['1']['1']='#fffbbc'; 
                                    chartData.colorAxis.stops['2']['0']=1;		    chartData.colorAxis.stops['2']['1']='#c4463a';                 
                                }					
                            }						
                            if (thischart.chart.type=="heatmap")		
                            {	thischart.legend.align='center';		
                                thischart.legend.layout='horizontal';	
                                thischart.legend.verticalAlign='bottom';
                                thischart.legend.y=25;
                                thischart.legend.margin=0;	
                            }else{					
                                thischart.legend.align=chartData['Legend_align'];			
                                if (chartData.Legend_floating==1) { thischart.legend.floating=true; }else { thischart.legend.floating=false; }					
                                thischart.legend.layout=chartData['Legend_layout'];		
                                if (chartData['Legend_onoff']===false) { thischart.legend.enabled=false;	}else { thischart.legend.enabled=true; }			
                                thischart.legend.rtl=chartData['Legend_rtl'];
                                thischart.legend.verticalAlign=chartData['Legend_verticalalign'];				
                                thischart.legend.x=$scope.toNum(chartData['Legend_xoffset']);		
                                thischart.legend.y=$scope.toNum(chartData['Legend_yoffset']);		
                                thischart.legend.itemMarginTop=15;		
                            }						
                            for (var AxisID in chartData.Chart_yaxesobj)	
                            {	var axisnum=chartData.Chart_yaxesobj[AxisID]['Axis_num'];	
                                thischart.yAxis[axisnum]={};
                                thischart.yAxis[axisnum].id=chartData.Chart_yaxesobj[AxisID]['Format_id'];		
                                thischart.yAxis[axisnum].title={};		
                                thischart.yAxis[axisnum].title.text=chartData['Chart_yaxesobj'][AxisID].Axis_label;	
                                thischart.yAxis[axisnum].type=chartData['Chart_yaxesobj'][AxisID].Axis_type;	
                                var opposite=chartData['Chart_yaxesobj'][AxisID].Axis_opposite; var reversed=chartData['Chart_yaxesobj'][AxisID].Axis_reversed;		
                                if ((opposite=="true")||(opposite===true)){ thischart.yAxis[axisnum].opposite=true;}else{thischart.yAxis[axisnum].opposite=false;}	
                                if ((reversed=="true")||(reversed===true)){ thischart.yAxis[axisnum].reversed=true;}else{thischart.yAxis[axisnum].reversed=false;}	
                                if (chartData['Chart_yaxesobj'][AxisID].Axis_min!="null") { thischart.yAxis[axisnum].min=chartData['Chart_yaxesobj'][AxisID].Axis_min;  }
                                if (chartData['Chart_yaxesobj'][AxisID].Axis_max!="null") { thischart.yAxis[axisnum].max=chartData['Chart_yaxesobj'][AxisID].Axis_max;  }
                                if ((chartData['Chart_yaxesobj'][AxisID].Axis_gridlinesonoff=="true")||(chartData['Chart_yaxesobj'][AxisID].Axis_gridlinesonoff===true))		
                                {	thischart.yAxis[axisnum].gridLineWidth=chartData['Chart_yaxesobj'][AxisID].Axis_gridlinewidth;	
                                    thischart.yAxis[axisnum].gridLineColor=chartData['Chart_yaxesobj'][AxisID].Axis_gridcolor;		
                                    if ((chartData['Chart_yaxesobj'][AxisID].Axis_tickinterval!==0)&&(chartData['Chart_yaxesobj'][AxisID].Axis_tickinterval!="null"))	
                                    {	thischart.yAxis[axisnum].tickInterval=parseFloat(chartData['Chart_yaxesobj'][AxisID].Axis_tickinterval); } 			
                                }					
                                if ((chartData['Chart_yaxesobj'][AxisID].Axis_minorgridlinesonoff=="true")||(chartData['Chart_yaxesobj'][AxisID].Axis_minorgridlinesonoff===true))		
                                {	thischart.yAxis[axisnum].minorGridLineWidth=chartData['Chart_yaxesobj'][AxisID].Axis_minorgridlinewidth;					
                                    thischart.yAxis[axisnum].minorGridLineColor=chartData['Chart_yaxesobj'][AxisID].Axis_minorgridcolor;						
                                    if (chartData['Chart_yaxesobj'][AxisID].Axis_minortickinterval!==0) 		
                                    {	thischart.yAxis[axisnum].minorTickInterval=parseFloat(chartData['Chart_yaxesobj'][AxisID].Axis_minortickinterval); } 	
                                }					
                                thischart.yAxis[axisnum].plotBands=new Array();	
                                for (var BandID in chartData['Chart_bandsobj'])			
                                {	if (chartData['Chart_bandsobj'][BandID]['Axis_id']==chartData.Chart_yaxesobj[AxisID]['Format_id'])				
                                    {	var temp={};
                                        temp.color=chartData['Chart_bandsobj'][BandID]['color'];				
                                        temp.from=chartData['Chart_bandsobj'][BandID]['Band_start'];			
                                        temp.to=chartData['Chart_bandsobj'][BandID]['Band_end'];				
                                        thischart.yAxis[axisnum].plotBands.push(temp);			
                                    }				
                                }					
                                thischart.yAxis[axisnum].plotLines=new Array();	
                                for (var LineID in chartData['Chart_linesobj'])			
                                {	if (chartData['Chart_linesobj'][LineID]['Axis_id']==chartData.Chart_yaxesobj[AxisID]['Format_id'])				
                                    {	var temp={};
                                        temp.color=chartData['Chart_linesobj'][LineID]['color'];				
                                        temp.value=chartData['Chart_linesobj'][LineID]['Line_value'];			
                                        temp.width=chartData['Chart_linesobj'][LineID]['Line_width'];			
                                        thischart.yAxis[axisnum].plotLines.push(temp);			
                                    }				
                                }					
                            }						
                            for (var AxisID in chartData.Chart_xaxesobj)	
                            {	var axisnum=chartData.Chart_xaxesobj[AxisID]['Axis_num'];	
                                thischart.xAxis[axisnum]={};
                                thischart.xAxis[axisnum].id=chartData.Chart_xaxesobj[AxisID]['Format_id'];		
                                thischart.xAxis[axisnum].title={};		
                                if (chartData['Chart_xaxesobj'][AxisID].Chart_Labeltext!==undefined)
                                {   if ((chartData.Chart_type=="column")||(chartData.Chart_type=="bar")||(chartData.Chart_type=="heatmap")) { var temptext=chartData['Chart_xaxesobj'][AxisID].Chart_Labeltext.split(',');		
                                    thischart.xAxis[axisnum].categories=temptext;	} }
                                thischart.xAxis[axisnum].title.text=chartData['Chart_xaxesobj'][AxisID].Axis_label;	
                                thischart.xAxis[axisnum].type=chartData['Chart_xaxesobj'][AxisID].Axis_type;	
                                if (chartData['Chart_xaxesobj'][AxisID].Axis_opposite=="true"){ thischart.xAxis[axisnum].opposite=true;}else{thischart.xAxis[axisnum].opposite=false;}	
                                if (chartData['Chart_xaxesobj'][AxisID].Axis_reversed=="true"){ thischart.xAxis[axisnum].reversed=true;}else{thischart.xAxis[axisnum].reversed=false;}	
                                if (chartData['Chart_xaxesobj'][AxisID].Axis_min!="null") { thischart.xAxis[axisnum].min=chartData['Chart_xaxesobj'][AxisID].Axis_min;  }
                                if (chartData['Chart_xaxesobj'][AxisID].Axis_max!="null") { thischart.xAxis[axisnum].max=chartData['Chart_xaxesobj'][AxisID].Axis_max;  }
                                if ((chartData['Chart_xaxesobj'][AxisID].Axis_gridlinesonoff=="true")||(chartData['Chart_xaxesobj'][AxisID].Axis_gridlinesonoff===true))		
                                {	thischart.xAxis[axisnum].gridLineWidth=parseInt(chartData['Chart_xaxesobj'][AxisID]['Axis_gridlinewidth'], 10);				
                                    thischart.xAxis[axisnum].gridLineColor=chartData['Chart_xaxesobj'][AxisID].Axis_linecolor;		
                                    if ((chartData['Chart_xaxesobj'][AxisID].Axis_tickinterval!==0)&&(chartData['Chart_xaxesobj'][AxisID].Axis_tickinterval!="null"))	
                                    {	thischart.xAxis[axisnum]['tickInterval']=parseFloat(chartData['Chart_xaxesobj'][AxisID]['Axis_tickinterval']); } 						
                                }					
                                if ((chartData['Chart_xaxesobj'][AxisID].Axis_minorgridlinesonoff=="true")||(chartData['Chart_xaxesobj'][AxisID].Axis_minorgridlinesonoff===true)) 		
                                {	thischart.xAxis[axisnum].minorGridLineWidth=parseInt(chartData['Chart_xaxesobj'][AxisID].Axis_minorgridlinewidth);					
                                    thischart.xAxis[axisnum].minorGridLineColor=chartData['Chart_xaxesobj'][AxisID].Axis_minorgridcolor;						
                                    if (chartData['Chart_xaxesobj'][AxisID].Axis_minortickinterval!==0) 		
                                    {	thischart.xAxis[axisnum].minorTickInterval=parseFloat(chartData['Chart_xaxesobj'][AxisID].Axis_minortickinterval); } 				
                                }					
                                thischart.xAxis[axisnum].plotBands=new Array();	
                                for (var BandID in chartData['Chart_bandsobj'])			
                                {	if (chartData['Chart_bandsobj'][BandID]['Axis_id']==chartData.Chart_xaxesobj[AxisID]['Format_id'])				
                                    {	var temp={};
                                        temp.color=chartData['Chart_bandsobj'][BandID]['color'];				
                                        temp.from=chartData['Chart_bandsobj'][BandID]['Band_start'];			
                                        temp.to=chartData['Chart_bandsobj'][BandID]['Band_end'];				
                                        thischart.xAxis[axisnum].plotBands.push(temp);			
                                    }				
                                }					
                                thischart.xAxis[axisnum].plotLines=new Array();	
                                for (var LineID in chartData['Chart_linesobj'])			
                                {	if (chartData['Chart_linesobj'][LineID]['Axis_id']==chartData.Chart_xaxesobj[AxisID]['Format_id'])				
                                    {	var temp={};
                                        temp.color=chartData['Chart_linesobj'][LineID]['color'];				
                                        temp.value=chartData['Chart_linesobj'][LineID]['Line_value'];			
                                        temp.width=chartData['Chart_linesobj'][LineID]['Line_width'];			
                                        thischart.xAxis[axisnum].plotLines.push(temp);			
                                    }				
                                }					
                            }						
                            for (var dataid in chartData.Chart_dataobj)	
                            {	if (chartData.Chart_dataobj[dataid]['data_plottext']!==undefined)				
                                {	if (chartData.Chart_dataobj[dataid]['Format_type']=="pie")
                                    {	datafinal=new Array();
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']]={};		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].type="pie";
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].startAngle=chartData.Chart_dataobj[dataid]['Chart_startangle'];	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].startAngle=chartData.Chart_dataobj[dataid]['Chart_endangle'];		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].center=chartData.Chart_dataobj[dataid]['Chart_location'].split(',');
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].size=parseInt(chartData.Chart_dataobj[dataid]['Chart_size'], 10)+'%';
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].innerSize=parseInt(chartData.Chart_dataobj[dataid]['Chart_innersize'], 10)+'%';
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].fillcolor=chartData.Chart_dataobj[dataid]['fillcolor'];
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels={};
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].startAngle=chartData.Chart_dataobj[dataid]['Chart_startangle'];	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].endAngle=chartData.Chart_dataobj[dataid]['Chart_stopangle'];		
                                        dataobj=new Array();
                                        for (var a=0; a<chartData.Chart_dataobj[dataid]['piedata'].length; a++)
                                        {	dataobj[a]={};	
                                            if (chartData.Chart_dataobj[dataid]['pielabels'][a]!==undefined){dataobj[a]['name']=chartData.Chart_dataobj[dataid]['pielabels'][a]; }
                                            dataobj[a]['y']=chartData.Chart_dataobj[dataid]['piedata'][a];		
                                        }			
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].data=dataobj;
                                        thischart.plotOptions['pie']={};
                                        if (chartData.Chart_dataobj[dataid]['showInLegend']===true) { 			
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].showInLegend = true;	
                                        }else {	thischart.series[chartData.Chart_dataobj[dataid]['series']].showInLegend = false;	}
                                        if ((chartData.Chart_dataobj[dataid]['data_datalabels']=="true")||((chartData.Chart_dataobj[dataid]['data_datalabels']===true)))
                                        {	thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels={};	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['connectorWidth']=chartData.Chart_dataobj[dataid].Chart_connectorWidth;	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['enabled']=true;
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['softConnector']=false;						
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['distance']=chartData.Chart_dataobj[dataid].data_labelDistance;
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['color']=chartData.Chart_dataobj[dataid].data_labelColor;
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };			
                                            if (chartData.Chart_dataobj[dataid].data_labelFormat=="Percentage")
                                            {	thischart.series[chartData.Chart_dataobj[dataid]['series']]['dataLabels']['formatter']=function() { return Math.round(this.percentage*100)/100 + ' %';}
                                            }else if (chartData.Chart_dataobj[dataid].data_labelFormat=="Value")
                                            {	thischart.series[chartData.Chart_dataobj[dataid]['series']]['dataLabels']['formatter']=function() { return this.y;} }			
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['borderWidth']=chartData.Chart_dataobj[dataid]['data_labelBorderWidth'];	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['borderColor']=chartData.Chart_dataobj[dataid]['data_labelBorderColor'];	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['borderRadius']=chartData.Chart_dataobj[dataid]['data_labelBorderRadius'];	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['padding']=chartData.Chart_dataobj[dataid]['data_labelBorderPadding'];
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['backgroundColor']=chartData.Chart_dataobj[dataid]['data_labelBackgroundColor'];
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['rotation']=chartData.Chart_dataobj[dataid]['data_labelRotation'];
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['x']=chartData.Chart_dataobj[dataid]['data_labelX'];
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['y']=chartData.Chart_dataobj[dataid]['data_labelY'];
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };			
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['style']['fontSize']=chartData.Chart_dataobj[dataid]['data_labelSize']; 	
                                        }else {	thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels={};
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['enabled']=false;	}					
                                        for (var point in chartData.Chart_dataobj[dataid].PointData)			
                                        {	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]={};
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['y']=chartData.Chart_dataobj[dataid].PointData[point]['y'];	
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['name']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['name']=chartData.Chart_dataobj[dataid].PointData[point]['name']; }//\
                                            if ((chartData.Chart_dataobj[dataid].PointData[point].color!==undefined)&&(chartData.Chart_dataobj[dataid].PointData[point].color!==''))
                                            {	thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['color']=chartData.Chart_dataobj[dataid].PointData[point].color;}//\
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['sliced']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['sliced']=eval(chartData.Chart_dataobj[dataid].PointData[point]['sliced']);	}
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']={};
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['labels']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].enabled=eval(chartData.Chart_dataobj[dataid]['PointData'][point]['labels']); }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].color=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelColor']; }	
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderRadius=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']; }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].backgroundColor=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']; }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderWidth=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']; }	
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].padding=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']; }	
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderColor=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']; }	
                                            thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']={ fontFamily: 'Arimo' }; 		
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelSize']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']['fontSize']=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelSize']; }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].rotation=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']; }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelX']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].x=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelX']; }
                                            if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelY']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].y=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelY']; }		
                                        }			
                                    }else			
                                    {	thischart.series[chartData.Chart_dataobj[dataid]['series']]={};		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].type=chartData.Chart_dataobj[dataid]['Format_type'];	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].turboThreshold=0;	
                            //				thischart.series[chartData.Chart_dataobj[dataid]['series']].data=JSON.parse("["+chartData.Chart_dataobj[dataid]['data_plottext']+"]");	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].name=chartData.Chart_dataobj[dataid]['dataname'];		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].yAxis=parseInt(chartData.Chart_dataobj[dataid]['yaxis']);		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].xAxis=parseInt(chartData.Chart_dataobj[dataid]['xaxis']);		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].color=chartData.Chart_dataobj[dataid]['color'];		
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].fillcolor=chartData.Chart_dataobj[dataid]['fillcolor'];
                                        if (chartData.Chart_dataobj[dataid]['showInLegend']===true) { 			
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].showInLegend = true;	
                                        }else {	thischart.series[chartData.Chart_dataobj[dataid]['series']].showInLegend = false;	}
                                        if (thischart.chart.type!="heatmap")	
                                        {	thischart.series[chartData.Chart_dataobj[dataid]['series']].lineWidth=parseInt(chartData.Chart_dataobj[dataid]['lineWidth'], 10);	}	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].marker={};	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].marker['enabled']=eval(chartData.Chart_dataobj[dataid]['data_pointmarkers']);	
                 //                       thischart.series[chartData.Chart_dataobj[dataid]['series']].marker['radius']=parseInt(chartData.Chart_dataobj[dataid]['data_markersize']);	
                                        if ((chartData.Chart_dataobj[dataid]['Format_type']=="bubble")||(chartData.Chart_dataobj[dataid]['Format_type']=="scatter"))
                                        {	chartData.Chart_dataobj[dataid]['lineWidth']=0;  }
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].marker.fillColor=chartData.Chart_dataobj[dataid]['fillcolor'];	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].marker.symbol=chartData.Chart_dataobj[dataid]['symbol'];
                                        if ((chartData.Chart_dataobj[dataid]['Format_type']=="column")||(chartData.Chart_dataobj[dataid]['Format_type']=="bar"))
                                        {   if (chartData.Chart_dataobj[dataid]['Chart_Labeltext']===undefined){    chartData.Chart_dataobj[dataid]['Chart_Labeltext']='';  }
                                            if (chartData.Chart_dataobj[dataid]['Chart_Labeltext'].length>0)
                                            {   thischart.xAxis[0].categories=chartData.Chart_dataobj[dataid]['Chart_Labeltext'].split(',');   }
                                        }
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels={};
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.enabled=eval(chartData.Chart_dataobj[dataid]['data_datalabels']);	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.color=chartData.Chart_dataobj[dataid]['data_labelColor'];
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.borderRadius=chartData.Chart_dataobj[dataid].data_labelBorderRadius;
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.backgroundColor=chartData.Chart_dataobj[dataid].data_labelBackgroundColor;
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.borderWidth=chartData.Chart_dataobj[dataid].data_labelBorderWidth;	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.padding=chartData.Chart_dataobj[dataid].data_labelBorderPadding;	
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['style']={ fontFamily: 'Arimo' };				
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels['style']['fontSize']=chartData.Chart_dataobj[dataid]['data_labelSize'];
                                        if (chartData.Chart_dataobj[dataid].data_labelBorderColor==='')		
                                        {	thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.borderColor=chartData.Chart_dataobj[dataid]['color'];
                                        }else { thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.borderColor=chartData.Chart_dataobj[dataid].data_labelBorderColor; }
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.rotation=chartData.Chart_dataobj[dataid].data_labelRotation;
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.x=chartData.Chart_dataobj[dataid].data_labelX;
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].dataLabels.y=chartData.Chart_dataobj[dataid].data_labelY;
                                        thischart.series[chartData.Chart_dataobj[dataid]['series']].data=new Array();	
                                        for (var point in chartData.Chart_dataobj[dataid].PointData)			
                                            {	var temp=JSON.parse(JSON.stringify(chartData.Chart_dataobj[dataid].PointData[point]['y']));						
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]={y: temp};		
                                                if (chartData.Chart_dataobj[dataid].PointData[point]['x']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['x']=chartData.Chart_dataobj[dataid].PointData[point]['x']; }	
                                                if (chartData.Chart_dataobj[dataid].PointData[point]['z']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['z']=chartData.Chart_dataobj[dataid].PointData[point]['z']; }	
                                                if (chartData.Chart_dataobj[dataid].PointData[point]['value']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['value']=chartData.Chart_dataobj[dataid].PointData[point]['value']; }	
                                                if (chartData.Chart_dataobj[dataid].PointData[point].data_fillcolor!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['color']=chartData.Chart_dataobj[dataid].PointData[point].data_fillcolor; }	
                                                if (chartData.Chart_dataobj[dataid].PointData[point].data_markersize!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['radius']=chartData.Chart_dataobj[dataid].PointData[point].data_markersize; }	
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['marker']={};	
                                                if (chartData.Chart_dataobj[dataid].PointData[point]['data_pointmarkers']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['marker']['enabled']=chartData.Chart_dataobj[dataid].PointData[point]['data_pointmarkers']; }	
                                                if (chartData.Chart_dataobj[dataid].PointData[point]['symbol']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['marker']['symbol']=chartData.Chart_dataobj[dataid].PointData[point]['symbol']; }	
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']={};
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['labels']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].enabled=eval(chartData.Chart_dataobj[dataid]['PointData'][point]['labels']); }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].color=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelColor']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderRadius=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderRadius']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].backgroundColor=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBackgroundColor']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderWidth=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderWidth']; }	
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].padding=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderPadding']; }	
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].borderColor=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelBorderColor']; }	
                                                thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']={ fontFamily: 'Arimo' };				
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelSize']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels']['style']['fontSize']=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelSize']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].rotation=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelRotation']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelX']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].x=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelX']; }
                                                if (chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelY']!==undefined) { thischart.series[chartData.Chart_dataobj[dataid]['series']].data[point]['dataLabels'].y=chartData.Chart_dataobj[dataid]['PointData'][point]['data_labelY']; }		
                                            }

                                        thischart.plotOptions.series={};		thischart.plotOptions.series.states={};		thischart.plotOptions.series.states.hover={};		
                                        thischart.plotOptions.series.states.hover.enabled=false;
                                        if (chartData['Chart_stack']=="none") { thischart.plotOptions.series.stacking=null;
                                        }else {		thischart.plotOptions.series.stacking=chartData['Chart_stack'];	}	
                                    }				
                                }
                            }        
                            window[chartData.Chart_Name]=new Highcharts.Chart( thischart );
                            window[chartData.Chart_Name].container.onclick = null;			
                            window[chartData.Chart_Name].credits.hide();	

                            for (var textID in chartData.Chart_textobj)	
                            {   var thisText=chartData.Chart_textobj[textID]['textFormattedText'];
                                var thisX=chartData.Chart_textobj[textID]['textXLoc'];
                                var thisY=chartData.Chart_textobj[textID]['textYLoc'];
                                var thisColor=chartData.Chart_textobj[textID]['textColor'];
                                var thisSize=chartData.Chart_textobj[textID]['textSize'];
                                var thisRot=chartData.Chart_textobj[textID]['textRotAng'];
                                window[chartData['Chart_Name']].renderer.text(thisText, thisX, thisY).css({color: '#'+thisColor, fontSize: thisSize }).attr({rotation:thisRot, zIndex:9999}).add();
                            }

                         
                        }else
                        {
                            console.log('The directive flag is '+plotObj.Plot.needsUpdateFlag);    
                        }
                    }, true);
                }]
        };
}); 

// Directive that binds changes in plot data to re-update the plot
cadwolfApp.directive("surfaceBind", function() {
    return {
        restrict: "A",
        controller: ["$scope", "$element", "$attrs",
                function($scope, $element, $attrs) {
                    $scope.$watch($attrs.surfaceBind, function(plotObj) {   console.log('Surface changed'); });
                }]
        };
}); 

// These two directives toggle the "active" class of an item on the plot data line and the tabs in the plot specifics view
cadwolfApp.directive('toggleActive', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() { element.parent().children('dataplot_subtab_active').removeClass('dataplot_subtab_active'); element.addClass('dataplot_subtab_active');  });           
        }
    };
});
cadwolfApp.directive('toggleActiveName', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function() { element.parent().parent().children().children().removeClass('plot_dataline_active'); element.addClass('plot_dataline_active');  });
        }
    };
});



cadwolfApp.directive("imageSpecBind", function($templateRequest, $compile) {
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


cadwolfApp.directive("videoSpecBind", function($templateRequest, $compile) {
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


cadwolfApp.directive("referenceObject", function($templateRequest, $compile) {
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

cadwolfApp.directive("forloopSpecBind", function($templateRequest, $compile) {
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

cadwolfApp.directive("whileloopSpecBind", function($templateRequest, $compile) {
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

cadwolfApp.directive("ifelseSpecBind", function($templateRequest, $compile) {
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
cadwolfApp.directive("forLoopObject", function($templateRequest, $compile) {
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
cadwolfApp.directive("ifElseObject", function($templateRequest, $compile) {
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
cadwolfApp.directive("whileLoopObject", function($templateRequest, $compile) {
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
cadwolfApp.directive("refNum2", function($compile) {
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
cadwolfApp.directive("refNum", function() {
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
                        if ((typeof($scope.obj)=='object')&&($scope.obj!=''))
                        {   mybest=$scope.obj;
                            if ($scope.obj.Values===undefined){ $scope.obj.Values={}; }
                            if ($scope.obj['Values']['References']===undefined){ $scope.obj['Values']['References']=[]; }
                            $element.children().remove();
                            $element.append(thisText);
                        }
                    }, true);
                }]
        };
}); 

cadwolfApp.directive("outsideClick", ['$document','$parse', function( $document, $parse ){
    return {
        link: function( $scope, $element, $attributes ){
            var scopeExpression = $attributes.outsideClick,
                onDocumentClick = function(event){
                    var isChild = $element.find(event.target).length > 0;
myElement=$element;
myEvent=event;
console.log('The isChild is '+isChild);
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

