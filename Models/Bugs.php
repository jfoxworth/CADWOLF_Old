<?php
App::uses('AuthComponent', 'Controller/Component');	
class Bugs extends AppModel {	
	public $name = 'Bugs';
    public $useDbConfig = 'documents';
    public $useTable = 'bugs';

    public $validate = array(
        'fileid' => array(
            'required' => array(
                'rule' 		=> 'numeric',
                'required'	=> true,
                'message' 	=> 'The file id must be numeric',
				'last'		=>	true
            ),	
            'minlength' => array(
                'rule' 		=> array('minlength',1),	
                'message' 	=> 'The file id must be at least 1 digits',	
				'last'		=>	true	
            ),
            'maxlength' => array(
                'rule' 		=> array('maxlength',18),
                'message' 	=> 'The file id must be 18 digits',	
				'last'		=>	true
            )	
        )
   );	
}

?>
