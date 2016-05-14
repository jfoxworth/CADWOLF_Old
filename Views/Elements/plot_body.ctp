<body ng-controller="chartController">
    <div ng-init="plotSpecsData=true"></div>
    <div ng-init="plotSpecsXAxis=false"></div>
    <div ng-init="plotSpecsYAxis=false"></div>
    <div ng-init="plotSpecsFormat=false"></div>
    <div ng-init="plotSpecsBands=false"></div>
    <div ng-init="plotSpecsLines=false"></div>
    <div ng-init="data_datatab=true"></div>
    <div ng-init="xAxisSetup=true"></div>
    <div ng-init="yAxisSetup=true"></div>
    <div ng-init="formatShowTitle=true"></div>
    <div id="main_wrapper">
        <div id="content_wrapper">
            <div id="main_column">
                <div id="main_contents">
                            
                    <div id="cadwolfChart"></div>

                    <div id="Option_Bar_Show" ng-click="showEdit=!showEdit"></div>

                    <div id="Option_Bar" ng-show="showEdit" ng-cloak>

                        <div class="plot_datasetappearancesection" class="plot_subclass">

                            <div class="titles" ng-click="plotSpecsData=!plotSpecsData">Plot Data</div>
                            <div ng-show="plotSpecsData" class="plot_optionblock" id="plot_datablock">

                               <div ng-if="cadwolf['Plot']['Chart_type']=='line' || cadwolf['Plot']['Chart_type']=='scatter' || cadwolf['Plot']['Chart_type']=='spline' " id="plot_datablock1" class="plot_plotdatablock">		<!-- Line plots, scatter charts, spline charts -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input class="plotOption" placeholder="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">X Data</div><div class="plotOptionText">{{currentDataset['xDataRaw']}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Data</div><div class="plotOptionText">{{currentDataset['yDataRaw']}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">X Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset['xaxis']" name="plot_axis1" id="plot_xaxis1"><option ng-repeat="option in $parent.cadwolf['Plot']['Chart_xaxesobj']" value="{{option.Axis_num}}">{{option.Axis_name}}</option></select></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset['yaxis']" name="plot_axis1" id="plot_yaxis1"><option ng-repeat="option in $parent.cadwolf['Plot']['Chart_yaxesobj']" value="{{option.Axis_num}}">{{option.Axis_name}}</option></select></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div ng-if="currentDataset.data_pointmarkers==true" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" checked="checked" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div ng-if="currentDataset.data_pointmarkers==false" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Line Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.color"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Fill Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.fillcolor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Symbol</div><select ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.symbol" class="plotOption"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Symbol Size</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_markersize"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Line Width</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.lineWidth"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-if="cadwolf['Plot']['Chart_type']=='pie' || cadwolf['Plot']['Chart_type']=='donut'" id="plot_datablock2" class="plot_plotdatablock">		<!--  Pie Charts and Donut Charts -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_appsettab=false; data_apppointtab=false;" class="plotThreeSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_appsettab=true; data_apppointtab=false;" class="plotThreeSelect">Series</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_appsettab=false; data_apppointtab=true;" class="plotThreeSelect">Point</div>
                                            </div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Labels</div><input type="text" class="plotOption" ng-model="currentDataset['Chart_Labeltext']" ng-enter="setPointData(0, 'name', inputArray(currentDataset['Chart_Labeltext'])); makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data</div><input type="text" class="plotOption" ng-model="currentDataset['ydata_name']" ng-enter="currentDataset['dataname']=currentDataset['ydata_name']; solvePlotData(currentPlot['itemid'], currentDataset['Format_id'], cadwolf['Plot'], 'all')"></div>
                                                <div class="plot_errorblock"></div>
                                            </div>
                                            <div ng-show="data_appsettab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Line Width</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_connectorWidth"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Mono Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPlot.Chart_monoColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Start Angle</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_startangle"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Stop Angle</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_stopangle"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Location (x,y)</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_location"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Inner Radius</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_innersize"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Size (%)</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_size"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset.data_labelFormat=='Normal'"><div class="plotOptionLabel">Label Format</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelFormat"><option value="Normal">Normal</option><option value="Percentage">Percentage</option><option value="Value">Value</option></select></div>
                                                <div class="plotOptionLine" ng-if="currentDataset.data_labelFormat=='Percentage'"><div class="plotOptionLabel">Label Format</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelFormat"><option value="Percentage">Percentage</option><option value="Value">Value</option><option value="Normal">Normal</option></select></div>
                                                <div class="plotOptionLine" ng-if="currentDataset.data_labelFormat=='Value'"><div class="plotOptionLabel">Label Format</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelFormat"><option value="Value">Value</option><option value="Normal">Normal</option><option value="Percentage">Percentage</option></select></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Size</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelSize"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Dist</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelDistance"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Border</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelBorderWidth"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelBorderColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">BG Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelBackgroundColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Rad</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelBorderRadius"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Pad</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelBorderPadding"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Rot</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelRotation"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label X</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelX"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Y</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelY"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Legend</div><input type="checkbox" class="plotOption" ng-click="makeChart(currentPlot['itemid'])" ng-model="currentDataset.showInLegend"></div>
                                            </div>

                                            <div ng-show="data_apppointtab" class="plot_pointappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Point Index</div><input type="text" class="plotOption" ng-enter="currentPoint=currentDataset['PointData'][currentPointIndex]" ng-model="currentPointIndex"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Slice Color</div><input type="text" class="plotOption" ng-model="currentPoint['color']"></div>
                                                <div class="plotOptionLine" ng-if="currentPoint['sliced']=='false'"><div class="plotOptionLabel">Sliced</div><select class="plotOption" ng-model="currentPoint['sliced']" ng-change="makeChart(currentPlot['itemid'])"><option value="false">False</option><option value="true">True</option></select></div>
                                                <div class="plotOptionLine" ng-if="currentPoint['sliced']=='true'"><div class="plotOptionLabel">Sliced</div><select class="plotOption" ng-model="currentPoint['sliced']" ng-change="makeChart(currentPlot['itemid'])"><option value="true">True</option><option value="false">False</option></select></div>
                                                <div class="plotOptionLine" ng-if="currentPoint['sliced']===undefined"><div class="plotOptionLabel">Sliced</div><select class="plotOption" ng-model="currentPoint['sliced']" ng-change="makeChart(currentPlot['itemid'])"><option value="false">False</option><option value="true">True</option></select></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-click="makeChart(currentPlot['itemid'])" ng-model="currentPoint['labels']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Size</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelSize']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelColor']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Border</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelBorderWidth']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelBorderColor']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">BG Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelBackgroundColor']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Rad</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelBorderRadius']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Border Pad</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelBorderPadding']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Rot</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelRotation']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label X</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelX']"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Y</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentPoint['data_labelY']"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>	

                                <div ng-if="cadwolf['Plot']['Chart_type']=='combo'" id="plot_datablock4" class="plot_plotdatablock">		<!--  Combo charts -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Type</div>
                                                    <select class="plotOption" ng-model="currentDataset['Format_type']" ng-change="makeChart(currentPlot['itemid'])">
                                                        <option value="line">Line Plot</option>
                                                        <option value="column">Column Chart</option>
                                                        <option value="pie">Pie Chart</option>
                                                        <option value="area">Area Chart</option>
                                                        <option value="scatter">Scatter Plot</option>
                                                        <option value="spline">Spline Plot</option>
                                                    </select>
                                                </div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input class="plotOption" value="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Labels</div><input type="text" class="plotOption" ng-model="currentDataset['Chart_Labeltext']" ng-enter="setPointData(0, 'name', inputArray(currentDataset['Chart_Labeltext'])); makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='column'"><div class="plotOptionLabel">Labels</div><input type="text" class="plotOption" ng-model="currentDataset.Chart_Labeltext" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine" ng-if="(currentDataset['Format_type']!='column')&&(currentDataset['Format_type']!='pie')"><div class="plotOptionLabel">X Data</div><input type="text" class="plotOption" ng-model="currentDataset['xdata_name']" ng-enter="solvePlotData(currentPlot['itemid'], currentDataset['Format_id'], cadwolf['Plot'], 'plot_xdatainput')"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Y Data</div><input type="text" class="plotOption" ng-model="currentDataset['ydata_name']" ng-enter="solvePlotData(currentPlot['itemid'], currentDataset['Format_id'], cadwolf['Plot'], 'all')"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']!='pie'"><div class="plotOptionLabel">Y Data</div><input type="text" class="plotOption" ng-model="currentDataset['ydata_name']" ng-enter="solvePlotData(currentPlot['itemid'], currentDataset['Format_id'], cadwolf['Plot'], 'plot_ydatainput')"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption" id="plot_yaxis1"><option>Y Axis 1</option></select></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-click="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div ng-if="(currentDataset.data_pointmarkers==true)&&((currentDataset['Format_type']!='pie')||(currentDataset['Format_type']!='column'))" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" checked="checked" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div ng-if="(currentDataset.data_pointmarkers==false)&&((currentDataset['Format_type']!='pie')||(currentDataset['Format_type']!='column'))" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div class="plotOptionLine" ng-if="(currentDataset['Format_type']=='line')||(currentDataset['Format_type']=='scatter')||(currentDataset['Format_type']=='spline')||(currentDataset['Format_type']=='area')"><div class="plotOptionLabel">Line Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.color"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Fill Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.fillcolor"></div>
                                                <div class="plotOptionLine" ng-if="(currentDataset['Format_type']=='line')||(currentDataset['Format_type']=='scatter')||(currentDataset['Format_type']=='spline')"><div class="plotOptionLabel">Data Symbol</div><select ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.symbol" class="plotOption"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>
                                                <div class="plotOptionLine" ng-if="(currentDataset['Format_type']=='line')||(currentDataset['Format_type']=='scatter')||(currentDataset['Format_type']=='spline')"><div class="plotOptionLabel">Symbol Size</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_markersize"></div>
                                                <div class="plotOptionLine" ng-if="(currentDataset['Format_type']=='line')||(currentDataset['Format_type']=='scatter')||(currentDataset['Format_type']=='spline')"><div class="plotOptionLabel">Line Width</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.lineWidth"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Start Angle</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_startangle"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Stop Angle</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_stopangle"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Location (x,y)</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_location"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Inner Radius</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_innersize"></div>
                                                <div class="plotOptionLine" ng-if="currentDataset['Format_type']=='pie'"><div class="plotOptionLabel">Size (%)</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.Chart_size"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-if="cadwolf['Plot']['Chart_type']=='heatmap'" id="plot_datablock5" class="plot_plotdatablock">		<!--  Heat Maps -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input class="plotOption" placeholder="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data</div><div class="plotOptionText">{{currentDataset.zdata_name}}</div></div>
                                                <div class="plot_errorblock"></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>	

                                <div ng-if="cadwolf['Plot']['Chart_type']=='column' || cadwolf['Plot']['Chart_type']=='bar'" id="plot_datablock6" class="plot_plotdatablock">	   <!--  Column charts, bar charts -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                      <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input type="text" class="plotOption" value="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Labels</div><input type="text" class="plotOption" ng-model="currentDataset.Chart_Labeltext" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Data</div><div class="plotOptionText">{{currentDataset.ydata_name}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption"><option>Y Axis 1</option></select></div>
                                                <div ng-if="cadwolf['Plot']['Chart_stack']=='none'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="cadwolf['Plot']['Chart_stack']"><option value="none">none</option><option value="normal">Normal</option><option value="percent">Percent</option></select></div>
                                                <div ng-if="cadwolf['Plot']['Chart_stack']=='normal'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="cadwolf['Plot']['Chart_stack']"><option value="normal">Normal</option><option value="percent">Percent</option><option value="none">None</option></select></div>
                                                <div ng-if="cadwolf['Plot']['Chart_stack']=='percent'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="cadwolf['Plot']['Chart_stack']"><option value="percent">Percent</option><option value="normal">Normal</option><option value="none">None</option></select></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input class="plotOption" type="checkbox" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input class="plotOption" type="text" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Column Color</div><input type="text" ng-model="currentDataset.color" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Mono Color</div><input type="text" ng-model="cadwolf.Plot.Chart_monoColor" class="plotOption" ng-enter="setMonoColor()"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-if="cadwolf['Plot']['Chart_type']=='area'" id="plot_datablock7" class="plot_plotdatablock">	   <!--  Area charts  -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input class="plotOption" placeholder="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">X Data</div><div class="plotOptionText">{{currentDataset.xdata_name}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Data</div><div class="plotOptionText">{{currentDataset.ydata_name}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption"><option>Y Axis 1</option></select></div>
                                                <div ng-if="currentPlot.data.Chart_stack=='none'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentPlot.Chart_stack"><option value="none">none</option><option value="normal">Normal</option><option value="percent">Percent</option></select></div>
                                                <div ng-if="currentPlot.data.Chart_stack=='normal'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentPlot.Chart_stack"><option value="normal">Normal</option><option value="percent">Percent</option><option value="none">None</option></select></div>
                                                <div ng-if="currentPlot.data.Chart_stack=='percent'" class="plotOptionLine"><div class="plotOptionLabel">Stack</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentPlot.Chart_stack"><option value="percent">Percent</option><option value="normal">Normal</option><option value="none">None</option></select></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-click="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div ng-if="currentDataset.data_pointmarkers==true" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" checked="checked" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div ng-if="currentDataset.data_pointmarkers==false" class="plotOptionLine"><div class="plotOptionLabel">Point Markers</div><input type="checkbox" class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_pointmarkers"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Line Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.color"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Fill Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.fillcolor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Symbol</div><select ng-change="makeChart(currentPlot['itemid'])" ng-model="currentDataset.symbol" class="plotOption"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Symbol Size</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_markersize"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Line Width</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.lineWidth"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div ng-if="cadwolf['Plot']['Chart_type']=='bubble'" id="plot_datablock8" class="plot_plotdatablock">	<!--  Bubble charts  -->
                                    <div class="plot_datasets">
                                      <select class="plotWideSelect" ng-model="$parent.datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Plot.Chart_dataobj" ng-change="setDataset()"></select>
                                        <div class="plot_dataseries">
                                            <div class="plot_subtabline">
                                                <div toggle-active='dataplot_subtab_active' ng-click="data_datatab=true; data_apptab=false;" class="plotTwoSelect">Data</div>
                                                <div toggle-active='' ng-click="data_datatab=false; data_apptab=true;" class="plotTwoSelect">Appearance</div>
                                            </div>
                                            <div class="plot_errorblock"></div>
                                            <div ng-show="data_datatab" class="plot_datasetdatasection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Name</div><input class="plotOption" placeholder="New Series" ng-model="currentDataset.dataname" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">X Data</div><div class="plotOptionText">{{currentDataset.xdata_name}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Y Data</div><div class="plotOptionText">{{currentDataset.ydata_name}}</div></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Z Data</div><div class="plotOptionText">{{currentDataset.zdata_name}}</div></div>
                                                <div class="plot_errorblock"></div>
                                            </div>
                                            <div ng-show="data_apptab" class="plot_datasetappearancesection" class="plot_subclass">
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Data Labels</div><input type="checkbox" class="plotOption" ng-click="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_datalabels"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Label Color</div><input ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor" type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.data_labelColor"></div>
                                                <div class="plotOptionLine"><div class="plotOptionLabel">Fill Color</div><input type="text" class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentDataset.fillcolor"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div class="titles" ng-click="plotSpecsXAxis=!plotSpecsXAxis">X Axes</div>
                            <div ng-show="plotSpecsXAxis" class="plot_optionblock" id="plot_xaxesblock">
                                <select class="plotWideSelect" ng-model="$parent.axisID" ng-options="item.Format_id as item.Format_id for item in cadwolf.Plot.Chart_xaxesobj" ng-change="setItem('XAxis')"></select>
                                <div id="plot_optionsright">
                                    <div  class="plot_datablock" id="plot_xaxesdata" >
                                        <div class="plot_subtabline">
                                            <div toggle-active='dataplot_subtab_active' ng-click="xAxisSetup=true; xAxisApp=false; xAxisMarks=false" id="plot_xaxissetuptab" class="plotThreeSelect">Setup</div>
                                            <div toggle-active='' ng-click="xAxisSetup=false; xAxisApp=true; xAxisMarks=false" id="plot_xaxisappearancetab" class="plotThreeSelect">Appearance</div>
                                            <div toggle-active='' ng-click="xAxisSetup=false; xAxisApp=false; xAxisMarks=true" id="plot_xaxistickmarkstab" class="plotThreeSelect">Ticks</div>
                                        </div>
                                        <div ng-show="xAxisSetup" id="plot_xaxissetupsection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Label</div><input class="plotOption" ng-model="currentXAxis['Axis_label']" ng-enter="makeChart(currentPlot['itemid'])" value="Values"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minimum</div><input class="plotOption" ng-model="currentXAxis['Axis_min']" ng-enter="makeChart(currentPlot['itemid'])" placeholder="Automatic"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Maximum</div><input class="plotOption" ng-model="currentXAxis['Axis_max']" ng-enter="makeChart(currentPlot['itemid'])" placeholder="Automatic"></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_type']=='linear'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-model="currentXAxis['Axis_type']" ng-change="makeChart(currentPlot['itemid'])"><option value="linear">Linear</option><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_type']=='datetime'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-model="currentXAxis['Axis_type']" ng-change="makeChart(currentPlot['itemid'])"><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option><option value="linear">Linear</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_type']=='logarithmic'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-model="currentXAxis['Axis_type']" ng-change="makeChart(currentPlot['itemid'])"><option value="logarithmic">Logarithmic</option><option value="linear">Linear</option><option value="datetime">Date-Time</option></select></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Reverse Axis</div><select class="plotOption" ng-model="currentXAxis['Axis_reversed']" ng-change="makeChart(currentPlot['itemid'])"><option value="false">False</option><option value="true">True</option></select></div>
                                        </div>
                                        <div ng-show="xAxisApp" id="plot_xaxisappearancesection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Line Width</div><input class="plotOption" ng-model="currentXAxis['Axis_lineWidth']" ng-enter="makeChart(currentPlot['itemid'])" value="0px"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Line Color</div><input class="plotOption" ng-model="currentXAxis['Axis_linecolor']" ng-enter="makeChart(currentPlot['itemid'])" type="text"></div>
                                        </div>
                                        <div ng-show="xAxisMarks" id="plot_xaxistickmarkssection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Major Tick Interval</div><input class="plotOption" ng-model="currentXAxis['Axis_tickinterval']" ng-enter="makeChart(currentPlot['itemid'])" placeholder="Automatic"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Grid Line Width</div><input class="plotOption" ng-model="currentXAxis['Axis_gridlinewidth']" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Grid Line Color</div><input class="plotOption" ng-model="currentXAxis['Axis_gridcolor']" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_gridlinesonoff']===true||currentXAxis['Axis_gridlinesonoff']=='true'"><div class="plotOptionLabel">Grid Lines</div><input class="plotOption" checked="checked" ng-model="currentXAxis['Axis_gridlinesonoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox"></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_gridlinesonoff']===false||currentXAxis['Axis_gridlinesonoff']=='false'"><div class="plotOptionLabel">Grid Lines</div><input class="plotOption" ng-model="currentXAxis['Axis_gridlinesonoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Color</div><input class="plotOption" ng-model="currentXAxis['Axis_minorgridcolor']" ng-enter="makeChart(currentPlot['itemid'])" type="text"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Interval</div><input class="plotOption" ng-model="currentXAxis['Axis_minortickinterval']" ng-enter="makeChart(currentPlot['itemid'])" placeholder="Automatic"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Width</div><input class="plotOption" ng-model="currentXAxis['Axis_minorgridlinewidth']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_minorgridlinesonoff']=='true'||currentXAxis['Axis_minorgridlinesonoff']===true"><div class="plotOptionLabel">Minor Line</div><input class="plotOption" ng-model="currentXAxis['Axis_minorgridlinesonoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_minorgridlinesonoff']=='false'||currentXAxis['Axis_minorgridlinesonoff']===false"><div class="plotOptionLabel">Minor Line</div><input class="plotOption" ng-model="currentXAxis['Axis_minorgridlinesonoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="currentXAxis['Axis_minorgridlinesonoff']=='true'||currentXAxis['Axis_minorgridlinesonoff']===true"><div class="plotOptionLabel">Minor Color</div><input class="plotOption" ng-model="currentXAxis['Axis_minorgridcolor']" ng-enter="makeChart(currentPlot['itemid'])" type="text"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="titles" ng-click="plotSpecsYAxis=!plotSpecsYAxis">Y Axes</div>
                            <div ng-show="plotSpecsYAxis" class="plot_optionblock" id="plot_yaxesblock">
                                <select class="plotWideSelect" ng-model="$parent.axisID" ng-options="item.Format_id as item.Format_id for item in cadwolf.Plot.Chart_yaxesobj" ng-change="setItem('YAxis')"></select>
                                <div id="plot_optionsright">
                                    <div  class="plot_axisblock" id="plot_yaxesdata" >
                                        <div class="plot_subtabline">
                                            <div toggle-active='dataplot_subtab_active' ng-click="yAxisSetup=true; yAxisApp=false; yAxisMarks=false" id="plot_yaxissetuptab" class="plotThreeSelect">Setup</div>
                                            <div toggle-active='' ng-click="yAxisSetup=false; yAxisApp=true; yAxisMarks=false" id="plot_yaxisappearancetab" class="plotThreeSelect">Appearance</div>
                                            <div toggle-active='' ng-click="yAxisSetup=false; yAxisApp=false; yAxisMarks=true" id="plot_yaxistickmarkstab" class="plotThreeSelect">Ticks</div>
                                        </div>
                                        <div ng-show="yAxisSetup" id="plot_yaxissetupsection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Label</div><input class="plotOption" ng-model="currentYAxis['Axis_label']" id="plot_yaxislabel" value="Values" ng-enter="makeChart(currentPlot['itemid'], 0)"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minimum</div><input class="plotOption" ng-model="currentYAxis['Axis_min']" id="plot_yaxismin" placeholder="Automatic" ng-enter="makeChart(currentPlot['itemid'], 0)"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Maximum</div><input class="plotOption" ng-model="currentYAxis['Axis_max']" id="plot_yaxismax" placeholder="Automatic" ng-enter="makeChart(currentPlot['itemid'], 0)"></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_type']=='linear'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_type']"><option value="linear">Linear</option><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_type']=='datetime'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_type']"><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option><option value="linear">Linear</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_type']=='logarithmic'"><div class="plotOptionLabel">Axis Type</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_type']"><option value="logarithmic">Logarithmic</option><option value="linear">Linear</option><option value="datetime">Date-Time</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_reversed']=='false'"><div class="plotOptionLabel">Reverse Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_reversed']"><option value="false">False</option><option value="true">True</option></select></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_reversed']=='true'"><div class="plotOptionLabel">Reverse Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_reversed']"><option value="true">True</option><option value="false">False</option></select></div>
                                        </div>
                                        <div ng-show="yAxisApp" id="plot_yaxisappearancesection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Opposite</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_opposite']"><option value="false">False</option><option value="true">True</option></select></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Offset</div><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_offset']" value="0px"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Line Width</div><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_lineWidth']" value="0px"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Axis Line Color</div><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_linecolor']" type="text"></div>
                                        </div>
                                        <div ng-show="yAxisMarks" id="plot_yaxistickmarkssection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Tick Interval</div><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_tickinterval']" placeholder="Automatic"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Grid Width</div><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_gridlinewidth']" value=""></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_gridlinesonoff']=='true'||currentYAxis['Axis_gridlinesonoff']===true"><div class="plotOptionLabel">Grid Line</div><input class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_gridlinesonoff']" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_gridlinesonoff']=='false'||currentYAxis['Axis_gridlinesonoff']===false"><div class="plotOptionLabel">Grid Line</div><input class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_gridlinesonoff']" type="checkbox"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Grid Color</div><input class="plotOption" ng-model="currentYAxis['Axis_gridcolor']" ng-enter="makeChart(currentPlot['itemid'])" type="text"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Interval</div><div class="plot_charttextbox"><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_minortickinterval']" placeholder="Automatic"></div></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Width</div><div class="plot_charttextbox"><input class="plotOption" ng-enter="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_minorgridlinewidth']" value=""></div></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_minorgridlinesonoff']=='true'||currentYAxis['Axis_minorgridlinesonoff']===true"><div class="plotOptionLabel">Minor Grid</div><input class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_minorgridlinesonoff']" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="currentYAxis['Axis_minorgridlinesonoff']=='false'||currentYAxis['Axis_minorgridlinesonoff']===false"><div class="plotOptionLabel">Minor Grid</div><input class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentYAxis['Axis_minorgridlinesonoff']" type="checkbox"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Minor Color</div><input class="plotOption" ng-model="currentYAxis['Axis_minorgridcolor']" ng-enter="makeChart(currentPlot['itemid'])" type="text" id="plot_yminortickpicker"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="titles" ng-click="plotSpecsFormat=!plotSpecsFormat">Plot Format</div>
                            <div ng-show="plotSpecsFormat" class="plot_optionblock" id="plot_formatblock">
                                <div id="plot_optionsright">
                                    <div  class="plot_datablock" id="plot_formatdata" >
                                        <div class="plot_subtabline">
                                            <div toggle-active='dataplot_subtab_active' ng-click="formatShowTitle=true; formatShowFormat=false; formatShowLegend=false" class="plotThreeSelect">Title</div>
                                            <div toggle-active='' ng-click="formatShowTitle=false; formatShowFormat=true; formatShowLegend=false" class="plotThreeSelect">Format</div>
                                            <div toggle-active='' ng-click="formatShowTitle=false; formatShowFormat=false; formatShowLegend=true" class="plotThreeSelect">Legend</div>
                                        </div>
                                        <div ng-show="formatShowTitle" id="plot_titleSection" class="plot_subclass">
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Title_onoff']===true"><div class="plotOptionLabel">Title On/Off</div><input class="plotOption" ng-model="cadwolf['Plot']['Title_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Title_onoff']===false"><div class="plotOptionLabel">Title On/Off</div><input class="plotOption" ng-model="cadwolf['Plot']['Title_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Title_onoff']===true"><div class="plotOptionLabel">Title Text</div><input class="plotOption" ng-model="cadwolf['Plot']['Title_text']" ng-enter="makeChart(currentPlot['itemid'])" placeholder="Chart Title"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Subtitle_onoff']===true"><div class="plotOptionLabel">Subtitle On/Off</div><input class="plotOption" ng-model="cadwolf['Plot']['Subtitle_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Subtitle_onoff']===false"><div class="plotOptionLabel">Subtitle On/Off</div><input class="plotOption" ng-model="cadwolf['Plot']['Subtitle_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Subtitle_onoff']===true"><div class="plotOptionLabel">Subtitle Text</div><input class="plotOption" ng-model="currentPlot['Subtitle_text']" ng-enter="makeChart(currentPlot['itemid'])" id="plot_subtitle" placeholder="Chart Subtitle"></div>
                                        </div>
                                        <div ng-show="formatShowFormat" id="plot_formatSection" class="plot_subclass">
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Width</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_width']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Height</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_height']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Margin Left</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_marginleft']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Margin Right</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_marginright']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Margin Top</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_margintop']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Margin Bottom</div><input class="plotOption" ng-model="cadwolf['Plot']['Chart_marginbottom']" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                        </div>
                                        <div ng-show="formatShowLegend" id="plot_legendSection" class="plot_subclass">
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Legend_onoff']===true"><div class="plotOptionLabel">Show/Hide</div><input class="plotOption" ng-model="cadwolf['Plot']['Legend_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox" checked="checked"></div>
                                            <div class="plotOptionLine" ng-if="cadwolf['Plot']['Legend_onoff']===false"><div class="plotOptionLabel">Show/Hide</div><input class="plotOption" ng-model="cadwolf['Plot']['Legend_onoff']" ng-change="makeChart(currentPlot['itemid'])" type="checkbox"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Layout</div>
                                                <select class="plotOption" ng-if="cadwolf['Plot']['Legend_layout']=='horizontal'" ng-model="cadwolf['Plot']['Legend_layout']" class="plotOption"><option value="horizontal">Horizontal</option><option value="vertical">Vertical</option></select>								
                                                <select class="plotOption" ng-if="cadwolf['Plot']['Legend_layout']=='vertical'" ng-model="cadwolf['Plot']['Legend_layout']" class="plotOption"><option value="vertical">Vertical</option><option value="horizontal">Horizontal</option></select>								
                                            </div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Alignment</div>
                                                <select ng-model="cadwolf['Plot']['Legend_align']" ng-change="makeChart(currentPlot['itemid'])" class="plotOption" ng-if="cadwolf['Plot']['Legend_align']=='left'"><option value="left">Left</option><option value="right">Right</option><option value="center">Center</option></select>
                                                <select ng-model="cadwolf['Plot']['Legend_align']" ng-change="makeChart(currentPlot['itemid'])" class="plotOption" ng-if="cadwolf['Plot']['Legend_align']=='right'"><option value="right">Right</option><option value="center">Center</option><option value="left">Left</option></select>
                                                <select ng-model="cadwolf['Plot']['Legend_align']" ng-change="makeChart(currentPlot['itemid'])" class="plotOption" ng-if="cadwolf['Plot']['Legend_align']=='center'"><option value="center">Center</option><option value="left">Left</option><option value="right">Right</option></select>
                                            </div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Vert Alignment</div>
                                                <select ng-model="cadwolf['Plot']['Legend_verticalalign']" ng-if="cadwolf['Plot']['Legend_verticalalign']=='top'" ng-change="makeChart(currentPlot['itemid'])" class="plotOption"><option value="top">Top</option><option value="middle">Center</option><option value="bottom">Bottom</option></select>			
                                                <select ng-model="cadwolf['Plot']['Legend_verticalalign']" ng-if="cadwolf['Plot']['Legend_verticalalign']=='middle'" ng-change="makeChart(currentPlot['itemid'])" class="plotOption"><option value="middle">Center</option><option value="bottom">Bottom</option><option value="top">Top</option></select>			
                                                <select ng-model="cadwolf['Plot']['Legend_verticalalign']" ng-if="cadwolf['Plot']['Legend_verticalalign']=='bottom'" ng-change="makeChart(currentPlot['itemid'])" class="plotOption"><option value="bottom">Bottom</option><option value="top">Top</option><option value="middle">Center</option></select>			
                                            </div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">X Offset</div><input ng-model="cadwolf['Plot']['Legend_xoffset']" ng-enter="makeChart(currentPlot['itemid'])" class="plotOption"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Y Offset</div><input ng-model="cadwolf['Plot']['Legend_yoffset']" ng-enter="makeChart(currentPlot['itemid'])" class="plotOption"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="titles" ng-click="plotSpecsText=!plotSpecsText">Plot Text</div>
                            <div ng-show="plotSpecsText" class="plot_optionblock" id="plot_textblock">
                                <select class="plotWideSelect" ng-model="$parent.textID" ng-options="item.Format_id as item.Format_id for item in cadwolf.Plot.Chart_textobj" ng-change="setItem('Text')"></select>
                                <div class="top_third" id="plot_plottextsection">
                                    <div class="plot_suboptions" id="plot_chartoptiontextsection" >
                                        <div id="plot_textoptions">	
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Text</div><input class="plotOption" ng-model="currentText.textRawText" ng-enter="formatPlotText(currentPlot['itemid'], currentText['Format_id']); makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">X Loc</div><input class="plotOption" ng-model="currentText.textXLoc" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Y Loc</div><input class="plotOption" ng-model="currentText.textYLoc" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Color</div><input class="plotOption" ng-model="currentText.textColor" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Angle</div><input class="plotOption" ng-model="currentText.textRotAng" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Size</div><input class="plotOption" ng-model="currentText.textSize" ng-enter="makeChart(currentPlot['itemid'])" value=""></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="titles" ng-click="plotSpecsBands=!plotSpecsBands">Plot Bands</div>
                            <div ng-show="plotSpecsBands" class="plot_optionblock" id="plot_bandblock">
                                <select class="plotWideSelect" ng-model="$parent.bandID" ng-options="item.Format_id as item.Format_id for item in cadwolf.Plot.Chart_bandsobj" ng-change="setItem('Band')"></select>
                                <div class="top_third" id="plot_plotbandsection">
                                    <div class="plot_suboptions" id="plot_chartoptionbandsection" >
                                        <div id="plot_bandoptions">	
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Start</div><input class="plotOption" value="" ng-model="currentBand.Band_start" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">End</div><input class="plotOption" value="" ng-model="currentBand.Band_end" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Color</div><input class="plotOption" ng-model="currentBand.color" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">X Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentBand.Axis_id" name="plot_axis1" id="plot_bandxaxis1"><option ng-repeat="option in cadwolf['Plot']['Chart_xaxesobj']" value="{{option.Format_id}}">{{option.Axis_name}}</option></select></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentBand.Axis_id" name="plot_axis2" id="plot_bandyaxis2"><option ng-repeat="option in cadwolf['Plot']['Chart_yaxesobj']" value="{{option.Format_id}}">{{option.Axis_name}}</option></select></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="titles" ng-click="plotSpecsLines=!plotSpecsLines">Plot Lines</div>
                            <div ng-show="plotSpecsLines" class="plot_optionblock" id="plot_lineblock">
                                <select class="plotWideSelect" ng-model="$parent.lineID" ng-options="item.Format_id as item.Format_id for item in cadwolf.Plot.Chart_linesobj" ng-change="setItem('Line')"></select>
                                <div class="top_third" id="plot_plotlinesection">
                                    <div class="plot_suboptions" id="plot_chartoptionlinesection" >
                                        <div id="plot_lineoptions">	
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Value</div><input class="plotOption" ng-model="currentLine.Line_value" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Width</div><input class="plotOption" ng-model="currentLine.Line_width" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Color</div><input class="plotOption" ng-model="currentLine.color" ng-enter="makeChart(currentPlot['itemid'])"></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">X Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentLine.Axis_id" name="plot_axis1" id="plot_bandxaxis1"><option ng-repeat="option in cadwolf['Plot']['Chart_xaxesobj']" value="{{option.Format_id}}">{{option.Axis_name}}</option></select></div>
                                            <div class="plotOptionLine"><div class="plotOptionLabel">Y Axis</div><select class="plotOption" ng-change="makeChart(currentPlot['itemid'])" ng-model="currentLine.Axis_id" name="plot_axis2" id="plot_bandyaxis2"><option ng-repeat="option in cadwolf['Plot']['Chart_yaxesobj']" value="{{option.Format_id}}">{{option.Axis_name}}</option></select></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>    
    
    <script src="http://www.cadwolf.com/js/angular/angular.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-sanitize.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/angular/ngDialog.min.js"></script>
    <script src="http://www.cadwolf.com/js/plots/app.js"></script>
    <script src="http://www.cadwolf.com/js/plots/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/plots/directives.js"></script>
    <script src="http://www.cadwolf.com/js/jquery.js"></script>
	<script src="http://www.cadwolf.com/js/HighCharts.js"></script>
    <script src="http://www.cadwolf.com/js/HighCharts2.js"></script>
    <script src="http://www.cadwolf.com/js/Spectrum.js"></script>
    <script src="http://www.cadwolf.com/js/Heatmap.js"></script>

    <script>angular.bootstrap(document, ['chartApp']);</script>

</body>