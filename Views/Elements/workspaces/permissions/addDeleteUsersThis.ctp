<div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.adminUsers">
    
    <div id="errorLine">admin permissions for {{cadwolfThisspace.Workspace.name}}</div>
    
    <div class="enterUserLine">
        <input class="newUser" 
               permtype="admin" 
               placeholder="Enter User Name" 
               ng-model="$parent.$parent.newUserName" 
               ng-enter="addUserPerm('admin', cadwolfThisspace.Workspace.id)">
    </div>
    
    <div class="usersBlock">
        <div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" 
             class="permUser" 
             permtype="admin" 
             ng-if="permObj.Permission.admin=='1'" >
            {{permObj.Permission.username}}
            
            <div class="permDelete" 
                 permtype="admin" 
                 username="{{permObj.Permission.username}}" 
                 ng-click="deleteUserPerm('admin', permObj.Permission.userid, cadwolfThisspace.Workspace.id)">
            </div>
        </div>
    </div>

</div>    


<div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.editUsers">
    
    <div id="errorLine">edit permissions for {{cadwolfThisspace.Workspace.name}}</div>
    
    <div class="enterUserLine">
        <input class="newUser" 
               permtype="edit" 
               placeholder="Enter User Name" 
               ng-model="$parent.$parent.newUserName" 
               ng-enter="addUserPerm('edit', cadwolfThisspace.Workspace.id)">
    </div>
    
    <div class="usersBlock">
        <div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" 
             class="permUser" 
             permtype="edit" 
             ng-if="permObj.Permission.edit=='1'">
            {{permObj.Permission.username}}
            
            <div class="permDelete" 
                 permtype="edit" 
                 username="{{permObj.Permission.username}}" 
                 ng-click="deleteUserPerm('edit', permObj.Permission.userid, cadwolfThisspace.Workspace.id)">
            </div>
        </div>
    </div>

</div>    


<div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.useUsers">
    
    <div id="errorLine">use permissions for {{cadwolfThisspace.Workspace.name}}</div>
    
    <div class="enterUserLine">
        <input class="newUser" 
               permtype="use" 
               placeholder="Enter User Name" 
               ng-model="$parent.$parent.newUserName" 
               ng-enter="addUserPerm('use', cadwolfThisspace.Workspace.id)">
    </div>
    
    <div class="usersBlock">
        <div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" 
             class="permUser" 
             permtype="use" 
             ng-if="permObj.Permission.use=='1'">
            {{permObj.Permission.username}}
            
            <div class="permDelete" 
                 permtype="use" 
                 username="{{permObj.Permission.username}}" 
                 ng-click="deleteUserPerm('use', permObj.Permission.userid, cadwolfThisspace.Workspace.id)">
            </div>
        </div>
    </div>

</div>    


<div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.viewUsers">
    
    <div id="errorLine">view permissions for {{cadwolfThisspace.Workspace.name}}</div>
    
    <div class="enterUserLine">
        <input class="newUser" 
               permtype="view" 
               placeholder="Enter User Name" 
               ng-model="$parent.$parent.newUserName" 
               ng-enter="addUserPerm('view', cadwolfThisspace.Workspace.id)">
    </div>
    
    <div class="usersBlock">
        <div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" 
             class="permUser" 
             permtype="view" 
             ng-if="permObj.Permission.view=='1'">
            {{permObj.Permission.username}}
            
            <div class="permDelete" 
                 permtype="view" 
                 username="{{permObj.Permission.username}}" 
                 ng-click="deleteUserPerm('view', permObj.Permission.userid, cadwolfThisspace.Workspace.id)">
            </div>
        </div>
    </div>

</div>    
