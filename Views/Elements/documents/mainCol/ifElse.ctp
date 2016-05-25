<div ng-switch-when="8" 
     id="{{obj.itemid}}" 
     class="switchWrapper" 
     ng-if="obj.parentid=='none'" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <span if-else-object="obj"></span>

</div>                                    
