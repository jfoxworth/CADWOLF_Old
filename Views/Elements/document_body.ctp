<!---
This is the main code that outputs the bulk of the data for the main worksheet page. It outputs the scaled units, parsed units, inputs to the file, and 
relationships between equations and between equations and plots. After the page is loaded, those items are then read into the window javascript memory
and used as variables.

The code then outputs every item for the main page randing from text to equations, tables, and loops. It also outputs the properties for each item within
the DOM. This info is read into memory on page load and deleted.
--->

<body ng-controller="mainController" ng-cloak>

<div id="messageLine" ng-cloak>
    <div id="GoodMessageWrapper" ng-show="displayGoodMessage"><div id="goodmessage">{{goodMessageText}}</div></div>
    <div id="BadMessageWrapper" ng-show="displayBadMessage"><div id="badmessage">{{badMessageText}}</div></div>
</div>

    <div id="Format_Wrapper" ng-show="formatDisplay"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>
    
    <!-- This is the left column with the options to show and hide the various views -->
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
                    <div ng-class="worksheetIcon"   ng-click="showMain(1)">&nbsp</div>																			
                    <div ng-class="tocIcon"         ng-click="showMain(2)">&nbsp</div>																					
                    <div ng-class="propIcon"        ng-click="showMain(3)">&nbsp</div>																					
                    <div ng-class="bibIcon"         ng-click="showMain(4)">&nbsp</div>																					
                    <div ng-class="inputsIcon"      ng-click="showMain(5)">&nbsp</div>																					
                    <div ng-class="datasetsIcon"    ng-click="showMain(6)">&nbsp</div>																					
                    <div ng-class="numbersIcon"     ng-click="showMain(7)">&nbsp</div>																					
                    <div ng-class="constantsIcon"   ng-click="showMain(8)">&nbsp</div>																					
                    <div ng-class="fafIcon"         ng-click="showMain(9)">&nbsp</div>																					
                    <div ng-class="functionsIcon"   ng-click="showMain(10)">&nbsp</div>																					
<!--                    <div ng-class="importedIcon"    ng-click="showMain(11)">&nbsp</div>	-->		
                    <div ng-class="bugIcon"         ng-click="showMain(12)">&nbsp</div>
                    <div ng-if="editPerm" ng-click="saveFile()" id="saveFile">&nbsp</div>
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
            {	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users">Login</a></div>');		}				

            ?>

            <div class="leftColumnWrapper">																											
                <div id="leftColumnText">
                    <div ng-class="worksheetText"   ng-click="showMain(1)">Worksheet</div>																
                    <div ng-class="tocText"         ng-click="showMain(2)">Table of Contents</div>																			
                    <div ng-class="propText"        ng-click="showMain(3)">File Properties</div>																			
                    <div ng-class="bibText"         ng-click="showMain(4)">Bibliography</div>																			
                    <div ng-class="inputsText"      ng-click="showMain(5)">Inputs</div>																			
                    <div ng-class="datasetsText"    ng-click="showMain(6)">Datasets</div>																			
                    <div ng-class="numbersText"     ng-click="showMain(7)">Unit Conversion</div>																			
                    <div ng-class="constantsText"   ng-click="showMain(8)">Constants</div>																			
                    <div ng-class="fafText"         ng-click="showMain(9)">File as a Function</div>																			
                    <div ng-class="functionsText"   ng-click="showMain(10)">Defined Functions</div>																			
<!--                    <div ng-class="importedText"    ng-click="showMain(11)">Imported Functions</div>        -->		
                    <div ng-class="bugText"         ng-click="showMain(12)">Report a Bug</div>		
                    <div ng-if="editPerm"           ng-click="saveFile()" id="saveFileText">Save File</div>
                </div>																																	
            </div>																																		
        </div>																																			
    </div>		


    <!-- This is the bar to the left of the page that lets the user enter items, move them, and edit their margins -->
    <div ng-if="editPerm" class="left_subcolumn" id="insertOptions">	
		<div class="left_subcolumnInner leftMask">	
			<div class="lc_block" id="Insert_Block">
				<div class="lc_description" id="add_block">Insert an Item</div>	
				<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>
				<div class="lc_description_bottom">&nbsp</div>	
				<div class="newblock_block">	
					<div class="insertLine" ng-click="addItem('Text', {})"><div class="insertImage" id="addtext">&nbsp</div><div id="addtextText" class="insertText">Text</div></div>
					<div class="insertLine" ng-click="addItem('Header', {})"><div class="insertImage" id="addheader">&nbsp</div><div id="addheaderText" class="insertText">Header</div></div>
					<div class="insertLine" ng-click="addItem('LineBreak', {})"><div class="insertImage" id="addline">&nbsp</div><div id="addlineText" class="insertText">Break Line</div></div>
					<div class="insertLine" ng-click="addItem('Equation', {})"><div class="insertImage" id="addequation">&nbsp</div><div id="addequationText" class="insertText">Equation</div></div>	
					<div class="insertLine" ng-click="addItem('Plot', {})"><div class="insertImage" id="addplot">&nbsp</div><div id="addplotText" class="insertText">Chart</div></div>	
					<div class="insertLine" ng-click="addItem('Table', {})"><div class="insertImage" id="addtable">&nbsp</div><div id="addtableText" class="insertText">Table</div></div>
					<div class="insertLine" ng-click="addItem('ForLoop', {})"><div class="insertImage" id="addforloop">&nbsp</div><div id="addforloopText" class="insertText">For Loop</div></div>
					<div class="insertLine" ng-click="addItem('WhileLoop', {})"><div class="insertImage" id="addwhileloop">&nbsp</div><div id="addwhileloopText" class="insertText">While Loop</div></div>
					<div class="insertLine" ng-click="addItem('IfElse', {})"><div class="insertImage" id="addifelse">&nbsp</div><div id="addifelseText" class="insertText">If / Else</div></div>
					<div class="insertLine" ng-click="addItem('Symbolic', {})"><div class="insertImage" id="addsymbolic">&nbsp</div><div id="addsymbolicText" class="insertText">Symbolic</div></div>
					<div class="insertLine" ng-click="addItem('Image', {})"><div class="insertImage" id="addimage">&nbsp</div><div id="addimageText" class="insertText">Image</div></div>	
					<div class="insertLine" ng-click="addItem('Video', {})"><div class="insertImage" id="addvideo">&nbsp</div><div id="addvideoText" class="insertText">Video</div></div>	
				</div>	
			</div>	

			<div class="lc_block" id="Move_Block">	
				<div class="lc_description" id="add_block">Move an Item</div>	
				<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>
				<div class="lc_description_bottom">&nbsp</div>	
				<div class="newblock_block">
					<div class="tool_movewrapper"><div id="move_loc" ><input id="thislocation" ng-enter="changeLocation('move')" value="{{currentItem.location}}"></div></div>	
					<div class="tool_movewrapper"><div class="tool_move" id="upone" ng-click="changeLocation('up')">&nbsp</div></div>
					<div class="tool_movewrapper"><div class="tool_move" id="downone" ng-click="changeLocation('down')">&nbsp</div></div>
				</div>	
			</div>

			<div class="lc_block" id="Format_Block">
				<div class="lc_description">Width / Margin</div>
				<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>	
				<div class="lc_description_bottom">&nbsp</div>	
				<div class="left_section formatborder" id="formatsection">	
					<div class="left_suboptions">	
					<div class="left_line"><div class="left_item">Width :</div><div class="right_item"><input id="width" class="left_format" ng-model="currentItem.mainwidth" ng-enter="updateFormats()"></div><div class="left_px">px</div></div>
					<div class="left_line"><div class="left_item">Top :</div><div class="right_item"><input id="topmargin" class="left_format" ng-model="currentItem.margintop" ng-enter="updateFormats()"></div><div class="left_px">px</div></div>
					<div class="left_line"><div class="left_item">Bottom :</div><div class="right_item"><input id="bottommargin" class="left_format" ng-model="currentItem.marginbottom" ng-enter="updateFormats()"></div><div class="left_px">px</div></div>
					<div class="left_line"><div class="left_item">Left :</div><div class="right_item"><input id="leftmargin" class="left_format" ng-model="currentItem.marginleft" ng-enter="updateFormats()"></div><div class="left_px">px</div></div>
					<div class="left_line"><div class="left_item">Right :</div><div class="right_item"><input id="rightmargin" class="left_format" ng-model="currentItem.marginright" ng-enter="updateFormats()"></div><div class="left_px">px</div></div>
					</div>	
				</div>
			</div>
		</div>
	</div>

    <!-- This is the main column of data  -->
    <div id="main_wrapper">
        <div id="content_wrapper">
            <div id="main_column">
                <div id="main_contents">

                    <!-- This is the worksheet  -->
                    <div class="mainSection" ng-show="worksheetShow" style="width: 845px;">              <!-- This width should be adaptable in the future -->

                        <div id="clicktotopenter" ng-click="setCurrent('top')">&nbsp</div>

                        <div class="titleblock">{{cadwolf_fileInfo.title}}</div>
                        <div class="subtitleblock">{{cadwolf_fileInfo.subtitle}}</div>

                        <!-- The main repeat to iterate over all of the document components -->
                        <div class="main_item" ng-repeat="obj in cadwolf_worksheet | orderBy:'location' track by obj.itemid" ng-switch on="obj.vartype" ng-click="$parent.setCurrent(obj)">
                            <div class="" style="width: {{obj.width}}px; margin-top:{{obj.margintop}}px; margin-bottom:{{obj.marginbottom}}px; margin-left:{{obj.marginleft}}px; margin-right:{{obj.marginright}}px;" >
                                <div ng-switch="obj.vartype">
                                    
                                    <div class="switchWrapper"  ng-switch-when="1" ng-click="$parent.$parent.formatDisplay=true; $parent.formatDisplay=true; formatDisplay=true;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div class="icon_wrapper" ng-if="editPerm" ng-show="showIcons">
                                            <div class="icon_holder">
                                                <div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div>
                                                <div ng-click="showSpecs(obj.itemid, 'text')" class="text_specs"></div>
                                            </div>
                                        </div>
                                        <div ng-click="setCKEditor(obj.itemid)"  id="{{obj.itemid}}" class="text_block" data-ng-bind-html="obj.data"></div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>
                                    
                                    <div class="switchWrapper" ng-switch-when="2" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper">
                                            <div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div>
                                                <div class="headerbutton" ng-click="obj.showOption=!obj.showOption">
                                                    <div ng-if="obj.showOption" class="hedit_box">
                                                        <div ng-click="obj.data.hClass='header1'; saveItem(obj.itemid);" class="hedit_line" htype="h1">Header 1</div>
                                                        <div ng-click="obj.data.hClass='header2'; saveItem(obj.itemid);" class="hedit_line" htype="h2">Header 2</div>
                                                        <div ng-click="obj.data.hClass='header3'; saveItem(obj.itemid);" class="hedit_line" htype="h3">Header 3</div>
                                                        <div ng-click="obj.data.hClass='header4'; saveItem(obj.itemid);" class="hedit_line" htype="h4">Header 4</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="{{obj.itemid}}" class="header_block">
                                            <div ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit" ng-class="obj.data.hClass" data-ng-bind-html="obj.data.text"></div>
                                            <input ng-class="obj.data.hClass" ng-show="obj.showEdit" ng-enter="saveItem(obj.itemid); obj.showEdit=!obj.showEdit;" value="obj.data.text" ng-model="obj.data.text" />
                                        </div>
                                    </div>
                                    
                                    <div class="switchWrapper" ng-switch-when="3" ng-if="((obj.Equation.inputType!='Dataset')&&(obj.Equation.inputType!='File'))&&obj.location>=showStartLoc&&obj.location<showEndLoc" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-dblclick="obj.showEdit=true">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper">
                                            <div class="icon_holder">
                                                <div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div>
                                                <div ng-click="showSpecs(obj.itemid, 'equation')" class="equationspecs"></div>
                                            </div>
                                        </div>
                                        <div class="equationblock">
                                            <div class="eqshow" id="{{obj.itemid}}" ng-show="!obj.showEdit">
                                                <span mathjax-bind="obj.Equation.Format_left"></span>=
                                                <span mathjax-bind="obj.Equation.Format_showequation"></span>=
                                                <span mathjax-bind="obj.Equation.Format_showsolution"></span>
                                            </div>
                                            <input class="standardInput" ng-show="obj.showEdit" ng-enter="obj.showEdit=false; obj.needsUpdateFlag=1; runEquationDigest()" ng-model="obj.Equation.newEquation" />
                                        </div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>
                                    
                                    <div class="switchWrapper" ng-switch-when="4" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div><div ng-click="showSpecs(obj.itemid, 'symbolic');" class="symeq_specs"></div></div></div>
                                        <div class="symequationblock">
                                            <div class="symeqshow" id="{{obj.itemid}}" ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit"><span mathjax-bind="obj.data.text"></span></div>
                                            <input class="standardInput" ng-show="obj.showEdit" ng-enter="obj.showEdit=!obj.showEdit" ng-model="obj.data.text" />
                                        </div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>
                                    <div class="switchWrapper" ng-switch-when="5" id="{{obj.itemid}}" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <span table-object="obj"></span>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-if="obj.parentid=='none'" ng-switch-when="6" id="{{obj.itemid}}" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <span for-loop-object></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-if="obj.parentid=='none'" ng-switch-when="7" id="{{obj.itemid}}" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <span while-loop-object="obj"></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-if="obj.parentid=='none'" ng-switch-when="8" id="{{obj.itemid}}" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <span if-else-object="obj"></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-switch-when="9" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div><div ng-click="showSpecs(obj.itemid, 'plot')" class="plot_specs"></div><a class="expandbutton" ng-href="http://www.cadwolf.com/Charts/{{obj.itemid}}" target="_blank"></a></div></div>
                                        <div class="plot_block"><div id="{{obj.itemid}}" class="plot_holder" ng-style="{height:obj.Chart_height, width:obj.Chart_width}"><span plot-bind="obj.Plot"></span></div></div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-switch-when="10" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div><div ng-click="showSpecs(obj.itemid, 'image')" class="imagespecs"></div></div></div>
                                        <div class="image"><img ng-src="/UserImages/{{obj.data.src}}.{{obj.data.thisType}}" width="obj.data.width" height="{{obj.data.height}}"/></div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>                                    
                                    <div class="switchWrapper" ng-switch-when="11" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div></div></div>
                                        <div class="linebreak_block"></div>
                                    </div>       
                                    <div class="switchWrapper" ng-switch-when="12" ng-click="$parent.$parent.formatDisplay=false;" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div><div ng-click="showSpecs(obj.itemid, 'video')" class="videospecs"></div></div></div>
                                        <div class="video_block" id="{{obj.data.Format_id}}">
                                            <div width="{{obj.data.videoWidth}}" height="{{obj.data.videoHeight}}">
                                                <img class="youtube-thumb" ng-src="//i.ytimg.com/vi/{{obj.data.videoID}}/hqdefault.jpg" width="{{obj.data.videoWidth}}" height="{{obj.data.videoHeight}}">
                                            </div>
                                        </div>
                                        <span ref-num="obj.Values.References"></span>
                                   </div>                                    
                                    <div class="switchWrapper" ng-switch-when="13" ng-click="$parent.$parent.formatDisplay=false;" outside-click="cancel_animate()" ng-mouseover="showIcons=true;" ng-mouseout="showIcons=false" ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
                                        <div ng-if="editPerm" ng-show="showIcons" class="icon_wrapper"><div class="icon_holder"><div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div><div ng-click="showSpecs(obj.itemid, 'surface')" class="plot_specs"></div><a class="expandbutton"  ng-href="http://www.cadwolf.com/Surfaces/{{obj.itemid}}" target="_blank"></a></div></div>
                                        <div class="surface_block">
                                            <div class="plot_holder" ng-dblclick="animate()" ng-style="{height:obj.Surface.Chart_height, width:obj.Surface.Chart_width}">
                                                <div id="{{obj.itemid}}" style="float:left; overflow:auto;}"></div>
                                                <div class="Legend_Wrapper" ng-show="obj.Surface.Props.Legend.onOff=='1'">
                                                    <div class="Legend" ng-show="obj.Surface.Props.Legend.onOff=='1'&&obj.Surface.Props.divideColormap=='0'" id="{{obj.itemid}}Legend"></div><div ng-show="obj.Surface.Props.Legend.onOff=='1'&&obj.Surface.Props.divideColormap=='0'" id="{{obj.itemid}}LegendTicks" class="LegendTicks"></div>
                                                    <div ng-repeat="subObj in obj.Surface.Chart_dataobj track by subObj.Format_id">
                                                        <div class="Legend"      ng-show="subObj.legendOnOff=='1'&&obj.Surface.Props.divideColormap=='1'" id="{{subObj.Format_id}}Legend"></div>
                                                        <div class="LegendTicks" ng-show="subObj.legendOnOff=='1'&&obj.Surface.Props.divideColormap=='1'" id="{{subObj.Format_id}}LegendTicks"></div>
                                                    </div>
                                                </div>
                                                <span surface-bind="obj.Surface"></span>
                                            </div>
                                        </div>
                                        <span ref-num="obj.Values.References"></span>
                                    </div>                                    
                                     
                                </div>
                            </div>
                        </div>                        
                        
                    </div>


                    <!-- The table of contents -->
                    <div class="mainSection" ng-show="tocShow">
                        <div class="titleblock">{{cadwolf_fileInfo.title}}</div>
                        <div class="subtitleblock">{{cadwolf_fileInfo.subtitle}}</div>
                        <div id="tocviewblock">
                            <div id="viewalldoc" ng-click="showStartLoc=0; showEndLoc=cadwolf_worksheet.length; tocShow=false; worksheetShow=true">View Entire Document</div>
                            <div id="viewtocsections" ng-click="showTocHead=true" ng-init="showTocHead=false">Headers to show</div>
                            <div id="tocsections" ng-show="showTocHead">
                                <div class="viewtocs" id="viewtocH1" ng-click="showTocHead=false; showTocLevel=1;">H1</div>
                                <div class="viewtocs" id="viewtocH2" ng-click="showTocHead=false; showTocLevel=2;">H2</div>
                                <div class="viewtocs" id="viewtocH3" ng-click="showTocHead=false; showTocLevel=3;">H3</div>
                                <div class="viewtocs" id="viewtocH4" ng-click="showTocHead=false; showTocLevel=4;">H4</div>
                                <div class="viewtocs" id="viewtocH5" ng-click="showTocHead=false; showTocLevel=5;">H5</div>
                            </div>
                        </div>
                        <div class="fileheader">Table of Contents</div>
                        <div id="TOC_holder">
                            <!-- Loop over the headers and display according to level. When clicked, worksheet shows only items within that header -->
                            <div ng-repeat="obj in cadwolf_worksheet | orderBy:obj.location track by obj.itemid" ng-switch on="obj.vartype">
                                <div class="switchWrapper" ng-switch-when="2" ng-if="obj.data.hClass=='header1'||(obj.data.hClass=='header2'&&showTocLevel>1)||(obj.data.hClass=='header3'&&showTocLevel>2)||(obj.data.hClass=='header4'&&showTocLevel>3)||(obj.data.hClass=='header5'&&showTocLevel>4)">
                                    <div ng-class="obj.data.hClass" data-ng-bind-html="obj.data.text" ng-click="getEndLoc(obj.location, obj.data.hClass); tocShow=false; worksheetShow=true"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                            
                            
                    
                    <!-- The file properties   -->
                    <div class="mainSection" ng-show="propShow">
                        <div class="fileheader">File Properties</div>
                        <div class="file_info">
                            <div ng-if="editPerm" class="file_infoline">
                                <div class="file_infoleft">Title</div>                             
                                <div ng-show="!editTitle" ng-click="editTitle=!editTitle" class="file_inforight">{{cadwolf_fileInfo.title}}</div>
                                <input class="file_inforight" ng-show="editTitle" ng-enter="editTitle=!editTitle; saveFileInfo()" ng-model="cadwolf_fileInfo.title" />
                            </div>
                            <div ng-if="!editPerm" class="file_infoline"><div class="file_infoleft">Title</div><div class="file_inforight">{{cadwolf_fileInfo.title}}</div></div>
                            <div ng-if="editPerm" class="file_infoline">
                                <div class="file_infoleft">Subtitle</div>                              
                                <div ng-show="!editSubTitle" ng-click="editSubTitle=!editSubTitle" class="file_inforight">{{cadwolf_fileInfo.subtitle}}</div>
                                <input class="file_inforight" ng-show="editSubTitle" ng-enter="editSubTitle=!editSubTitle; saveFileInfo()" ng-model="cadwolf_fileInfo.subtitle" placeholder="None Given" />
                            </div>
                            <div ng-if="!editPerm" class="file_infoline"><div class="file_infoleft">Subtitle</div><div class="file_inforight">{{cadwolf_fileInfo.subtitle}}</div></div>
                            <div class="file_infoline"><div class="file_infoleft">Creation Date</div><div class="file_inforight">{{cadwolf_fileInfo.cdate | date : 'EEE, MMM d, y - h:mm a'}}</div></div>
                            <div class="file_infoline"><div class="file_infoleft">Date Last Saved</div><div class="file_inforight">{{cadwolf_fileInfo.mdate | date : 'EEE, MMM d, y - h:mm a'}}</div></div>
                            <!-- This should have a button with id checkoutButton if not checked out and perm is OK -->
                            <div class="file_infoline"><div class="file_infoleft">Checkout Status</div><div class="file_inforight" id="checkoutLine">{{cadwolf_fileInfo.checkoutText}}</div></div> 
                            <div ng-if="editPerm" class="file_infoline">
                                <div class="file_infoleft">View Table of Contents as Default</div><div class="file_inforight" id="tocProp" ng-click="cadwolf_fileInfo['TOC']=!cadwolf_fileInfo['TOC']">{{cadwolf_fileInfo['TOC']}}</div>
                            </div>
                            <div class="file_infoline"><div class="file_infoleft">View Permission</div><div class="file_inforight">{{cadwolf_fileInfo.viewText}}</div></div>
                            <div class="file_infoline"><div class="file_infoleft">Use Permission</div><div class="file_inforight">{{cadwolf_fileInfo.useText}}</div></div>
                            <div class="file_infoline"><div class="file_infoleft">Edit Permission</div><div class="file_inforight">{{cadwolf_fileInfo.editText}}</div></div>
                            <div ng-if="editPerm" class="file_infoline">
                                <div class="file_infoleft">File Description</div>
                                <div ng-show="!editDescription" id="file_description" class="file_inforight" ng-click="editDescription=!editDescription">{{cadwolf_fileInfo.description}}</div>
                                <textarea rows="25" cols="50" ng-show="editDescription" ng-enter="editDescription=!editDescription; saveFileInfo()" ng-model="cadwolf_fileInfo.description" >{{cadwolf_fileInfo.description}}</textarea>
                            </div>
                            <div ng-if="!editPerm" class="file_infoline"><div class="file_infoleft">File Description</div><div class="file_inforight">{{cadwolf_fileInfo.description}}</div></div>
                        </div>
                    </div>
                    
                    <!-- The bibliography  -->
                    <div class="mainSection" ng-show="bibShow" ng-cloak>
                        <div class="fileheader">Bibliography</div>
                        <div class="file_description">This view lets the user add, delete, and edit references for the document. These references can then be assigned to individual items in the worksheet view. You must have edit permissions to set a reference.</div>
                        <div id="addReference" ng-click="addReference()">Add a Reference</div>
                        <!-- Loop over the references and display the appropriate information -->
                        <div ng-repeat="obj in cadwolf_references | orderBy:obj.refNum track by obj.refID">
                            <div ng-if="obj['type']=='web'" class="bib_line"><div class="bib_num">{{obj['refNum']+1}}</div>{{obj['author']}}. <a href="{{address}}">{{obj['webtitle']}}</a>.<u>{{obj['pagetitle']}}</u> - {{obj['sitetitle']}}. Date accessed : {{obj['dateaccessed']}}</div>
                            <div ng-if="obj['type']=='book'" class="bib_line"><div class="bib_num">{{obj['refNum']+1}}</div>{{obj['author']}}. <u>{{obj['booktitle']}}</u>. {{obj['publisher']}}. {{obj['datepublished']}}. Edition - {{obj['edition']}}. Page - {{obj['page']}}.</div>
                            <div ng-if="obj['type']=='mag'" class="bib_line"><div class="bib_num">{{obj['refNum']+1}}</div>{{obj['author']}}. {{obj['pagetitle']}}. {{obj['magpapername']}}. {{obj['datepublished']}}. Page - {{obj['page']}}.</div>
                            <div ng-if="obj['type']=='enc'" class="bib_line"><div class="bib_num">{{obj['refNum']+1}}</div>{{obj['author']}}. {{obj['entryname']}}. {{obj['encname']}}. Edition - {{obj['edition']}} {{obj['year']}}. Page - {{obj['page']}}.</div>
                            <div ng-if="editPerm">
                                <div ng-show="obj.showEdits">
                                    <div class="ref_typeline">
                                        <div class="ref_type"><input type="radio" ng-model="obj['type']" value="web">Website</div>
                                        <div class="ref_type"><input type="radio" ng-model="obj['type']" value="book">Book</div>
                                        <div class="ref_type"><input type="radio" ng-model="obj['type']" value="mag">Journal, Magazine</div>
                                        <div class="ref_type"><input type="radio" ng-model="obj['type']" value="enc">Encyclopedia</div>
                                    </div>
                                    <div ng-if="obj.type=='web'" class="ref_line"><div class="ref_text">Author</div><input class="ref_input" ng-model="obj['author']"></div>
                                    <div ng-if="obj.type=='web'" class="ref_line"><div class="ref_text">Address</div><input class="ref_input" ng-model="obj['address']"></div>
                                    <div ng-if="obj.type=='web'" class="ref_line"><div class="ref_text">Page Title</div><input class="ref_input" ng-model="obj['pagetitle']"></div>
                                    <div ng-if="obj.type=='web'" class="ref_line"><div class="ref_text">Website Title</div><input class="ref_input" ng-model="obj['sitetitle']"></div>
                                    <div ng-if="obj.type=='web'" class="ref_line"><div class="ref_text">Date Accessed</div><input class="ref_input" ng-model="obj['dateaccessed']"></div>
                                    <div ng-if="obj.type=='book'" class="ref_line"><div class="ref_text">Book Title</div><input class="ref_input" ng-model="obj['booktitle']"></div>
                                    <div ng-if="obj.type=='book'" class="ref_line"><div class="ref_text">Publisher</div><input class="ref_input" ng-model="obj['publisher']"></div>
                                    <div ng-if="obj.type=='book'" class="ref_line"><div class="ref_text">Date Published</div><input class="ref_input" ng-model="obj['datepublished']"></div>
                                    <div ng-if="obj.type=='mag'" class="ref_line"><div class="ref_text">Title</div><input class="ref_input" ng-model="obj['articletitle']"></div>
                                    <div ng-if="obj.type=='mag'" class="ref_line"><div class="ref_text">Mag or Paper Name</div><input class="ref_input" ng-model="obj['magpapername']"></div>
                                    <div ng-if="obj.type=='mag'" class="ref_line"><div class="ref_text">Date Published</div><input class="ref_input" ng-model="obj['datepublished']"></div>
                                    <div ng-if="obj.type=='mag'" class="ref_line"><div class="ref_text">Page</div><input class="ref_input" ng-model="obj['page']"></div>
                                    <div ng-if="obj.type=='enc'" class="ref_line"><div class="ref_text">Entry Name</div><input class="ref_input" ng-model="obj['entryname']"></div>
                                    <div ng-if="obj.type=='enc'" class="ref_line"><div class="ref_text">Encyclopedia Name</div><input class="ref_input" ng-model="obj['encname']"></div>
                                    <div ng-if="obj.type=='enc'" class="ref_line"><div class="ref_text">Edition</div><input class="ref_input" ng-model="obj['edition']"></div>
                                    <div ng-if="obj.type=='enc'" class="ref_line"><div class="ref_text">Year</div><input class="ref_input" ng-model="obj['year']"></div>
                                </div>
                                <div class="refEditLine" ng-click="obj.showEdits=!obj.showEdits">Show / Hide Edit</div>
                            </div>
                        </div>
                    </div>
                        
                    
                    <!-- The inputs -->
                    <div class="mainSection" ng-show="inputsShow" ng-cloak>
                        <div class="fileheader">Inputs from Worksheets</div>
                        <div class="Input_Desc">Inputs can be taken from data sets that have been uploaded to a directory, or from other worksheets. To accomplish this, select one of the items below 
                        and follow the instructions. Note that to prevent erroneous calculations, the current worksheet cannot have an equation with the same name as an imported equation.</div>
                        <div ng-if="editPerm" id="Inputs_files">
                            <div class="Inputs_largedesc">Enter the directory to start navigating for files</div>
                            <div id="Inputs_location"><input id="Inputs_currentlocation" ng-model="$parent.inputLocation" ng-enter="getFileFolderData()" /></div>
                            <div class="Inputs_smalldesc">Select the file to take inputs from</div>
                            <div class="Inputs_smalldesc">Check the equations to use as inputs</div>
                            <div id="Inputs_folderwindow">
                                <div ng-repeat="obj in $parent.inputData" ng-switch on="obj.Workspace.File_or_Folder">
                                    <div ng-switch-when="0" class="folderline"><div class="filefoldername" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">{{obj.Workspace.name}}</div></div>
                                    <div ng-switch-when="1" class="fileline"><div class="filefoldername" ng-dblclick="$parent.$parent.$parent.inputLocation=$parent.$parent.$parent.inputLocation+'/'+obj.Workspace.name; $parent.$parent.$parent.getFileFolderData();">{{obj.Workspace.name}}</div></div>
                                </div>
                            </div>
                            
                            <div id="Inputs_equationwindow">
                                <div ng-repeat="obj in $parent.inputEquations">
                                    <div class="equationline">
                                        <div class="equationlinecheckbox">
                                            <input type="checkbox" ng-if="obj['currentInput']===true" class="inputcheckbox" checked="checked" ng-click="obj['currentInput']=false; $parent.deleteByID(obj.itemid)">
                                            <input type="checkbox" ng-if="obj['currentInput']===false" class="inputcheckbox" ng-click="obj['currentInput']=true; $parent.addItem('Equation', {Page_position:0, location:0, inputType:'File', inputID:obj.itemid, Format_name:obj.name, inputURL:$parent.inputLocation, Solution_real:obj.Solution_real, Solution_imag:obj.Solution_imag, Format_size:obj.size, Units_units:obj.Units_units, Units_quantity:obj.Units_quantity})">
                                        </div>
                                        <div class="equationlinename">{{obj.name}}</div>
                                        <div class="equationlinevalue">{{obj.showValue}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Inputs_currentinputs">
                            <div class="fileheader">Current Inputs</div>
                            <table id="inputstable" class="inputs">			
                                <tr><th width="175px">Original Name</th><th width="125px">Value</th><th width="75px">Units</th><th width="75px">Source</th><th width="350px">Source Name</th><th width="25px"></th></tr>	
                                <tr ng-repeat="obj in cadwolf_worksheet">
                                    <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Format_name}}</td>
                                    <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Format_size}}</td>
                                    <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.Units_units}}</td>
                                    <td ng-if="obj.Equation.inputType=='File'">File</td>
                                    <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.inputName}}</td>
                                    <td ng-if="obj.Equation.inputType=='File'">{{obj.Equation.inputURL}}</td>
                                    <td ng-if="obj.Equation.inputType=='File'"><div class="delete_input" ng-click="$parent.deleteItem(obj)">&nbsp</div></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!-- The datasets  -->
                    <div class="mainSection" ng-show="datasetsShow" ng-cloak>
                        <div class="fileheader">Datasets for this file</div>
                        <div class="file_description" id="functiontext">CADWOLF lets users create datasets in workspaces and then pull those datasets into documents as variables. To add a dataset as a variable, click the button below and then enter the URL of the dataset where appropriate.</div>	
                        <div ng-if="editPerm" id="AddDataset" ng-click="addItem('Equation', {Page_position:0, location:0, inputType:'Dataset', Format_name:'datasetInput'})">Add a new dataset</div>
                        <div id="dataset_fail"></div>
                        <div id="dataset_success"></div>
                        <div id="DatasetList">
                            <div ng-repeat="obj in cadwolf_worksheet">
                                <div class="dataset_line" ng-if="(obj['Equation']['inputType']=='Dataset')&&(obj['Equation']['inputShow']===true)" ng-init="obj['Equation']['inputShow']=true">
                                    <div class="datasetname_holder"><input type="text" class="dataset_name" ng-model="obj['Equation']['Format_name']" ng-enter="obj['Equation']['inputShow']=false"></div>
                                    <div class="datasetname_holder"><div class="dataset_size">{{obj['Equation']['Format_size']}}</div></div>
                                    <div class="dataseturl_holder"><input type="text" class="dataset_url" ng-model="obj['Equation']['datasetURL']" ng-enter="getDataset(obj['Equation']['datasetURL'], obj['itemid']); obj['Equation']['inputShow']=false"></div>
                                    <div class="dataset_delete" ng-click="$parent.deleteItem(obj)"></div>
                                </div>
                                <div class="dataset_line" ng-if="(obj['Equation']['inputType']=='Dataset')&&(obj['Equation']['inputShow']===false)" ng-click="obj['Equation']['inputShow']=true">
                                    <div class="datasetname_holder"><div class="dataset_name">{{obj['Equation']['Format_name']}}</div></div>
                                    <div class="datasetname_holder"><div class="dataset_size">{{obj['Equation']['Format_size']}}</div></div>
                                    <div class="dataseturl_holder"><div>{{obj['Equation']['datasetURL']}}</div></div>
                                    <div class="dataset_delete" ng-click="$parent.deleteItem(obj)"></div>
                                </div>
                            </div>                        
                        </div>                
                    </div>
                    
                    
                    <!-- The Units Conversion -->
                    <div class="mainSection" ng-show="numbersShow" ng-cloak>
                        <div class="file_description">
                            <div class="fileheader">Scaling Factors</div>
                            The table below shows the units that may be entered by the user and then scaled. The first column shows the text that the user must enter for the units. 
                            The second column shows the units that the first column is converted to, and the third shows the conversion factor used to accomplish it. The fourth column shows the quantity 
                            of the units.
                        </div>
                        <table id="units_temperature" class="units">
                            <tr><th>Name</th><th>Quantity</th><th>Unit</th><th>Conversion Unit</th><th>Factor</th><th>System</th></tr>
                            <tr ng-repeat="obj in cadwolf_scaleUnits | orderBy:obj.ScaledUnit.quantity">
                                <td>{{obj.ScaledUnit.name}}</td>
                                <td>{{obj.ScaledUnit.quantity}}</td>
                                <td>{{obj.ScaledUnit.unit}}</td>
                                <td>{{obj.ScaledUnit.conv_unit}}</td>
                                <td>{{obj.ScaledUnit.conv_factor}}</td>
                                <td>{{obj.ScaledUnit.Class}}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- The constants   -->
                    <div class="mainSection" ng-show="constantsShow" ng-cloak>
                        <div class="description">
                            <div class="fileheader">Constants Used in Calculations</div>
                            The table below shows the constants that can be entered by the user to be recognized on the worksheet. To use the constant, enter the text as shown in the second column and 
                            the item will appear as shown in the first column with the appropriate numeric value and units. Note that you cannot designate your own variable that has the same name as one of the constants.
                        </div>
                            <table id="constants" class="units">			
                            <tr><th width="125px">Symbol</th><th width="125px">Text</th><th width="175px">Value</th><th width="125px">Units</th><th width="100px">Quantity</th></tr>	
                            <tr ng-repeat="obj in cadwolf_constants">
                                <td><span mathjax-bind="obj.Constant.showvalue"></span></td>
                                <td>{{obj.Constant.name}}</td>
                                <td>{{obj.Constant.value}}</td>
                                <td>{{obj.Constant.units}}</td>
                                <td>{{obj.Constant.measurement}}</td>
                            </tr>
                        </table>
                    </div>
                    
                    
                    <!-- The file as a function section       -->
                    <div class="mainSection" ng-show="fafShow" ng-cloak>
                        <div class="fileheader">Name of file as a function</div>
                        <div class="file_description">Each page can be used as a function that is called from another sheet. The user can set the name used to call this file as a function. 
                            For example, if the users sets this name as "FunctionName" then this file would be called within an equation using the statement "FunctionName("Input1, Input1)." This 
                            name cannot be the same as a built in function such as sin or cos. CAD Wolf will search through this file\'s parent folders, and then the folders listed in the creator\'s 
                            path to find a file with the appropriate name.</div>
                        <div class="file_info">
                            <div class="file_nameline"><div id="filename_error"></div></div>
                            <div class="file_nameline">
                                <div class="file_nametext">Name of the file as a function : </div>
                                <div ng-if="editPerm" id="filefunctionname" class="file_nameinput"><input type="text" ng-enter="saveFileInfo()" ng-model="cadwolf_fileFunData.fileFunName" id="file_functionname"></div>
                                <div ng-if="!editPerm" id="filefunctionname" class="file_nameinput">{{cadwolf_fileFunData.fileFunName}}</div>
                            </div>
                        </div>
                        <div class="fileheader">Inputs for file as a function</div>
                        <div class="file_description">
                            The inputs given to this function and how they are interpreted are set here. The sheet is called by its name and with the set number of inputs below in the form FunctionName(Input1, Input2, ... Input N). You can add 
                            or delete inputs and assign them the name they will be used as in the function. For example, if the one input is set and given the name "X", then the sheet will be solved used whatever value of "X" sent.</div>
                        <div class="file_info">
                            <div ng-if="editPerm" class="file_infoline"><div id="addfileinput" ng-click="addInOut('input')">Add File Input</div></div>
                            <div id="FileInputList">
                                <div ng-repeat="obj in cadwolf_fileFunData.fileFunInputs | orderBy:obj.number track by $index">
                                    <div class="functioninputline"> 
                                        <div class="functioninputnumber">Input Number : {{$index}}</div>
                                        <div ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit" class="functioninputname">{{obj['name']}}</div>
                                        <div class="functioninputname" ng-show="obj.showEdit"><select ng-model="obj.name" ng-options="thisEntry.Equation.Format_name as thisEntry.Equation.Format_name for thisEntry in cadwolf_worksheet | filter:{vartype:'3'}" ng-change="obj.showEdit=!obj.showEdit; saveFileInfo()"></select></div>
                                        <div class="functioninputdelete" ng-click="deleteInputOutput('input', $index)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fileheader">Outputs for file as a function</div>
                        <div class="file_description">When the page is called as a function, it will return the values set here. This is done by calling the function in the following format [Output1, Output2]=FunctionName(Input1, Input2).</div>                  
                        <div class="file_info">
                            <div ng-if="editPerm" class="file_infoline"><div id="addfileoutput" ng-click="addInOut('output')">Add File Output</div></div>
                            <div id="FileOutputList">
                                <div ng-repeat="obj in cadwolf_fileFunData.fileFunOutputs | orderBy:obj.number track by $index">
                                    <div class="functionoutputline"> 
                                        <div class="functionoutputnumber">Output Number : {{$index}}</div>
                                        <div ng-show="!obj.showEdit" ng-dblclick="obj.showEdit=!obj.showEdit" class="functionoutputname">{{obj['name']}}</div>
                                        <div class="functioninputname" ng-show="obj.showEdit"><select ng-model="obj.name" ng-options="thisEntry.Equation.Format_name as thisEntry.Equation.Format_name for thisEntry in cadwolf_worksheet | filter:{vartype:'3'}" ng-change="obj.showEdit=!obj.showEdit; saveFileInfo()"></select></div>
                                        <div class="functionoutputdelete" ng-click="deleteInputOutput('output', $index)"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                                    
                    
                    
                    <!-- Defined Functions -->
                    <div class="mainSection" ng-show="functionsShow" ng-cloak>
                        <div class="fileheader">Function List for this file</div>
                        <div class="file_description" id="functiontext">CADWOLF allows for the use of files as functions. To do this, the name of any function must be tagged to the proper file. The list 
                            below pairs function names in this file with outside files. To add a file as a function, click the add symbol below. To import your personal list of files and functions, click the 
                            appropriate button. Note that you cannot overwrite an existing function name without first deleting it.</div>
	
                        <div id="FAFList">
                            <div ng-if="editPerm" id="AddFAFLine" ng-click="addFAF()">Add a File as a Function</div>
                            <div id="FAFHeaderRow"><div class="Profile_FAF_header2 FAFHeader">URL of File</div><div class="Profile_FAF_header1 FAFHeader">Name of Function</div></div>
                            <div id="Profile_FAF">
                                <div ng-repeat="obj in cadwolf_fileFunData.impFunctions">
                                    <div ng-if="(!editPerm)||(editPerm&&(!obj.fafShowEdit))" ng-click="obj.fafShowEdit=true" class="Profile_FAF_line">
                                        <div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">{{obj.fileAddress}}</div></div>
                                        <div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">{{obj.functionName}}</div></div>
                                    </div>
                                    <div ng-if="editPerm&&obj.fafShowEdit" class="Profile_FAF_line">
                                        <div class="Profile_FAF_addressholder"><div class="Profile_FAF_address"><input type="text" class="FAF_input" ng-model="obj.fileAddress" ng-enter="getFafData(obj)" placeholder="Enter URL of File" /></div></div>
                                        <div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">{{obj.functionName}}</div></div>
                                        <div class="File_FAF_delete" ng-click="deleteFAF(obj)">&nbsp</div>
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </div>

                    
                    <!-- Imported Functions. This section is deprecated and I may or may not bring it back. It is supposed to show the usage of the various imported functions. -->
                    <div class="mainSection" ng-show="importedShow" ng-cloak>
                        <div class="fileheader">Imported functions</div>
                        <div id="functiontext" class="file_description">Users are allowed to use other worksheets as functions. This page lists all the worksheets that are actually used as functions on this page. 
                            Before a file can be used as a function on this page, it must first be defined. This is done on the defined functions page.</div>
                        <div id="importedfunctionslist"></div>
                    </div>


                    <!-- Bug Body -->
                    <div class="mainSection" ng-show="bugShow">
                        <div class="description">
                            <div class="fileheader">Report a Bug</div>
                            <div class=""><p>If you encountered a problem on this page, please fill out the information below. If the problem occured with an equation, select the appropriate item. Be as descriptive as possible and describe the problem, what actions prompted the problem, and if the problem is repetitive.</p></div>
                        </div>
                        <div class="bug_item" id="bugreturn">&nbsp</div>
                        <div class="bug_item"><textarea id="bugdesc" rows="30" cols="115">Describe the bug</textarea></div>
                        <div class="bug_item" id="bugdone" ng-click="submitBug()">Submit Bug Info</div>
                    </div>

                    
                </div>
            </div>
        </div>
    </div>
    
    <span ng-show="textShow" text-spec-bind="currentText"></span>
    <span ng-show="equationShow" eq-spec-bind="currentEquation"></span>
    <span ng-show="symbolicShow" sym-spec-bind="currentSymbolic"></span>
    <span ng-show="tableShow" table-spec-bind="currentTable"></span>
    <span ng-show="loopShow" loop-spec-bind="currentLoop"></span>
    <span ng-show="statementShow" statement-spec-bind="currentStatement"></span>
    <span ng-show="plotShow" plot-spec-bind="currentPlot"></span>
    <span ng-show="surfaceShow" surf-spec-bind="currentPlot"></span>
    <span ng-show="imageShow" image-spec-bind="currentImage"></span>
    <span ng-show="videoShow" video-spec-bind="currentVideo"></span>

                    
    <script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>
    <script src="http://www.cadwolf.com/js/angular/angular.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-sanitize.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/angular/ngDialog.min.js"></script>
    <script src="http://www.cadwolf.com/js/documents/app.js"></script>
    <script src="http://www.cadwolf.com/js/documents/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/documents/directives.js"></script>
    <script src="http://www.cadwolf.com/js/jquery.js"></script>
	<script src="http://www.cadwolf.com/js/Promises.js"></script>
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
    <script src="http://www.cadwolf.com/js/big.min.js"></script>
    <script src="http://www.cadwolf.com/js/Three.js"></script>
    <script src="http://www.cadwolf.com/js/Lut.js"></script>
    <script src="http://www.cadwolf.com/js/Detector.js"></script>
    <script src="http://www.cadwolf.com/js/TrackballControls.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.KeyboardState.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.WindowResize.js"></script>
    <script src="http://www.cadwolf.com/js/THREEx.FullScreen.js"></script>
    <script src="http://www.cadwolf.com/js/helvetiker_regular.typeface.js"></script>
	<script src="http://www.cadwolf.com/MathJax/MathJax.js"></script>
	<script src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
	<script src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>
	<script src="http://www.cadwolf.com/js/HighCharts.js"></script>
    <script src="http://www.cadwolf.com/js/HighCharts2.js"></script>
    <script src="http://www.cadwolf.com/js/Spectrum.js"></script>
    <script src="http://www.cadwolf.com/js/Heatmap.js"></script>



    <script>angular.bootstrap(document, ['documentApp']);</script>
</body>