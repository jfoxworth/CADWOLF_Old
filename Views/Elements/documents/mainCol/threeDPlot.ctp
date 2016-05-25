<div ng-switch-when="13"
     class="switchWrapper" 
     ng-mouseover="showIcons=true;" 
     ng-mouseout="showIcons=false" 
     ng-if="obj.location>=showStartLoc&&obj.location<showEndLoc" >
    
    <div ng-if="editPerm" 
         ng-show="showIcons" 
         class="icon_wrapper">
        
        <div class="icon_holder">
            
            <div class="deletebutton" 
                 ng-click="$parent.deleteItem(obj)">
            </div>
            
            <div ng-click="showSpecs(obj.itemid, 'surface')" 
                 class="plot_specs">
            </div>
            
            <a class="expandbutton"  
               ng-href="http://www.cadwolf.com/Surfaces/{{obj.itemid}}" 
               target="_blank">
            </a>
        
        </div>
    
    </div>
    
    <div class="surface_block">
        
        <div class="plot_holder" 
             ng-style="{height:obj.Surface.Chart_height, width:obj.Surface.Chart_width}" 
             ng-click="$parent.$parent.$parent.currentPlot=obj;  animate()">
            
            <div id="{{obj.itemid}}" style="float:left; overflow:auto;}"></div>
            
            <div class="Legend_Wrapper" ng-show="obj.Surface.Props.Legend.onOff=='1'">
                
                <div class="Legend" 
                     ng-show="obj.Surface.Props.Legend.onOff=='1'&&obj.Surface.Props.divideColormap=='0'" 
                     id="{{obj.itemid}}Legend"></div>
                
                <div ng-show="obj.Surface.Props.Legend.onOff=='1'&&obj.Surface.Props.divideColormap=='0'" 
                     id="{{obj.itemid}}LegendTicks" 
                     class="LegendTicks">
                </div>
                
                <div ng-repeat="subObj in obj.Surface.Chart_dataobj track by subObj.Format_id">
                    
                    <div class="Legend"      
                         ng-show="subObj.legendOnOff=='1'&&obj.Surface.Props.divideColormap=='1'" 
                         id="{{subObj.Format_id}}Legend">
                    </div>
                    
                    <div class="LegendTicks" 
                         ng-show="subObj.legendOnOff=='1'&&obj.Surface.Props.divideColormap=='1'" 
                         id="{{subObj.Format_id}}LegendTicks">
                    </div>
                
                </div>
            
            </div>
            
            <span surface-bind="obj.Surface"></span>
        
        </div>
    
    </div>
    
    <span ref-num="obj.Values.References"></span>

</div>                                    
