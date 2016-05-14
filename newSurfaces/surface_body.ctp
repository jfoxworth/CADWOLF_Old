<body ng-controller="surfaceController">
    <div ng-init="surfaceDataShow=true"></div>
    <div ng-init="surfaceCameraShow=true"></div>
    <div ng-init="surfaceLegendShow=true"></div>
    <div id="main_wrapper">
        <div id="content_wrapper">
            <div id="main_column">
                <div id="main_contents" outside-click="cancel_animate()">
                            
                    <div id="cadwolfSurface" ng-click="animate();" ng-click="cancel_animate();"></div>
                    <div id="Legend_Wrapper">
                        <div id="cadwolfLegend" class="Legend"></div>
                        <div id="cadwolfLegendTicks" class="Legend"></div>
                    </div>

                    <div id="Option_Bar_Show" ng-click="showEdit=!showEdit"></div>

                    <div id="Option_Bar" ng-show="showEdit">

                        <div class="plot_datasetappearancesection" class="plot_subclass">
                            <div class="titles" ng-click="surfaceData=!surfaceData">Dataset Properties</div>
                            <div ng-show="surfaceDataShow" class="plot_optionblock">
                                <div class="plotOptionLine"><select class="plotWideSelect" ng-model="datasetID" ng-options="item.Format_id as item.dataname for item in cadwolf.Surface.Chart_dataobj" ng-change="setDataset()"></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='1'"><div class="plotOptionText">Color Map</div><select ng-model="currentDataset['colorMap']" ng-change="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)" class="plotOption"><option value="rainbow">Rainbow</option><option value="cooltowarm">Cool to Warm</option><option value="blackbody">Black Body</option><option value="grayscale">Grayscale</option></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='1'"><div class="plotOptionText">Num of Colors</div><select ng-model="currentDataset['numColors']" ng-change="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)" class="plotOption"><option value="8">8</option><option value="16">16</option><option value="32">32</option><option value="64">64</option><option value="128">128</option><option value="256">256</option><option value="512">512</option><option value="1024">1024</option></select></div>	
                                <div class="plotOptionLine"><div class="plotOptionText">Use Color Data</div><select ng-model="currentDataset['useColorData']" class="plotOption" ng-change="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)"><option value="0">Use Z Data</option><option value="1">Use Color Data</option></select></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Grid Lines</div><select ng-model="currentDataset['showLines']" class="plotOption" ng-change="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)"><option value='0'>Hide</option><option value='1'>Show</option></select></div>
                                <div class="plotOptionLine"><div class="plotOptionText">X Offset</div><input ng-model="currentDataset['xOffset']" type="text" class="plotOption" ng-enter="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Y Offset</div><input ng-model="currentDataset['yOffset']" type="text" class="plotOption" ng-enter="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Z Offset</div><input ng-model="currentDataset['zOffset']" type="text" class="plotOption" ng-enter="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)"></div>
                                <div class="plotOptionLine" ng-if="(currentDataset['type']=='Surface')||(currentDataset['type']=='PointCloud')||(currentDataset['type']=='Line')"><div class="plotOptionText">Map Shape</div><select ng-model="currentDataset['flat']" ng-change="cadwolf.Surface.reDrawItem(cadwolf, currentDataset['Format_id'], 1)" class="plotOption"><option value="1">Flat Map</option><option value="0">Shaped Map</option></select></div>
                            </div>                    
                            <div class="titles" ng-click="surfaceCamera=!surfaceCamera">Camera Properties</div>
                            <div ng-show="surfaceCameraShow" class="plot_optionblock" >
                                <div class="plotOptionLine"><div class="plotOptionText">View X Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Scene.position.x" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">View Y Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Scene.position.y" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">View Z Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Scene.position.z" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Camera X Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.position.x" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Camera Y Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.position.y" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Camera Z Pos</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.position.z" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Rotate X</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.rotation.x" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Rotate Y</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.rotation.y" ng-enter="handleCameraChange(cadwolf)"></div>
                                <div class="plotOptionLine"><div class="plotOptionText">Rotate Z</div><input type="text" class="plotOption" ng-model="cadwolf.Surface.Camera.rotation.z" ng-enter="handleCameraChange(cadwolf)"></div>
                            </div>
                            <div class="titles" ng-click="surfaceLegend=!surfaceLegend">Plot Legend</div>
                            <div ng-show="surfaceLegendShow" class="plot_optionblock" >
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='0'&&((currentDataset['type']=='Surface')||(currentDataset['type']=='PointCloud')||(currentDataset['type']=='Line'))"><div class="plotOptionText">Color Map</div><select ng-model="cadwolf.Surface.Props.Legend.colorMap" ng-change="cadwolf.Surface.reDrawItem(cadwolf, 'all', 1)" class="plotOption"><option value="rainbow">Rainbow</option><option value="cooltowarm">Cool to Warm</option><option value="blackbody">Black Body</option><option value="grayscale">Grayscale</option></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='0'&&((currentDataset['type']=='Surface')||(currentDataset['type']=='PointCloud')||(currentDataset['type']=='Line'))"><div class="plotOptionText">Num of Colors</div><select ng-model="cadwolf.Surface.Props.Legend.numberOfColors" ng-change="cadwolf.Surface.reDrawItem(cadwolf, 'all', 1)" class="plotOption"><option value="8">8</option><option value="16">16</option><option value="32">32</option><option value="64">64</option><option value="128">128</option><option value="256">256</option><option value="512">512</option><option value="1024">1024</option></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='0'"><div class="plotOptionText">Num of Ticks</div><select ng-model="cadwolf.Surface.Props.Legend.numTicks" ng-change="cadwolf.Surface.reDrawItem(cadwolf, 'all', 1)" class="plotOption"><option value="3">3</option><option value="5">5</option><option value="9">9</option><option value="11">11</option><option value="13">13</option><option value="15">15</option><option value="17">17</option></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='0'"><div class="plotOptionText">Show Legend</div><select ng-model="cadwolf.Surface.Props.Legend.onOff" ng-change="cadwolf.Surface.setLegend()" class="plotOption"><option value="0">Hide</option><option value="1">Show</option></select></div>	
                                <div class="plotOptionLine" ng-if="cadwolf.Surface.Props.divideColormap=='1'"><div class="plotOptionText">Show Legend</div><select ng-model="currentDataset.Legend.onOff" ng-change="cadwolf.Surface.setLegend()" class="plotOption"><option value="0">Hide</option><option value="1">Show</option></select></div>	
                                <div class="plotOptionLine"><div class="plotOptionText">Colormaps</div><select ng-model="cadwolf.Surface.Props.divideColormap" ng-change="cadwolf.Surface.reDrawItem(cadwolf, 'all', 1)" id="surface_mapsplit" class="plotOption"><option value="0">Single</option><option value="1">Split</option></select></div>
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
    <script src="http://www.cadwolf.com/js/surfaces/app.js"></script>
    <script src="http://www.cadwolf.com/js/surfaces/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/surfaces/directives.js"></script>
    <script src="http://www.cadwolf.com/js/jquery.js"></script>
    <script src="http://www.cadwolf.com/js/big.min.js"></script>
    <script src="http://www.cadwolf.com/js/Three.js"></script>
    <script src="http://www.cadwolf.com/js/Lut.js"></script>
    <script src="http://www.cadwolf.com/js/Detector.js"></script>
    <script src="http://www.cadwolf.com/js/TrackballControls.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.KeyboardState.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.WindowResize.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.FullScreen.js"></script>
	
    <script>angular.bootstrap(document, ['surfaceApp']);</script>

</body>