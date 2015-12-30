<?php

class GroupsController extends AppController {
	public $helpers = array('Form', 'Html', 'Time');
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function index() {																															//
        $this->layout = 'groups';																														//
		Controller::loadModel('Groupuser');																												//
		$UserData=$this->Groupuser->find('all', array('conditions' => array('userid' => $this->Auth->user('id'))));										//
		$this->set('type', "normal");																												//
		$this->set('UserData', $UserData);																												//
		$this->set('timezone', $this->Auth->user('time zone'));																							//
    }																																					//
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function Creategroup() {																														//
 		$this->autorender = false;																														//
 		$this->layout = null;																															//
  	    $this->render('ajax');																															//
		Controller::loadModel('Groupuser');																												//
        if (($this->request->is('post'))&&($this->Auth->loggedIn())) {																					//
			Controller::loadModel('Group');																												//
	        $groupdata=array();																															//
	        $groupname="New Group - ".str_replace(" ","_",$this->Auth->user('username'))." - ".rand(100,999);											//
	        $groupdata['Group']['name']=$groupname;																										//
	        $this->Group->create();																														//
			$this->Group->save($groupdata);																												//
			$lastid=$this->Group->getLastInsertID();																									//
			
			Controller::loadModel('Groupuser');																											//
	        $groupuser=array();																															//
	        $groupuser['Groupuser']['groupid']=$lastid;																									//
	        $groupuser['Groupuser']['name']=$groupname;																									//
	        $groupuser['Groupuser']['userid']=$this->Auth->user('id');																					//
	        $groupuser['Groupuser']['username']=$this->Auth->user('username');																			//
	        $groupuser['Groupuser']['creator']=1;																										//
	        $groupuser['Groupuser']['admin']=1;																											//
	        $this->Groupuser->create();																													//
			$this->Groupuser->save($groupuser);																											//
			echo($lastid.'::'.$groupname);																												//
        }																																				//
    }																																					//
/*-------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetMembers() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        if ($this->request->is('post')) {																													//
			$groupid=$this->request->data('groupid');																										//
			Controller::loadModel('Groupuser');																												//
			$UserData=$this->Groupuser->find('all', array('conditions' => array('groupid' => $groupid)));													//
			echo('<div class="groups_topmemberline"><div class="topmemberline_name">User Name</div>');														//
				echo('<div class="topmemberline_creator">Creator</div>');																					//
				echo('<div class="topmemberline_admin">Admin</div>');																						//
				echo('<div class="topmemberline_date">Date Added</div>');																					//
			echo('</div>');																																	//
			foreach ($UserData as &$value) { 																												//
				echo('<div class="groups_memberline" userid="'.$value['Groupuser']['userid'].'">');															//
					echo('<div class="memberline_username">'.$value['Groupuser']['username'].'</div>');														//
					if ($value['Groupuser']['creator']=='1') { echo('<div class="memberline_creator check">&nbsp</div>');									//
					}else { echo('<div class="memberline_creator cross">&nbsp</div>'); }																	//
					if ($value['Groupuser']['admin']=='1') { echo('<div class="memberline_admin check">&nbsp</div>');										//
					}else { echo('<div class="memberline_admin cross">&nbsp</div>'); }																		//
					$temp=explode(" ",$value['Groupuser']['created']);																						//
					echo('<div class="memberline_date">'.$temp[0].'</div>');																				//
				echo('</div>');																																//
			}																																				//
        }																																					//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GetPermissions() {																														//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
        if ($this->request->is('post')) {																													//
			$groupid=$this->request->data('groupid');																										//
			Controller::loadModel('Permission');																											//
			$UserData=$this->Permission->find('all', array('conditions' => array('Permission.userid' => $groupid), 'recursive' => 1));						//	
			echo('<div class="groups_toppermline"><div class="toppermline_name">Document or Folder Name</div>');											//
				echo('<div class="toppermline_admin">Admin</div>');																							//
				echo('<div class="toppermline_edit">Edit</div>');																							//
				echo('<div class="toppermline_view">View</div>');																							//
				echo('<div class="toppermline_save">Save</div>');																							//
				echo('<div class="toppermline_date">Date</div>');																							//
			echo('</div>');																																	//
			foreach ($UserData as &$value) { 																												//
				echo('<div class="groups_permline">');																										//
					if ($value['Permission']['workspace_type']==0)	{ echo('<div class="permline_folder">&nbsp</div>'); 									//
					}else { echo('<div class="permline_file">&nbsp</div>'); }																				//
					echo('<div class="permline_username">'.$value['Permission']['workspace_name'].'</div>');												//
					if ($value['Permission']['admin']=='1') { 	echo('<div class="permline_admin check">&nbsp</div>');										//
					}else {echo('<div class="permline_admin cross">&nbsp</div>'); }																			//
					if ($value['Permission']['edit']=='1') { 	echo('<div class="permline_edit check">&nbsp</div>');										//
					}else {echo('<div class="permline_edit cross">&nbsp</div>'); }																			//
					if ($value['Permission']['view']=='1') { 	echo('<div class="permline_view check">&nbsp</div>');										//
					}else {echo('<div class="permline_view cross">&nbsp</div>'); }																			//
					if ($value['Permission']['save']=='1') { 	echo('<div class="permline_save check">&nbsp</div>');										//
					}else {echo('<div class="permline_save cross">&nbsp</div>'); }																			//
					$temp=explode(" ",$value['Permission']['created']);																						//
					echo('<div class="permline_date">'.$temp[0].'</div>');																					//
				echo('</div>');																																//
			}																																				//
        }																																					//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function DeleteGroup() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
		$groupid=$this->request->data('groupid');																											//
        if (($this->request->is('post'))&&($this->CheckPermission($groupid))) {																					//
			Controller::loadModel('Group');			$this->Group->deleteAll(array('id' => $groupid));														//
			Controller::loadModel('Groupuser');		$this->Groupuser->deleteAll(array('groupid' => $groupid));												//
			Controller::loadModel('Permission');	$this->Permission->deleteAll(array('userid' => $groupid, 'usertype' =>'0'));							//
        }else  {  	echo('You must be an administrator of this group to delete it.'); }																		//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- This allows an admin to delete a member ----------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function DeleteMember() {																														//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
		$groupid=$this->request->data('groupid');																											//
        if (($this->request->is('post'))&&($this->CheckPermission($groupid))) {																					//
			$userid=$this->request->data('userid');																											//
			Controller::loadModel('Groupuser');																												//
			$this->Groupuser->deleteAll(array('groupid' => $groupid, 'userid' => $userid));																	//
        }else  {  	echo('You must be an administrator of this group to delete a member.'); }																//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------ This allows an admin to add a member to a group----------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function AddMember() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
		$groupid=$this->request->data('groupid');																											//
        if (($this->request->is('post'))&&($this->CheckPermission($groupid))) {																					//
			$newname=$this->request->data('newname');																										//
			Controller::loadModel('User');																													//
			$conditions = array( 'User.username' => $newname);																								//
			if ($this->User->hasAny($conditions))																											//
			{ 																																				//
				Controller::loadModel('Groupuser');																											//
				$conditions = array( 'Groupuser.username' => $newname);																						//
				if ($this->Groupuser->hasAny($conditions))																									//
				{ 																																			//
					echo('Already Member');																													//
				}else																																		//
				{																																			//
					echo('User Exists');																													//
					Controller::loadModel('Group');																											//
					$GroupData=$this->Group->find('first', array('conditions' => array('id' => $groupid), 'recursive' => 0));								//
					Controller::loadModel('User');																											//
					$UserData=$this->User->find('first', array('conditions' => array('username' => $newname), 'recursive' => 0));							//
					$thisdata=array();																														//
					Controller::loadModel('Groupuser');																										//
					$thisdata['Groupuser']['userid']=$UserData['User']['id'];																				//
					$thisdata['Groupuser']['groupid']=$groupid;																								//
					$thisdata['Groupuser']['name']=$GroupData['Group']['name'];																				//
					$thisdata['Groupuser']['username']=$newname;																							//
					$thisdata['Groupuser']['creator']=0;																									//
					$thisdata['Groupuser']['admin']=0;																										//
					$this->Groupuser->save($thisdata);																										//
				}																																			//
			}else 																																			//
			{ echo('No User'); }																															//
        }else  {  	echo('You must be an administrator of this group to add a member.'); }																	//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/



/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------- This allows an admin to change the name of the group - no id info is changed ---------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GroupName() {																															//
 		$this->autorender = false;																															//
 		$this->layout = null;																																//
  	    $this->render('ajax');																																//
		$groupid=$this->request->data('groupid');																											//
        if (($this->request->is('post'))&&($this->CheckPermission($groupid))) {																				//
			$newname=$this->request->data('newname');																										//
			Controller::loadModel('Group');																													//
			$GroupData=$this->Group->find('first', array('conditions' => array('id' => $groupid), 'recursive' => 0));										//
			$GroupData['Group']['name']=$newname;																											//
			$this->Group->save($GroupData);																													//
			Controller::loadModel('Groupuser');																												//
			$GroupUserData=$this->Groupuser->find('all', array('conditions' => array('groupid' => $groupid), 'recursive' => 0));							//
			foreach ($GroupUserData as &$value) { 																											//
				$value['Groupuser']['name']=$newname;																										//
				$this->Groupuser->save($value);																												//
			}																																				//
        }else  {  	echo('You must be an administrator of this group to change its name.'); }																//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------- Check to see if the user has the permission to perform the action in question --------------------------------------*/
/*------------------------------------------- Returns the admin privileges for this user on the specified group --------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function CheckPermission($groupid) {																												//
		Controller::loadModel('Groupuser');																													//
		$UserData=$this->Groupuser->find('first', array('conditions' => array('userid' => $this->Auth->user('id'), 'groupid' => $groupid)));				//
		if ($UserData['Groupuser']['admin']) { $answer=1; }else { $answer=0; }
		return $answer;
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------- Show the Specs for a group ---------------------------------------------------------------*/
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/
    public function GroupSpecs() {																															//
        $this->layout = 'groups';																															//
		$this->set('type', "specs");																														//
		$slug=Router::url(null, true);																														//
		$slug=str_replace("http://www.cadwolf.com/Groups/",'',$slug);																						//
		Controller::loadModel('Group');																														//
		$GroupData=$this->Group->find('first', array('conditions' => array('name' => $slug), 'recursive' => 0));											//
		$this->set('GroupData', $GroupData);																												//
		Controller::loadModel('Groupuser');																													//
		$MemberData=$this->Groupuser->find('all', array('conditions' => array('groupid' => $GroupData['Group']['id'])));									//
		$this->set('MemberData', $MemberData);																												//
		$NumMembers=$this->Groupuser->find('count', array('conditions' => array('groupid' => $GroupData['Group']['id']), 'order' => 'admin DESC'));			//
		$this->set('NumMembers', $NumMembers);																												//
    }																																						//	
/*----------------------------------------------------------------------------------------------------------------------------------------------------------*/

}


?>