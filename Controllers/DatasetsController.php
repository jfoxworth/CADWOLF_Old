<?php

class DatasetsController extends AppController {

/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -----------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																														//
		$DirInfo=$this->Get_FileID(Router::url(null, true));																						//
        $this->layout = 'datasets';																													//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($DirInfo['ID']);																				//
    	$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));								//
		$this->set('DirInfo', $DirInfo);																											//	
		$this->set('Perm_Heirarchy',$Perm_Heirarchy);																								//	
		$this->set('Permissions',$Permissions);																										//	
		$this->set("UserName", $this->Auth->user('username'));																						//	
		$this->set("FileData", $this->GetFileData($DirInfo));																						//	
		$this->set("DatasetData", $this->GetDataset($DirInfo));																						//	
    }																																				//
/*--------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Take URL Slug and produce the file id --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileID($slug) {																														//
		Controller::loadModel('Workspace');																													//
		$slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																						//
		$slug=str_replace("/Datasets/",'',$slug);																											//
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
    public function getData() {																	        													//
 	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																			//
		$this->autorender = false;																															//
	 	$this->layout = null;																																//
  		$this->render('ajax');																																//
		$thisURL=$this->request->data('url');			     																								//
		$DirInfo=$this->Get_FileID($thisURL);	                										           											//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($DirInfo['ID']);												          								//
    	$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));		        						//
    	$ReturnData=$this->Dataset->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 													//
		echo(json_encode($ReturnData));																														//
    }																									          											//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- THIS FUNCTION GETS THE DATA FROM THE DATASET DATABASE -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function UploadData() {																															//
 	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																			//
		$this->autorender = false;																															//
	 	$this->layout = null;																																//
  		$this->render('ajax');																																//
		$thisdata=$this->request->data('thisdata');																											//
		$setid=$this->request->data('setid');																												//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($setid);																								//
   		$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));										//
	    if (!$setid) { throw new NotFoundException(__('No File ID')); }																						//
	    $this->Dataset->id=$setid;																															// 
		if ($Permissions['edit']=='1')	{	$this->Dataset->saveField('dataobj', $thisdata);																//   
		}else																																				//
		{	echo('0');	}																																	//
    }																																						//				
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- THIS FUNCTION SAVES THE DESCRIPTION --------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveDescription() {																														//
 	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																			//
		$this->autorender = false;																															//
	 	$this->layout = null;																																//
  		$this->render('ajax');																																//
		$description=$this->request->data('description');																									//
		$setid=$this->request->data('setid');																												//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($setid);																								//
   		$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));										//
	    if (!$setid) { throw new NotFoundException(__('No File ID')); }																						//
		Controller::loadModel('Workspace');																													//
	    $this->Workspace->id=$setid;																														// 
		if ($Permissions['edit']=='1')	{	$this->Workspace->saveField('description', $description);														//   
		}else																																				//
		{	echo('0');	}																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


}

?>