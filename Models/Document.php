<?php
App::uses('AuthComponent', 'Controller/Component');								//
class Document extends AppModel {												//
	public $name = 'Document';													//
    public $useDbConfig = 'documents';											//
    public $useTable = 'maindata';												//


	public $hasMany = array(													//
        'Text' => array(														//
            'className' => 'Text',												//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'Header' => array(														//
            'className' => 'Header',												//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),
        'Equation' => array(													//
            'className' => 'Equation',											//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'Symbolic' => array(													//
            'className' => 'Symbolic',											//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'Table' => array(														//
            'className' => 'Table',												//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'ForLoop' => array(														//
            'className' => 'ForLoop',											//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'WhileLoop' => array(													//
            'className' => 'WhileLoop',											//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'IfElse' => array(														//
            'className' => 'IfElse',											//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'Plot' => array(														//
            'className' => 'Plot',												//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        ),																		//
        'Images' => array(														//
            'className' => 'Images',												//
			'foreignKey'=> 'id',												//
			'primaryKey'=> 'id',												//
            'dependent' => true													//
        )
    );																			//


    public $validate = array(													//
        'fileid' => array(														//
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
        'itemid' => array(														//
            'required' => array(												//
                'rule' 		=> 'alphaNumeric',									//
                'required'	=> true,											//
                'message' 	=> 'The item id must be alphanumeric',				//
				'last'		=>	true											//
            ),																	//
            'minlength' => array(												//
                'rule' 		=> array('minlength',3),							//
                'message' 	=> 'The item id must be at least 3 digits',			//
				'last'		=>	true											//
            ),																	//
            'maxlength' => array(												//
                'rule' 		=> array('maxlength',20),							//
                'message' 	=> 'The item id must be no more than 20 digits',	//
				'last'		=>	true											//
            )																	//
        ),																		//
        'location' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'required'	=> true,											//
                'message' 	=> 'The location must be numeric',					//
				'last'		=>	true											//
            )																	//
        ),																		//
        'width' => array(														//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The width must be numeric',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'margintop' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The top margin must be numeric',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'marginbottom' => array(												//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The bottom margin must be numeric',				//
				'last'		=>	true											//
            )																	//
        ),																		//
         'marginleft' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The left margin must be numeric',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'marginright' => array(													//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The right margin must be numeric',				//
				'last'		=>	true											//
            )																	//
        ),																		//
        'vartype' => array(														//
            'required' => array(												//
                'rule' 		=> 'numeric',										//
                'message' 	=> 'The type must be numeric',						//
				'last'		=>	true											//
            )																	//
        ),																		//
        'parentid' => array(													//
            'required' => array(												//
                'rule' 		=> 'alphaNumeric',									//
                'required'	=> true,											//
                'message' 	=> 'The parent itid id must be alphanumeric',		//
				'last'		=>	true											//
            ),																	//
            'minlength' => array(												//
                'rule' 		=> array('minlength',1),							//
                'message' 	=> 'The parent id must be at least 3 digits',		//
				'last'		=>	true											//
            ),																	//
            'maxlength' => array(												//
                'rule' 		=> array('maxlength',10),							//
                'message' 	=> 'The parent id must be no more than 10 digits',	//
				'last'		=>	true											//
            )																	//
        ),																		//
        'topparentid' => array(													//
            'required' => array(												//
                'rule' 		=> 'alphaNumeric',									//
                'required'	=> true,											//
                'message' 	=> 'The top id must be alphanumeric',				//
				'last'		=>	true											//
            ),																	//
            'minlength' => array(												//
                'rule' 		=> array('minlength',1),							//
                'message' 	=> 'The top id must be at least 3 digits',			//
				'last'		=>	true											//
            ),																	//
            'maxlength' => array(												//
                'rule' 		=> array('maxlength',10),							//
                'message' 	=> 'The top id must be no more than 10 digits',		//
				'last'		=>	true											//
            )																	//
        )																		//
   );																			//

}

?>