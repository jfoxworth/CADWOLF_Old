<?php

class DocumentsController extends AppController {

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																																//
		$DirInfo=$this->Get_FileID(Router::url(null, true));																								//
        $this->layout = 'documents';																														//
		$this->set('DirInfo', $DirInfo);																													//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($DirInfo['ID']);																						//
    	$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));										//
		$this->set('Perm_Heirarchy',$Perm_Heirarchy);																												//
		$this->set('Permissions',$Permissions);																												//
		$this->set('timezone', $this->Auth->user('time zone'));																								//
		$this->DeleteOldData($DirInfo);																														//
		Controller::loadModel('Workspace');																													//
		$TempFileInfo=$this->Workspace->find('first', array('conditions' => array('id' => $DirInfo['ID'])));												//
		$FileInfo=array('created'=>$TempFileInfo['Workspace']['created'], 'modified'=>$TempFileInfo['Workspace']['modified'], 'inputs'=>$TempFileInfo['Workspace']['Inputs'], 'outputs'=>$TempFileInfo['Workspace']['Outputs'], 'CheckedOut'=>$TempFileInfo['Workspace']['CheckedOut']);
		$this->set('FileInfo', $FileInfo);																													//
		$FileData=$this->Document->find('all', array('conditions' => array('fileid' => $DirInfo['ID']), 'order' => 'Document.location ASC'));				//
		$this->set('FileData', $FileData);																													//
		foreach ($FileData as &$value) { 																													//
			Controller::loadModel('DocumentTemp');																											//
			$this->DocumentTemp->create(); 																													//
			$thisdata=array();																																//
			$thisdata['DocumentTemp']=$value['Document'];																									//
			$this->DocumentTemp->set($thisdata); 																											//
			$this->DocumentTemp->save(); 																													//
		}																																					//
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- Take URL Slug and produce the file id --------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FileID($slug) {																														//
		Controller::loadModel('Workspace');																													//
		$slug=str_replace("http://www.cadwolf.com/Documents/",'',$slug);																					//
		$slug=str_replace("/Documents/",'',$slug);																											//
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
		return $DirInfo;																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- Deletes data from temp database on page load ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function DeleteOldData($DirInfo) {																												//
		Controller::loadModel('DocumentTemp');																												//
		$this->DocumentTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('TextTemp');																													//
		$this->TextTemp->deleteAll(array('fileid' => $DirInfo['ID']));																						//
		Controller::loadModel('EquationTemp');																												//
		$this->EquationTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('SymbolicTemp');																												//
		$this->SymbolicTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('TableTemp');																													//
		$this->TableTemp->deleteAll(array('fileid' => $DirInfo['ID']));																						//
		Controller::loadModel('ForLoopTemp');																												//
		$this->ForLoopTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('WhileLoopTemp');																												//
		$this->WhileLoopTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('IfElseTemp');																												//
		$this->IfElseTemp->deleteAll(array('fileid' => $DirInfo['ID']));																					//
		Controller::loadModel('PlotTemp');																													//
		$this->PlotTemp->deleteAll(array('fileid' => $DirInfo['ID']));																						//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Deletes an item from the temp database -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function DeleteItem() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
	    $fileid=$this->request->data('fileid');																												//
	    $itemid =$this->request->data('id');																												//
	    $id=$fileid.''.$itemid;																																//
	    $type=$this->request->data('type');																													//
	    $plotid =$this->request->data('plotid');																											//
		Controller::loadModel('DocumentTemp');	$this->DocumentTemp->id=$id; $this->DocumentTemp->saveField('tobedeleted', 1);								//
		if ($type=='text') 		{ Controller::loadModel('TextTemp'); $this->TextTemp->deleteAll(array('id' => $id));}										//
		if ($type=='equation')	{ Controller::loadModel('EquationTemp'); $this->EquationTemp->deleteAll(array('id' => $id));}								//
		if ($type=='symbolic')	{ Controller::loadModel('SymbolicTemp'); $this->SymbolicTemp->deleteAll(array('id' => $id));}								//
		if ($type=='table') 	{ Controller::loadModel('TableTemp'); $this->TableTemp->deleteAll(array('id' => $id));}										//
		if ($type=='forloop')	{ Controller::loadModel('ForLoopTemp'); $this->ForLoopTemp->deleteAll(array('id' => $id));}									//
		if ($type=='whileloop') { Controller::loadModel('WhileLoopTemp'); $this->WhileLoopTemp->deleteAll(array('id' => $id));}								//	
		if ($type=='ifelse') 	{ Controller::loadModel('IfElseTemp'); $this->IfElseTemp->deleteAll(array('id' => $id));}									//
		if ($type=='plot') 		{ Controller::loadModel('PlotTemp'); $this->PlotTemp->deleteAll(array('id' => $id));}										//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------- When an item is added or deleted, it is added to the databases and the location is adjusted ---------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateLocations() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileid = 	$this->request->data('fileid');																															//
	    $textstring=$this->request->data('text');																															//
		$items=explode("##",$textstring);																																	//
		Controller::loadModel('DocumentTemp');																																//
																																											//
		for ($a=0; $a<count($items)-1; $a+=1)																																//
		{																																									//
			$data=explode("::",$items[$a]);																																	//
			$data_array=$this->DocumentTemp->find('first', array('conditions' => array('DocumentTemp.fileid' => $fileid, 'DocumentTemp.itemid' => $data[0])));				//
			if ($data_array)																																				//
			{																																								//
				$data_array['DocumentTemp']['location']=$data[1];																											//
				$data_array['DocumentTemp']['parentid']=$data[3];																											//
				$data_array['DocumentTemp']['topparentid']=$data[4];																										//
				$this->DocumentTemp->save($data_array); 																													//
			}else																																							//
			{																																								//
				$this->DocumentTemp->create(); 																																//
				$data_array=array();																																		//
				$data_array['DocumentTemp']['fileid']=$fileid;																												//
				$data_array['DocumentTemp']['itemid']=$data[0];																												//
				$data_array['DocumentTemp']['location']=$data[1];																											//
				$data_array['DocumentTemp']['vartype']=$data[2];																											//
				$data_array['DocumentTemp']['parentid']=$data[3];																											//
				$data_array['DocumentTemp']['topparentid']=$data[4];
				$data_array['DocumentTemp']['id']=$fileid.''.$data[0];																										//
				$this->DocumentTemp->id=$fileid.''.$data[0];																												//
				$this->DocumentTemp->set($data_array); 																														//
				$this->DocumentTemp->save();		 																														//
				$data_array=array();
				if ($data[2]==1) {	Controller::loadModel('TextTemp'); 		$data_array['TextTemp']['id']=$fileid.''.$data[0];		$data_array['TextTemp']['fileid']=$fileid; 		$data_array['TextTemp']['itemid']=$data[0]; 	$data_array['TextTemp']['parentid']=$data[3]; 		$data_array['TextTemp']['topparentid']=$data[4]; 		$this->TextTemp->set($data_array);		$this->TextTemp->save(); }
				if ($data[2]==3) {	Controller::loadModel('EquationTemp'); 	$data_array['EquationTemp']['id']=$fileid.''.$data[0];	$data_array['EquationTemp']['fileid']=$fileid; 	$data_array['EquationTemp']['itemid']=$data[0]; $data_array['EquationTemp']['parentid']=$data[3]; 	$data_array['EquationTemp']['topparentid']=$data[4];	$this->EquationTemp->set($data_array);	$this->EquationTemp->save();	}
				if ($data[2]==4) {	Controller::loadModel('SymbolicTemp'); 	$data_array['SymbolicTemp']['id']=$fileid.''.$data[0];	$data_array['SymbolicTemp']['fileid']=$fileid; 	$data_array['SymbolicTemp']['itemid']=$data[0]; $data_array['SymbolicTemp']['parentid']=$data[3]; 	$data_array['SymbolicTemp']['topparentid']=$data[4];	$this->SymbolicTemp->set($data_array);	$this->SymbolicTemp->save(); }
				if ($data[2]==5) {	Controller::loadModel('TableTemp'); 	$data_array['TableTemp']['id']=$fileid.''.$data[0];		$data_array['TableTemp']['fileid']=$fileid; 	$data_array['TableTemp']['itemid']=$data[0]; 	$data_array['TableTemp']['parentid']=$data[3]; 		$data_array['TableTemp']['topparentid']=$data[4]; 		$this->TableTemp->set($data_array);		$this->TableTemp->save(); }
				if ($data[2]==6) {	Controller::loadModel('ForLoopTemp'); 	$data_array['ForLoopTemp']['id']=$fileid.''.$data[0];	$data_array['ForLoopTemp']['fileid']=$fileid; 	$data_array['ForLoopTemp']['itemid']=$data[0]; 	$data_array['ForLoopTemp']['parentid']=$data[3]; 	$data_array['ForLoopTemp']['topparentid']=$data[4]; 	$this->ForLoopTemp->set($data_array); 	$this->ForLoopTemp->save(); }
				if ($data[2]==7) {	Controller::loadModel('WhileLoopTemp'); $data_array['WhileLoopTemp']['id']=$fileid.''.$data[0];	$data_array['WhileLoopTemp']['fileid']=$fileid; $data_array['WhileLoopTemp']['itemid']=$data[0];$data_array['WhileLoopTemp']['parentid']=$data[3]; 	$data_array['WhileLoopTemp']['topparentid']=$data[4]; 	$this->WhileLoopTemp->set($data_array);	$this->WhileLoopTemp->save(); }
				if ($data[2]==8) {	Controller::loadModel('IfElseTemp'); 	$data_array['IfElseTemp']['id']=$fileid.''.$data[0];	$data_array['IfElseTemp']['fileid']=$fileid; 	$data_array['IfElseTemp']['itemid']=$data[0]; 	$data_array['IfElseTemp']['parentid']=$data[3]; 	$data_array['IfElseTemp']['topparentid']=$data[4]; 		$this->IfElseTemp->set($data_array);	$this->IfElseTemp->save(); }
				if ($data[2]==9) {	Controller::loadModel('ChartTemp'); 	$data_array['ChartTemp']['id']=$fileid.''.$data[0];		$data_array['ChartTemp']['fileid']=$fileid; 	$data_array['ChartTemp']['itemid']=$data[0]; 	$data_array['ChartTemp']['parentid']=$data[3]; 		$data_array['ChartTemp']['topparentid']=$data[4]; 		$this->ChartTemp->set($data_array);		$this->ChartTemp->save(); }
			}																																								//
		}																																									//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------- This saves the width or margin whenever it is edited ----------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateFormats() {																																		//
 		$this->autorender = false;																																			//
 		$this->layout = null;																																				//
  	    $this->render('ajax');																																				//
	    $fileid = 	$this->request->data('fileid');																															//
	    $textstring=$this->request->data('text');																															//
		$data=explode("::",$textstring);																																	//
		Controller::loadModel('DocumentTemp');																																//
		$data_array=$this->DocumentTemp->find('first', array('conditions' => array('DocumentTemp.fileid' => $fileid, 'DocumentTemp.itemid' => $data[0])));					//
		$data_array['DocumentTemp']['width']=str_replace("px","",$data[1]);																									//
		$data_array['DocumentTemp']['margintop']=str_replace("px","",$data[2]);																								//
		$data_array['DocumentTemp']['marginbottom']=str_replace("px","",$data[3]);																							//
		$data_array['DocumentTemp']['marginleft']=str_replace("px","",$data[4]);																							//
		$data_array['DocumentTemp']['marginright']=str_replace("px","",$data[5]);																							//
		$this->DocumentTemp->save($data_array); 																															//
	}																																										//
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ This permanently saves the file by moving the temp items to the main database --------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveFile() {																																						//
 		$this->autorender = false;																																						//*******************************************
 		$this->layout = null;																																							//This needs to save data such as inputs
  	    $this->render('ajax');																																							//
	    $fileid=$this->request->data('fileid');																																			//
    	$Perm_Heirarchy=$this->Permissions_Heirarchy($fileid);																															//
    	$Permissions=$this->Get_Permissions($this->Auth->user('id'), $Perm_Heirarchy, $this->Auth->user('username'));																	//
		if ($Permissions['edit']=='1')																																					//
		{																																												//
			Controller::loadModel('TempFunctionInputs');																																		//
			Controller::loadModel('FunctionInputs');																																		//
			$TempData=$this->TempFunctionInputs->find('first', array('conditions' => array('fileid' => $fileid)));	
			$thisdata=array();	$this->FunctionInputs->create(); $thisdata['FunctionInputs']=$TempData['FunctionInputs']; $this->FunctionInputs->set($thisdata);	$this->FunctionInputs->save();
			Controller::loadModel('DocumentTemp');																																		//
			$TempFileCount=$this->DocumentTemp->find('count', array('conditions' => array('fileid' => $fileid)));																		//
			$FileData=$this->DocumentTemp->find('all', array('conditions' => array('fileid' => $fileid)));																				//
			foreach ($FileData as &$value) { 																																			//
				$id=$value['DocumentTemp']['id'];																																		//
				Controller::loadModel('Document');																																		//
				$thisdata=array();																																						//
				$this->Document->create(); 																																				//	
				$thisdata['Document']=$value['DocumentTemp'];																															//
				$this->Document->set($thisdata); 																																		//
				$this->Document->save(); 																																				//
				if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Document->deleteAll(array('id' => $id)); 	$this->DocumentTemp->deleteAll(array('id' => $id)); }				//
				if ($value['DocumentTemp']['vartype']=='1')																																//
				{ 	Controller::loadModel('TextTemp'); Controller::loadModel('Text');																									//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Text->deleteAll(array('id' => $value['DocumentTemp']['id'])); 												//
					}else { $TempData=$this->TextTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));												//
							$thisdata=array();	$this->Text->create(); 		$thisdata['Text']=$TempData['TextTemp'];	$this->Text->set($thisdata);	$this->Text->save(); 	}		//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='3')																																//
				{ 	Controller::loadModel('EquationTemp');	Controller::loadModel('Equation'); 																							//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Equation->deleteAll(array('id' => $id)); 																	//
					}else {	$TempData=$this->EquationTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));											//
							$thisdata=array();	$this->Equation->create(); 	$thisdata['Equation']=$TempData['EquationTemp']; $this->Equation->set($thisdata); $this->Equation->save(); }//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='4')																																//
				{ 	Controller::loadModel('SymbolicTemp');	Controller::loadModel('Symbolic'); 																							//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Symbolic->deleteAll(array('id' => $id)); 																	//
					}else {	$TempData=$this->SymbolicTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));											//
							$thisdata=array();	$this->Symbolic->create(); 	$thisdata['Symbolic']=$TempData['SymbolicTemp'];$this->Symbolic->set($thisdata);$this->Symbolic->save(); }	//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='5')																																//
				{ 	Controller::loadModel('TableTemp');  Controller::loadModel('Table');																								//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Table->deleteAll(array('id' => $id)); 																		//
					}else { $TempData=$this->TableTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));												//
							$thisdata=array();	$this->Table->create(); 	$thisdata['Table']=$TempData['TableTemp'];	$this->Table->set($thisdata);		$this->Table->save();  }	//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='6')																																//
				{ 	Controller::loadModel('ForLoopTemp');    Controller::loadModel('ForLoop');																							//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->ForLoop->deleteAll(array('id' => $id)); 																	//
					}else {	$TempData=$this->ForLoopTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));											//
							$thisdata=array();	$this->ForLoop->create(); 	$thisdata['ForLoop']=$TempData['ForLoopTemp'];	$this->ForLoop->set($thisdata);	$this->ForLoop->save(); }	//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='7')																																//
				{ 	Controller::loadModel('WhileLoopTemp');	Controller::loadModel('WhileLoop');																							//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->WhileLoop->deleteAll(array('id' => $id)); 																	//
					}else {	$TempData=$this->WhileLoopTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));											//
							$thisdata=array();	$this->WhileLoop->create(); $thisdata['WhileLoop']=$TempData['WhileLoopTemp'];	$this->WhileLoop->set($thisdata);	$this->WhileLoop->save(); }	//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='8')																																//
				{ 	Controller::loadModel('IfElseTemp');	Controller::loadModel('IfElse'); 																							//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->IfElse->deleteAll(array('id' => $id)); 																	//
					}else { $TempData=$this->IfElseTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));												//
							$thisdata=array();	$this->IfElse->create(); 	$thisdata['IfElse']=$TempData['IfElseTemp'];	$this->IfElse->set($thisdata);	$this->IfElse->save();  }	//
				}																																										//
				if ($value['DocumentTemp']['vartype']=='9')																																//
				{ 	Controller::loadModel('PlotTemp');	Controller::loadModel('Plot');																									//
					if ($value['DocumentTemp']['tobedeleted']=='1') { $this->Plot->deleteAll(array('id' => $id)); 																		//
					}else {	$TempData=$this->PlotTemp->find('first', array('conditions' => array('id' => $value['DocumentTemp']['id'])));												//
							$thisdata=array();	$this->Plot->create(); 	$thisdata['Plot']=$TempData['PlotTemp'];	$this->Plot->set($thisdata);	$this->Plot->save(); 	}			//
				}																																										//
			}																																											//
			$FileCount=$this->Document->find('count', array('conditions' => array('fileid' => $fileid)));																				//
			if ($FileCount==$TempFileCount) { echo('11'); }else { echo('01'); }
		}else { echo('00'); }
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
		$perm_array['view']=0; $perm_array['edit']=0; $perm_array['admin']=0; 																							//
		$Perm_Heirarchy=array_reverse($Perm_Heirarchy);																													//
		$editflag=0; $viewflag=0; $adminflag=0;																															//
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
		}																																								//
		if ($Perm_Heirarchy[count($Perm_Heirarchy)-1]['folder']==$username) { 	$perm_array['view']=1; $perm_array['edit']=1; $perm_array['admin']=1; }					//	
		return $perm_array;																																				//
	}																																									//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------- This gets the id of a folder based on a url slug ---------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function Get_FolderID($slug) {																																			//
		Controller::loadModel('Workspace');																																			//
		$slug=str_replace("http://www.cadwolf.com/workspaces/",'',$slug);																											//
		$slug=str_replace("/workspaces/",'',$slug);																																	//
		$slug=preg_replace('/[\/]+$/','',$slug);																																	//
		$slug=preg_replace('/^\//','',$slug);																																		//
		$slug_array=explode('/',$slug);																																				//
		$idarr='';																																									//
		$prev_id=0;																																									//
		for ($i = 0; $i < count($slug_array); $i=$i+1) {																															//
		    if ($i==0) { $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>Null )); 												//
		    }else	  	 $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 											//
			$prev_id=$id;																																							//
			$idarr=$idarr.'-'.$id; 																																					//
		}																																											//
		$DirInfo=array();																																							//
		$DirInfo['ID']=$id;																																							//
		$DirInfo['Name']=str_replace("_"," ",$slug_array[$i-1]);																													//
		$DirInfo['IDArr']=$idarr;																																					//
		return $DirInfo;																																							//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- This is called after changes to items and saves those changes in the temporary database ----------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveTempData() {																																				//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $fileid=$this->request->data('fileid');																																		//
	    $type=$this->request->data('type');																																			//
																																													//
		if ($type=="text")																																							//
		{																																											//
			Controller::loadModel('TextTemp');																																		//
			$data_array=$this->TextTemp->find('first', array('conditions' => array('TextTemp.id' => $fileid.''.$this->request->data('itemid'))));									//
			$data_array['TextTemp']['text']=$this->request->data('text');																											//
			$this->TextTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="equation")																																						//
		{																																											//
			Controller::loadModel('EquationTemp');																																	//
			$data_array=$this->EquationTemp->find('first', array('conditions' => array('EquationTemp.id' => $fileid.''.$this->request->data('itemid'))));							//
			$data_array['EquationTemp']['itemid']=$this->request->data('itemid');																									//
			$data_array['EquationTemp']['Format_name']=$this->request->data('Format_name');																							//
			$data_array['EquationTemp']['Format_equation']=$this->request->data('Format_equation');																					//
			$data_array['EquationTemp']['Format_showequation']=$this->request->data('Format_showequation');																			//
			$data_array['EquationTemp']['Format_size']=$this->request->data('Format_size');																							//
			$data_array['EquationTemp']['Format_numinds']=$this->request->data('Format_numinds');																					//
			$data_array['EquationTemp']['Format_right']=$this->request->data('Format_right');																						//
			$data_array['EquationTemp']['Format_showvalue']=$this->request->data('Format_showvalue');																				//
			$data_array['EquationTemp']['Format_showcomponent']=$this->request->data('Format_showcomponent');																		//
			$data_array['EquationTemp']['Solution_convsol']=$this->request->data('Solution_convsol');																				//
			$data_array['EquationTemp']['Solution_sol']=$this->request->data('Solution_sol');																						//
			$data_array['EquationTemp']['Solution_input_array']=$this->request->data('Solution_input_array');																		//
			$data_array['EquationTemp']['Solution_inputs']=$this->request->data('Solution_inputs');																					//
			$data_array['EquationTemp']['Solution_variable_array']=$this->request->data('Solution_variable_array');																	//
			$data_array['EquationTemp']['Solution_array']=$this->request->data('Solution_array');																					//
			$data_array['EquationTemp']['Page_position']=$this->request->data('Page_position');																						//
			$data_array['EquationTemp']['Page_parentid']=$this->request->data('Page_parentid');																						//
			$data_array['EquationTemp']['Page_topparentid']=$this->request->data('Page_topparentid');																				//
			$data_array['EquationTemp']['Units_units']=$this->request->data('Units_units');																							//
			$data_array['EquationTemp']['Units_showunits']=$this->request->data('Units_showunits');																					//
			$data_array['EquationTemp']['Units_conv_units']=$this->request->data('Units_conv_units');																				//
			$data_array['EquationTemp']['Units_showunits']=$this->request->data('Units_showunits');																					//
			$data_array['EquationTemp']['Units_multiplier']=$this->request->data('Units_multiplier');																				//
			$data_array['EquationTemp']['Units_quantity']=$this->request->data('Units_quantity');																					//
			$data_array['EquationTemp']['Units_base_array']=$this->request->data('Units_base_array');																				//
			$data_array['EquationTemp']['Models_numerical']=$this->request->data('Models_numerical');																				//
			$data_array['EquationTemp']['Models_units']=$this->request->data('Models_units');																						//
			$data_array['EquationTemp']['Models_dimensions']=$this->request->data('Models_dimensions');																				//
			$data_array['EquationTemp']['Models_quantities']=$this->request->data('Models_quantities');																				//
			$data_array['EquationTemp']['Errors_errors']=$this->request->data('Errors_errors');																						//
			$this->EquationTemp->save($data_array); 																																//
		}																																											//
																																													//
		if ($type=="symbolic")																																						//
		{																																											//
			Controller::loadModel('SymbolicTemp');																																	//
			$data_array=$this->SymbolicTemp->find('first', array('conditions' => array('SymbolicTemp.id' => $fileid.''.$this->request->data('itemid'))));							//
			$data_array['SymbolicTemp']['symbolictext']=$this->request->data('text');																								//
			$this->SymbolicTemp->save($data_array); 																																//
		}																																											//
																																													//
		if ($type=="table")																																							//
		{																																											//
			Controller::loadModel('TableTemp');																																		//
			$data_array=$this->TableTemp->find('first', array('conditions' => array('TableTemp.id' => $fileid.''.$this->request->data('itemid'))));									//
			$data_array['TableTemp']['tabletext']=$this->request->data('tabledata');																								//
			$this->TableTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="forloop")																																						//
		{																																											//
			Controller::loadModel('ForLoopTemp');																																	//
			$data_array=$this->ForLoopTemp->find('first', array('conditions' => array('ForLoopTemp.id' => $fileid.''.$this->request->data('itemid'))));								//
			$data_array['ForLoopTemp']['Page_position']=$this->request->data('Page_position');																						//
			$data_array['ForLoopTemp']['Page_topparentid']=$this->request->data('Page_topparentid');																				//
			$data_array['ForLoopTemp']['Page_parentid']=$this->request->data('Page_parentid');																						//
			$data_array['ForLoopTemp']['Page_lastposition']=$this->request->data('Page_lastposition');																				//
			$data_array['ForLoopTemp']['counter']=$this->request->data('counter');																									//
			$data_array['ForLoopTemp']['valueid']=$this->request->data('valueid');																									//
			$data_array['ForLoopTemp']['starttext']=$this->request->data('starttext');																								//
			$data_array['ForLoopTemp']['start']=$this->request->data('start');																										//
			$data_array['ForLoopTemp']['stoptext']=$this->request->data('stoptext');																								//
			$data_array['ForLoopTemp']['stop']=$this->request->data('stop');																										//
			$data_array['ForLoopTemp']['numsteps']=$this->request->data('numsteps');																								//
			$data_array['ForLoopTemp']['increment']=$this->request->data('increment');																								//
			$data_array['ForLoopTemp']['incrementtext']=$this->request->data('incrementtext');																						//
			$data_array['ForLoopTemp']['limitfactor']=$this->request->data('limitfactor');																							//
			$data_array['ForLoopTemp']['status']=$this->request->data('status');																									//
			$this->ForLoopTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="whileloop")																																						//
		{																																											//
			Controller::loadModel('WhileLoopTemp');																																	//
			$data_array=$this->WhileLoopTemp->find('first', array('conditions' => array('WhileLoopTemp.id' => $fileid.''.$this->request->data('itemid'))));							//
			$data_array['WhileLoopTemp']['Page_position']=$this->request->data('Page_position');																					//
			$data_array['WhileLoopTemp']['Page_topparentid']=$this->request->data('Page_topparentid');																				//
			$data_array['WhileLoopTemp']['Page_parentid']=$this->request->data('Page_parentid');																					//
			$data_array['WhileLoopTemp']['Page_lastposition']=$this->request->data('Page_lastposition');																			//
			$data_array['WhileLoopTemp']['Loop_countervalue']=$this->request->data('Loop_countervalue');																			//
			$data_array['WhileLoopTemp']['Loop_Values']=$this->request->data('Loop_Values');																						//
			$data_array['WhileLoopTemp']['Loop_truefalse']=$this->request->data('Loop_truefalse');																					//
			$data_array['WhileLoopTemp']['Loop_numsteps']=$this->request->data('Loop_numsteps');																					//
			$data_array['WhileLoopTemp']['Loop_String']=$this->request->data('Loop_String');																						//
			$data_array['WhileLoopTemp']['Loop_TFString']=$this->request->data('Loop_TFString');																					//
			$data_array['WhileLoopTemp']['Loop_ValuesString']=$this->request->data('Loop_ValuesString');																			//
			$this->WhileLoopTemp->save($data_array); 																																//
		}																																											//
																																													//
		if ($type=="ifelse")																																						//
		{																																											//
			Controller::loadModel('IfElseTemp');																																	//
			$data_array=$this->IfElseTemp->find('first', array('conditions' => array('IfElseTemp.id' => $fileid.''.$this->request->data('itemid'))));								//
			$data_array['IfElseTemp']['Page_position']=$this->request->data('Page_position');																						//
			$data_array['IfElseTemp']['Page_topparentid']=$this->request->data('Page_topparentid');																					//
			$data_array['IfElseTemp']['Page_parentid']=$this->request->data('Page_parentid');																						//
			$data_array['IfElseTemp']['Page_lastposition']=$this->request->data('Page_lastposition');																				//
			$data_array['IfElseTemp']['Statement_Order']=$this->request->data('Statement_Order');																					//
			$data_array['IfElseTemp']['Statement_Parent']=$this->request->data('Statement_Parent');																					//
			$data_array['IfElseTemp']['Statement_String']=$this->request->data('Statement_String');																					//
			$data_array['IfElseTemp']['Statement_Type']=$this->request->data('Statement_Type');																						//
			$data_array['IfElseTemp']['Statement_Values']=$this->request->data('Statement_Values');																					//
			$data_array['IfElseTemp']['Statement_truefalse']=$this->request->data('Statement_truefalse');																			//
			$data_array['IfElseTemp']['Statement_Execute']=$this->request->data('Statement_Execute');																				//
			$data_array['IfElseTemp']['Errors_flag']=$this->request->data('Errors_flag');																							//
			$data_array['IfElseTemp']['Errors_errors']=$this->request->data('Errors_errors');																						//
			$this->IfElseTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="plot")																																							//
		{																																											//
			Controller::loadModel('PlotTemp');																																		//
			$data_array=$this->PlotTemp->find('first', array('conditions' => array('PlotTemp.id' => $fileid.''.$this->request->data('itemid'))));									//
			$data_array['PlotTemp']['Page_topparentid']=$this->request->data('Page_topparentid');																					//
			$data_array['PlotTemp']['Page_parentid']=$this->request->data('Page_parentid');																							//
			$data_array['PlotTemp']['Chart_type']=$this->request->data('Chart_type');																								//
			$data_array['PlotTemp']['Chart_dataseriesobj']=$this->request->data('Chart_dataseriesobj');																				//
			$data_array['PlotTemp']['Chart_xaxesobj']=$this->request->data('Chart_xaxesobj');																						//
			$data_array['PlotTemp']['Chart_yaxesobj']=$this->request->data('Chart_yaxesobj');																						//
			$data_array['PlotTemp']['Chart_bandsobj']=$this->request->data('Chart_bandsobj');																						//
			$data_array['PlotTemp']['Chart_linesobj']=$this->request->data('Chart_linesobj');																						//
			$data_array['PlotTemp']['Chart_width']=$this->request->data('Chart_width');																								//
			$data_array['PlotTemp']['Chart_height']=$this->request->data('Chart_height');																							//
			$data_array['PlotTemp']['Chart_marginright']=$this->request->data('Chart_marginright');																					//
			$data_array['PlotTemp']['Chart_marginleft']=$this->request->data('Chart_marginleft');																					//
			$data_array['PlotTemp']['Chart_marginbottom']=$this->request->data('Chart_marginbottom');																				//
			$data_array['PlotTemp']['Chart_margintop']=$this->request->data('Chart_margintop');																						//
			$data_array['PlotTemp']['Chart_Name']=$this->request->data('Chart_Name');																								//
			$data_array['PlotTemp']['Title_onoff']=$this->request->data('Title_onoff');																								//
			$data_array['PlotTemp']['Title_text']=$this->request->data('Title_text');																								//
			$data_array['PlotTemp']['Title_xoffset']=$this->request->data('Title_xoffset');																							//
			$data_array['PlotTemp']['Title_yoffset']=$this->request->data('Title_yoffset');																							//
			$data_array['PlotTemp']['Subtitle_onoff']=$this->request->data('Subtitle_onoff');																						//
			$data_array['PlotTemp']['Subtitle_text']=$this->request->data('Subtitle_text');																							//
			$data_array['PlotTemp']['Subtitle_xoffset']=$this->request->data('Subtitle_xoffset');																					//
			$data_array['PlotTemp']['Subtitle_yoffset']=$this->request->data('Subtitle_yoffset');																					//
			$data_array['PlotTemp']['Legend_onoff']=$this->request->data('Legend_onoff');																							//
			$data_array['PlotTemp']['Legend_layout']=$this->request->data('Legend_layout');																							//
			$data_array['PlotTemp']['Legend_floating']=$this->request->data('Legend_floating');																						//
			$data_array['PlotTemp']['Legend_xoffset']=$this->request->data('Legend_xoffset');																						//
			$data_array['PlotTemp']['Legend_yoffset']=$this->request->data('Legend_yoffset');																						//
			$data_array['PlotTemp']['Legend_width']=$this->request->data('Legend_width');																							//
			$data_array['PlotTemp']['Legend_align']=$this->request->data('Legend_align');																							//
			$data_array['PlotTemp']['Legend_verticalalign']=$this->request->data('Legend_verticalalign');																			//
			$data_array['PlotTemp']['Legend_rtl']=$this->request->data('Legend_rtl');																								//
			$data_array['PlotTemp']['Legend_marginRight']=$this->request->data('Legend_marginRight');																				//
			$data_array['PlotTemp']['Legend_marginLeft']=$this->request->data('Legend_marginLeft');																					//
			$data_array['PlotTemp']['Legend_marginBottom']=$this->request->data('Legend_marginBottom');																				//
			$data_array['PlotTemp']['Legend_marginTop']=$this->request->data('Legend_marginTop');																					//
			$this->PlotTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="dataset")																																						//
		{																																											//
			Controller::loadModel('DatasetTemp');																																	//
			$data_array=$this->DatasetTemp->find('first', array('conditions' => array('DatasetTemp.id' => $fileid, 'DatasetTemp.itemid' => $this->request->data('itemid'))));		//
			$data_array['DatasetTemp']['Format_plotid']=$this->request->data('Format_plotid');																						//
			$data_array['DatasetTemp']['Format_type']=$this->request->data('Format_type');																							//
			$data_array['DatasetTemp']['color']=$this->request->data('color');																										//
			$data_array['DatasetTemp']['xaxis']=$this->request->data('xaxis');																										//
			$data_array['DatasetTemp']['yaxis']=$this->request->data('yaxis');																										//
			$data_array['DatasetTemp']['series']=$this->request->data('series');																									//
			$data_array['DatasetTemp']['symbol']=$this->request->data('symbol');																									//
			$data_array['DatasetTemp']['fillcolor']=$this->request->data('fillcolor');																								//
			$data_array['DatasetTemp']['outlinecolor']=$this->request->data('outlinecolor');																						//
			$data_array['DatasetTemp']['markersize']=$this->request->data('markersize');																							//
			$data_array['DatasetTemp']['dataname']=$this->request->data('dataname');																								//
			$data_array['DatasetTemp']['xdata_plottext']=$this->request->data('xdata_plottext');																					//
			$data_array['DatasetTemp']['xdata_name']=$this->request->data('xdata_name');																							//
			$data_array['DatasetTemp']['xdata_id']=$this->request->data('xdata_id');																								//
			$data_array['DatasetTemp']['xdata_rawtable']=$this->request->data('xdata_rawtable');																					//
			$data_array['DatasetTemp']['ydata_plottext']=$this->request->data('ydata_plottext');																					//
			$data_array['DatasetTemp']['ydata_name']=$this->request->data('ydata_name');																							//
			$data_array['DatasetTemp']['ydata_id']=$this->request->data('ydata_id');																								//
			$data_array['DatasetTemp']['ydata_rawtable']=$this->request->data('ydata_rawtable');																					//
			$data_array['DatasetTemp']['data_type']=$this->request->data('data_type');																								//
			$data_array['DatasetTemp']['data_plottext']=$this->request->data('data_plottext');																						//
			$data_array['DatasetTemp']['data_datalabels']=$this->request->data('data_datalabels');																					//
			$data_array['DatasetTemp']['data_pointmarkers']=$this->request->data('data_pointmarkers');																				//
			$data_array['DatasetTemp']['data_error']=$this->request->data('data_error');																							//
			$this->DatasetTemp->save($data_array); 																																	//
		}																																											//
																																													//
																																													//
		if ($type=="axis")																																							//
		{																																											//
			Controller::loadModel('AxisTemp');																																		//
			$data_array=$this->AxisTemp->find('first', array('conditions' => array('AxisTemp.fileid' => $fileid, 'AxisTemp.itemid' => $this->request->data('itemid'))));			//
			$data_array['AxisTemp']['Format_plotid']=$this->request->data('Format_plotid');																							//
			$data_array['AxisTemp']['Axis_name']=$this->request->data('Axis_name');																									//
			$data_array['AxisTemp']['Axis_num']=$this->request->data('Axis_num');																									//
			$data_array['AxisTemp']['Axis_label']=$this->request->data('Axis_label');																								//
			$data_array['AxisTemp']['Axis_lineWidth']=$this->request->data('Axis_lineWidth');																						//
			$data_array['AxisTemp']['Axis_linecolor']=$this->request->data('Axis_linecolor');																						//
			$data_array['AxisTemp']['Axis_opposite']=$this->request->data('Axis_opposite');																							//
			$data_array['AxisTemp']['Axis_reversed']=$this->request->data('Axis_reversed');																							//
			$data_array['AxisTemp']['Axis_type']=$this->request->data('Axis_type');																									//
			$data_array['AxisTemp']['Axis_offset']=$this->request->data('Axis_offset');																								//
			$data_array['AxisTemp']['Axis_min']=$this->request->data('Axis_min');																									//
			$data_array['AxisTemp']['Axis_max']=$this->request->data('Axis_max');																									//
			$data_array['AxisTemp']['Axis_xory']=$this->request->data('Axis_xory');																									//
			$data_array['AxisTemp']['Axis_tickinterval']=$this->request->data('Axis_tickinterval');																					//
			$data_array['AxisTemp']['Axis_minortickinterval']=$this->request->data('Axis_minortickinterval');																		//
			$data_array['AxisTemp']['Axis_gridcolor']=$this->request->data('Axis_gridcolor');																						//
			$data_array['AxisTemp']['Axis_minorgridcolor']=$this->request->data('Axis_minorgridcolor');																				//
			$data_array['AxisTemp']['Axis_gridlinesonoff']=$this->request->data('Axis_gridlinesonoff');																				//
			$data_array['AxisTemp']['Axis_minorgridlinesonoff']=$this->request->data('Axis_minorgridlinesonoff');																	//
			$data_array['AxisTemp']['Axis_gridlinewidth']=$this->request->data('Axis_gridlinewidth');																				//
			$data_array['AxisTemp']['Axis_minorgridlinewidth']=$this->request->data('Axis_minorgridlinewidth');																		//
			$this->DatasetTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="band")																																							//
		{																																											//
			Controller::loadModel('BandTemp');																																		//
			$data_array=$this->BandTemp->find('first', array('conditions' => array('BandTemp.fileid' => $fileid, 'BandTemp.itemid' => $this->request->data('itemid'))));			//
			$data_array['BandTemp']['Format_plotid']=$this->request->data('Format_plotid');																							//
			$data_array['BandTemp']['Axis_id']=$this->request->data('Axis_id');																										//
			$data_array['BandTemp']['Band_start']=$this->request->data('Band_start');																								//
			$data_array['BandTemp']['Band_end']=$this->request->data('Band_end');																									//
			$data_array['BandTemp']['Band_color']=$this->request->data('Band_color');																								//
			$this->BandtTemp->save($data_array); 																																	//
		}																																											//
																																													//
		if ($type=="line")																																							//
		{																																											//
			Controller::loadModel('LineTemp');																																		//
			$data_array=$this->LineTemp->find('first', array('conditions' => array('LineTemp.fileid' => $fileid, 'LineTemp.itemid' => $this->request->data('itemid'))));			//
			$data_array['LineTemp']['Format_plotid']=$this->request->data('Format_plotid');																							//
			$data_array['LineTemp']['Axis_id']=$this->request->data('Axis_id');																										//
			$data_array['LineTemp']['Line_value']=$this->request->data('Line_value');																								//
			$data_array['LineTemp']['Line_width']=$this->request->data('Line_width');																								//
			$data_array['LineTemp']['Line_color']=$this->request->data('Line_color');																								//
			$this->BandtTemp->save($data_array); 																																	//
		}																																											//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- This function pulls the information from the main database when the page is loaded ---------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function RetrieveData() {																																				//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $fileid = 	$this->request->data('fileid');																																	//
	    $type= 		$this->request->data('type');																																	//
	    $itemid= 	$this->request->data('itemid');																																	//
		$id=		$fileid.''.$itemid;																																				//
  	    if ($this->request->is('get')) {  throw new MethodNotAllowedException(); }																									//
	    if (!$type) { throw new NotFoundException(__('No File ID')); }																												//
																																													//
		if ($type=="parseunits") 	{	Controller::loadModel('ParsedUnit');	$ParseUnits_Obj=$this->ParsedUnit->find('all');		echo(json_encode($ParseUnits_Obj)); }			//
		if ($type=="scaleunits") 	{	Controller::loadModel('ScaledUnit');	$ScaledUnits_Obj=$this->ScaledUnit->find('all');	echo(json_encode($ScaledUnits_Obj));}			//
		if ($type=="constants")  	{	Controller::loadModel('Constant');		$Constants=$this->Constant->find('all');			echo(json_encode($Constants));		}			//
																																													//
	    if (($type=="1")||($type=="text")) 																																			//
	    { 																																											//
	    	Controller::loadModel('Text'); 																																			//
	    	$TextObj=$this->Text->find('first', array('conditions' => array('Text.id' => $id)));																					//
	    	Controller::loadModel('TextTemp'); 																																		//
			$this->TextTemp->create(); 																																				//
			$thisdata=array();																																						//
			$thisdata['TextTemp']=$TextObj['Text'];																																	//
			$this->TextTemp->set($thisdata); 																																		//
			$this->TextTemp->save(); 																																				//
	    	echo(json_encode($TextObj)); 																																			//
	    }																																											//
																																													//
	    if (($type=="3")||($type=="equation")) 																																		//
	    { 																																											//
	    	Controller::loadModel('Equation');																																		//
	    	$EquationObj=$this->Equation->find('first', array('conditions' => array('Equation.id' => $id)));																		//
	    	Controller::loadModel('EquationTemp'); 																																	//
			$this->EquationTemp->create(); 																																			//
			$thisdata=array();																																						//
			$thisdata['EquationTemp']=$EquationObj['Equation'];																														//
			$this->EquationTemp->set($thisdata); 																																	//
			$this->EquationTemp->save(); 																																			//
	    	echo(json_encode($EquationObj)); 																																		//
	   	}																																											//
																																													//
	    if (($type=="4")||($type=="symbolic")) 																																		//
	    { 																																											//
	    	Controller::loadModel('Symbolic');																																		//
	    	$SymbolicObj=$this->Symbolic->find('first', array('conditions' => array('Symbolic.id' => $id)));																		//
	    	Controller::loadModel('SymbolicTemp'); 																																	//
			$this->SymbolicTemp->create(); 																																			//
			$thisdata=array();																																						//
			$thisdata['SymbolicTemp']=$SymbolicObj['Symbolic'];																														//
			$this->SymbolicTemp->set($thisdata); 																																	//
			$this->SymbolicTemp->save(); 																																			//
	    	echo(json_encode($SymbolicObj)); 																																		//
	    }																																											//
																																													//
	    if (($type=="5")||($type=="table")) 																																		//
	    { 																																											//
	    	Controller::loadModel('Table'); 																																		//
	    	$TableObj=$this->Table->find('first', array('conditions' => array('Table.id' => $id)));																					//
	    	Controller::loadModel('TableTemp'); 																																	//
			$this->TableTemp->create(); 																																			//
			$thisdata=array();																																						//
			$thisdata['TableTemp']=$TableObj['Table'];																																//
			$this->TableTemp->saveAll($thisdata); 																																	//
	    	echo(json_encode($TableObj)); 																																			//
	    }																																											//
																																													//
	    if (($type=="6")||($type=="forloop")) 																																		//
	    { 																																											//
	    	Controller::loadModel('ForLoop'); 																																		//
	    	$ForLoopObj=$this->ForLoop->find('first', array('conditions' => array('ForLoop.id' => $id)));																			//
	    	Controller::loadModel('ForLoopTemp'); 																																	//
			$this->ForLoopTemp->create(); 																																			//
			$thisdata=array();																																						//
			$thisdata['ForLoopTemp']=$ForLoopObj['ForLoop'];																														//
			$this->ForLoopTemp->saveAll($thisdata); 																																//
	    	echo(json_encode($ForLoopObj)); 																																		//
	    }																																											//
																																													//
	    if (($type=="7")||($type=="whileloop"))																																		//
	    { 																																											//
	    	Controller::loadModel('WhileLoop');																																		//
	    	$WhileLoopObj=$this->WhileLoop->find('first', array('conditions' => array('WhileLoop.id' => $id)));																		//
	    	Controller::loadModel('WhileLoopTemp'); 																																//
			$this->WhileLoopTemp->create(); 																																		//
			$thisdata=array();																																						//
			$thisdata['WhileLoopTemp']=$WhileLoopObj['WhileLoop'];																													//
			$this->WhileLoopTemp->saveAll($thisdata); 																																//
	    	echo(json_encode($WhileLoopObj)); 																																		//
	    }																																											//
																																													//
	    if (($type=="8")||($type=="ifelse")) 																																		//
	    { 																																											//
	    	Controller::loadModel('IfElse'); 																																		//
	    	$IfElseObj=$this->IfElse->find('first', array('conditions' => array('IfElse.id' => $id)));																				//
	    	Controller::loadModel('IfElseTemp'); 																																	//
			$this->IfElseTemp->create(); 																																			//
			$thisdata=array();																																						//
			$thisdata['IfElseTemp']=$IfElseObj['IfElse'];																															//
			$this->IfElseTemp->saveAll($thisdata); 																																	//
	    	echo(json_encode($IfElseObj)); 																																			//
	    }																																											//
																																													//
	    if (($type=="9")||($type=="plot")) 																																			//
	    { 																																											//
	    	Controller::loadModel('Plot'); 																																			//
	    	$PlotObj=$this->Plot->find('first', array('conditions' => array('Plot.id' => $id)));																					//
	    	Controller::loadModel('PlotTemp'); 																																		//
			$this->PlotTemp->create(); 																																				//
			$thisdata=array();																																						//
			$thisdata['PlotTemp']=$PlotObj['Plot'];																																	//
			$this->PlotTemp->saveAll($thisdata); 																																	//
	    	echo(json_encode($PlotObj)); 																																			//
	    }																																											//
																																													//
	    if (($type=="14")||($type=="equationrelationships")) 																														//
	    { 																																											//
	    	Controller::loadModel('Relationship'); 																																	//
			if ($this->Relationship->hasAny(array('fileid' => $fileid, 'plotoreq'=>'equations')))																					//
			{																																										//
		    	$RelationshipObj=$this->Relationship->find('first', array('conditions' => array('Relationship.fileid' => $fileid, 'Relationship.plotoreq' => "equations")));		//
		    	Controller::loadModel('RelationshipTemp'); 																															//
				$this->RelationshipTemp->create(); 																																	//
				$thisdata=array();																																					//
				$thisdata['RelationshipTemp']=$RelationshipObj['Relationship'];																										//
				$this->RelationshipTemp->saveAll($thisdata); 																														//
		    	echo(json_encode($RelationshipObj)); 																																//
			}else{	echo(NULL); }																																					//
	    }																																											//
																																													//
	    if (($type=="15")||($type=="plotrelationships")) 																															//
	    { 																																											//
	    	Controller::loadModel('Relationship'); 																																	//
			if ($this->Relationship->hasAny(array('fileid' => $fileid, 'plotoreq'=>'plots')))																						//
			{																																										//
		    	$RelationshipObj=$this->Relationship->find('first', array('conditions' => array('Relationship.fileid' => $fileid, 'Relationship.plotoreq' => "plots")));			//
		    	Controller::loadModel('RelationshipTemp'); 																															//
				$this->RelationshipTemp->create(); 																																	//
				$thisdata=array();																																					//
				$thisdata['RelationshipTemp']=$RelationshipObj['Relationship'];																										//
				$this->RelationshipTemp->saveAll($thisdata); 																														//
		    	echo(json_encode($RelationshipObj)); 																																//
			}else{	echo(NULL); }																																					//
	    }																																											//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------- This saves the dependencies for the equations and the plots and the inputs -------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveTempDeps() {																																				//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $type=$this->request->data('type');																																			//
	    $fileid=$this->request->data('fileid');																																		//
		$data=$this->request->data('data');																																			//
																																													//
    	Controller::loadModel('RelationshipTemp'); 																																	//
		$this->RelationshipTemp->create(); 																																			//
		$thisdata=array();																																							//
		$thisdata['RelationshipTemp']['id']=$type.''.$fileid;																														//
		$thisdata['RelationshipTemp']['fileid']=$fileid;																															//
		$thisdata['RelationshipTemp']['plotoreq']=$type;																															//
		$thisdata['RelationshipTemp']['data']=$data;																																//
		$this->RelationshipTemp->set($thisdata); 																																	//
		$this->RelationshipTemp->save(); 																																			//
	}
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


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
	    $path=$this->request->data('path');																																			//
		$DirInfo=Get_FolderID($path);
																																													//
		if ($type=="files")																																							//
		{																																											//
			Controller::loadModel('Workspace');																																		//
			$FileData=$this->Workspace->find('all', array('conditions' => array('parentid' => $DirInfo['ID']), 'order' => 'Workspace.File_or_Folder ASC'));							//
			$returndata='';																																							//
			foreach ($FileData as &$value) { 																																		//
				if ($value['Workspace']['File_or_Folder']=="0")																														//
				{																																									//
					$tempdata='<div class="folderline" name="'.$value['Workspace']['file_name'].'" filenumber="'.$value['Workspace']['file_number'].'">';							//
					$tempdata=$tempdata.'<div class="filefoldername">'.$value['Workspace']['file_name'].'</div></div>';																//
				}else																																								//
				{																																									//
					$tempdata='<div class="fileline" name="'.$value['Workspace']['file_name'].'" filenumber="'.$value['Workspace']['file_number'].'">';								//
					$tempdata=$tempdata.'<div class="filefoldername">'.$value['Workspace']['file_name'].'</div></div>';																//
				}																																									//
				$returndata=$returndata."".$tempdata;																																//
			}																																										//
			echo($returndata);																																						//
		}																																											//

		if ($type=="equations")																																						//
		{																																											//
			Controller::loadModel('Equation');																																		//
			$EqData=$this->Equation->find('all', array('conditions' => array('fileid' => $DirInfo['ID'])));																			//
			$returndata='<div class="equationline"><div class="equationlinecheckbox equationlinelabel">Input</div>';																//
			$returndata=$returndata.'<div class="equationlinename equationlinelabel">Name</div><div class="equationlinevalue equationlinelabel">Value</div></div>';					//
			foreach ($EqData as &$value)  																																			//
			{																																										//
				$dataarr=array('filenumber'=>$DirInfo['ID'], 																														//
					'itemid'=>$value['Equation']['Format_id'], 																														//
					'name'=>$value['Equation']['Format_name'], 																														//
					'size'=>$value['Equation']['Format_size'], 																														//
					'Solution_sol'=>$value['Equation']['Solution_sol'],																												//
					'Solution_array'=>$value['Equation']['Solution_array'],																											//
					'Units_units'=>$value['Equation']['Units_units'],																												//
					'Units_quantity'=>$value['Equation']['Units_quantity']																											//
				);																																									//
																																													//
				$vardata= json_encode($dataarr);																																	//
																																													//
				if ($data['Format_size']=="1x1") {	$eqvalue=$value['Equation']['Solution_sol'].' '.$value['Equation']['Units_units']; 												//
				}else {	$eqvalue="Matrix - ".$value['Equation']['Format_size']; }																									//
				$tempdata='<div class="equationline" filenumber="'.$fileid.'" name="'.$value['Equation']['Format_name'].'" itemid="'.$value['Equation']['Format_id'].'">';			//
				$tempdata=$tempdata.'<div class="equationlinecheckbox"><input type="checkbox" class="inputcheckbox"></div>';														//
				$tempdata=$tempdata.'<div class="equationlinename">'.$value['Equation']['Format_name'].'</div>';																	//
				$tempdata=$tempdata.'<div class="equationlinevalue">'.$eqvalue.'</div>';																							//
				$tempdata=$tempdata.'<div class="equationlinehide">'.$vardata.'</div></div>';																						//
				$returndata=$returndata."".$tempdata;																																//
			}																																										//
			echo($returndata);																																						//
		}																																											//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------- These functions simply store the temporary data for the file inputs and outputs as a function ----------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function UpdateFunctionInputs() {																																		//
 		$this->autorender = false;																																					//
 		$this->layout = null;																																						//
  	    $this->render('ajax');																																						//
	    $fileid=$this->request->data('fileid');																																		//
	    $type=$this->request->data('type');																																		//
	    $data=$this->request->data('data');																																			//
		Controller::loadModel('TempFunctionInputs');																																//
		$this->TempFunctionInputs->create(); 																																		//
		$thisdata=array();																																							//
		$thisdata['TempFunctionInputs']['data']=$data;																																//
		$thisdata['TempFunctionInputs']['type']=$type;																																//
		$thisdata['TempFunctionInputs']['fileid']=$fileid;																															//
		$this->TempFunctionInputs->set($thisdata); 																																	//
		$this->TempFunctionInputs->save(); 																																			//
	}																																												//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


}
?>