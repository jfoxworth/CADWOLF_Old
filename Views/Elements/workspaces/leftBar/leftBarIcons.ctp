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

            <div ng-class="fileClass" 
                 ng-click="showMain(1)">&nbsp
            </div>																			

            <div ng-show="showPerm" 
                 ng-class="permissionClass" 
                 ng-click="showMain(2)">&nbsp
            </div>																					

        </div>																																	

    </div>																																		

</div>																																			
