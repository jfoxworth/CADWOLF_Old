<?php
App::uses('AuthComponent', 'Controller/Component');
class Profile extends AppModel {
    public $useDbConfig = 'users';												// Use the "users" database
	public $name = 'Profile';													//
    public $useTable = 'profiles';												//
	public $belongsTo = array('User');											//
	public $primaryKey='user_id';
	public $foreignKey='id';
    public $validate = array(													//
        'user_id' => array(													//
            'unique' => array(													//
                'rule' 		=> 'isUnique',										//
                'message' 	=> 'The id is already in use',						//
				'last'		=>	true											//
            )																	//
        )																		//
    );																			//

}

?>