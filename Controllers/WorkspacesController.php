<?php

class WorkspacesController extends AppController {

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------- The default action this simply lists the files and folders in a given folder ------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the default function that is called whenever the page is loaded. It grabs the data and checks the permissions.												\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() 																																			//
	{	if ((Router::url(null, true)=="http://www.cadwolf.com/Workspaces")||(Router::url(null, true)=="http://www.cadwolf.com/Workspaces/")) 							//
  	     	{ $this->redirect("http://www.cadwolf.com/Workspaces/".preg_replace("/ /","_",$this->Auth->user('username'))); }											//
        $this->layout='workspaces';																																		//
		$DirInfo=$this->Get_FolderID(Router::url(null, true));																											//
// 		$this->set('DirInfo', $DirInfo);  																																//
        $editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), Router::url(null, true));													       				//	
        $viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), Router::url(null, true));															     		//	
        $usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), Router::url(null, true));					      												//	
        $adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), Router::url(null, true));					      											//	
        $Permissions=array('admin'=> $adminPerm, 'edit'=> $editPerm, 'use'=> $usePerm, 'view'=> $viewPerm);					    										//	
		$this->set('Permissions',$Permissions);																															//
		$this->set('timezone', $this->Auth->user('time zone'));																											//
    	$this->set('myurl', Router::url(null, true), array());																											//
		$this->set('myid', $DirInfo['ID']);																																//
		$FileInfo=$this->GetFileInfo($DirInfo, "FileInfo", 0);																											//	
		$this->set("FileInfo", $FileInfo);																																//	
    }																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- The function that grabs the initial data on page load ------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getInitialData() 		                     																											//
{	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileURL=$params['fileURL'];			                   																					             			//
    $DirInfo=$this->Get_FolderID($fileURL);		                   																										//
    $editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);														       				            //	
    $viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), $fileURL);																     		            //	
    $usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $fileURL);					      													                //	
    $adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $fileURL);					      												                //	
    $Permissions=array('admin'=> $adminPerm, 'edit'=> $editPerm, 'use'=> $usePerm, 'view'=> $viewPerm);					    											//	
	$fileInfo=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));																	//	
    $myFiles = $this->Workspace->find('all', array('conditions' => array('Workspace.parent_id' => $DirInfo['ID']), 'order' => array('Workspace.rank ASC', 'Workspace.modified DESC', 'Workspace.File_or_Folder ASC'), 'recursive'=>'-1'));	//
    
    if (($Permissions['edit']=='1')||($Permissions['admin']=='1')||($Permissions['view']=='1'))											      							//
    {   foreach ($myFiles as $Index=>$thisFolder)																		         										//
        {	$tempPerms = $this->Permission->find('all', array('conditions' => array('workspace_id' => $thisFolder['Workspace']['id'])));          						//
            $myFiles[$Index]['Permissions']=$tempPerms;																							       					//
	   }																																			          			//
    }																																				          			//
    $permissionTree=$this->getPermTree($DirInfo['ID']);                 																								//
    $returnObject=Array();                                                                                                                                              //
    $returnObject['userName']=$this->Auth->user('username');                                                                                                            //
    $returnObject['userID']=$this->Auth->user('id');                                                                                                                    //
    $returnObject['subFiles']=$myFiles;                                                                                                                                 //
    $returnObject['thisFile']=$fileInfo;                                                                                                                                //
    $returnObject['permTree']=$permissionTree;                                                                                                                          //
    $returnObject['permissions']=$Permissions;                                                                                                                          //
    echo(json_encode($returnObject));	   																													          	//
}	      																																								//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- The function that grabs specific items ----------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function GetFileInfo($DirInfo, $Data, $itemid) 																													//
{	if ($Data=="FileInfo") 																																				//
	{	Controller::loadModel('Workspace');																																//
		$ReturnData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 																//
		return $ReturnData;																																				//
}	}																																									//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ The function that grabs the permissions tree ------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called on page load. It grabs all folders above the current folder and gets their info. 															// 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getPermTree($fileID) 																																	//
{	$treeData=$this->Workspace->getPath($fileID);																														//
	Controller::loadModel('Permission');																																//
	foreach ($treeData as $index=>$thisFolder)																															//
	{	$thisID=$thisFolder['Workspace']['id'];																															//
		$tempData=$this->Permission->find('all', array('conditions' => array('workspace_id' => $thisID))); 																//
		$treeData[$index]['Permissions']=array();																														//	
		$treeData[$index]['Permissions']=$tempData;																														//	
	}																																									//	
	return $treeData;																																					//
}																																										//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- This function is given a slug representing the URL and determines the id of the current folder -----------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FolderID($slug) {																																//
		$slug=str_replace("http://www.cadwolf.com/Workspaces/",'',$slug);																								//
		$slug=str_replace("/Workspaces/",'',$slug);																														//
		$slug=str_replace("Workspaces/",'',$slug);																														//
//		$slug=preg_replace('/[\/]+$/','',$slug);																														//
		$slug=preg_replace('/\/$/','',$slug);																															//
		$slug=preg_replace('/\_/',' ',$slug); 																															//
//		$slug=preg_replace('/^\//','',$slug);																															//
		$slug_array=explode('/',$slug);																																	//
		$idarr='';																																						// Given the url slug, this function finds the ID number for the
		$prev_id=0;																																						// current folder. This is done by simply starting at the workspace
		for ($i=0; $i<count($slug_array); $i++) {																														// and then walking through the path until you get the right ID
		    if ($i==0) 	{ $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>NULL )); 								// 
		    }else		{ $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 	}						//
			$prev_id=$id;																																				//
			$idarr=$idarr.'-'.$id; 																																		//													
		}																																								//
		$DirInfo=array();																																				//
		$DirInfo['ID']=$id;																																				//
		$DirInfo['Name']=preg_replace("/_/"," ",$slug_array[$i-1]);																										//
		$DirInfo['IDArr']=$idarr;																																		//
		if (count($slug_array)==1) { $DirInfo['parentid']=NULL; }else{ $DirInfo['parentid']=$idarr[count($idarr)-1];	}												//
		$temp=$this->Workspace->getPath($id);																															//
		$path='';																																						//
		if (sizeof($temp)>0){	foreach ($temp as $index=>$thisfolder){	$path=$path.'/'.$thisfolder['Workspace']['name'];	} }											//
		$type=$this->Workspace->field('File_or_Folder', array('id' => $DirInfo['ID'] ));																				//
		if ($type=="0") { $DirInfo['address']="http://www.cadwolf.com/Workspaces".$path;	$DirInfo['type']="Folder"; 	}												//
		if ($type=="1") { $DirInfo['address']="http://www.cadwolf.com/Documents".$path;		$DirInfo['type']="File";	}												//
		return $DirInfo;																																				//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- This function saves the workspace description ---------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function SaveDescription() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
 	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $description=$params['description'];	                  																					             			//
    $fileID=$params['fileID'];			                      																					             			//
	$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);                                                                                    //
	if ($editPerm=='1')																																					//
	{	$this->Workspace->id=$fileID;						          																									// 
		$this->Workspace->saveField('description', $description);																										//   
		echo('1');																												                            			//
	}else { echo('Error1'); }		                                                                                            										//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- This function saves the workspace title ---------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function SaveTitle() 																																			//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
 	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $title=$params['title'];			                     																					             			//
    $fileID=$params['fileID'];			                      																					             			//
	$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);                                                                                    //
    if ($editPerm=='1')																																					//
	{	$this->Workspace->id=$fileID;		          																													// 
		$this->Workspace->saveField('title', $title);																													//   
		echo('1');	                               																														//
	}else { echo('Error1'); }		                                                                                    												//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GET THE PERMISSIONS FOR A GIVEN USER FOR A GIVEN FILE OR FOLDER ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the new algorithm for determining permissions for a user on a specific file and folder. It takes in a permission type, a user ID, and a URL for the file.	\
	It then looks to see if there are permissions set for that permission type or if it is inherited. If permissions are indeed set and are set for everyone then a 1 	\
	is returned. If permissions are set with a list of users then the list is searched. If the user is on the list and given permission then a 1 is returned as well.	\
	If the user is on the list and denied permission then a 0 is returned. If the permission inherits from above then the final chunk of the address is removed and 	\
	the function is called again.																																		\
	permType 	- the type of permission being looked at - admin, edit, use, or view																					\
	userID		- the ID of the user being looked at																													\
	fileURL		- the URL of the file being looked at. It is in the form of PartTree/The_Wolf/My_Part_Tree																\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function Get_Permissions($permType, $userID, $fileURL) 																											//
{  	$DirInfo=$this->Get_FolderID($fileURL);																																//
	Controller::loadModel('Workspace');																																	//
    $FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));																	//
	if ($FileData['Workspace'][$permType.'_status']==2)																													//
	{	$newFile=preg_replace('/\/[0-9A-Za-z-_]+$/','',$fileURL);																										//
		return $this->Get_Permissions($permType, $userID, $newFile);																									//
	}elseif	($FileData['Workspace'][$permType.'_status']==1)																											//
	{	return 1;																																						//
	}elseif	($FileData['Workspace'][$permType.'_status']==0)																											//
	{	Controller::loadModel('Permission');																															//
		if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$userID, $permType=>'1')))														//  
		{	return 1; 																																					//	
		}else																																							//
		{	$flag=0;																																					//
			Controller::loadModel('Groupuser');																															//
//			$groupData=$this->Groupuser->find('all', array('conditions' => array('userid' => $userID )));																//
//			if ((sizeof($groupData)>0)&&(isset($groupData)))																											//
//			{	foreach ($goupData as $index=>$thisFolder)																												//
//				{	if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$thisFolder[$index]['Groupuser']['groupid'], $permType=>'1')));		//
//					{	$flag=1;	}																																	//
//			}	}																																						//
//			if ($flag==1){ return 1; }else { return 0; }																												//
		}																																								//
	}else { return 0; }		 																																			//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GET THE PERMISSIONS FOR A GIVEN USER FOR A GIVEN FILE OR FOLDER ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the new algorithm for determining permissions for a user on a specific file and folder. It takes in a permission type, a user ID, and a file ID.         	\
	It then looks to see if there are permissions set for that permission type or if it is inherited. If permissions are indeed set and are set for everyone then a 1 	\
	is returned. If permissions are set with a list of users then the list is searched. If the user is on the list and given permission then a 1 is returned as well.	\
	If the user is on the list and denied permission then a 0 is returned. If the permission inherits from above then the final chunk of the address is removed and 	\
	the function is called again.																																		\
	permType 	- the type of permission being looked at - admin, edit, use, or view																					\
	userID		- the ID of the user being looked at																													\
	fileURL		- the URL of the file being looked at. It is in the form of PartTree/The_Wolf/My_Part_Tree																\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getPermissionsFromID($permType, $userID, $fileID) 																										//
{  	Controller::loadModel('Workspace');																																	//
	$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));		        															//
	if ($FileData['Workspace'][$permType.'_status']==2)																													//
	{	return $this->getPermissionsFromID($permType, $userID, $FileData['Workspace']['parent_id']);			               											//
	}elseif	($FileData['Workspace'][$permType.'_status']==1)																											//
	{	return 1;																																						//
	}elseif	($FileData['Workspace'][$permType.'_status']==0)																											//
	{	Controller::loadModel('Permission');																															//
		if ($this->Permission->hasAny(array('workspace_id' => $fileID, 'userid'=>$userID, $permType=>'1')))		         												//  
		{	return 1; 																																					//	
		}else																																							//
		{	return 0;																																					//
		}																																								//
	}else { return 0; }		 																																			//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------- This function adds a file or a folder to a workspace ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function called whenever a user wants to add a file, folder, dataset, or part tree to the current workspace. The function enters the item if the user 	\
	has permissions and then enters a line in the permissions database granting the user doing the adding full permissions to the current item.							\
	After this, the code prepares and sends back the data needed to display the item in the workspace.																	\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function AddFileFolder() {																																	//
  	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																						//
		$this->autorender = false;																																		//
 		$this->layout = null;																																			// 
  	    $this->render('ajax');																																			// 
        $params = json_decode(file_get_contents('php://input'),true);                                                                                                   //
        $option=$params['option'];			                   																					             			//
        $thisPage=$params['page'];			                   																					             			//
		$DirInfo=$this->Get_FolderID($thisPage);		                																								// 
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisPage);			                       													//	
	    if (!$option) { throw new NotFoundException(__('Need an option')); }																							//
																																										//
	    if ($editPerm=='1')																																				//
	    {	$data = array();																																			//
			$data['Workspace']['parent_id'] = $DirInfo['ID'];																											//
            $count=$this->Workspace->find('count',  array('conditions' => array('parent_id' => $DirInfo['ID'])));													    //
            $data['Workspace']['rank'] = $count+1;																														//
			$nameflag=0;																																				//
			while ($nameflag==0)																																		//
			{	$num=rand(90,1000);																																		//
				if ($option==1) { $name="New Folder - ".$num; 																											//
				}elseif ($option==2) { $name="New File - ".$num; 																										//
				}elseif ($option==3) { $name="New Dataset - ".$num; 																									//
				}elseif ($option==4) { $name="New Part Tree - ".$num; }																									//
				if ($this->Workspace->hasAny(array('parent_id' => $DirInfo['parentid'], 'name'=>$name))) { }else { $nameflag=1; }										//
			}																																							//
			if ($option==1) { $data['Workspace']['name'] = $name; $data['Workspace']['File_or_Folder'] = '0'; }															//
			if ($option==2) { $data['Workspace']['name'] = $name; $data['Workspace']['File_or_Folder'] = '1'; }															//
			if ($option==3) { $data['Workspace']['name'] = $name; $data['Workspace']['File_or_Folder'] = '3'; }															//
			if ($option==4) { $data['Workspace']['name'] = $name; $data['Workspace']['File_or_Folder'] = '4'; }															// 
			if (($this->Workspace->hasAny(array('parent_id' => null, 'id'=>$DirInfo['ID'])))&&($option==1))																//
			{		$data['Workspace']['admin_status']=0; $data['Workspace']['view_status']=1; $data['Workspace']['edit_status']=0; $data['Workspace']['use_status']=1;	// 
			}else { $data['Workspace']['admin_status']=0; $data['Workspace']['view_status']=1; $data['Workspace']['edit_status']=2; $data['Workspace']['use_status']=1;}// 
	        $data['Workspace']['creator']=$this->Auth->user('id');																										//
	        $data['Workspace']['rank']=$count+1;																														//
	        $this->Workspace->create();																																	//
			$this->Workspace->save($data);																																//
																																										//				
			$lastid=$this->Workspace->getLastInsertID();																												//
		    $this->loadModel('Permission');																																//
		    $data = array();																																			//
	        $data['Permission']['workspace_id']=$lastid;																												//
	        $data['Permission']['userid']=$this->Auth->user('id');																										//  
	        $data['Permission']['view']='1';																															// 
	        $data['Permission']['use']='1';																																// 
	        $data['Permission']['edit']='1';																															//
	        $data['Permission']['admin']='1';																															//
	        $this->Permission->create();																																//
			$this->Permission->save($data);																																//
																																										//
			if ($option==3) 																																			//
    		{	Controller::loadModel('Dataset');																														//
			    $data = array();																																		//
		        $data['Dataset']['id']=$lastid;																															//  
		        $this->Dataset->create();																																//
				$this->Dataset->save($data);																															//
    		}																																							// 
			$newData=$this->Workspace->find('first',  array('conditions' => array('id' => $lastid)));																	//
            echo(json_encode($newData));			                                                 																	//
	    }else {	echo('Error1');  }				                                                                                             							//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- FUNCTIONS CALLED FROM THE MAIN SECTION OF THE WORKSPACE FILE ------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- This function is called to update the name of a folder or file -----------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is pretty straight forward. Whenever a user changes the name of a folder, it simply makes those changes in the database after it makes sure that. The	\
	user has permission to edit the item in question. Note that the user must be able to edit the name of the item in question and not the parent folder.				\
	fileID  - The ID of the file whose name is being changed																											\
	newName - The name that the file or folder is to be changed to if successful																						\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function UpdateName() 																																			//
{	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $newName=$params['newName'];			                   																					             			//
	$newName= preg_replace('/_/',' ', $newName);																														// 
    $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);                                                                                    //
 	if ($editPerm=='1')																																					//
	{	$thisFile = $this->Workspace->find('first', array('conditions' => array('id' => $fileID)));				          												//
		if ($this->Workspace->hasAny(array('parent_id' => $thisFile['Workspace']['parent_id'], 'name'=>$newName)))														// 
	    {   echo('Error1');	                                                   																							//
	    }else																																							// 
		{	$this->Workspace->id=$fileID;					          																									// 
		    $this->Workspace->saveField('name', $newName);																												//   
	    	echo('1');	                               																													//
	    }																																								//
	}else { echo('Error2'); }		                                                                                            										//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- This function copies a file or a folder and all of its contents -------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the main function for copying a file or folder or dataset. The function looks at the type of item to be copied and takes the appropriate action. For a file	\
	or dataset this simply means copying the specific item. For a folder, this means copying all the relevant contents in a recursive manner so that all subsequent 	\
	files are copied. Note that only the items that the user can edit are copied.																						\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function CopyFileFolder() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							// 
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
    $this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
	$spaceData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));		           															//
    $this->loadModel('Workspace');																																		//		
    $editPerm=getPermissionsFromID('edit', $userID, $spaceData['Workspace']['parent_id']);                                                                              //
    $viewPerm=getPermissionsFromID('view', $userID, $fileID);                                                                                                           //
    if (($editPerm==1)&&($viewPerm==1))		           																													//
	{	$this->CopyItem($spaceData['Workspace']['parent_id'], $fileID, 1);               																				//
	}else { echo('Error1'); }	                                                                                                                                 		//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------- This is the function that actually copies an item -----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function to copy files, datasets, folders and their contents. It does this by looping through the first child level in the folder tree and either 		\
	calling the function to save the file or using recursion to save the folder. Note that when a folder is copied, the top level is renamed with a - copy while all 	\
	child files and folder keep their old name as they are not in the same folder.																						\
	$parentID	-	The id of the parent folder that the copied item is to placed into. 																				\
	$fileID 	- 	The URL of the item to be copied. 																													\
	$option		-	A 1 or a 0. A 1 means that the name is altered to denote it as a copy. This is only done for the top level so that there are no duplicate names.	\
																																										\
	The function works in three steps. The first step is a single line where the code ensures that the user has permission to view the folder in question. If this is	\
	the case, the code then copies the line from the database and alters the name if the option is 1. It also adds a permission line with full permissions for the		\
	creator. In the third step, the code loops through the content of the folder and calls the copy function for the appropriate item in question.						\
																																										\
	NOTE - I may need to address the interfile links to ensure that they are transferred to the copied files.															\
																																										\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function CopyItem($parentID, $fileID, $option) 																													//
{	$viewPerm=getPermissionsFromID('view', $userID, $fileID);                                                                                                           //
    if (($viewPerm=='1')&&($fileID!=NULL))														          																//
	{	$thisData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));		          														//
		$thisarray=array();																																				// 
		foreach ($thisData['Workspace'] as $key=>$value){	$thisarray['Workspace'][$key]=$thisData['Workspace'][$key];  }												// 
		$thisarray['Workspace']['parent_id']=$parentID;																													// 
		$thisarray['Workspace']['view_status']='1';																														// 
		$thisarray['Workspace']['use_status']='1';																														// 
		$thisarray['Workspace']['edit_status']='0';																														//
		$thisarray['Workspace']['admin_status']='0';																													//
		$thisarray['Workspace']['CheckedOut']=NULL;																														//
		$thisarray['Workspace']['checkoutID']=0;																														//
		$thisarray['Workspace']['creator']=$this->Auth->user('id');																										//
		$thisarray['Workspace']['id']=NULL;																																//
    	$Count=$this->Workspace->find('count',  array('conditions' => array('parent_id' => $parentID)));																//
		$thisarray['Workspace']['rank']=$Count+1;																														//
		if ($option=="1") 																																				//
		{ 	$nameflag=0;																																				//
			while ($nameflag==0)																																		//
			{	$num=rand(90,1000);																																		//
				$name=$thisData['Workspace']['name']." - ".$num;  																										//
				if ($this->Workspace->hasAny(array('parent_id' => $thisarray['Workspace']['parent_id'], 'name'=>$name))) { }else { $nameflag=1; }						//
				}																																						//
			$thisarray['Workspace']['name']=$name;																														//
		}else { $thisarray['Workspace']['name']=$thisData['Workspace']['name'];	}																						//
		$this->Workspace->create();																																		// 
		$this->Workspace->save($thisarray);																																//
		$newid=$this->Workspace->getLastInsertID();																														//	
		$DOM_Object=json_decode($thisarray['Workspace']['locations'], true);																							//
		$newDOM=array();																																				//	
		foreach ($DOM_Object as $key=>$value)																															//
		{	$fileString='File'.$fileID;																												         			//
			$newFileString='File'.$newid;																																//
			$str = preg_replace('/'.$fileString.'/', $newFileString, $key);																								//
			$DOM_Object[$key]['name']=$str; 																															// 
			$newDOM[$str]=$DOM_Object[$key]; 																															// 
		}																																								//
    	$this->Workspace->saveField('locations', json_encode($newDOM));																									//   
	    $this->loadModel('Permission');																																	//
	    $data = array();																																				//
	    $data['Permission']['workspace_id']=$newid;																														//
	    $data['Permission']['userid']=$this->Auth->user('id');																											// 
	    $data['Permission']['username']=$this->Auth->user('username');																									// 
	    $data['Permission']['workspace_type']='0';																														//
	    $data['Permission']['view']='1';																																// 
	    $data['Permission']['use']='1';																																	// 
	    $data['Permission']['edit']='1';																																// 
	    $data['Permission']['admin']='1';																																//
	    $this->Permission->create();																																	//
		$this->Permission->save($data);																																	//
		if ($thisData['Workspace']['File_or_Folder']==0)																												//
		{	$directChildren = $this->Workspace->children($fileID, true);																		      					//
			foreach ($directChildren as $index=>$thisChild)			 																									//
			{	$this->CopyItem($newid, $thisChild['Workspace']['id'], 0); }			                                       											//
		}																																								//
		if ($thisData['Workspace']['File_or_Folder']==1)																												//
		{	$this->loadModel('Document');																																//
			$DocData=$this->Document->find('all', array('conditions' => array('fileid' => $fileID)));												        			//
			foreach ($DocData as $index=>$data)																															//
			{	$thisdata=$data;																																		//
				$pattern='/^File[0-9]+/';																																//
				$replacement='File'.$newid;																																//
				$newItemID=preg_replace("/^File[0-9]+/", $replacement, $data['Document']['itemid']);																	//
				$thisdata['Document']['id']=$newItemID;																													//
				$thisdata['Document']['itemid']=$newItemID;																												//
				$thisdata['Document']['fileid']=$newid;																													//
				$this->Document->create();																																//  
				$this->Document->save($thisdata);																														//
            }																																							//
		}																																								//
		if ($thisData['Workspace']['File_or_Folder']==2)																												//
		{	$this->loadModel('Workspace');																																//
			$imageData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));												           			//
			if ($imageData['Workspace']['type']=="image/jpg") { $endtype="jpg"; }																						//
			if ($imageData['Workspace']['type']=="image/jpeg") { $endtype="jpeg";}																						//
			if ($imageData['Workspace']['type']=="image/gif") { $endtype="gif"; }																						//
			if ($imageData['Workspace']['type']=="image/bmp") { $endtype="bmp"; }																						//
			if ($imageData['Workspace']['type']=="image/png") { $endtype="png"; }																						//
			$oldImage=$_SERVER['DOCUMENT_ROOT'].'/UserImages/'.$fileID.'.'.$endtype;													    							//
			$newImage=$_SERVER['DOCUMENT_ROOT'].'/UserImages/'.$newid.'.'.$endtype;																						//
			$this->Workspace->id=$newid;																																// 
	    	$this->Workspace->saveField('type', $imageData['Workspace']['type']);																						//   
			copy ( $oldImage , $newImage );																																//
		}																																								//
		if ($thisData['Workspace']['File_or_Folder']==3)																												//
		{	$this->loadModel('Dataset');																																//
			$DocData=$this->Dataset->find('first', array('conditions' => array('id' => $fileID)));											        					//
			$thisdata=$DocData;																																			//
			$thisdata['Dataset']['id']=$newid;																															//
			$this->Dataset->create();																																	//  
			$this->Dataset->save($thisdata);																															//
		}																																								//
		if ($thisData['Workspace']['File_or_Folder']==4)																												//
		{	$directChildren = $this->Workspace->children($fileID, true);																			     				//
			foreach ($directChildren as $index=>$thisChild)			 																									//
			{	$this->CopyItem($newid, $thisChild['Workspace']['id'], 0); }				                                      										//
		}																																								//
        if ($option=='1'){   echo($this->Workspace->find('first', array('conditions' => array('id' => $newid)))); }                                                     //
	}else { echo('Error2'); }		                                                                                            										//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- This function moves a file or a folder and all of its contents --------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function "moves" a file or folder to a new place. To do this, the code makes sure that the user has permission to edit the current location that the file is	\
	being moved from and the location that the file is being moved to. It then sets the parent folder of the item in question to the desired location and updates the 	\
	ranks in both places.																																				\
	fileID     - The old address of the item to be moved																												\
	newURL     - The new address the item is being moved to																												\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function MoveFileFolder() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			// 
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $newURL=$params['newAddress'];			                   																					             			//
    $fileInfo=$this->Workspace->find('first',  array('conditions' => array('id' => $fileID)));		            														//
    $parent=$fileInfo['Workspace']['parent_id'];                                                                                                                        //
    $rank=$fileInfo['Workspace']['rank'];                                                                                                                               //
    $newDirInfo=$this->Get_FolderID($newURL);																															//
    $editPerm1=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	$editPerm2=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileInfo['Workspace']['parent_id']);			    										//
	$editPerm3=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $newDirInfo['ID']);																			//
	if (($editPerm1!='1')||($editPerm2!='1')||($editPerm3!='1'))																										//
	{	echo('Error1'); 	                                                                                                                                            //
	}elseif ($newDirInfo['ID']==null)																																	//
	{	echo('Error2'); 		}	                                                         																			//
	else																																								//
	{	$Count=$this->Workspace->find('count',  array('conditions' => array('id' => $newDirInfo['ID'])));																//
		$this->Workspace->id=$fileID;	           																														// 
	    $this->Workspace->saveField('parent_id', $newDirInfo['ID']);																									//   
	    $this->Workspace->saveField('rank', $Count+1);																													//   
		$this->Workspace->updateAll(																																	//
			array('Workspace.rank' => 'Workspace.rank-1'),																												//	
			array('Workspace.parent_id' => $parent, 'Workspace.rank >=' => $rank)																						//
		);																																								//
		echo('1');                            																															//
	} 																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- This function deletes a file or a folder from a workspace ----------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function deletes files, folders, databases, images, and part trees. The algorithm is not as good as it should be. It deletes files and images with no problem	\
	but it requires that a folder be empty before it can be deleted. Part trees and databases are deleted immediately.													\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function DeleteFileFolder() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			// 
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
	$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	$fileData=$this->Workspace->find('first',  array('conditions' => array('id' => $fileID)));		           															//	
    if ($editPerm=="1")                                                                                                                                                 //
    {   if ($fileData['Workspace']['File_or_Folder']=='0')																												//
        {	$Count=$this->Workspace->find('count',  array('conditions' => array('parent_id' => $fileID)));													        	//
            if ($Count==0)                  																															//
            {	$this->loadModel('Workspace');																															//
                $this->Workspace->delete($fileData['Workspace']['id'], true);																							//
                $this->loadModel('Document');																															//
                $this->Document->deleteAll(array('fileid' => $fileData['Workspace']['id']), true);																		//
                echo(json_encode(array('text'=>' ')));																													//			
            }elseif($Count>0) 																																			//
            {	echo('Error2');		}		                                                                  															//			
        }																																								//			
        if ($fileData['Workspace']['File_or_Folder']=='1')																												//
        {	$this->loadModel('Workspace');														      													       			//
            $this->Workspace->delete($fileData['Workspace']['id'], true);																			      				//
            $this->loadModel('Document');																										     					//
            $this->Document->deleteAll(array('fileid' => $fileData['Workspace']['id']), true);											       							//
        }																																								//
        if ($fileData['Workspace']['File_or_Folder']=='2')																												//
        {	$this->Workspace->delete($fileID, true); 																				     					            //
            if ($fileData['Workspace']['type']=="image/jpg") { $endtype="jpg"; }												    									//
            if ($fileData['Workspace']['type']=="image/jpeg") { $endtype="jpeg";}											    							     		//
            if ($fileData['Workspace']['type']=="image/gif") { $endtype="gif"; }									       												//
            if ($fileData['Workspace']['type']=="image/bmp") { $endtype="bmp"; }								    													//
            if ($fileData['Workspace']['type']=="image/png") { $endtype="png"; }							     														//
            $endtype=preg_replace("/^image\//","",$endtype);									       																	//
            unlink($_SERVER['DOCUMENT_ROOT'].'/UserImages/'.$fileID.'.'.$endtype);			       		      													        //
        }																																								//
        if ($fileData['Workspace']['File_or_Folder']=='3')																												//
        {	$this->Workspace->delete($fileID, true); 																										            //
            $this->loadModel('Dataset');																												    			//
            $this->Dataset->delete($fileID, true); 																									    		        //
        }																																								//
        if ($fileData['Workspace']['File_or_Folder']=='4')																												//
        {	$this->Workspace->delete($fileID, true); 																						       				        //
        }																																								//
        echo('1');				      																																	//
    }else{ echo('Error1'); }																																			//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------- This function checks out a file for the user ----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function CheckoutDocument() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
    $this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	if ($editPerm=='1')																																					//
	{	$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));		          														//
		if ($FileData['Workspace']['CheckedOut']==NULL)																													//
	    {	$this->Workspace->id=$fileID;		          																												// 
	  		$this->Workspace->saveField('CheckedOut', $this->Auth->user('username'));																					//
	  		$this->Workspace->saveField('checkoutID', $this->Auth->user('id'));																							//
			echo('1');	                                                          																						//			
		}else{	echo('Error2');		}			                                                          																//			
	}else																																								//
	{	echo('Error1');		}					                                                                              											//			
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- This function checks in a file for the user ----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function CheckinDocument() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	if ($editPerm=='1')																																					//
	{	$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));			         													//
		if (($FileData['Workspace']['checkoutID']==$this->Auth->user('id')))																							//
		{	$this->Workspace->id=$fileID;	          																													// 
			$this->Workspace->saveField('CheckedOut', NULL);																											//
			$this->Workspace->saveField('checkoutID', 0);																												//
			echo('1');	                                                          																						//			
		}else{	echo('Error2');		}					                                                                                								//			
	}else																																								//
	{	echo('Error1');	}		                                                                                                                                      	//			
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------- CHANGE THE RANK OF A FILE -----------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function changeRank() 																																			//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
 	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $rank=$params['rank'];			                       																					                   			//
    $oldRank=$params['oldrank'];			               																					                   			//
    $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	if ($editPerm=='1')																																					//
	{	$TempData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID))); 	          															//
		$parentID=$TempData['Workspace']['parent_id'];																													//
		if ($rank<$oldRank)																																				//
		{	$this->Workspace->updateAll(																																//
				array('Workspace.rank' => 'Workspace.rank+1'),																											//	
				array('Workspace.parent_id' => $parentID, 'Workspace.rank >=' => $rank, 'Workspace.rank <' => $oldRank)													//
			);																																							//
		}elseif ($rank>$oldRank)																																		//
		{	$this->Workspace->updateAll(																																//
				array('Workspace.rank' => 'Workspace.rank-1'),																											//	
				array('Workspace.parent_id' => $parentID, 'Workspace.rank <=' => $rank, 'Workspace.rank >' => $oldRank)													//
			);																																							//
		}																																								//
		$this->Workspace->id=$fileID;			           																												// 
	    $this->Workspace->saveField('rank', $rank);																														//   
        echo('1');                                                                                                                                                      //
    }else																																								//
	{	echo('Error1');		}				                                                                                       										//			
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------- SET THE RANK OF A FILE --------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function setRank() 				      																															//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
 	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $rank=$params['rank'];			                       																					                   			//
    $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);																					//
	if ($editPerm=='1')																																					//
	{	$this->Workspace->id=$fileID;		          																													// 
	    $this->Workspace->saveField('rank', $rank);																														//   
	}else																																								//
	{		}					                                                                                                      									//			
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- FUNCTIONS RELATED TO THE PERMISSIONS ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- ADD A USER PERMISSION TO THE PART TREE ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is adding a permission for a user. The code updates the permission and then ensures that the user has all subsequent permissions.	\
	For example, if the user is being given permission to use the file then they are also given permission to view the file.											\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function addUserPerm() {																																			//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $userName=$params['userName'];			                       																					               		//
    $permType=$params['permType'];                                                                                                                                      //
	$userName=preg_replace('/_/',' ', $userName);																														//
    $adminPerm=$this->getPermissionsFromID('admin', $this->Auth->user('id'), $fileID);																					//
	if ($adminPerm=='1')																																				//
	{	Controller::loadModel('Permission');																															//
		if ($this->Permission->hasAny(array('workspace_id' => $fileID, 'username'=>$userName, $permType=>'1'))) 									     				//  
		{	echo('Error2');				                                                 																				//
		}elseif ($this->Permission->hasAny(array('workspace_id' => $fileID, 'username'=>$userName))) 													        		//  
		{	$permData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $fileID, 'username' => $userName), 'recursive'=>-1));		        //
			$view=1;																																					//
			$use=0;																																						//
			$edit=0;																																					//
			$admin=0;																																					//
			if ($permType=="use")	{ $use=1; }																															//
			if ($permType=="edit")	{ $edit=1; 	$use=1; }																												//
			if ($permType=="admin")	{ $admin=1; $edit=1; $use=1; }																										//
			$this->Permission->id=$permData['Permission']['id'];																										// 
			$this->Permission->saveField('admin', $admin);																												// 
			$this->Permission->saveField('edit', $edit);																												// 
			$this->Permission->saveField('use', $use);																													// 
			$this->Permission->saveField('view', $view);																												// 
			echo(json_encode(array('userID'=>$permData['Permission']['userid'],'userName'=>$userName,'permID'=>$permData['Permission']['id'],'admin'=>$admin,'edit'=>$edit,'use'=>$use,'view'=>1)));		//
		}else 																																							//
		{	Controller::loadModel('User');																																//
			if ($this->User->hasAny(array('username'=>$userName))) 																										//  
			{	if ($this->User->hasAny(array('username'=>$userName))) 																									//  
				{	$userData=$this->User->find('first', array('conditions' => array('username' => $userName), 'recursive'=>-1));	$usertype=1;						//
					$thisarray=array();																																	// 
					$view=1;																																			//
					$use=0;																																				//
					$edit=0;																																			//
					$admin=0;																																			//
					if ($permType=="use")	{ $use=1; }																													//
					if ($permType=="edit")	{ $edit=1; 	$use=1; }																										//
					if ($permType=="admin")	{ $admin=1; $edit=1; $use=1; }																								//
					$thisarray['Permission']=array();																													// 
					$thisarray['Permission']['workspace_id']=$fileID;							           																//
					$thisarray['Permission']['workspace_name']='';	                																					//
					$thisarray['Permission']['username']=$userName;																										//
					$thisarray['Permission']['usertype']=$usertype;																										//
					$thisarray['Permission']['userid']=$userData['User']['id'];																							//
					$thisarray['Permission']['admin']=$admin;																											//
					$thisarray['Permission']['edit']=$edit;																												//
					$thisarray['Permission']['use']=$use;																												//
					$thisarray['Permission']['view']=$view; 																											//
					$this->loadModel('Permission');																														//
					$this->Permission->clear();																															// 
					$this->Permission->create();																														// 
					$this->Permission->save($thisarray);																												//
                    $permID=$this->Permission->getLastInsertID();							    																		//
                 echo(json_encode(array('userID'=>$userData['User']['id'],'userName'=>$userName,'permID'=>$permID,'admin'=>$admin,'edit'=>$edit,'use'=>$use,'view'=>1)));//
				}																																						//
			}else  { echo('Error3'); }												                                       												//
		} 																																								//
	}else { echo('Error1'); }		                                                																					//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- ADD A USER PERMISSION TO THE PART TREE ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is adding a permission for a user. The code updates the permission and then ensures that the user has all subsequent permissions.	\
	For example, if the user is being given permission to use the file then they are also given permission to view the file.											\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*
public function addUserPerm() {																																			//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
	$systemID=$this->request->data('systemID');																															//
	$PermTypse=$this->request->data('permType');																														//
	$userName=$this->request->data('userName');																															//
	$userName=preg_replace('/_/',' ', $userName);																														//
	$newID=preg_replace('/^\//','', $systemID);																															//
	$newID=preg_replace('/_/',' ', $newID);																																//
	$DirInfo=$this->Get_FolderID('http://www.cadwolf.com/Workspaces/'.$newID);																							//
	$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), 'http://www.cadwolf.com/Workspaces/'.$newID);													//
	if ($adminPerm=='1')																																				//
	{	Controller::loadModel('Permission');																															//
		if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'username'=>$userName))) 																	//  
		{	echo(json_encode(array('error'=>'Permission Already Exists')));																								//
		}else 																																							//
		{	Controller::loadModel('User');																																//
			if ($this->User->hasAny(array('username'=>$userName))) 																										//  
			{	if ($this->User->hasAny(array('username'=>$userName))) 																									//  
				{	$userData=$this->User->find('first', array('conditions' => array('username' => $userName), 'recursive'=>-1));	$usertype=1;						//
					$thisarray=array();																																	// 
					$thisarray['Permission']=array();																													// 
					$thisarray['Permission']['workspace_id']=$DirInfo['ID'];																							//
					$thisarray['Permission']['workspace_name']=$DirInfo['Name'];																						//
					$thisarray['Permission']['username']=$userName;																										//
					$thisarray['Permission']['usertype']=$usertype;																										//
					$thisarray['Permission']['userid']=$userData['User']['id'];																							//
					$thisarray['Permission']['admin']=0;																												//
					$thisarray['Permission']['edit']=0;																													//
					$thisarray['Permission']['use']=1;																													//
					$thisarray['Permission']['view']=1; 																												//
					$this->loadModel('Permission');																														//
					$this->Permission->clear();																															// 
					$this->Permission->create();																														// 
					$this->Permission->save($thisarray);																												//
					echo(json_encode(array('userid'=>$userData['User']['id'], 'usertype'=>$usertype, 'admin'=>0, 'edit'=>0, 'use'=>1, 'view'=>1)));						//
				}																																						//
			}else  { echo(json_encode(array('error'=>'No such user'))); }																								//
		} 																																								//
	}else { echo(json_encode(array('error'=>'You need admin permission'))); }																							//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- DELETE A USER PERMISSION FROM THE WORKSPACES -----------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is deleting a user permission from a system. The function deletes the line and returns nothing.										\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function deleteUserPerm() 																																		//
{	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $userID=$params['userID'];			                   																					                   			//
    $permType=$params['permType'];			                       																					               		//
    $adminPerm=$this->getPermissionsFromID('admin', $this->Auth->user('id'), $fileID);																					//
	Controller::loadModel('Workspace');																																	//
	$fileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID), 'recursive'=>-1));	        												//
	if ($adminPerm=='1')																																				//
	{	Controller::loadModel('Permission');																															//
		Controller::loadModel('User');																																	//
		$thisData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $fileID, 'userid'=>$userID)));		              						//
		$admin=(int)$thisData['Permission']['admin'];																													//
		if ($thisData['Permission']['admin']=='0')																														//
		{	$this->Permission->id=$thisData['Permission']['id'];																										// 
			$this->Permission->saveField($permType, '0');																												// 
            $sendData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $fileID, 'userid'=>$userID)));		              					//
			echo(json_encode(array('userID'=>$userID, 'fileID'=>$fileID, 'admin'=>$sendData['Permission']['admin'], 'edit'=>$sendData['Permission']['edit'], 'use'=>$sendData['Permission']['use'], 'view'=>$sendData['Permission']['view']))); 
		}else																																							//
		{	if ($this->Auth->user('id')==$fileData['Workspace']['creator'])																								//
			{	$this->Permission->id=$thisData['Permission']['id'];																									// 
				$this->Permission->saveField($permType, '0');																											// 
//				$this->Permission->delete(array('username' => $userName, 'workspace_id'=> $DirInfo['ID']) );															//
                $sendData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $fileID, 'userid'=>$userID)));		           					//
                echo(json_encode(array('userID'=>$userID, 'fileID'=>$fileID, 'admin'=>$sendData['Permission']['admin'], 'edit'=>$sendData['Permission']['edit'], 'use'=>$sendData['Permission']['use'], 'view'=>$sendData['Permission']['view']))); 
			}else { echo('Error2'); }		                                                                                      										//
		}																																								//
	}else { echo('Error1'); }					                                                 																		//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- UPDATE A PERMISSION FROM THE PART TREE -----------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the function called whenever a user updates the permissions for a workspace or file. It updates that permission and then makes specific changes to other	\
	permissions to ensure that the rules are followed.																													\
																																										\	
	Rules : Admin and Edit permissions cannot be set to everyone. They can only be set to a list or inherit																\
	When a permission is set to list, all higher permissions are set to list as well. An use permission cannot be for everyone while only some can view. Also,			\
		an edit perm cannot inherit while a view or use has a list.																										\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function updatePermission() 																																		//
{	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
    $fileID=$params['fileID'];			                   																					                   			//
    $permType=$params['permType'];			                       																					               		//
    $permission=$params['permSetting'];		                     																					               		//
    $adminPerm=$this->getPermissionsFromID('admin', $this->Auth->user('id'), $fileID);																					//
	Controller::loadModel('Workspace');																																	//
	$thisData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));	         																//
	$view=$thisData['Workspace']['view_status'];																														//
	$use=$thisData['Workspace']['use_status'];																															//
	$edit=$thisData['Workspace']['edit_status'];																														//
	$admin=$thisData['Workspace']['admin_status'];																														//
	if (($permType=='admin')&&($adminPerm=='1'))																														//
	{	Controller::loadModel('Workspace');																																//
	    $this->Workspace->id=$fileID;			           																												// 
		if ($permission=="list") 							{	$this->Workspace->saveField('admin_status', '0');	$admin=0;	}										// 
		if ($permission=="inherit") 						{ 	$this->Workspace->saveField('admin_status', '2');	$admin=2;	$edit=2;	$use=2;		$view=2; }		// 
		echo(json_encode(array('fileID'=>$fileID, 'perm'=>$permission, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));     								//
	}elseif ($adminPerm=='1')																																			//
	{	Controller::loadModel('Workspace');																																//
	    $this->Workspace->id=$fileID;	         																														// 
		if (($permType=="edit")&&($permission=="list")) 	{ 	$this->Workspace->saveField('edit_status', '0');	$edit=0;											// 
																$this->Workspace->saveField('admin_status', '0');	$admin=0;	}										// 
		if (($permType=="edit")&&($permission=="inherit"))	{ 	$this->Workspace->saveField('edit_status', '2');	$edit=2;											// 
																$this->Workspace->saveField('use_status', '2');		$use=2;												// 
																$this->Workspace->saveField('view_status', '2');	$view=2;	}										// 
		if (($permType=="use")&&($permission=="open")) 		{ 	$this->Workspace->saveField('use_status', '1');		$use=1;												// 
															 	$this->Workspace->saveField('view_status', '1');	$view=1;	}										// 
		if (($permType=="use")&&($permission=="list")) 		{ 	$this->Workspace->saveField('use_status', '0');		$use=0;												// 
																$this->Workspace->saveField('edit_status', '0');	$edit=0;											// 
																$this->Workspace->saveField('admin_status', '0');	$admin=0;	}										// 
		if (($permType=="use")&&($permission=="inherit")) 	{ 	$this->Workspace->saveField('use_status', '2');		$use=2;												// 
																$this->Workspace->saveField('view_status', '2');	$view=2;	}										// 
		if (($permType=="view")&&($permission=="open")) 	{ 	$this->Workspace->saveField('view_status', '1');	$view=1;	}										// 
		if (($permType=="view")&&($permission=="inherit"))	{ 	$this->Workspace->saveField('view_status', '2');	$view=2;	}										// 
		if (($permType=="view")&&($permission=="list")) 	{ 	$this->Workspace->saveField('view_status', '0');	$view=0;											// 
																$this->Workspace->saveField('use_status', '0');		$use=0;												// 
																$this->Workspace->saveField('edit_status', '0');	$edit=0;											// 
																$this->Workspace->saveField('admin_status', '0');	$admin=0;	}										// 
		echo(json_encode(array('fileID'=>$fileID, 'perm'=>$permission, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));									//
	}else { echo('Error1'); }			                                                   																				//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------ CHANGE A USER PERMISSION IN THE WORKSPACES --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is changing one of the user permissions. The change is always either granting or removing permission in one of the four areas.		\
	This code changes that permission for the user in the database and then ensures that the remaining permissions make sense. For example, if the user is given edit	\
	permission then view and use are also given.																														\											\ 
	Note that you must be the creator of the file in order to remove someone's admin permission.																		\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function changeUserPerm() {																																		//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $systemID=$this->request->data('systemID');																															//
    $userName=$this->request->data('userName');																															//
	$userName=preg_replace('/_/',' ', $userName);																														//
    $permType=strtolower($this->request->data('permType'));																												//
    $newPerm=strtolower($this->request->data('newPerm'));																												//
	$newID=preg_replace('/^\//','', $systemID);																															//
	$newID=preg_replace('/_/',' ', $newID);																																//
   	$DirInfo=$this->Get_FolderID('http://www.cadwolf.com/Workspaces/'.$newID);																							//
	$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), 'http://www.cadwolf.com/Workspaces/'.$newID);													//
	$fileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']), 'recursive'=>-1));													//
	if ($adminPerm=='1')																																				//
	{	Controller::loadModel('Workspace');																																//
		Controller::loadModel('Permission');																															//
		if (!$this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'username'=>$userName)))																	//  
		{	$this->loadModel('User');																																	//
			if ($this->User->hasAny(array('username'=>$userName))) 																										//  
			{	$userData=$this->User->find('first', array('conditions' => array('username' => $userName), 'recursive'=>-1));											//
				$usertype=1;																																			//
				$userid=$userData['User']['id'];																														//
																																										//
				$this->Permission->create();																															// 
				$thisarray=array();																																		// 
				$thisarray['Permission']['workspace_id']=$DirInfo['ID'];																								//
				$thisarray['Permission']['workspace_name']=$DirInfo['Name'];																							//
				$thisarray['Permission']['username']=$userName;																											//
				$thisarray['Permission']['usertype']=$usertype;																											//
				$thisarray['Permission']['userid']=$userid;																												//
				$thisarray['Permission']['admin']=0;																													//
				$thisarray['Permission']['edit']=0;																														//
				$thisarray['Permission']['use']=1;																														//
				$thisarray['Permission']['view']=1; 																													//
				$this->Permission->save($thisarray);																													//
			}																																							//
		}																																								//
		$thisData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $DirInfo['ID'], 'username'=>$userName)));								//
		$admin=(int)$thisData['Permission']['admin'];																													//
		$edit=(int)$thisData['Permission']['edit'];																														//
		$use=(int)$thisData['Permission']['use'];																														//
		$view=(int)$thisData['Permission']['view'];																														//
		if ($newPerm==0)																																				//
		{	if ($permType=="view"){		$thisData['Permission']['view']=0;		$view=0;																				//
										$thisData['Permission']['use']=0;		$use=0;																					//
										$thisData['Permission']['edit']=0;		$edit=0;																				//	
										$thisData['Permission']['admin']=0;		$admin=0;	}																			//
			if ($permType=="use"){ 		$thisData['Permission']['use']=0; 		$use=0;																					//
										$thisData['Permission']['edit']=0;		$edit=0;																				//
										$thisData['Permission']['admin']=0; 	$admin=0;	}																			//
			if ($permType=="edit"){ 	$thisData['Permission']['edit']=0; 		$edit=0;																				//
										$thisData['Permission']['admin']=0;		$admin=0;	}																			//
			if (($permType=="admin")&&($this->Auth->user('id')==$fileData['Workspace']['creator'])){																	//
										$thisData['Permission']['admin']=0; 	$admin=0;	}																			//
		}else if ($newPerm==1)																																			//
		{	if ($permType=="admin"){	$thisData['Permission']['admin']=1;		$admin=1;																				//
										$thisData['Permission']['edit']=1;		$edit=1;																				//
										$thisData['Permission']['use']=1;		$use=1;																					//	
										$thisData['Permission']['view']=1;		$view=1;	}																			//
			if ($permType=="edit"){ 	$thisData['Permission']['edit']=1; 		$edit=1;																				//
										$thisData['Permission']['use']=1;		$use=1;																					//
										$thisData['Permission']['view']=1; 		$view=1;	}																			//
			if ($permType=="use"){ 		$thisData['Permission']['use']=0; 		$use=1;																					//
										$thisData['Permission']['view']=0;		$view=1;	}																			//
			if ($permType=="view"){		$thisData['Permission']['view']=0; 		$view=1;	}																			//
		}																																								//
	    $this->Permission->id=$thisData['Permission']['id'];																											// 
		$this->Permission->save($thisData);																																//																																									//
		echo(json_encode(array('username'=>$userName, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));													//
	}else { echo(json_encode(array('error'=>'You need admin permission'))); }																							//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------ This function uploads an image --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function UploadImage() {																																			//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
	$folderid=$_POST['folder'];																																			//
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $folderid);																						//
   	$DirInfo=$this->Get_FolderID($folderid);																															//
	$test=preg_match('/[a-z,A-Z,0-9,\s,\.,\-,\,]+/', $_FILES["image"]["name"]);																							//
	if (($editPerm=='1')||($test[0]==$_FILES["image"]["name"]))																											//
	{	if (($_FILES["image"]["type"]=="image/jpg")||($_FILES["image"]["type"]=="image/jpeg")||($_FILES["image"]["type"]=="image/bmp")||($_FILES["image"]["type"]=="image/gif")||($_FILES["image"]["type"]=="image/png"))						//
		{	if ($_FILES["image"]["type"]=="image/jpg") { $endtype="jpg"; }																								//
			if ($_FILES["image"]["type"]=="image/jpeg") { $endtype="jpeg";}																								//
			if ($_FILES["image"]["type"]=="image/gif") { $endtype="gif"; }																								//
			if ($_FILES["image"]["type"]=="image/bmp") { $endtype="bmp"; }																								//
			if ($_FILES["image"]["type"]=="image/png") { $endtype="png"; }																								//
			$this->loadModel('Workspace');																																//
			$data=array();																																				//
			$data['Workspace']=array();																																	//
			$data['Workspace']['parent_id']=$DirInfo['ID'];																												//
			$data['Workspace']['name']=preg_replace('/.jpg|.jpeg|.bmp|.tiff|.gif|.png$/','',$_FILES["image"]["name"]);													//
			$data['Workspace']['creator']=$this->Auth->user('id');																										//
			$data['Workspace']['type']=$_FILES["image"]["type"];																										//
			$data['Workspace']['edit_status']=0;																														//
			$data['Workspace']['view_status']=1;																														//
			$data['Workspace']['use_status']=1;																															//
			$data['Workspace']['admin_status']=0;																														//
			$data['Workspace']['File_or_Folder']=2;																														//
			$rank=$this->Workspace->find('count',  array('conditions' => array('parent_id' => $DirInfo['ID'])));														//
			$data['Workspace']['rank']=$rank;																															//
			$this->Workspace->create();																																	//
			$this->Workspace->save($data);																																//
			$errors = $this->Workspace->validationErrors;																												//
			$lastid=$this->Workspace->getLastInsertID();																												//
			move_uploaded_file($_FILES["image"]['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/UserImages/'.$lastid.'.'.$endtype);											//
		    $this->loadModel('Permission');																																//
		    $data = array();																																			//
		    $data['Permission']['workspace_id']=$lastid;																												//
		    $data['Permission']['userid']=$this->Auth->user('id');																										// 
		    $data['Permission']['username']=$this->Auth->user('username');																								// 
		    $data['Permission']['workspace_type']='0';																													//
		    $data['Permission']['view']='1';																															// 
		    $data['Permission']['use']='1';																																// 
		    $data['Permission']['edit']='1';																															// 
		    $data['Permission']['admin']='1';																															//
		    $this->Permission->create();																																//
			$this->Permission->save($data);																																//
			$data=array();																																				//
			$data['id']=$lastid;																																		//
			$data['parent_id']=$DirInfo['ID'];																															//
			$data['name']=$_FILES["image"]["name"];																														//
			$data['type']=$endtype;																																		//
			$newData=$this->Workspace->find('first',  array('conditions' => array('id' => $lastid)));																	//
            echo(json_encode($newData));			                                                 																	//
		}else																																							//
		{	echo("Error2");	}														                                                                     				//
	}else { echo("Error1"); }		                                                                                                                            		//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------- This function reuploads an image --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function reUploadImage() {																																		//
	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
	$folderid=$_POST['folder'];																																			//
	$imageID=$_POST['imageID'];																																			//
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $folderid);																						//
   	$DirInfo=$this->Get_FolderID($folderid);																															//
	$test=preg_match('/[a-z,A-Z,0-9,\s,\.,\-,\,]+/', $_FILES["image"]["name"]);																							//
	if ($editPerm=='1')																																					//
	{	if (($_FILES["image"]["type"]=="image/jpg")||($_FILES["image"]["type"]=="image/jpeg")||($_FILES["image"]["type"]=="image/bmp")||($_FILES["image"]["type"]=="image/gif")||($_FILES["image"]["type"]=="image/png"))						//
		{	if ($_FILES["image"]["type"]=="image/jpg") { $endtype="jpg"; }																								//
			if ($_FILES["image"]["type"]=="image/jpeg") { $endtype="jpeg";}																								//
			if ($_FILES["image"]["type"]=="image/gif") { $endtype="gif"; }																								//
			if ($_FILES["image"]["type"]=="image/bmp") { $endtype="bmp"; }																								//
			if ($_FILES["image"]["type"]=="image/png") { $endtype="png"; }																								//
			$this->loadModel('Workspace');																																//
			$oldData=$this->Workspace->find('first',  array('conditions' => array('id' => $imageID)));																	//
			if ($_FILES["image"]["type"]!=$oldData['Workspace']['type']) 																								//
			{ echo(json_encode(array('error'=>'The new image type must be the same as the old one')));																	//
			}else																																						//
			{	$this->loadModel('Workspace');																															//
				$this->Workspace->id=$imageID;																															// 
				$this->Workspace->saveField('creator', $this->Auth->user('id'));																						//   
				$this->Workspace->saveField('type', $_FILES["image"]["type"]);																							//   
				move_uploaded_file($_FILES["image"]['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/UserImages/'.$imageID.'.'.$endtype);										//
				$data=array();																																			//
				$data['id']=$imageID;																																	//
				$data['parent_id']=$DirInfo['ID'];																														//
				$data['type']=$endtype;																																	//
				echo('1');	                 																															//
			}																																							//
		}else																																							//
		{	echo('Error2');	}																                                                                       		//
	}else { echo('Error1'); }	                                                                                                                             			//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	



}
?>