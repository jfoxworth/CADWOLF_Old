<div id="leftColumnTextWrapper" 
     ng-show="leftNav">																												
    
    <div class="logoWrapper"><div id="logoText">CADWOLF</div></div>																																		

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

            <div ng-class="fileTextClass" 
                 ng-click="showMain(1)">
                Files and Folders
            </div>																

            <div ng-show="showPerm" 
                 ng-class="permissionTextClass" 
                 ng-click="showMain(2)">
                Permissions
            </div>																			

        </div>																																	

    </div>																																		

</div>																																			
