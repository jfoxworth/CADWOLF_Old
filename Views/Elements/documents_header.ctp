<?php
/*
echo('<div id="header_wrapper">');
	echo('<div id="header">');
		echo('<div id="toolbar_wrapper">');
			echo('<div id="logo">CAD W<img src="/Images/Pages/wolfpaw2.gif" height="26px"/>lf</div>');
			echo('<div id="Format_Wrapper">');
				echo('<div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div>');
			echo('</div>');
			echo('<div id="login_wrapper">');					
			if ($loggedIn)
			{ 
				echo('<div id="login_drop">'.$this->Session->read('Auth.User.username'));
				echo('</div>');
					echo('<div id="dropbox">');
//						echo('<div id="droplogin_image"><img src="http://www.gravatar.com/avatar/c2683997ba00d91004d1f5663b589a8c?d=mm&s=125" /></div>');
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
		echo('</div>');
	echo('</div>');
echo('</div>');
*/


/*
echo('<div id="header_wrapper">');
	echo('<div id="header">');
		echo('<div id="toolbar_wrapper">');
			echo('<div id="logo">CAD W<img src="/Images/Pages/wolfpaw2.gif" height="26px"/>lf</div>');
			echo('<div id="Tab_Wrapper">');
				echo('<div id="Tab_Line">');
					echo('<div class="tabitem"><div  id="standardview" class="currenttab">Worksheet</div></div>');
					echo('<div class="tabitem"><div id="fileview" class="navtab">Properties</div></div>');
					echo('<div class="tabitem"><div id="importedfuncview" class="navtab">Imported Functions</div></div>');
					echo('<div class="tabitem"><div id="unitview" class="navtab">Constants</div></div>');
				echo('</div>');
			echo('</div>');
			echo('<div id="login_wrapper">');					
			if ($loggedIn)
			{ 
				echo('<div id="login_drop">'.$this->Session->read('Auth.User.username'));
				echo('</div>');
					echo('<div id="dropbox">');
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
		echo('</div>');
	echo('</div>');
echo('</div>');
*/


echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');

?>