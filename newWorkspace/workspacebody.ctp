<?php
echo('<div id="username">'.$this->Session->read('Auth.User.username').'</div>'); 

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
				echo('<div class="leftNav" id="folders_current">&nbsp</div>');																				//	\
				if ($Permissions['view']=='1') { echo('<div class="leftNav" id="permissions">&nbsp</div>');		}											//	\
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
				echo('<div class="leftNavTextCurrent" id="foldersText">Files and Folders</div>');															//	\
				if ($Permissions['view']=='1') { echo('<div class="leftNavText" id="permissionsText">Permissions</div>'); }									//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
echo('</div>');																																				//	\
																																							//	\
echo('<div id="Format_Wrapper">');																															//	\
	echo('<div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div>');																//	\
echo('</div>');																																				//	\
																																							//	\
if ($Permissions['edit']=='1')																																//	\
{	echo('<div class="left_subcolumn" id="insertOptions">');																								//	\
		echo('<div class="left_subcolumnInnerShort leftMask">');																							//	\
			echo('<div class="lc_block" id="Insert_Block">');																								//	\
				echo('<div class="lc_description" id="add_block">Add an Item</div>');																		//	\
				echo('<div class="lc_description_left">&nbsp</div><div class="lc_description_right">&nbsp</div>');											//	\
				echo('<div class="lc_description_bottom">&nbsp</div>');																						//	\
				echo('<div class="newblock_block">');																										//	\
					echo('<div class="insertLine"><div class="insertImage" id="addfolder">&nbsp</div><div id="addfolderText" class="insertText">Folder</div></div>');		//	\
					echo('<div class="insertLine"><div class="insertImage" id="addfile">&nbsp</div><div id="addfileText" class="insertText">Document</div></div>');			//	\
					echo('<div class="insertLine"><div class="insertImage" id="addimage">&nbsp</div><div id="addimageText" class="insertText">Image</div></div>');			//	\
					echo('<div class="insertLine"><div class="insertImage" id="adddataset">&nbsp</div><div id="adddatasetText" class="insertText">Dataset</div></div>');	//	\
					echo('<div class="insertLine"><div class="insertImage" id="addparttree">&nbsp</div><div id="addparttreeText" class="insertText">Part Tree</div></div>');//	\
				echo('</div>');																																//	\
			echo('</div>');																																	//	\
		echo('</div>');																																		//	\
	echo('</div>');																																			//	\
}																																							//	\

echo('<div id="main_wrapper">');
	echo('<div id="content_wrapper">');

		echo('<div id="workspace_wrapper">');
			$url=str_replace("http://www.cadwolf.com/Workspaces/","",$myurl);
			$url=str_replace("www.cadwolf.com/Workspaces/","",$url);
			$test=explode("/",$url);
			if (count($test)==1){ $home=1; }else{ $home=0; }

				$fileprev=str_replace("/Workspaces/","/Documents/",Router::url(null, true));
				$fileprev=preg_replace('/\/$/','',$fileprev);
				$folderprev=preg_replace('/\/$/','',Router::url(null, true));
				echo('<div id="fileid" fileid="'.$DirInfo['ID'].'"></div>');
			if ($Permissions['view']=='1')
			{
				if ($Permissions['edit']=='1')
				{	echo('<input type="file" id="replaceImageUpload" name="replaceImageUpload" style="visibility: hidden;" />');
					echo('<div id="workspace_permissionTree">'.json_encode($permissionTree).'</div>');
					echo('<div id="workspace_fulldata">'.json_encode($MyFiles).'</div>');

					echo('<div id="workspace_bodywide">');
						echo('<div id="workspace_contentswide">');
							if ($FileInfo['Workspace']['title']=='') { echo('<div id="workspace_title_wrapper"><div id="workspace_title_edit">Click here to enter title</div></div>');
							}else { echo('<div id="workspace_title_wrapper"><div id="workspace_title_edit">'.$FileInfo['Workspace']['title'].'</div></div>'); }
							if ($FileInfo['Workspace']['description']=='') { echo('<div id="workspace_description_edit">Click here to enter description</div>');
							}else { echo('<div id="workspace_description_edit">'.$FileInfo['Workspace']['description'].'</div>'); }
							echo('<div id="workspace_description_save">Save Description</div>');
							echo('<div id="newblock_line"><div id="message_line"></div></div>');
		
							echo('<div id="image_uploader"><input type="file" id="image_to_upload"/></div>');
							echo('<div id="upfolderline"><div id="uponefolder"></div></div>');
							echo('<div id="orderbyline"><div id="orderbyholder">');
								echo('<select id="orderby">');
									echo('<option value="rank">User Rank</option>');
									echo('<option value="datecreated">Date Created</option>');
									echo('<option value="datesaved">Date Saved</option>');
									echo('<option value="type">Type</option>');
								echo('</select>');
							echo('</div></div>');
		
							echo('<div id="workspace_foldercontents">');
								echo('<div class="workspace_line">');
									echo('<div id="workspace_header1">&nbsp</div>');
									echo('<div id="workspace_header2">File Name</div>');
									echo('<div id="workspace_header7">Copy</div>');
									echo('<div id="workspace_header8">Move</div>');
									echo('<div id="workspace_header9">Delete</div>');
									echo('<div id="workspace_header10">Status</div>');
									echo('<div id="workspace_header11">Info</div>');
									echo('<div id="workspace_header3">Created</div>');
									echo('<div id="workspace_header4">Modified</div>');
								echo('</div>');
								foreach ($MyFiles as &$value) { 
								    $created= str_replace(' ','',str_replace(':','',str_replace('-','',$value['Workspace']['created'])));
								    $saved= str_replace(' ','',str_replace(':','',str_replace('-','',$value['Workspace']['modified'])));
									echo('<div class="workspace_wrapper" data-created="'.$created.'" data-saved="'.$saved.'" data-type="'.$value['Workspace']['File_or_Folder'].'" data-rank="'.$value['Workspace']['rank'].'" data-alpha="'.$value['Workspace']['name'].'">');
									    echo('<div class="workspace_line '.$value['Workspace']['id'].'">');
									    	if ($value['Workspace']['File_or_Folder']=="0") { echo('<div class="workspace_folder" address="'.$folderprev.'/'.str_replace(" ","_",$value['Workspace']['name']).'">&nbsp</div>'); 
									    	}elseif ($value['Workspace']['File_or_Folder']=="1") {	echo('<div class="workspace_file" fileid="'.$value['Workspace']['id'].'" address="'.$fileprev.'/'.str_replace(" ","_",$value['Workspace']['name']).'">&nbsp</div>'); 
									    	}elseif ($value['Workspace']['File_or_Folder']=="2") {	echo('<div class="workspace_image" fileid="'.$value['Workspace']['id'].'" type="'.$value['Workspace']['type'].'">&nbsp</div>'); 
									    	}elseif ($value['Workspace']['File_or_Folder']=="3") {	echo('<div class="workspace_dataset" fileid="'.$value['Workspace']['id'].'" address="'.str_replace("www.cadwolf.com/Documents/","www.cadwolf.com/Datasets/",$fileprev).'/'.preg_replace('/[ ]+/','_',$value['Workspace']['name']).'" type="'.$value['Workspace']['type'].'">&nbsp</div>'); 									    	
									    	}elseif ($value['Workspace']['File_or_Folder']=="4") {	echo('<div class="workspace_parttree" fileid="'.$value['Workspace']['id'].'" address="'.str_replace("www.cadwolf.com/Documents/","www.cadwolf.com/PartTree/",$fileprev).'/'.preg_replace('/[ ]+/','_',$value['Workspace']['name']).'" type="'.$value['Workspace']['type'].'">&nbsp</div>'); }									    	
									    	if (($value['Workspace']['File_or_Folder']=="0")||($value['Workspace']['File_or_Folder']=="2")||($value['Workspace']['File_or_Folder']=="3"))
									    	{	echo('<div class="workspace_filename" fileid="'.$value['Workspace']['id'].'"><div class="workspace_filenameblock">'.$value['Workspace']['name'].'</div></div>');
											}else
									    	{	if (($value['Workspace']['CheckedOut'])&&($userid==$value['Workspace']['checkoutID']))
									    		{		echo('<div class="workspace_filename" fileid="'.$value['Workspace']['id'].'"><div class="workspace_filenameblock">'.$value['Workspace']['name'].'</div></div>');
									    		}elseif ($value['Workspace']['File_or_Folder']=="4") 
									    		{	echo('<div class="workspace_filename" fileid="'.$value['Workspace']['id'].'"><div class="workspace_filenameblock">'.$value['Workspace']['name'].'</div></div>'); 
									    		}else {	echo('<div class="workspace_filename_dummy" fileid="'.$value['Workspace']['id'].'"><div class="workspace_filenameblock">'.$value['Workspace']['name'].'</div></div>'); }
											}
									    	echo('<div class="workspace_copy" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    	echo('<div class="workspace_move" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    	echo('<div class="workspace_delete" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    	if ($value['Workspace']['File_or_Folder']=="1") 
									    	{	if ($value['Workspace']['CheckedOut']) 
									    		{ 	if ($userid==$value['Workspace']['checkoutID'])
									    			{		echo('<div class="checkin_block" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    			}else{	echo('<div class="checkedout" fileid="'.$value['Workspace']['id'].'" user="'.$value['Workspace']['CheckedOut'].'">&nbsp</div>');	}
									    		}else { echo('<div class="workspace_checkout" fileid="'.$value['Workspace']['id'].'">&nbsp</div>'); }
									    	}elseif ($value['Workspace']['File_or_Folder']=="2")
									    	{	echo('<div class="replaceImage" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    	}else
									    	{  echo('<div class="checkin_space">&nbsp</div>');	
									    	}
									    	echo('<div class="workspace_showinfo">&nbsp</div>');
									    	echo('<div class="workspace_time">'.$this->Time->format('M jS, Y h:i A', $value['Workspace']['created'], null, $timezone).'</div>');
									    	echo('<div class="workspace_time">'.$this->Time->format('M jS, Y h:i A', $value['Workspace']['modified'], null, $timezone).'</div>');
									    	echo('<div class="workspace_rank"><select class="workspace_rankselect"></select></div>');
									    echo('</div>');
								    	if ($value['Workspace']['File_or_Folder']!="2")	{	echo('<div class="workspace_info">'.$value['Workspace']['description'].'</div>'); }
										if ($value['Workspace']['File_or_Folder']=="2")	{	echo('<div class="workspace_imagewrapper"><div class="workspace_imageview"></div></div>');} 
									echo('</div>');
								}
							echo('</div>');
						echo('</div>');
					echo('</div>');

					if ($Permissions['view']=='1')
					{	echo('<div id="workspace_permissions">');
							echo('<div class="workspace_title">Permission Tree</div>');
							echo('<div id="workspace_permDescription">This page shows the user what permissions are set for this folder, its parent folders, and the documents and subfolders ');
							echo('contained within it. If you have edit permissions, you change alter the permissions for that file or folder. Admin and edit permissions can be set to inherit ');
							echo('from its parent or to a specific list of people. Use and view permissions can be given to everyone, to a list of people, or to inherit that permission.</div>');
							echo('<div id="partPermissionsWrapper" class="mainBodyPart">');
								echo('<div id="partPermissionContent"></div>');
							echo('</div>');	
						echo('</div>');
					}
				echo('</div>');

				}else
				{

					echo('<div id="workspace_fulldata">'.json_encode($MyFiles).'</div>');
					echo('<div id="workspace_permissionTree">'.json_encode($permissionTree).'</div>');
					echo('<div id="workspace_body">');
					echo('<div id="workspace_inner">');
					if ($FileInfo['Workspace']['title']=='') { }else { echo('<div id="workspace_title">'.$FileInfo['Workspace']['title'].'</div>'); }
					echo('<div id="workspace_description">'.$FileInfo['Workspace']['description'].'</div>');
					echo('<div id="upfolderline"><div id="uponefolder"></div></div>');
					echo('<div id="orderbyline"><div id="orderbyholder">');
						echo('<select id="orderby">');
							echo('<option value="datecreated">Date Created</option>');
							echo('<option value="datesaved">Date Saved</option>');
							echo('<option value="type">Type</option>');
							echo('<option value="rank">User Rank</option>');
						echo('</select>');
					echo('</div></div>');
						
					echo('<div id="workspace_foldercontents">');
						$fileprev=str_replace("/Workspaces/","/Documents/",Router::url(null, true));
						$fileprev=preg_replace('/\/$/','',$fileprev);
						$folderprev=preg_replace('/\/$/','',Router::url(null, true));
			
							echo('<div class="workspace_line">');
								echo('<div id="workspace_header1">&nbsp</div>');
								echo('<div id="workspace_header2">File Name</div>');
								echo('<div id="workspace_header11">Info</div>');
								echo('<div id="workspace_header3">Created</div>');
								echo('<div id="workspace_header4">Modified</div>');
							echo('</div>');
							foreach ($MyFiles as &$value) { 
							    $created= str_replace(' ','',str_replace(':','',str_replace('-','',$value['Workspace']['created'])));
							    $saved= str_replace(' ','',str_replace(':','',str_replace('-','',$value['Workspace']['modified'])));
								echo('<div class="workspace_wrapper" data-created="'.$created.'" data-saved="'.$saved.'" data-type="'.$value['Workspace']['File_or_Folder'].'" data-rank="'.$value['Workspace']['rank'].'" data-alpha="'.$value['Workspace']['name'].'">');
								    echo('<div class="workspace_line">');
								    	if ($value['Workspace']['File_or_Folder']=="0") { 
								    		echo('<div class="workspace_folder" address="'.$folderprev.'/'.str_replace(" ","_",$value['Workspace']['name']).'">&nbsp</div>'); 
								    	}elseif ($value['Workspace']['File_or_Folder']=="1")
								    	{	echo('<div class="workspace_file" fileid="'.$value['Workspace']['id'].'" address="'.$fileprev.'/'.str_replace(" ","_",$value['Workspace']['name']).'">&nbsp</div>');
								    	}elseif ($value['Workspace']['File_or_Folder']=="2")
								    	{	echo('<div class="workspace_image" fileid="'.$value['Workspace']['id'].'">&nbsp</div>');
									    }elseif ($value['Workspace']['File_or_Folder']=="3") 
									    {	echo('<div class="workspace_dataset" fileid="'.$value['Workspace']['id'].'" address="'.str_replace("www.cadwolf.com/Documents/","www.cadwolf.com/Datasets/",$fileprev).'/'.preg_replace('/[ ]+/','_',$value['Workspace']['name']).'" type="'.$value['Workspace']['type'].'">&nbsp</div>'); 									    	
									    }elseif ($value['Workspace']['File_or_Folder']=="4") 
									    {	echo('<div class="workspace_parttree" fileid="'.$value['Workspace']['id'].'" address="'.str_replace("www.cadwolf.com/Documents/","www.cadwolf.com/PartTree/",$fileprev).'/'.preg_replace('/[ ]+/','_',$value['Workspace']['name']).'" type="'.$value['Workspace']['type'].'">&nbsp</div>'); 	}								    	
								    	
								    	echo('<div class="workspace_filename_dummy" fileid="'.$value['Workspace']['id'].'"><div class="workspace_filenameblock">'.$value['Workspace']['name'].'</div></div>');
								    	echo('<div class="workspace_showinfo">&nbsp</div>');
								    	echo('<div class="workspace_time">'.$this->Time->format('M jS, Y h:i A', $value['Workspace']['created'], null, $timezone).'</div>');
								    	echo('<div class="workspace_time">'.$this->Time->format('M jS, Y h:i A', $value['Workspace']['modified'], null, $timezone).'</div>');
								    echo('</div>');
							    	if ($value['Workspace']['File_or_Folder']!="2")	{	echo('<div class="workspace_info">'.$value['Workspace']['description'].'</div>');	}
									if ($value['Workspace']['File_or_Folder']=="2")	{	echo('<div class="workspace_imagewrapper"><div class="workspace_imageview"></div></div>');} 
							    echo('</div>');
							}
						echo('</div>'); 
						echo('</div>'); 
					echo('</div>');

			
					echo('<div id="workspace_permissions">');
						echo('<div class="workspace_title">Permission Tree</div>');
						echo('<div id="workspace_permDescription">This page shows the user what permissions are set for this folder, its parent folders, and the documents and subfolders ');
						echo('contained within it. If you have edit permissions, you change alter the permissions for that file or folder. Admin and edit permissions can be set to inherit ');
						echo('from its parent or to a specific list of people. Use and view permissions can be given to everyone, to a list of people, or to inherit that permission.</div>');
						echo('<div id="partPermissionsWrapper" class="mainBodyPart">');
							echo('<div id="partPermissionContent"></div>');
						echo('</div>');	
					echo('</div>');	
				}
			}else
			{
				echo('<div id="workspace_bodywide"><div id="perm_message">You do not have permission to view this folder\'s contents.</div></div>');		
			}
		echo('<div id="imagedisplay_holder"><div id="imagedisplay_closeholder"><div id="imagedisplay_close">&nbsp</div></div><div id="imagedisplay"></div></div>');
		echo('</div>');
?>
<div id="deleteItem-confirm" title="Delete this Item?">
  <p>This will permanently delete this item from this workspace. Are you sure?</p>
</div>