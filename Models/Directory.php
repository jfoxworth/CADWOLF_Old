<?php
App::uses('AuthComponent', 'Controller/Component');
class User extends AppModel {
    public $useDbConfig = 'filedata';												// Use the "users" database
	public $name = 'Directory';
	$MyFiles = $this->MyDirectory->find('all');
	$this->set('MyFiles', $MyFiles);
}

?>