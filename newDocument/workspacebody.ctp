<body ng-controller="mainController">

    <?php echo('<div id="username">'.$this->Session->read('Auth.User.username').'</div>'); ?> 
    <?php echo('<div id="userid">'.$this->Session->read('Auth.User.id').'</div>'); ?>
    <div id="container">																														
        <div id="leftColumnWrapper" ng-mouseenter="leftNav=true;" ng-mouseleave="leftNav=false;">																														
            <div id="leftColumnIconsWrapper">																												
                <div class="logoWrapper">																													
                    <div id="logo">&nbsp</div>																												
                </div>																																		
                <div class="userWrapper">																												
                    <div id="user">&nbsp</div>																											                    																								
                    <?php
                    if($loggedIn)
                    {   echo('<div class="leftBlank">&nbsp</div>');
                        echo('<div class="leftBlank">&nbsp</div>');
                        echo('<div class="leftBlank">&nbsp</div>');
                    }
                    ?>

                </div>																																	
                <div class="leftColumnWrapper">																											
                    <div id="leftColumnIcons">																												
                        <div ng-class="fileClass" ng-click="showMain(1)">&nbsp</div>																			
                        <div ng-show="showPerm" ng-class="permissionClass" ng-click="showMain(2)">&nbsp</div>																					
                    </div>																																	
                </div>																																		
            </div>																																			
            <div id="leftColumnTextWrapper" ng-show="leftNav">																												
                <div class="logoWrapper">																													
                    <div id="logoText">CADWOLF</div>																										
                </div>																																		

                <?php
                if ($loggedIn)			
                {	echo('<div class="userWrapper">');	
                    $profileAddress='http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
                    $workspaceAddress='http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));	
                    echo('<div id="userText">'.$this->Session->read('Auth.User.username').'</div>');		
                    echo('<div class="userLine"><a class="userItem" href="'.$workspaceAddress.'">Workspace</a></div>');		
                    echo('<div class="userLine"><a class="userItem" href="'.$profileAddress.'">User Page</a></div>');	
                    echo('<div class="userLine"><a class="userItem" href="http://www.cadwolf.com/users/logout">Log Out</a></div>');	
                     echo('</div>');	
                } else 		
                {	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users">Login</a></div>');		}				

                ?>

                <div class="leftColumnWrapper">																											
                    <div id="leftColumnText">																												
                        <div ng-class="fileTextClass" ng-click="showMain(1)">Files and Folders</div>																
                        <div ng-show="showPerm" ng-class="permissionTextClass" ng-click="showMain(2)">Permissions</div>																			
                    </div>																																	
                </div>																																		
            </div>																																			
        </div>																																		

        <div id="Format_Wrapper">
            <div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div>
        </div>		

        <?php
        if ($Permissions['edit']=='1')	
        {   echo('<div class="left_subcolumn" id="insertOptions" ng-show="showInsert">');
                echo('<div class="left_subcolumnInnerShort leftMask">');
                    echo('<div class="lc_block" id="Insert_Block">');
				        echo('<div class="lc_description" id="add_block">Add an Item</div>');
				        echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');
				        echo('<div class="lc_description_bottom">&nbsp</div>');
				        echo('<div class="newblock_block">');
                            echo('<div class="insertLine" ng-Click="addFileFolder(1)"><div class="insertImage" id="addfolder">&nbsp</div><div id="addfolderText" class="insertText">Folder</div></div>');
                            echo('<div class="insertLine" ng-Click="addFileFolder(2)"><div class="insertImage" id="addfile">&nbsp</div><div id="addfileText" class="insertText">Document</div></div>');
                            echo('<div class="insertLine" ng-Click="showImageUpload=true"><div class="insertImage" id="addimage">&nbsp</div><div id="addimageText" class="insertText">Image</div></div>');
                            echo('<div class="insertLine" ng-Click="addFileFolder(3)"><div class="insertImage" id="adddataset">&nbsp</div><div id="adddatasetText" class="insertText">Dataset</div></div>');
                            echo('<div class="insertLine" ng-Click="addFileFolder(4)"><div class="insertImage" id="addparttree">&nbsp</div><div id="addparttreeText" class="insertText">Part Tree</div></div>');
                        echo('</div>');	
                    echo('</div>');		
                echo('</div>');	
            echo('</div>');
        }
        ?>

        <div id="main_wrapper" ng-cloak>
            <div id="content_wrapper">

                <div id="messageLine">
                    <div class="successMessage" ng-cloak ng-show="displayGoodMessage">{{goodMessageText}}</div>
                    <div class="errorMessage" ng-cloak ng-show="displayBadMessage">{{badMessageText}}</div>
                </div>

                <div id="workspace_wrapper" ng-controller="filesController" ng-show="fileDisplay">
				    <input type="file" id="replaceImageUpload" name="replaceImageUpload" onchange="angular.element(this).scope().replaceImage(this.files)" style="visibility: hidden;" />

					<div id="workspace_bodywide">
						<div ng-class="mainWrapperClass">
                            
							<div id="workspace_title_wrapper" ng-if="!editPerm"><div id="workspace_title_edit" ng-show="titleShow">{{cadwolfThisspace['Workspace']['title']}}</div></div>
							<div id="workspace_title_wrapper" ng-if="editPerm">
                                <div id="workspace_title_edit" ng-show="titleShow" ng-click="titleShow=!titleShow">{{cadwolfThisspace['Workspace']['title']}}</div>
                                <input id="workspace_title_input" ng-show="!titleShow" ng-enter="saveTitle(cadwolfThisspace['Workspace']['id']); titleShow=!titleShow" ng-model="cadwolfThisspace['Workspace']['title']" value="{{cadwolfThisspace['Workspace']['title']}}" />
                            </div>
                            <div id="workspaceDescriptionHolder"><div id="workspaceDescription" ng-model="cadwolfThisspace['Workspace']['description']">{{cadwolfThisspace['Workspace']['description']}}</div></div>
							<div id="workspace_description_save" ng-show="showEditOptions" ng-click="saveDescription(cadwolfThisspace['Workspace']['id'])">Save Description</div>
		
                            <div id="image_uploader" ng-show="showImageUpload"><input type="file" id="image_to_upload" onchange="angular.element(this).scope().uploadImage(this.files)"/></div>
							<div id="upfolderline"><div ng-click="moveUpOneFolder()" id="uponefolder"></div></div>
							<div id="orderbyline">
                                <div id="orderbyholder">
								    <select ng-model="$parent.sortMe" >
                                        <option value="Workspace.rank">User Rank</option>
									    <option value="Workspace.cdatesort">Date Created</option>
                                        <option value="Workspace.mdatesort">Date Saved</option>
									   <option value="Workspace.File_or_Folder">Type</option>
								    </select>
							     </div>
                            </div>
		
							<div id="workspace_foldercontents">
								<div class="workspace_line">
									<div id="workspace_header1">&nbsp</div>
									<div id="workspace_header2">File Name</div>
									<div id="workspace_header7" ng-show="showEditOptions">Copy</div>
									<div id="workspace_header8" ng-show="showEditOptions">Move</div>
									<div id="workspace_header9" ng-show="showEditOptions">Delete</div>
									<div id="workspace_header10" ng-show="showEditOptions">Status</div>
									<div id="workspace_header11">Info</div>
									<div id="workspace_header3">Created</div>
									<div id="workspace_header4">Modified</div>
									<div id="workspace_header11">&nbsp</div>
								</div>
						
                                <div ng-repeat="obj in cadwolfWorkspace | orderBy:$parent.sortMe track by obj.Workspace.id" class="workspace_wrapper">
                                    <div class="workspace_line">
                                        <div ng-class="obj.Workspace.typeImageClass" ng-click="goToAddress(obj.Workspace.id)"></div>
                                        <div ng-class="obj.Workspace.typeClass" ng-hide="obj.Workspace.showEdit" ng-model="obj.Workspace.name" ng-click="obj.Workspace.showEdit=!obj.showEdit">{{obj.Workspace.name}}</div>
                                        <div ng-class="obj.Workspace.typeClass" ng-enter="obj.Workspace.showEdit=!obj.Workspace.showEdit; changeName(obj.Workspace.id)" ng-show="obj.Workspace.showEdit"><input class="myInput" ng-model="obj.Workspace.name"></div>
                                        <div class="workspace_copy" ng-click="copyItem(obj.Workspace.id)" ng-show="showEditOptions">&nbsp</div>
                                        <div class="workspace_move" ng-click="obj.Workspace.showMove=!obj.Workspace.showMove" ng-show="showEditOptions">&nbsp</div>
                                        <div class="workspace_delete" ng-click="deleteClick(obj.Workspace.id)" ng-show="showEditOptions">&nbsp</div>
                                        <div ng-click="checkClick(obj.Workspace.id)" ng-show="showEditOptions"><div ng-class="obj.Workspace.checkClass">&nbsp</div></div>
                                        <div class="workspace_showinfo" ng-click="obj.Workspace.showDesc=!obj.Workspace.showDesc">&nbsp</div>
                                        <div class="workspace_time">{{obj.Workspace.cdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
                                        <div class="workspace_time">{{obj.Workspace.mdate | date : 'EEE, MMM d, y - h:mm a'}}</div>
                                        <div class="workspace_rank" ng-show="showEditOptions"><select class="workspace_rankselect" ng-model="obj.Workspace.newRank" ng-change="changeRank(obj.Workspace.id)" ><option value="{{obj.Workspace.rank}}" selected="selected">{{obj.Workspace.rank}}</option><option ng-repeat="myOption in cadwolfWorkspace" value="{{$index+1}}">{{$index+1}}</option></select></div>
                                    </div>
                                    <div class="move_line" ng-show="obj.Workspace.showMove"><input type="text" class="moveaddress" ng-model="obj.Workspace.moveAddress" placeholder="Enter New Address" ng-enter="obj.showMove=!obj.showMove; moveItem(obj.Workspace.id, obj.Workspace.moveAddress)"></div>
                                    <div ng-class="obj.Workspace.descriptionClass" ng-show="obj.Workspace.showDesc">{{obj.Workspace.description}}</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </div>

                <div id="workspace_permissions" ng-controller="permissionController" ng-show="permissionDisplay">
                    <div class="workspace_title">Permission Tree</div>
                    <div id="workspace_permDescription">This page shows the user what permissions are set for this folder, its parent folders, and the documents and subfolders contained within it. If you have edit permissions, you change alter the permissions for that file or folder. Admin and edit permissions can be set to inherit from its parent or to a specific list of people. Use and view permissions can be given to everyone, to a list of people, or to inherit that permission.</div>
                    <div id="partPermissionsWrapper" class="mainBodyPart">
                        <ol class="systemBlock isFolder">                        
                            <li class="systemLine">
                                <div class="systemPermLogo"></div>
                                <div class="systemPermName">{{cadwolfThisspace.Workspace.name}}</div>
                                <div class="permBar">
                                    <div class="permWrapper" permType="admin"><div ng-class="cadwolfThisspace.Workspace.adminClass" ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'admin')">{{cadwolfThisspace.Workspace.adminText}}</div><div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'admin')" ng-class="cadwolfThisspace.Workspace.adminEditButton"></div>
                                        <div ng-if="cadwolfThisspace.Workspace.editAdminPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'admin', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'admin', 'list')" class="permList">As Listed</div></div></div>
                                    </div>
                                    <div class="permWrapper" permType="edit"><div ng-class="cadwolfThisspace.Workspace.editClass" ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'edit')">{{cadwolfThisspace.Workspace.editText}}</div><div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'edit')" ng-class="cadwolfThisspace.Workspace.editEditButton"></div>
                                        <div ng-if="cadwolfThisspace.Workspace.editEditPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'edit', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'edit', 'list')" class="permList">As Listed</div></div></div>
                                    </div>
                                    <div class="permWrapper" permType="use"><div ng-class="cadwolfThisspace.Workspace.useClass" ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'use')">{{cadwolfThisspace.Workspace.useText}}</div><div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'use')" ng-class="cadwolfThisspace.Workspace.editEditButton"></div>
                                        <div ng-if="cadwolfThisspace.Workspace.editUsePerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'open')" class="permOpen">Everyone</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'use', 'list')" class="permList">As Listed</div></div></div>
                                    </div>
                                    <div class="permWrapper" permType="view"><div ng-class="cadwolfThisspace.Workspace.viewClass" ng-click="changePermEdits(cadwolfThisspace.Workspace.id, 'view')">{{cadwolfThisspace.Workspace.viewText}}</div><div ng-click="changePermUsers(cadwolfThisspace.Workspace.id, 'view')" ng-class="cadwolfThisspace.Workspace.editEditButton"></div>
                                        <div ng-if="cadwolfThisspace.Workspace.editViewPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'open')" class="permOpen">Everyone</div></div><div class="permSelectLine"><div ng-click="changePermission(cadwolfThisspace.Workspace.id, 'view', 'list')" class="permList">As Listed</div></div></div>
                                    </div>
                                </div>
                                <div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.adminUsers">
                                    <div id="errorLine">admin permissions for {{cadwolfThisspace.Workspace.name}}</div>
                                    <div class="enterUserLine"><input class="newUser" permtype="admin" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('admin', cadwolfThisspace.Workspace.id)"></div>
                                    <div class="usersBlock"><div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" class="permUser" permtype="admin" ng-if="permObj.Permission.admin=='1'" >{{permObj.Permission.username}}<div class="permDelete" permtype="admin" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('admin', permObj.Permission.userid, cadwolfThisspace.Workspace.id)"></div></div></div>
                                </div>    
                                <div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.editUsers">
                                    <div id="errorLine">edit permissions for {{cadwolfThisspace.Workspace.name}}</div>
                                    <div class="enterUserLine"><input class="newUser" permtype="edit" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('edit', cadwolfThisspace.Workspace.id)"></div>
                                    <div class="usersBlock"><div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" class="permUser" permtype="edit" ng-if="permObj.Permission.edit=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="edit" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('edit', permObj.Permission.userid, cadwolfThisspace.Workspace.id)"></div></div></div>
                                </div>    
                                <div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.useUsers">
                                    <div id="errorLine">use permissions for {{cadwolfThisspace.Workspace.name}}</div>
                                    <div class="enterUserLine"><input class="newUser" permtype="use" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('use', cadwolfThisspace.Workspace.id)"></div>
                                    <div class="usersBlock"><div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" class="permUser" permtype="use" ng-if="permObj.Permission.use=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="use" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('use', permObj.Permission.userid, cadwolfThisspace.Workspace.id)"></div></div></div>
                                </div>    
                                <div class="editUserBlock" ng-if="cadwolfThisspace.Workspace.viewUsers">
                                    <div id="errorLine">view permissions for {{cadwolfThisspace.Workspace.name}}</div>
                                    <div class="enterUserLine"><input class="newUser" permtype="view" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('view', cadwolfThisspace.Workspace.id)"></div>
                                    <div class="usersBlock"><div ng-repeat="permObj in cadwolfThisspace.Permissions track by permObj.Permission.id" class="permUser" permtype="view" ng-if="permObj.Permission.view=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="view" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('view', permObj.Permission.userid, cadwolfThisspace.Workspace.id)"></div></div></div>
                                </div>    
                            </li>
                            <div id="partPermissionContent" ng-repeat="obj in cadwolfWorkspace | orderBy:$parent.sortMe track by obj.Workspace.id">
                                <ol class="systemBlock isFile" systemID="{{obj.Workspace.thisAddress}}">
                                    <li class="systemLine" systemID="{{obj.Workspace.thisAddress}}">
                                        <div ng-class="obj.Workspace.divClass"></div>
                                        <div class="systemPermName">{{obj.Workspace.name}}</div>
                                        <div class="permBar">
                                            <div class="permWrapper" permType="admin"><div ng-class="obj.Workspace.adminClass" ng-click="changePermEdits(obj.Workspace.id, 'admin')" systemID="obj.Workspace.thisAddress">{{obj.Workspace.adminText}}</div><div ng-click="changePermUsers(obj.Workspace.id, 'admin')" ng-class="obj.Workspace.adminEditButton"></div>
                                                <div ng-if="obj.Workspace.editAdminPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'admin', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'admin', 'list')" class="permList">As Listed</div></div></div>
                                            </div>
                                            <div class="permWrapper" permType="edit"><div ng-class="obj.Workspace.editClass" ng-click="changePermEdits(obj.Workspace.id, 'edit')" systemID="obj.Workspace.thisAddress">{{obj.Workspace.editText}}</div><div ng-click="changePermUsers(obj.Workspace.id, 'edit')" ng-class="obj.Workspace.editEditButton"></div>
                                                <div ng-if="obj.Workspace.editEditPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'edit', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'edit', 'list')" class="permList">As Listed</div></div></div>
                                            </div>
                                            <div class="permWrapper" permType="use"><div ng-class="obj.Workspace.useClass" ng-click="changePermEdits(obj.Workspace.id, 'use')" systemID="obj.Workspace.thisAddress">{{obj.Workspace.useText}}</div><div ng-click="changePermUsers(obj.Workspace.id, 'use')" ng-class="obj.Workspace.editEditButton"></div>
                                                <div ng-if="obj.Workspace.editUsePerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'use', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'use', 'open')" class="permOpen">Everyone</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'use', 'list')" class="permList">As Listed</div></div></div>
                                            </div>
                                            <div class="permWrapper" permType="view"><div ng-class="obj.Workspace.viewClass" ng-click="changePermEdits(obj.Workspace.id, 'view')" systemID="obj.Workspace.thisAddress">{{obj.Workspace.viewText}}</div><div ng-click="changePermUsers(obj.Workspace.id, 'view')" ng-class="obj.Workspace.editEditButton"></div>
                                                <div ng-if="obj.Workspace.editViewPerms" class="permSelectBox"><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'view', 'inherit')" class="permInherit">Inherited</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'view', 'open')" class="permOpen">Everyone</div></div><div class="permSelectLine"><div ng-click="changePermission(obj.Workspace.id, 'view', 'list')" class="permList">As Listed</div></div></div>
                                            </div>
                                        </div>
                                        <div class="editUserBlock" ng-if="obj.Workspace.adminUsers">
                                            <div id="errorLine">admin permissions for {{obj.Workspace.name}}</div>
                                            <div class="enterUserLine"><input class="newUser" permtype="admin" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('admin', obj.Workspace.id)"></div>
                                            <div class="usersBlock"><div ng-repeat="permObj in obj.Permissions track by permObj.Permission.id" class="permUser" permtype="admin" ng-if="permObj.Permission.admin=='1'" >{{permObj.Permission.username}}<div class="permDelete" permtype="admin" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('admin', permObj.Permission.userid, obj.Workspace.id)"></div></div></div>
                                        </div>    
                                        <div class="editUserBlock" ng-if="obj.Workspace.editUsers">
                                            <div id="errorLine">edit permissions for {{obj.Workspace.name}}</div>
                                            <div class="enterUserLine"><input class="newUser" permtype="edit" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('edit', obj.Workspace.id)"></div>
                                            <div class="usersBlock"><div ng-repeat="permObj in obj.Permissions track by permObj.Permission.id" class="permUser" permtype="edit" ng-if="permObj.Permission.edit=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="edit" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('edit', permObj.Permission.userid, obj.Workspace.id)"></div></div></div>
                                        </div>    
                                        <div class="editUserBlock" ng-if="obj.Workspace.useUsers">
                                            <div id="errorLine">use permissions for {{obj.Workspace.name}}</div>
                                            <div class="enterUserLine"><input class="newUser" permtype="use" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('use', obj.Workspace.id)"></div>
                                            <div class="usersBlock"><div ng-repeat="permObj in obj.Permissions track by permObj.Permission.id" class="permUser" permtype="use" ng-if="permObj.Permission.use=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="use" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('use', permObj.Permission.userid, obj.Workspace.id)"></div></div></div>
                                        </div>    
                                        <div class="editUserBlock" ng-if="obj.Workspace.viewUsers">
                                            <div id="errorLine">view permissions for {{obj.Workspace.name}}</div>
                                            <div class="enterUserLine"><input class="newUser" permtype="view" placeholder="Enter User Name" ng-model="$parent.$parent.newUserName" ng-enter="addUserPerm('view', obj.Workspace.id)"></div>
                                            <div class="usersBlock"><div ng-repeat="permObj in obj.Permissions track by permObj.Permission.id" class="permUser" permtype="view" ng-if="permObj.Permission.view=='1'">{{permObj.Permission.username}}<div class="permDelete" permtype="view" username="{{permObj.Permission.username}}" ng-click="deleteUserPerm('view', permObj.Permission.userid, obj.Workspace.id)"></div></div></div>
                                        </div>    
                                    </li>
                                </ol>
                            </div>
                        </ol>
                    </div>
                </div>

            </div>
        </div>
    </div>
    
    <script src="http://www.cadwolf.com/js/angular/angular.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/angular-sanitize.min.js"></script>
    <script src="http://www.cadwolf.com/js/angular/httpBackend.js"></script>
    <script src="http://www.cadwolf.com/js/angular/ngDialog.min.js"></script>
    <script src="http://www.cadwolf.com/js/workspaces/app.js"></script>
    <script src="http://www.cadwolf.com/js/workspaces/controllers.js"></script>
    <script src="http://www.cadwolf.com/js/workspaces/directives.js"></script>
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
	<!--<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>-->
    <script type="text/ng-template" id="deleteDialog">
        <div>
            <h2>Confirm Delete</h2>
            <div>You are preparing to delete a file or folder named "{{ngDialogData.Workspace.name}}".  Please confirm this or cancel.</div>
            <div class="ngdialog-buttons">
                <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click=closeThisDialog("Cancel")>Cancel</button>
                <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>
            </div>
        </div>
    </script>
    <script>angular.bootstrap(document, ['workspaceApp']);</script>


</body>
