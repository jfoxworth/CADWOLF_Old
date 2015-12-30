<?php
App::uses('AuthComponent', 'Controller/Component');
class Permission extends AppModel {
    public $useDbConfig = 'workspaces';											// Use the "workspaces" database
	public $name = 'Permission';												//
    public $useTable = 'permissions';											//
	public $primaryKey='workspace_id';

    public $validate = array(													//
        'workspace_id' => array(														//
            'unique' => array(													//
                'rule' 		=> array('notEmpty'),								//
                'message' 	=> 'An item id is required',						//
				'last'		=>	true											//
            ),																	//
            'number' => array(													//
                'rule' => '/^[0-9]+$/',											//
                'message' 	=> 'The item id must be a number',					//
				'last'		=>	true											//
            )																	//
        ),																		//
        'requesterid' => array(													//
            'unique' => array(													//
                'rule' 		=> array('notEmpty'),								//
                'message' 	=> 'A requester id is required',					//
				'last'		=>	true											//
            ),																	//
            'number' => array(													//
                'rule' => '/^[0-9]+$/',											//
                'message' 	=> 'The requester id must be a number',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'edit' => array(														//
            'bool' => array(													//
                'rule'    => array('boolean'),									//
                'message' 	=> 'Edit must be a boolean',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'view' => array(														//
            'bool' => array(													//
                'rule'    => array('boolean'),									//
                'message' 	=> 'View must be a boolean',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'save' => array(														//
            'bool' => array(													//
                'rule'    => array('boolean'),									//
                'message' 	=> 'View must be a boolean',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'admin' => array(														//
            'bool' => array(													//
                'rule'    => array('boolean'),									//
                'message' 	=> 'View must be a boolean',						//
				'last'		=>	true											//
            )																	//
        )																		//
    );																			//
}

?>