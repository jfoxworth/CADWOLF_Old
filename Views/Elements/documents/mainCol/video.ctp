<div ng-switch-when="12" 
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
            
            <div ng-click="showSpecs(obj.itemid, 'video')" 
                 class="videospecs">
            </div>
        
        </div>
    
    </div>
    
    <div class="video_block" 
         id="{{obj.data.Format_id}}">
        
        <div width="{{obj.data.videoWidth}}" 
             height="{{obj.data.videoHeight}}">
            
            <img class="youtube-thumb" 
                 ng-src="//i.ytimg.com/vi/{{obj.data.videoID}}/hqdefault.jpg" 
                 width="{{obj.data.videoWidth}}" 
                 height="{{obj.data.videoHeight}}">
        
        </div>
    
    </div>
    
    <span ref-num="obj.Values.References"></span>

</div>                                    
