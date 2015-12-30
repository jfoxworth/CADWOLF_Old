<?php
App::uses('AuthComponent', 'Controller/Component');
class Groupuser extends AppModel {
    public $useDbConfig = 'users';												// Use the "users" database
	public $name = 'Groupuser';														//
    public $useTable = 'groupusers';												//
	public $primaryKey='groupid';
}

?>