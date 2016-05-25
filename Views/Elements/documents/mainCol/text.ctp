<div ng-switch-when="1" 
     class="switchWrapper"  
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<=showEndLoc">

    <div class="icon_wrapper" 
         ng-if="editPerm" 
         ng-show="showIcons">

        <div class="icon_holder">
            <div class="deletebutton" 
                 ng-click="$parent.deleteItem(obj)">
            </div>
            
            <div class="text_specs"
                 ng-click="showSpecs(obj.itemid, 'text')">
            </div>
        
        </div>
    
    </div>
    
    
    <div id="{{obj.itemid}}" 
         class="text_block"
         ng-click="setCKEditor(obj.itemid)" 
         data-ng-bind-html="obj.data">
    </div>
    
    <span ref-num="obj.Values.References"></span>

</div>
