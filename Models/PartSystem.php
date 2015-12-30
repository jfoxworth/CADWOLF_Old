<?php
App::uses('AuthComponent', 'Controller/Component');								//
class PartSystem extends AppModel {												//
	public $name = 'PartSystem';												//
    public $useDbConfig = 'parts';												//
    public $useTable = 'cadwolf_systems';										//

	public $hasMany = array(													//
        'Parts' => array(														//
            'className' => 'Parts',												//
			'foreignKey'=> 'system_id',											//
            'dependent' => true													//
        )																		//
    );																			//
}

?>