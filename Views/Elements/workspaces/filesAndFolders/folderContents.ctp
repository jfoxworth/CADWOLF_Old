<div ng-repeat="obj in cadwolfWorkspace | orderBy:$parent.sortMe track by obj.Workspace.id" 
     class="workspace_wrapper">
    
    <div class="workspace_line">
        
        <div ng-class="obj.Workspace.typeImageClass" 
             ng-click="goToAddress(obj.Workspace.id)">
        </div>
        
        <div ng-class="obj.Workspace.typeClass" 
             ng-hide="obj.Workspace.showEdit" 
             ng-model="obj.Workspace.name" 
             ng-click="obj.Workspace.showEdit=!obj.showEdit">
            {{obj.Workspace.name}}
        </div>
        
        <div ng-class="obj.Workspace.typeClass" 
             ng-enter="obj.Workspace.showEdit=!obj.Workspace.showEdit; changeName(obj.Workspace.id)" 
             ng-show="obj.Workspace.showEdit"><input class="myInput" ng-model="obj.Workspace.name">
        </div>
        
        <div class="workspace_copy" 
             ng-click="copyItem(obj.Workspace.id)" 
             ng-show="showEditOptions">&nbsp
        </div>
        
        <div class="workspace_move" 
             ng-click="obj.Workspace.showMove=!obj.Workspace.showMove" 
             ng-show="showEditOptions">&nbsp
        </div>
        
        <div class="workspace_delete" 
             ng-click="deleteClick(obj.Workspace.id)" 
             ng-show="showEditOptions">&nbsp
        </div>
        
        <div ng-click="checkClick(obj.Workspace.id)" 
             ng-show="showEditOptions">
            
            <div ng-class="obj.Workspace.checkClass">&nbsp</div>
        
        </div>
        
        <div class="workspace_showinfo" 
             ng-click="obj.Workspace.showDesc=!obj.Workspace.showDesc">&nbsp
        </div>
        
        <div class="workspace_time">{{obj.Workspace.cdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
        
        <div class="workspace_time">{{obj.Workspace.mdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
        
        <div class="workspace_rank" 
             ng-show="showEditOptions">
            <select class="workspace_rankselect" 
                    ng-model="obj.Workspace.newRank" 
                    ng-change="changeRank(obj.Workspace.id)">
                
                <option value="{{obj.Workspace.rank}}" 
                        selected="selected">
                    {{obj.Workspace.rank}}
                </option>
                
                <option ng-repeat="myOption in cadwolfWorkspace" 
                        value="{{$index+1}}">
                    {{$index+1}}
                </option>
            
            </select>
        </div>
    
    </div>
    
    <div class="move_line" 
         ng-show="obj.Workspace.showMove">
        
        <input type="text" 
               class="moveaddress" 
               ng-model="obj.Workspace.moveAddress" 
               placeholder="Enter New Address" 
               ng-enter="obj.showMove=!obj.showMove; moveItem(obj.Workspace.id, obj.Workspace.moveAddress)">
    </div>
    
    <div ng-class="obj.Workspace.descriptionClass" 
         ng-show="obj.Workspace.showDesc">
        {{obj.Workspace.description}}
    </div>

</div>
