<?php

class DatasetsController extends AppController {

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -----------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																														//
		$DirInfo=$this->Get_FolderID(Router::url(null, true));																						//
        $this->layout = 'datasets';																													//
    	$editPermissions=$this->Get_Permissions('edit', $this->Auth->user('id'), Router::url(null, true));		               						//
    	$usePermissions=$this->Get_Permissions('use', $this->Auth->user('id'), Router::url(null, true));		               						//
    	$viewPermissions=$this->Get_Permissions('view', $this->Auth->user('id'), Router::url(null, true));		               						//
		$Permissions=array();																														//
		$Permissions['edit']=$editPermissions;																										//
		$Permissions['use']=$usePermissions;																										//
		$Permissions['view']=$viewPermissions;																										//
        $this->set('DirInfo', $DirInfo);																											//	
		$this->set("FileData", $this->GetFileData($DirInfo));																						//	
		$this->set('Permissions',$Permissions);																										//	
		$this->set("UserName", $this->Auth->user('username'));																						//	
		$this->set("DatasetData", $this->GetDataset($DirInfo));																						//	
    }																																				//
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Take URL Slug and produce the file id --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileID($slug) {																														//
		Controller::loadModel('Workspace');																													//
        $slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																						//
        $slug=str_replace("http://www.cadwolf.com/Datasets",'',$slug);																						//
		$slug=str_replace("/Datasets/",'',$slug);																											//
		$slug=str_replace("/Datasets",'',$slug);																											//
		$slug=preg_replace('/[\/]+$/','',$slug);																											//
		$slug=preg_replace('/^\//','',$slug);																												//
		$slug_array=explode('/',$slug);																														//
		$idarr='';																																			//
		$prev_id=0;																																			//
		for ($i = 0; $i < count($slug_array); $i=$i+1) {																									//
		    if ($i==0) { $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>Null )); 						//
		    }else	  	 $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 					//
			$prev_id=$id;																																	//
			$idarr=$idarr.'-'.$id; 																															//
		}																																					//
		$DirInfo=array();																																	//
		$DirInfo['ID']=$id;																																	//
		$DirInfo['Name']=str_replace("_"," ",$slug_array[$i-1]);																							//
		$DirInfo['IDArr']=$idarr;																															//
		$tempdata=$this->Workspace->find('first', array('conditions' => array('id' => $id)));																//
        $DirInfo['checkedout']=$tempdata['Workspace']['CheckedOut'];																						//
		$DirInfo['checkoutID']=$tempdata['Workspace']['checkoutID'];																						//
		return $DirInfo;																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GET THE PERMISSIONS FOR A GIVEN USER FOR A GIVEN FILE OR FOLDER --------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the new algorithm for determining permissions for a user on a specific file and folder. It takes in a permission type, a user ID, and a URL for the file.	\
	It then looks to see if there are permissions set for that permission type or if it is inherited. If permissions are indeed set and are set for everyone then a 1 	\
	is returned. If permissions are set with a list of users then the list is searched. If the user is on the list and given permission then a 1 is returned as well.	\
	If the user is on the list and denied permission then a 0 is returned. If the permission inherits from above then the final chunk of the address is removed and 	\
	the function is called again.																																		\
	permType 	- the type of permission being looked at - admin, edit, use, or view																					\
	userID		- the ID of the user being looked at																													\
	fileURL		- the URL of the file being looked at. It is in the form of PartTree/The_Wolf/My_Part_Tree																\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_Permissions($permType, $userID, $fileURL) 																									//	\
	{  	$DirInfo=$this->Get_FolderID($fileURL);																														//	\
		Controller::loadModel('Workspace');																															//	\
		$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));															//	\
		if ($DirInfo['exists']=='1')																																//	\
		{	if ($FileData['Workspace'][$permType.'_status']==2)																										//	\
			{	$newFile=preg_replace('/\/[0-9A-Za-z-_]+$/','',$fileURL);																							//	\
				return $this->Get_Permissions($permType, $userID, $newFile);																						//	\
			}elseif	($FileData['Workspace'][$permType.'_status']==1)																								//	\
			{	return 1;																																			//	\
			}elseif	($FileData['Workspace'][$permType.'_status']==0)																								//	\
			{	Controller::loadModel('Permission');																												//	\
				if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$userID, $permType=>'1')))											//  \
				{	return 1; 																																		//	\
				}else																																				//	\
				{	$flag=0;																																		//	\
//					Controller::loadModel('Groupuser');																												//	\
//					$groupData=$this->Groupuser->find('all', array('conditions' => array('userid' => $userID )));													//	\
//					if (isset($groupData))																															//	\
//					{	foreach ($goupData as $index=>$thisFolder)																									//	\
//						{	if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$thisFolder[$index]['Groupuser']['groupid'], $permType=>'1')));	
//							{	$flag=1;	}																														//	\
//					}	}																																			//	\
//					if ($flag==1){ return 1; }else { return 0; }																									//	\
					return 0;
				}																																					//	\
			}else { return 0; }		 																																//	\
		}else { echo($fileURL); }																																	//	\
	}																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- This gets the id of a folder based on a url slug ----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function Get_FolderID($slug) {																																//	\
	Controller::loadModel('Workspace');																																//	\
	$slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																						      		//	\
	$slug=str_replace("www.cadwolf.com/Datasets/",'',$slug);																										//	\
	$slug=str_replace("/Datasets/",'',$slug);																														//	\
	$slug=str_replace("Datasets/",'',$slug);																														//	\
	$slug=preg_replace('/^\//','',$slug);																															//	\
	$slug=preg_replace('/\/$/','',$slug);																															//	\
	$slug=preg_replace('/_/',' ',$slug);																															//	\
	$slug_array=explode('/',$slug);																																	//	\
	$idarr='';																																						//	\
	$parentID=NULL;																																					//	\
	$prev_id=0;																																						//	\	
	for ($i = 0; $i < count($slug_array); $i=$i+1) {																												//	\	
	    if ($i==0) { $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>Null )); 								//	\
	    }else	  	 $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 							//	\
		$parentID=$prev_id;																																			//	\
		$prev_id=$id;																																				//	\
		$idarr=$idarr.'-'.$id; 																																		//	\
	}																																								//	\
	$DirInfo=array();																																				//	\
	$DirInfo['ID']=$id;																																				//	\
	$DirInfo['parentID']=$parentID;																																	//	\
	$DirInfo['Name']=preg_replace("/_/"," ",$slug_array[$i-1]);																										//	\
	$DirInfo['IDArr']=$idarr;																																		//	\
	$tempdata=$this->Workspace->find('first', array('conditions' => array('id' => $id)));																			//	\
	if (array_key_exists("Workspace",$tempdata))																													//	\
	{	$DirInfo['checkedout']=$tempdata['Workspace']['CheckedOut'];																								//	\
		$DirInfo['checkoutID']=$tempdata['Workspace']['checkoutID'];																								//	\
		$DirInfo['exists']=1;																																		//	\
	}else																																							//	\
	{	$DirInfo['checkedout']=0;																																	//	\
		$DirInfo['checkoutID']=0;																																	//	\
		$DirInfo['exists']=0;																																		//	\
	}																																								//	\
	return $DirInfo;																																				//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------- This function takes in the id of the current folder and returns an array of the folder tree with the permissions of each folder -------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Permissions_Heirarchy($folderid) {																													//
		Controller::loadModel('Workspace');																																//
		$Path=$this->Workspace->getPath($folderid);																														//
		$Perm_Path=array();																																				//
		foreach ($Path as $index=>$thisfolder)																															//
		{																																								//
			$Perm_Path[$index]['folder']=$thisfolder['Workspace']['name'];																								//
			$Perm_Path[$index]['id']=$thisfolder['Workspace']['id'];																									//
			$Perm_Path[$index]['edit']=$thisfolder['Workspace']['edit_status'];																							//
			$Perm_Path[$index]['view']=$thisfolder['Workspace']['view_status'];																							//
			$Perm_Path[$index]['use']=$thisfolder['Workspace']['use_status'];																							//
			$Perm_Path[$index]['admin']=$thisfolder['Workspace']['admin_status'];;																						//
			if ($this->Workspace->Permission->hasAny(array('Permission.workspace_id' => $thisfolder['Workspace']['id']))) 												// This function builds an array that holds the permissions of each 
			{ 																																							// folder, its ID number, name, and an array of all users with permissions
				$newperms=$this->Workspace->Permission->find('all', array('conditions' => array('workspace_id' => $thisfolder['Workspace']['id'], 'view'=>'1')));		// for that folder. This array is used to find which users can be given 
				foreach ($newperms as $index2=>$thisgroup)																												// permission based on above settings and used to show the permissions
				{																																						// tree on the workspace page.
					$Perm_Path[$index]['viewgroups'][$index2]=	$thisgroup['Permission']['username'];																	// 
					$Perm_Path[$index]['viewids'][$index2]=		$thisgroup['Permission']['userid']; 																	//
					$Perm_Path[$index]['viewtypes'][$index2]=	$thisgroup['Permission']['usertype']; 																	//
				}																																						//
				$newperms=$this->Workspace->Permission->find('all', array('conditions' => array('workspace_id' => $thisfolder['Workspace']['id'], 'edit'=>'1')));		//
				foreach ($newperms as $index2=>$thisgroup)																												//
				{																																						//
					$Perm_Path[$index]['editgroups'][$index2]=	$thisgroup['Permission']['username']; 																	//
					$Perm_Path[$index]['editids'][$index2]=		$thisgroup['Permission']['userid']; 																	//
					$Perm_Path[$index]['edittypes'][$index2]=	$thisgroup['Permission']['usertype']; 																	//
				}																																						//
				$newperms=$this->Workspace->Permission->find('all', array('conditions' => array('workspace_id' => $thisfolder['Workspace']['id'], 'admin'=>'1')));		//
				foreach ($newperms as $index2=>$thisgroup)																												//
				{																																						//
					$Perm_Path[$index]['admingroups'][$index2]=	$thisgroup['Permission']['username'];																	//
					$Perm_Path[$index]['adminids'][$index2]=	$thisgroup['Permission']['userid'];																		//
					$Perm_Path[$index]['admintypes'][$index2]=	$thisgroup['Permission']['usertype'];																	//
				}																																						//
				foreach ($newperms as $index2=>$thisgroup)																												//
				{																																						//
					$Perm_Path[$index]['usegroups'][$index2]=	$thisgroup['Permission']['username']; 																	//
					$Perm_Path[$index]['useids'][$index2]=		$thisgroup['Permission']['userid']; 																	//
					$Perm_Path[$index]['usetypes'][$index2]=	$thisgroup['Permission']['usertype']; 																	//
				}																																						//
			}
		}																																								//
		return $Perm_Path;																																				//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ THIS FUNCTION GETS THE DATA FROM THE WORKSPACE DATABASE -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetFileData($DirInfo) {																													//
    	Controller::loadModel('Workspace');																													//
    	$ReturnData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 													//
		return $ReturnData;																																	//
    }																																						//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- THIS FUNCTION GETS THE DATA FROM THE DATASET DATABASE -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetDataset($DirInfo) {																													//
    	Controller::loadModel('Dataset');																													//
    	$ReturnData=$this->Dataset->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 													//
		return $ReturnData;																																	//
    }																																						//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ GET DATA FROM DATABASE ----------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This is the function that is called whenever a page is loaded and sends all of the information to the user. The data object is pulled directly from     |
    the dataset database.                                                                                                                                   |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function getMyData() {																        													//
 	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																			//
		$this->autorender = false;																															//
	 	$this->layout = null;																																//
  		$this->render('ajax');																																//
		$params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $thisURL=$params['myURL'];			                   																								//
		$DirInfo=$this->Get_FolderID($thisURL);	                										           											//
    	$datasetData=$this->Dataset->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 	    											//
    	$workspaceData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 												//
    	$editPermissions=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisURL);		                             		          				//
    	$usePermissions=$this->Get_Permissions('use', $this->Auth->user('id'), $thisURL);		                                       						//
    	$viewPermissions=$this->Get_Permissions('view', $this->Auth->user('id'), $thisURL);		                     			                  			//
        $Permissions=array();																			          											//
		$Permissions['edit']=$editPermissions;																	           									//
		$Permissions['use']=$usePermissions;																				          						//
		$Permissions['view']=$viewPermissions;																						          				//
		$datasetData['Dataset']['description']=$workspaceData['Workspace']['description'];                                                                  //
        $datasetData['Dataset']['Permissions']=$Permissions;                                                                                                //
        if ($viewPermissions==1)                                                                                                                            //
        {   echo(json_encode($datasetData));																												//
        }else                                                                                                                                               //
        {   echo('0');		}                        																										//
    }																									          											//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- THIS FUNCTION SAVES THE INFORMATION TO THE DATABASES FROM THE WEB PAGE --------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This is the function that is called to save all of the data when the user hits the "Save Dataset" button. All of the information is saved as a JSON     |
    object in the dataset database. The description is also saved in the folders database as it is seen in the workspace as the description.                |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function saveDataset() {																															//
 	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																			//
		$this->autorender = false;																															//
	 	$this->layout = null;																																//
  		$this->render('ajax');																																//
		$params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $thisURL=$params['myURL'];			                   																								//
        $thisData=$params['myData'];		                  																								//
        $parseData=json_decode($params['myData'], true);       																								//
		$DirInfo=$this->Get_FolderID($thisURL);	                										           											//
    	$editPermissions=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisURL);		                             		          				//
        if (!$DirInfo['ID']) { throw new NotFoundException(__('No File ID')); }																				//
	    $this->Dataset->id=$DirInfo['ID'];																	    											// 
		if ($editPermissions==1)	       	                                                																//   
        {   $this->Dataset->id=$DirInfo['ID'];																    											// 
            $this->Dataset->saveField('dataobj', $thisData);                                                                                                //
            Controller::loadModel('Workspace');																												//
            $this->Workspace->id=$DirInfo['ID'];																    										// 
            $this->Workspace->saveField('description', $parseData['Data']['description']);                                                                  //
		}else																																				//
		{	echo('0');	}																																	//
    }																																						//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


}

?>