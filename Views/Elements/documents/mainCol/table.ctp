<div ng-switch-when="5"
     class="switchWrapper" 
     id="{{obj.itemid}}" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <span table-object="obj"></span>
    
    <span ref-num="obj.Values.References"></span>

</div>                                    
