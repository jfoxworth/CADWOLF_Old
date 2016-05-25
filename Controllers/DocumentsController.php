<?php

class DocumentsController extends AppController {

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																																//
        $this->layout = 'documents';																														//
		$DirInfo=$this->Get_FolderID(Router::url(null, true));																								//	\
		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), Router::url(null, true));														//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), Router::url(null, true));															//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), Router::url(null, true));															//	\
		$viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), Router::url(null, true));															//	\
		$Permissions=array();																																//
		$Permissions['admin']=$adminPerm;																													//
		$Permissions['edit']=$editPerm;																														//
		$Permissions['use']=$usePerm;																														//
		$Permissions['view']=$viewPerm;																														//
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($Permissions['edit']=='1'))		{	$this->DeleteOldData($DirInfo);	}						//
		$this->set('DirInfo', $DirInfo);																													//	\--- ID and other info for folder
		$this->set('Permissions',$Permissions);																												//	\--- Permissions for the user
		$this->set('timezone', $this->Auth->user('time zone'));																								//	\--- Time zone for the user
//		$this->set('timezone', $this->Auth->user('US/Central'));																								//	\--- Time zone for the user
		$FileInfo=$this->GetData($DirInfo, "FileInfo", 0, $DirInfo['checkoutID'], $editPerm);																//	\
		$this->set("FileInfo", $FileInfo);																													//	\--- The Workspace file info
		if ($FileInfo['Workspace']['TOC']==0) 																												//	\--- If the file is being loaded and has no table of contents then 
		{		$this->set("FileData", $this->GetData($DirInfo, "FileData", 0, $DirInfo['checkoutID'], $Permissions['edit']));								//	\--- it is a stand alone document and all of it is loaded. If it has
		}else { $this->set("FileData", $this->GetData($DirInfo, "ShortFileData", 0, $DirInfo['checkoutID'], $Permissions['edit'])); 						//	\--- a TOC, then the equations and tables only are loaded on page load
				$this->set("MainData", $this->GetData($DirInfo, "MainData", 0, $DirInfo['checkoutID'], $Permissions['edit']));	}							//	\
		$this->set("Constants", $this->GetData($DirInfo, "Constants", 0, $DirInfo['checkoutID'], $Permissions['edit']));									//	\--- Grab the constants
		$this->set("ScaleUnits", $this->GetData($DirInfo, "ScaledUnits", 0, $DirInfo['checkoutID'], $Permissions['edit']));									//	\--- Grab the Scale Units
		$this->set("ParseUnits", $this->GetData($DirInfo, "ParsedUnits", 0, $DirInfo['checkoutID'], $Permissions['edit']));									//	\--- Grab the Parse Units
		$this->set("UserName", $this->Auth->user('username'));																								//	
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function charts() {																																//	\
        $this->layout = 'documents';																														//	\
		$itemid=str_replace('http://www.cadwolf.com/Charts/','',Router::url(null, true));																	//	\
		$pattern='/^[File]+/';																																//	\
		$id=preg_match($pattern, $itemid);																													//	\
		$pattern='/^[0-9]+/';																																//	\
		$id=preg_match($pattern, $id);																														//	\
		$DirInfo=Array();																																	//	\
		$DirInfo['ID']=$id; $DirInfo['ItemID']=$itemid;																										//	\
		$Permissions=Array();																																//	\
		$Permissions['edit']=0; 	$Permissions['view']=1;		$Permissions['use']=0;																		//	\
		$this->set('Permissions',$Permissions);																												//	\
		$this->set('DirInfo', $DirInfo);																													//	\
		$this->set('timezone', $this->Auth->user('time zone'));																								//	\
		$this->set("FileInfo", $this->GetData($DirInfo, "FileInfo", 0, "NA", 0));																			//	\
		$this->set("FileData", $this->GetData($DirInfo, "SingleData", $itemid, "NA", 0));																	//	\
		$this->set("UserName", $this->Auth->user('username'));																								//	
   }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- The function that grabs specific items -------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetData($DirInfo, $Data, $itemid, $checkout, $edit) {																					//
    	if ($Data=="FileInfo") 																																//
    	{	Controller::loadModel('Workspace');																												//
    		$ReturnData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 												//
																																							//
    	}elseif ($Data=="FileData")																															//
    	{	Controller::loadModel('Document');																												//
    	    $ReturnData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID']), 'order' => 'Document.location ASC'));			//
    		if (($this->Auth->user('id')==$checkout)&&($edit=='1')) { $this->PlaceTempData($ReturnData);	}												//
    	}elseif ($Data=="ShortFileData")																													//
    	{	Controller::loadModel('Document');																												//
    	    $ReturnData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID'], 'vartype'=>array(2,3,5,6,7,8)),'order' => 'Document.location ASC'));			//
    		if (($this->Auth->user('id')==$checkout)&&($edit=='1')) { $this->PlaceTempData($ReturnData);	}												//
    	}elseif ($Data=="MainData")																															//
    	{	Controller::loadModel('Document');																												//
    	    $ReturnData=$this->Document->find('all', array('recursive' => 1, 'conditions' => array('fileid' => $DirInfo['ID']), 'order' => 'Document.location ASC'));			//
    		if (($this->Auth->user('id')==$checkout)&&($edit=='1')) { $this->PlaceTempData($ReturnData);	}												//
    	}elseif ($Data=="SingleData")																														//
    	{	Controller::loadModel('Document');																												//
    	    $ReturnData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('id' => $itemid), 'order' => 'Document.location ASC'));	//
    		if (($this->Auth->user('id')==$checkout)&&($edit=='1')) { $this->PlaceTempData($ReturnData);	}												//
    	}elseif ($Data=="FunctionInputs")																													//
    	{	$ReturnData='';																																	//
    	    Controller::loadModel('Workspace');																												//
			$InputInfo=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));												//
			$ReturnData=$InputInfo['Workspace'];																											//
	    }elseif ($Data=="Constants")																														//
	    {																																					//
   			Controller::loadModel('Constant');																												//
   			$ReturnData=$this->Constant->find('all');																										//
																																							//
	    }elseif ($Data=="ScaledUnits")																														//
	    {																																					//
   			Controller::loadModel('ScaledUnit');																											//
   			$ReturnData=$this->ScaledUnit->find('all');																										//
																																							//
	    }elseif ($Data=="ParsedUnits")																														//
	    {																																					//
   			Controller::loadModel('ParsedUnit');																											//
   			$ReturnData=$this->ParsedUnit->find('all');																										//
   	    }																																					//
																																							//
    	return $ReturnData;																																	//
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Recheck function inputs upon page load -------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function checkInputs() 																															//
 	{	$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
	    $inputData=$this->request->data('inputObj');																										//
		$data=json_decode($inputData, TRUE);																												//
		Controller::loadModel('Document'); 																													//
		$returnData=array();																																//	
		foreach ($data as &$eqData)  																														//
	    {	$Data1=$this->Document->find('first', array('conditions' => array('id' => $eqData['inputID'])));												//
			$Data2=$this->Document->find('first', array('conditions' => array('id' => $eqData['ID'])));														//
			$Values1=json_decode($Data1['Document']['data'], true);																							//
			$Values2=json_decode($Data2['Document']['data'], true);																							//
			if (($Values1['Solution_real']!=$Values2['Solution_real'])||($Values1['Solution_imag']!=$Values2['Solution_imag']))								//
			{	$returnData[$eqData['ID']]=array();																											//
				$Values=json_decode($Data1['Document']['data'], true);																						//
				$returnData[$eqData['ID']]['real']=$Values['Solution_real'];																				//
				$returnData[$eqData['ID']]['imag']=$Values['Solution_imag'];																				//
				$returnData[$eqData['ID']]['size']=$Values['Format_size'];																					//
				$returnData[$eqData['ID']]['units']=$Values['Units_units'];																					//
				$returnData[$eqData['ID']]['quantity']=$Values['Units_quantity'];																			//
			}																																				//
		}																																					//
		$objdata=json_encode($returnData);																													//
		echo($objdata);																																		//
	}																																						//			
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function VerifyAddress() 																												//	\
 	{	$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $fileURL=$this->request->data('path');																										//	\
		$DirInfo=$this->Get_FolderID($fileURL);																										//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $fileURL);																	//	\
		if ($usePerm==1) { echo(json_encode($DirInfo));	}else { echo(0); }																			//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Take URL Slug and produce the file id --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileID($slug) {																														//
		Controller::loadModel('Workspace');																													//
		$slug=str_replace("http://www.cadwolf.com/Documents/",'',$slug);																					//
		$slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																						//
		$slug=str_replace("/Documents/",'',$slug);																											//
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
		$DirInfo['FunctionName']=$tempdata['Workspace']['FunctionName'];																					//	\
		$DirInfo['address']="/".str_replace("_"," ",$slug);																									//	\
		return $DirInfo;																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- Take ID and return information ----------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileInfo($fileid) {																													//
		Controller::loadModel('Workspace');																													//
		$DirInfo=array();																																	//
		$DirInfo['ID']=$fileid;																																//
		$tempdata=$this->Workspace->find('first', array('conditions' => array('id' => $fileid)));															//
		$DirInfo['checkoutName']=$tempdata['Workspace']['CheckedOut'];																						//
		$DirInfo['checkoutID']=$tempdata['Workspace']['checkoutID'];																						//
		return $DirInfo;																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- Deletes data from temp database on page load ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function DeleteOldData($DirInfo) {																												//
		Controller::loadModel('DocumentTemp');																												//
		$this->DocumentTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Deletes an item from the temp database -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function DeleteItem() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
	    $fileURL=$this->request->data('fileURL');																											//
	    $itemid =$this->request->data('id');																												//
		$id=$itemid;																																		//
	    $type=$this->request->data('type');																													//
	    $location=$this->request->data('thisloc');																											//
	    $plotid =$this->request->data('plotid');																											//
	    $insert=$this->request->data('insert');																												//
		$DirInfo=$this->Get_FolderID($fileURL);																												//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																				//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																			//
		{	if (($type!="axis")&&($type!="dataset"))																										//
			{	Controller::loadModel('DocumentTemp');	$this->DocumentTemp->id=$itemid; $this->DocumentTemp->saveField('tobedeleted', 1);	}				//
			if ($insert==1) 																																//
			{	$this->DocumentTemp->updateAll(																												//
    				array('DocumentTemp.location' => 'DocumentTemp.location-1'),																			//	
   	 				array('DocumentTemp.fileid' => $DirInfo['ID'], 'DocumentTemp.location >' => $location)													//
				);																																			//
			}																																				//
		}																																					//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- When an item is added or deleted, it is added to the databases and the location is adjusted ---------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateLocations() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileURL = 	$this->request->data('fileURL');																														//
	    $textstring=$this->request->data('text');																															//
	    $insert=$this->request->data('insert');																																//
		$DirInfo=$this->Get_FolderID($fileURL);																																//
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																						//
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																							//
		{	$data=explode("::",$textstring);																																//
			Controller::loadModel('DocumentTemp');																															//
			if ($insert=="1")																																				//
			{	$this->DocumentTemp->updateAll(																																//
	    			array('DocumentTemp.location' => 'DocumentTemp.location+1'),																							//	
	    			array('DocumentTemp.fileid' => $DirInfo['ID'], 'DocumentTemp.location >=' => $data[1], 'DocumentTemp.inputID' => '')									//
				);																																							//
			}																																								//
			$this->DocumentTemp->create();																																	//
			$data_array=array();																																			//
			$data_array['DocumentTemp']['fileid']=$DirInfo['ID'];																											//
			$data_array['DocumentTemp']['itemid']=$data[0];																													//
			$data_array['DocumentTemp']['location']=$data[1];																												//
			$data_array['DocumentTemp']['vartype']=$data[2];																												//
			$data_array['DocumentTemp']['parentid']=$data[3];																												//
			$data_array['DocumentTemp']['topparentid']=$data[4];																											//
			$data_array['DocumentTemp']['id']=$data[0];																														//
			$this->DocumentTemp->id=$data[0];																																//
			$this->DocumentTemp->set($data_array); 																															//
			$this->DocumentTemp->save();																																	//
			$da=array();																																					//
		}else { echo('0'); }																																				//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- This saves the width or margin whenever it is edited ----------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateFormats() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileURL = 	$this->request->data('fileURL');																														//
	    $textstring=$this->request->data('text');																															//
		$data=explode("::",$textstring);																																	//
		$DirInfo=$this->Get_FolderID($fileURL);																																//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																								//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																							//
		{	Controller::loadModel('DocumentTemp');																															//
			$data_array=$this->DocumentTemp->find('first', array('conditions' => array('DocumentTemp.fileid' => $DirInfo['ID'], 'DocumentTemp.itemid' => $data[0])));		//
			$data_array['DocumentTemp']['width']=str_replace("px","",$data[1]);																								//
			$data_array['DocumentTemp']['margintop']=str_replace("px","",$data[2]);																							//
			$data_array['DocumentTemp']['marginbottom']=str_replace("px","",$data[3]);																						//
			$data_array['DocumentTemp']['marginleft']=str_replace("px","",$data[4]);																						//
			$data_array['DocumentTemp']['marginright']=str_replace("px","",$data[5]);																						//
			$this->DocumentTemp->save($data_array); 																														//
		}																																									//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- This saves the width or margin whenever it is edited ----------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateDocWidth() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileURL = 	$this->request->data('fileURL');																														//
	    $width=$this->request->data('width');																																//
		Controller::loadModel('DocumentTemp');																																//
		$DirInfo=$this->Get_FolderID($fileURL);																																//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																						//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																							//
		{	$this->DocumentTemp->updateAll(array('DocumentTemp.mainwidth' => $width), array('DocumentTemp.fileid' => $DirInfo['ID']));		}								//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ This is the code that saves a bug reported ------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveBug() {																																				//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileURL=$this->request->data('fileURL');																															//
		$DirInfo=$this->Get_FolderID($fileURL);																																//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																						//	\
	    $text=$this->request->data('text');																																	//
		$data_array=array();																																				//
		$data_array['Bugs']['text']=$text;																																	//
		$data_array['Bugs']['fileid']=$DirInfo['ID'];																														//
		$data_array['Bugs']['user']=$this->Auth->user('username');																											//
		$data_array['Bugs']['userid']=$this->Auth->user('id');																												//
		Controller::loadModel('Bugs');																																		//
		$this->Bugs->create();																																				//
		$this->Bugs->set($data_array); 																																		//
		$this->Bugs->save();																																				//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- This permanently saves the file by moving the temp items to the main database -----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function SaveFile() {																																				//
	$this->autorender = false;																																				//
	$this->layout = null;																																					//
	$this->render('ajax');																																					//
    $fileURL=$this->request->data('fileURL');																																//
    $checkin=$this->request->data('checkin');																																//
	$DirInfo=$this->Get_FolderID($fileURL);																																	//	\
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																									//	\
	if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																								//
	{	Controller::loadModel('DocumentTemp');																																//
		$TempFileCount=$this->DocumentTemp->find('count', array('conditions' => array('fileid' => $DirInfo['ID'])));														//
		$FileData=$this->DocumentTemp->find('all', array('conditions' => array('fileid' => $DirInfo['ID'])));																//
		foreach ($FileData as &$value) { 																																	//
			$id=$value['DocumentTemp']['id'];																																//
			Controller::loadModel('Document');																																//
			$thisdata=array();																																				//
			$this->Document->create(); 																																		//	
			$thisdata['Document']=$value['DocumentTemp'];																													//
			$this->Document->set($thisdata); 																																//
			$this->Document->save(); 																																		//
			if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Document->deleteAll(array('id' => $id)); 	$this->DocumentTemp->deleteAll(array('id' => $id)); }		//
		}																																									//
		Controller::loadModel('Workspace');																																	//
		$this->Workspace->id=$DirInfo['ID'];																																//
		$this->Workspace->saveField('needsUpdate', '0');																													//
		Controller::loadModel('Document');																																	//
		$updateData=$this->Document->find('all', array('conditions' => array('inputFile' => $DirInfo['ID'])));																//
		Controller::loadModel('Workspace');																																	//
		foreach ($updateData as $index=>$thisFolder)																														//
		{	$this->Workspace->id=$thisFolder['Document']['fileid'];																											//
		 	$this->Workspace->saveField('needsUpdate', '1');																												//
		} 																																									//
		echo('11'); 																																						//
	}else { echo('00'); }																																					//
}																																											//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ This permanently saves the file by moving the temp items to the main database --------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function internalSaveFile($fileid) {																														//	\
		Controller::loadModel('DocumentTemp');																														//	\
		$TempFileCount=$this->DocumentTemp->find('count', array('conditions' => array('fileid' => $fileid)));														//	\
		$FileData=$this->DocumentTemp->find('all', array('conditions' => array('fileid' => $fileid)));																//	\
		foreach ($FileData as &$value) { 																															//	\
			$id=$value['DocumentTemp']['id'];																														//	\
			Controller::loadModel('Document');																														//	\
			$thisdata=array();																																		//	\
			$this->Document->create(); 																																//	\
			$thisdata['Document']=$value['DocumentTemp'];																											//	\
			$this->Document->set($thisdata); 																														//	\
			$this->Document->save(); 																																//	\
			if ($value['DocumentTemp']['tobedeleted']=='1'){ $this->Document->deleteAll(array('id' => $id)); $this->DocumentTemp->deleteAll(array('id' => $id)); }	//	\
		}																																							//	\
	}																																								//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------- This function takes in the id of the current folder and returns an array of the folder tree with the permissions of each folder -------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*
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
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*
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


/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- This gets the id of a folder based on a url slug ----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function Get_FolderID($slug) {																																//	\
	Controller::loadModel('Workspace');																																//	\
	$slug=str_replace("http://www.cadwolf.com/Documents/",'',$slug);																								//	\
	$slug=str_replace("www.cadwolf.com/Documents/",'',$slug);																										//	\
	$slug=str_replace("/Documents/",'',$slug);																														//	\
	$slug=str_replace("Documents/",'',$slug);																														//	\
	$slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																								    //	\
	$slug=str_replace("www.cadwolf.com/Datasets/",'',$slug);																										//	\
	$slug=str_replace("/Datasets/",'',$slug);																														//	\
	$slug=str_replace("Datasets/",'',$slug);																														//	\
	$slug=str_replace("http://www.cadwolf.com/Workspaces/",'',$slug);																								//	\
	$slug=str_replace("www.cadwolf.com/Workspaces/",'',$slug);																										//	\
	$slug=str_replace("/Workspaces/",'',$slug);																														//	\
	$slug=str_replace("Workspaces/",'',$slug);																														//	\
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

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- This is called after changes to items and saves those changes in the temporary database --------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function SaveTempData() 																																		//	\
{	$this->autorender = false;																																		//	\
	$this->layout = null;																																			//	\
	$this->render('ajax');																																			//	\
    $fileURL=$this->request->data('fileURL');																														//	\
	$id=$this->request->data('itemid');																																//	\
	$data=$this->request->data('jsonitem');																															//	\
	$name=$this->request->data('name');																																//	\
	$inputFile=$this->request->data('inputFile');																													//	\
	$inputID=$this->request->data('inputID');																														//	\
	$values=$this->request->data('values');																															//	\
	Controller::loadModel('DocumentTemp');																															//	\
	$this->DocumentTemp->data=$data;																																//	\
	$this->DocumentTemp->id=$id;																																	//	\
	$DirInfo=$this->Get_FolderID($fileURL);																															//	\
	$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																					//	\
	if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																						//	\
	{	if (($data!='')&&($inputFile!=''))																															//	\
		{	$this->DocumentTemp->saveField('data', $data);																											//	\
			$this->DocumentTemp->saveField('Name', $name);																											//	\
			$this->DocumentTemp->saveField('Values', $values);																										//	\
			$this->DocumentTemp->saveField('inputFile', $inputFile);																								//	\
			$this->DocumentTemp->saveField('inputID', $inputID);																									//	\
		}elseif ($data!='')																																			//	\
		{	$this->DocumentTemp->saveField('data', $data);																											//	\
			$this->DocumentTemp->saveField('Name', $name);																											//	\
			$this->DocumentTemp->saveField('Values', $values);																										//	\
	}	}																																							//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------ This function pulls the information from the main database when the page is loaded ---------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function PlaceTempData($FileData) 																															//	\
{	foreach ($FileData as $index=>$value) 																															//	\
	{	Controller::loadModel('DocumentTemp');																														//	\
		$this->DocumentTemp->create();																																//	\
		$data_array=array();																																		//	\
		$data_array['DocumentTemp']=$value['Document'];																												//	\
		$this->DocumentTemp->id=$data_array['DocumentTemp']['id'];																									//	\
		$this->DocumentTemp->set($data_array); 																														//	\
		$this->DocumentTemp->save();																																//	\
	}																																								//	\
}																																									//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- This displays the files in a folder or the equations in a file for the inputs page ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function GetFileFolderContent() {																																		//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $type=$this->request->data('type');																																			//
	    $directory=$this->request->data('directory');																																//
																																													//
		if ($type=="files")																																							//
		{	$DirInfo=$this->Get_FileID($directory);																																	//
			Controller::loadModel('Workspace');																																		//
			$FileData=$this->Workspace->find('all', array('conditions' => array('parent_id' => $DirInfo['ID']), 'order' => 'Workspace.File_or_Folder ASC'));						//
			$returndata='';																																							//
			foreach ($FileData as &$value) { 																																		//
				if ($value['Workspace']['File_or_Folder']=="0")																														//
				{																																									//
					$tempdata='<div class="folderline" name="'.$value['Workspace']['name'].'" filenumber="'.$value['Workspace']['id'].'">';											//
					$tempdata=$tempdata.'<div class="filefoldername">'.$value['Workspace']['name'].'</div></div>';																	//
				}else																																								//
				{																																									//
					$tempdata='<div class="fileline" name="'.$value['Workspace']['name'].'" filenumber="'.$value['Workspace']['id'].'">';											//
					$tempdata=$tempdata.'<div class="filefoldername">'.$value['Workspace']['name'].'</div></div>';																	//
				}																																									//
				$returndata=$returndata."".$tempdata;																																//
			}																																										//
			echo($returndata);																																						//
		}																																											//
		if ($type=="equations")																																						//
		{																																											//
	    	Controller::loadModel('Document');																																		//
    		$EqData=$this->Document->find('all', array('conditions' => array('fileid' => $directory, 'vartype' => array(3)), 'order' => 'Document.location ASC'));					//
			$returndata='<div class="equationline"><div class="equationlinecheckbox equationlinelabel">Input</div>';																//
			$returndata=$returndata.'<div class="equationlinename equationlinelabel">Name</div><div class="equationlinevalue equationlinelabel">Value</div></div>';					//
			foreach ($EqData as &$value)  																																			//
			{																																										//
				$dataobj=json_decode($value['Document']['data'], true);																												//
				$dataarr=array('filenumber'=>$directory, 																															//
					'itemid'=>$dataobj['Format_id'], 																																//
					'name'=>$dataobj['Format_name'], 																																//
					'size'=>$dataobj['Format_size'], 																																//
					'Solution_real'=>$dataobj['Solution_real'],																														//
					'Solution_imag'=>$dataobj['Solution_imag'],																														//
					'Units_units'=>$dataobj['Units_units'],																															//
					'Units_quantity'=>$dataobj['Units_quantity']																													//
				);																																									//
																																													//
				$vardata= json_encode($dataarr);																																	//
																																													//
				if ($dataobj['Format_size']=="1x1") {	$eqvalue=$dataobj['Solution_real']['0-0'].' '.$dataobj['Units_units']; 														//
				}else {	$eqvalue="Matrix - ".$dataobj['Format_size']; }																												//
				$tempdata='<div class="equationline" filenumber="'.$directory.'" name="'.$dataobj['Format_name'].'" itemid="'.$dataobj['Format_id'].'">';							//
				$tempdata=$tempdata.'<div class="equationlinecheckbox"><input type="checkbox" class="inputcheckbox"></div>';														//
				$tempdata=$tempdata.'<div class="equationlinename">'.$dataobj['Format_name'].'</div>';																				//
				$tempdata=$tempdata.'<div class="equationlinevalue">'.$eqvalue.'</div>';																							//
				$tempdata=$tempdata.'<div class="equationlinehide">'.$vardata.'</div></div>';																						//
				$returndata=$returndata."".$tempdata;																																//
			}																																										//
			echo($returndata);																																						//
		}																																											//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------ This function is called to change the name used to call this file as a function ------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function FunctionName() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
		Controller::loadModel('Workspace');																												//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $name=$this->request->data('name');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 											//	\
			$this->Workspace->id=$DirInfo['ID'];																										//	\
			$this->Workspace->saveField('FunctionName', $name);																							//	\
			echo('1');																																	//	\
		}else { echo('0'); }																															//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------- This function is sent the name of a possible function and looks to find the appropriate file ----------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*
	public function FindFileAsFunction() {																												//--- This function is called to find
 		$this->autorender = false;																														//--- the closest file as a function name
 		$this->layout = null;																															//--- that matches any in the array passed.
  	    $this->render('ajax');																															//--- It does this by looping through the 
		Controller::loadModel('Workspace');																												//--- solution array passed, finding any 
	    $varray=$this->request->data('varray');																											//--- matches in the parent directory and then
	    $fileid=$this->request->data('fileid');																											//--- returning that ID.
	    $parent = $this->Workspace->getParentNode($fileid);																								//
   		$result_array=array();																															//*******************************************
   		$result_array['id']=array();																													//*******************************************
   		$result_array['path']=array();																													//*******************************************
   		foreach ($varray as $index=>$value) 																											//Note: this needs to be updated to look
   		{	if (($value!="+")&&($value!="-")&&($value!="/")&&($value!="*")&&($value!="^")&&($value!="")&&(!is_numeric($value)))							//in the users set folders 
	   		{   if ($this->Workspace->hasAny(array('parent_id' => $parent['Workspace']['id'], 'FunctionName'=>$value)))									//*******************************************
				{	$RetData=$this->Workspace->find('first',array('conditions'=>array('parent_id'=>$parent['Workspace']['id'],'FunctionName'=>$value)));//
			   		$result_array['id'][$index]=$RetData['Workspace']['id'];																			//
			   		$temp=$this->Workspace->getPath($RetData['Workspace']['id']);																		//
					$path='';																															//
					foreach ($temp as $pathindex=>$pathvalue) { $path=$path.''.$pathvalue['Workspace']['name'].'/';  }									//
					$result_array['path'][$index]=$path;																								//
				}else{ $result_array['id'][$index]='0'; $result_array['path'][$index]='0'; }															//
   			}else{	$result_array['id'][$index]='0'; $result_array['path'][$index]='0'; }																//
   		}																																				//
		echo(json_encode($result_array));																												//
	}																																					//
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------- These functions simply store the temporary data for the file inputs and outputs as a function -----------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateFunctionInputs() {																											//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $type=$this->request->data('type');																												//	\
	    $data=$this->request->data('thisdata');																											//	\
		Controller::loadModel('Workspace');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		$this->Workspace->id=$DirInfo['ID'];																											//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	if ($type=="Inputs") 	{ $this->Workspace->saveField('inputs', $data); }																	//	\
			if ($type=="Outputs") 	{ $this->Workspace->saveField('outputs', $data); }																	//	\
			if ($type=="Functions") { $this->Workspace->saveField('Functions', $data); }																//	\
		}																																				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------- This function is given the file id of that to be used as a function. It returns the relavent data -----------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*
	public function ImportFaF() {																																					//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $fileid=$this->request->data('fileid');																																		//
    	Controller::loadModel('Document');																																			//
    	$ReturnData=$this->Document->find('all', array('conditions' => array('fileid' => $fileid, 'vartype' => array(3,5,6,7,8)), 'order' => 'Document.location ASC'));				//
		echo(json_encode($ReturnData));																																				//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------- This function returns tne input and output data for a file to be used as a function ---------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function FileFunctionInOut() {																												//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileid=$this->request->data('fileid');																											//	\
    	Controller::loadModel('Workspace');																												//	\
		$Info=$this->Workspace->find('first', array('conditions' => array('id' => $fileid)));															//	\
		$returnItem=array('info'=> $Info['Workspace']);																									//	\
    	Controller::loadModel('Document');																												//	\
    	$ReturnData=$this->Document->find('all', array('conditions' => array('fileid' => $fileid, 'vartype' => array(3,5,6,7,8)), 'order' => 'Document.location ASC'));
		$returnItem['fdata']=$ReturnData;																												//	\
		echo(json_encode($returnItem));																													//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------- This function is given the file id of that to be used as a function. It returns the relavent data -----------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function GetUserFAFList() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
    	Controller::loadModel('User');																													//	\
    	$ReturnData=$this->User->find('first', array('recursive'=> 0, 'conditions' => array('user_id' => $this->Auth->user('id'))));					//	\
		echo(($ReturnData['User']['FAF_List']));																										//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------- This function returns tne input and output data for a file to be used as a function ---------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function TOC_Status() {																														//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $status=$this->request->data('status');																											//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	Controller::loadModel('Workspace');																											//	\
			$this->Workspace->id=$DirInfo['ID'];																										//	\
			if ($status=="Yes")	{	$this->Workspace->saveField('TOC', 1);																				//	\
			}else {	$this->Workspace->saveField('TOC', 0); }																							//	\
		}																																				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------- This function returns tne input and output data for a file to be used as a function ----------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function TOC_Update() {																														//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
	    $toploc=$this->request->data('toploc');																											//	\
	    $botloc=$this->request->data('botloc');																											//	\
		Controller::loadModel('DocumentTemp');																											//	\
    	if ($botloc=="end")																																//	\
    	{	$ReturnData=$this->DocumentTemp->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID'], 'location >=' => $toploc, 'vartype'=>array(1,9,10)), 'order' => 'location ASC'));				//
    	}else																																			//	\
    	{	$ReturnData=$this->DocumentTemp->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID'], 'location >=' => $toploc, 'location <' => $botloc, 'vartype'=>array(1,9,10)), 'order' => 'location ASC'));
    	}																																				//	\
    	echo(json_encode($ReturnData));																													//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------ This function returns tne input and output data for a file to be used as a function --------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function GetFolderImages() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $folder=$this->request->data('folder');																											//	\
		if ($folder=='') { $folder="/Workspaces/".str_replace(" ","_",$this->Auth->user('username')); }													//	\
		$DirInfo=$this->Get_FolderID($folder);																											//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $folder);																		//	\
		if ($usePerm=='1')																																//	\
		{	Controller::loadModel('Workspace');																											//	\
    	    $ReturnData=$this->Workspace->find('all', array('conditions' => array('parent_id' => $DirInfo['ID'], 'File_or_Folder'=>array(0,2))));		//	\
    		$ReturnData['folder']=str_replace("/Documents","/Workspaces",$folder);																		//	\
    		echo(json_encode($ReturnData));																												//	\
		}else { echo('The id is '.$DirInfo['ID'].', the user name is '.$this->Auth->user('username').', and the permission is '.$usePerm);}				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- This function moves an item to the designated location and updates the database ---------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function MoveItem() {																														//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $itemid=$this->request->data('itemid');																											//	\
	    $oldloc=$this->request->data('oldloc');																											//	\
	    $newloc=$this->request->data('newloc');																											//	\
		Controller::loadModel('DocumentTemp');	$this->DocumentTemp->id=$itemid; 																		//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	if ($newloc<$oldloc)																														//	\
			{	$this->DocumentTemp->updateAll(																											//	\
	    			array('DocumentTemp.location' => 'DocumentTemp.location+1'),																		//	\
    				array('DocumentTemp.fileid' => $DirInfo['ID'], 'DocumentTemp.location >=' => $newloc, 'DocumentTemp.location <' => $oldloc)			//	\
				);																																		//	\
			}elseif ($newloc>$oldloc)																													//	\
			{	$this->DocumentTemp->updateAll(																											//	\
    				array('DocumentTemp.location' => 'DocumentTemp.location-1'),																		//	\
    				array('DocumentTemp.fileid' => $DirInfo['ID'], 'DocumentTemp.location <=' => $newloc, 'DocumentTemp.location >' => $oldloc)			//	\
				);																																		//	\
			}																																			//	\
			$this->DocumentTemp->id=$itemid;																											//	\
			$this->DocumentTemp->saveField('location', $newloc);																						//	\
		}																																				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- This function is used to move an item up or down one step in the dom ----------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SwapLoc() {																															//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileid=$this->request->data('fileid');																											//	\
	    $id1=$this->request->data('id1');																												//	\
	    $loc1=$this->request->data('loc1');																												//	\	
	    $id2=$this->request->data('id2');																												//	\
	    $loc2=$this->request->data('loc2');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	Controller::loadModel('DocumentTemp');																										//	\
			$this->DocumentTemp->id=$id1;																												//	\
			$this->DocumentTemp->saveField('location', $loc1);																							//	\
			Controller::loadModel('DocumentTemp');																										//	\
			$this->DocumentTemp->id=$id2;																												//	\
			$this->DocumentTemp->saveField('location', $loc2);																							//	\
		}																																				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------- UPDATE THE FILE AS A FUNCTION LIST FOR THE WORKSHEET ------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function UpdateFAFList() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $FAFList=$this->request->data('FAFList');																										//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
		Controller::loadModel('Workspace');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		$this->Workspace->id=$DirInfo['ID'];																											//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	$this->Workspace->saveField('FAFList', $FAFList);		}																					//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- UPDATE THE DOM LOCATIONS ---------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function UpdateLocList() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $LocObject=$this->request->data('LocObject');																									//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
		Controller::loadModel('Workspace');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	$this->Workspace->id=$DirInfo['ID'];																										//	\
			$this->Workspace->saveField('locations', $LocObject);		}																				//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- CHANGE THE TITLE AND SUBTITLE ----------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function ChangeTitle() {																														//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $type=$this->request->data('type');																												//	\
	    $text=$this->request->data('text');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	Controller::loadModel('Workspace');																											//	\
			$this->Workspace->id=$DirInfo['ID'];																										//	\
			if ($type=="titleoption")		{	$this->Workspace->saveField('title', $text); 	}														//	\
			if ($type=="subtitleoption") 	{	$this->Workspace->saveField('subtitle', $text);	}														//	\
	    }																																				//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- CHANGE THE FILE DESCRIPTION ------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function ChangeDescription() {																												//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
	    $text=$this->request->data('text');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($editPerm=='1'))																		//	\
		{	Controller::loadModel('Workspace');																											//	\
			$this->Workspace->id=$DirInfo['ID'];																										//	\
			$this->Workspace->saveField('description', $text);																							//	\
	    }																																				//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- SUBMIT A URL FOR A DATASET -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function FindDataset() {																														//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $fileURL=$this->request->data('seturl');																										//	\
	    $text=$this->request->data('text');																												//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $fileURL);																		//	\
		if ($usePerm=='1')																																//	\
		{	Controller::loadModel('Dataset');																											//	\
    		$ReturnData=$this->Dataset->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 											//	\
			echo($ReturnData['Dataset']['dataobj']);																									//	\
	    }																																				//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- GRAB THE CONSTANTS DATA ----------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetConstants() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
			Controller::loadModel('Constants');																											//	\
    		$ReturnData=$this->Constants->find('all'); 																									//	\
			echo(json_encode($ReturnData));																												//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- GRAB THE SCALED UNITS DATA -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetScaledUnits() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
		Controller::loadModel('ScaledUnit');																											//	\
    	$ReturnData=$this->ScaledUnit->find('all'); 																									//	\
		echo(json_encode($ReturnData));																													//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- GRAB THE PARSED UNITS DATA -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetParsedUnits() {																													//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
		Controller::loadModel('ParsedUnit');																											//	\
    	$ReturnData=$this->ParsedUnit->find('all'); 																									//	\
		echo(json_encode($ReturnData));																													//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------- Deletes an item from the temp database --------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function checkoutStatus() 																													//	\
	{	$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
	    $checkoutArray=array();																															//	\
	    $fileURL=$this->request->data('fileURL');																										//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if ((is_null($DirInfo['checkoutName']))&&($Permissions['edit']=='0')) { $checkoutArray['checkoutStatus']=0;	$checkoutArray['checkoutName']=''; }//	\
		if ((is_null($DirInfo['checkoutName']))&&($Permissions['edit']=='1')) { $checkoutArray['checkoutStatus']=1;	$checkoutArray['checkoutName']=''; }//	\
		if ((!is_null($DirInfo['checkoutName']))&&($Permissions['edit']=='1')&&($DirInfo['checkoutID']!=$this->Auth->user('id'))) 						//	\
		{	$checkoutArray['checkoutStatus']=2;	$checkoutArray['checkoutName']=$DirInfo['checkoutName']; }												//	\
		if ((!is_null($DirInfo['checkoutName']))&&($Permissions['edit']=='1')&&($DirInfo['checkoutID']==$this->Auth->user('id'))) 						//	\
		{	$checkoutArray['checkoutStatus']=3;	$checkoutArray['checkoutName']=$DirInfo['checkoutName']; }												//	\
		echo(json_encode($checkoutArray));																												//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ This function checks out a file for the user -----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function checkOutFile() {																													//	\
  	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																		//	\
		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
		$fileURL=$this->request->data('fileURL');																										//	\
	    if (!$fileURL) { throw new NotFoundException(__('No File ID')); }																				//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		if ($editPerm=='1')																																//	\
		{	Controller::loadModel('Workspace');																											//	\
    		$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));											//	\
			if (is_null($FileData['Workspace']['CheckedOut']))																							//	\
			{	$this->Workspace->id=$DirInfo['ID'];																									//	\
				$this->Workspace->saveField('CheckedOut', $this->Auth->user('username'));																//	\
				$this->Workspace->saveField('checkoutID', $this->Auth->user('id'));																		//	\
				echo('1');																																//	\
			}else { echo('0');	}																														//	\
		}else																																			//	\
		{	echo('0');	}																																//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- This function checks in a file for the user ----------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function checkInFile() {																														//	\
  	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																		//	\
		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
		$fileURL=$this->request->data('fileURL');																										//	\
	    if (!$fileURL) { throw new NotFoundException(__('No File ID')); }																				//	\
		$DirInfo=$this->Get_FolderID($fileURL);																											//	\
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);																	//	\
		Controller::loadModel('Workspace');																												//	\
		$FileData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));												//	\
		if (($editPerm=='1')&&($FileData['Workspace']['checkoutID']==$this->Auth->user('id')))															//	\
		{	$this->internalSaveFile($DirInfo['ID']);																									//	\
			$this->Workspace->id=$DirInfo['ID'];																										//	\
			$this->Workspace->saveField('CheckedOut', NULL);																							//	\
			$this->Workspace->saveField('checkoutID', 0);																								//	\
			echo('1');																																	//	\
		}else																																			//	\
		{	echo('0');	}																																//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- Everything under this bar relates to the angular side only -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- Get Initial Data -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This is the function called upon page load that grabs all the data via an ajax call. We return the information for the file from the workspace entry    |
    as well as all of the items within the document, the unit data, the constant data, and the permissions.                                                 |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function getInitialData() 																														//
    {   $this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileURL=$params['fileURL'];			                   																			     			//
		$DirInfo=$this->Get_FolderID($fileURL);																	                  							//
		$adminPerm=$this->Get_Permissions('admin', $this->Auth->user('id'), $fileURL);					       							            		//
		$editPerm=$this->Get_Permissions('edit', $this->Auth->user('id'), $fileURL);									             						//
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $fileURL);						                  									//
		$viewPerm=$this->Get_Permissions('view', $this->Auth->user('id'), $fileURL);		            													//
		$Permissions=array();																																//
		$Permissions['admin']=$adminPerm;																													//
		$Permissions['edit']=$editPerm;																														//
		$Permissions['use']=$usePerm;																														//
		$Permissions['view']=$viewPerm;																														//
		if (($this->Auth->user('id')==$DirInfo['checkoutID'])&&($Permissions['edit']=='1'))		{	$this->DeleteOldData($DirInfo);	}						//
        $returnObject=array();                                                                                                                              //
        $returnObject['Permissions']=$Permissions;                                                                                                          //
        $returnObject['fileInfo']=$this->GetData($DirInfo, "FileInfo", 0, $DirInfo['checkoutID'], $Permissions['edit']);                                    //
        $returnObject['constants']=$this->GetData($DirInfo, "Constants", 0, $DirInfo['checkoutID'], $Permissions['edit']);                                  //
        $returnObject['scaleUnits']=$this->GetData($DirInfo, "ScaledUnits", 0, $DirInfo['checkoutID'], $Permissions['edit']);                               //
        $returnObject['parseUnits']=$this->GetData($DirInfo, "ParsedUnits", 0, $DirInfo['checkoutID'], $Permissions['edit']);                               //
        $returnObject['userID']=$this->Auth->user('id');                                                                                                    //
        $returnObject['userName']=$this->Auth->user('username');                                                                                            //
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $DirInfo['ID'])));	       		                    //
        if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
        {   Controller::loadModel('DocumentTemp');																											//
            $this->DocumentTemp->deleteAll(array('fileid' => $DirInfo['ID']));																				//
     	    $FileData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID'])));                             //
            foreach ($FileData as $index=>$value) 																											//
            {	Controller::loadModel('DocumentTemp');																										//
                $this->DocumentTemp->create();																												//
                $data_array=array();																														//
                $data_array['DocumentTemp']=$value['Document'];																								//
                $this->DocumentTemp->id=$data_array['DocumentTemp']['id'];																					//
                $this->DocumentTemp->set($data_array); 																										//
                $this->DocumentTemp->save();																												//
            }																																				//
        }                                                                                                                                                   //
        echo(json_encode($returnObject));                                                                                                                   //
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

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- SAVE FILE INFO ---------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This function is called whenever something relating to the file itself is changed. The same function is called whenever something changes.               |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function saveFileInfo() 	    																													//
    {   $this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                      																			     			//
        $title=$params['title'];			                      																			     			//
        $subtitle=$params['subtitle'];			                   																			     			//
        if ($subtitle=="Enter Subtitle"){ $subtitle=''; }                                                                                                   //
        $TOC=$params['TOC'];			                           																			     			//
        $thisData=$params['Data'];			                     																			     			//
        $description=$params['description'];			           																			     			//
		$adminPerm=$this->getPermissionsFromID('admin', $this->Auth->user('id'), $fileID);					       						            		//
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
		$usePerm=$this->getPermissionsFromID('use', $this->Auth->user('id'), $fileID);						               									//
		$viewPerm=$this->getPermissionsFromID('view', $this->Auth->user('id'), $fileID);		            												//
        Controller::loadModel('Workspace');																											     	//
		$this->Workspace->id=$fileID;		           																									    //
		$fileData=$this->Workspace->find('first', array('conditions' => array('id' => $fileID)));      												        //
		if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
		{	$this->Workspace->saveField('title', $title);                              											      						//
			$this->Workspace->saveField('subtitle', $subtitle);                        											      						//
			$this->Workspace->saveField('TOC', $TOC);                                											      						//
			$this->Workspace->saveField('description', $description);                  											      						//
			$this->Workspace->saveField('fileData', $thisData);                            		      							      						//
            return 1;   																						       										//
		}else return 0;   																						       										//
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------- This displays the files in a folder or the equations in a file for the inputs page ---------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
public function getFileFolderData() 																									           			//
{   $this->autorender = false;																								      							//
    $this->layout = null;																																	//
    $this->render('ajax');																																	//
    $params = json_decode(file_get_contents('php://input'),true);                                                                                           //
    $fileURL=$params['fileURL'];			                      																			           	    //
    Controller::loadModel('Workspace');																														//
    $DirInfo=$this->Get_FolderID($fileURL);		                       																						//
    $thisData=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));	                                                    //
    if ($thisData['Workspace']['File_or_Folder']=='0')																										//
    {   $FileData=$this->Workspace->find('all', array('recursive' => 0, 'conditions' => array('parent_id' => $DirInfo['ID'])));			                    //
        echo(json_encode(array('type'=>'Folder', 'data'=>$FileData)));																						//
    																																						//
    }elseif ($thisData['Workspace']['File_or_Folder']=='1')																									//
    {	Controller::loadModel('Document');																													//
        $vardata=array();                                                                                                                                   //
        $EqData=$this->Document->find('all', array('recursive' => 0, 'conditions' => array('fileid' => $DirInfo['ID'], 'vartype' => array(3))));            //
        foreach ($EqData as &$value)  																														//
        {	$dataobj=json_decode($value['Document']['data'], true);																							//
            if ($dataobj['Format_size']=="1x1") { $showValue=$dataobj['Solution_real']['0-0'].' '.$dataobj['Units_units'];                                  //
                                        }else   { $showValue="Matrix - ".$dataobj['Format_size'];    }                                                      //
            $dataarr=array('filenumber'=>$DirInfo['ID'], 																									//
                'itemid'=>$dataobj['Format_id'], 																											//
                'name'=>$dataobj['Format_name'], 																											//
                'size'=>$dataobj['Format_size'], 																											//
                'Solution_real'=>$dataobj['Solution_real'],																									//
                'Solution_imag'=>$dataobj['Solution_imag'],																									//
                'Units_units'=>$dataobj['Units_units'],																										//
                'Units_quantity'=>$dataobj['Units_quantity'],																								//
                'showValue'=>$showValue		                           																						//
            );																								                                                //
            array_push($vardata, $dataarr);                                                                                                                 //
        }																																					//
        echo(json_encode(array('type'=>'Equations', 'data'=>$vardata)));																					//
    }else																																					//
    {   echo('Error1');  }                                                                                                                                  //
}																																							//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- ADD AN ITEM TO THE DATABASE --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*  This function adds an item to the database and adjusts the location of the other items appropriately                                                     |
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function addItemAngular() {			          																									//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																			       	    //
	    $itemID=$params['itemID'];																													        //
	    $location=$params['location'];																												        //
	    $varType=$params['varType'];																											            //
	    $parentID=$params['parentID'];																													    //
	    $topParentID=$params['topParentID'];																										        //
	    $inputFile=$params['inputFile'];	      																									        //
	    $inputID=$params['inputID'];	          																									        //
	    $itemData=$params['itemData'];	          																									        //
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
        if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
		{	Controller::loadModel('DocumentTemp');																											//
            if (!$this->DocumentTemp->hasAny(array('id' => $itemID)))											                                            //
			{	$this->DocumentTemp->updateAll(																												//
	    			array('DocumentTemp.location' => 'DocumentTemp.location+1'),																			//	
	    			array('DocumentTemp.fileid' => $fileID, 'DocumentTemp.location >=' => $location, 'DocumentTemp.inputID' => '')         					//
				);																																			//
			}																																				//
			$this->DocumentTemp->create();																													//
			$data_array=array();																															//
			$data_array['DocumentTemp']['fileid']=$fileID;										         													//
			$data_array['DocumentTemp']['itemid']=$itemID;																									//
			$data_array['DocumentTemp']['location']=$location;																								//
			$data_array['DocumentTemp']['vartype']=$varType;																								//
			$data_array['DocumentTemp']['parentid']=$parentID;																								//
			$data_array['DocumentTemp']['topparentid']=$topParentID;																						//
			$data_array['DocumentTemp']['inputID']=$inputID;																								//
			$data_array['DocumentTemp']['inputFile']=$inputFile;																							//
			$data_array['DocumentTemp']['id']=$itemID;																										//
			$data_array['DocumentTemp']['data']=$itemData;																								    //
			$this->DocumentTemp->id=$itemID;																												//
			$this->DocumentTemp->set($data_array); 																											//
			$this->DocumentTemp->save();																													//
		}else { echo('0'); }																																//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- This saves the width or margin whenever it is edited ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function updateFormatsAngular() {																												//
 		$this->autorender = false;						         																							//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																			       	    //
	    $itemID=$params['itemID'];																													        //
	    $width=$params['width'];																													        //
	    $marginBottom=$params['marginBottom'];																										        //
	    $marginTop=$params['marginTop'];																											        //
	    $marginLeft=$params['marginLeft'];											      															        //
	    $marginRight=$params['marginRight'];																										        //
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
		if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
		{	Controller::loadModel('DocumentTemp');																											//
			$data_array=$this->DocumentTemp->find('first', array('conditions' => array('DocumentTemp.fileid' => $fileID, 'DocumentTemp.itemid' => $itemID)));//
			$data_array['DocumentTemp']['width']=str_replace("px","",$width);																				//
			$data_array['DocumentTemp']['margintop']=str_replace("px","",$marginTop);																		//
			$data_array['DocumentTemp']['marginbottom']=str_replace("px","",$marginBottom);																	//
			$data_array['DocumentTemp']['marginleft']=str_replace("px","",$marginLeft);																		//
			$data_array['DocumentTemp']['marginright']=str_replace("px","",$marginRight);																	//
			$this->DocumentTemp->save($data_array); 														       											//
		}																																					//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------- This function moves an item to the designated location and updates the database ----------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function moveItemAngular() {															    														//
 		$this->autorender = false;																           													//
 		$this->layout = null;																				    											//
  	    $this->render('ajax');																					       										//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																			       	    //
        $itemID=$params['itemID'];			                           																			       	    //
        $oldLoc=$params['oldLoc'];			                           																			       	    //
        $newLoc=$params['newLoc'];			                           																			       	    //
		Controller::loadModel('DocumentTemp');	                                                                                                            //
        $this->DocumentTemp->id=$itemID; 																		                                            //
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
		if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))															    //
		{	if ($newLoc<$oldLoc)																    														//
			{	$this->DocumentTemp->updateAll(														      													//
	    			array('DocumentTemp.location' => 'DocumentTemp.location+1'),						      												//
    				array('DocumentTemp.fileid' => $fileID, 'DocumentTemp.location >=' => $newLoc, 'DocumentTemp.location <' => $oldLoc)			        //
				);																							       											//
			}elseif ($newloc>$oldloc)																				       									//
			{	$this->DocumentTemp->updateAll(																				    							//
    				array('DocumentTemp.location' => 'DocumentTemp.location-1'),												    						//
    				array('DocumentTemp.fileid' => $fileID, 'DocumentTemp.location <=' => $newLoc, 'DocumentTemp.location >' => $oldLoc)        			//
				);																																      		//
			}																	       																		//
			$this->DocumentTemp->id=$itemID;											      																//
			$this->DocumentTemp->saveField('location', $newLoc);							      															//
		}																						       														//
	}																									     												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Deletes an item from the temp database -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function deleteItemAngular() {																													//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																			       	    //
        $itemID=$params['itemID'];			                           																			       	    //
        $location=$params['location'];			                       																			       	    //
		$editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
		if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
		{	Controller::loadModel('DocumentTemp');	                                                                                                        //
            $this->DocumentTemp->id=$itemID; $this->DocumentTemp->saveField('tobedeleted', 1);				                                             	//
			$this->DocumentTemp->updateAll(																												    //
                array('DocumentTemp.location' => 'DocumentTemp.location-1'),																	       		//	
   	 			array('DocumentTemp.fileid' => $fileID, 'DocumentTemp.location >' => $location)							       						        //
            );																															       				//
		}																																					//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------- This is called after changes to items and saves those changes in the temporary database -------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function saveTempDataAngular() 																													//
    {	$this->autorender = false;																															//
        $this->layout = null;																																//
        $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																			       	    //
        $itemID=$params['itemID'];			                           																			       	    //
        $dataObject=$params['dataObject'];			                       																			   	    //
        $name=$params['name'];			                       																			       	            //
        $values=$params['values'];			                       																			        	    //
        $vartype=$params['vartype'];		                    																			        	    //
        $inputID=$params['inputID'];	                     																			       	            //
        $inputFile=$params['inputFile'];			           																			       	            //
        $width=$params['width'];	                          																			       	            //
        $marginTop=$params['marginTop'];	                  																			       	            //
        $marginBottom=$params['marginBottom'];	               																			       	            //
        $marginLeft=$params['marginLeft'];	                  																			       	            //
        $marginRight=$params['marginRight'];	                  																			       	        //
        $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        Controller::loadModel('Workspace');		       																										//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
        if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
        {   Controller::loadModel('DocumentTemp');																											//
        	$this->DocumentTemp->id=$itemID;																												//
            $this->DocumentTemp->saveField('data', $dataObject);																							//
            $this->DocumentTemp->saveField('vartype', $vartype);																							//
            $this->DocumentTemp->saveField('Name', $name);																									//
            $this->DocumentTemp->saveField('Values', $values);																								//
            $this->DocumentTemp->saveField('inputFile', $inputFile);																						//
            $this->DocumentTemp->saveField('inputID', $inputID);																							//
            $this->DocumentTemp->saveField('width', $width);			     																				//
            $this->DocumentTemp->saveField('margintop', $marginTop);	     																				//
            $this->DocumentTemp->saveField('marginbottom', $marginBottom);	     																			//
            $this->DocumentTemp->saveField('marginleft', $marginLeft);	     																				//
            $this->DocumentTemp->saveField('marginright', $marginRight);	     																			//
        }																																					//
    }																																	      				//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- This permanently saves the file by moving the temp items to the main database -------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function SaveFileAngular() {																					       								//
        $this->autorender = false;																				     										//
        $this->layout = null;																	     														//
        $this->render('ajax');																																//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                       //
        $fileID=$params['fileID'];			                           																		       	        //
        $editPerm=$this->getPermissionsFromID('edit', $this->Auth->user('id'), $fileID);									           						//
        Controller::loadModel('Workspace');		       																										//
        $fileData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $fileID)));	            		                    //
        if (($this->Auth->user('id')==$fileData['Workspace']['checkoutID'])&&($editPerm=='1'))																//
        {	Controller::loadModel('DocumentTemp');																											//
            $TempFileCount=$this->DocumentTemp->find('count', array('conditions' => array('fileid' => $fileID)));	          								//
            $allData=$this->DocumentTemp->find('all', array('conditions' => array('fileid' => $fileID)));	         										//
            foreach ($allData as &$value) { 																												//
                $id=$value['DocumentTemp']['id'];						     																				//
                Controller::loadModel('Document');																											//
                $thisdata=array();																															//
                $this->Document->create(); 																													//	
                $thisdata['Document']=$value['DocumentTemp'];																								//
                $this->Document->set($thisdata); 																											//
                $this->Document->save(); 																													//
                if ($value['DocumentTemp']['tobedeleted']=='1')                                                                                             //
                {   $this->Document->deleteAll(array('id' => $id)); 	                                                                                    //
                    $this->DocumentTemp->deleteAll(array('id' => $id)); }		                                                                            //
            }																																				//
            Controller::loadModel('Workspace');																					   							//
            $this->Workspace->id=$fileID;																							        				//
            $this->Workspace->saveField('needsUpdate', '0');																								//
            Controller::loadModel('Document');																												//
            $updateData=$this->Document->find('all', array('conditions' => array('inputFile' => $fileID)));				         							//
            Controller::loadModel('Workspace');																												//
            foreach ($updateData as $index=>$thisFolder)																									//
            {	$this->Workspace->id=$thisFolder['Document']['fileid'];																						//
                $this->Workspace->saveField('needsUpdate', '1');																							//
            } 																																				//
            $this->Workspace->id=$fileID;                                                                                                                   //
            $this->Workspace->saveField('angUpdate', '1');			       																					//
            echo('1'); 		       																															//
        }else { echo('0'); }																																//
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

    
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------ This is the code that saves a bug reported ------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function saveBugAngular() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
        $params = json_decode(file_get_contents('php://input'),true);                                                                                                       //
        $fileID=$params['fileID'];			                      																			     			                //
        $bugText=$params['bugText'];			                  																			     		                 	//
		$data_array=array();																																				//
		$data_array['Bugs']['text']=$bugText;																																//
		$data_array['Bugs']['fileid']=$fileID;	           																													//
		$data_array['Bugs']['user']=$this->Auth->user('username');																											//
		$data_array['Bugs']['userid']=$this->Auth->user('id');																												//
		Controller::loadModel('Bugs');																																		//
		$this->Bugs->create();																																				//
		$this->Bugs->set($data_array); 																																		//
		$this->Bugs->save();																																				//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- SUBMIT A URL FOR A DATASET -------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function findDatasetAngular() {																												//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
        $params = json_decode(file_get_contents('php://input'),true);                                                                                   //
        $datasetURL=$params['seturl'];			                   																		                //
        $fileID=$params['fileID'];			                       																		                //
        $usePerm=$this->getPermissionsFromID('use', $this->Auth->user('id'), $fileID);		        					           						//
        if (($usePerm==1)||($usePerm==true))																											//	\
		{	$DirInfo=$this->Get_FolderID($datasetURL);														                  							//
            Controller::loadModel('Dataset');																											//	\
    		$ReturnData=$this->Dataset->find('first', array('conditions' => array('id' => $DirInfo['ID']))); 											//	\
			echo(json_encode(array('datasetID'=>$DirInfo['ID'], 'datasetData'=>$ReturnData['Dataset']['dataobj'])));																									//	\
	    }																																				//	\
    }																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function getFAFData() 																												    //	\
 	{	$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
        $params = json_decode(file_get_contents('php://input'),true);                                                                               //
        $fileURL=$params['fafUrl'];		                 																		                    //  \
		$DirInfo=$this->Get_FolderID($fileURL);																										//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $fileURL);																	//	\
        if ($usePerm==0) { echo('NoPerm');                                 																			//	\
        }else
        {   Controller::loadModel('Workspace');																										//  \
    	    $WorkspaceData=$this->Workspace->find('first', array('recursive' => 0, 'conditions' => array('id' => $DirInfo['ID'])));			        //  \
            Controller::loadModel('Document');																										//  \
    	    $DocumentData=$this->Document->find('all', array('recursive' => 2, 'conditions' => array('fileid' => $DirInfo['ID'], 'vartype'=>array(3,5,6,7,8)), 'order' => 'Document.location ASC'));			//
			echo(json_encode(array('fileID'=>$DirInfo['ID'], 'Workspace'=>$WorkspaceData['Workspace'], 'Document'=>$DocumentData))); 																							//	\
            
        }
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    
    
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------- This function grabs the images and folders in a given directory ------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function getFolderImagesAngular() {																											//	\
 		$this->autorender = false;																														//	\
 		$this->layout = null;																															//	\
  	    $this->render('ajax');																															//	\
        $params = json_decode(file_get_contents('php://input'),true);                                                                                   //  \
        $folder=$params['folder'];		                       																		                    //  \
	    if ($folder=='') { $folder="/Workspaces/".str_replace(" ","_",$this->Auth->user('username')); }													//	\
		$DirInfo=$this->Get_FolderID($folder);																											//	\
		$usePerm=$this->Get_Permissions('use', $this->Auth->user('id'), $folder);																		//	\
		if ($usePerm=='1')																																//	\
		{	Controller::loadModel('Workspace');																											//	\
    	    $ReturnData=$this->Workspace->find('all', array('conditions' => array('parent_id' => $DirInfo['ID'], 'File_or_Folder'=>array(0,2))));		//	\
    		echo(json_encode($ReturnData));																												//	\
		}else { echo('The id is '.$DirInfo['ID'].', the user name is '.$this->Auth->user('username').', and the permission is '.$usePerm);}				//	\
	}																																					//	\
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------*/


    
    
}



?>