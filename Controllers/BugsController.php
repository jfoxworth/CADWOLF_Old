<?php

class BugsController extends AppController {

/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------- Index Function -------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																																//
		$this->set("UserName", $this->Auth->user('username'));																								//	
        $this->layout = 'bugs';																																//
    }																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------- This is the code that saves a bug reported -------------------------------------------------------------*/
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------*/
	public function SaveBug() {																																//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
	    $text=$this->request->data('thisbug');																												//
	    $address=$this->request->data('thisaddress');																										//
	    $type=$this->request->data('thistype');																												//
		$DirInfo=$this->Get_FileID($address);																												//
		$data_array=array();																																//
		$data_array['Bugs']['text']=$text;																													//
		$data_array['Bugs']['bugorfeature']=$type;																											//
		$data_array['Bugs']['fileid']=$DirInfo['ID'];																										//
		$data_array['Bugs']['user']=$this->Auth->user('username');																							//
		$data_array['Bugs']['userid']=$this->Auth->user('id');																								//
		Controller::loadModel('Bugs');																														//
		$this->Bugs->create();																																//
		$this->Bugs->set($data_array); 																														//
		$this->Bugs->save();																																//
		echo('0');																																			//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

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
		return $DirInfo;																																	//
	}																																						//
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


}