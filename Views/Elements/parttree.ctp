<?php
echo('<div id="GoodMessageWrapper"><div id="goodmessage"></div></div>');
echo('<div id="BadMessageWrapper"><div id="badmessage"></div></div>');

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
				echo('<div class="leftNav" id="viewStructure_current">&nbsp</div>');																		//	\
				echo('<div class="leftNav" id="viewList">&nbsp</div>');																						//	\
				echo('<div class="leftNav" id="viewPermissions">&nbsp</div>');																				//	\
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
				echo('<div class="leftNavTextCurrent" id="viewStructureText">Tree Structure</div>');														//	\
				echo('<div class="leftNavText" id="viewListText">Part Tree</div>');																			//	\
				echo('<div class="leftNavText" id="viewPermissionsText">Permissions</div>');																//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\

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

				if ($Permissions['edit']==1)	{ echo('<div id="SaveBlock">Save Tree</div>');	}
	
				echo('<div class="lc_description">View</div>');
				echo('<div class="lc_description_left">&nbsp</div><div class="description_right">&nbsp</div>');
				echo('<div class="lc_description_bottom">&nbsp</div>');
				echo('<div class="newblock_block">');
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="viewStructure" >&nbsp</div></div>');
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="viewList" >&nbsp</div></div>');
					echo('<div class="tool_blockwrapper"><div class="tool_block" id="viewPermissions" >&nbsp</div></div>');
				echo('</div>');
				echo('<div class="description_label" id="viewText"></div>');

			echo('</div>');
		echo('</div>');

*/
		if ($Permissions['view']=='1')
		{	echo('<div id="partStructureWrapper" class="mainBodyPart">');
				echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');
				echo('<div id="partStructureBody">');
					echo('<div class="partTreeTitle">Structure of the Part Numbering System</div>');
					echo('<div id="partTreeSetup"><p>This page describes the setup of this part numbering system. A user with permission to edit the tree can add or delete ');
					echo('blocks from the tree and establish the parameters for the blocks. A "smart" part numbering system will have blocks that represent various systems and ');
					echo('subsystems. A simple system will have only one block which increments a unique number for each item.</p>');
					echo('<p>The list view lets users add systems, subsystems, and components to the tree. When those systems and components are added, they follow the rules set ');
					echo('forth on this page.</p></div>');
					echo('<div id="partStructureContent">');
						echo('<div class="partTreeTitle2">Description of Part Tree</div>');
						echo('<div id="partTreeDescription"></div>');
						echo('<div class="partTreeTitle2">Part Tree Setup</div>');
					echo('</div>');
					echo('<div id="partTreeSection">');
						echo('<div id="partTreeList"></div>');
						echo('<div id="partTreeInfo">');
							echo('<div class="partTreeSubTitle">Name</div>');
							echo('<div id="partTreeName"></div>');
							echo('<div class="partTreeSubTitle">Description</div>');
							echo('<div id="partTreeComponentDescription"></div>');
//							echo('<div class="partTreeSubTitle">Option Type</div>');
//							echo('<div id="partTreeType"></div>'); 
							echo('<div class="partTreeSubTitle">Option List</div>');
							echo('<div id="partTreeAddLine"><div id="partTreeAdd"></div><div id="partTreeAddText">Add a new list option</div></div>'); 
							echo('<div id="partTreeListBlock"></div>'); 
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
			echo('<div id="partTreeData">'.$FileInfo['Workspace']['partTree'].'</div>');
		}else
		{
			echo('<div id="workspace_bodywide"><div id="perm_message">You do not have permission to view this part tree</div></div>');		
		}



		if ($Permissions['view']=='1')
		{	echo('<div id="partListWrapper" class="mainBodyPart">');
				echo('<div id="partListBody">');
					echo('<div class="partTreeTitle">Parts Included in Tree List</div>');
					echo('<div id="partListTitleLine"><div id="partListTitleLeft">Part Tree</div><div id="partListTitleRight">Property</div></div>');
					echo('<div id="partListPropertyLine"><input placeholder="Enter Value Here" id="partListProperty"></div>');
					echo('<div id="partListContent"><div id="partListRotator"></div></div>');
				echo('</div>');
			echo('</div>');
		}else
		{
			echo('<div id="workspace_bodywide"><div id="perm_message">You do not have permission to view the part tree.</div></div>');		
		}



		if ($Permissions['view']=='1')
		{	
			echo('<div id="partPermissionsWrapper" class="mainBodyPart">');
				echo('<div id="partPermissionBody">');
					echo('<div class="partTreeTitle">Permission Tree</div>');
					echo('<div id="permKeyBlock">');
						echo('<div class="permKeyLine"><div class="permKeyLineText">Permission given to everyone</div><div class="permKeyLinePerm1"></div></div>');
						echo('<div class="permKeyLine"><div class="permKeyLineText">Permission from list</div><div class="permKeyLinePerm2"></div></div>');
						echo('<div class="permKeyLine"><div class="permKeyLineText">Permission from inheritance</div><div class="permKeyLinePerm3"></div></div>');
						echo('<div class="permKeyLine"><div class="permKeyLineText">Permission denied</div><div class="permKeyLinePerm4"></div></div>');
					echo('</div>');
					echo('<div id="partPermissionContent"></div>');
				echo('</div>');
			echo('</div>');
		}else
		{
			echo('<div id="workspace_bodywide"><div id="perm_message">You do not have permission to view the part tree.</div></div>');		
		}



	echo('</div>');
echo('</div>');

?>
<div id="deleteSystem-confirm" title="Delete this system?">
  <p>This will delete the system and all subsequent systems and components. Are you sure?</p>
</div>
<div id="deletePart-confirm" title="Delete this component?">
  <p>This will delete the part from the system. Are you sure?</p>
</div>