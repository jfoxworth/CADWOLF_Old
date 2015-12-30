<?php
App::uses('AuthComponent', 'Controller/Component');								//
class Workspace extends AppModel {												//
	public $name = 'Workspace';													//
    public $useDbConfig = 'workspaces';											//
    public $useTable = 'cadwolf_files';											//
    public $actsAs = array('Tree');												//

	public $hasMany = array(													//
        'Permission' => array(													//
            'className' => 'Permission',										//
			'foreignKey'=> 'workspace_id',										//
            'dependent' => true													//
        ),																		//
        'Document' => array(													//
            'className' => 'Document',											//
			'foreignKey'=> 'fileid',											//
            'dependent' => true													//
        )																		//
    );																			//

    public $validate = array(													//
        'parent_id' => array(													//
            'required' => array(												//
                'rule' 		=> array('notEmpty'),								//
                'message' 	=> 'A parent id is required',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'view_status' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'View status is boolean',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'edit_status' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'Edit status is boolean',						//
				'last'		=>	true											//
            )																	//

        ),																		//
        'File_or_Folder' => array(												//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'File_or_Folder must be 0,1, or 2',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'name' => array(														//
            'required' => array(												//
                'rule' 		=> array('between', 1, 256),						//
                'message' 	=> 'The name was incorrect',						//
				'last'		=>	true											//
            ),																	//
            'Alphanum' => array(												//
                'rule' => '/^[a-zA-Z0-9\s\-\,]+$/',								//
                'message' 	=> 'Name must be alpha numeric with spaces',		//
				'last'		=>	true											//
            )																	//
        )																		//
    );																			//

}

?>