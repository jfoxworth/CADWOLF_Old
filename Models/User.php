<?php
App::uses('AuthComponent', 'Controller/Component');
class User extends AppModel {
    public $useDbConfig = 'users';												// 
	public $hasAndBelongsToMany = array('Group');								//--- The user belongs to many groups and has one profile
	
	public $primaryKey='id';
	public $foreignKey='id';

    public $validate = array(													//
        'username' => array(													//
            'required' => array(												//
                'rule' 		=> array('notEmpty'),								//
                'message' 	=> 'A username is required',						//
				'last'		=>	true											//
            ),																	//
            'format' => array(													//
                'rule' 		=> '/^[0-9a-zA-Z_-\s]+$/',							//
                'message' 	=> 'The user name can contain letter, numbers, dashes, and underscores',//
				'last'		=>	true											//
            ),																	//
            'length' => array(													//
                'rule' 		=> array('between', 5, 100),						//
                'message' 	=> 'The username must be between 5 and 100 characters',	//
				'last'		=>	true											//
            ),																	//
            'unique' => array(													//
                'rule' 		=> 'isUnique',										//
                'message' 	=> 'The username is already in use',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'password' => array(													//
            'required' => array(												//
                'rule' => array('minLength', 5),								//
                'allowEmpty' => false,											//
                'message' => 'The password must be at least 5 characters long',	//
				'last'		=>	true											//
            )																	//
        ),																		//
        'email' => array(														//
            'valid' => array(													//
                'rule' => array('email'),										//
                'rule' 		=> 'isUnique',										//
                'message' => 'That email is already in use or is not in the format of name@example.com',	//
                'allowEmpty' => false,											//
				'last'		=>	true											//
            )																	//
        )																		//
/*
        'first name' => array(													//
           'valid' => array(													//
                'rule' => '/^[a-zA-Z-\']+$/',									//
                'message' => 'Names must be letters, dashes, or apostraphes',	//
                'allowEmpty' => false,											//
				'last'		=>	true											//
            )																	//
        ),																		//
        'last name' => array(													//
            'valid' => array(													//
                'rule' => '/^[a-zA-Z-\']+$/',									//
                'message' => 'Names must be letters, dashes, or apostraphes',	//
                'allowEmpty' => false,											//
				'last'		=>	true											//
            )																	//
        )																	//
 */
    );																			//

	public function beforeSave($options = array()) {
	    if (isset($this->data[$this->alias]['password'])) {
    	    $this->data[$this->alias]['password'] = AuthComponent::password($this->data[$this->alias]['password']);
   	 }
 	return true;
	}

	function equalToField($array, $field) {
	    return strcmp($this->data[$this->alias][key($array)], $this->data[$this->alias][$field]) == 0;
	}
	
	public function parentNode() {
        if (!$this->id && empty($this->data)) {
            return null;
        }
        if (isset($this->data['User']['group_id'])) {
            $groupId = $this->data['User']['group_id'];
        } else {
            $groupId = $this->field('group_id');
        }
        if (!$groupId) {
            return null;
        } else {
            return array('Group' => array('id' => $groupId));
        }
    }
}

?>