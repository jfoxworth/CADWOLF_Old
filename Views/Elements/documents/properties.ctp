<div class="mainSection" ng-show="propShow">
    
    <div class="fileheader">File Properties</div>
    
    <div class="file_info">
        
        <div ng-if="editPerm" class="file_infoline">
            
            <div class="file_infoleft">Title</div>                             
            
            <div ng-show="!editTitle" 
                 ng-click="editTitle=!editTitle" 
                 class="file_inforight">{{cadwolf_fileInfo.title}}</div>
            
            <input class="file_inforight" 
                   ng-show="editTitle" 
                   ng-enter="editTitle=!editTitle; saveFileInfo()" 
                   ng-model="cadwolf_fileInfo.title" />
        
        </div>
        
        <div ng-if="!editPerm" class="file_infoline">
            <div class="file_infoleft">Title</div>
            <div class="file_inforight">{{cadwolf_fileInfo.title}}</div>
        </div>
        
        <div ng-if="editPerm" class="file_infoline">
            <div class="file_infoleft">Subtitle</div>                              
            <div ng-show="!editSubTitle" 
                 ng-click="editSubTitle=!editSubTitle" 
                 class="file_inforight">{{cadwolf_fileInfo.subtitle}}</div>
            
            <input class="file_inforight" 
                   ng-show="editSubTitle" 
                   ng-enter="editSubTitle=!editSubTitle; saveFileInfo()" 
                   ng-model="cadwolf_fileInfo.subtitle" 
                   placeholder="None Given" />
        </div>
        
        <div ng-if="!editPerm" class="file_infoline">
            <div class="file_infoleft">Subtitle</div>
            <div class="file_inforight">{{cadwolf_fileInfo.subtitle}}</div>
        </div>
        
        <div class="file_infoline">
            <div class="file_infoleft">Creation Date</div>
            <div class="file_inforight">{{cadwolf_fileInfo.cdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
        </div>
        
        <div class="file_infoline">
            <div class="file_infoleft">Date Last Saved</div>
            <div class="file_inforight">{{cadwolf_fileInfo.mdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
        </div>
        
        <!-- This should have a button with id checkoutButton if not checked out and perm is OK -->
        <div class="file_infoline">
            <div class="file_infoleft">Checkout Status</div>
            <div class="file_inforight" id="checkoutLine">{{cadwolf_fileInfo.checkoutText}}</div>
        </div> 
        
        <div ng-if="editPerm" class="file_infoline">
            <div class="file_infoleft">View Table of Contents as Default</div>
            <div class="file_inforight" 
                 id="tocProp" 
                 ng-click="cadwolf_fileInfo['TOC']=!cadwolf_fileInfo['TOC']">{{cadwolf_fileInfo['TOC']}}</div>
        </div>
        
        <div class="file_infoline">
            <div class="file_infoleft">View Permission</div>
            <div class="file_inforight">{{cadwolf_fileInfo.viewText}}</div>
        </div>
        
        <div class="file_infoline">
            <div class="file_infoleft">Use Permission</div>
            <div class="file_inforight">{{cadwolf_fileInfo.useText}}</div>
        </div>
        
        <div class="file_infoline">
            <div class="file_infoleft">Edit Permission</div>
            <div class="file_inforight">{{cadwolf_fileInfo.editText}}</div>
        </div>
        
        
        <div ng-if="editPerm" class="file_infoline">
            <div class="file_infoleft">File Description</div>
            
            <div ng-show="!editDescription" 
                 id="file_description" 
                 class="file_inforight" 
                 ng-click="editDescription=!editDescription">{{cadwolf_fileInfo.description}}
            </div>
            
            <textarea rows="25" cols="50" 
                      ng-show="editDescription" 
                      ng-enter="editDescription=!editDescription; saveFileInfo()" 
                      ng-model="cadwolf_fileInfo.description" >{{cadwolf_fileInfo.description}}
            </textarea>
        
        </div>
        
        <div ng-if="!editPerm" class="file_infoline">
            <div class="file_infoleft">File Description</div>
            <div class="file_inforight">{{cadwolf_fileInfo.description}}</div>
        </div>
    
    </div>

</div>
