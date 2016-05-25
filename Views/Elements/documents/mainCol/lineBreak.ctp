<div ng-switch-when="11" 
     class="switchWrapper" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <div ng-if="editPerm" 
         ng-show="showIcons" 
         class="icon_wrapper">
        <div class="icon_holder">
            <div class="deletebutton" ng-click="$parent.deleteItem(obj)"></div>
        </div>
    </div>
    
    <div class="linebreak_block"></div>

</div>       
