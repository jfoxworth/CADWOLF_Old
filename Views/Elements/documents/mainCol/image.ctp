<div ng-switch-when="10"
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
            
            <div ng-click="showSpecs(obj.itemid, 'image')" 
                 class="imagespecs">
            </div>

        </div>

    </div>

    <div class="image">
        <img ng-src="/UserImages/{{obj.data.src}}.{{obj.data.thisType}}" 
             width="obj.data.width" 
             height="{{obj.data.height}}"/>
    </div>

    <span ref-num="obj.Values.References"></span>

</div>                                    
