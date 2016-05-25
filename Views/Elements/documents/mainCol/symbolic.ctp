<div ng-switch-when="4" 
     class="switchWrapper" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc">
    
    <div ng-if="editPerm" 
         ng-show="showIcons" 
         class="icon_wrapper">
        <div class="icon_holder">
            
            <div class="deletebutton" 
                 ng-click="$parent.deleteItem(obj)">
            </div>
            
            <div ng-click="showSpecs(obj.itemid, 'symbolic');" 
                 class="symeq_specs">
            </div>
        
        </div>
    
    </div>
    
    <div class="symequationblock">
        
        <div ng-if="editPerm" 
             class="symeqshow" 
             id="{{obj.itemid}}" 
             ng-show="!obj.showEdit" 
             ng-dblclick="obj.showEdit=!obj.showEdit">
            
            <span mathjax-bind="obj.data.text"></span>
        
        </div>
        
        <input ng-if="editPerm" 
               class="standardInput" 
               ng-show="obj.showEdit" 
               ng-enter="obj.showEdit=!obj.showEdit" 
               ng-model="obj.data.text" />
        
        <div ng-if="!editPerm" 
             class="symeqshow" 
             id="{{obj.itemid}}">
            
            <span mathjax-bind="obj.data.text"></span>
        
        </div>
    
    </div>
    
    <span ref-num="obj.Values.References"></span>

</div>
