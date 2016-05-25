<div ng-switch-when="7"
     class="switchWrapper" 
     ng-if="obj.parentid=='none'" 
     id="{{obj.itemid}}" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <span while-loop-object="obj"></span>

</div>                                    
