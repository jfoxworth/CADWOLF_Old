<?php
App::uses('AuthComponent', 'Controller/Component');								//
class Dataset extends AppModel {												//
	public $name = 'Dataset';													//
    public $useDbConfig = 'datasets';											//
    public $useTable = 'datasets';												//
    public $validate = array(													//
        'id' => array(															//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'required'	=> true,											//
                'message' 	=> 'The file id must be numeric',					//
				'last'		=>	true											//
            ),																	//
            'minlength' => array(												//
                'rule' 		=> array('minlength',1),							//
                'message' 	=> 'The file id must be 1 digits',					//
				'last'		=>	true											//
            ),																	//
            'maxlength' => array(												//
                'rule' 		=> array('maxlength',18),							//
                'message' 	=> 'The file id must be 18 digits',					//
				'last'		=>	true											//
            )																	//
        ),																		//
   );																			//

}

?>