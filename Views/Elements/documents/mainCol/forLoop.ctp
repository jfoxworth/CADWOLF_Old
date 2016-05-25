<div ng-switch-when="6" 
     id="{{obj.itemid}}" 
     class="switchWrapper" 
     ng-if="obj.parentid=='none'" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <span for-loop-object></span>

</div>  