<?php

class ChartsController extends AppController {

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																																//
        $this->layout = 'charts';																															//
        $this->set("UserName", $this->Auth->user('username'));																								//	    
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Take URL Slug and produce the file id --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileID($slug) {																														//
		$slug=str_replace("http://www.cadwolf.com/Plots/",'',$slug);																						//
		$slug=str_replace("cadwolf.com/Plots/",'',$slug);																								//
		$slug=str_replace("http://www.cadwolf.com/Plots/",'',$slug);																						//
		$slug=str_replace("cadwolf.com/Plots/",'',$slug);																									//
		return $slug;																																		//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------- This function takes in the id of the current folder and returns an array of the folder tree with the permissions of each folder -------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Permissions_Heirarchy($folderid) {																													//
		$temp=split('Plot', $folderid);																																	//
		$folderid=str_replace('File','', $temp[0]);																														//
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

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- This function is given the user id and the folder ID and returns an array noting the permissions ---------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_Permissions($userid, $Perm_Heirarchy, $username) {																								//
		$perm_array['view']=0; $perm_array['edit']=0; $perm_array['admin']=0;	$perm_array['use']=0; 																	//
		$Perm_Heirarchy=array_reverse($Perm_Heirarchy);																													//
		$editflag=0; $viewflag=0; $adminflag=0;		$useflag=0;																											//
		foreach ($Perm_Heirarchy as $index=>$thisfolder)																												//
		{																																								//
			if (($thisfolder['edit']=='1')&&($editflag==0))		{	$perm_array['edit']=1;	$editflag=1;																//
			}elseif ($thisfolder['edit']=='0')																															//
			{	if (array_key_exists('editgroups',$thisfolder)) 																										// This is the function that actually tells you whether or not
				{ 	for ($i = 0; $i < count($thisfolder['viewgroups']); ++$i) 																							// a user has permission to view, edit, or is the admin for a
					{    $this->loadModel('Groupuser');																													// folder. It takes in the username and the permission tree created
						if ($this->Groupuser->hasAny(array('userid' => $userid, 'groupid' => $thisfolder['editids'][$i]))) { $perm_array['edit']=1; }					// above. Starting at the bottom, it goes up until it finds a folder
			}	}	$editflag=1;	}																																	// with specific permissions set. It then checks to see if the user
			if (($thisfolder['view']=='1')&&($viewflag==0))		{	$perm_array['view']=1;	$viewflag=1;																// has permission based on those settings.
			}elseif ($thisfolder['view']=='0')	{																														//
				if (array_key_exists('viewgroups',$thisfolder)) 																										// It also checks to see if the user is in any groups that have 
				{ 																																						// permission.
					for ($i = 0; $i < count($thisfolder['viewgroups']); ++$i) 																							//
					{    $this->loadModel('Groupuser');																													//
						if ($this->Groupuser->hasAny(array('userid' => $userid, 'groupid' => $thisfolder['viewids'][$i]))) 	{ $perm_array['view']=1; }					//
			}	}	$viewflag=1; }																																		//
			if (($thisfolder['admin']=='1')&&($adminflag==0))	{	$perm_array['admin']=1;	$adminflag=1;																//
			}elseif ($thisfolder['admin']=='0')	{																														//
				if (array_key_exists('admingroups',$thisfolder)) 																										//
				{ 	for ($i = 0; $i < count($thisfolder['admingroups']); ++$i) 																							//
					{   $this->loadModel('Groupuser');																													//
						if ($this->Groupuser->hasAny(array('userid' => $userid, 'groupid' => $thisfolder['adminids'][$i])))	{ $perm_array['admin']=1; }					//
			}	}	$adminflag=1; }																																		//
			if (($thisfolder['use']=='1')&&($useflag==0))	{	$perm_array['use']=1;	$useflag=1;																		//
			}elseif ($thisfolder['use']=='0')	{																														//
				if (array_key_exists('usegroups',$thisfolder)) 																											//
				{ 	for ($i = 0; $i < count($thisfolder['usegroups']); ++$i) 																							//
					{   $this->loadModel('Groupuser');																													//
						if ($this->Groupuser->hasAny(array('userid' => $userid, 'groupid' => $thisfolder['useids'][$i])))	{ $perm_array['use']=1; }					//
			}	}	$useflag=1; }																																		//
		}																																								//
		if ($Perm_Heirarchy[count($Perm_Heirarchy)-1]['folder']==$username) { 	$perm_array['use']=1; $perm_array['view']=1; 											//
		$perm_array['edit']=1; $perm_array['admin']=1; }																												//	
		return $perm_array;																																				//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- The function that grabs specific items -------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetData($ID, $Perm) {																													//
    	if ($Perm=="1") 																																	//
    	{	Controller::loadModel('Document');																												//
    		$ReturnData=$this->Document->find('first', array('conditions' => array('id' => $ID))); 															//
			return $ReturnData['Document'];																													//
    	}
    }
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- Get Initial Data -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This is the function called upon page load that grabs all the data via an ajax call. We return the information for the file from the workspace entry    |
    as well as all of the items within the document, the unit data, the constant data, and the permissions.                                                 |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function getDataAngular() 																														//
    {   $this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileURL=$params['myURL'];			                    																			     			//
		$dataID=preg_replace('/\/Plots\//','', $fileURL);								           				                  						//
		$fileID=preg_replace('/^File/','',$dataID);					      			           																//
		$fileID=preg_replace('/Plot[0-9]+/','',$fileID);			       		           																	//
        $adminPerm=$this->getPermissionsFromID('admin', $this->Auth->user('id'), $fileID);			     		       					            		//
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);								              						//
		$usePerm=$this->getPermissionsFromID('use', $this->Auth->user('id'), $fileID);			     			               								//
		$viewPerm=$this->getPermissionsFromID('view', $this->Auth->user('id'), $fileID);		            												//
		$Permissions=array();																																//
		$Permissions['admin']=$adminPerm;																													//
		$Permissions['edit']=$editPerm;																														//
		$Permissions['use']=$usePerm;																														//
		$Permissions['view']=$viewPerm;																														//
		if ($viewPerm=='1')	                                                                      															//
        {   Controller::loadModel('Document');  																											//
            if ($this->Document->hasAny(array('id' => $dataID)))	    										                                            //
            {   $FileData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('id' => $dataID)));                                    //
            }else																																			//
            {   Controller::loadModel('DocumentTemp');  																									//
                if ($this->DocumentTemp->hasAny(array('id' => $dataID)))	   		       		     			                                            //                                                                                                                                                //
                {   $FileData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('id' => $dataID)));        }                       //
            }                                                                                                                                               //
        }                                                                                                                                                   //
        echo(json_encode($FileData));                                                                                                                       //
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- GET THE PERMISSIONS FOR A GIVEN USER FOR A GIVEN FILE OR FOLDER --------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the new algorithm for determining permissions for a user on a specific file and folder. It takes in a permission type, a user ID, and a file    |
    ID. It then looks to see if there are permissions set for that permission type or if it is inherited. If permissions are indeed set and are set for     |
    everyone then a 1 is returned. If permissions are set with a list of users then the list is searched. If the user is on the list and given permission   |
    then a 1 is returned as well. If the user is on the list and denied permission then a 0 is returned. If the permission inherits from above then the     |
    final chunk of the address is removed and the function is called again.                          														|
	permType 	- the type of permission being looked at - admin, edit, use, or view																		|
	userID		- the ID of the user being looked at																										|
	fileURL		- the URL of the file being looked at. It is in the form of PartTree/The_Wolf/My_Part_Tree													|
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getPermissionsFromID($permType, $userID, $fileID) 																							//
{  	Controller::loadModel('Workspace');																														//
	$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));		       													//
	if ($FileData['Workspace'][$permType.'_status']==2)																										//
	{	return $this->getPermissionsFromID($permType, $userID, $FileData['Workspace']['parent_id']);			               								//
	}elseif	($FileData['Workspace'][$permType.'_status']==1)																								//
	{	return 1;																																			//
	}elseif	($FileData['Workspace'][$permType.'_status']==0)																								//
	{	Controller::loadModel('Permission');																												//
		if ($this->Permission->hasAny(array('workspace_id' => $fileID, 'userid'=>$userID, $permType=>'1')))		         									//  
		{	return 1; 																																		//	
		}else																																				//
		{	return 0;																																		//
		}																																					//
	}else { return 0; }		 																																//
}																																							//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
	public function getPermissionsAngular($permType, $userID, $fileURL) 							    															//	\
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
					return 0;
				}																																					//	\
			}else { return 0; }		 																																//	\
		}else { echo($fileURL); }																																	//	\
	}																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    

}

?>