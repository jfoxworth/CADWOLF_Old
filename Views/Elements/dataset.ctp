<body ng-controller="mainController">
    <div id="GoodMessageWrapper"><div id="goodmessage"></div></div>
    <div id="BadMessageWrapper"><div id="badmessage"></div></div>

    <div id="container">																														
    <div id="leftColumnWrapper" ng-mouseenter="leftNav=true;" ng-mouseleave="leftNav=false;">																														
        <div id="leftColumnIconsWrapper">																												
            <div class="logoWrapper">																													
                <div id="logo">&nbsp</div>																												
            </div>																																		
            <div class="userWrapper">																												
                <div id="user">&nbsp</div>																											                    																								
                <?php
                if($loggedIn)
                {   echo('<div class="leftBlank">&nbsp</div>');
				    echo('<div class="leftBlank">&nbsp</div>');
				    echo('<div class="leftBlank">&nbsp</div>');
                }
                ?>
            </div>																																	
            <div class="leftColumnWrapper">																											
                <div id="leftColumnIcons">																												
                    <div ng-class="infoDisplay" ng-click="showMain(1)">&nbsp</div>																			
                    <div ng-class="dataDisplay" id="view_main" ng-click="showMain(3)">&nbsp</div>																					
                    <div ng-class="resultsDisplay" id="view_results" ng-click="showMain(4)">&nbsp</div>																					
                    <?php if ($Permissions['edit']==1)	{ echo('<div id="saveFile" ng-click="saveDataset()">&nbsp</div>');  } ?>																		
                </div>																																	
            </div>																																		
        </div>																																			
        <div id="leftColumnTextWrapper" ng-show="leftNav">																												
            <div class="logoWrapper">																													
                <div id="logoText">CADWOLF</div>																										
            </div>																																		
            <?php
            if ($loggedIn)			
            {	echo('<div class="userWrapper">');	
			 	$profileAddress='http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
				$workspaceAddress='http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
				echo('<div id="userText">'.$this->Session->read('Auth.User.username').'</div>');		
				echo('<div class="userLine"><a class="userItem" href="'.$workspaceAddress.'">Workspace</a></div>');		
				echo('<div class="userLine"><a class="userItem" href="'.$profileAddress.'">User Page</a></div>');	
				echo('<div class="userLine"><a class="userItem" href="http://www.cadwolf.com/users/logout">Log Out</a></div>');	
			     echo('</div>');	
            } else 		
			{	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users/">Login</a></div>');		}				
            ?>
            <div class="leftColumnWrapper">																											
                <div id="leftColumnText">																												
                    <div ng-class="infoClass" ng-click="showMain(1)">Information</div>																
                    <div ng-class="dataClass" ng-click="showMain(3)">Input</div>																			
                    <div ng-class="resultsClass" ng-click="showMain(4)">Results</div>																		
                    <?php if ($Permissions['edit']==1)	{ echo('<div id="saveFileText" ng-click="saveDataset()">Save Dataset</div>');	} ?>																	
                </div>																																	
            </div>																																		
        </div>																																			
    </div>																																		


    <div id="main_wrapper">
        <div id="content_wrapper">

            <div id="main_content" ng-controller="dataController" ng-cloak>

                <div id="messageLine">
                    <div class="successMessage" ng-cloak ng-show="saveMessage">Dataset Saved</div>
                    <div class="errorMessage" ng-cloak ng-show="saveError">There was an error saving this dataset. Make sure you have permission to edit it.</div>
                </div>

                <div id="info_wrapper" ng-show="displayInfo">
                    <div class="dataset_mainheader">Dataset Information</div>
                    <div class="info_line"><div class="info_block_left">Date Created</div><div class="info_block_right">{{Data.showDateCreated | date : 'EEEE, MMMM d, y - h:mm a'}}</div></div>
                    <div class="info_line"><div class="info_block_left">Date Last Modified</div><div class="info_block_right">{{Data.showDateModified | date : 'EEEE, MMMM d, y - h:mm a'}}</div></div>
                    <div class="info_line"><div class="info_block_left">Size of Data</div><div class="info_block_right" id="results_size">{{Data.size}}</div></div>
<!--                    <div class="info_line" id="dataset_description_holder"><div id="dataset_description" data-ng-bind-html="description"></div></div>	-->
                    <div class="info_line" id="dataset_description_holder"><div id="dataset_description" ng-model="description">{{description}}</div></div>
                </div>

                <div id="paste_wrapper" ng-show="displayPaste">
                    <div class="dataset_mainheader">Add Data</div>
                    <div class="datasets_text"><p>The area below provides the user with space to paste in text. You can also read in data from a text file, excel file, or web page. The data read from the file is then displayed in the input box. The user can also select which items are to be used to parse the text and press the button to parse it.</p></div>
                    <div class="settings_line">
                        <div class="settings_block"><div class="settings_text">Columns</div><div class="settings_select"><input type="text" ng-class="selectBox['1']" class="settings_parse" width="20px" ng-change="checkParsers()" ng-model="Parsers['0']"></div></div>
                        <div class="settings_block"><div class="settings_text">Rows</div><div class="settings_select"><input type="text" ng-class="selectBox['2']" class="settings_parse" width="20px" ng-change="checkParsers()" ng-model="Parsers['1']"></div></div>
                        <div class="settings_block"><div class="settings_text">Pages</div><div class="settings_select"><input type="text" ng-class="selectBox['3']" class="settings_parse" width="20px" ng-change="checkParsers()" ng-model="Parsers['2']"></div></div>
                        <div class="settings_block"><div class="settings_text">Dimension 4</div><div class="settings_select"><input type="text" ng-class="selectBox['4']" class="settings_parse" width="20px" ng-change="checkParsers()" ng-model="Parsers['3']"></div></div>
                        <div class="settings_block"><div class="settings_text">Dimension 5</div><div class="settings_select"><input type="text" ng-class="selectBox['5']" class="settings_parse" width="20px" ng-change="checkParsers()" ng-model="Parsers['4']"></div></div>
                    </div>

                    <div class="data_line">
                        <div class="data_leftSection">
                            <div ng-class="pasteClass" ng-click="showData(1)">Paste Text</div>																
                            <div ng-class="fileClass" ng-click="showData(2)">Text File</div>																		
                      <!--  <div ng-class="htmlClass" ng-click="showData(3)">HTML Page</div>		-->																	
                            <div ng-class="excelClass" ng-click="showData(4)">Excel File</div>																		
                        </div>
                        <div class="data_rightSection">
                            <div class="dataBlock" ng-show="dataPaste">Paste Text Below</div>																
                            <div class="dataBlock" ng-show="dataFile">Select a word, rtf, or text file<input type="file" id="dataset_file" class="textButton" custom-on-change="readFile" /></div>																
                            <div class="dataBlock" ng-show="dataHTML"><input type="text" id="dataset_html" ng-model="Data.HTMLString"></div>																
                            <div class="dataBlock" ng-show="dataExcel">Select an excel file<input type="file" id="dataset_excel" class="textButton" custom-on-change-excel="readExcel" /></div>																
                            <div class="data_actionitem" ng-show="dataOA"><input type="radio" id="textOverwrite" name="parseType" value="radio_overwrite" ng-model="dataAction" ><label for="textOverwrite"><span></span>Overwrite Dataset</label></div>
                            <div class="data_actionitem" ng-show="dataOA"><input type="radio" id="textAdd" name="parseType" value="radio_adddata" ng-model="dataAction"><label for="textAdd"><span></span>Add Text to Data</label></div>
                        </div>
                    </div>

                    <div class="dataSection" ng-show="!dataAvailable">
                        <div class="info_line"><div id="parse_dataset" ng-click="parseText()">Parse Data</div></div>
                        <textarea id="dataset_paste" ng-model="Data.string"></textarea>
                    </div>
                        
                    <div class="dataSection" ng-show="dataAvailable">
                        <div class="settings_line">
                            <div id="parseGo" ng-click="compileText()">Finished Selecting</div>
                            <div id="parseStop" ng-click="hideAvailable()">Cancel</div>
                        </div>
                        <div ng-repeat="obj in availableText track by obj.id" class="possibleTextBlock">
                            <div ng-class="obj.textClass" ng-click="handleText(obj.id)">{{obj.text}}</div>
                            <div class="parseOptionLine">
                                <radiogroup value="$obj.id">
                                    <div class="parseOption"><input type="radio" id="Parsers0{{$index}}" name="parseAdd{{$index}}" ng-model="obj.parser" ng-value="Parsers[0]"><label for="Parsers0{{$index}}"><span></span>{{Parsers[0]}}</label></div>
                                    <div class="parseOption"><input type="radio" id="Parsers1{{$index}}" name="parseAdd{{$index}}" ng-model="obj.parser" ng-value="Parsers[1]"><label for="Parsers1{{$index}}"><span></span>{{Parsers[1]}}</label></div>
                                    <div class="parseOption"><input type="radio" id="Parsers2{{$index}}" name="parseAdd{{$index}}" ng-model="obj.parser" ng-value="Parsers[2]"><label for="Parsers2{{$index}}"><span></span>{{Parsers[2]}}</label></div>
                                    <div class="parseOption"><input type="radio" id="Parsers3{{$index}}" name="parseAdd{{$index}}" ng-model="obj.parser" ng-value="Parsers[3]"><label for="Parsers3{{$index}}"><span></span>{{Parsers[3]}}</label></div>
                                    <div class="parseOption"><input type="radio" id="Parsers4{{$index}}" name="parseAdd{{$index}}" ng-model="obj.parser" ng-value="Parsers[4]"><label for="Parsers4{{$index}}"><span></span>{{Parsers[4]}}</label></div>
                                </radiogroup>
                            </div>
                        </div>
                    </div>
                
                </div>

                <div id="results_wrapper" ng-show="displayResults">
                    <div class="dataset_mainheader">Results of parsing data</div>
                    <div class="datasets_text"><p>This page shows the results of parsing the data that was pasted into the appropriate window using the rules set in the settings window. If the data has more than two dimensions, it is not shown.</p></div>
                    <div class="clickRow">
                        <div ng-show="checkBox1" class="clickItem">1st Dimension  <select ng-change="$parent.showText()" ng-model="$parent.select1"><option ng-repeat="option in dimension1" value="{{option}}">{{option}}</option></select></div>
                        <div ng-show="checkBox2" class="clickItem">2nd Dimension  <select ng-change="$parent.showText()" ng-model="$parent.select2"><option ng-repeat="option in dimension2" value="{{option}}">{{option}}</option></select></div>
                        <div ng-show="checkBox3" class="clickItem">3rd Dimension  <select ng-change="$parent.showText()" ng-model="$parent.select3"><option ng-repeat="option in dimension3" value="{{option}}">{{option}}</option></select></div>
                        <div ng-show="checkBox4" class="clickItem">4th Dimension  <select ng-change="$parent.showText()" ng-model="$parent.select4"><option ng-repeat="option in dimension4" value="{{option}}">{{option}}</option></select></div>
                        <div ng-show="checkBox5" class="clickItem">5th Dimension  <select ng-change="$parent.showText()" ng-model="$parent.select5"><option ng-repeat="option in dimension5" value="{{option}}">{{option}}</option></select></div>
                    </div>
                    <div id="displayHolder" ng-bind-html="formattedData"></div>
                </div>

            </div>
        </div>
    </div>
    </div>
    
<!--
    <script src="http://www.cadwolf.com/js/datasets/angular.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/sanitize.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/app.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/directives.js"></script>
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
    <script lang="javascript" src="http://www.cadwolf.com/js/dist/xlsx.core.min.js"></script>    
    <script src="http://www.cadwolf.com/js/angular/angular-animate.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-aria.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-messages.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-material.min.js"></script>
    <script>angular.bootstrap(document, ['datasetApp']);</script>
-->
    
    <script src="http://www.cadwolf.com/js/angular/angular.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-sanitize.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/app.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/datasets/directives.js"></script>
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
	<!--<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>-->
    <script lang="javascript" src="http://www.cadwolf.com/js/dist/xlsx.core.min.js"></script>    
    <script>angular.bootstrap(document, ['datasetApp']);</script>
    
</body>

