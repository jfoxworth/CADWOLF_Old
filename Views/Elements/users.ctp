<?php

echo('<div id="fb-root"></div>');
echo('<div id="fbdata"></div>');

echo('<div id="leftColumnWrapper">');																														//	\
	echo('<div id="leftColumnIconsWrapper">');																												//	\
		echo('<div class="logoWrapper">');																													//	\
			echo('<div id="logo">&nbsp</div>');																												//	\
		echo('</div>');																																		//	\
		if ($loggedIn)																																		//	\
		{	echo('<div class="userWrapper">');																												//	\
				echo('<div id="user">&nbsp</div>');																											//	\
				echo('<div class="leftBlank">&nbsp</div>');																									//	\
				echo('<div class="leftBlank">&nbsp</div>');																									//	\
				echo('<div class="leftBlank">&nbsp</div>');																									//	\
			echo('</div>');																																	//	\
		}else {	echo('<div id="user">&nbsp</div>');		}																									//	\
		echo('<div class="leftColumnWrapper">');																											//	\
			echo('<div id="leftColumnIcons">');																												//	\
//				echo('<div class="leftNav" id="folders_current">&nbsp</div>');																				//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
	echo('<div id="leftColumnTextWrapper">');																												//	\
		echo('<div class="logoWrapper">');																													//	\
			echo('<div id="logoText">CADWOLF</div>');																										//	\
		echo('</div>');																																		//	\
		if ($loggedIn)																																		//	\
		{	echo('<div class="userWrapper">');																												//	\
			 	$profileAddress='http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));							//	\
				$workspaceAddress='http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username'));						//	\
				echo('<div id="userText">'.$this->Session->read('Auth.User.username').'</div>');															//	\
				echo('<div class="userLine"><a class="userItem" href="'.$workspaceAddress.'">Workspace</a></div>');											//	\
				echo('<div class="userLine"><a class="userItem" href="'.$profileAddress.'">User Page</a></div>');											//	\
				echo('<div class="userLine"><a class="userItem" href="http://www.cadwolf.com/users/logout">Log Out</a></div>');								//	\
			echo('</div>');																																	//	\
		} else 																																				//	\
		{	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users/">Login</a></div>');		}									//	\
		echo('<div class="leftColumnWrapper">');																											//	\
			echo('<div id="leftColumnText">');																												//	\
//				echo('<div class="leftNavTextCurrent" id="foldersText">Files and Folders</div>');															//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\


echo('<div id="main_wrapper">');
	echo('<div id="content_wrapper">');
		echo('<div id="main_column">');
/*
		echo('<div id="Main_Box">');
			echo('<h1>We are in a private beta</h1>');
			echo('<div id="private_text">We are currently in a private beta test. You can look at the <a href="http://www.cadwolf.com/Workspaces/Documentation/Examples">examples</a> posted and the <a href="http://www.cadwolf.com/Workspaces/Documentation">documentation</a> to see what is coming. You can also play with the <a href="http://www.cadwolf.com/Documents/Documentation/Example_File">example page</a> - which has all the functionality of a normal page.</div>');
		echo('</div>');
		echo('<div id="facebook_data"></div>');
*/
				echo('<div id="MainBody">');
					
					echo('<h1>Login or Create a User</h1>');

					echo('<div id="Default_Block">It appears that your computer does not have javascript enabled. The functionality of CADWOLF is based on javascript, so we require that you have it turned ');
					echo('on before getting a license. This is done in your browser preferences.</div>');


					echo('<div id="Create_Block">');
						echo('<div class="Login_Title">Create an Account</div>');
						echo('<div class="Login_Text"><p>CADWOLF is in a public beta test. Anyone can create an account. We just ask that you <a href="http://www.cadwolf.com/Bugs/">report any errors</a>.</p>');
						echo('<p>A user name, password, and email are required. Before the account can be used, a verification email will be sent to the entered address. Once the account is verified, it can ');
						echo('be linked to a facebook account and the user can log in through facebook. Each facebook account can only be linked to 1 CADWOLF account.</p>');
						echo('<p>The user name selected will be part of the address for all your files and folders. For example, the user name "The Wolf" will have as their home directory "www.cadwolf.com/Workspaces/The_Wolf/"');
						echo('. User names can have letters, numbers, and spaces.</p></div>');
						echo('<div id="create_inputs">');
							echo('<div class="input_line"><div class="left_text left_error" id="cu1">User Name :</div><div class="right_input"><input type="text" class="input_block" id="create_username" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="name_error">The user name must start with a letter, be at least 5 characters long, and can only have letters, numbers, and spaces.</div></div>');
							echo('<div class="input_line"><div class="error_text" id="name_duplicate">That user name is already taken.</div></div>');
							echo('<div class="input_line"><div class="left_text left_error" id="cu2">Password :</div><div class="right_input"><input type="password" class="input_block" id="create_pass" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="pass_error1">The password must be at least 5 characters long</div></div>');
							echo('<div class="input_line"><div class="left_text left_error" id="cu3">Repeat Pass :</div><div class="right_input"><input type="password" class="input_block" id="create_pass2" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="pass_error2">This password must match the one above</div></div>');
							echo('<div class="input_line"><div class="left_text left_error" id="cu4">Email :</div><div class="right_input"><input type="text" class="input_block" id="create_email" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="email_error">The email address must be of the proper format abc@xyz.com</div></div>');
							echo('<div class="input_line"><div class="error_text" id="email_error2">That email address is already linked to an account.</div></div>');
							echo('<div class="input_line"><div class="left_text left_error" id="cu5">First Name :</div><div class="right_input"><input type="text" class="input_block" id="create_firstname" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="firstname_error">The first name must have only have letters, dashes, apostrophes, and spaces.</div></div>');
							echo('<div class="input_line"><div class="left_text left_error" id="cu6">Last Name :</div><div class="right_input"><input type="text" class="input_block" id="create_lastname" /></div></div>');
							echo('<div class="input_line"><div class="error_text" id="lastname_error">The last name must have only letters, dashes, apostrophes, and spaces.</div></div>');
						echo('</div>');			
						echo('<div id="create_facebook"></div>');
						echo('<div id="create_button_wrapper"><div id="create_button">Create an Account</div></div>');
						echo('<div id="login3"><div id="fb_button"><fb:login-button autologoutlink="true"></div></div>');
					echo('</div>');			


					echo('<div id="Login_Block">');
						echo('<div class="Login_Title">Login</div>');
						if ($loggedIn)
						{ 
							echo('<div id="login_wrapper">');
								echo('<div id="login_dropwrapper2"><div id="login_drop2">'.$this->Session->read('Auth.User.username').'</div></div>');
								echo('<div id="login_box">');
									echo('<div id="droplogin_image"><img width="140px" src="'.$this->Session->read('Auth.User.image').'" /></div>');
									echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Profile Page</a></div>');
									echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Workspace</a></div>');
									echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/users/logout">Log Out</a></div>');
								echo('</div>');
							echo('</div>');
						} else 
						{ 
							echo('<div id="login_wrapper">');
								echo('<div id="login_box">');
									echo('<div id="login1">');
							    		echo('<div class="login_subtitle">Traditional Login</div>');
										echo $this->Form->create('User'); 
								    	echo $this->Form->input('username', array('class' => 'half_input', 'id'=>'login_name', 'placeholder'=>'User Name', 'label'=>false));
							    	  	echo $this->Form->input('password', array('class' => 'half_input', 'id'=>'login_pass', 'placeholder'=>'Password', 'label'=>false));
										$options = array('value' => 'Login', 'id' => 'loginsubmit'	);
										echo $this->Form->end($options); 
										echo('<div id="login_inactive">Account not yet active</div>');
										echo('<div id="login_noname">No account by that name</div>');
									echo('</div>');
									echo('<div id="login2">');
							    		echo('<div class="login_subtitle">Facebook Login</div>');
										echo('<div id="facebook_data"></div>');
						   				echo('<div id="fb_button"><fb:login-button autologoutlink="true"></div>');
									echo('</div>');
								echo('</div>');
							echo('</div>');
						}
					echo('</div>');			
					echo('<div id="resetPass">');
						echo('<div class="Login_Title">Reset Password</div>');
						echo('<div class="Login_Text"><p>If you have forgotten your password, enter your email address here and a new password will be sent and the account reset.</p>');
						echo('<div class="passReset"><input type="text" id="passReset" /></div>');
					echo('</div>');			
//					echo('<div class="wolf_background">&nbsp</div>');

				echo('</div>');			
//			echo('</div>');

		echo('</div>');




	echo('</div>');
echo('</div>');



?>