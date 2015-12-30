<?php
echo('<div id="logo">&nbsp</div>');
echo('<div id="login_wrapper">');					
	if ($loggedIn)
	{ 
		echo('<div id="login_drop">'.$this->Session->read('Auth.User.username'));
		echo('</div>');
			echo('<div id="dropbox">');
	//			echo('<div id="droplogin_image"><img src="http://www.gravatar.com/avatar/c2683997ba00d91004d1f5663b589a8c?d=mm&s=125" /></div>');
				echo('<div id="droplogin_image"><img width="140px" src="'.$this->Session->read('Auth.User.image').'" /></div>');
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Profile Page</a></div>');
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Workspace</a></div>');
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/users/logout">Log Out</a></div>');
			echo('</div>');
	} else 
	{ 
		echo('<div id="login_anchor"><a href="http://www.cadwolf.com/users/login">Login</a></div>'); 
	}
echo('</div>');

?>