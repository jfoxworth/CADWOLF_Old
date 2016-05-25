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
                <!-- <div ng-class="importedIcon"    ng-click="showMain(11)">&nbsp</div>	-->		
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
                <!--<div ng-class="importedText"    ng-click="showMain(11)">Imported Functions</div>  -->		
                <div ng-class="bugText"         ng-click="showMain(12)">Report a Bug</div>		
                <div ng-if="editPerm"           ng-click="saveFile()" id="saveFileText">Save File</div>
            </div>																																	
        </div>																																		
    </div>																																			
</div>		
