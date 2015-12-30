<?php
App::uses('AuthComponent', 'Controller/Component');								//
class PartNumber extends AppModel {												//
	public $name = 'PartNumber';												//
    public $useDbConfig = 'parts';												//
    public $useTable = 'cadwolf_parts';											//
    public $actsAs = array('Tree');												//

}

?>