<?php

class PartTreeController extends AppController {

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------- The default action this simply lists the files and folders in a given folder -----------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function index() 																																			//	\
{   $this->layout='parttrees';																																		//	\
	$DirInfo=$this->Get_FolderID(Router::url(null, true));																											//	\
	$this->set('DirInfo', $DirInfo);  																																//	\
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), Router::url(null, true));																		//	\
	$viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), Router::url(null, true));																		//	\
	$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), Router::url(null, true));																		//	\
	$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), Router::url(null, true));																	//	\
   	$Permissions=array('admin'=> $adminPerm, 'edit'=> $editPerm, 'use'=> $usePerm, 'view'=> $viewPerm);																//	\
	$this->set('Permissions',$Permissions);																															//	\
	$FileInfo=$this->GetData($DirInfo, "FileInfo", 0);																												//	\
	$this->set("FileInfo", $FileInfo);																																//	\
	if (($Permissions['edit']=='1')||($Permissions['admin']=='1')||($Permissions['view']=='1'))																		//	\
	{																																								//	\
		$MyFiles = $this->Workspace->find('all', array('conditions' => array('Workspace.parent_id' => $DirInfo['ID']), 'order' => array('Workspace.rank ASC', 'Workspace.modified DESC', 'Workspace.File_or_Folder ASC')));	//
		$this->set('MyFiles', $MyFiles);																															//	\
	}																																								//	\
}																																									//	\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- This function is given a slug representing the URL and determines the id of the current folder -----------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function GetDirPerm($id) 																																		//
{	Controller::loadModel('Workspace');																																	//	
	$thisperm=array();																																					// 
	$perms=$this->Workspace->find('first', array('conditions' => array('id' => $id)));																					// 
	$thisperm['view']=$perms['Workspace']['view_status'];																												// 
	$thisperm['edit']=$perms['Workspace']['edit_status'];																												// 
	$thisperm['use']=$perms['Workspace']['use_status'];																													// 
	$thisperm['admin']=$perms['Workspace']['admin_status'];																												// 
	return $thisperm;																																					//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- The function that grabs specific items -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function GetData($DirInfo, $Data, $itemid) 																													//	\
{	if ($Data=="FileInfo") 																																			//	\
	{	Controller::loadModel('Workspace');																															//	\	
		$ReturnData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 															//	\
		return $ReturnData;																																			//	\
}	}																																								//	\				
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- This function is given a slug representing the URL and determines the id of the current folder -----------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FolderID($slug) {																																//
		Controller::loadModel('Workspace');																																//
		$slug=str_replace("http://www.cadwolf.com/PartTree/",'',$slug);																									//
		$slug=str_replace("www.cadwolf.com/PartTree/",'',$slug);																										//
		$slug=str_replace("/PartTree/",'',$slug);																														//
		$slug=str_replace("PartTree/",'',$slug);																														//
		$slug=preg_replace('/^\//','',$slug);																															//
		$slug=preg_replace('/\/$/','',$slug);																															//
		$slug=preg_replace('/_/',' ',$slug);																															//
		$slug_array=explode('/',$slug);																																	//
		$idarr='';																																						//
		$parentID=NULL;																																					//
		$prev_id=0;																																						//
		for ($i = 0; $i < count($slug_array); $i=$i+1) {																												//
		    if ($i==0) { $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>Null )); 								//
		    }else	  	 $id=$this->Workspace->field('id', array('name' => preg_replace("/_/"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 							//
			$parentID=$prev_id;																																			//
			$prev_id=$id;																																				//
			$idarr=$idarr.'-'.$id; 																																		//
		}																																								//
		$DirInfo=array();																																				//
		$DirInfo['ID']=$id;																																				//
		$DirInfo['parentID']=$parentID;																																	//
		$DirInfo['Name']=preg_replace("/_/"," ",$slug_array[$i-1]);																										//
		$DirInfo['IDArr']=$idarr;																																		//
		$tempdata=$this->Workspace->find('first', array('conditions' => array('id' => $id)));																			//
		if (array_key_exists("Workspace",$tempdata))																													//
		{	$DirInfo['checkedout']=$tempdata['Workspace']['CheckedOut'];																								//
			$DirInfo['checkoutID']=$tempdata['Workspace']['checkoutID'];																								//
			$DirInfo['exists']=1;																																		//
		}else																																							//
		{	$DirInfo['checkedout']=0;																																	//
			$DirInfo['checkoutID']=0;																																	//
			$DirInfo['exists']=0;																																		//
		}																																								//
		return $DirInfo;																																				//
	}																																									//
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
	public function Get_Permissions($permType, $userID, $fileURL) 																										//
	{  	$DirInfo=$this->Get_FolderID($fileURL);																															//
		Controller::loadModel('Workspace');																																//
		$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));																//
		if ($DirInfo['exists']=='1')																																	//
		{	if ($FileData['Workspace'][$permType.'_status']==2)																											//
			{	$newFile=preg_replace('/\/[0-9A-Za-z-_]+$/','',$fileURL);																								//
				return $this->Get_Permissions($permType, $userID, $newFile);																							//
			}elseif	($FileData['Workspace'][$permType.'_status']==1)																									//
			{	return 1;																																				//
			}elseif	($FileData['Workspace'][$permType.'_status']==0)																									//
			{	Controller::loadModel('Permission');																													//
				if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$userID, $permType=>'1')))												//  
				{	return 1; 																																			//	
				}else																																					//
				{	$flag=0;																																			//
					Controller::loadModel('Groupuser');																													//
					$groupData=$this->Groupuser->find('all', array('conditions' => array('userid' => $userID )));														//
					if (isset($groupData))																																//
					{	foreach ($goupData as $index=>$thisFolder)																										//
						{	if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'userid'=>$thisFolder[$index]['Groupuser']['groupid'], $permType=>'1')));	//
							{	$flag=1;	}																															//
					}	}																																				//
					if ($flag==1){ return 1; }else { return 0; }																										//
				}																																						//
			}else { return 0; }		 																																	//
		}else { echo($fileURL); }																																		//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- This permanently saves the file by saving the field the houses the data -------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveFile() {																																		//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $fileURL=$this->request->data('thisFileID');																													//
	    $partData=$this->request->data('partData');																														//
	   	$DirInfo=$this->Get_FolderID($fileURL);																															//
    	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																					//
		if ($editPerm=='1')																																				//
		{	Controller::loadModel('Workspace');																															//
		    $this->Workspace->id=$DirInfo['ID'];																														// 
			$this->Workspace->saveField('partTree', $partData);																											// 
			echo('11'); 																																				//
		}else { echo('00'); }																																			//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------- This function adds a file or a folder to a workspace ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function addSystem() 																																		//
  	{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																						//
		$this->autorender = false;																																		//
 		$this->layout = null;																																			// 
  	    $this->render('ajax');																																			// 
		$thisFile=$this->request->data('thisFile');																														//
		$systemPath=$this->request->data('systemPath');																													//
		$systemName=$this->request->data('systemName');																													//
		$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemPath);																										// 
		if ((strlen($DirInfo['ID'])==0)&&(!strpos($systemPath, '/'))) 																									//
		{ 	$DirInfo=$this->Get_FolderID($thisFile);																													// 
 			$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																				//
		   	$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile);																				//
			if ($editPerm=='1')																																			//
		    {	Controller::loadModel('Workspace');																														//
			    $data = array();																																		//
				$data['Workspace']['parent_id'] = $DirInfo['ID'];																										//
				$data['Workspace']['name'] = $systemPath; $data['Workspace']['File_or_Folder'] = '0'; 																	// 
				$data['Workspace']['admin_status']=2; $data['Workspace']['edit_status']=2; $data['Workspace']['use_status']=1; $data['Workspace']['view_status']=1;		//  
				$data['Workspace']['creator'] = $this->Auth->user('id');																								//
		        $this->Workspace->create();																																// 
				$this->Workspace->save($data);																															//
				$lastid=$this->Workspace->getLastInsertID();																											//
			    $this->loadModel('Permission');																															//
			    $data = array();																																		//
		        $data['Permission']['workspace_id']=$lastid;																											//
//		        $data['Permission']['id']=$lastid;																														//  
		        $data['Permission']['userid']=$this->Auth->user('id');																									//  
		        $data['Permission']['view']='1';																														// 
		        $data['Permission']['use']='1';																															// 
		        $data['Permission']['edit']='1';																														//
		        $data['Permission']['admin']='1';																														//
		        $this->Permission->create();																															//
				$this->Permission->save($data);																															//
			}	 																																						//
		}		 																																						//
	 	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemPath);																										// 
	   	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$systemPath);																	//
	   	$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile.'/'.$systemPath);																	//
		if ($editPerm=='1')																																				//
	    {	Controller::loadModel('Workspace');																															//
		    $data = array();																																			//
			$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemPath);																									// 
			$data['Workspace']['parent_id'] = $DirInfo['ID'];																											//
			$data['Workspace']['name'] = $systemName; $data['Workspace']['File_or_Folder'] = '0'; 																		// 
			$data['Workspace']['admin_status']=2; $data['Workspace']['edit_status']=2; $data['Workspace']['use_status']=1; $data['Workspace']['view_status']=1;			//  
	        $this->Workspace->create();																																	// 
			$this->Workspace->save($data);																																//
			$lastid=$this->Workspace->getLastInsertID();																												//
		    $this->loadModel('Permission');																																//
		    $data = array();																																			//
	        $data['Permission']['workspace_id']=$lastid;																												//
//	        $data['Permission']['id']=$lastid;																															//  
	        $data['Permission']['userid']=$this->Auth->user('id');																										//  
	        $data['Permission']['view']='1';																															// 
	        $data['Permission']['use']='1';																																// 
	        $data['Permission']['edit']='1';																															//
	        $data['Permission']['admin']='1';																															//
	        $this->Permission->create();																																//
			$this->Permission->save($data);																																//
		}	 																																							//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------------------ WHEN A NEW BLOCK IS ADDED TO THE PART TREE SYSTEM -------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	When a user adds a new block to the part tree system, this function makes sure that any subsequent files and folders are addressed.	To do this, an option list		\
	item is automatically created with the name "New Option" and every existing item is placed in that folder or system. Users must then rename this option and then	\
	move any other items. The code does this by pulling down the entire tree and then stepping through each branch until it reaches the index being added. It then 		\
	checks to see if there is any data. If not, there is nothing to change. If there is data, then a new folder is created at that node and the data is pushed into a 	\
	single option.																																						\
	thisFile	-	The URL of the part tree																															\
	index		-	The index within the part numbering system where the new item is to be added - starting with 0														\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function addBlock() 																																				//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
    $this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$thisFile=preg_replace("/^\//", "", $thisFile);																														//
	$index=$this->request->data('index');																																//
	$DirInfo=$this->Get_FolderID($thisFile);																															// 
	Controller::loadModel('Workspace');																																	//
   	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																						//
	if ($editPerm=='1')																																					//
	{	$parentJob = $this->Workspace->find('first', array('conditions' => array('Workspace.id' => $DirInfo['ID']), 'recursive'=>1));									//
		$children = $this->Workspace->find('threaded', array('conditions' => array('Workspace.lft BETWEEN ? AND ?' => array($parentJob['Workspace']['lft'], $parentJob['Workspace']['rght'])), 'fields'=>array('name', 'lft', 'rght', 'parent_id', 'id'), 'recursive'=>1));			
//echo(json_encode($children));
		foreach ($children as $thisIndex=>$thisfolder)	{	$this->addBlocker($thisfolder, 0, $index, $thisFile);	}													//
	}																																									//
}																																										//
public function addBlocker($dataArray, $currentIndex, $stopIndex, $address) 																							//
{	if ($currentIndex<$stopIndex)																																		//
	{	foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$testDirInfo=$this->Get_FolderID($address.'/'.$thisfolder['Workspace']['name']);																			//
			if ($testDirInfo['exists']=="1")																															//
			{	$this->addBlocker($thisfolder, $currentIndex+1, $stopIndex, $address.'/'.$thisfolder['Workspace']['name']);		}										//
		}																																								//
	}elseif($currentIndex==$stopIndex)																																	//
	{	foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$testDirInfo=$this->Get_FolderID($address.'/'.$thisfolder['Workspace']['name']);																			//
			if ($testDirInfo['exists']=="1")																															//
			{	$data = array();																																		//
				$data['Workspace']['parent_id'] = $testDirInfo['parentID'];																								//
				$data['Workspace']['name'] = "New Option"; 																												//
				$data['Workspace']['File_or_Folder'] = '0'; 																											// 
				$data['Workspace']['admin_status']=2; $data['Workspace']['edit_status']=2; $data['Workspace']['use_status']=1; $data['Workspace']['view_status']=1;		//  
				$data['Workspace']['creator'] = $this->Auth->user('id');																								//
		        $this->Workspace->create();																																// 
				$this->Workspace->save($data);																															//
				$lastid=$this->Workspace->getLastInsertID();																											//
			    $this->loadModel('Permission');																															//
			    $data = array();																																		//
		        $data['Permission']['workspace_id']=$lastid;																											//
//		        $data['Permission']['id']=$lastid;																														//  
		        $data['Permission']['userid']=$this->Auth->user('id');																									//  
		        $data['Permission']['view']=1;																															// 
		        $data['Permission']['use']=1;																															// 
		        $data['Permission']['edit']=1;																															//
		        $data['Permission']['admin']=1;																															//
		        $this->Permission->create();																															//
				$this->Permission->save($data);																															//
				$tempData=$this->Workspace->find('first',  array('conditions' => array('id' => $testDirInfo['ID'])));													//
				$tempData['Workspace']['parent_id']=$lastid;																											//
				$this->Workspace->id=$testDirInfo['ID'];																												//
				$this->Workspace->save($tempData);																														//
			}																																							//
		}																																								//
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- DELETE A DATA BLOCK FROM THE PART TREE --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This function is called whenever a user deletes a block level from the numbering scheme. It goes through the entire part tree and when it gets to the index being	\
	deleted, it takes its children and moves them to its parent. It then deletes that folder.																			\
	thisFile	-	The URL of the part tree																															\
	index		-	The index within the part numbering system where the new item is to be added - starting with 0														\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function deleteBlock() 																																			//
{	$this->autorender = false;																																			//
	$this->layout = null;																																				//
	$this->render('ajax');																																				//
    $thisFile=$this->request->data('thisFile');																															//
	$Index=$this->request->data('Index');																																//
   	$DirInfo=$this->Get_FolderID($thisFile);																															//
   	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																						//
	if ($editPerm=='1')																																					//
	{	$parentJob = $this->Workspace->find('first', array('conditions' => array('Workspace.id' => $DirInfo['ID']), 'recursive'=>1));									//
		$children = $this->Workspace->find('threaded', array('conditions' => array('Workspace.lft BETWEEN ? AND ?' => array($parentJob['Workspace']['lft'], $parentJob['Workspace']['rght'])), 'fields'=>array('name', 'lft', 'rght', 'parent_id', 'id'), 'recursive'=>1));			
		foreach ($children as $thisIndex=>$thisfolder)	{	$this->blockDeleter($thisfolder, 0, $Index, $thisFile);	}													//
	}																																									//
}																																										//
public function blockDeleter($dataArray, $currentIndex, $stopIndex, $address) 																							//
{	if ($currentIndex<=$stopIndex)																																		//
	{	foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$testDirInfo=$this->Get_FolderID($address.'/'.$thisfolder['Workspace']['name']);																			//
			if ($testDirInfo['exists']=="1")																															//
			{	$this->blockDeleter($thisfolder, $currentIndex+1, $stopIndex, $address.'/'.$thisfolder['Workspace']['name']);		}									//
		}																																								//
	}elseif($currentIndex==$stopIndex+1)																																//
	{	$deleteDirInfo=$this->Get_FolderID($address);																													//
		echo('The address and id of the folder is '.$address.' - '.$deleteDirInfo['ID'].' - '.$deleteDirInfo['parentID']);
		foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$testDirInfo=$this->Get_FolderID($address.'/'.$thisfolder['Workspace']['name']);																			//
			if ($testDirInfo['exists']=="1")																															//
			{	$tempData=$this->Workspace->find('first',  array('conditions' => array('id' => $testDirInfo['ID'])));													//
				$this->Workspace->id=$testDirInfo['ID'];																												//
				$tempData['Workspace']['parent_id']=$deleteDirInfo['parentID'];																							//
				$this->Workspace->save($tempData);																														//
			}																																							//
		}																																								//
		$this->Workspace->id=$deleteDirInfo['ID'];																														//
		$this->Workspace->delete($deleteDirInfo['ID']);																													//
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*-------------------------------------------------- This function changes the name of a block level element -----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	If a user changes the name of a block after it may have sub folders and files created, then the name of those folders need to change as well. This does that. It 	\
	is called whenver the user changes one of those blocks without any other action by the user.																		\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function changeBlockName() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
    $this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$thisFile=preg_replace("/^\//", "", $thisFile);																														//
	$oldName=$this->request->data('oldName');																															//
	$newName=$this->request->data('newName');																															//
	$DirInfo=$this->Get_FolderID($thisFile);																															// 
	$oldName=preg_replace("/_/"," ",$oldName);																															//
	$newName=preg_replace("/_/"," ",$newName);																															//
	Controller::loadModel('Workspace');																																	//
	Controller::loadModel('Permission');																																//
	if ($this->Workspace->hasAny(array('parent_id' => $DirInfo['ID'], 'name'=>$oldName)))																				//  
	{	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																					//
		if ($editPerm=='1')																																				//
		{	$FileData=$this->Workspace->find('first', array('conditions' => array('parent_id' => $DirInfo['ID'], 'name'=>$oldname)));									//
		    $this->Workspace->id=$FileData['Workspace']['id'];																											// 
			$this->Workspace->saveField('name', $newName);																												// 
		}																																								//
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*-------------------------------------------------- This function changes the name of a system level element -----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	If a user changes the name of one of the options with the block, this function simply changes those names within the folder structure on the server. It receives	\
	four items as listed below. The code grabs all of the tree items and steps through them until it reaches the level on each branch where the name is to be changed.	\
	It then looks to see if there is a folder by that name there and if there is, it changes it.																		\
	thisFile 	- the URL of the part tree being edited																													\
	oldName		- the old name of the folder																															\
	newName		- the new name of the folder																															\
	Index		- the index of the block whose option is being edited																									\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function changeOptionName() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
	$this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$thisFile=preg_replace("/^\//", "", $thisFile);																														//
	$oldName=$this->request->data('oldName');																															//
	$newName=$this->request->data('newName');																															//
	$Index=$this->request->data('index');																																//
	$DirInfo=$this->Get_FolderID($thisFile);																															// 
	$oldName=preg_replace("/_/"," ",$oldName);																															//
	$newName=preg_replace("/_/"," ",$newName);																															//
	Controller::loadModel('Workspace');																																	//
	Controller::loadModel('Permission');																																//
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																						//
	if ($editPerm=='1')																																					//
	{	$parentJob = $this->Workspace->find('first', array('conditions' => array('Workspace.id' => $DirInfo['ID']), 'recursive'=>1));									//
		$children = $this->Workspace->find('threaded', array('conditions' => array('Workspace.lft BETWEEN ? AND ?' => array($parentJob['Workspace']['lft'], $parentJob['Workspace']['rght'])), 'fields'=>array('name', 'lft', 'rght', 'parent_id', 'id'), 'recursive'=>1));			
		foreach ($children as $thisIndex=>$thisfolder)																													//
		{	$this->nameChanger($thisfolder, 0, $Index, $thisFile, preg_replace("/ /","_",$oldName), preg_replace("/ /","_",$newName));			}						//
	}																																									//
}																																										//
public function nameChanger($dataArray, $currentIndex, $stopIndex, $address, $oldName, $newName) 																		//
{	if ($currentIndex<$stopIndex)																																		//
	{	foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$this->nameChanger($thisfolder, $currentIndex+1, $stopIndex, $address.'/'.$thisfolder['Workspace']['name'], $oldName, $newName);		}					//
	}elseif($currentIndex==$stopIndex)																																	//
	{	$newDirInfo=$this->Get_FolderID($address.'/'.$oldName);																											//
		if ($newDirInfo['exists']=='1')																																	//
		{	$this->Workspace->id=$newDirInfo['ID'];																														//
			$this->Workspace->saveField('name', preg_replace("/_/"," ", $newName));	}																					// 
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*--------------------------------------------------- This function deletes one of the system level elements -----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	If a user changes the name of one of the options with the block, this function simply changes those names within the folder structure on the server. It receives	\
	four items as listed below. The code grabs all of the tree items and steps through them until it reaches the level on each branch where the name is to be changed.	\
	It then looks to see if there is a folder by that name there and if there is, it changes it.																		\
	thisFile 	- the URL of the part tree being edited																													\
	listName	- the name of the option to be deleted																													\
	Index		- the index of the block whose option is being deleted																									\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function deleteOption() 																																			//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
	$this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$thisFile=preg_replace("/^\//", "", $thisFile);																														//
	$listName=$this->request->data('listName');																															//
	$Index=$this->request->data('index');																																//
	$DirInfo=$this->Get_FolderID($thisFile);																															// 
	Controller::loadModel('Workspace');																																	//
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																						//
	if ($editPerm=='1')																																					//
	{	$parentJob = $this->Workspace->find('first', array('conditions' => array('Workspace.id' => $DirInfo['ID']), 'recursive'=>1));									//
		$children = $this->Workspace->find('threaded', array('conditions' => array('Workspace.lft BETWEEN ? AND ?' => array($parentJob['Workspace']['lft'], $parentJob['Workspace']['rght'])), 'fields'=>array('name', 'lft', 'rght', 'parent_id', 'id'), 'recursive'=>1));			
		foreach ($children as $thisIndex=>$thisfolder)																													//
		{	$this->optionDeleter($thisfolder, 0, $Index, $thisFile, $listName);			}																				//
	}																																									//
}																																										//
public function optionDeleter($dataArray, $currentIndex, $stopIndex, $address, $oldName, $newName) 																		//
{	if ($currentIndex<$stopIndex)																																		//
	{	foreach ($dataArray['children'] as $thisIndex=>$thisfolder)																										//
		{	$this->optionDeleter($thisfolder, $currentIndex+1, $stopIndex, $address.'/'.$thisfolder['Workspace']['name'], $listName);		}							//
	}elseif($currentIndex==$stopIndex)																																	//
	{	$newDirInfo=$this->Get_FolderID($address.'/'.$listName);																										//
		if ($this->Workspace->hasAny(array('parent_id' => $newDirInfo['ID'])))																							//  
		{	echo('1');	break;  																																		//
		}else																																							//
		{	$this->Workspace->id=$newDirInfo['ID'];																														//
			$this->Workspace->delete($newDirInfo['ID']);		}																										//
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------------------------------ MOVE A FILE OR FOLDER -----------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Whenever a user wants to move a file or a folder they enter a new address and this function is called. If the address is valid and user has permission to edit the	\
	current and the new address then the item is moved to the new location by changing the parent id and saving the item.												\
	thisFile 	- the URL of the part tree file																															\
	systemID 	- the path to the current location																														\
	newAddress	- the location that the file is to be moved to																											\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function moveItem() 																																				//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
    $this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$thisFile=preg_replace("/^\//", "", $thisFile);																														//
	$systemID=$this->request->data('systemID');																															//
	$newAddress=$this->request->data('newAddress');																														//
	$newAddress=preg_replace("/^\//","",$newAddress);																													//
	$newAddress=str_replace('http://www.cadwolf.com/PartTree/','',$newAddress);																							//
	$newAddress=str_replace('www.cadwolf.com/PartTree/','',$newAddress);																								//
	$newAddress=str_replace('PartTree/','',$newAddress);																												//
	$newAddress=preg_replace("/^\//","",$newAddress);																													//
	$DirInfo1=$this->Get_FolderID($thisFile.'/'.$systemID);																												// 
	$DirInfo2=$this->Get_FolderID($thisFile.'/'.$newAddress);																											// 
	$newAddress=str_replace("http://www.cadwolf.com/PartTree/",'',$newAddress);																							//
	$newAddress=str_replace("www.cadwolf.com/PartTree/",'',$newAddress);																								//
	$newAddress=str_replace("/PartTree/",'',$newAddress);																												//
	$newAddress=str_replace("PartTree/",'',$newAddress);																												//
	$newAddress=preg_replace('/^\//','',$newAddress);																													//
	$systemID=preg_replace('/^\//','',$systemID);																														//
	$num1= sizeof(explode('/', $systemID));																																//
	$num2= sizeof(explode('/', $newAddress));																															//
	Controller::loadModel('Workspace');																																	//
	if ($DirInfo2['exists']=='0')																																		//  
	{	echo('1');																																						//
	}elseif	($num1-$num2!=1)																																			//
	{	echo('1');																																						//
	}else																																								//
	{	$editPerm1=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$systemID);																	//
		$editPerm2=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$newAddress);																	//
		if (($editPerm1=='1')&&($editPerm2=='1'))																														//
		{	$tempData=$this->Workspace->find('first',  array('conditions' => array('id' => $DirInfo1['ID'])));															//
			$tempData['Workspace']['parent_id']=$DirInfo2['ID'];																										//
			$this->Workspace->id=$DirInfo1['ID'];																														//
			$this->Workspace->save($tempData);																															//
		}else{ echo('0'); }																																				//
	}																																									//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*------------------------------------------- This function returns the contents of  system in a JSON element ----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getSystemData() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
	$this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$systemPath=$this->request->data('systemPath');																														//
	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemPath);																											// 
	Controller::loadModel('Workspace');																																	//
	$FileData=$this->Workspace->find('all', array('conditions' => array('parent_id' => $DirInfo['ID']), 'order' => 'Workspace.File_or_Folder ASC'));					//
	$returndata=array();																																				//
	$index=0;																																							//
	foreach ($FileData as &$value)  																																	//
	{	$returndata[$index]=array();																																	//
		$returndata[$index]['type']=$value['Workspace']['File_or_Folder'];																								//
		$returndata[$index]['name']=$value['Workspace']['name'];																										//
		$returndata[$index]['path']=$systemPath;																														//
		$index++;																																						//
	}																																									//
	echo(json_encode($returndata));																																		//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*--------------------------------------------------- This function returns the name of a new part ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getPartNumber() 																																		//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
	$this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$systemPath=$this->request->data('systemPath');																														//
	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemPath);																											// 
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$systemPath);																		//
	if ($editPerm=='1')																																					//
    {	Controller::loadModel('Workspace');																																//
		$FileData=$this->Workspace->find('all', array('conditions' => array('parent_id' => $DirInfo['ID'])));															//
		$flag=0;																																						//
		$Number=1;																																						//
		while ($flag==0)																																				//
		{	if ($Number<10){ $stringNum='000'.$Number; 																													//
			}elseif ($Number<100){ $stringNum='00'.$Number; 																											//
			}elseif ($Number<1000){ $stringNum='0'.$Number; 																											//
			}elseif ($Number<10000){ $stringNum=''.$Number; 																											//
			}else { $flag=1; $returnNum='NA'; }																															//
			$testFlag=0;																																				//
			foreach ($FileData as $index=>$thisfolder)	{	if ($stringNum==$thisfolder['Workspace']['name']){ $testFlag=1;		break; 	} }								//
			if ($testFlag==0){ $flag=1; $returnNum=$stringNum; }else{ $Number=$Number+1; }																				//
		}																																								//
		if($returnNum!="NA") 																																			//
		{	$data = array();																																			//
			$data['Workspace']['parent_id'] = $DirInfo['ID'];																											//
			$data['Workspace']['name'] = $returnNum; $data['Workspace']['File_or_Folder'] = '1'; 																		// 
			$data['Workspace']['admin_status']=2; $data['Workspace']['edit_status']=2; $data['Workspace']['use_status']='1';	$data['Workspace']['view_status']='1';	//  
	        $this->Workspace->create();																																	// 
			$this->Workspace->save($data);																																//
			$lastid=$this->Workspace->getLastInsertID();																												//
		    $this->loadModel('Permission');																																//
		    $data = array();																																			//
	        $data['Permission']['workspace_id']=$lastid;																												//
//	        $data['Permission']['id']=$lastid;																															//  
	        $data['Permission']['userid']=$this->Auth->user('id');																										//  
	        $data['Permission']['view']='1';																															// 
	        $data['Permission']['use']='1';																																// 
	        $data['Permission']['edit']='1';																															//
	        $data['Permission']['admin']='1';																															//
	        $this->Permission->create();																																//
			$this->Permission->save($data);																																//

		}																																								//
		echo($returnNum);																																				//
	}else { echo('00'); }																																				//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*----------------------------------------------- This function deletes a system from the system in question -----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function deleteSystem() 																																			//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
    $this->render('ajax');																																				// 
	$deleteMe=array();																																					//
	$folderFlag=0;																																						//
	$thisFile=$this->request->data('thisFile');																															//
	$systemID=$this->request->data('systemID');																															//
	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																												// 
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$systemID);																			//
	if ($editPerm=='1')																																					//
    {	Controller::loadModel('Workspace');																																//
		$this->Workspace->id=$DirInfo['ID'];																															//
		$this->Workspace->delete($DirInfo['ID']);																														//
		echo('11');																																						//
	}else{ echo('00'); }																																				//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*----------------------------------------------- This function deletes a part from the system in question -------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function deletePart() 																																			//
{	if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																							//
	$this->autorender = false;																																			//
	$this->layout = null;																																				// 
    $this->render('ajax');																																				// 
	$thisFile=$this->request->data('thisFile');																															//
	$partID=$this->request->data('partID');																																//
	$DirInfo=$this->Get_FolderID($thisFile.'/'.$partID);																												// 
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$partID);																			//
	if ($editPerm=='1')																																					//
    {	Controller::loadModel('Workspace');																																//
		$this->Workspace->id=$DirInfo['ID'];																															//
		$this->Workspace->delete($DirInfo['ID']);																														//
		echo('11');																																						//
	}else{ echo('00'); }																																				//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/ 
/*--------------------------------------------- This function gets all the files from the system and subsystems --------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function Get_Files($deleteMe, $fileURL, $userID, $userName) 																										//
{	$editPerm=$this->Get_Permissions('edit', $userID, $fileURL);																										//
	if ($editPerm=='1')																																					//
    {	Controller::loadModel('Workspace');																																//
		$deleteArray=$this->Get_Files($deleteMe, $fileURL, $userID, $userName);																							//
		foreach ($deleteArray as $index=>$thisfile)																														//
		{	array_push($deleteMe, $thisfile['Workspace']['id']);																										//
			if($thisfile['Workspace']['File_or_Folder']=="0") 																											//
			{	$deleteMe=$this->Get_Files($deleteMe, $fileURL, $userID, $userName); }																					//
		}																																								//
		return $deleteMe; 																																				//
	}else{ return 'NA'; }																																				//
}																																										//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ This pulls every item from the part tree and returns it -------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function getFullData() {																																		//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $fileName=$this->request->data('thisFile');																														//
	   	$DirInfo=$this->Get_FolderID($fileName);																														//
    	$viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), $fileName);																					//
		Controller::loadModel('Workspace');																																//
		$thisData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));																//
		if ($viewPerm=='1')																																				//
		{	Controller::loadModel('Workspace');																															//
		    $this->Workspace->id=$DirInfo['ID'];																														// 
			$parentJob = $this->Workspace->find('first', array('conditions' => array('Workspace.id' => $DirInfo['ID']), 'recursive'=>1));								//
			$children = $this->Workspace->find('threaded', array('conditions' => array('Workspace.lft BETWEEN ? AND ?' => array($parentJob['Workspace']['lft'], $parentJob['Workspace']['rght'])), 'fields'=>array('name', 'lft', 'rght', 'parent_id', 'id', 'created', 'modified', 'File_or_Folder', 'quantity', 'use_status', 'view_status', 'edit_status', 'admin_status', 'needsUpdate'), 'recursive'=>1));			
			$parentPerm=array('admin'=>$thisData['Workspace']['admin_status'], 'edit'=>$thisData['Workspace']['edit_status'], 'use'=>$thisData['Workspace']['use_status'], 'view'=>$thisData['Workspace']['view_status']);
			$children['parentData'] = $parentPerm;																														//
			echo(json_encode($children)); 																																//
		}else { echo('00'); }																																			//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- GETS THE VALUE FROM A SINGLE QUANTITY FOR EACH FILE ---------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function getProperty() {																																		//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
		Controller::loadModel('Document');																																//
	    $fileName=$this->request->data('fileName');																														//
		$pTArray= explode(',', $this->request->data('partTree'));																										//
		$parameter=$this->request->data('parameter');																													//
	   	$DirInfo=$this->Get_FolderID($fileName);																														//
		$viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), $fileName);																					//
		$returnArray=array();																																			//
		if ($viewPerm=='1')																																				//
		{	foreach ($pTArray as $path)																																	//
			{	$partPath=$fileName.'/'.str_replace("-","/",$path);																										//
			   	$partInfo=$this->Get_FolderID($partPath);																												//
				$subQuery = $this->Document->find('all', array('conditions' => array('Document.fileid' => $partInfo['ID'], 'Document.name' => $parameter), 'fields'=>'MAX(location)'));								//
				$mainQuery = $this->Document->find('first', array('conditions' => array('Document.fileid' => $partInfo['ID'], 'Document.name' => $parameter, 'Document.location' => $subQuery['0']['0']['MAX(location)']), 'fields'=>'Values'));								//
				$numberObj=json_decode($mainQuery['Document']['Values'], true);																							//
				$returnArray[$path]=$numberObj['real']['0-0'].' '.$numberObj['units'];																					//
			}																																							//
		}																																								//
		echo(json_encode($returnArray));																																//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- UPDATE A QUANTITY FROM THE PART TREE -------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function updateQuantity() {																																	//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $thisFile=$this->request->data('thisFile');																														//
	    $systemID=$this->request->data('systemID');																														//
	    $thisQuantity=$this->request->data('quantity');																													//
	   	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																											//
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile);																					//
		if ($editPerm=='1')																																				//
		{	Controller::loadModel('Workspace');																															//
		    $this->Workspace->id=$DirInfo['ID'];																														// 
			$this->Workspace->saveField('quantity', $thisQuantity);																										// 
			echo('1');																																					//
		}																																								//
	}																																									//
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
	public function updatePermission() {																																//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $thisFile=$this->request->data('thisFile');																														//
	    $systemID=$this->request->data('systemID');																														//
	    $permType=strtolower($this->request->data('permType'));																											//
	    $permission=$this->request->data('permission');																													//
	    $thisQuantity=$this->request->data('quantity');																													//
	   	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																											//
  		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $thisFile.'/'.$systemID);																		//
		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile.'/'.$systemID);																	//
		Controller::loadModel('Workspace');																																//
		$thisData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));																//
		$view=$thisData['Workspace']['view_status'];																													//
		$use=$thisData['Workspace']['use_status'];																														//
		$edit=$thisData['Workspace']['edit_status'];																													//
		$admin=$thisData['Workspace']['admin_status'];																													//
		if (($permType=='admin')&&($adminPerm=='1'))																													//
		{	Controller::loadModel('Workspace');																															//
		    $this->Workspace->id=$DirInfo['ID'];																														// 
			if ($permission=="list") 							{	$this->Workspace->saveField('admin_status', '0');	$admin=0;	}									// 
			if ($permission=="inherit") 						{ 	$this->Workspace->saveField('admin_status', '2');	$admin=2;	$edit=2;	$use=2;		$view=2; }	// 
			echo(json_encode(array('perm'=>$permission, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));													//
		}elseif ($editPerm=='1')																																		//
		{	Controller::loadModel('Workspace');																															//
		    $this->Workspace->id=$DirInfo['ID'];																														// 
			if (($permType=="edit")&&($permission=="list")) 	{ 	$this->Workspace->saveField('edit_status', '0');	$edit=0;										// 
																	$this->Workspace->saveField('admin_status', '0');	$admin=0;	}									// 
			if (($permType=="edit")&&($permission=="inherit"))	{ 	$this->Workspace->saveField('edit_status', '2');	$edit=2;										// 
																	$this->Workspace->saveField('use_status', '2');		$use=2;											// 
																	$this->Workspace->saveField('view_status', '2');	$view=2;	}									// 
			if (($permType=="use")&&($permission=="open")) 		{ 	$this->Workspace->saveField('use_status', '1');		$use=1;											// 
																 	$this->Workspace->saveField('view_status', '1');	$view=1;	}									// 
			if (($permType=="use")&&($permission=="list")) 		{ 	$this->Workspace->saveField('use_status', '0');		$use=0;											// 
																	$this->Workspace->saveField('edit_status', '0');	$edit=0;										// 
																	$this->Workspace->saveField('admin_status', '0');	$admin=0;	}									// 
			if (($permType=="use")&&($permission=="inherit")) 	{ 	$this->Workspace->saveField('use_status', '2');		$use=2;											// 
																	$this->Workspace->saveField('view_status', '2');	$view=2;	}									// 
			if (($permType=="view")&&($permission=="open")) 	{ 	$this->Workspace->saveField('view_status', '1');	$view=1;	}									// 
			if (($permType=="view")&&($permission=="inherit"))	{ 	$this->Workspace->saveField('view_status', '2');	$view=2;	}									// 
			if (($permType=="view")&&($permission=="list")) 	{ 	$this->Workspace->saveField('view_status', '0');	$view=0;										// 
																	$this->Workspace->saveField('use_status', '0');		$use=0;											// 
																	$this->Workspace->saveField('edit_status', '0');	$edit=0;										// 
																	$this->Workspace->saveField('admin_status', '0');	$admin=0;	}									// 
			echo(json_encode(array('perm'=>$permission, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));													//
		}else { echo('0'); }																																			//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- CHANGE A USER PERMISSION IN THE PART TREE --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is changing one of the user permissions. The change is always either granting or removing permission in one of the four areas.		\
	This code changes that permission for the user in the database and then ensures that the remaining permissions make sense. For example, if the user is given edit	\
	permission then view and use are also given.																														\											\ 
	Note that you must be the creator of the file in order to remove someone's admin permission.																		\
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function changeUserPerm() {																																	//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $thisFile=$this->request->data('thisFile');																														//
	    $systemID=$this->request->data('systemID');																														//
	    $userName=$this->request->data('userName');																														//
	    $permType=strtolower($this->request->data('permType'));																											//
	    $newPerm=strtolower($this->request->data('newPerm'));																											//
	   	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																											//
 		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile.'/'.$systemID);																	//
		$fileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']), 'recursive'=>-1));												//
		if ($adminPerm=='1')																																			//
		{	Controller::loadModel('Workspace');																															//
			Controller::loadModel('Permission');																														//
			if (!$this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'username'=>$userName)))																//  
			{	$this->loadModel('User');																																//
				if ($this->User->hasAny(array('username'=>$userName))) 																									//  
				{	$userData=$this->User->find('first', array('conditions' => array('username' => $userName), 'recursive'=>-1));										//
					$usertype=1;																																		//
					$userid=$userData['User']['id'];																													//
																																										//
					$this->Permission->create();																														// 
					$thisarray=array();																																	// 
					$thisarray['Permission']['workspace_id']=$DirInfo['ID'];																							//
					$thisarray['Permission']['workspace_name']=$DirInfo['Name'];																						//
					$thisarray['Permission']['username']=$userName;																										//
					$thisarray['Permission']['usertype']=$usertype;																										//
					$thisarray['Permission']['userid']=$userid;																											//
					$thisarray['Permission']['admin']=0;																												//
					$thisarray['Permission']['edit']=0;																													//
					$thisarray['Permission']['use']=1;																													//
					$thisarray['Permission']['view']=1; 																												//
					$this->Permission->save($thisarray);																												//
				}																																						//
			}																																							//
			$thisData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $DirInfo['ID'], 'username'=>$userName)));							//
			$admin=(int)$thisData['Permission']['admin'];																												//
			$edit=(int)$thisData['Permission']['edit'];																													//
			$use=(int)$thisData['Permission']['use'];																													//
			$view=(int)$thisData['Permission']['view'];																													//
			if ($newPerm==0)																																			//
			{	if ($permType=="view"){		$thisData['Permission']['view']=0;		$view=0;																			//
											$thisData['Permission']['use']=0;		$use=0;																				//
											$thisData['Permission']['edit']=0;		$edit=0;																			//	
											$thisData['Permission']['admin']=0;		$admin=0;	}																		//
				if ($permType=="use"){ 		$thisData['Permission']['use']=0; 		$use=0;																				//
											$thisData['Permission']['edit']=0;		$edit=0;																			//
											$thisData['Permission']['admin']=0; 	$admin=0;	}																		//
				if ($permType=="edit"){ 	$thisData['Permission']['edit']=0; 		$edit=0;																			//
											$thisData['Permission']['admin']=0;		$admin=0;	}																		//
				if (($permType=="admin")&&($this->Auth->user('id')==$fileData['Workspace']['creator'])){																//
											$thisData['Permission']['admin']=0; 	$admin=0;	}																		//
			}else if ($newPerm==1)																																		//
			{	if ($permType=="admin"){	$thisData['Permission']['admin']=1;		$admin=1;																			//
											$thisData['Permission']['edit']=1;		$edit=1;																			//
											$thisData['Permission']['use']=1;		$use=1;																				//	
											$thisData['Permission']['view']=1;		$view=1;	}																		//
				if ($permType=="edit"){ 	$thisData['Permission']['edit']=1; 		$edit=1;																			//
											$thisData['Permission']['use']=1;		$use=1;																				//
											$thisData['Permission']['view']=1; 		$view=1;	}																		//
				if ($permType=="use"){ 		$thisData['Permission']['use']=0; 		$use=1;																				//
											$thisData['Permission']['view']=0;		$view=1;	}																		//
				if ($permType=="view"){		$thisData['Permission']['view']=0; 		$view=1;	}																		//
			}																																							//
		    $this->Permission->id=$thisData['Permission']['id'];																										// 
			$this->Permission->save($thisData);																															//																																									//
			echo(json_encode(array('username'=>$userName, 'admin'=>$admin, 'edit'=>$edit, 'use'=>$use, 'view'=>$view)));												//
		}else { echo(json_encode(array('error'=>'You need admin permission'))); }																						//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- ADD A USER PERMISSION TO THE PART TREE ---------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is adding a permission for a user. The code updates the permission and then ensures that the user has all subsequent permissions.	\
	For example, if the user is being given permission to use the file then they are also given permission to view the file.											\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function addUserPerm() {																																		//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $thisFile=$this->request->data('thisFile');																														//
	    $systemID=$this->request->data('systemID');																														//
	    $userName=$this->request->data('userName');																														//
	    $permType=strtolower($this->request->data('permType'));																											//
	   	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																											//
		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile.'/'.$systemID);																	//
		if ($adminPerm=='1')																																			//
		{	Controller::loadModel('Permission');																														//
			if ($this->Permission->hasAny(array('workspace_id' => $DirInfo['ID'], 'username'=>$userName))) 																//  
			{	echo(json_encode(array('error'=>'Permission Already Exists')));																							//
			}else 																																						//
			{	Controller::loadModel('User');																															//
				if ($this->User->hasAny(array('username'=>$userName))) 																									//  
				{	if ($this->User->hasAny(array('username'=>$userName))) 																								//  
					{	$userData=$this->User->find('first', array('conditions' => array('username' => $userName), 'recursive'=>-1));	$usertype=1;					//
						$thisarray=array();																																// 
						$thisarray['Permission']=array();																												// 
						$thisarray['Permission']['workspace_id']=$DirInfo['ID'];																						//
						$thisarray['Permission']['workspace_name']=$DirInfo['Name'];																					//
						$thisarray['Permission']['username']=$userName;																									//
						$thisarray['Permission']['usertype']=$usertype;																									//
						$thisarray['Permission']['userid']=$userData['User']['id'];																						//
						$thisarray['Permission']['admin']=0;																											//
						$thisarray['Permission']['edit']=0;																												//
						$thisarray['Permission']['use']=1;																												//
						$thisarray['Permission']['view']=1; 																											//
						$this->loadModel('Permission');																													//
						$this->Permission->clear();																														// 
						$this->Permission->create();																													// 
						$this->Permission->save($thisarray);																											//
						echo(json_encode(array('userid'=>$userData['User']['id'], 'usertype'=>$usertype, 'admin'=>0, 'edit'=>0, 'use'=>1, 'view'=>1)));					//
					}																																					//
				}else  { echo(json_encode(array('error'=>'No such user'))); }																							//
			} 																																							//
		}else { echo(json_encode(array('error'=>'You need admin permission'))); }																						//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------- DELETE A USER PERMISSION FROM THE PART TREE ------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This is the case where the user is deleting a user permission from a system. The function deletes the line and returns nothing.										\ 
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function deleteUserPerm() {																																	//
 		$this->autorender = false;																																		//
 		$this->layout = null;																																			//
  	    $this->render('ajax');																																			//
	    $thisFile=$this->request->data('thisFile');																														//
	    $systemID=$this->request->data('systemID');																														//
	    $userName=$this->request->data('userName');																														//
	   	$DirInfo=$this->Get_FolderID($thisFile.'/'.$systemID);																											//
		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $thisFile.'/'.$systemID);																	//
		Controller::loadModel('Workspace');																																//
		$fileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']), 'recursive'=>-1));												//
		if ($adminPerm=='1')																																			//
		{	Controller::loadModel('Permission');																														//
			Controller::loadModel('User');																																//
			$thisData=$this->Permission->find('first', array('conditions' => array('workspace_id' => $DirInfo['ID'], 'username'=>$userName)));							//
			$admin=(int)$thisData['Permission']['admin'];																												//
			if ($thisData['Permission']['admin']=='0')																													//
			{	$this->Permission->deleteAll(array('username' => $userName, 'workspace_id'=> $DirInfo['ID']) );															//
			}else																																						//
			{	if ($this->Auth->user('id')==$fileData['Workspace']['creator'])																							//
				{	$this->Permission->delete(array('username' => $userName, 'workspace_id'=> $DirInfo['ID']) );														//
				}else { echo(json_encode(array('error'=>'You must be the creator to remove admin permission'))); }														//
			}																																							//
		}else { echo(json_encode(array('error'=>'You need admin permission'))); }																						//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

}