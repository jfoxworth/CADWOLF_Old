// CONTROLLERS
/*
This is the main controller file for the surface page in CADWOLF. It uses the same functions as the document app, but they are duplicated here.

This page lets the user view a 3D chart in a separate window. The right side provides a separate view 

*/
chartApp.controller('chartController', ['$scope', '$http', '$sce',
    function($scope, $http, $sce)
    {  
        // This function lets the user 
        angular.element(document).ready(function(){ $scope.getInitialData(); });
            
        $scope.getInitialData=function ()
        {   $http.post('http://www.cadwolf.com/Plots/getDataAngular', {myURL:window.location.pathname}, {}).
            then(function(response)
            {   myResponse=response; 
                $scope.initializeItems();
                $scope.initializeChart(JSON.parse(response['data'][0]['Document']['data']));
            } ) 
        };

         
        // Function to initialize properties for the page
        $scope.initializeItems = function()	
        {	$scope.showEdit=true;
        };


        // Function to initialize the chart
        $scope.initializeChart = function(chartData)	
        {	$scope.cadwolf={};
            $scope.cadwolf.Plot=new $scope.Plot('cadwolf', chartData);
            $scope.cadwolf.Plot['Chart_dataobj']=$.map($scope.cadwolf.Plot['Chart_dataobj'], function(value, index) { return [value]; })
            $scope.cadwolf.Plot['Chart_bandsobj']=$.map($scope.cadwolf.Plot['Chart_bandsobj'], function(value, index) { return [value]; })
            $scope.cadwolf.Plot['Chart_linesobj']=$.map($scope.cadwolf.Plot['Chart_linesobj'], function(value, index) { return [value]; })
            $scope.cadwolf.Plot['Chart_textobj']=$.map($scope.cadwolf.Plot['Chart_textobj'], function(value, index) { return [value]; })
            $scope.cadwolf.Plot['Chart_xaxesobj']=$.map($scope.cadwolf.Plot['Chart_xaxesobj'], function(value, index) { return [value]; })
            $scope.cadwolf.Plot['Chart_yaxesobj']=$.map($scope.cadwolf.Plot['Chart_yaxesobj'], function(value, index) { return [value]; })
            $scope.currentDataset=$scope.cadwolf.Plot['Chart_dataobj'][0];
            $scope.datasetID=$scope.cadwolf.Plot['Chart_dataobj'][0]['Format_id'];
            $scope.axisID='';
            $scope.textID='';
            $scope.bandID='';
            $scope.lineID='';
            $scope.currentXAxis=$scope.cadwolf.Plot['Chart_xaxesobj'][0];
            $scope.currentYAxis=$scope.cadwolf.Plot['Chart_yaxesobj'][0];
            $scope.makeChart();
            $scope.currentText='';
            $scope.currentBand='';
            $scope.currentLine='';
            myScope=$scope;
        };
        
        // Function to set a dataset as the current
        $scope.setDataset = function()	
        {	for (dataIndex=0; dataIndex<$scope.cadwolf.Plot.Chart_dataobj.length; dataIndex++)
            {   if ($scope.cadwolf.Plot['Chart_dataobj'][dataIndex]['Format_id']==$scope.datasetID){ $scope.currentDataset=$scope.cadwolf.Plot['Chart_dataobj'][dataIndex]; } } 
        };

        // Function to set an item as the current one
        $scope.setItem = function(type)	
        {	if (type=="XAxis") { for (thisIndex=0; thisIndex<$scope.cadwolf.Plot.Chart_xaxesobj.length; thisIndex++){   if ($scope.cadwolf.Plot['Chart_xaxesobj'][thisIndex]['Format_id']==$scope.axisID){ $scope.currentXAxis=$scope.cadwolf.Plot['Chart_xaxesobj'][thisIndex]; } } }
            if (type=="YAxis") { for (thisIndex=0; thisIndex<$scope.cadwolf.Plot.Chart_yaxesobj.length; thisIndex++){   if ($scope.cadwolf.Plot['Chart_yaxesobj'][thisIndex]['Format_id']==$scope.axisID){ $scope.currentYAxis=$scope.cadwolf.Plot['Chart_yaxesobj'][thisIndex]; } } }
            if (type=="Band") { for (thisIndex=0; thisIndex<$scope.cadwolf.Plot.Chart_bandsobj.length; thisIndex++){   if ($scope.cadwolf.Plot['Chart_bandsobj'][thisIndex]['Format_id']==$scope.bandID){ $scope.currentBand=$scope.cadwolf.Plot['Chart_bandsobj'][thisIndex]; } } }
            if (type=="Line") { for (thisIndex=0; thisIndex<$scope.cadwolf.Plot.Chart_linesobj.length; thisIndex++){   if ($scope.cadwolf.Plot['Chart_linesobj'][thisIndex]['Format_id']==$scope.lineID){ $scope.currentLine=$scope.cadwolf.Plot['Chart_linesobj'][thisIndex]; } } }
            if (type=="Text") { for (thisIndex=0; thisIndex<$scope.cadwolf.Plot.Chart_textobj.length; thisIndex++){   if ($scope.cadwolf.Plot['Chart_textobj'][thisIndex]['Format_id']==$scope.textID){ $scope.currentText=$scope.cadwolf.Plot['Chart_textobj'][thisIndex]; } } }
        
        };

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                                    PLOT TEMPLATES

            These items are functions that provice the prototypes for all of the plot item. These functions include:
            
            Plot                :   Prompts     :   A plot item is found in the data on load
                                                    A new plot item is created
                                    Inputs      :   id - the unique number for the plot
                                                    plotObj - the object containing all of the properties of the plot
                                    Description :   This is the prototype for the plot object. If the plotObj is populated, it sets all exisitng
                                                    properties to those in the object
                                                    
            PlotData            :   Prompts     :   A plot item is found in the data on load
                                                    A new data object is created
                                    Inputs      :   id - the unique number for the data
                                                    plotID - the id of the plot containing the data
                                                    dataObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot data object. If the dataObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotAxis            :   Prompts     :   A plot item is found in the data on load
                                                    A new axis object is created
                                    Inputs      :   id - the unique number for the axis
                                                    plotID - the id of the plot containing the axis
                                                    axisObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot axis object. If the axisObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotBand            :   Prompts     :   A plot item is found in the data on load
                                                    A new band object is created
                                    Inputs      :   id - the unique number for the band
                                                    plotID - the id of the plot containing the band
                                                    axisObj - the object containing all of the properties of the axis
                                                    input - ????
                                    Description :   This is the prototype for the plot band object. If the bandObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotLine            :   Prompts     :   A plot item is found in the data on load
                                                    A new line object is created
                                    Inputs      :   id - the unique number for the line
                                                    plotID - the id of the plot containing the line
                                                    lineObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot line object. If the lineObj is populated, it sets all exisitng
                                                    properties to those in the object

            PlotText            :   Prompts     :   A plot item is found in the data on load
                                                    A new text object is created
                                    Inputs      :   id - the unique number for the text
                                                    plotID - the id of the plot containing the text
                                                    textObj - the object containing all of the properties of the data
                                    Description :   This is the prototype for the plot text object. If the textObj is populated, it sets all exisitng
                                                    properties to those in the object
        ------------------------------------------------------------------------------------------------------------------------------------------*/
    
        
        $scope.Plot=function (id, plotObj) 															
        { 	this.Format_id=id;														
            this.Format_haschanged=1;												
            this.Page_parentid="none";												
            this.Page_topparentid="none";											

            this.Chart_type="bar";													
            this.Chart_dataobj=[];													
            this.Chart_yaxesobj=[];													
            this.Chart_xaxesobj=[];													
            this.Chart_width="825px";												
            this.Chart_height="500px";												
            this.Chart_marginright=10;												
            this.Chart_marginleft=75;												
            this.Chart_marginbottom=65;												
            this.Chart_margintop=60;												
            this.Chart_Name='Chart_'+id;											
            this.Chart_Labels=new Array();											
            this.Chart_stack="none";

            this.Title_onoff="1";													
            this.Title_text='Chart Title';											
            this.Title_xoffset=0;													
            this.Title_yoffset=20;													

            this.Subtitle_onoff="0";												
            this.Subtitle_text='Chart Subtitle';									
            this.Subtitle_xoffset=0;												
            this.Subtitle_yoffset=30;												

            this.Legend_onoff=true;													
            this.Legend_layout="horizontal";										
            this.Legend_floating=1;													
            this.Legend_xoffset=0;													
            this.Legend_yoffset=0;													
            this.Legend_width=0;													
            this.Legend_align="center";												
            this.Legend_verticalalign="bottom";										 
            this.Legend_rtl="false";												
            this.Legend_marginRight=0;												
            this.Legend_marginLeft=0;												
            this.Legend_marginBottom=0;												
            this.Legend_marginTop=0;												

            this.Chart_bandsobj={};													
            this.Chart_linesobj={};													
            this.Chart_textobj={};

            for (var item in plotObj){ this[item]=JSON.parse(JSON.stringify(plotObj[item])); }
        }																			

        $scope.PlotData=function (id, plotid, dataObj)												
        {	this.Format_id=id;														
            this.Format_plotid=plotid;												
            this.Format_type="line";												
            this.outlinecolor='';													
            this.xaxis=0;															
            this.series=0;															
            this.yaxis=0;															
            this.xdata_plottext='';													
            this.xdata_name='';														
            this.xdata_id='';														
            this.xdata_rawtable='';													
            this.ydata_plottext='';													
            this.ydata_name='';														
            this.ydata_id='';														
            this.ydata_rawtable='';													
            this.zdata_name='';														
            this.zdata_id='';														
            this.zdata_rawtable='';													
            this.dataname='New Dataset';														
            this.data_type=1;														
            this.pielabels=new Array();												
            this.piedata=new Array();												
            this.data_plottext='';													
            this.data_error=0;														
            this.data_datalabels=false;												
            this.data_labelSize=12;													
            this.data_labelColor='#000000';											
            this.data_labelBorderWidth=0;											
            this.data_labelBorderColor="";											
            this.data_labelBorderRadius=0;											
            this.data_labelBorderPadding=0;											
            this.data_labelBackgroundColor='';										
            this.data_labelRotation=0;												
            this.data_labelX=0;														
            this.data_labelY=0;														
            this.data_labelDistance=30;												
            this.data_labelFormat='Normal';											
            this.data_pointmarkers=true;											
            this.data_markersize='3';													
            this.showInLegend=true;													
            this.lineWidth='1';														
            this.Chart_Labeltext='';												
            this.Chart_startangle='0';												
            this.Chart_stopangle='360';												
            this.Chart_innersize='0';												
            this.Chart_size='100';													
            this.Chart_location='50%, 50%';											
            this.Chart_translations={};												
            this.Chart_connectorWidth=1;											
            this.Chart_monoColor='';												
            this.PointData={};		
            this.needsUpdateFlag=0;		
            for (var item in dataObj){ this[item]=JSON.parse(JSON.stringify(dataObj[item])); }
        }																			

        $scope.PlotAxis=function (id, plotid, axisObj)												
        {																			
            this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.Axis_name="";							
            this.Axis_num=0;							
            this.Axis_label="";							
            this.Axis_lineWidth=0;						
            this.Axis_linecolor="";						
            this.Axis_opposite="false";					
            this.Axis_type="linear";					
            this.Axis_offset=0;							
            this.Axis_min="null";						
            this.Axis_max="null";						
            this.Axis_tickinterval=0;					
            this.Axis_gridlinesonoff="true";			
            this.Axis_gridcolor="#C0C0C0";											
            this.Axis_minortickinterval=0;				
            this.Axis_minorgridlinesonoff="false";		
            this.Axis_minorgridcolor='#C0C0C0';			
            this.Axis_gridlinewidth=1;					
            this.Axis_minorgridlinewidth=0;				
            this.Axis_reversed="false";					
            for (var item in axisObj){ this[item]=JSON.parse(JSON.stringify(axisObj[item])); }
        }																			

        $scope.PlotBand=function (id, plotid, bandObj)										
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.Axis_id="";
            this.Band_start=0;														
            this.Band_end=1;														
            this.color="#FCFFC5";						
            for (var item in bandObj){ this[item]=JSON.parse(JSON.stringify(bandObj[item])); }
        }												

        $scope.PlotLine=function (id, plotid, lineObj)			
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.Axis_id="";	
            this.Line_value=1;														
            this.Line_width=1;							
            this.color="#FCFFC5";						
            for (var item in lineObj){ this[item]=JSON.parse(JSON.stringify(lineObj[item])); }
        }																			

        $scope.PlotText=function (id, plotid, textObj)		        								
        {	this.Format_id=id;							
            this.Format_plotid=plotid;					
            this.textRawText='';													
            this.textFormattedText='';												
            this.textXLoc=10;														
            this.textYLoc=10;														
            this.textRotAng=0;														
            this.textSize='14px';													
            this.textColor="000000";					
            this.textElement={};	
            for (var item in textObj){ this[item]=JSON.parse(JSON.stringify(textObj[item])); }
        }												

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                        CREATION AND DESTRUCTION OF PLOT ITEMS

            These items are functions that add and delete items in the plots. This includes adding and deleting text items, plot bands, plot lines,
            and plot datasets. These functions include:
            
            addDataset          :   Prompts     :   Called from the plot specs when a user adds a new dataset 
                                    Inputs      :   plotObj     -  the object holding the data for the plot
                                    Description :   This function takes in a plot object and adds a dataset to it. To do this, a new dataset is
                                                    created from the prototype and added in the plots data object.

            deleteDataset       :   Prompts     :   Called from the plot specs when a user deletes a new dataset 
                                    Inputs      :   plotObj     -  the object holding the data for the plot
                                    Description :   This function takes in a plot object and deletes the current dataset. .

            addPlotItem         :   Prompts     :   Called from the plot specs when a user adds a new text item, line, or band 
                                    Inputs      :   plotID      -  the id for the plot
                                                    itemType    -  the type of item to be added - string
                                    Description :   This function adds a new item to the plot. These items include text, lines, and bands

            deletePlotItem      :   Prompts     :   Called from the plot specs when a user deletes a text item, line, or band item
                                    Inputs      :   plotID      -  the id for the plot
                                                    itemID      -  the id of the item to be deleted
                                                    itemType    -  the type of item to be added - string
                                    Description :   This function adds a new item to the plot. These items include text, lines, and bands

        ------------------------------------------------------------------------------------------------------------------------------------------*/


        $scope.addDataset=function (plotObj)		        								
        {	var tempDataset=new $scope.PlotData($scope.getID('DataSeries', 'thisFile'), plotObj['Plot']['Format_id'], {Format_type:plotObj['Plot']['Chart_type']});
            tempDataset['series']=plotObj['Plot']['Chart_dataobj'].length;
            $scope.cadwolf.Plot['Plot']['Chart_dataobj'].push(tempDataset);
            $scope.makeChart();
            var thisIndex=parseInt(plotObj['Plot']['Chart_dataobj'].length);
            var colorArray=['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
            var thisColor=colorArray[thisIndex%10-1];
            $scope.cadwolf.Plot['Plot']['Chart_dataobj'][thisIndex-1]['color']=thisColor;
            $scope.cadwolf.Plot['Plot']['Chart_dataobj'][thisIndex-1]['symbol']="circle";
            $scope.cadwolf.Plot['Plot']['Chart_dataobj'][thisIndex-1]['fillcolor']=thisColor;
            myScope=$scope;  
        };

        $scope.deleteDataset=function (plotObj)		        								
        {	var seriesNum="NA";
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotObj['Plot']['Format_id']==item['itemid'])
                {   for (var a=0; a<$scope.cadwolf.Plot['Chart_dataobj'].length; a++)
                    {   if ($scope.cadwolf.Plot['Chart_dataobj'][a]['Format_id']==$scope.currentDataset['Format_id'])
                        {   seriesNum=$scope.cadwolf.Plot['Chart_dataobj']['series'];
                            $scope.cadwolf.Plot['Chart_dataobj'].splice(a, 1);
                        }
                    }
                    for (var a=0; a<$scope.cadwolf.Plot['Chart_dataobj'].length; a++)
                    {   if (($scope.cadwolf.Plot['Chart_dataobj'][a]['series']>=seriesNum)&&(seriesNum!="NA"))
                        {   $scope.cadwolf.Plot['Chart_dataobj'][a]['series']=$scope.cadwolf.Plot['Chart_dataobj'][a]['series']-1;  }   }
                }   
            });
            $scope.makeChart();
            myScope=$scope;  
        }
        
        $scope.addPlotItem=function (plotID, itemType)		        								
        {	var axisNum=0, axisID='';
            $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisID=item['Plot']['Chart_xaxesobj'][0]['Format_id'];  }    });
            if (itemType=="yaxis") { $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisNum=item['Plot']['Chart_yaxesobj'].length;  } }); }
            if (itemType=="xaxis") { $scope.cadwolf_worksheet.forEach(function(item, index){   if (plotID==item['itemid']){   axisNum=item['Plot']['Chart_xaxesobj'].length;  } }); }
            if (itemType=="text")
            {   thisTemplate=new $scope.PlotText($scope.getID('Plottext', 'thisFile'), plotID, { Format_plotid:plotID });    
                $scope.cadwolf.Plot['Plot']['Chart_textobj'].push(thisTemplate);      }
            if (itemType=="band")
            {   thisTemplate=new $scope.PlotBand($scope.getID('Band', 'thisFile'), plotID, { Format_plotid:plotID, Axis_id:axisID });    
                $scope.cadwolf.Plot['Plot']['Chart_bandsobj'].push(thisTemplate);    }
            if (itemType=="line")
            {   thisTemplate=new $scope.PlotLine($scope.getID('Line', 'thisFile'), plotID, { Format_plotid:plotID, Axis_id:axisID });   
                $scope.cadwolf.Plot['Plot']['Chart_linesobj'].push(thisTemplate);    }
            if (itemType=="yaxis")
            {   thisTemplate=new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), plotID, { Format_plotid:plotID, Axis_num:axisNum });   
                $scope.cadwolf.Plot['Plot']['Chart_yaxesobj'].push(thisTemplate);  
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) {   for (var a=0; a<item['Plot']['Chart_yaxesobj'].length; a++) {   item['Plot']['Chart_yaxesobj'][a]['Axis_name']="Axis "+a;  item['Plot']['Chart_yaxesobj'][a]['Axis_label']="Axis "+a;  } }  });
            }
            if (itemType=="xaxis")
            {   thisTemplate=new $scope.PlotAxis($scope.getID('Axis', 'thisFile'), plotID, { Format_plotid:plotID, Axis_num:axisNum });   
                $scope.cadwolf.Plot['Plot']['Chart_xaxesobj'].push(thisTemplate);  
                $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) {   for (var a=0; a<item['Plot']['Chart_xaxesobj'].length; a++) {   item['Plot']['Chart_xaxesobj'][a]['Axis_name']="Axis "+a;  item['Plot']['Chart_xaxesobj'][a]['Axis_label']="Axis "+a; }  }    });
            }
            myScope=$scope;  
            $scope.makeChart();
        }

        $scope.deletePlotItem=function (plotID, itemID, itemType)		        								
        {	var axisNum=0;
            if (itemType=="text"){ var thisObj="Chart_textobj"; }
            if (itemType=="line"){ var thisObj="Chart_linesobj"; }
            if (itemType=="band"){ var thisObj="Chart_bandsobj"; }
            if (itemType=="yaxis"){ var thisObj="Chart_yaxesobj"; }
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotID==item['itemid'])
                {   for (var thisData=0; thisData<$scope.cadwolf.Plot[thisObj].length; thisData++)
                    {   if ($scope.cadwolf.Plot[thisObj][thisData]['Format_id']==itemID)
                        {   $scope.cadwolf.Plot[thisObj].splice(thisData, 1);  axisNum=thisData; }
                    }
                }   
            });
            if (itemType=="yaxis")
            {   $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) 
                    {   for (var a=0; a<item['Plot']['Chart_dataobj'].length; a++) {   if (item['Plot']['Chart_dataobj'][a]['yaxis']>axisNum) { item['Plot']['Chart_dataobj'][a]['yaxis']=item['Plot']['Chart_dataobj'][a]['yaxis']-1; }  } 
                        for (var a=0; a<item['Plot']['Chart_yaxesobj'].length; a++) {   item['Plot']['Chart_yaxesobj'][a]['Axis_name']="Axis "+a;  }  }    });    
            }
            if (itemType=="xaxis")
            {   $scope.cadwolf_worksheet.forEach(function(item, index)
                {   if (plotID==item['itemid']) 
                    {   for (var a=0; a<item['Plot']['Chart_dataobj'].length; a++) {   if (item['Plot']['Chart_dataobj'][a]['xaxis']>axisNum) { item['Plot']['Chart_dataobj'][a]['xaxis']=item['Plot']['Chart_dataobj'][a]['xaxis']-1; }  } 
                        for (var a=0; a<item['Plot']['Chart_xaxesobj'].length; a++) {   item['Plot']['Chart_xaxesobj'][a]['Axis_name']="Axis "+a;  }  }    });    
            }
            $scope.makeChart();
            myScope=$scope;  
        };

        $scope.formatPlotText = function(plotID, textID, callback) 
        {	var formatted={}, thisLoc=0, thisName='', indexes=[]; 
            $scope.cadwolf_worksheet.forEach(function(item, index)
            {   if (plotID==item['itemid'])
                {   for (var a=0; a<item['Plot']['Chart_textobj'].length; a++)
                    {   if (item['Plot']['Chart_textobj'][a]['Format_id']==textID)
                        {   var thisText=item['Plot']['Chart_textobj'][a]['textRawText'];
                            var splitText=thisText.match(/#[\[\]0-9a-zA-Z_]+/g);
                            if (splitText===null)  
                            {   item['Plot']['Chart_textobj'][a]['textFormattedText']=thisText;
                            }else 
                            {   for (var b=0; b<splitText.length; b++)
                                {   indexes=splitText[b].match(/\[[0-9]+\]/g); 
                                    if (indexes===null)
                                    {   thisLoc=0; 
                                        thisName=splitText[b].replace(/^\#/,'');
                                        $scope.cadwolf_worksheet.forEach(function(eqItem, eqIndex) 
                                        {   if (parseInt(eqItem['vartype'])==3)  
                                            {   if ((eqItem['location']>thisLoc)&&(eqItem['location']<item['location'])&&(eqItem['Equation']['Format_name']==thisName))
                                                { formatted[splitText[b]]=eqItem['Equation']['Solution_real']['0-0'];   thisLoc=eqItem['location'];  } 
                                            }  
                                        }); 
                                    }else  
                                    {   thisKey='';  
                                        for (var c=0; c<indexes.length; c++) {   thisKey=thisKey+'-'+indexes[c].replace(/[\[\]]+/g,'');    } 
                                        thisKey=thisKey.replace(/^\-/,''); 
                                        console.log('The key is '+thisKey);
                                        thisLoc=0;  
                                        thisName=splitText[b].replace(/^\#/,'').replace(/\[[0-9]+\]/g,''); 
                                        $scope.cadwolf_worksheet.forEach(function(eqItem, eqIndex) 
                                        {   if (parseInt(eqItem['vartype'])==3) 
                                            {   if ((eqItem['location']>thisLoc)&&(eqItem['location']<item['location'])&&(eqItem['Equation']['Format_name']==thisName))
                                                { formatted[splitText[b]]=eqItem['Equation']['Solution_real'][thisKey];   thisLoc=eqItem['location'];  } 
                                            }
                                        }); 
                                    } 
                                }
                                for (var itemID in formatted)  
                                {   thisText=thisText.replace(itemID, formatted[itemID]); }
                                item['Plot']['Chart_textobj'][a]['textFormattedText']=thisText;
                            } 
                        }
                    }
                }
            });
            myScope=$scope;  
        };

        
        

        /*------------------------------------------------------------------------------------------------------------------------------------------
                                                            PLOT DATA AND CREATION ITEMS

            These items are functions that provice the prototypes for all of the plot item. These functions include:
            
            setPointData        :   Prompts     :   Called from the plot specs when a user enters a new point property 
                                    Inputs      :   pointIndex  -  the index of the point to be altered
                                                    prop        - the property to be set
                                                    propData    - the data that is to be placed in the point property
                                    Description :   This function takes in a property name and data and then sets the point data for a plot dataseries to
                                                    that particular data. The dataset changed is the "currentDataset" on the scope. The exception to this
                                                    is when the labels or data are being changed. In those cases, the algorithm takes in an array and sets
                                                    the point data to the value at each index

            makeChart           :   Prompts     :   A plot item is found in the data on load
                                                    A new chart is created
                                                    Any number of changes are made to the data or properties that require the chart to be remade
                                    Inputs      :   plotID      - the id of the plot containing the text
                                                    newType     - 1 of the chart should not look at existing data
                                    Description :   This function finds the object in the cadwolf_worksheet variable that is sent via the plotID input
                                                    and then creates a new chart based upon the properties in that object.
        ------------------------------------------------------------------------------------------------------------------------------------------*/
        $scope.toNum=function(num){	return parseFloat(parseFloat(num).toFixed(12));	}		
                    
        
        $scope.setPointData=function (pointIndex, prop, propData)   								
        {	if ((prop=="name")||(prop=="y"))
            {   for (var a=0; a<propData.length; a++){   $scope.currentDataset['PointData'][a][prop]=propData[a]; }
            }else{   $scope.currentDataset['PointData'][pointIndex][prop]=propData;   }  
            myScope=$scope;
        };

        // Create the mono color
        $scope.setMonoColor = function ()
        {   var flag=0;		var base='';
            if (($scope.cadwolf.Plot.Chart_monoColor=="Blue")||($scope.cadwolf.Plot.Chart_monoColor=="blue")) { base = "#7cb5ec"; }	
            if (($scope.cadwolf.Plot.Chart_monoColor=="Green")||($scope.cadwolf.Plot.Chart_monoColor=="green")) { base = "#AADDAA"; }
            if (($scope.cadwolf.Plot.Chart_monoColor=="Red")||($scope.cadwolf.Plot.Chart_monoColor=="red")) { base = "#FF0000"; }
            if (($scope.cadwolf.Plot.Chart_monoColor=="Yellow")||($scope.cadwolf.Plot.Chart_monoColor=="yellow")) { base = "#e4d354"; }	
            if ($scope.cadwolf.Plot.Chart_monoColor=="") { flag=1; }	
            if ($scope.currentDataset['Format_type']=="pie")
            {	if (flag===0){	for (var i in $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['PointData']){   $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['PointData'][i]['color']=Highcharts.Color(base).brighten((i - 3) / 7).get(); }
                }else	     {	for (var i in $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['PointData']){   $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['PointData'][i]['color']=Highcharts.getOptions().colors[i]; }	}
                currentDataset.Chart_monoColor=monoColor; 
            }else 
            {	
                if (flag==0)
                {	var i=0;
                    for (var dataIndex=0; dataIndex<$scope.cadwolf.Plot.Chart_dataobj.length; dataIndex++) 
                    {   $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['color']=Highcharts.Color(base).brighten((i - 3) / 7).get(); 
                        $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['fillFolor']=Highcharts.Color(base).brighten((i - 3) / 7).get();
                        i++;
                    }
                }else	
                {	var i=0;
                    for (var dataIndex=0; dataIndex<$scope.cadwolf.Plot.Chart_dataobj.length; dataIndex++) 
                    {   console.log('Setting color for index '+dataIndex+' to '+Highcharts.getOptions().colors[i]);
                        $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['color']=Highcharts.getOptions().colors[i];
                        $scope.cadwolf.Plot.Chart_dataobj[dataIndex]['fillColor']=Highcharts.getOptions().colors[i]; 
                        i++;
                    }
                }
            }
            $scope.makeChart();
        };	

        
        // Function that creates the chart from the data
        $scope.makeChart=function ()	
        {   var chartData=$scope.cadwolf.Plot;
            console.log('Making Chart');
            chartData['vartype']="9";
            var datafinal=new Array();
            thischart={}; thischart.chart={}; thischart.series=new Array();	thischart.title={};	thischart.subtitle={};	thischart.xAxis=new Array();
            thischart.yAxis=new Array();	thischart.legend={};	thischart.yAxis[0]={};	thischart.xAxis[0]={};		thischart.plotOptions={};	
            thischart.chart.renderTo='cadwolfChart';
            if (thischart.Chart_type!="combo") { thischart.chart.type=chartData.Chart_type;	}
            thischart.chart.margin='['+chartData.Chart_margintop+', '+chartData.Chart_marginright+', '+chartData.Chart_marginbottom+', '+chartData.Chart_marginleft+']';
            thischart.chart.backgroundColor='transparent';
            thischart.chart.height=window.innerHeight;				
            thischart.chart.width=window.innerWidth;
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
                if (chartData.colorAxis===undefined) { thischart.colorAxis={}; }			
                if (chartData.colorAxis.min!==undefined) { thischart.colorAxis.min=$scope.cadwolf.Plot.colorAxis.min; }else{ chartData.colorAxis.min=0; }	
                if (chartData.colorAxis.max!==undefined) { thischart.colorAxis.max=$scope.cadwolf.Plot.colorAxis.max; }	
                if (chartData.colorAxis.type===undefined) { thischart.colorAxis.type="linear"; chartData.colorAxis.type="linear"; }else { thischart.colorAxis.type=chartData.colorAxis.type; }
                if (chartData.colorAxis.stops!==undefined) 
                {	thischart.colorAxis.stops=new Array();
                    for (var a=0; a<$scope.cadwolf.Plot.colorAxis.stops.length; a++)	
                    {	thischart.colorAxis.stops[a]=new Array();
                        thischart.colorAxis.stops[a]['0']=$scope.cadwolf.Plot.colorAxis.stops[a]['0'];
                        thischart.colorAxis.stops[a]['1']=$scope.cadwolf.Plot.colorAxis.stops[a]['1']; }
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
                if ((chartData.Chart_type=="column")||(chartData.Chart_type=="bar")||(chartData.Chart_type=="heatmap")) { var temptext=chartData.Chart_Labeltext.split(',');		
                thischart.xAxis[axisnum].categories=temptext;	}
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
                    {	if (chartData.Chart_dataobj[dataid]['dataname']=='') {   chartData.Chart_dataobj[dataid]['dataname']=chartData.Chart_dataobj[dataid]['ydata_name'];    }
                        datafinal=new Array();
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
        

        };
                    
 
    
    
    }
]);


