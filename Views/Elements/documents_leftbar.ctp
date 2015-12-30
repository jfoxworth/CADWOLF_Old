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
echo('<div id="leftcolumn">');																																//	\
	echo('<div id="CloseLeft">&nbsp</div>'); 																												//	\
	echo('<div id="logo">&nbsp</div>');																														//	\
	if ($loggedIn)																																			//	\
	{ 	$profileAddress=str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Profile Page';													//	\
		$workspaceAddress=str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Workspace';													//	\
		echo('<div id="login_wrapper">');																													//	\
			echo('<div id="login_dropwrapper"><div id="login_drop">'.$this->Session->read('Auth.User.username').'</div></div>');							//	\
			echo('<div id="dropbox">');																														//	\
				echo('<div id="droplogin_image"><img width="140px" src="'.$this->Session->read('Auth.User.image').'" /></div>');							//	\
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Profiles/'.$profileAddress.'</a></div>');									//	\
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Workspaces/'.$workspaceAddress.'</a></div>');								//	\
				echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/users/logout">Log Out</a></div>');										//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	} else 																																					//	\
	{	echo('<div id="login_wrapper"><div id="login_dropwrapper"><div id="login_anchor"><a href="http://www.cadwolf.com">Login</a></div></div></div>'); }	//	\
	if ($edit==1)	{ echo('<div id="SaveBlock">Save File</div>');	}																						//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/


	
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--------------------------------------------------------- SET UP THE VIEW BLOCK FOR ALL USERS----------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*	This section sets up the view list for all users																											\	
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	if ($Permissions['view']=='1')																															//	\
	{	echo('<div class="lc_block">');																														//	\
			echo('<div class="lc_description" id="show_block">View</div>');																					//	\
			echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');												//	\
			echo('<div class="lc_description_bottom">&nbsp</div>');																							//	\
			echo('<div class="newblock_block">');																											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_worksheet_current" >&nbsp</div></div>');								//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_toc" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_file" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_refs" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_inputs" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_datasets" >&nbsp</div></div>');										//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_numbers" >&nbsp</div></div>');										//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_constants" >&nbsp</div></div>');										//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_faf" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_functions" >&nbsp</div></div>');										//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_ifuns" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="show_bugs" >&nbsp</div></div>');											//	\
			echo('</div>');																																	//	\
			echo('<div id="view_text" class="description_label"></div>');																					//	\
		echo('</div>');																																		//	\
	}																																						//	\
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
	if (($edit)||($FileInfo['Workspace']['id']=="129"))																										//	\
	{	echo('<div class="lc_block" id="Insert_Block">');																									//	\
			echo('<div class="lc_description" id="add_block">Insert an Item</div>');																		//	\
			echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');												//	\
			echo('<div class="lc_description_bottom">&nbsp</div>');																							//	\
			echo('<div class="newblock_block">');																											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addtext" >&nbsp</div></div>');												//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addheader" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addline" >&nbsp</div></div>');												//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addequation" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addplot" >&nbsp</div></div>');												//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addtable" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addforloop" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addwhileloop" >&nbsp</div></div>');										//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addifelse" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addsymbolic" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addimage" >&nbsp</div></div>');											//	\
				echo('<div class="tool_blockwrapper"><div class="tool_block" id="addvideo" >&nbsp</div></div>');											//	\
			echo('</div>');																																	//	\
			echo('<div id="insert_text" class="description_label"></div>');																					//	\
		echo('</div>');																																		//	\
																																							//	\
		echo('<div class="lc_block" id="Move_Block">');																										//	\
			echo('<div class="lc_description" id="add_block">Move an Item</div>');																			//	\
			echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');												//	\
			echo('<div class="lc_description_bottom">&nbsp</div>');																							//	\
			echo('<div class="newblock_block">');																											//	\
				echo('<div class="tool_movewrapper"><div id="move_loc" ><input id="thislocation"></div></div>');											//	\
				echo('<div class="tool_movewrapper"><div class="tool_move" id="upone" >&nbsp</div></div>');													//	\
				echo('<div class="tool_movewrapper"><div class="tool_move" id="downone" >&nbsp</div></div>');												//	\
			echo('</div>');																																	//	\
			echo('<div id="insert_text" class="description_label"></div>');																					//	\
		echo('</div>');																																		//	\
																																							//	\
		echo('<div class="lc_block" id="Format_Block">');																									//	\
			echo('<div class="lc_description">Format</div>');																								//	\
			echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');												//	\
			echo('<div class="lc_description_bottom">&nbsp</div>');																							//	\
			echo('<div class="left_section formatborder" id="formatsection">');																				//	\
				echo('<div class="left_suboptions">');																										//	\
//					echo('<div class="left_line"><div class="left_item">Total Width :</div><div class="right_item"><input id="docwidth" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Item Width :</div><div class="right_item"><input id="width" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Top Margin :</div><div class="right_item"><input id="topmargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Bottom Margin :</div><div class="right_item"><input id="bottommargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Left Margin :</div><div class="right_item"><input id="leftmargin" class="left_format"></div><div class="left_px">px</div></div>');
					echo('<div class="left_line"><div class="left_item">Right Margin :</div><div class="right_item"><input id="rightmargin" class="left_format"></div><div class="left_px">px</div></div>');
				echo('</div>');																																//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	}																																						//	\
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	

echo('</div>');
?>