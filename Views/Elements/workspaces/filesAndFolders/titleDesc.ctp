<div id="workspace_title_wrapper" 
     ng-if="!editPerm">
    
    <div id="workspace_title_edit" 
         ng-show="titleShow">
        {{cadwolfThisspace['Workspace']['title']}}
    </div>

</div>

<div id="workspace_title_wrapper" 
     ng-if="editPerm">
    
    <div id="workspace_title_edit" 
         ng-show="titleShow" 
         ng-click="titleShow=!titleShow">
        {{cadwolfThisspace['Workspace']['title']}}
    </div>
    
    <input id="workspace_title_input" 
           ng-show="!titleShow" 
           ng-enter="saveTitle(cadwolfThisspace['Workspace']['id']); titleShow=!titleShow" 
           ng-model="cadwolfThisspace['Workspace']['title']" 
           value="{{cadwolfThisspace['Workspace']['title']}}" />

</div>

<div id="workspaceDescriptionHolder">
    
    <div id="workspaceDescription" 
         ng-model="cadwolfThisspace['Workspace']['description']">
        {{cadwolfThisspace['Workspace']['description']}}
    </div>

</div>

<div id="workspace_description_save" 
     ng-show="showEditOptions" 
     ng-click="saveDescription(cadwolfThisspace['Workspace']['id'])">
    Save Description
</div>
