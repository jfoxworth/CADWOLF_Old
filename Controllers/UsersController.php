<?php

class UsersController extends AppController {

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function index() {																				//	\
	$this->User->recursive = 0;																			//	\
	if ($this->Auth->login()) { return $this->redirect($this->Auth->redirect());}						//	\
	$this->layout='users';																				//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function view($id = null) {																		//	\
	$this->User->id = $id;																				//	\
    if (!$this->User->exists()) {	throw new NotFoundException(__('Invalid user')); }					//	\
    $this->set('user', $this->User->read(null, $id));													//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------//
//---------------------------------- ADD A NEW USER -------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function add() 																					//	\
{	$this->layout = null;																				//	\
	if ($this->request->is('post')) {																	//	\
		$this->User->create();																			//	\
		$data_array=array();																			//	\
		$data_array['User']['username']=$this->request->data('name');									//	\
		$data_array['User']['password']=$this->request->data('pass');									//	\
		$data_array['User']['email']=$this->request->data('email');										//	\
		$data_array['User']['facebook_id']=$this->request->data('fbid');								//	\
		$data_array['User']['facebook_username']=$this->request->data('fbname');						//	\
        if ($this->User->save($this->request->data)) {													//	\
        	$this->Session->setFlash(__('The user has been saved'));									//	\
			$this->loadModel('Workspace');																//	\
			$data = array();																			//	\
			$data['Workspace']['name'] = $this->request->data['User']['username'].'';					//	\
			$this->Workspace->save($data);																//	\
			$lastid=$this->Workspace->getLastInsertID();												//	\
		    $this->loadModel('Permission');																//	\
		    $data = array();																			//	\
	        $data['Permission']['workspace_id']=$lastid;												//	\
	        $data['Permission']['userid']=$this->Auth->user('id');										//	\
	        $data['Permission']['view']='1';															// 	\
	        $data['Permission']['use']='1';																// 	\
	        $data['Permission']['edit']='1';															//	\
	        $data['Permission']['admin']='1';															//	\
	        $this->Permission->create();																//	\
			$this->Permission->save($data);																//	\
			$this->Auth->login();																		//	\
			return $this->redirect(array('action' => 'index'));											//	\
		}																								//	\
		$this->Session->setFlash(__('The user could not be saved. Please, try again.'));				//	\
}	}																									//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//-------------------------------------- LOGIN THE USER ---------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function login() {																				//	\
	if ($this->User->hasAny(array('User.id' => $this->Auth->user('id'))))								//	\ 
	{	$ReturnData=$this->User->find('first', array('conditions' => array('id' => $this->Auth->user('id')), 'recursive' => 0));			//	\
		if ($ReturnData['User']['active']==1)															//	\
		{	if ($this->Auth->user('id')) { return $this->redirect($this->Auth->redirect()); 			//	\
			}else { $this->layout = 'userlogin'; }														//	\
			if ($this->request->is('post')) {															//	\
				if ($this->Auth->login()) { return $this->redirect($this->Auth->redirect()); }			//	\
	    		  $this->Session->setFlash(__('Invalid username or password, try again'));				//	\
			}																							//	\
		}																								//	\
	}																									//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//
	
//---------------------------------------------------------------------------------------------------------//
//---------------------------------- LOGGING OUT THE USER -------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function logout() {   return $this->redirect($this->Auth->logout()); }							//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//--------------------------- TEST IF THE FACEBOOK ID IS CONNECTED TO AN ACCOUNT --------------------------//
//---------------------------------------------------------------------------------------------------------//
public function TestUser() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $id=$this->request->data('id');																		//	\
	if ($this->User->hasAny(array('User.facebook_id' => $id))) 											//	\ 
	{	$FBData=$this->User->find('first', array('conditions' => array('facebook_id' => $id), 'recursive' => 0));			//	\
		$user=$FBData['User']['username'];																//	\
	}else{	$user=0;	}																				//	\
	echo($user);																						//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//--------------------------- TEST IF THE ACCOUNT NAME ENTERED IS ALREADY TAKEN ---------------------------//
//---------------------------------------------------------------------------------------------------------//
public function TestName() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $name=$this->request->data('name');																	//	\
	if ($this->User->hasAny(array('User.username' => $name))) 											//	\ 
	{	$user=0;	}else{	$user=1;	}																//	\
	echo($user);																						//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//--------------------------- TEST IF THE ACCOUNT NAME ENTERED IS ALREADY TAKEN ---------------------------//
//---------------------------------------------------------------------------------------------------------//
public function TestActive() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $name=$this->request->data('name');																	//	\
	if ($this->User->hasAny(array('User.username' => $name))) 											//	\ 
	{	$ReturnData=$this->User->find('first', array('conditions' => array('username' => $name), 'recursive' => 0));			//	\
		if ($ReturnData['User']['active']==1) {	echo('1');}elseif ($ReturnData['User']['active']==0){echo('0');	}	
	}else { echo('2'); }																				//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//------------------------------ TEST IF THE EMAIL ENTERED IS ALREADY TAKEN -------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function TestEmail() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $email=$this->request->data('name');																//	\
	if ($this->User->hasAny(array('User.email' => $email))) 											//	\ 
	{	$user=0;	}else{	$user=1;	}																//	\
	echo($user);																						//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//--------------------------- LOG A USER IN IF THEY CHOSE TO DO SO THROUGH FACEBOOK -----------------------//
//---------------------------------------------------------------------------------------------------------//
public function LoginUser() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $id=$this->request->data('id');																		//	\
    $image=$this->request->data('image');																//	\
	$user=array();																						//	\
	if ($this->User->hasAny(array('User.facebook_id' => $id))) 											//	\ 
	{	$FBData=$this->User->find('first', array('conditions' => array('facebook_id' => $id), 'recursive' => 0));			//	\
		$user['name']=str_replace('_',' ',$FBData['User']['username']);									//	\
		if ($this->User->hasAny(array('User.id' => $FBData['User']['id'], 'User.password'=>$FBData['User']['password'])))
			{	$this->Auth->login(array('id' =>$FBData['User']['id'], 'password'=>$FBData['User']['password'], 'username'=>$FBData['User']['username']));
				$this->User->id=$FBData['User']['id'];													//	\		
				$this->User->saveField('imgname', $image);												//	\		
				$this->Session->write('Auth.User.image', $image);
			}else																						//	\
			{	echo('No User'); }																		//	\
	}else{	$user['name']=0;	}																		//	\
	echo(json_encode($user));																			//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//

//---------------------------------------------------------------------------------------------------------//
//-------------------------------------- CREATE A NEW ACCOUNT USING FACEBOOK ------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function CreateUser() {																			//	\--- This is the function called when a user wants to create an account using
	$this->autorender = false;																			//	\--- their facebook account. The relevant data is read in and checked.
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
	$fbid=$this->request->data('fbid');																	//	\
	$fbusername=$this->request->data('fbname');															//	\
	$username=$this->request->data('name');																//	\
	$username2=str_replace(' ','_',$username);															//	\
	$email=$this->request->data('email');																//	\
	$password=$this->request->data('pass');																//	\
	$firstname=$this->request->data('fname');															//	\
	$lastname=$this->request->data('lname');															//	\
	$hash = md5( rand(0,1000) );																		//	\
	if ($this->User->hasAny(array('User.username' => $username))){ echo('0');							//	\
	}else																								//	\
	{																									//	\
		$thisuser=array();																				//	\--- Create the user entry
		$thisuser['User']=array();																		//	\
		$thisuser['User']['username']=$username;														//	\
		$thisuser['User']['first name']=$firstname;														//	\
		$thisuser['User']['last name']=$lastname;														//	\
		$thisuser['User']['password']=$password;														//	\
		$thisuser['User']['facebook_id']=$fbid;															//	\
		$thisuser['User']['facebook_username']=$fbusername;												//	\
		$thisuser['User']['email']=$email;																//	\
		$thisuser['User']['acode']=$hash;																//	\
	    $this->User->create();																			//	\
		$this->User->save($thisuser);																	//	\
		$userid=$this->User->getLastInsertID();															//	\
		$this->loadModel('Workspace');																	//	\--- Create the workspace entry
		$thisworkspace = array();																		//	\
		$thisworkspace['Workspace']=array();															//	\
		$thisworkspace['Workspace']['name'] = $username;												//	\
		$thisworkspace['Workspace']['view_status'] = '1';												//	\
		$thisworkspace['Workspace']['use_status'] = '0';												//	\
		$thisworkspace['Workspace']['edit_status'] = '0';												//	\
		$thisworkspace['Workspace']['admin_status'] = '0';												//	\
	    $this->Workspace->create();																		//	\
		$this->Workspace->save($thisworkspace);															//	\
		$lastid=$this->Workspace->getLastInsertID();													//	\
	    $this->loadModel('Permission');																	//	\
	    $data = array();																				//	\
        $data['Permission']['workspace_id']=$lastid;													//	\
        $data['Permission']['userid']=$userid;															//	\
        $data['Permission']['username']=$username;														//	\
        $data['Permission']['view']='1';																// 	\
        $data['Permission']['use']='1';																	// 	\
        $data['Permission']['edit']='1';																//	\
        $data['Permission']['admin']='1';																//	\
		$this->Permission->create();																	//	\
		$this->Permission->save($data);																	//	\
//		$this->Auth->login(array('id' =>$fbid, 'password'=>$password, 'username'=>$username));			//	\
		$to      = $email; 																				// 	\--- Send email to our user
		$subject = 'CADWOLF Verification'; 																//	\--- Give the email a subject 
		$message = "Thank you for joining CADWOLF. Your account with the user name ".$username." has been created, but you must activate your account prior to using it. Go to the link below and enter the code: \r\n \r\n ".$hash." \r\n \r\n http://www.cadwolf.com/Profiles/".$username2;
		$headers = 'From:noreply@cadwolf.com' . "\r\n"; 												//	\--- Set from headers
		mail($to, $subject, $message, $headers); 														//	\--- Send our email			
		$thisobj=Array();																				//	\
		$thisobj['name']=$username;																		//	\
		echo(json_encode($thisobj));																	//	\
	}																									//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//


//---------------------------------------------------------------------------------------------------------//
//------------------------------ RESET AN ACCOUNT BASED ON AN EMAIL ---------------------------------------//
//---------------------------------------------------------------------------------------------------------//
public function resetPass() {																			//	\
	$this->autorender = false;																			//	\
	$this->layout = null;																				//	\
    $this->render('ajax');																				//	\
    $email=$this->request->data('email');																//	\
	if ($this->User->hasAny(array('User.email' => $email))) 											//	\ 
	{	$UserData=$this->User->find('first', array('conditions' => array('email' => $email), 'recursive' => 0));
	    $this->User->id=$UserData['User']['id'];														//	\
		$newpass=substr(md5(rand()), 0, 7);																//	\
		$this->User->saveField('password', $newpass);													//	\
		$to      = $email; 																				// 	\
		$subject = 'CADWOLF Account Reset'; 															//	\ 
		$message = "The CADWOLF account for the user name associated with this address has been reset to ".$newpass;
		$headers = 'From:noreply@cadwolf.com' . "\r\n"; 												//	\
		mail($to, $subject, $message, $headers); 														//	\			
	}else{	echo('0');	}																				//	\
}																										//	\
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------//

}
?>