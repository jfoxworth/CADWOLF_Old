<?php
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*
This is the main code that outputs the bulk of the data for the main worksheet page. It outputs the scaled units, parsed units, inputs to the file, and 
relationships between equations and between equations and plots. After the page is loaded, those items are then read into the window javascript memory
and used as variables.

The code then outputs every item for the main page randing from text to equations, tables, and loops. It also outputs the properties for each item within
the DOM. This info is read into memory on page load and deleted.
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
echo('<div id="GoodMessageWrapper"><div id="goodmessage"></div></div>');
echo('<div id="BadMessageWrapper"><div id="badmessage"></div></div>');
$width="845";
if (array_key_exists('0', $FileData)) { if (array_key_exists('mainwidth',$FileData['0']['Document'])) { $width=$FileData['0']['Document']['mainwidth']; }}
echo('<div id="MainBody" class="bodymain" style="width: '.$width.'px;">');

	echo('<div id="filenumber" username="'.$UserName.'" filenumber="'.$DirInfo['ID'].'"></div>');
	echo('<div id="currentitem" itemid="top"></div>');
	echo('<div id="clicktotopenter" class="top_item notcurrent">&nbsp</div>');

	echo('<div class="titleblock">'.$FileInfo['Workspace']['title'].'</div>');  
	echo('<div class="subtitleblock">'.$FileInfo['Workspace']['subtitle'].'</div>'); 

	if ($Permissions['view']=='1')
	{
		if ($FileInfo['Workspace']['TOC']=="0")
		{
			foreach ($FileData as $index=>$value) 
			{ 
				if ($value['Document']['vartype']=="1") 
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="deletebutton"></div><div class="text_specs"></div></div>'); }
							echo('<div id="'.$value['Document']['itemid'].'" class="text_block">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							echo('<div id="'.$value['Document']['itemid'].'" class="text_block">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}		
				}elseif ($value['Document']['vartype']=="2") 
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="deletebutton"></div><div class="headerbutton"></div></div>'); }
							echo('<div id="'.$value['Document']['itemid'].'" class="header_block"><div class="header_text">'.$value['Document']['data'].'</div></div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							echo('<div id="'.$value['Document']['itemid'].'" class="header_block"><div class="header_text">'.$value['Document']['data'].'</div></div>');
						echo('</div>');
					}		
				}elseif ($value['Document']['vartype']=="3")
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="equationspecs"></div>');
								if ($Permissions['edit']=='1') {  echo('<div class="sublineshow"></div>'); }
						echo('</div>');
							echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
								echo('<div class="eqshow input_valid">$$$$</div>');
								echo('<div class="eqparam_cont"><input type="text" class="eqparam" value="" /></div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
								echo('<div class="eqshow input_valid">$$$$</div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}					
				}elseif ($value['Document']['vartype']=="4")
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="deletebutton"></div><div class="symeq_specs"></div></div>'); }
							echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
								echo('<div class="symeqshow input_valid"></div>');
								echo('<div class="symeqparam_cont"><input type="text" class="symeqparam" value=""/></div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');				
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
								echo('<div class="symeqshow input_valid"></div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');				
					}				
				}elseif ($value['Document']['vartype']=="5")
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="deletebutton"></div><div class="tablespecs"></div></div>'); }
							echo('<div class="filler_holder">');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_up"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_left"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_right"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_down"></div>');
								echo('<div class="filler_void"></div>');
							echo('</div>');
							echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
								echo($value['Document']['data']);
							echo('</div>');
//							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');	
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
								echo($value['Document']['data']);
							echo('</div>');
//							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');							
					}
				}elseif ($value['Document']['vartype']=="6")
				{
					if ($Permissions['use']=='1')
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="sublineshow"></div>'); }
								if ($Permissions['edit']=='1') { echo('<div class="updateforloop"></div>'); }
							echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');
						
					}
						echo('<div class="forloop" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'" counter="a">');
							echo('<div class="forlooptext">');
								echo('<div class="forloopstarttext">');
									echo('<div class="forloopfor">for</div>');
									echo('<div class="forlooplabel">a</div>');
									echo('<div class="forloopequal">=</div>');
									echo('<div class="forloopstart">');
										echo('<div class="forloopvaluewrapper" type="start"><div class="forloopvalue"></div></div>');
									echo('</div>');
								echo('</div>');
								echo('<div class="forloopwhiletext">');
									echo('<div class="forloopwhile">While</div>');
									echo('<div class="forlooplabel">a</div>');
									echo('<div class="forloopequal">');
										echo('<div class="forloopwhilevalue"></div>');
									echo('</div>');
									echo('<div class="forloopend">');
										echo('<div class="forloopvaluewrapper" type="end"><div class="forloopvalue"></div></div>');
									echo('</div>');
								echo('</div>');
								echo('<div class="forloopinctext">');
									echo('<div class="forloopinc">Increment by</div>');
									echo('<div class="forloopincrease">');
										echo('<div class="forloopvaluewrapper" type="inc"><div class="forloopvalue"></div></div>');
									echo('</div>');
								echo('</div>');
							echo('</div>');
							echo('<div class="forloopcontent itemcurrent">');
							echo('</div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
			
				}elseif ($value['Document']['vartype']=="7")
				{		
					if ($Permissions['use']=='1')
					{
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="7" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="sublineshow"></div>'); }
								if ($Permissions['edit']=='1') { echo('<div class="updatewhileloop"></div>'); }
							echo('</div>');
					}else
					{
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');						
					}
						echo('<div class="whileloop" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'">');
							echo('<div class="whilelooptext">');
								echo('<div class="loopwhile">While</div>');
								echo('<div class="whileloopblock">');
									echo('<div class="whileloopstatements"><div class="deleteblock"></div>');
										echo('<div class="whileloopflag">');
											echo('<div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">flag</div></div>');
										echo('</div>');
									echo('</div>');
									echo('<div class="whileloopcondition">');
										echo('<div class="whileloopconditionvalue">==</div>');
										echo('<select class="whileloopconditionselect"><option value="equal">==</option><option value="notequal">!=</option><option value="less"><</option><option value="lessequal"><=</option><option value="greater">></option><option value="greaterequal">>=</option></select>');
									echo('</div>');
									echo('<div class="whileloopdependent">');
										echo('<div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">1</div></div>');
									echo('</div>');
								echo('</div>');
								echo('<div class="whileloopaddstatements">+</div>');
							echo('</div>');
	//						echo('<div class="whileloopaddblock">+</div>');
						echo('</div>');
						echo('<div class="whileloopcontent">');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
			
				}elseif ($value['Document']['vartype']=="8")
				{
					if ($Permissions['use']=='1')
					{
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="sublineshow"></div>'); }
								if ($Permissions['edit']=='1') { echo('<div class="updateifelse"></div>'); }
							echo('</div>');
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');						
					}
						echo('<div class="ifelse" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'">');
							echo('<div class="ifelsetext">');
								echo('<div class="ifelseif">If</div>');
								echo('<div class="ifelseblock">');
									echo('<div class="ifelsestatements" flag="flag" depedent="1" condition="=="><div class="deleteblock"></div>');
										echo('<div class="ifelseflag">');
											echo('<div class="ifelsevaluewrapper" type="flag"><div class="ifelsevalue">flag</div></div>');
										echo('</div>');
										echo('<div class="ifelsecondition">');
											echo('<div class="ifelseconditionvalue">==</div>');
											echo('<select class="ifelseconditionselect"><option value="equal">==</option><option value="notequal">!=</option><option value="less"><</option><option value="lessequal"><=</option><option value="greater">></option><option value="greaterequal">>=</option></select>');
										echo('</div>');
										echo('<div class="ifelsedependent">');
											echo('<div class="ifelsevaluewrapper" type="dependent"><div class="ifelsevalue">1</div></div>');
										echo('</div>');
									echo('</div>');
									echo('<div class="ifelseaddstatements">+</div>');
								echo('</div>');
								echo('<div class="ifelseaddblock">+</div>');
							echo('</div>');
							echo('<div class="ifelsecontent "></div>');
							echo('<div class="ifelseaddline"><div class="ifelseaddif">Else If</div></div><div class="ifelseaddline"><div class="ifelseaddelse">Else</div></div><div class="ifelseaddline"><div class="ifelsedelete">Delete</div></div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');				
			
				
				}elseif ($value['Document']['vartype']=="9")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="expandbutton"></div>');
							echo('</div>');
							echo('<div class="plot_block" id="'.$value['Document']['itemid'].'" parent="none">');
								echo('<div class="plot_holder">');
								echo('</div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');				
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								echo('<div class="expandbutton"></div>');
							echo('</div>');
							echo('<div class="plot_block" id="'.$value['Document']['itemid'].'" parent="none">');
								echo('<div class="plot_holder">');
								echo('</div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');				
					}
	
				}elseif ($value['Document']['vartype']=="10")
				{
					if ($Permissions['use']=='1')
					{	
						$image=json_decode($value['Document']['data'], true);
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="10" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="imagespecs"></div>');
							echo('</div>');
							if ($Permissions['edit']=='1') { 	echo('<div class="image" id="'.$value['Document']['itemid'].'" src="'.$image['src'].'" type="'.$image['type'].'">');
							}else{								echo('<div class="image" id="'.$value['Document']['itemid'].'" src="" type="">'); }
								if ($image['type']=="image/jpg")  { $type="jpg"; }
								if ($image['type']=="image/jpeg") { $type="jpeg"; }
								if ($image['type']=="image/bmp")  { $type="bmp"; }
								if ($image['type']=="image/png")  { $type="png"; }
								if ($image['type']=="image/gif")  { $type="gif"; }
								echo('<img src="/UserImages/'.$image['src'].'.'.$type.'" width="'.$image['width'].'" height="'.$image['height'].'"/>');
		
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');				
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="10" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								echo('<div class="imagespecs"></div>');
							echo('</div>');
							echo('<div class="image" id="'.$value['Document']['itemid'].'" src="" type="">');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');				
					}
				}elseif ($value['Document']['vartype']=="11")
				{
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="11" location="'.$value['Document']['location'].'" style="width: 100%; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
							echo('</div>');
							echo('<div class="linebreak_block" id="'.$value['Document']['itemid'].'">');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');				
				}elseif ($value['Document']['vartype']=="12")
				{
						$videodata=json_decode($value['Document']['data']);
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="12" location="'.$value['Document']['location'].'" style="width: 100%; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="videoicon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="videospecs"></div>');
							echo('</div>');
							echo('<div class="video_block" id="'.$value['Document']['itemid'].'">');
								echo('<div width="'.$videodata->{'videoWidth'}.'" height="'.$videodata->{'videoHeight'}.'">');
									echo('<img class="youtube-thumb" src="//i.ytimg.com/vi/'.$videodata->{'videoID'}.'/hqdefault.jpg" width="'.$videodata->{'videoWidth'}.'" height="'.$videodata->{'videoHeight'}.'">');
								echo('</div>');
							echo('</div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');				
    			}
			}
		}else
		{
			foreach ($MainData as $index=>$value) 
			{ 
				if ($value['Document']['vartype']=="1") 
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder"><div class="deletebutton"></div></div>'); }
							echo('<div id="'.$value['Document']['itemid'].'" class="text_block"></div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							echo('<div id="'.$value['Document']['itemid'].'" class="text_block"></div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}		
				}elseif ($value['Document']['vartype']=="2") 
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							echo('<div class="icon_holder">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>');	echo('<div class="headerbutton"></div>'); }
							echo('</div>');
							echo('<div id="'.$value['Document']['itemid'].'" class="header_block"></div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
							echo('<div class="icon_holder">');
							echo('</div>');
							echo('<div id="'.$value['Document']['itemid'].'" class="header_block"></div>');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					}		
				}elseif ($value['Document']['vartype']=="3")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="equationspecs"></div>');
							echo('</div>');
							echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'" parent="'.$value['Document']['parentid'].'">');
								echo('<div class="eqshow input_valid"></div>');
								echo('<div class="eqparam_cont"><input type="text" class="eqparam" value="" /></div>');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="equationspecs"></div>');
							echo('</div>');
							echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'" parent="'.$value['Document']['parentid'].'">');
								echo('<div class="eqshow input_valid"></div>');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');
					}			
				}elseif ($value['Document']['vartype']=="4")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder"><div class="deletebutton"></div><div class="symeq_specs"></div></div>'); }
							echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
								echo('<div class="symeqshow input_valid"></div>');
								echo('<div class="symeqparam_cont"><input type="text" class="symeqparam" value=""/></div>');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
								echo('<div class="symeqshow input_valid"></div>');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');
					}				
				
				}elseif ($value['Document']['vartype']=="5")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							if ($Permissions['edit']=='1') { echo('<div class="icon_holder"><div class="deletebutton"></div><div class="tablespecs"></div></div>'); }
							echo('<div class="filler_holder">');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_up"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_left"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_right"></div>');
								echo('<div class="filler_void"></div>');
								echo('<div class="filler_down"></div>');
								echo('<div class="filler_void"></div>');
							echo('</div>');
							echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
//								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
								echo($value['Document']['data']);
							echo('</div>');
						echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
//								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
								echo($value['Document']['data']);
							echo('</div>');
						echo('</div>');
					}				
				}elseif ($value['Document']['vartype']=="6")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="updateforloop"></div>'); }
							echo('</div>');
					}else
					{
						echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');
					}
						echo('<div class="forloop" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'" counter="a">');
							echo('<div class="forlooptext">');
								echo('<div class="forloopfor">for</div>');
								echo('<div class="forlooplabel">a</div>');
								echo('<div class="forloopequal">=</div>');
								echo('<div class="forloopstart">');
									echo('<div class="forloopstartvalue"></div>');
									echo('<select id="'.$value['Document']['itemid'].'startselect" class="forloopstartselect"><option></option></select><input type="text" class="forloopstartinput" value="">');
								echo('</div>');
								echo('<div class="separator">|</div>');
								echo('<div class="forloopwhile">While</div>');
								echo('<div class="forlooplabel">a</div>');
								echo('<div class="forloopequal">');
									echo('<div class="forloopwhilevalue"></div>');
								echo('</div>');
								echo('<div class="forloopend">');
									echo('<div class="forloopendvalue"></div>');
									echo('<select class="forloopendselect" id="'.$value['Document']['itemid'].'whileselect"><option></option></select><input type="text" class="forloopendinput" value="">');
								echo('</div>');
								echo('<div class="separator">|</div>');
								echo('<div class="forloopinc">Increment by</div>');
								echo('<div class="forloopincrease">');
									echo('<div class="forloopincvalue"></div>');
									echo('<select class="forloopincselect" id="'.$value['Document']['itemid'].'endselect"><option></option></select><input type="text" class="forloopincinput" value="">');						
								echo('</div>');
								echo('<div class="sublineshow"></div>');
							echo('</div>');
							echo('<div class="forloopcontent itemcurrent">');
							echo('</div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
			
				}elseif ($value['Document']['vartype']=="7")
				{		
					if ($Permissions['use']=='1')
					{	
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="7" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="updatewhileloop"></div>'); }
							echo('</div>');
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="7" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');
					}
						echo('<div class="whileloop" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'">');
							echo('<div class="whilelooptext">');
								echo('<div class="loopwhile">While</div>');
								echo('<div class="whileloopflag">');
									echo('<div class="whileloopflagvalue">flag</div>');
									echo('<select class="whileloopflagselect" id="whileflag"><option value="flag">flag</option></select><input type="text" class="whileloopflaginput">');
								echo('</div>');
								echo('<div class="whileloopcondition">');
									echo('<div class="whileloopconditionvalue">==</div>');
									echo('<select class="whileloopconditionselect"><option value="equal">==</option><option value="notequal">!=</option><option value="less"><</option><option value="lessequal"><=</option><option value="greater">></option><option value="greaterequal">>=</option></select>');
								echo('</div>');
								echo('<div class="whileloopdependent">');
									echo('<div class="whileloopdependentvalue">1</div>');
									echo('<select class="whileloopdependentselect" id="whiledependent"><option></option></select><input type="text" class="whileloopdependentinput">');
								echo('</div>');
								echo('<div class="sublineshow"></div>');
							echo('</div>');
							echo('<div class="whileloopcontent  itemcurrent">');
							echo('</div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
			
				}elseif ($value['Document']['vartype']=="8")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="loopspecs"></div>');
								if ($Permissions['edit']=='1') { echo('<div class="updateifelse"></div>'); }
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
							echo('</div>');
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="loopspecs"></div>');
							echo('</div>');
					}
						echo('<div class="ifelse" id="'.$value['Document']['itemid'].'" parent="'.$value['Document']['parentid'].'">');
							echo('<div class="ifelsetext">');
								echo('<div class="ifelseif">If</div>');
									echo('<div class="ifelsestatements">');
										echo('<div class="ifelseflag">');
											echo('<div class="ifelseflagvalue">flag</div>');
											echo('<select class="ifelseflagselect" id="ifelseflag"><option value="flag">flag</option></select><input type="text" class="ifelseflaginput">');
										echo('</div>');
										echo('<div class="ifelsecondition">');
											echo('<div class="ifelseconditionvalue">==</div>');
											echo('<select class="ifelseconditionselect"><option value="equal">==</option><option value="notequal">!=</option><option value="less"><</option><option value="lessequal"><=</option><option value="greater">></option><option value="greaterequal">>=</option></select>');
										echo('</div>');
										echo('<div class="ifelsedependent">');
											echo('<div class="ifelsedependentvalue">1</div>');
											echo('<select class="ifelsedependentselect" id="ifelsedependent"><option></option></select><input type="text" class="ifelsedependentinput">');
										echo('</div>');
									echo('</div>');
								echo('<div class="sublineshow"></div>');
							echo('</div>');
							echo('<div class="ifelsecontent">');
							echo('</div>');
							echo('<div class="ifelseaddline"><div class="ifelseaddif">Else If</div></div><div class="ifelseaddline"><div class="ifelseaddelse">Else</div></div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');				
			
				
				}elseif ($value['Document']['vartype']=="9")
				{
					if ($Permissions['use']=='1')
					{	
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="expandbutton"></div>');
							echo('</div>');
					}else
					{
						echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder">');
								echo('<div class="expandbutton"></div>');
							echo('</div>');
					}
						echo('<div class="plot_block" id="'.$value['Document']['itemid'].'" parent="none">');
							echo('<div class="plot_holder">');
							echo('</div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');				

				}elseif ($value['Document']['vartype']=="11")
				{
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="11" location="'.$value['Document']['location'].'" style="width: 100%; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
							echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;">');
								if ($Permissions['edit']=='1') { echo('<div class="deletebutton"></div>'); }
							echo('</div>');
							echo('<div class="linebreak_block" id="'.$value['Document']['itemid'].'">');
								echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
							echo('</div>');
						echo('</div>');				
				}
			}
			
			echo('<div id="DetailedData">');
			foreach ($FileData as $index=>$value) 
			{	
				if ($value['Document']['vartype']=="2") 
				{	echo('<div itemtype="2" id="'.$value['Document']['itemid'].'_data">'.$FileData[$index]['Header']['0']['text'].'</div>');
				}elseif ($value['Document']['vartype']=="3")
				{	echo('<div itemtype="3" id="'.$value['Document']['itemid'].'_data">');
						foreach ($FileData[$index]['Equation']['0'] as $thisindex=>$eqvalue) {	echo('<div class="'.$thisindex.'">'.$eqvalue.'</div>');	}
					echo('</div>');
				}elseif ($value['Document']['vartype']=="5")
				{	echo('<div itemtype="5" id="'.$value['Document']['itemid'].'_data">');
						foreach ($FileData[$index]['Table']['0'] as $thisindex=>$eqvalue) {	echo('<div class="'.$thisindex.'">'.$eqvalue.'</div>');	}
					echo('</div>');
				}elseif ($value['Document']['vartype']=="6")
				{	echo('<div itemtype="6" id="'.$value['Document']['itemid'].'_data">');
						foreach ($FileData[$index]['ForLoop']['0'] as $thisindex=>$eqvalue) {	echo('<div class="'.$thisindex.'">'.$eqvalue.'</div>');	}
					echo('</div>');
				}elseif ($value['Document']['vartype']=="7")
				{	echo('<div itemtype="7" id="'.$value['Document']['itemid'].'_data">');
						foreach ($FileData[$index]['WhileLoop']['0'] as $thisindex=>$eqvalue) {	echo('<div class="'.$thisindex.'">'.$eqvalue.'</div>');	}
					echo('</div>');
				}elseif ($value['Document']['vartype']=="8")
				{	echo('<div itemtype="6" id="'.$value['Document']['itemid'].'_data">');
						foreach ($FileData[$index]['IfElse']['0'] as $thisindex=>$eqvalue) {	echo('<div class="'.$thisindex.'">'.$eqvalue.'</div>');	}
					echo('</div>');
				}
			}	
			echo('</div>');
		}
	}
	echo('<div id="scaleunits">');
		foreach ($ScaleUnits as $index=>$value) 
		{ 
			echo('<div class="suline">');
				echo('<div class="unit">'.$value['ScaledUnit']['unit'].'</div>');
				echo('<div class="conv_unit">'.$value['ScaledUnit']['conv_unit'].'</div>');
				echo('<div class="conv_factor">'.$value['ScaledUnit']['conv_factor'].'</div>');
				echo('<div class="quantity">'.$value['ScaledUnit']['quantity'].'</div>');
				echo('<div class="name">'.$value['ScaledUnit']['name'].'</div>');
				echo('<div class="Class">'.$value['ScaledUnit']['Class'].'</div>');
			echo('</div>');
		}
	echo('</div>');
	

	echo('<div id="parseunits">');
		foreach ($ParseUnits as $index=>$value) 
		{ 
			echo('<div class="puline">');
				echo('<div class="base_unit">'.$value['ParsedUnit']['base_unit'].'</div>');
				echo('<div class="name">'.$value['ParsedUnit']['name'].'</div>');
				echo('<div class="showunits">'.$value['ParsedUnit']['showunits'].'</div>');
				echo('<div class="quantity">'.$value['ParsedUnit']['quantity'].'</div>');
				echo('<div class="rad">'.$value['ParsedUnit']['rad'].'</div>');
				echo('<div class="m">'.$value['ParsedUnit']['m'].'</div>');
				echo('<div class="kg">'.$value['ParsedUnit']['kg'].'</div>');
				echo('<div class="s">'.$value['ParsedUnit']['s'].'</div>');
				echo('<div class="A">'.$value['ParsedUnit']['A'].'</div>');
				echo('<div class="K">'.$value['ParsedUnit']['K'].'</div>');
				echo('<div class="mol">'.$value['ParsedUnit']['mol'].'</div>');
				echo('<div class="cd">'.$value['ParsedUnit']['cd'].'</div>');
			echo('</div>');
		}
	echo('</div>');

	echo('<div id="fileinputs">'.$FileInfo['Workspace']['inputs'].'</div>');
	echo('<div id="functioninputs">'.$FileInfo['Workspace']['Functions'].'</div>');
	echo('<div id="locationdata">'.$FileInfo['Workspace']['locations'].'</div>');

		
	echo('<div id="equation_spec" class="top_spec">');
		echo('<div id="close_eqspec"></div>');
		echo('<div id="eqspecs_main">');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showtable"></div><div class="eqspecs_label">Info</div></div>');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showdisplay"></div><div class="eqspecs_label">Display</div></div>');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showmodels"></div><div class="eqspecs_label">Models</div></div>');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showdeps"></div><div class="eqspecs_label">Deps</div></div>');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showerrors"></div><div class="eqspecs_label">Errors</div></div>');
			echo('<div class="eqspecs_block"><div class="eqspecs_option" id="eqspecs_showrefs"></div><div class="eqspecs_label">Refs</div></div>');
		echo('</div>');

//		echo('<div id="eqspecs_table">');
//			echo('<div class="equationbar"><input id="specs_equation"></div>');
//			echo('<table id="eq_info" class="eq_info"><tr height="35px"><th width="150px">Name</th><th width="100px">Value</th><th width="100px">Units</th><th width="100px">Quantity</th><th width="50px">Size</th><th width="50px">Errors</th></tr>');
//				echo('<tr height="35px"><td></td><td></td><td></td><td></td><td></td><td></td></tr>');
//			echo('</table>');					
//		echo('</div>');

		echo('<div id="eqspecs_table">');
			echo('<div class="equationbar"><input id="specs_equation"></div>');
			echo('<table id="eq_info" class="eq_info">');
				echo('<tr height="35px">');
					echo('<th width="150px">Name</th>');
					echo('<th width="100px">Value</th>');
					echo('<th width="100px">Units</th>');
					echo('<th width="100px">Quantity</th>');
					echo('<th width="50px">Size</th>');
					echo('<th width="50px">Errors</th>');
					echo('<th width="150px">Edit in Use</th>');
				echo('</tr>');
				echo('<tr height="35px"><td></td><td></td><td></td><td></td><td></td><td></td><td><select id="editinuse"><option value="yes">Yes</option><option value="no">No</option></select></td></tr>');
			echo('</table>');					
		echo('</div>');


		echo('<div id="eqspecs_display">');
			echo('<div id="eqspecs_disp">');
				echo('<div id="eqspecs_left">');
					echo('<div class="eqspecs_subtitle">Select Format</div>');
					echo('<select id="equationshowtype"></select>');
				echo('</div>');
				echo('<div id="eqspecs_right">');
					echo('<div class="eqspecs_subtitle">Select Units</div>');
					echo('<select id="showunits"></select>');
				echo('</div>');
			echo('</div>');
		echo('</div>');

		echo('<div id="eqspecs_models">');
			echo('<div class="eqspecs_selectline">');
				echo('<div class="eqspecs_selectopt_active" id="num_modelkey">Numbers</div>');
				echo('<div class="eqspecs_selectopt" id="dim_modelkey">Dimensions</div>');
				echo('<div class="eqspecs_selectopt" id="unit_modelkey">Units</div>');
				echo('<div class="eqspecs_selectopt" id="quantity_modelkey">Quantities</div>');
			echo('</div>');
			echo('<div id="num_model"></div>');
			echo('<div id="dim_model"></div>');
			echo('<div id="unit_model"></div>');
			echo('<div id="quantity_model"></div>');
		echo('</div>');

		echo('<div id="eqspecs_deps">');
			echo('<div class="eqspecs_selectline">');
				echo('<div class="eqspecs_selectopt_active" id="dep1_key">Depend on me ...</div>');
				echo('<div class="eqspecs_selectopt" id="dep2_key">I depend on ...</div>');
			echo('</div>');
			echo('<div id="dep1"></div>');
			echo('<div id="dep2"></div>');
		echo('</div>');

		echo('<div id="eqspecs_errors"></div>');

		echo('<div id="eqspecs_ref">');
			echo('<div class="addref">&nbsp</div>');
			echo('<div class="deleteref">&nbsp</div>');
			echo('<div class="refs_left"></div>');
			echo('<div class="refs_right">');
				echo('<div class="ref_typeline">');
					echo('<div class="ref_type ref_showweb">Website</div>');
					echo('<div class="ref_type ref_showbook">Book</div>');
					echo('<div class="ref_type ref_showmag">Journal, Mag, Paper</div>');
					echo('<div class="ref_type ref_showenc">Encyclopedia</div>');
				echo('</div>');
				echo('<div class="ref_web">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Address</div><div class="ref_input"><input class="ref_address ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page Title</div><div class="ref_input"><input class="ref_pagetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Website Title</div><div class="ref_input"><input class="ref_sitetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Accessed</div><div class="ref_input"><input class="ref_date ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_book">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Book Title</div><div class="ref_input"><input class="ref_booktitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Publisher</div><div class="ref_input"><input class="ref_publisher ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_mag">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Title</div><div class="ref_input"><input class="ref_magtitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Mag or Paper Name</div><div class="ref_input"><input class="ref_name ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page</div><div class="ref_input"><input class="ref_page ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_enc">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Entry Name</div><div class="ref_input"><input class="ref_entryname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Encyclopedia Name</div><div class="ref_input"><input class="ref_encname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Edition</div><div class="ref_input"><input class="ref_edition ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Year</div><div class="ref_input"><input class="ref_year ref_input"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');


	echo('</div>');
	
	
	
	echo('<div id="image_spec" class="top_spec">');

		echo('<div id="close_imagespec"></div>');
		echo('<div id="imagespecs_main">');
			echo('<div class="imagespecs_block"><div class="imagespecs_option" id="imagespecs_showselect"></div><div class="imagespecs_label">Select</div></div>');
			echo('<div class="imagespecs_block"><div class="imagespecs_option" id="imagespecs_showprops"></div><div class="imagespecs_label">Props</div></div>');
			echo('<div class="imagespecs_block"><div class="imagespecs_option" id="imagespecs_showrefs"></div><div class="imagespecs_label">Refs</div></div>');
		echo('</div>');


		echo('<div id="imagespecs_select">');	
			echo('<div id="imageselect_address"><input type="text" id="imgselect" placeholder="Enter Address Here"/></div>');
			echo('<div id="imageselect_images"></div>');
		echo('</div>');

		echo('<div id="imagespecs_props">');	
//			echo('<div class="image_prop" id="imgname">Name :</div>');
//			echo('<div class="image_prop" id="imgupload">Upload Date :</div>');
			echo('<div class="image_prop">Height :<input type=""text" id="imgheight" /></div>');
			echo('<div class="image_prop">Width :<input type="text" id="imgwidth"/></div>');
		echo('</div>');

		echo('<div id="imagespecs_ref">');
			echo('<div class="addref">&nbsp</div>');
			echo('<div class="deleteref">&nbsp</div>');
			echo('<div class="refs_left"></div>');
			echo('<div class="refs_right">');
				echo('<div class="ref_typeline">');
					echo('<div class="ref_type ref_showweb">Website</div>');
					echo('<div class="ref_type ref_showbook">Book</div>');
					echo('<div class="ref_type ref_showmag">Journal, Mag, Paper</div>');
					echo('<div class="ref_type ref_showenc">Encyclopedia</div>');
				echo('</div>');
				echo('<div class="ref_web">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Address</div><div class="ref_input"><input class="ref_address ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page Title</div><div class="ref_input"><input class="ref_pagetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Website Title</div><div class="ref_input"><input class="ref_sitetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Accessed</div><div class="ref_input"><input class="ref_date ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_book">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Book Title</div><div class="ref_input"><input class="ref_booktitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Publisher</div><div class="ref_input"><input class="ref_publisher ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_mag">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Title</div><div class="ref_input"><input class="ref_magtitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Mag or Paper Name</div><div class="ref_input"><input class="ref_name ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page</div><div class="ref_input"><input class="ref_page ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_enc">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Entry Name</div><div class="ref_input"><input class="ref_entryname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Encyclopedia Name</div><div class="ref_input"><input class="ref_encname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Edition</div><div class="ref_input"><input class="ref_edition ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Year</div><div class="ref_input"><input class="ref_year ref_input"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');

	echo('</div>');

	echo('<div id="video_spec" class="top_spec">');
		echo('<div id="close_videospec"></div>');
		echo('<div id="videospecs_main">');
			echo('<div class="videospecs_block"><div class="videospecs_option" id="videospecs_selectoptions"></div><div class="videospecs_label">Video Options</div></div>');
		echo('</div>');

		echo('<div id="videospecs_option">');	
			echo('<div class="specs_title">Video Options</div>');
			echo('<div class="specs_line"><div class="specs_text">ID</div><input class="video_input" id="video_id"></div>');
			echo('<div class="specs_line"><div class="specs_text">Height</div><input class="video_input" id="video_height"></div>');
			echo('<div class="specs_line"><div class="specs_text">Width</div><input class="video_input" id="video_width"></div>');
			echo('<div class="specs_line"><div class="specs_text">Start</div><input class="video_input" id="video_start"></div>');
			echo('<div class="specs_line"><div class="specs_text">Stop</div><input class="video_input" id="video_stop"></div>');
/*
			echo('<div class="video_line"><div class="video_text">Autoplay</div><select class="videoselect" id="selectautoplay"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Loop</div><select class="videoselect" id="selectloop"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Show Related</div><select class="videoselect" id="selectrelated"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Show Info</div><select class="videoselect" id="selectinfo"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Keyboard</div><select class="videoselect" id="selectkeyboard"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Controls</div><select class="videoselect" id="selectcontrols"><option value="Disabled">Disabled</option><option value="Enabled">Enabled</option></div>');
			echo('<div class="video_line"><div class="video_text">Color</div><select class="videoselect" id="selectcolor"><option value="Red">Red</option><option value="White">White</option></div>');
			echo('<div class="video_line"><div class="video_text">Logo</div><select class="videoselect" id="selectlogo"><option value="Show">Show Logo</option><option value="Hide">Hide</option></div>');
			echo('<div class="video_line"><div class="video_text">Theme</div><select class="videoselect" id="selecttheme"><option value="Dark">Dark</option><option value="Light">Light</option></div>');
*/
		echo('</div>');
	echo('</div>');

	echo('</div>');

	echo('<div id="loop_spec" class="top_spec">');
		echo('<div id="close_loopspec"></div>');
		echo('<div id="loopspecs_main">');
			echo('<div class="loopspecs_block"><div class="loopspecs_option" id="loopspecs_showinfo"></div><div class="loopspecs_label">Info</div></div>');
		echo('</div>');
		echo('<div id="loopspecs_table">');
			echo('<div id="loopspecs_disp">');
				echo('<div class="loopspecs_left"></div><div class="loopspecs_right"></div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');



	echo('<div id="table_spec" tableid="" class="top_spec">');
		echo('<div id="close_tablespec"></div>');
		echo('<div id="tablespecs_main">');
			echo('<div class="tablespecs_block"><div class="tablespecs_option" id="tablespecs_showtable"></div><div class="tablespecs_label">Table</div></div>');
			echo('<div class="tablespecs_block"><div class="tablespecs_option" id="tablespecs_showrow"></div><div class="tablespecs_label">Row</div></div>');
			echo('<div class="tablespecs_block"><div class="tablespecs_option" id="tablespecs_showcolumn"></div><div class="tablespecs_label">Column</div></div>');
			echo('<div class="tablespecs_block"><div class="tablespecs_option" id="tablespecs_showcell"></div><div class="tablespecs_label">Cell</div></div>');
			echo('<div class="tablespecs_block"><div class="tablespecs_option" id="tablespecs_showrefs"></div><div class="tablespecs_label">Refs</div></div>');
		echo('</div>');

		echo('<div id="tablespecs_table">');
			echo('<div id="tablespecs_disp">');
				echo('<div id="tablespecs_left">');
					echo('<div class="tablespecs_subtitle">Table Information</div>');
					echo('<div class="table_halfitem">Table ID :</div><div class="table_halfitem"><div id="tableid"></div></div>');
					echo('<div class="table_halfitem">Show Title :</div><div class="table_halfitem"><input type="checkbox" id="tablecaptiononoff"></div>');
					echo('<div class="table_halfitem">Title :</div><div class="table_halfitem"><input type="text" id="tablecaption"></div>');
					echo('<div class="table_halfitem">Rows :</div><div class="table_halfitem" id="tablerows"></div>');
					echo('<div class="table_halfitem">Columns :</div><div class="table_halfitem" id="tablecolumns"></div>');
				echo('</div>');
				echo('<div id="tablespecs_right">');
					echo('<div class="tablespecs_subtitle">Table Format</div>');
					echo('<div class="table_halfitem">Show Row Labels :</div><div class="table_halfitem"><input type="checkbox" id="tablerowlabels"></div>');
					echo('<div class="table_halfitem">Show Col Labels :</div><div class="table_halfitem"><input type="checkbox" id="tablecolumnlabels"></div>');
					echo('<div class="table_halfitem">Show Headers :</div><div class="table_halfitem"><input type="checkbox" id="tableheaders"></div>');
					echo('<div class="table_halfitem">Border Width :</div><div class="table_halfitem"><input type="text" id="tableborders"></div>');
					echo('<div class="table_halfitem">Text-Align :</div><div class="table_halfitem"><select id="tablealign"><option value="left">left</option><option value="right">right</option><option value="center">center</option><option value="justify">justify</option></select></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');

		echo('<div id="tablespecs_column">');
			echo('<div id="tablespecs_disp2">');
				echo('<div class="tablespecs_subtitle">Column Information</div>');
				echo('<div class="table_halfitem">Width :</div><div class="table_halfitem"><input type="text" id="tablecolumnwidth"></div>');
				echo('<div class="table_halfitem">Left Border :</div><div class="table_halfitem"><input type="text" id="tableleftborder"></div>');
				echo('<div class="table_halfitem">Right Border :</div><div class="table_halfitem"><input type="text" id="tablerightborder"></div>');
				echo('<div class="table_halfitem">Text-Align :</div><div class="table_halfitem"><select id="columnalign"><option value="left">left</option><option value="right">right</option><option value="center">center</option><option value="justify">justify</option></select></div>');
			echo('</div>');
		echo('</div>');

		echo('<div id="tablespecs_row">');
			echo('<div id="tablespecs_disp2">');
				echo('<div class="tablespecs_subtitle">Row Information</div>');
				echo('<div class="table_halfitem">Height :</div><div class="table_halfitem"><input type="text" id="tablerowheight"></div>');
				echo('<div class="table_halfitem">Top Border :</div><div class="table_halfitem"><input type="text" id="tabletopborder"></div>');
				echo('<div class="table_halfitem">Bottom Border :</div><div class="table_halfitem"><input type="text" id="tablebottomborder"></div>');
				echo('<div class="table_halfitem">Text-Align :</div><div class="table_halfitem"><select id="rowalign"><option value="left">left</option><option value="right">right</option><option value="center">center</option><option value="justify">justify</option></select></div>');
			echo('</div>');
		echo('</div>');

		echo('<div id="tablespecs_cell">');
			echo('<div id="tablespecs_disp2">');
				echo('<div class="tablespecs_subtitle">Cell Information</div>');
				echo('<div class="table_halfitem">Top Border :</div><div class="table_halfitem"><input type="text" id="tabletopcborder"></div>');
				echo('<div class="table_halfitem">Bottom Border :</div><div class="table_halfitem"><input type="text" id="tablebottomcborder"></div>');
				echo('<div class="table_halfitem">Left Border :</div><div class="table_halfitem"><input type="text" id="tableleftcborder"></div>');
				echo('<div class="table_halfitem">Right Border :</div><div class="table_halfitem"><input type="text" id="tablerightcborder"></div>');
				echo('<div class="table_halfitem">Text-Align :</div><div class="table_halfitem"><select id="cellalign"><option value="left">left</option><option value="right">right</option><option value="center">center</option><option value="justify">justify</option></select></div>');
			echo('</div>');
		echo('</div>');

		echo('<div id="tablespecs_ref">');
			echo('<div class="addref">&nbsp</div>');
			echo('<div class="deleteref">&nbsp</div>');
			echo('<div class="refs_left"></div>');
			echo('<div class="refs_right">');
				echo('<div class="ref_typeline">');
					echo('<div class="ref_type ref_showweb">Website</div>');
					echo('<div class="ref_type ref_showbook">Book</div>');
					echo('<div class="ref_type ref_showmag">Journal, Mag, Paper</div>');
					echo('<div class="ref_type ref_showenc">Encyclopedia</div>');
				echo('</div>');
				echo('<div class="ref_web">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Address</div><div class="ref_input"><input class="ref_address ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page Title</div><div class="ref_input"><input class="ref_pagetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Website Title</div><div class="ref_input"><input class="ref_sitetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Accessed</div><div class="ref_input"><input class="ref_date ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_book">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Book Title</div><div class="ref_input"><input class="ref_booktitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Publisher</div><div class="ref_input"><input class="ref_publisher ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_mag">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Title</div><div class="ref_input"><input class="ref_magtitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Mag or Paper Name</div><div class="ref_input"><input class="ref_name ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page</div><div class="ref_input"><input class="ref_page ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_enc">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Entry Name</div><div class="ref_input"><input class="ref_entryname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Encyclopedia Name</div><div class="ref_input"><input class="ref_encname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Edition</div><div class="ref_input"><input class="ref_edition ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Year</div><div class="ref_input"><input class="ref_year ref_input"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');

	echo('</div>');

	echo('<div id="symeq_spec" symeqid="" class="top_spec">');
		echo('<div id="close_symeqspec"></div>');
		echo('<div id="symeqspecs_main">');
			echo('<div class="symeqspecs_block"><div class="symeqspecs_option" id="symeqspecs_showrefs"></div><div class="symeqspecs_label">Refs</div></div>');
		echo('</div>');

		echo('<div id="symeqspecs_ref">');
			echo('<div class="addref">&nbsp</div>');
			echo('<div class="deleteref">&nbsp</div>');
			echo('<div class="refs_left"></div>');
			echo('<div class="refs_right">');
				echo('<div class="ref_typeline">');
					echo('<div class="ref_type ref_showweb">Website</div>');
					echo('<div class="ref_type ref_showbook">Book</div>');
					echo('<div class="ref_type ref_showmag">Journal, Mag, Paper</div>');
					echo('<div class="ref_type ref_showenc">Encyclopedia</div>');
				echo('</div>');
				echo('<div class="ref_web">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Address</div><div class="ref_input"><input class="ref_address ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page Title</div><div class="ref_input"><input class="ref_pagetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Website Title</div><div class="ref_input"><input class="ref_sitetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Accessed</div><div class="ref_input"><input class="ref_date ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_book">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Book Title</div><div class="ref_input"><input class="ref_booktitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Publisher</div><div class="ref_input"><input class="ref_publisher ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_mag">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Title</div><div class="ref_input"><input class="ref_magtitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Mag or Paper Name</div><div class="ref_input"><input class="ref_name ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page</div><div class="ref_input"><input class="ref_page ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_enc">');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Entry Name</div><div class="ref_input"><input class="ref_entryname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Encyclopedia Name</div><div class="ref_input"><input class="ref_encname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Edition</div><div class="ref_input"><input class="ref_edition ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Year</div><div class="ref_input"><input class="ref_year ref_input"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');

	echo('<div id="text_spec" textid="" class="top_spec">');
		echo('<div id="close_textspec"></div>');
		echo('<div id="textspecs_main">');
			echo('<div class="textspecs_block"><div class="textspecs_option" id="textspecs_showrefs"></div><div class="textspecs_label">Refs</div></div>');
		echo('</div>');

		echo('<div id="textspecs_ref">');
			echo('<div class="addref">&nbsp</div>');
			echo('<div class="deleteref">&nbsp</div>');
			echo('<div class="refs_left"></div>');
			echo('<div class="refs_right">');
				echo('<div class="ref_typeline">');
					echo('<div class="ref_type ref_showweb">Website</div>');
					echo('<div class="ref_type ref_showbook">Book</div>');
					echo('<div class="ref_type ref_showmag">Journal, Mag, Paper</div>');
					echo('<div class="ref_type ref_showenc">Encyclopedia</div>');
				echo('</div>');
				echo('<div class="ref_web">');
					echo('<div class="ref_line"><div class="ref_text">Reference Text</div><div class="ref_input"><input class="ref_reftext ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Address</div><div class="ref_input"><input class="ref_address ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page Title</div><div class="ref_input"><input class="ref_pagetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Website Title</div><div class="ref_input"><input class="ref_sitetitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Accessed</div><div class="ref_input"><input class="ref_date ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_book">');
					echo('<div class="ref_line"><div class="ref_text">Reference Text</div><div class="ref_input"><input class="ref_reftext ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Book Title</div><div class="ref_input"><input class="ref_booktitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Publisher</div><div class="ref_input"><input class="ref_publisher ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_mag">');
					echo('<div class="ref_line"><div class="ref_text">Reference Text</div><div class="ref_input"><input class="ref_reftext ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Title</div><div class="ref_input"><input class="ref_magtitle ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Mag or Paper Name</div><div class="ref_input"><input class="ref_name ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Date Published</div><div class="ref_input"><input class="ref_publishdate ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Page</div><div class="ref_input"><input class="ref_page ref_input"></div></div>');
				echo('</div>');
				echo('<div class="ref_enc">');
					echo('<div class="ref_line"><div class="ref_text">Reference Text</div><div class="ref_input"><input class="ref_reftext ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Author</div><div class="ref_input"><input class="ref_author ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Entry Name</div><div class="ref_input"><input class="ref_entryname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Encyclopedia Name</div><div class="ref_input"><input class="ref_encname ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Edition</div><div class="ref_input"><input class="ref_edition ref_input"></div></div>');
					echo('<div class="ref_line"><div class="ref_text">Year</div><div class="ref_input"><input class="ref_year ref_input"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');
	
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------- THE PLOT SPECS STUFF --------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
	echo('<div id="plot_spec" class="top_spec">');
		echo('<div id="plot_mainselectwrapper">');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="plotselect"></div><div class="mainselecttext">Type</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="dataselect"></div><div class="mainselecttext">Data</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="cameraselect"></div><div class="mainselecttext">Camera</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="titleselect"></div><div class="mainselecttext">Title</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="formatselect"></div><div class="mainselecttext">Format</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="legendselect"></div><div class="mainselecttext">Legend</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="surface_legendselect"></div><div class="mainselecttext">Legend</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="xaxisselect"></div><div class="mainselecttext">X Axis</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="yaxisselect"></div><div class="mainselecttext">Y Axis</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="bandselect"></div><div class="mainselecttext">Bands</div></div>');
			echo('<div class="simplewrap"><div class="plot_mainselector" id="lineselect"></div><div class="mainselecttext">Lines</div></div>');
//			echo('<div class="simplewrap"><div class="plot_mainselector" id="surface_axesselect"></div><div class="mainselecttext">Axes</div></div>');
		echo('</div>');
	echo('</div>');
	
		echo('<div class="plot_optionblock" id="plot_typeblock">');
			echo('<div class="plot_chartoptionstitle">Chart Type</div>');
			echo('<div class="plot_selectplottype" id="select_lineplot" type="Line Plot" chart="line"></div>');
			echo('<div class="plot_selectplottype" id="select_columnchart" type="Column Chart" chart="column"></div>');
			echo('<div class="plot_selectplottype" id="select_barchart" type="Bar Chart" chart="bar"></div>');
			echo('<div class="plot_selectplottype" id="select_areachart" type="Area Chart" chart="area"></div>');
			echo('<div class="plot_selectplottype" id="select_scatterchart" type="Scatter Chart" chart="scatter"></div>');
			echo('<div class="plot_selectplottype" id="select_splineplot" type="Spline Plot" chart="spline"></div>');
			echo('<div class="plot_selectplottype" id="select_piechart" type="Pie Chart" chart="pie"></div>');
			echo('<div class="plot_selectplottype" id="select_combochart" type="Combo Chart" chart="combo"></div>');
			echo('<div class="plot_selectplottype" id="select_bubblechart" type="Bubble Chart" chart="bubble"></div>');
			echo('<div class="plot_selectplottype" id="select_heatmap" type="Heat Map" chart="heatmap"></div>');
			echo('<div class="plot_selectplottype" id="select_surface" type="Surface Map" chart="surface"></div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="surface_camerablock">');
			echo('<div class="plot_datasetcamerasection" class="plot_subclass">');
				echo('<div class="plot_chartoptionstitle">Camera Properties</div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">View X Pos</div><input type="text" id="surface_vxloc" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">View Y Pos</div><input type="text" id="surface_vyloc" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">View Z Pos</div><input type="text" id="surface_vzloc" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Camera X Pos</div><input type="text" id="surface_cxpos" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Camera Y Pos</div><input type="text" id="surface_cypos" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Camera Z Pos</div><input type="text" id="surface_czpos" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Rotate X</div><input type="text" id="surface_xrotate" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Rotate Y</div><input type="text" id="surface_yrotate" class="camerainput"></div>');
				echo('<div class="plot_appbox2"><div class="plot_appeartext">Rotate Z</div><input type="text" id="surface_zrotate" class="camerainput"></div>');
			echo('</div>');
		echo('</div>');

		echo('<div class="plot_optionblock" id="plot_datablock">');
		echo('<div class="plot_chartoptionstitle">Chart Data Sets</div>');
			echo('<div class="plot_datanames">');
				echo('<select id="plot_seriestype" class="plot_dataplotselect">');
					echo('<option value="line">Line Plot</option>');
					echo('<option value="column">Column Chart</option>');
					echo('<option value="pie">Pie Chart</option>');
					echo('<option value="area">Area Chart</option>');
					echo('<option value="scatter">Scatter Plot</option>');
					echo('<option value="spline">Spline Plot</option>');
				echo('</select>');
				echo('<div id="plot_adddatawrapper"><div class="plot_adddata">Add Data Series</div></div>');
				echo('<div id="plot_dataseriestemplate"><div class="plot_dataname"></div><div class="plot_deletedata">&nbsp</div></div>');
			echo('</div>');
	
			echo('<div id="plot_datablock1" class="plot_plotdatablock">');		// Line plots, scatter charts, spline charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline"">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="plot_xdatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="plot_ydatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Axis</div><select class="plot_yaxisselect" id="plot_yaxis1"><option>Y Axis 1</option></select></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionlabelsonoff" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Point Markers</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionmarkersonoff" checked="checked"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Color</div><input type="text" class="plot_colorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Fill Color</div><input type="text" class="plot_fillcolorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Symbol</div><select class="plot_symbolselect"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Symbol Size</div><input class="plot_markersize"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Width</div><input class="plot_plotlinewidth"></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
	
			echo('<div id="plot_datablock2" class="plot_plotdatablock">');		// Pie Charts and Donut Charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Series</div>');
							echo('<div class="plot_pointappearancetab dataplot_subtab">Point</div>');
						echo('</div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Labels</div><input type="text" class="plot_pielabels"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data</div><input type="text" class="plot_piedatainput"></div>');
							echo('<div class="plot_errorblock"></div>');
							echo('<div class="plot_errorblock"></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Width</div><input type="text" class="plot_connectorWidth"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Mono Color</div><input type="text" class="plot_monoColor"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Start Angle</div><input type="text" class="plot_startangle"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Stop Angle</div><input type="text" class="plot_stopangle"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Location (x,y)</div><input type="text" class="plot_location"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Inner Radius</div><input type="text" class="plot_innersize"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Size (%)</div><input type="text" class="plot_size"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionlabelsonoff" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Format</div><select class="plot_labelformat"><option value="Normal">Normal</option><option value="Percentage">Percentage</option><option value="Value">Value</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Size</div><div class="plot_optionbox"><input type="text" class="plot_labelSize"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Dist</div><div class="plot_optionbox"><input type="text" class="plot_labeldistance"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Border</div><div class="plot_optionbox"><input type="text" class="plot_labelBorderWidth"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Color</div><div class="plot_optionbox"><input type="text" class="plot_labelBorderColor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">BG Color</div><div class="plot_optionbox"><input type="text" class="plot_labelBGColor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Rad</div><div class="plot_optionbox"><input type="text" class="plot_labelBorderRadius"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Pad</div><div class="plot_optionbox"><input type="text" class="plot_labelBorderPadding"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Rot</div><div class="plot_optionbox"><input type="text" class="plot_labelRotation"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label X</div><div class="plot_optionbox"><input type="text" class="plot_labelX"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Y</div><div class="plot_optionbox"><input type="text" class="plot_labelY"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Legend</div><div class="plot_optionbox"><input type="checkbox" class="plot_serieslegendonoff" ></div></div>');
						echo('</div>');
						echo('<div class="plot_pointappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Point Index</div><input type="text" class="point_index"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Slice Color</div><input type="text" class="point_colorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Sliced</div><select class="point_slicedselect"><option value="false">False</option><option value="true">True</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><div class="plot_optionbox"><input type="checkbox" class="point_optionlabelsonoff" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Size</div><div class="plot_optionbox"><input type="text" class="point_labelSize"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="point_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Border</div><div class="plot_optionbox"><input type="text" class="point_labelBorderWidth"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Color</div><div class="plot_optionbox"><input type="text" class="point_labelBorderColor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">BG Color</div><div class="plot_optionbox"><input type="text" class="point_labelBGColor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Rad</div><div class="plot_optionbox"><input type="text" class="point_labelBorderRadius"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Border Pad</div><div class="plot_optionbox"><input type="text" class="point_labelBorderPadding"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Rot</div><div class="plot_optionbox"><input type="text" class="point_labelRotation"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label X</div><div class="plot_optionbox"><input type="text" class="point_labelX"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Y</div><div class="plot_optionbox"><input type="text" class="point_labelY"></div></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');	
	
	
			echo('<div id="plot_datablock4" class="plot_plotdatablock">');		// Combo charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_piebox">');
								echo('<div class="plot_pieappbox"><div class="plot_pietitletext">Label</div><div class="plot_pietitletext">Number</div></div>');
							echo('</div>');
							echo('<div class="plot_addpiebox"></div>');
							echo('<div class="plot_deletepiebox"></div>');
							echo('<div class="plot_subappbox"><input type="text" class="plot_piecolorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="plot_xdatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="plot_ydatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Axis</div><select class="plot_yaxisselect" id="plot_yaxis1"><option>Y Axis 1</option></select></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" value="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionlabelsonoff" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Point Markers</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionmarkersonoff" checked="checked"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Color</div><input type="text" class="plot_colorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Fill Color</div><input type="text" class="plot_fillcolorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Symbol</div><select class="plot_symbolselect"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Symbol Size</div><input class="plot_markersize"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Width</div><input class="plot_plotlinewidth"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Start Angle</div><input type="text" class="plot_startangle"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Stop Angle</div><input type="text" class="plot_stopangle"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Location (x,y)</div><input type="text" class="plot_location"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Inner Radius</div><input type="text" class="plot_innersize"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Size (%)</div><input type="text" class="plot_size"></div>');
						echo('</div>');
						echo('<div id="plot_datasettrendlinesection" class="plot_subclass">');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
	
			echo('<div id="plot_datablock5" class="plot_plotdatablock">');		// Heat Maps
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data</div><input type="text" class="plot_zdatainput"></div>');
							echo('<div class="plot_errorblock"></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><input type="checkbox" class="plot_optionlabelsonoff" ></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');	
	
			echo('<div id="plot_datablock6" class="plot_plotdatablock">');	// Column charts, bar charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" value="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Labels</div><input type="text" class="plot_labels"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="plot_ydatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Axis</div><select class="plot_yaxisselect" id="plot_yaxis1"><option>Y Axis 1</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Normal Stack</div><div class="plot_optionbox"><input type="checkbox" class="plot_normalstack" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Perc Stack</div><div class="plot_optionbox"><input type="checkbox" class="plot_percentstack" ></div></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><div class="plot_optionbox"><input type="checkbox" class="plot_optionlabelsonoff" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Column Color</div><input type="text" class="plot_colorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Mono Color</div><input type="text" class="plot_monoColor"></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
	
			echo('<div id="plot_datablock7" class="plot_plotdatablock">');	// Area charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="plot_xdatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="plot_ydatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Axis</div><select class="plot_yaxisselect" id="plot_yaxis1"><option>Y Axis 1</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Normal Stack</div><div class="plot_optionbox"><input type="checkbox" class="plot_normalstack" ></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Perc Stack</div><div class="plot_optionbox"><input type="checkbox" class="plot_percentstack" ></div></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><input type="checkbox" class="plot_optionlabelsonoff" ></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Point Markers</div><input type="checkbox" class="plot_optionmarkersonoff" checked="checked"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Color</div><input type="text" class="plot_colorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Fill Color</div><input type="text" class="plot_fillcolorpicker"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Symbol</div><select class="plot_symbolselect"><option value="circle">Circle</option><option value="square">Square</option><option value="triangle">Triangle</option><option value="triangle-down">Triangle-Down</option><option value="diamond">Diamond</option></select></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Symbol Size</div><input class="plot_markersize"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Line Width</div><input class="plot_plotlinewidth"></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
	
			echo('<div id="plot_datablock8" class="plot_plotdatablock">');	// Bubble charts
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_subtabline">');
							echo('<div class="plot_datasetdatatab dataplot_subtab dataplot_subtab_active plot_subtab_active">Data</div>');
							echo('<div class="plot_datasetappearancetab dataplot_subtab">Appearance</div>');
						echo('</div>');
						echo('<div class="plot_errorblock"></div>');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="plot_xdatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="plot_ydatainput"></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Z Data</div><input type="text" class="plot_zdatainput"></div>');
							echo('<div class="plot_errorblock"></div>');
						echo('</div>');
						echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Data Labels</div><input type="checkbox" class="plot_optionlabelsonoff" ></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Label Color</div><div class="plot_optionbox"><input type="text" class="plot_labelcolor"></div></div>');
							echo('<div class="plot_appbox"><div class="plot_appeartext">Fill Color</div><input type="text" class="plot_fillcolorpicker"></div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
	
			echo('<div id="plot_datablock9" class="plot_plotdatablock">');	// Surface Maps
				echo('<div class="plot_datasets">');
					echo('<div class="plot_dataseries">');
						echo('<div class="plot_datasetdatasection" class="plot_subclass">');
							echo('<div class="plot_appbox">');
							echo('<div class="plot_appeartext">Type</div>');
								echo('<select id="plot_surfacetype" class="plot_surfaceselect">');
									echo('<option value="Surface">Surface</option>');
									echo('<option value="Line">Line</option>');
									echo('<option value="Cube">Cube</option>');
									echo('<option value="Icosahedron">Icosahedron</option>');
									echo('<option value="Tetrahedron">Tetrahedron</option>');
									echo('<option value="Octahedron">Octahedron</option>');
									echo('<option value="Sphere">Sphere</option>');
									echo('<option value="Cylinder">Cylinder</option>');
									echo('<option value="Torus">Torus</option>');
									echo('<option value="Plane">Plane</option>');
									echo('<option value="Lathe">Lathe</option>');
									echo('<option value="Grid">Grid</option>');
									echo('<option value="Arrow">Arrow</option>');
								echo('</select>');
							echo('</div>');
							echo('<div id="surface_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="surface_datainput" id="surface_xdatainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="surface_datainput" id="surface_ydatainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Data</div><input type="text" class="surface_datainput" id="surface_zdatainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color Data</div><input type="text" class="surface_datainput" id="surface_cdatainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Surface Lines</div>');
									echo('<select id="surface_lines" class="surface_dataselect">');
										echo('<option value="0">Off</option>');
										echo('<option value="1">On</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Surface Level</div>');
									echo('<select id="surface_flat" class="surface_dataselect">');
										echo('<option value="0">Z Value</option>');
										echo('<option value="1">Flat</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Colors</div>');
									echo('<select id="surface_colorscheme" class="surface_dataselect">');
										echo('<option value="0">Z Values</option>');
										echo('<option value="1">Color Values</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Solid / Wire</div>');
									echo('<select id="surface_wireselect" class="surface_dataselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Offset</div><input type="text" class="surface_datainput" id="surface_xoffset"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Offset</div><input type="text" class="surface_datainput" id="surface_yoffset"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Offset</div><input type="text" class="surface_datainput" id="surface_zoffset"></div>');
							echo('</div>');
							echo('<div id="line_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" id="line_xdatainput" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" id="line_ydatainput" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Data</div><input type="text" id="line_zdatainput" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color Data</div><input type="text" id="line_cdatainput" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" id="line_radius" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Num Sides</div><input type="text" id="line_numsides" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Surface Level</div>');
									echo('<select id="line_flat" class="line_dataselect">');
										echo('<option value="0">Z Value</option>');
										echo('<option value="1">Flat</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Colors</div>');
									echo('<select id="line_colorscheme" class="line_dataselect">');
										echo('<option value="0">Z Values</option>');
										echo('<option value="1">Color Values</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Offset</div><input type="text" id="surface_xoffset" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Offset</div><input type="text" id="surface_yoffset" class="line_datainput"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Offset</div><input type="text" id="surface_zoffset" class="line_datainput"></div>');
							echo('</div>');
							echo('<div id="cube_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Width</div><input type="text" class="data_width data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height</div><input type="text" class="data_height data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Depth</div><input type="text" class="data_depth data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Width Segs</div><input type="text" class="data_widthsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height Segs</div><input type="text" class="data_heightsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Depth Segs</div><input type="text" class="data_depsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="icosahedron_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Detail</div><input type="text" class="data_detail data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="dodecahedron_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Detail</div><input type="text" class="data_detail data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="tetrahedron_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Detail</div><input type="text" class="data_detail data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="octahedron_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Detail</div><input type="text" class="data_detail data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="sphere_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Width Segs</div><input type="text" class="data_widthsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height Segs</div><input type="text" class="data_heightsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Phi Start</div><input type="text" class="data_phistart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Phi Length</div><input type="text" class="data_philength data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Theta Start</div><input type="text" class="data_thetastart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Theta Length</div><input type="text" class="data_thetalength data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="cylinder_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Top Radius</div><input type="text" class="data_radtop data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Bottom Rad</div><input type="text" class="data_radbottom data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height</div><input type="text" class="data_height data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius Segs</div><input type="text" class="data_radsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height Segs</div><input type="text" class="data_heightsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Theta Start</div><input type="text" class="data_thetastart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Theta Length</div><input type="text" class="data_thetalength data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="torus_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radius</div><input type="text" class="data_radius data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Tube</div><input type="text" class="data_tuberad data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Radial Segs</div><input type="text" class="data_radsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Tubular Segs</div><input type="text" class="data_tubesegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Arc</div><input type="text" class="data_arc data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="lathe_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Data</div><input type="text" class="data_xlathe data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Data</div><input type="text" class="data_ylathe data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Segments</div><input type="text" class="data_segs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Phi Start</div><input type="text" class="data_phistart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Phi Length</div><input type="text" class="data_philength data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="plane_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Width</div><input type="text" class="data_width data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height</div><input type="text" class="data_height data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Width Segs</div><input type="text" class="data_widthsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Height Segs</div><input type="text" class="data_heightsegs data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Wire Color</div><input type="text" class="data_wirecolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Frame / Solid</div>');
									echo('<select id="data_openended" class="surface_frameselect">');
										echo('<option value="Solid">Solid</option>');
										echo('<option value="Wireframe">Wireframe</option>');
									echo('</select>');								
								echo('</div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="grid_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Type</div><select class="data_planeselect"><option value="XY">XY</option><option value="XZ">XZ</option><option value="YZ">YZ</option></select></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input" ></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Start</div><input type="text" class="data_xstart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Stop</div><input type="text" class="data_xstop data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Start</div><input type="text" class="data_ystart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Stop</div><input type="text" class="data_ystop data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Start</div><input type="text" class="data_zstart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Stop</div><input type="text" class="data_zstop data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Spacing</div><input type="text" class="data_xspacing data_input" ></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Spacing</div><input type="text" class="data_yspacing data_input" ></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Spacing</div><input type="text" class="data_zspacing data_input" ></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Rotation</div><input type="text" class="data_xrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Rotation</div><input type="text" class="data_yrotation data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Rotation</div><input type="text" class="data_zrotation data_input"></div>');
							echo('</div>');
							echo('<div id="axis_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Axis Type</div><select class="surface_axisselect"><option value="X">X</option><option value="Y">Y</option><option value="Z">Z</option></select></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Axis Start</div><input type="text" class="data_axisstart data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Axis Stop</div><input type="text" class="data_axisstop data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Axis Interval</div><input type="text" class="data_axisinterval data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Tick Length</div><input type="text" class="data_ticklength data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Axis Color</div><input type="text" class="data_axiscolor data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Label Size</div><input type="text" class="data_axislabelsize data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Offset</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Offset</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Offset</div><input type="text" class="data_zposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Text Off</div><input type="text" class="data_xtextoff data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Text Off</div><input type="text" class="data_ytextoff data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Text Off</div><input type="text" class="data_ztextoff data_input"></div>');
							echo('</div>');
							echo('<div id="arrow_datablock" class="option_datablock">');
								echo('<div class="plot_errorblock"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Name</div><input class="plot_seriesname" placeholder="New Series"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Direction</div><input type="text" class="data_xDir data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Direction</div><input type="text" class="data_yDir data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Direction</div><input type="text" class="data_zDir data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Length</div><input type="text" class="data_length data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Color</div><input type="text" class="data_color data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Arrow Width</div><input type="text" class="data_aWidth data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Arrow Height</div><input type="text" class="data_aHeight data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">X Position</div><input type="text" class="data_xposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Y Position</div><input type="text" class="data_yposition data_input"></div>');
								echo('<div class="plot_appbox"><div class="plot_appeartext">Z Position</div><input type="text" class="data_zposition data_input"></div>');
							echo('</div>');
						echo('</div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');

		echo('</div>');

	
		echo('<div class="plot_optionblock" id="plot_xaxesblock">');
			echo('<div id="plot_optionsright">');
				echo('<div  class="plot_datablock" id="plot_xaxesdata" >');
					echo('<div class="plot_subtabline">');
						echo('<div id="plot_xaxissetuptab" class="xplot_subtab xplot_subtab_active">Setup</div>');
						echo('<div id="plot_xaxisappearancetab" class="xplot_subtab">Appearance</div>');
						echo('<div id="plot_xaxistickmarkstab" class="xplot_subtab">Ticks</div>');
					echo('</div>');
					echo('<div id="plot_xaxissetupsection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Label</div><div class="plot_charttextbox"><input id="plot_xaxislabel" value="Values"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minimum</div><div class="plot_charttextbox"><input id="plot_xaxismin" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Maximum</div><div class="plot_charttextbox"><input id="plot_xaxismax" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Type</div><select class="plot_xaxistypeselect"><option value="linear">Linear</option><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option></select></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Reverse Axis</div><select class="plot_xaxisreverse" id="plot_xaxisreverse"><option value="false">False</option><option value="true">True</option></select></div>');
					echo('</div>');
					echo('<div id="plot_xaxisappearancesection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Line Width</div><div class="plot_charttextbox"><input id="plot_xaxiswidth" value="0px"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Line Color</div><div class="plot_axiscolorbox"><input type="text" id="plot_xaxiscolorpicker"></div></div>');
//						echo('<div class="plot_optionline"><div class="plot_label85">Categories</div><select class="plot_xcategoriesselect" id="plot_xcategories"><option></option></select><input type="text" class="plot_xcategoriesinput"></div>');
	//						echo('<div class="plot_optionline"><div class="plot_label85">Categories</div><div class="plot_tabledata">&nbsp</div><div class="plot_selectwrap"><select class="plot_xcategoriesselect" id="plot_xcategories"><option></option></select><input type="text" class="plot_xcategoriesinput"></div></div>');
					echo('</div>');
					echo('<div id="plot_xaxistickmarkssection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Major Tick Interval</div><div class="plot_charttextbox"><input id="plot_xaxistickinterval" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Grid Line Width</div><div class="plot_charttextbox"><input id="plot_xgridlinewidth" value=""></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Grid Line Color</div><div class="plot_optionbox"><input type="checkbox" id="plot_xgridsonoff" checked="checked"></div><div class="plot_colorbox"><input type="text" id="plot_xmajortickpicker"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Tick Interval</div><div class="plot_charttextbox"><input id="plot_xaxisminortickinterval" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Line Width</div><div class="plot_charttextbox"><input id="plot_xminorgridlinewidth" value=""></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Grid Line</div><div class="plot_optionbox"><input type="checkbox" id="plot_xminorgridsonoff"></div><div class="plot_colorbox"><input type="text" id="plot_xminortickpicker"></div></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="plot_yaxesblock">');
			echo('<div id="plot_yaxisnames">');
				echo('<div id="plot_adddatawrapper"><div id="plot_addyaxis">Add Y Axis</div></div>');
				echo('<div id="plot_yaxistemplate"><div class="plot_yaxisname">Y Axis 1</div><div class="plot_deleteyaxis">&nbsp</div></div>');
			echo('</div>');
			echo('<div id="plot_optionsright">');
				echo('<div  class="plot_axisblock" id="plot_yaxesdata" >');
					echo('<div class="plot_subtabline">');
						echo('<div id="plot_yaxissetuptab" class="yplot_subtab yplot_subtab_active">Setup</div>');
						echo('<div id="plot_yaxisappearancetab" class="yplot_subtab">Appearance</div>');
						echo('<div id="plot_yaxistickmarkstab" class="yplot_subtab">Ticks</div>');
					echo('</div>');
					echo('<div id="plot_yaxissetupsection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Label</div><div class="plot_charttextbox"><input id="plot_yaxislabel" value="Values"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minimum</div><div class="plot_charttextbox"><input id="plot_yaxismin" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Maximum</div><div class="plot_charttextbox"><input id="plot_yaxismax" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Type</div><select class="plot_axistypeselect"><option value="linear">Linear</option><option value="datetime">Date-Time</option><option value="logarithmic">Logarithmic</option></select></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Reverse Axis</div><select class="plot_yaxisreverse" id="plot_yaxisreverse"><option value="false">False</option><option value="true">True</option></select></div>');
					echo('</div>');
					echo('<div id="plot_yaxisappearancesection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Opposite</div><select class="plot_optionaxisopposite" id="plot_yaxisopposite"><option value="right">Right Side</option><option value="left">Left Side</option></select></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Offset</div><div class="plot_charttextbox"><input id="plot_axisoffset" value="0px"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Line Width</div><div class="plot_charttextbox"><input id="plot_yaxiswidth" value="0px"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Axis Line Color</div><div class="plot_axiscolorbox"><input type="text" id="plot_yaxiscolorpicker"></div></div>');
					echo('</div>');
					echo('<div id="plot_yaxistickmarkssection" class="plot_subclass">');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Major Tick Interval</div><div class="plot_charttextbox"><input id="plot_yaxistickinterval" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Grid Line Width</div><div class="plot_charttextbox"><input id="plot_ygridlinewidth" value=""></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Grid Line Color</div><div class="plot_optionbox"><input type="checkbox" id="plot_ygridsonoff" checked="checked"></div><div class="plot_colorbox"><input type="text" id="plot_ymajortickpicker"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Tick Interval</div><div class="plot_charttextbox"><input id="plot_yaxisminortickinterval" placeholder="Automatic"></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Line Width</div><div class="plot_charttextbox"><input id="plot_yminorgridlinewidth" value=""></div></div>');
						echo('<div class="plot_chartline"><div class="plot_chartlabel">Minor Grid Line</div><div class="plot_optionbox"><input type="checkbox" id="plot_yminorgridsonoff"></div><div class="plot_colorbox"><input type="text" id="plot_yminortickpicker"></div></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	

		echo('<div class="plot_optionblock" id="plot_titleblock">');
			echo('<div class="top_third" id="plot_titlesection">');
				echo('<div class="plot_chartoptionstitle" id="plot_chartoptiontitle">Titles</div>');
				echo('<div class="plot_suboptions" id="plot_chartoptiontitlesection">');
					echo('<div class="plot_chartline"><div class="plot_chartlabel">Title</div><input type="checkbox" id="titlecheck" class="nopadcheck" checked="checked"><div class="plot_charttextbox"><input id="plot_title" class="plot_chartoption" placeholder="Chart Title"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartlabel">Subtitle</div><input type="checkbox" id="subtitlecheck" class="nopadcheck"><div class="plot_charttextbox"><input id="plot_subtitle" class="plot_chartoption" placeholder="Chart Subtitle"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="plot_formatblock">');
			echo('<div class="top_third" id="plot_formatsection">');
				echo('<div class="plot_chartoptionstitle" id="plot_chartoptionformat">Format</div>');
				echo('<div class="plot_suboptions" id="plot_chartoptionformatsection" >');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Width</div><div class="plot_charttextbox"><input id="plot_width" class="plot_chartoption" value="825px"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Height</div><div class="plot_charttextbox"><input id="plot_height" class="plot_chartoption" value="500px"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Margin Left</div><div class="plot_charttextbox"><input id="plot_marginleft" class="plot_chartoption" value="50px"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Margin Right</div><div class="plot_charttextbox"><input id="plot_marginright" class="plot_chartoption" value="10px"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Margin Top</div><div class="plot_charttextbox"><input id="plot_margintop" class="plot_chartoption" value="60px"></div></div>');
					echo('<div class="plot_chartline"><div class="plot_chartformatlabel">Margin Bottom</div><div class="plot_charttextbox"><input id="plot_marginbottom" class="plot_chartoption" value="65px"></div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="plot_legendblock">');
			echo('<div class="top_third">');
				echo('<div class="plot_chartoptionstitle">Legend</div>');
				echo('<div class="plot_chartline"><div class="plot_legendtextwide">Legend Show/Hide</div><input type="checkbox" id="plot_legendonoff" class="nopadcheck" checked="checked"></div>');
				echo('<div class="plot_chartline"><div class="plot_legendtext">Layout</div>');
					echo('<select id="plot_legendlayout" class="plot_legendselect">');
						echo('<option value="horizontal">Horizontal</option>');
						echo('<option value="vertical">Vertical</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="plot_legendtext">Alignment</div>');
					echo('<select id="plot_legendalignment" class="plot_legendselect">');
						echo('<option value="left">Left</option>');
						echo('<option value="right">Right</option>');
						echo('<option value="center">Center</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="plot_legendtext">Vert Alignment</div>');
					echo('<select id="plot_legendverticalalignment" class="plot_legendselect">');
						echo('<option value="top">Top</option>');
						echo('<option value="bottom">Bottom</option>');
						echo('<option value="middle">Center</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="plot_legendtext">X Offset</div>');
					echo('<input id="plot_legendxoffset" class="plot_legendinput">');
				echo('</div>');
				echo('<div class="plot_chartline"><div class="plot_legendtext">Y Offset</div>');
					echo('<input id="plot_legendyoffset" class="plot_legendinput">');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="surface_legendblock">');
			echo('<div class="top_third">');
				echo('<div class="plot_chartoptionstitle" >Legend</div>');
				echo('<div class="plot_chartline"><div class="surface_legendtext">Show Legend</div>');
					echo('<select id="surface_show" class="surface_legendselect">');
						echo('<option value="show">Show</option>');
						echo('<option value="hide">Hide</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="surface_legendtext">Color Map</div>');
					echo('<select id="surface_colormap" class="surface_legendselect">');
						echo('<option value="rainbow">Rainbow</option>');
						echo('<option value="cooltowarm">Cool to Warm</option>');
						echo('<option value="blackbody">Black Body</option>');
						echo('<option value="grayscale">Grayscale</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="surface_legendtext">Number of Colors</div>');
					echo('<select id="surface_numcolors" class="surface_legendselect">');
						echo('<option value="8">8</option>');
						echo('<option value="16">16</option>');
						echo('<option value="32">32</option>');
						echo('<option value="64">64</option>');
						echo('<option value="128">128</option>');
						echo('<option value="256">256</option>');
						echo('<option value="512">512</option>');
						echo('<option value="1024">1024</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="surface_legendtext">Number of Ticks</div>');
					echo('<select id="surface_numticks" class="surface_legendselect">');
						echo('<option value="3">3</option>');
						echo('<option value="5">5</option>');
						echo('<option value="9">9</option>');
						echo('<option value="11">11</option>');
						echo('<option value="13">13</option>');
						echo('<option value="15">15</option>');
						echo('<option value="17">17</option>');
					echo('</select>');								
				echo('</div>');
				echo('<div class="plot_chartline"><div class="surface_legendtext">Colormaps</div>');
					echo('<select id="surface_mapsplit" class="surface_legendselect">');
						echo('<option value="0">Combined</option>');
						echo('<option value="1">Separate</option>');
					echo('</select>');								
				echo('</div>');
			echo('</div>');
		echo('</div>');

		echo('<div class="plot_optionblock" id="plot_bandblock">');
			echo('<div class="top_third" id="plot_plotbandsection">');
				echo('<div class="plot_suboptions" id="plot_chartoptionbandsection" >');
				echo('<div class="plot_chartoptionstitle">Plot Bands</div>');
					echo('<div id="plot_addbandwrapper"><div id="plot_addplotband">Add Band</div></div>');
					echo('<div id="plot_bandnames">');	
						echo('<div id="plot_bandtemplate" class="plot_bandnameline"><div class="plot_bandname">Plot Band 1</div><div class="plot_deleteband">&nbsp</div></div>');
					echo('</div>');
					echo('<div id="plot_bandoptions">');	
						echo('<div class="plot_bandline"><div class="plot_bandtext">Start</div><input id="plot_bandstart" class="plot_bandtextbox" value=""></div>');
						echo('<div class="plot_bandline"><div class="plot_bandtext">End</div><input id="plot_bandend" class="plot_bandtextbox" value=""></div>');
						echo('<div class="plot_bandline"><div class="plot_bandtext">Color</div><input id="plot_bandcolor"></div>');
						echo('<div class="plot_bandline"><div class="plot_bandtext">Axis</div><select class="plot_bandaxis" id="plot_bandaxis"></select></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
		echo('<div class="plot_optionblock" id="plot_lineblock">');
			echo('<div class="top_third" id="plot_plotlinesection">');
				echo('<div class="plot_suboptions" id="plot_chartoptionlinesection" >');
				echo('<div class="plot_chartoptionstitle">Plot Lines</div>');
					echo('<div id="plot_addlinewrapper"><div id="plot_addplotline">Add Line</div></div>');
					echo('<div id="plot_linenames">');	
						echo('<div id="plot_linetemplate" class="plot_linenameline"><div class="plot_linename">Plot Line 1</div><div class="plot_deleteline">&nbsp</div></div>');
					echo('</div>');
					echo('<div id="plot_lineoptions">');	
						echo('<div class="plot_lineline"><div class="plot_linetext">Value</div><input id="plot_linevalue" class="plot_linetextbox" value=""></div>');
						echo('<div class="plot_lineline"><div class="plot_linetext">Width</div><input id="plot_linewidth" class="plot_linetextbox" value=""></div>');
						echo('<div class="plot_lineline"><div class="plot_linetext">Color</div><input id="plot_linecolor"></div>');
						echo('<div class="plot_lineline"><div class="plot_linetext">Axis</div><select class="plot_lineaxis" id="plot_lineaxis"></select></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	
//	echo('</div>');

echo('</div>');

echo('<div id="TOCBody" class="bodymain">');
	if (strlen($FileInfo['Workspace']['title'])>0) { echo('<div class="titleblock">'.$FileInfo['Workspace']['title'].'</div>'); } 
	if (strlen($FileInfo['Workspace']['subtitle'])>0) { echo('<div class="subtitleblock">'.$FileInfo['Workspace']['subtitle'].'</div>'); }
	echo('<div id="tocviewblock">');
		echo('<div id="viewalldoc">View Entire Document</div>');
		echo('<div id="viewtocsections">Headers to show</div>');
		echo('<div id="tocsections"><div class="viewtocs" id="viewtocH1">H1</div><div class="viewtocs" id="viewtocH2">H2</div>');
			echo('<div class="viewtocs" id="viewtocH3">H3</div><div class="viewtocs" id="viewtocH4">H4</div><div class="viewtocs" id="viewtocH5">H5</div></div>');
	echo('</div>');

	echo('<div class="fileheader">Table of Contents</div>');
	echo('<div id="TOC_holder"></div>');
echo('</div>');

echo('<div id="BugBody" class="bodymain">');
	echo('<div class="description">');
		echo('<div class="fileheader">Report a Bug</div>');
		echo('If you encountered a problem on this page, please fill out the information below. If the problem occured with an equation, select the appropriate item. ');
		echo('Be as descriptive as possible and describe the problem, what actions prompted the problem, and if the problem is repetitive.');
	echo('</div>');
	echo('<div class="bug_item" id="bugreturn">&nbsp</div>');
	echo('<div class="bug_item"><textarea id="bugdesc" rows="30" cols="115">Describe the bug</textarea></div>');
	echo('<div class="bug_item" id="bugdone">Submit Bug Info</div>');
echo('</div>');

?>