<!-- 
    THis is the permissions tree section. It has two components. The first shows the properties for this particular folder. 
    The second is a repeater for all items and lets the user add/delete users. 
-->

<div id="workspace_permissions" ng-controller="permissionController" ng-show="permissionDisplay">
    

    <!-- The title and description for the permissions page -->
    <?php    echo $this->element('workspaces/permissions/titleDesc'); ?>
        
    <div id="partPermissionsWrapper" class="mainBodyPart">
        
        <ol class="systemBlock isFolder">                        
            
            <li class="systemLine">

                <div class="systemPermLogo"></div>
                
                <div class="systemPermName">{{cadwolfThisspace.Workspace.name}}</div>
                
                <!-- The permissions bar for the current folder -->
                <?php    echo $this->element('workspaces/permissions/permBarThis'); ?>
                
                <!-- The blocks that let the users add/delete users for each permission -->
                <?php    echo $this->element('workspaces/permissions/addDeleteUsersThis'); ?>
                            
            </li>
            
            
            <div id="partPermissionContent" 
                 ng-repeat="obj in cadwolfWorkspace | orderBy:$parent.sortMe track by obj.Workspace.id">
                
                <ol class="systemBlock isFile" systemID="{{obj.Workspace.thisAddress}}">
                    
                    <li class="systemLine" systemID="{{obj.Workspace.thisAddress}}">
                        <div ng-class="obj.Workspace.divClass"></div>
                        <div class="systemPermName">{{obj.Workspace.name}}</div>

                        <!-- The permissions bar for each item -->
                        <?php    echo $this->element('workspaces/permissions/permBar'); ?>
                        
                        <!-- The permissions bar for each item -->
                        <?php    echo $this->element('workspaces/permissions/addDeleteUsers'); ?>

                    </li>
                </ol>
            </div>
        </ol>
    </div>
</div>
