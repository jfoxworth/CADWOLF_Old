<?php
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*
	This is the page that provides for the separate bug reporting system and feature request system.
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
echo('<div id="GoodMessageWrapper"><div id="goodmessage"></div></div>');
echo('<div id="MainBody">');

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
			echo('</div>');																																	//	\
		}else {	echo('<div id="user">&nbsp</div>');		}																									//	\
		echo('<div class="leftColumnWrapper">');																											//	\
			echo('<div id="leftColumnIcons">');																												//	\
//				echo('<div class="leftNav" id="permissions">&nbsp</div>');																					//	\
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
	
	echo('<div id="Main_Column">');

		echo('<div id="Feature_System">');
			echo('<div class="SystemTitle">Feature Request System</div>');
			echo('<div class="SystemText">If you want to see a feature added to CADWOLF, you can request it here. Please describe the feature that you are looking for in as much detail as possible. If the feature is related to a chart, please note the type of chart is applies to most. If you would like to see a built-in mathematical function provide a link to something similar on wiki if possible.</div>');
			echo('<div class="SystemText">Please describe the feature as well as possible</div>');
			echo('<textarea rows="12" cols="110" id="featuretext" class="textentry"></textarea>');
			echo('<div class="EntryButton" id="FeatureButton">Request Feature</div>');
		echo('</div>');

		echo('<div id="Bug_System">');
			echo('<div class="SystemTitle">Bug Reporting System</div>');
			echo('<div class="SystemText">This page provides a place for the user to report a bug found in a document or a workspace. Please provide the address where the error was encountered and then describe the error as much as possible.</div>');
			echo('<div class="SystemText">Please provide the address of the page where the error was found:</div>');
			echo('<input type="text" id="bugaddress" placeholder="Address where error was encountered" />');
			echo('<div class="SystemText">Please describe the error as well as possible</div>');
			echo('<textarea rows="12" cols="110" id="bugtext" class="textentry"></textarea>');
			echo('<div class="EntryButton" id="BugButton">Report Bug</div>');
		echo('</div>');


	echo('</div>');

echo('</div>');