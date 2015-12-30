<?php

class DirectoriesController extends AppController {

    public function index() {
        if (end($this->params['pass'])=='') { $this->set('dirname', $this->Auth->user('username')); }else { $this->set('dirname', str_replace("_"," ",end($this->params['pass']))); }
		$MyFiles = $this->MyDirectory->find('all');
		$this->set('MyFiles', $MyFiles);
        $this->layout = 'directories';		
    }

}
?>