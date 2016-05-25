<div ng-switch-when="2"
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
            
            <div class="headerbutton" 
                 ng-click="obj.showOption=!obj.showOption">
                
                <div ng-if="obj.showOption" 
                     class="hedit_box">
                    
                    <div ng-click="obj.data.hClass='header1'; saveItem(obj.itemid);" 
                         class="hedit_line" htype="h1">Header 1
                    </div>
                    
                    <div ng-click="obj.data.hClass='header2'; saveItem(obj.itemid);" 
                         class="hedit_line" htype="h2">Header 2
                    </div>
                    
                    <div ng-click="obj.data.hClass='header3'; saveItem(obj.itemid);" 
                         class="hedit_line" htype="h3">Header 3
                    </div>
                    
                    <div ng-click="obj.data.hClass='header4'; saveItem(obj.itemid);" 
                         class="hedit_line" htype="h4">Header 4
                    </div>
                
                </div>
            
            </div>
        
        </div>
    
    </div>
    
    <div id="{{obj.itemid}}" 
         class="header_block">
        
        <div ng-show="!obj.showEdit" 
             ng-dblclick="obj.showEdit=!obj.showEdit" 
             ng-class="obj.data.hClass" 
             data-ng-bind-html="obj.data.text">
        </div>
        
        <input ng-class="obj.data.hClass" 
               ng-show="obj.showEdit" 
               ng-enter="saveItem(obj.itemid); obj.showEdit=!obj.showEdit;" 
               value="obj.data.text" 
               ng-model="obj.data.text" />
    
    </div>

</div>
