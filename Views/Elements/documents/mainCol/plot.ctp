<div ng-switch-when="9" 
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
            
            <div ng-click="showSpecs(obj.itemid, 'plot')" 
                 class="plot_specs">
            </div>
            
            <a class="expandbutton" ng-href="http://www.cadwolf.com/Plots/{{obj.itemid}}" target="_blank"></a>
        
        </div>
    
    </div>
    
    <div class="plot_block">
        
        <div id="{{obj.itemid}}" class="plot_holder" ng-style="{height:obj.Chart_height, width:obj.Chart_width}">
            
            <span plot-bind="obj"></span>
        
        </div>
    
    </div>
    
    <span ref-num="obj.Values.References"></span>

</div>                                    
