<?php

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
				echo('<div class="leftNav" id="viewProfile_current">&nbsp</div>');																			//	\
				if ((preg_replace("/_/"," ",$this->Session->read('Auth.User.username'))==preg_replace("/_/"," ",$UserData['User']['username']))&&($UserData['User']['active']==1))
				{	echo('<div class="leftNav" id="viewFAF">&nbsp</div>');																					//	\
					echo('<div class="leftNav" id="viewPass">&nbsp</div>');			}																		//	\
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
		{	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users">Login</a></div>');		}									//	\
		echo('<div class="leftColumnWrapper">');																											//	\
			echo('<div id="leftColumnText">');																												//	\
				echo('<div class="leftNavTextCurrent" id="viewProfileText">Profile</div>');																	//	\
				if ((preg_replace("/_/"," ",$this->Session->read('Auth.User.username'))==preg_replace("/_/"," ",$UserData['User']['username']))&&($UserData['User']['active']==1))
				{	echo('<div class="leftNavText" id="viewFAFText">Defined Functions</div>');																//	\
					echo('<div class="leftNavText" id="viewPassText">Change Password</div>');	}															//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\

echo('<div id="Main_Wrapper">');


	echo('<div id="profile_wrapper">');
		echo('<div id="personal_wrapper">');
			echo('<div class="profiletitle">User Profile - "'.$UserData['User']['username'].'"</div>');
			if ($UserData['User']['active']==0) 
			{	echo('<div id="activate_account_wrapper"><div id="activate_description">Enter code in the input area and press enter</div><input id="activate_account" type="text"></div>');
				echo('<div id="activate_success">Your account is now active. You can now <a href="http://www.cadwolf.com/Users">log on</a> and start working.</div>'); 
				echo('<div id="validationError">The code you entered was not valid for this user.</div>'); 
			}
			echo('<div id="left_wrapper">');
				if ((str_replace("_"," ",$this->Session->read('Auth.User.username'))==str_replace("_"," ",$UserData['User']['username']))&&($UserData['User']['active']==1))
				{
					if (strlen($UserData['User']['imgname'])) { echo('<div id="userimage"><img src="'.$UserData['User']['imgname'].'" /></div>');
					}else { echo('<div id="userimage"><img src="http://assets.ngin.com/site_files/2731/i/blank-profile.png" /></div>'); }
					echo('<div id="imagecontent">');
						echo('<div id="adduserimage">Upload a new image</div>');
						echo('<div id="image_uploader"><input type="file" id="image_to_upload"/></div>');
					echo('</div>');	
					echo('</div>');
					echo('<div id="right_wrapper">');
						echo('<div id="biomessage">&nbsp</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">User Name</div>');
							echo('<div class="profile_infoitem" id="profile_username" username="'.$UserData['User']['username'].'">'.$UserData['User']['username'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">First Name</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="first name">'.$UserData['User']['first name'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Last Name</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="last name">'.$UserData['User']['last name'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Office Number</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="cell_phone_number">'.$UserData['User']['cell_phone_number'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Cell Number</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="office_phone_number">'.$UserData['User']['office_phone_number'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Office Location</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem profileedit" id="office_location">'.$UserData['User']['office_location'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Email Address</div>');
							echo('<div class="profile_infoitemholder"><div class="profile_infoitem" id="email">'.$UserData['User']['email'].'</div></div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Facebook Account</div>');
							if ($UserData['User']['facebook_id']!=NULL) { 	echo('<div class="profile_infoitemholder"><div class="profile_infoitem" id="fbid" fbuid="'.$UserData['User']['facebook_id'].'">'.$UserData['User']['facebook_username'].'</div></div>'); 
							}else { 										echo('<div class="profile_infoitemholder"><div class="profile_infoitem" id="fbid" fbuid="0">Click to link account</div></div>'); }
						echo('</div>');
					echo('</div>');
				}else
				{
					if (strlen($UserData['User']['imgname'])) { echo('<div id="userimage"><img src="'.$UserData['User']['imgname'].'" /></div>');
					}else { 									echo('<div id="userimage"><img src="http://assets.ngin.com/site_files/2731/i/blank-profile.png" /></div>'); }
					echo('</div>');
					echo('<div id="right_wrapper">');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">User Name</div>');
							echo('<div class="profile_infoitem" id="profile_username" userid="'.$UserData['User']['id'].'">'.$UserData['User']['username'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Name</div>');
							echo('<div class="profile_infoitem" id="profile_name">'.$UserData['User']['first name'].' '.$UserData['User']['last name'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Office Number</div>');
							echo('<div class="profile_infoitem" id="profile_phonenumber">'.$UserData['User']['cell_phone_number'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Cell Number</div>');
							echo('<div class="profile_infoitem" id="profile_phonenumber">'.$UserData['User']['office_phone_number'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Office Location</div>');
							echo('<div class="profile_infoitem" id="profile_officelocation">'.$UserData['User']['office_location'].'</div>');
						echo('</div>');
						echo('<div class="profile_infoline">');
							echo('<div class="profile_infolabel">Email Address</div>');
							echo('<div class="profile_infoitem" id="profile_email">'.$UserData['User']['email'].'</div>');
						echo('</div>');
					echo('</div>');
				}
		echo('</div>');
		if ((preg_replace("/_/"," ",$this->Session->read('Auth.User.username'))==preg_replace("/_/"," ",$UserData['User']['username']))&&($UserData['User']['active']==1))
		{
			echo('<div id="FAF_wrapper">');
				echo('<div class="profile_text">Individual files can be used as functions within other files. To do this, users must firstname those files on the "File as a Function" tab within each file. ');
				echo('Next, users must include that file in the list below so that the platform knows which files the user intends to use. Enter the address of any file you wish to use as a function below. ');
				echo('Click the plus below to add a new line.</div>');
				echo('<div id="message"></div>');
				echo('<div id="Profile_FAF">');
					echo('<div class="Profile_FAF_line">');
						echo('<div class="Profile_FAF_header2">Address</div>');
						echo('<div class="Profile_FAF_header1">Name</div>');
					echo('</div>');
					$FAFs=json_decode($UserData['User']['FAF_List']);
					if (count($FAFs)>0)
					{	
						foreach ($FAFs as $index=>$value)  																											//
						{	if (str_replace("_"," ",$this->Session->read('Auth.User.username'))==str_replace("_"," ",$UserData['User']['username']))
							{	echo('<div class="Profile_FAF_line">');
									echo('<div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">'.$FAFs->{$index}->{'address'}.'</div></div>');
									echo('<div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">'.$FAFs->{$index}->{'name'}.'</div></div>');
									echo('<div class="Profile_FAF_delete">&nbsp</div>');
								echo('</div>');
							}else
							{	echo('<div class="Profile_FAF_line">');
									echo('<div class="Profile_FAF_addressholder">'.$value['address'].'</div>');
									echo('<div class="Profile_FAF_nameholder">'.$value['name'].'</div>');
								echo('</div>');
							}
						}
					}
				echo('</div>');
				echo('<div id="Profile_Add"></div>');
			echo('</div>');


			echo('<div id="Pass_wrapper">');
				echo('<div id="passInner">');
					echo('<div class="profiletitle">Change the password</div>');
					echo('<div id="passSection">');
						echo('<div class="profile_text">This page lets the user change their password. If you have forgotten your password, go to the <a href="http://www.cadwolf.com/Users">user page</a> and enter your email.</div>');
						echo('<div class="passLine">');
							echo('<div id="passErrorBox"></div>');
							echo('<div class="passLeft">New Password</div>');
							echo('<div class="passRight"><input type="password" id="pass2"/></div>');
							echo('<div class="passLeft">Repeat New Password</div>');
							echo('<div class="passRight"><input type="password" id="pass3"/></div>');
							echo('<div id="submitPass">Submit New Password</div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
		}
	echo('</div>');
echo('</div>');


?>

