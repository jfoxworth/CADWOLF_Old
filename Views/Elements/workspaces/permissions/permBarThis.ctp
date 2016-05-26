<div class="permBar">
    
    <div class="permWrapper" permType="admin">
        
        <div ng-class="cadwolfThisspace.Workspace.adminClass" 
             ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'admin')">
            {{cadwolfThisspace.Workspace.adminText}}
        </div>
        
        <div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'admin')" 
             ng-class="cadwolfThisspace.Workspace.adminEditButton">
        </div>
        
        <div ng-if="cadwolfThisspace.Workspace.editAdminPerms" class="permSelectBox">

            <div class="permSelectLine">

                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'admin', 'inherit')" 
                     class="permInherit">Inherited
                </div>

            </div>

            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'admin', 'list')" 
                     class="permList">As Listed
                </div>
            
            </div>

        </div>

    </div>
    
    <div class="permWrapper" permType="edit">
        
        <div ng-class="cadwolfThisspace.Workspace.editClass" 
             ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'edit')">
            {{cadwolfThisspace.Workspace.editText}}
        </div>
        
        <div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'edit')" 
             ng-class="cadwolfThisspace.Workspace.editEditButton">
        </div>
        
        <div ng-if="cadwolfThisspace.Workspace.editEditPerms" class="permSelectBox">
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'edit', 'inherit')" 
                     class="permInherit">Inherited
                </div>
            </div>
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'edit', 'list')" 
                     class="permList">As Listed
                </div>
            
            </div>
        
        </div>
    
    </div>
    
    <div class="permWrapper" permType="use">
        
        <div ng-class="cadwolfThisspace.Workspace.useClass" 
             ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'use')">
            {{cadwolfThisspace.Workspace.useText}}
        </div>
        
        <div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'use')" 
             ng-class="cadwolfThisspace.Workspace.editEditButton">
        </div>
        
        <div ng-if="cadwolfThisspace.Workspace.editUsePerms" class="permSelectBox">
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'inherit')" 
                     class="permInherit">Inherited
                </div>
            
            </div>
            
            <div class="permSelectLine">
            
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'open')" 
                     class="permOpen">Everyone
                </div>
            
            </div>
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'list')" 
                     class="permList">As Listed
                </div>
        
            </div>
    
        </div>

    </div>
    

    <div class="permWrapper" permType="view">
        
        <div ng-class="cadwolfThisspace.Workspace.viewClass" 
             ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'view')">
            {{cadwolfThisspace.Workspace.viewText}}
        </div>
        
        <div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'view')" 
             ng-class="cadwolfThisspace.Workspace.editEditButton">
        </div>
        
        <div ng-if="cadwolfThisspace.Workspace.editViewPerms" 
             class="permSelectBox">
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'inherit')" 
                     class="permInherit">Inherited
                </div>
            
            </div>
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'open')" 
                     class="permOpen">Everyone
                </div>
            
            </div>
            
            <div class="permSelectLine">
                
                <div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'list')" 
                     class="permList">As Listed
                </div>
            
            </div>
        
        </div>
    
    </div>

</div>
