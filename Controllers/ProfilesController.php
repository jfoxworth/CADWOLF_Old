<?php

class ProfilesController extends AppController {

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- DEFAULT FUNCTION TO GRAB AND DISPLAY DATA -------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function index() {																														//	\
        $this->layout = 'profiles';																													//	\
		$username=str_replace('http://www.cadwolf.com/Profiles/','',Router::url(null, true));														//	\
		$username=str_replace("/","",$username);																									//	\
		$username=str_replace("_"," ",$username);																									//	\
		Controller::loadModel('User');																												//	\
    	$this->set('UserData', $this->User->find('first', array('conditions' => array('username' => $username), 'recursive' => 0)));				//	\
    	$this->set('thisurl', Router::url(null, true));																								//	\
		$this->set("username",$this->Auth->user('username'));																						//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function VerifyAddress() {																												//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $filepath=$this->request->data('path');																										//	\
		$DirInfo=$this->Get_FileID($filepath);																										//	\
		echo(json_encode($DirInfo));																												//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------------- GIVEN A SLUG, FIND THE FILE'S ID ------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
	public function Get_FileID($slug) {																												//	\
		Controller::loadModel('Workspace');																											//	\
		$slug=str_replace("http://www.cadwolf.com/Documents/",'',$slug);																			//	\
		$slug=str_replace("http://www.cadwolf.com/Datasets/",'',$slug);																				//
		$slug=str_replace("/Documents/",'',$slug);																									//	\
		$slug=str_replace("/Datasets/",'',$slug);																									//
		$slug=preg_replace('/[\/]+$/','',$slug);																									//	\
		$slug=preg_replace('/^\//','',$slug);																										//	\
		$slug_array=explode('/',$slug);																												//	\
		$idarr='';																																	//	\
		$prev_id=0;																																	//	\
		for ($i = 0; $i < count($slug_array); $i=$i+1) {																							//	\
		    if ($i==0) { $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>Null )); 				//	\
		    }else	  	 $id=$this->Workspace->field('id', array('name' => str_replace("_"," ",$slug_array[$i]), 'parent_id'=>$prev_id)); 			//	\
			$prev_id=$id;																															//	\
			$idarr=$idarr.'-'.$id; 																													//	\
		}																																			//	\
		$DirInfo=array();																															//	\
		$DirInfo['ID']=$id;																															//	\
		$DirInfo['Name']=str_replace("_"," ",$slug_array[$i-1]);																					//	\
		$DirInfo['IDArr']=$idarr;																													//	\
		$tempdata=$this->Workspace->find('first', array('conditions' => array('id' => $id)));														//	\
		$DirInfo['checkedout']=$tempdata['Workspace']['CheckedOut'];																				//	\
		$DirInfo['checkoutID']=$tempdata['Workspace']['checkoutID'];																				//	\
		$DirInfo['FunctionName']=$tempdata['Workspace']['FunctionName'];																			//	\
		$DirInfo['address']="/".str_replace("_"," ",$slug);																							//	\
		return $DirInfo;																															//	\
	}																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function ChangeProperty() {																												//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $property=$this->request->data('property');																									//	\
	    $value=$this->request->data('value');																										//	\
		Controller::loadModel('User');																												//	\
		$this->User->id=$this->Auth->user('id');																									//	\
		$this->User->saveField($property, $value);																									//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function ActivateAccount() {																												//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $userid=$this->request->data('userid');																										//	\
		$vcode=$this->request->data('vcode');																										//	\
		$vcode=trim($vcode);																														//	\
		Controller::loadModel('User');																												//	\
   		$ReturnData=$this->User->find('first', array('conditions' => array('id' => $userid), 'recursive' => 0));									//	\
		if ($ReturnData['User']['acode']==$vcode) 																									//	\
		{	$this->User->id=$ReturnData['User']['id'];																								//	\
			$this->User->saveField('active', '1');																									//	\
			$this->User->saveField('activedate', date('Y-m-d H:i:s'));																				//	\
			echo('1');																																//	\
		}else { echo('0'); } 																														//	\	
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function LinkFB() {																														//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $fbid=$this->request->data('fbid');																											//	\
	    $fbname=$this->request->data('fbname');																										//	\
		Controller::loadModel('User');																												//	\
		$this->User->id=$this->Auth->user('id');																									//	\
		$this->User->saveField('facebook_id', $fbid);																								//	\
		$this->User->saveField('facebook_username', $fbname);																						//	\
		echo('1');																																	//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------- VERIFY THAT THE ADDRESS THE USER HAS ENTERED IS VALID -------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function UpdateFAFList() {																												//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $FAFList=$this->request->data('FAFList');																									//	\
		Controller::loadModel('User');																												//	\
		$this->User->id=$this->Auth->user('id');																									//	\
		$this->User->saveField('FAF_List', $FAFList);																								//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
	public function UploadImage() {																													//	\
		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
		if (($_FILES["image"]["type"]=="image/jpg")||($_FILES["image"]["type"]=="image/jpeg")||($_FILES["image"]["type"]=="image/bmp")||($_FILES["image"]["type"]=="image/gif")||($_FILES["image"]["type"]=="image/png"))						//
		{	if ($_FILES["image"]["type"]=="image/jpg") { $endtype="jpg"; }																			//	\
			if ($_FILES["image"]["type"]=="image/jpeg") { $endtype="jpeg";}																			//	\
			if ($_FILES["image"]["type"]=="image/gif") { $endtype="gif"; }																			//	\
			if ($_FILES["image"]["type"]=="image/bmp") { $endtype="bmp"; }																			//	\
			if ($_FILES["image"]["type"]=="image/png") { $endtype="png"; }																			//	\
			$this->loadModel('User');																												//	\
			$this->User->id=$this->Auth->user('id');																								//	\
			$this->User->saveField('imgname', 'http://www.cadwolf.com/ProfileImages/'.$this->Auth->user('id').'.'.$endtype);						//	\
			move_uploaded_file($_FILES["image"]['tmp_name'], $_SERVER['DOCUMENT_ROOT'].'/ProfileImages/'.$this->Auth->user('id').'.'.$endtype);		//	\
			$data=array();																															//	\
			$data['address']='http://www.cadwolf.com/ProfileImages/'.$this->Auth->user('id').'.'.$endtype;											//	\
			echo(json_encode($data));																												//	\
		}else																																		//	\
		{	echo('0');	}																															//	\
	}																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------- WHEN THE USER WANTS TO RESET THEIR PASSWORD -----------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------//
    public function resetPass() {																													//	\
 		$this->autorender = false;																													//	\
 		$this->layout = null;																														//	\
  	    $this->render('ajax');																														//	\
	    $newPass=$this->request->data('newPass');																									//	\
		Controller::loadModel('User');																												//	\
   		$UserData=$this->User->find('first', array('conditions' => array('id' => $this->Auth->user('id')), 'recursive' => 0));						//	\
		$this->User->id=$this->Auth->user('id');																									//	\
		$this->User->saveField('password', $newPass);																								//	\
		echo('1');																																	//	\
    }																																				//	\
//-----------------------------------------------------------------------------------------------------------------------------------------------------//


}
?>