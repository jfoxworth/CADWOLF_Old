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

	if ($FileInfo['Workspace']['TOC']=="0")
	{
		foreach ($FileData as $index=>$value) 
		{ 
			if ($value['Document']['vartype']=="1") 
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
					echo('<div id="'.$value['Document']['itemid'].'" class="text_block">'.$value['Document']['data'].'</div>');
				echo('</div>');
			}elseif ($value['Document']['vartype']=="2") 
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
					echo('<div id="'.$value['Document']['itemid'].'" class="header_block"><div class="header_text">'.$value['Document']['data'].'</div></div>');
				echo('</div>');
			}elseif ($value['Document']['vartype']=="3")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
						echo('<div class="eqshow input_valid">$$$$</div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');
			}elseif ($value['Document']['vartype']=="4")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
						echo('<div class="symeqshow input_valid"></div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');				
			}elseif ($value['Document']['vartype']=="5")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
						echo($value['Document']['data']);
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');							
			}elseif ($value['Document']['vartype']=="6")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
						echo('<div class="forloopcontent forloopcurrent">');
						echo('</div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');
			
			}elseif ($value['Document']['vartype']=="7")
			{		
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
				echo('<div class="whileloopcontent">');
				echo('</div>');
				echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
			
			}elseif ($value['Document']['vartype']=="8")
			{
				echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
					echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
						echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="expandbutton"></div></div>');
						echo('<div class="plot_block" id="'.$value['Document']['itemid'].'" parent="none">');
							echo('<div class="plot_holder">');
							echo('</div>');
						echo('</div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');				

				}elseif ($value['Document']['vartype']=="10")
				{
					echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="10" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
						echo('<div class="image" id="'.$value['Document']['itemid'].'" src="" type="">');
							echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
						echo('</div>');
					echo('</div>');				

				}elseif ($value['Document']['vartype']=="11")
				{
						echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="11" location="'.$value['Document']['location'].'" style="width: 100%; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="1" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
					echo('<div id="'.$value['Document']['itemid'].'" class="text_block"></div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');

			}elseif ($value['Document']['vartype']=="2") 
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="2" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;" >');
					echo('<div id="'.$value['Document']['itemid'].'" class="header_block"></div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');

			}elseif ($value['Document']['vartype']=="3")
			{
				echo('<div class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="3" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="equationblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'" parent="'.$value['Document']['parentid'].'">');
						echo('<div class="eqshow input_valid"></div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
				echo('</div>');

			}elseif ($value['Document']['vartype']=="4")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="4" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="symequationblock" id="'.$value['Document']['itemid'].'"  >');
						echo('<div class="symeqshow input_valid"></div>');
						echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
					echo('</div>');
				echo('</div>');
			
			}elseif ($value['Document']['vartype']=="5")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="5" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="tableblock" id="'.$value['Document']['itemid'].'" position="'.$value['Document']['location'].'">');
						echo($value['Document']['data']);
					echo('</div>');
				echo('</div>');

			}elseif ($value['Document']['vartype']=="6")
			{
				echo('<div class="main_item" fileid="'.$DirInfo['ID'].'" type="6" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
						echo('<div class="forloopcontent forloopcurrent">');
						echo('</div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');
		
			}elseif ($value['Document']['vartype']=="7")
			{		
				echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="7" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
						echo('<div class="whileloopcontent  forloopcurrent">');
						echo('</div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');
		
			}elseif ($value['Document']['vartype']=="8")
			{
				echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="8" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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
				echo('<div id="" class="main_item" fileid="'.$DirInfo['ID'].'" type="9" location="'.$value['Document']['location'].'" style="width: '.$value['Document']['width'].'px; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
					echo('<div class="icon_holder" style="width: '.$value['Document']['width'].'px;"><div class="expandbutton"></div></div>');
					echo('<div class="plot_block" id="'.$value['Document']['itemid'].'" parent="none">');
						echo('<div class="plot_holder">');
						echo('</div>');
					echo('</div>');
					echo('<div class="itemproperties">'.$value['Document']['data'].'</div>');
				echo('</div>');				

			}elseif ($value['Document']['vartype']=="11")
			{
					echo('<div id="" class="main_item top_item notcurrent" fileid="'.$DirInfo['ID'].'" type="11" location="'.$value['Document']['location'].'" style="width: 100%; margin-top:'.$value['Document']['margintop'].'px; margin-bottom:'.$value['Document']['marginbottom'].'px; margin-left:'.$value['Document']['marginleft'].'px; margin-right:'.$value['Document']['marginright'].'px;">');
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