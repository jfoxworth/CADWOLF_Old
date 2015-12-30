<?php
App::uses('AuthComponent', 'Controller/Component');
class Group extends AppModel {
    public $useDbConfig = 'users';												// Use the "users" database
	public $name = 'Group';														//
    public $useTable = 'groups';												//
	public $hasMany = array('User');											//
    public $validate = array(													//
        'id' => array(															//
            'unique' => array(													//
                'rule' 		=> 'isUnique',										//
                'message' 	=> 'The id is already in use',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'name' => array(														//
            'valid' => array(													//
                'rule' => '/^[a-zA-Z0-9]+$/',									//
                'rule' => 'isUnique',											//
                'message' => 'Names must be unique and have letters and numbers',//
                'allowEmpty' => false,											//
				'last'		=>	true											//
            )																	//
        )																		//
    );																			//

	public function parentNode() {
        return null;
    }
}

?>