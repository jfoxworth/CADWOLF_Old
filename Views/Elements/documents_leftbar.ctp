<?php

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------- SET THE PERMISSION LEVEL FOR THIS USER AND THIS DOCUMENT --------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This section looks at the permissions the user has and whether or not it is checked out by this user. If this user has checked out the document then the 	\
	edit items are shown. If the user has not checked out the document or does not have permission, then the view items are shown.								\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (($Permissions['edit'])&&($DirInfo['checkedout']==$UserName)) 										{	$edit=1;										//	\
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']!=$UserName)&&($DirInfo['checkedout']!=NULL)) 	{	$edit=0;										//	\
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']==NULL)) 										{ 	$edit=0;										//	\
}else																									{ 	$edit=0; 	}									//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------- MASTHEAD ------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	Set up the left column, the logo, and the login or user display name.																						\
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
				echo('<div class="leftNav" id="show_worksheet_current">&nbsp</div>');																		//	\
				echo('<div class="leftNav" id="show_toc">&nbsp</div>');																						//	\
				echo('<div class="leftNav" id="show_file">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="show_refs">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="show_inputs">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="show_datasets">&nbsp</div>');																				//	\
				echo('<div class="leftNav" id="show_numbers">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="show_constants">&nbsp</div>');																				//	\
				echo('<div class="leftNav" id="show_faf">&nbsp</div>');																						//	\
				echo('<div class="leftNav" id="show_functions">&nbsp</div>');																				//	\
				echo('<div class="leftNav" id="show_ifuns">&nbsp</div>');																					//	\
				echo('<div class="leftNav" id="show_bugs">&nbsp</div>');																					//	\
				if ($edit==1)	{ echo('<div id="saveFile">&nbsp</div>'); }																					//	\
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
				echo('<div class="leftNavTextCurrent" id="show_worksheetText">Worksheet</div>');															//	\
				echo('<div class="leftNavText" id="show_tocText">Table of Contents</div>');																	//	\
				echo('<div class="leftNavText" id="show_fileText">File Properties</div>');																	//	\
				echo('<div class="leftNavText" id="show_refsText">Bibliography</div>');																		//	\
				echo('<div class="leftNavText" id="show_inputsText">Inputs</div>');																			//	\
				echo('<div class="leftNavText" id="show_datasetsText">Datasets</div>');																		//	\
				echo('<div class="leftNavText" id="show_numbersText">Unit Conversion</div>');																//	\
				echo('<div class="leftNavText" id="show_constantsText">Constants</div>');																	//	\
				echo('<div class="leftNavText" id="show_fafText">File as a Function</div>');																//	\
				echo('<div class="leftNavText" id="show_functionsText">Defined Functions</div>');															//	\
				echo('<div class="leftNavText" id="show_ifunsText">Imported Functions</div>');																//	\
				echo('<div class="leftNavText" id="show_bugsText">Report a Bug</div>');																		//	\
				if ($edit==1)	{ echo('<div id="saveFileText">Save File</div>'); }																			//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------- WHAT TO SHOW FOR USERS WITH EDIT PERMISSIONS -----------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This section shows the options that are available for a user with edit permissions. These options include three main blocks. The first block is a series	\
	of options to add new items to the document. The second block gives the users the option to move an item up or down or to another location.	The third 		\
	lets a user format an item in terms of changing the margins around it or its width.																			\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
if (($edit)||($FileInfo['Workspace']['id']=="129"))																											//	\
{	echo('<div class="left_subcolumn" id="insertOptions">');																								//	\
		echo('<div class="left_subcolumnInner leftMask">');																									//	\
			echo('<div class="lc_block" id="Insert_Block">');																								//	\
				echo('<div class="lc_description" id="add_block">Insert an Item</div>');																	//	\
				echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');											//	\
				echo('<div class="lc_description_bottom">&nbsp</div>');																						//	\
				echo('<div class="newblock_block">');																										//	\
					echo('<div class="insertLine"><div class="insertImage" id="addtext">&nbsp</div><div id="addtextText" class="insertText">Text</div></div>');					//	\
					echo('<div class="insertLine"><div class="insertImage" id="addheader">&nbsp</div><div id="addheaderText" class="insertText">Header</div></div>');			//	\
					echo('<div class="insertLine"><div class="insertImage" id="addline">&nbsp</div><div id="addlineText" class="insertText">Break Line</div></div>');			//	\
					echo('<div class="insertLine"><div class="insertImage" id="addequation">&nbsp</div><div id="addequationText" class="insertText">Equation</div></div>');		//	\
					echo('<div class="insertLine"><div class="insertImage" id="addplot">&nbsp</div><div id="addplotText" class="insertText">Chart</div></div>');				//	\
					echo('<div class="insertLine"><div class="insertImage" id="addtable">&nbsp</div><div id="addtableText" class="insertText">Table</div></div>');				//	\
					echo('<div class="insertLine"><div class="insertImage" id="addforloop">&nbsp</div><div id="addforloopText" class="insertText">For Loop</div></div>');		//	\
					echo('<div class="insertLine"><div class="insertImage" id="addwhileloop">&nbsp</div><div id="addwhileloopText" class="insertText">While Loop</div></div>');	//	\
					echo('<div class="insertLine"><div class="insertImage" id="addifelse">&nbsp</div><div id="addifelseText" class="insertText">If / Else</div></div>');		//	\
					echo('<div class="insertLine"><div class="insertImage" id="addsymbolic">&nbsp</div><div id="addsymbolicText" class="insertText">Symbolic</div></div>');		//	\
					echo('<div class="insertLine"><div class="insertImage" id="addimage">&nbsp</div><div id="addimageText" class="insertText">Image</div></div>');				//	\
					echo('<div class="insertLine"><div class="insertImage" id="addvideo">&nbsp</div><div id="addvideoText" class="insertText">Video</div></div>');				//	\
				echo('</div>');																																//	\
			echo('</div>');																																	//	\
																																							//	\
			echo('<div class="lc_block" id="Move_Block">');																									//	\
				echo('<div class="lc_description" id="add_block">Move an Item</div>');																		//	\
				echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');											//	\
				echo('<div class="lc_description_bottom">&nbsp</div>');																						//	\
				echo('<div class="newblock_block">');																										//	\
					echo('<div class="tool_movewrapper"><div id="move_loc" ><input id="thislocation"></div></div>');										//	\
					echo('<div class="tool_movewrapper"><div class="tool_move" id="upone" >&nbsp</div></div>');												//	\
					echo('<div class="tool_movewrapper"><div class="tool_move" id="downone" >&nbsp</div></div>');											//	\
				echo('</div>');																																//	\
			echo('</div>');																																	//	\
																																							//	\
			echo('<div class="lc_block" id="Format_Block">');																								//	\
				echo('<div class="lc_description">Width / Margin</div>');																					//	\
				echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');											//	\
				echo('<div class="lc_description_bottom">&nbsp</div>');																						//	\
				echo('<div class="left_section formatborder" id="formatsection">');																			//	\
					echo('<div class="left_suboptions">');																									//	\
					echo('<div class="left_line"><div class="left_item">Width :</div><div class="right_item"><input id="width" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Top :</div><div class="right_item"><input id="topmargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Bottom :</div><div class="right_item"><input id="bottommargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Left :</div><div class="right_item"><input id="leftmargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Right :</div><div class="right_item"><input id="rightmargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('</div>');																															//	\
				echo('</div>');																																//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
}																																							//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	

?>