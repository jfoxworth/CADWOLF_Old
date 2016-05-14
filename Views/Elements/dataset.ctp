<?php
echo('<div id="datasetid" setid="'.$DirInfo['ID'].'"></div>');
echo('<div id="GoodMessageWrapper"><div id="goodmessage"></div></div>');
echo('<div id="BadMessageWrapper"><div id="badmessage"></div></div>');

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
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
				echo('<div class="leftNav" id="view_info_current">&nbsp</div>');																			//	\
				echo('<div class="leftNav" id="view_settings">&nbsp</div>');																				//	\
				echo('<div class="leftNav" id="view_main">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="view_results">&nbsp</div>');																					//	\
				if ($Permissions['edit']=='1'){	echo('<div id="saveFile">&nbsp</div>');	}																	//	\
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
			{	echo('<div id="userText"><a class="userAnchor" href="http://www.cadwolf.com/Users/">Login</a></div>');		}								//	\
		echo('<div class="leftColumnWrapper">');																											//	\
			echo('<div id="leftColumnText">');																												//	\
				echo('<div class="leftNavTextCurrent" id="view_infoText">Information</div>');																//	\
				echo('<div class="leftNavText" id="view_settingsText">Settings</div>');																		//	\
				echo('<div class="leftNavText" id="view_mainText">Input</div>');																			//	\
				echo('<div class="leftNavText" id="view_resultsText">Results</div>');																		//	\
				if ($Permissions['edit']=='1'){	echo('<div id="saveFileText">Save Dataset</div>');	}														//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
echo('<div id="main_wrapper">');
	echo('<div id="content_wrapper">');

/*		echo('<div id="main_leftcolumn">');
			echo('<div id="leftcolumn">');
				echo('<div id="logo">&nbsp</div>');
				echo('<div id="login_wrapper">');					
					if ($loggedIn)
					{ 	echo('<div id="login_dropwrapper">');
							echo('<div id="login_drop">'.$this->Session->read('Auth.User.username').'</div>');
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
						echo('<div id="login_anchor"><a href="http://www.cadwolf.com/Users">Login</a></div>'); 
					}
				echo('</div>');		
				if ($Permissions['edit']) { echo('<div id="save_button">Save Dataset</div>'); }
				echo('<div class="lc_description">View</div>');
				echo('<div class="lc_description_left">&nbsp</div><div class="description_right">&nbsp</div>');
				echo('<div class="lc_description_bottom">&nbsp</div>');
				echo('<div class="newblock_block">');
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="view_info" >&nbsp</div></div>'); 
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="view_settings" >&nbsp</div></div>'); 
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="view_main" >&nbsp</div></div>');
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="view_results" >&nbsp</div></div>'); 
				echo('</div>');
				echo('<div class="description_label" id="datasets_view"></div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');
	echo('<div id="dataset_wrapper">');
*/
		echo('<div id="main_content">');
			echo('<div class="dataset_mainheader">Create a Dataset</div>');
			if ($Permissions['view']=='1')
			{	
				echo('<div id="settings_wrapper">');
					echo('<div class="dataset_header">Settings to parse datasets</div>');
					echo('<div class="datasets_text"><p>This window lets users paste raw text into an input box and then parses that text to create an nth dimensional object. This object can then be pulled ');
					echo('into a document and used as a variable. There is a limit of 5 dimensions to the pasted data. The values are merely parsed and not solved, meaning that there is no way to enter complex ');
					echo('data. This window is merely meant to allow users to paste test data and other types of raw data.</p>');
					echo('<p>When text is pasted into the main window, it is divided into rows, columns, pages, and any number of dimensions based upon the settings on this page. ');
					echo('You can add or remove symbols to be used to divide any dimension. The default is that commas separate columns and semicolons separate rows.</p></div>');
//					echo('<div class="settings_line"><div class="settings_text">Ignore text or warn</div><div class="settings_select"><select id="settings_parsetext"><option value="1">Remove Text</option><option value="2">Text Creates Errors</option></select></div></div>');
					echo('<div class="settings_line"><div class="settings_text">Columns</div><div class="settings_select"><input type="text" class="settings_parse" width="20px" value=","></div></div>');
					echo('<div class="settings_line"><div class="settings_text">Rows</div><div class="settings_select"><input type="text" class="settings_parse" width="20px" value=";"></div></div>');
					echo('<div class="settings_line"><div class="settings_text">Pages</div><div class="settings_select"><input type="text" class="settings_parse" width="20px" value="*"></div></div>');
					echo('<div class="settings_line"><div class="settings_text">Fourth Dimension</div><div class="settings_select"><input type="text" class="settings_parse" width="20px" value="$"></div></div>');
					echo('<div class="settings_line"><div class="settings_text">Fifth Dimension</div><div class="settings_select"><input type="text" class="settings_parse" width="20px" value="#"></div></div>');
				echo('</div>');

				echo('<div id="paste_wrapper">');
					echo('<div class="dataset_header">Paste raw data</div>');
					echo('<div class="datasets_text"><p>This page lets the user create a new dataset or add to the current dataset. Select the desired action by checking the appropriate radio button. ');
					echo('Then, paste the data into the text area and click the "Parse Data" button. You can see the current dataset on the "Results" page and see the details in the "info" page.</p></div>');
					echo('<div id="data_actionline">');
						echo('<div class="data_actionitem"><div class="data_actionlabel">Overwrite Dataset</div><input type="radio" class="data_actionradio" id="radio_overwrite" checked></div>');
						echo('<div class="data_actionitem"><div class="data_actionlabel">Add Row</div><input type="radio" class="data_actionradio" id="radio_addrow"></div>');
						echo('<div class="data_actionitem"><div class="data_actionlabel">Add Column</div><input type="radio" class="data_actionradio" id="radio_addcolumn"></div>');
					echo('</div>');
					echo('<div class="settings_line"><div id="parse_dataset">Parse Data</div></div>');
					echo('<div id="dataset_paste_holder"><textarea id="dataset_paste">Paste data here</textarea></div>');
				echo('</div>');

				echo('<div id="results_wrapper">');
					echo('<div class="dataset_header">Results of pasted data</div>');
					echo('<div class="datasets_text"><p>This page shows the results of parsing the data that was pasted into the appropriate window using the rules set in the settings window. If the data has more than two dimensions, it is not shown.</p></div>');
					echo('<div id="parse_results">'.$DatasetData['Dataset']['dataobj'].'</div>');
				echo('</div>');

				echo('<div id="info_wrapper">');
					echo('<div class="dataset_header">Dataset information</div>');
					echo('<div class="datasets_text"><p>This page lets the user enter a description for the dataset. This can be useful in a number of scenarios. First, the user can denote ');
					echo('certain test conditions that the data was collected under. Second, the user can simply record aspects of the data that they may not remember later. Finally, ');
					echo('one user can inform another of the aspects of the dataset.</p></div>');
					echo('<div class="settings_line"><div class="settings_text">Date Created</div><div class="settings_select">'.$FileData['Workspace']['created'].'</div></div>');
					echo('<div class="settings_line"><div class="settings_text">Date Last Modified</div><div class="settings_select">'.$FileData['Workspace']['modified'].'</div></div>');
					echo('<div class="settings_line"><div class="settings_text">Size of Data</div><div id="results_size"></div></div>');
					if (strlen($FileData['Workspace']['description'])>0) { 	echo('<div id="dataset_description_holder"><div id="dataset_description">'.$FileData['Workspace']['description'].'</div></div>');
					}else { 												echo('<div id="dataset_description_holder"><div id="dataset_description">Enter a description of text here</div></div>');	}
					echo('<div id="save_description">Save Description</div>');
				echo('</div>');
			}else
			{
				echo('<div id="workspace_bodywide"><div id="perm_message">You do not have permission to view this folder\'s contents.</div></div>');		
			}
		echo('</div>');
	echo('</div>');
echo('</div>');
