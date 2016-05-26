// CONTROLLERS
/*
This is the main controller file for the workspace module of CADWOLF.

mainController

getInitialData      - makes the initial call to the server to grab the data

placeInitialData    - places the data into the scope - called from getInitialData upon completion

showInitialError    - shows the error if the data failed to be read correctly

showMain            - handles the display of the main components - files or permissions

deleteClick         - called when the user clicks on the delete item. It brings up a modal window to give the user another warning

deleteItem          - called if the user clicks in the modal window to confirm the deletion of the item. It calls the server and removes the item from the DOM upon success


filesController

moveUpOneFolder     - called when the user moves up one level

goToAddress         - called when a user clicks on the link to go to a file and moves the user to that location

changeName          - called whenever a user hits enter on a name change enter box. Checks the name to make sure its OK and then calls the update item algorithm

copyItem            - called when a user wants to copy an item. It calls the server to save the item and then adds it to the DOM

moveItem            - called when a user hits enter after editing the location to move the file to. The server is called and item is deleted from the DOM

checkClick          - 

changeRank          - 

addFileFolder       - 

changePermEdits     - On click, the options to change the permissions for a file or folder are shown - Inherit or List for admin and edit and inherit, list, or open for view and use

changePermUsers     - On click, the users with permissions on the current setting are shown along with an input box to add new users

*/
cadwolfApp.controller('workspacesController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {   
        
        $scope.getInitialData=function ()
        {   $scope.titleShow=true;
            $scope.displaySettings=false;
            $scope.displayInfo=true;
            $scope.fileDisplay=true;                        $scope.permissionDisplay = false;           
            $scope.fileClass="folders_current";             $scope.fileTextClass= "leftNavTextCurrent";      
            $scope.permissionClass="permissions";           $scope.permissionTextClass = "leftNavText";    
            $scope.sortMe='Workspace.rank';
            $scope.showImageUpload=false;
            $scope.showInsert=true;
            $scope.displayGoodMessage=false;
            $scope.displayBadMessage=false;
            $scope.goodMessageText="";
            $scope.badMessageText="";
            $scope.imageToReplace=0;
            $scope.newUserName='';            
            $scope.sortMe='Workspace.rank';
            $scope.cadwolfThisspace={};
            $scope.deleteTemplate='<div><h2>Confirm Delete</h2><div>You are preparing to delete a file or folder named {{ngDialogData.name}}.  Please confirm this or cancel.</div><div class="ngdialog-buttons"><button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click=closeThisDialog("Cancel")>Cancel</button><button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button></div></div>';
            $http.post('http://www.cadwolf.com/Workspaces/getInitialData', {fileURL:window.location.pathname}, {}).
            then(function(response)
                 {  myResponse=response;
                    tempData=response.data.subFiles;
                    $scope.userName=response.data.userName;
                    $scope.userID=response.data.userID;
                    $scope.cadwolfWorkspace=new Array;
                    $scope.cadwolfThisspace=JSON.parse(JSON.stringify(response.data.thisFile));
                    $scope.cadwolfPermTree=JSON.parse(JSON.stringify(response.data.permTree));
                    $scope.cadwolfPermissions=JSON.parse(JSON.stringify(response.data.permissions));
                    if ($scope.cadwolfPermissions['edit']=='1'){ $scope.showEditOptions=true; $scope.editPerm=true; }else{ $scope.showEditOptions=false; $scope.editPerm=false; }
                    if ($scope.cadwolfPermissions['edit']=='1'){ $scope.mainWrapperClass="workspace_contentswide"; }else{ $scope.mainWrapperClass="workspace_contents"; }
                    if ($scope.cadwolfPermissions['edit']=='1'){ $scope.showPerm=true; }else{ $scope.showPerm=false; }
                    for (var workspace in tempData) {   $scope.addEntry(tempData[workspace], workspace, 0); }
                    $scope.addEntry($scope.cadwolfThisspace, 0, 1);
                    if ($scope.editPerm)
                    {   var config =																																		
                        {   skin: 'kama',	uiColor:'#ECECEC',	extraPlugins : 'autogrow', removePlugins : 'elementspath',					
                            toolbarCanCollapse : false, width:'750', height:'75', margin:0, resize_enabled: false, sharedSpaces :  {  top : 'cktoolbar' },											
                            toolbar :  [ [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'Link', 'Unlink', 'Table', 'HorizontalRule', 'ShowBlocks', 'TextColor', 'BGColor', 'FontSize' ] ] 
                        };
                        CKEDITOR.replace( 'workspaceDescription', config );
                        CKEDITOR.instances.workspaceDescription.setData($scope.cadwolfThisspace['Workspace']['description']);
                    }else{  document.getElementById("workspaceDescription").innerHTML=$sce.trustAsHtml($scope.cadwolfThisspace['Workspace']['description']); }
 universal=$scope;
                 }, function(){ $scope.showMessage({type:"bad", messageText:"There was an error retrieving the data from the server"}, true); }); 
        }();

        $scope.addEntry=function(thisData, workspace, originalFlag)
        {   var fileID=workspace;
            if (originalFlag==0)
            {   $scope.cadwolfWorkspace[fileID]={};
                $scope.cadwolfWorkspace[fileID]=JSON.parse(JSON.stringify(thisData));
                thisObj=$scope.cadwolfWorkspace[fileID]; 
            }else{ thisObj=$scope.cadwolfThisspace; }
            var thisDate=thisData['Workspace']['created'].split(' ');
            cdate=new Date(thisDate[0]+'T'+thisDate[1]);
            thisObj['Workspace']['cdate']=new Date(thisDate[0]+'T'+thisDate[1]);
            var thisDate=thisData['Workspace']['modified'].split(' ');
            mdate=new Date(thisDate[0]+'T'+thisDate[1]);
            thisObj['Workspace']['mdate']=new Date(thisDate[0]+'T'+thisDate[1]);
            thisObj['Workspace']['oldName']=thisData['Workspace']['name'];
            thisObj['Workspace']['cdatesort']=parseInt(Date.UTC(cdate.getFullYear(), cdate.getMonth(), cdate.getDay(), cdate.getHours(), cdate.getMinutes(), cdate.getSeconds(), cdate.getMilliseconds()));
            thisObj['Workspace']['mdatesort']=parseInt(Date.UTC(mdate.getFullYear(), mdate.getMonth(), mdate.getDay(), mdate.getHours(), mdate.getMinutes(), mdate.getSeconds(), mdate.getMilliseconds()));
            thisObj['Workspace']['thisAddress']=window.location.pathname+'/'+thisData['Workspace']['name'].replace(' ','_');
            thisObj['Workspace']['rank']=parseInt(thisObj['Workspace']['rank']);
            thisObj['Workspace']['newRank']=parseInt(thisData['Workspace']['rank']);;
            thisObj['Workspace']['infoShow']=false;
            thisObj['Workspace']['imageShow']=false;
            thisObj['Workspace']['showEdit']=false;
            thisObj['Workspace']['showMove']=false;
            thisObj['Workspace']['showDesc']=false;
            thisObj['Workspace']['moveAddress']='';
            thisObj['Workspace']['typeClass']="workspace_filename";
            thisObj['Workspace']['typeImageClass']="workspace_file";
            thisObj['Workspace']['descriptionClass']="workspace_info";
            thisObj['Workspace']['adminEditButton']='';
            thisObj['Workspace']['editEditButton']='';
            thisObj['Workspace']['useEditButton']='';
            thisObj['Workspace']['viewEditButton']='';
            thisObj['Workspace']['adminUsers']=false;
            thisObj['Workspace']['editUsers']=false;
            thisObj['Workspace']['useUsers']=false;
            thisObj['Workspace']['viewUsers']=false;
            thisObj['Workspace']['editAdminPerms']=false;
            thisObj['Workspace']['editEditPerms']=false;
            thisObj['Workspace']['editUsePerms']=false;
            thisObj['Workspace']['editViewPerms']=false;
            if (($scope.admin=='1')||($scope.admin=='1a')||($scope.admin=='1b'))	
            {           lc="listPerm"; 		ic="inheritPerm"; 		oc="openPerm"; 		myedit='editList';	
            }else{ 		lc="listPermDemo"; 	ic="inheritPermDemo"; 	oc="openPermDemo"; 	myedit="";	                             }           
            if (thisData['Workspace']['admin_status']=='0'){                    thisObj['Workspace']['adminText']="Admin : As Listed"; 
                                                                                thisObj['Workspace']['adminClass']=lc;                   
                                                                                thisObj['Workspace']['adminEditButton']='editList';   }
            if (thisData['Workspace']['admin_status']=='2'){                    thisObj['Workspace']['adminText']="Admin : Inherited"; 
                                                                                thisObj['Workspace']['adminClass']=ic;                   }
            if (thisData['Workspace']['edit_status']=='0'){                     thisObj['Workspace']['editText']="Edit : As Listed"; 
                                                                                thisObj['Workspace']['editClass']=lc;                    
                                                                                thisObj['Workspace']['editEditButton']='editList';   }
            if (thisData['Workspace']['edit_status']=='2'){                     thisObj['Workspace']['editText']="Edit : Inherited"; 
                                                                                thisObj['Workspace']['editClass']=ic;                    }
            if (thisData['Workspace']['use_status']=='0'){                      thisObj['Workspace']['useText']="Use : As Listed"; 
                                                                                thisObj['Workspace']['useClass']=lc;                     
                                                                                thisObj['Workspace']['useEditButton']='editList';   }
            if (thisData['Workspace']['use_status']=='1'){                      thisObj['Workspace']['useText']="Use : Everyone"; 
                                                                                thisObj['Workspace']['useClass']=oc;                     }
            if (thisData['Workspace']['use_status']=='2'){                      thisObj['Workspace']['useText']="Use : Inherited"; 
                                                                                thisObj['Workspace']['useClass']=lc;                     }
            if (thisData['Workspace']['view_status']=='0'){                     thisObj['Workspace']['viewText']="View : As Listed"; 
                                                                                thisObj['Workspace']['viewClass']=lc;                    
                                                                                thisObj['Workspace']['viewEditButton']='editList';   }
            if (thisData['Workspace']['view_status']=='1'){                     thisObj['Workspace']['viewText']="View : Everyone"; 
                                                                                thisObj['Workspace']['viewClass']=oc;                    }
            if (thisData['Workspace']['view_status']=='2'){                     thisObj['Workspace']['viewText']="View : Inherited"; 
                                                                                thisObj['Workspace']['viewClass']=ic;                    }
            if (thisData['Workspace']['File_or_Folder']=='0') {                 thisObj['Workspace']['typeClass']="workspace_filename";
                                                                                thisObj['Workspace']['typeImageClass']="workspace_folder";   
                                                                                thisObj['Workspace']['divClass']="systemPermLogo";   
                                                                                thisObj['Workspace']['thisAddress']=thisObj['Workspace']['thisAddress'];   }
            if (thisData['Workspace']['File_or_Folder']=='1') {                 thisObj['Workspace']['typeClass']="workspace_filename";
                                                                                thisObj['Workspace']['typeImageClass']="workspace_file";   
                                                                                thisObj['Workspace']['divClass']="partPermLogo";   
                                                                                thisObj['Workspace']['thisAddress']=thisObj['Workspace']['thisAddress'].replace('/Workspaces/','/Documents/');   }
            if (thisData['Workspace']['File_or_Folder']=='2') {                 thisObj['Workspace']['typeClass']="workspace_filename";
                                                                                thisObj['Workspace']['divClass']="imagePermLogo";   
                                                                                thisObj['Workspace']['typeImageClass']="workspace_image";   }
            if (thisData['Workspace']['File_or_Folder']=='3') {                 thisObj['Workspace']['typeClass']="workspace_filename";
                                                                                thisObj['Workspace']['typeImageClass']="workspace_dataset";   
                                                                                thisObj['Workspace']['divClass']="datasetPermLogo";   
                                                                                thisObj['Workspace']['thisAddress']=thisObj['Workspace']['thisAddress'].replace('/Workspaces/','/Datasets/');   }
            if (thisData['Workspace']['File_or_Folder']=='4') {                 thisObj['Workspace']['typeClass']="workspace_filename";
                                                                                thisObj['Workspace']['typeImageClass']="workspace_parttree";   
                                                                                thisObj['Workspace']['divClass']="parttreePermLogo";   
                                                                                thisObj['Workspace']['thisAddress']=thisObj['Workspace']['thisAddress'].replace('/Workspaces/','/PartTrees/');   }
            if (thisData['Workspace']['File_or_Folder']=='1') 
            {   if (thisData['Workspace']['CheckedOut'])
                {   if (thisData['Workspace']['checkoutID']==$scope.userID){    thisObj['Workspace']['checkClass']="checkin_block"; 
                    }else {                                                     thisObj['Workspace']['checkClass']="workspace_checkout";   }
                }else{                                                          thisObj['Workspace']['checkClass']="workspace_checkout";   }
            }else if (thisData['Workspace']['File_or_Folder']=='2')
            {                                                                   thisObj['Workspace']['checkClass']="replaceImage"; 
            }else{                                                              thisObj['Workspace']['checkClass']="checkin_space";        }

        };

 
        $scope.showMain = function(num) {
            // Shows/hides the main content
            if (num==1)
            {   $scope.fileDisplay=true;                        $scope.permissionDisplay = false;           
                $scope.fileClass="folders_current";             $scope.fileTextClass= "leftNavTextCurrent";      
                $scope.permissionClass="permissions";           $scope.permissionTextClass = "leftNavText";   
                $scope.showInsert=true;
            }
            if (num==2)
            {   $scope.fileDisplay=false;                       $scope.permissionDisplay = true;           
                $scope.fileClass="folders";                     $scope.fileTextClass= "leftNavText";      
                $scope.permissionClass="permissions_current";   $scope.permissionTextClass = "leftNavTextCurrent";    
                $scope.showInsert=false;
            }
        };
     

        $scope.addFileFolder = function(option)			
        {	$http.post('http://www.cadwolf.com/workspaces/AddFileFolder', {option:option, page:window.location.pathname}, {}).
            then(function(response)
                 {  thisResponse=response;
                    $scope.addEntry(response.data, Object.keys($scope.cadwolfWorkspace).length);
                 }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error adding the item to the workspace'}, true); }
            ); 
        };						
     
        $scope.showMessage = function(message, setTo) 
        {   if (setTo===undefined){ setTo=true; }
            if (message.type=="good")
            {   $scope.goodMessageText=message.messageText;  
                $scope.displayGoodMessage=setTo;
                $scope.displayBadMessage=false;
            }else if (message.type=="bad")
            {   $scope.badMessageText=message.messageText;  
                $scope.displayBadMessage=setTo;
                $scope.displayGoodMessage=false;
            }
            if (setTo){ window.setTimeout(function(){ $scope.showMessage(message, false)}, 3000); }
        };
          
        $scope.saveTitle = function(thisID)			
        {	$http.post('http://www.cadwolf.com/workspaces/SaveTitle', {title:$scope.cadwolfThisspace.Workspace.title, fileID:thisID}, {}).
            then(function(response)
                 {  if (response.data=='1')
                    {                                       $scope.showMessage({type:'good', messageText:'The new title was saved'}, true);
                    }else if (response.data=="Error1") {    $scope.showMessage({type:'bad', messageText:'You do not have permission to edit the title'}, true); }
                 }, function(){                             $scope.showMessage({type:'bad', messageText:'There was an error saving the title'}, true); }
            ); 
        };						
    
        $scope.saveDescription = function(thisID)			
        {	$scope.cadwolfThisspace.Workspace.description=CKEDITOR.instances.workspaceDescription.getData();
            $http.post('http://www.cadwolf.com/workspaces/SaveDescription', {description:$scope.cadwolfThisspace.Workspace.description, fileID:thisID}, {}).
            then(function(response)
                 {  if (response.data=='1')
                    {                                       $scope.showMessage({type:'good', messageText:'The new description was saved'}, true);
                    }else if (response.data=="Error1") {    $scope.showMessage({type:'bad', messageText:'You do not have permission to edit the description'}, true); }
                 }, function(){                             $scope.showMessage({type:'bad', messageText:'There was an error saving the description'}, true); }
            ); 
        };						

    
    }
]);


cadwolfApp.controller('filesController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce, ngDialog)
    {   

        $scope.moveUpOneFolder = function() 
        {   var current=window.location.pathname.replace(/\/$/,'');
            current=current.replace(/^\//,'');	
            var split=current.split('/');		
            if (split.length==2) { var address="http://www.cadwolf.com"+window.location.pathname; 
            }else {     
                var address="http://www.cadwolf.com"; 	
                for (var a=0; a<split.length-1; a++) { address=address+'/'+split[a]; }	
            }	
            window.location.href=address;
        };

        
        $scope.goToAddress = function(thisID) 
        {   for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   if($scope.cadwolfWorkspace[workspace]['Workspace']['File_or_Folder']!='2')
                    {   var thisAddress=window.location.href.replace(/\/$/,'')+'/'+$scope.cadwolfWorkspace[workspace]['Workspace']['name'].replace(/ /g,'_');
                        if ($scope.cadwolfWorkspace[workspace]['Workspace']['File_or_Folder']=='1'){ thisAddress=thisAddress.replace('/Workspaces/','/Documents/'); }
                        if ($scope.cadwolfWorkspace[workspace]['Workspace']['File_or_Folder']=='3'){ thisAddress=thisAddress.replace('/Workspaces/','/Datasets/'); }
                        if ($scope.cadwolfWorkspace[workspace]['Workspace']['File_or_Folder']=='4'){ thisAddress=thisAddress.replace('/Workspaces/','/PartTrees/'); }
                        thisAddress=thisAddress.replace(/\/$/,'');
                        window.location.href = thisAddress;
                    }
                }
            }
        };

        $scope.changeName = function(thisID) 
        {   for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   console.log('The new and old names are '+$scope.cadwolfWorkspace[workspace]['Workspace']['name']+' and '+$scope.cadwolfWorkspace[workspace]['Workspace']['oldName']);
                    if (($scope.cadwolfWorkspace[workspace]['Workspace']['name']=='')||($scope.cadwolfWorkspace[workspace]['Workspace']['name']==$scope.cadwolfWorkspace[workspace]['Workspace']['oldName']))
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['name']=$scope.cadwolfWorkspace[workspace]['Workspace']['oldName'];
                    }else
                    {   var re=/[a-zA-Z0-9\s\-\ ]+/;	
                        newName=$scope.cadwolfWorkspace[workspace]['Workspace']['name'].replace(/.jpg|.png|.tiff|.jpeg|.gif|.bmp$/g,'');
                        var test=re.exec(newName);	
                        if (test[0]!=newName)
                        {   $scope.showMessage({type:'bad', messageText:'Names of items can only have letters, numbers, and spaces'}, true);
                        }else
                        {   newName=newName.replace(/ /g,'_');	
                            $http.post('http://www.cadwolf.com/Workspaces/UpdateName', { fileID:thisID, newName:$scope.cadwolfWorkspace[workspace]['Workspace']['name'], image:0 }, {}).
                            then(function(response)
                            {   if (response.data=='1'){                 $scope.showMessage({type:'good', messageText:'The name was successfully changed'}, true); 
                                }else if (response.data=='Error1') {     $scope.showMessage({type:'bad', messageText:'The name submitted was already taken'}, true);
                                }else if (response.data=='Error2') {     $scope.showMessage({type:'bad', messageText:'You do not have permission to change this name'}, true);      }
                            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error in communicating that name to the server.'}, true); }); 
                        }
                    }
                }
            }
         
        };

        $scope.copyItem = function(thisID) 
        {   $http.post('http://www.cadwolf.com/Workspaces/CopyFileFolder', { fileID:thisID }, {}).
            then(function(response)
            {   $scope.showMessage({type:'bad', messageText:'That item was successfully copied'}, true); 
                $scope.addItem(response.data); 
            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating the copy information to the server'}, true); }); 
        };

        $scope.moveItem = function(thisID, newAddress) 
        {   for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   rank=$scope.cadwolfWorkspace[workspace]['Workspace']['rank'];
                    $http.post('http://www.cadwolf.com/Workspaces/MoveFileFolder', {fileID:thisID, newAddress:$scope.cadwolfWorkspace[workspace]['Workspace']['moveAddress'] }, {}).
                    then(function(response)
                    {   if (response.data=='1'){      
                            $scope.showMessage({type:'good', messageText:'That item was successfully moved'}, true); 
                            for (var workspace in $scope.cadwolfWorkspace)
                            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                                {   $scope.cadwolfWorkspace.splice(workspace, 1); }
                            }
                        }else if (response.data=='Error1') {     $scope.showMessage({type:'bad', messageText:'That name was already taken in that folder'}, true);
                        }else if (response.data=='Error2') {     $scope.showMessage({type:'bad', messageText:'You do not have permission to move that item to that location'}, true);      }
                    }, function(){ $scope.showMessage({type:'bad', messageText:'There was a problem communicating that move to the server'}, true); }); 
                }
            }
        };        
        
        $scope.deleteClick = function (thisID) 
        {   for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   var toPass=$scope.cadwolfWorkspace[workspace];
            }   }
            ngDialog.openConfirm({ data: toPass, template: 'deleteDialog' }).then(
                function(value) {
				    //send the ajax to delete the file
                    $http.post('http://www.cadwolf.com/Workspaces/DeleteFileFolder', { fileID:thisID }, {}).
                    then(function(response)
                    {   if (response.data=='1')
                        {   $scope.showMessage({type:'good', messageText:'That item was successfully deleted'}, true); 
                            $scope.deleteItem(thisID);
                        }
                    }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that deletion to the server'}, true); }); 
                },
                function(value) {
				    //Cancel or do nothing
                }
            );
        };      

        // A called function which removes an item from the main object
        $scope.deleteItem = function (thisID) 
        {   var thisRank=0;
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   thisRank=$scope.cadwolfWorkspace[workspace]['Workspace']['rank'];  }
            }
            for (var workspace in $scope.cadwolfWorkspace)
            {   if ($scope.cadwolfWorkspace[workspace]['Workspace']['rank']>thisRank)
                {   $scope.cadwolfWorkspace[workspace]['Workspace']['rank']=$scope.cadwolfWorkspace[workspace]['Workspace']['rank']-1;  }
            }
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   //delete $scope.cadwolfWorkspace[workspace];
                    $scope.cadwolfWorkspace.splice(workspace, 1); }
            }
        };
        

        // The user has clicked on an item to checkout or checkin an item or replace an image
        $scope.checkClick = function (thisID) 
        {   if ($scope.cadwolfPermissions['edit']=='1')
            {   for (var workspace in $scope.cadwolfWorkspace)
                {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                    {   if ($scope.cadwolfWorkspace[workspace]['Workspace']['checkClass']=='workspace_checkout')                                     // The user has opted to check out the item
                        {   $http.post('http://www.cadwolf.com/Workspaces/CheckoutDocument', { fileID:thisID }, {}).
                            then(function(response)
                            {   if(response.data=='1')
                                {   $scope.showMessage({type:'good', messageText:'That item was successfully checked out'}, true); 
                                    $scope.changeProperty(thisID, 'checkClass', "checkin_block");
                                    $scope.cadwolfWorkspace[workspace]['Workspace']['checkClass']="checkin_block";  
                                }else
                                {   if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to check that item out'}, true);    }
                                }
                            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that permission change to the server'}, true); }); 
                        }else if ($scope.cadwolfWorkspace[workspace]['Workspace']['checkClass']=='checkin_block')                                   // The user has opted to check in the item
                        {   if ($scope.cadwolfWorkspace[workspace]['Workspace']['CheckedOut']==$scope.userName)
                            {   $http.post('http://www.cadwolf.com/Workspaces/CheckinDocument', { fileID:thisID }, {}).
                                then(function(response)
                                {   if(response.data=='1')
                                    {   $scope.showMessage({type:'good', messageText:'Item was successfully checked in'}, true); 
                                        $scope.changeProperty(thisID, 'checkClass', "workspace_checkout");
                                        $scope.cadwolfWorkspace[workspace]['Workspace']['checkClass']="workspace_checkout";  
                                    }else
                                    {   if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to check that item in'}, true);    }
                                    }
                                }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that permission change with the server'}, true); }); 
                            }                    
                        }else if ($scope.cadwolfWorkspace[workspace]['Workspace']['checkClass']=='replaceImage')                                    // The user wants to reupload an image to replace it
                        {   $scope.imageToReplace=thisID;
                            document.getElementById('replaceImageUpload').click();
                        }
                    }
                }
            }else{ $scope.showMessage({type:'bad', messageText:'You do not have permission to check that item in or out'}, true); }
        };      

        $scope.changeProperty = function(fileID, thisProperty, thisSetting) 
        {   for (var workspace in $scope.cadwolfWorkspace)
            {   if (fileID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   $scope.cadwolfWorkspace[workspace]['Workspace'][thisProperty]=thisSetting;  }
            }
        }
        
        $scope.uploadImage = function(files) 
        {   var fd = new FormData();
            //Take the first selected file
            fd.append("image", files[0]);
            fd.append("folder",  window.location.pathname.replace(/ /g,'_'));	
         $http.post('http://www.cadwolf.com/Workspaces/UploadImage', fd, {
               withCredentials: true,
               headers: {'Content-Type': undefined },
               transformRequest: angular.identity
            }).success( function(response){ $scope.showImageUpload=false; $scope.addEntry(response.data); } )
                .error( function(response){ $scope.showMessage({type:'bad', messageText:'There was an error uploading the image'}, true); } );
        };	
        
        $scope.replaceImage = function(files) 
        {   var fd = new FormData();
            //Take the first selected file
            fd.append("image", files[0]);
            fd.append("folder",  window.location.pathname.replace(/ /g,'_'));	
            fd.append("imageID", $scope.imageToReplace );		
            $http.post('http://www.cadwolf.com/Workspaces/reUploadImage', fd, {
               withCredentials: true,
               headers: {'Content-Type': undefined },
               transformRequest: angular.identity
            }).success( function(response) 
                        {   if(response.data=='1'){         $scope.showMessage({type:'good', messageText:'Image successfully replaced'}, true);    }
                            if(response.data=='Error1'){    $scope.showMessage({type:'bad', messageText:'You do not have permission to re-upload that image'}, true);    }
                            if(response.data=='Error2'){    $scope.showMessage({type:'bad', messageText:'The re-uploaded image must be of the same type as the original'}, true);    }
                        })
            .error( function(response){ $scope.showMessage({type:'bad', messageText:'There was an error uploading the image'}, true); });
        };	

        // The user has changed the rank of an item through the dropdown box
        $scope.changeRank = function (thisID) 
        {   var thisRank=0, newRank=0;
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   thisRank=parseInt($scope.cadwolfWorkspace[workspace]['Workspace']['rank']);  
                    newRank=parseInt($scope.cadwolfWorkspace[workspace]['Workspace']['newRank']);  }
            }
            $http.post('http://www.cadwolf.com/Workspaces/changeRank', { fileID:thisID, rank:newRank, oldrank:thisRank }, {}).
            then(function(response)
            {   if(response.data=='1')
                {   $scope.showMessage({type:'good', messageText:'The rank of that item was changed'}, true);
                    if (newRank>thisRank)
                    {   for (var workspace in $scope.cadwolfWorkspace)
                        {   if (($scope.cadwolfWorkspace[workspace]['Workspace']['rank']>thisRank)&&($scope.cadwolfWorkspace[workspace]['Workspace']['rank']<=newRank))
                            {   $scope.cadwolfWorkspace[workspace]['Workspace']['rank']=$scope.cadwolfWorkspace[workspace]['Workspace']['rank']-1;  }
                        }
                    }
                    if (newRank<thisRank)
                    {   for (var workspace in $scope.cadwolfWorkspace)
                        {   if (($scope.cadwolfWorkspace[workspace]['Workspace']['rank']>=newRank)&&($scope.cadwolfWorkspace[workspace]['Workspace']['rank']<thisRank))
                            {   $scope.cadwolfWorkspace[workspace]['Workspace']['rank']=parseInt($scope.cadwolfWorkspace[workspace]['Workspace']['rank'])+1;  }
                        }
                    }
                    for (var workspace in $scope.cadwolfWorkspace)
                    {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['rank']=parseInt($scope.cadwolfWorkspace[workspace]['Workspace']['newRank']);  }
                    }
                }else
                {   if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to change the rank on that item'}, true);    }
                }
            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that rank change with the server'}, true); }); 

        };
            
    }
]);

cadwolfApp.controller('permissionController', ['$scope', '$http', '$sce', 'ngDialog',
    function($scope, $http, $sce)
    {   
        // Show the permissions available for a given item 
        $scope.changePermEdits=function(thisID, type)
        {   console.log('In the perm edits function with id and type of '+thisID, type);
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   if (type=="admin")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['editAdminPerms']=!$scope.cadwolfWorkspace[workspace]['Workspace']['editAdminPerms'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editEditPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsePerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editViewPerms']=false; }
                    if (type=="edit")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['editAdminPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editEditPerms']=!$scope.cadwolfWorkspace[workspace]['Workspace']['editEditPerms'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsePerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editViewPerms']=false; }
                    if (type=="use")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['editAdminPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editEditPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsePerms']=!$scope.cadwolfWorkspace[workspace]['Workspace']['editUsePerms'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editViewPerms']=false; }
                    if (type=="view")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['editAdminPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editEditPerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsePerms']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editViewPerms']=!$scope.cadwolfWorkspace[workspace]['Workspace']['editViewPerms']; }
                }
            
            }
        };

        // Show the list of users and input line for a given permission to edit, use, view, or with admin on an item
        $scope.changePermUsers=function(thisID, type)
        {   console.log('In the perm edits function with id and type of '+thisID, type);
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   if (type=="admin")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminUsers']=!$scope.cadwolfWorkspace[workspace]['Workspace']['adminUsers'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['useUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['viewUsers']=false; }
                    if (type=="edit")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsers']=!$scope.cadwolfWorkspace[workspace]['Workspace']['editUsers'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['useUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['viewUsers']=false; }
                    if (type=="use")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['useUsers']=!$scope.cadwolfWorkspace[workspace]['Workspace']['useUsers'];
                        $scope.cadwolfWorkspace[workspace]['Workspace']['viewUsers']=false; }
                    if (type=="view")
                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['editUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['useUsers']=false;
                        $scope.cadwolfWorkspace[workspace]['Workspace']['viewUsers']=!$scope.cadwolfWorkspace[workspace]['Workspace']['viewUsers']; }
                }
            
            }
        };
        
        // Function for when a user changes the permission of the admin, edit, use, or view on an item --- needs ajax
        $scope.changePermission=function(thisID, permType, permSetting)
        {   console.log('The parameters sent to change the permissions are '+thisID+' - '+permType+' - '+permSetting);
            var thisPerm=0;
            for (var workspace in $scope.cadwolfWorkspace)
            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                {   $http.post('http://www.cadwolf.com/Workspaces/updatePermission', { fileID:thisID, permType:permType, permSetting:permSetting }, {}).
                    then(function(response)
                    {   if((response.data!="Error1")&&(response.data!="Error2")&&(response.data!="Error3"))
                        {   
                            
                            for (var workspace in $scope.cadwolfWorkspace)
                            {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                                {   if (permSetting=="open")    {   thisPerm=1;    }
                                    if (permSetting=="list")    {   thisPerm=0;    }
                                    if (permSetting=="inherit") {   thisPerm=2;    }
                                    if (permType=="admin")      
                                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['admin_status']=thisPerm;  
                                        if (permSetting=="list")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminText']="Admin : As Listed"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['adminClass']="listPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['adminEditButton']='editList';    
                                        }
                                        if (permSetting=="inherit")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['adminText']="Admin : Inherited"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['adminClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['adminEditButton']='';    
                                        }
                                    }
                                    if (permType=="edit")      
                                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['edit_status']=thisPerm;  
                                        if (permSetting=="list")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['editText']="Edit : As Listed"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['editClass']="listPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['editEditButton']='editList';    
                                            $scope.changePermission(thisID, 'admin', 'list');
                                        }
                                        if (permSetting=="inherit")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['editText']="Edit : Inherited"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['editClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['editEditButton']='';    
                                        }
                                    }
                                    if (permType=="use")      
                                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['use_status']=thisPerm;  
                                        if (permSetting=="list")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['useText']="Use : As Listed"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useClass']="listPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useEditButton']='editList';    
                                            $scope.changePermission(thisID, 'edit', 'list');
                                        }
                                        if (permSetting=="inherit")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['useText']="Use : Inherited"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useEditButton']='';    
                                        }
                                        if (permSetting=="open")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['useText']="Use : Everyone"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['useEditButton']='';    
                                            $scope.changePermission(thisID, 'view', 'open');
                                        }
                                    }
                                    if (permType=="view")      
                                    {   $scope.cadwolfWorkspace[workspace]['Workspace']['view_status']=thisPerm;  
                                        if (permSetting=="list")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['viewText']="View : As Listed"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewClass']="listPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewEditButton']='editList';    
                                            $scope.changePermission(thisID, 'use', 'list');
                                        }
                                        if (permSetting=="inherit")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['viewText']="View : Inherited"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewEditButton']='';    
                                            if ($scope.cadwolfWorkspace[workspace]['Workspace']['use_status']=='1'){ $scope.changePermission(thisID, 'use', 'inherit'); }
                                        }
                                        if (permSetting=="open")
                                        {   $scope.cadwolfWorkspace[workspace]['Workspace']['viewText']="View : Everyone"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewClass']="inheritPerm"; 
                                            $scope.cadwolfWorkspace[workspace]['Workspace']['viewEditButton']='';    
                                        }
                                    }

                                    if (permType=="edit")       {   $scope.cadwolfWorkspace[workspace]['Workspace']['edit_status']=thisPerm;  }
                                    if (permType=="use")        {   $scope.cadwolfWorkspace[workspace]['Workspace']['use_status']=thisPerm;  }
                                    if (permType=="view")       {   $scope.cadwolfWorkspace[workspace]['Workspace']['view_status']=thisPerm;  }
                            }   }
                        }else if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to change that user permission'}, true);    
                        }else if(response.data=="Error2"){   $scope.showMessage({type:'bad', messageText:'That user name already has that permission'}, true);    
                        }else if(response.data=="Error3"){   $scope.showMessage({type:'bad', messageText:'No user by that name was found'}, true);    }
                    });
                }
            }
        };
        
        // Function for when a user permission is deleted. --- needs ajax
        $scope.deleteUserPerm=function(permType, userID, thisID)
        {   $http.post('http://www.cadwolf.com/Workspaces/deleteUserPerm', { fileID:thisID, userID:userID, permType:permType }, {}).
            then(function(response)
            {   if ((response.data!="Error1")&&(response.data!="Error2")&&(response.data!="Error3"))
                {   permData=response.data;
                    for (var workspace in $scope.cadwolfWorkspace)
                    {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                        {   var flag=0;
                            for (var thisUser in $scope.cadwolfWorkspace[workspace]['Permissions'])
                            {   if ($scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]['Permission']['userid']==permData.userID)
                                {   flag=1;
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]['Permission']['admin']=parseInt(permData.admin);   
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]['Permission']['edit']=parseInt(permData.edit); 
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]['Permission']['use']=parseInt(permData.use);  
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]['Permission']['view']=parseInt(permData.view);
                                    if((permData.admin=="0")&&(permData.edit=="0")&&(permData.use=="0")&&(permData.view=="0"))
                                    { delete $scope.cadwolfWorkspace[workspace]['Permissions'][thisUser]; }
                                }
                            }
                        }
                    }
                }else if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to delete a user permission'}, true);    
                }else if(response.data=="Error2"){   $scope.showMessage({type:'bad', messageText:'That user name already has that permission'}, true);    
                }else if(response.data=="Error3"){   $scope.showMessage({type:'bad', messageText:'No user by that name was found'}, true);    }
            
            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that user change with the server'}, true); }); 
        };

        			        
        // Function for when a user permission is added
        $scope.addUserPerm=function(permType, thisID)
        {   console.log('The inputs are '+thisID+', '+permType+', '+$scope.newUserName);
            var lastIndex=0, permData={};
            $http.post('http://www.cadwolf.com/Workspaces/addUserPerm', { fileID:thisID, userName:$scope.newUserName, permType:permType }, {}).
            then(function(response)
            {   if ((response.data!="Error1")&&(response.data!="Error2")&&(response.data!="Error3"))
                {   permData=response.data;
                    for (var workspace in $scope.cadwolfWorkspace)
                    {   if (thisID==$scope.cadwolfWorkspace[workspace]['Workspace']['id'])
                        {   console.log('I am here with '+$scope.cadwolfWorkspace[workspace]['Workspace']['id']);
                            var flag=0;
                            for (var permID in $scope.cadwolfWorkspace[workspace]['Permissions'])
                            {   console.log('Comparing '+$scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['userid']+' to '+permData.userID);
                                if ($scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['userid']==permData.userID)
                                {   console.log('OK, so this was set');
                                    flag=1;
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['admin']=parseInt(permData.admin);
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['edit']=parseInt(permData.edit);
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['use']=parseInt(permData.use);
                                    $scope.cadwolfWorkspace[workspace]['Permissions'][permID]['Permission']['view']=parseInt(permData.view);
                                }
                            }
                            if (flag==0)
                            {   lastIndex=Object.keys($scope.cadwolfWorkspace[workspace]['Permissions']).length;
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]={};
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['username']=$scope.newUserName;
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['userid']=permData.userID;
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['id']=permData.permID;
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['workspace_type']='1';
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['admin']=parseInt(permData.admin);
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['edit']=parseInt(permData.edit);
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['use']=parseInt(permData.use);
                                $scope.cadwolfWorkspace[workspace]['Permissions'][lastIndex]['Permission']['view']=parseInt(permData.view);
                            }
                         $scope.newUserName='';
                        }
                    }
                }else if(response.data=="Error1"){   $scope.showMessage({type:'bad', messageText:'You do not have permission to add a new user permission'}, true);    
                }else if(response.data=="Error2"){   $scope.showMessage({type:'bad', messageText:'That user name already has that permission'}, true);    
                }else if(response.data=="Error3"){   $scope.showMessage({type:'bad', messageText:'No user by that name was found'}, true);    }
            }, function(){ $scope.showMessage({type:'bad', messageText:'There was an error communicating that user change with the server'}, true); }); 
        };
        
    
    }
]);


