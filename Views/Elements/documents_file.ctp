<?php
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--- This function displays the items that show up when the user clicks on the "File" item on the left. It shows and manages all of items that deal with a file's
      properties. This includes managing how the file is called as a function, how many inputs it has, and it displays other properties of the file iteself such as
      the file creation and modification date.
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

if (($Permissions['edit'])&&($DirInfo['checkedout']==$UserName)) 										{	$edit=1;
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']!=$UserName)&&($DirInfo['checkedout']!=NULL)) 	{	$edit=0;	
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']==NULL)) 										{ 	$edit=0;
}else																									{ 	$edit=0; 	}	
 

echo('<div id="PropertyBody" class="bodymain">');
	echo('<div class="fileheader">File Properties</div>');
	echo('<div class="file_info">');
		if ($edit==1)
		{
			if (strlen($FileInfo['Workspace']['title'])>0) { 	echo('<div class="file_infoline"><div class="file_infoleft">Title</div><div id="titleoption" class="file_inforight">'.$FileInfo['Workspace']['title'].'</div></div>'); 
			}else { 											echo('<div class="file_infoline"><div class="file_infoleft">Title</div><div id="titleoption" class="file_inforight">'.$FileInfo['Workspace']['name'].'</div></div>');  }
		}else
		{
			if (strlen($FileInfo['Workspace']['title'])>0) { 	echo('<div class="file_infoline"><div class="file_infoleft">Title</div><div class="file_inforight">'.$FileInfo['Workspace']['title'].'</div></div>'); 
			}else { 											echo('<div class="file_infoline"><div class="file_infoleft">Title</div><div class="file_inforight">'.$FileInfo['Workspace']['name'].'</div></div>');  }
		}

		if ($edit==1)
		{
			if (strlen($FileInfo['Workspace']['subtitle'])>0) { 	echo('<div class="file_infoline"><div class="file_infoleft">Subtitle</div><div id="subtitleoption" class="file_inforight">'.$FileInfo['Workspace']['subtitle'].'</div></div>'); 
			}else { 												echo('<div class="file_infoline"><div class="file_infoleft">Subtitle</div><div id="subtitleoption" class="file_inforight">None Given</div></div>');  }
		}else
		{
			if (strlen($FileInfo['Workspace']['subtitle'])>0) { 	echo('<div class="file_infoline"><div class="file_infoleft">Subtitle</div><div class="file_inforight">'.$FileInfo['Workspace']['subtitle'].'</div></div>'); 
			}else { 												echo('<div class="file_infoline"><div class="file_infoleft">Subtitle</div><div class="file_inforight">None Given</div></div>');  }
		}

		echo('<div class="file_infoline"><div class="file_infoleft">Creation Date</div><div class="file_inforight">'.$this->Time->format('M jS, Y h:i A', $FileInfo['Workspace']['created'], null, $timezone).'</div></div>');
		echo('<div class="file_infoline"><div class="file_infoleft">Date Last Saved</div><div class="file_inforight">'.$this->Time->format('M jS, Y h:i A', $FileInfo['Workspace']['modified'], null, $timezone).'</div></div>');

		if ($FileInfo['Workspace']['CheckedOut']) { echo('<div class="file_infoline"><div class="file_infoleft">Checkout Status</div><div class="file_inforight" id="checkoutLine">Checked out by : '.$FileInfo['Workspace']['CheckedOut'].'</div></div>'); 
		}else { echo('<div class="file_infoline"><div class="file_infoleft">Checkout Status</div><div class="file_inforight" id="checkoutLine">Not Checked Out');
			if ($Permissions['edit']==1){ echo('<div id="checkoutButton">Check Out</div>'); }
			echo('</div></div>');  
		}

		if ($edit==1)
		{
			if ($FileInfo['Workspace']['TOC']) { 	echo('<div class="file_infoline"><div class="file_infoleft">View Table of Contents as Default</div><div class="file_inforight"><select id="TOC_status"><option value="Yes">Yes</option><option value="No">No</option></select></div></div>'); 
			}else { 								echo('<div class="file_infoline"><div class="file_infoleft">View Table of Contents as Default</div><div class="file_inforight"><select id="TOC_status"><option value="No">No</option><option value="Yes">Yes</option></select></div></div>');  }
		}else
		{
			if ($FileInfo['Workspace']['TOC']) { echo('<div class="file_infoline"><div class="file_infoleft">View Table of Contents as Default</div><div class="file_inforight">Yes</div></div>'); 
			}else { echo('<div class="file_infoline"><div class="file_infoleft">View Table of Contents as Default</div><div class="file_inforight">No</div></div>');  }
		}


		if ($Permissions['view']==1) 	{ 	echo('<div class="file_infoline"><div class="file_infoleft">View Permission</div><div class="file_inforight">You have permission to view this file</div></div>'); 
									}else { echo('<div class="file_infoline"><div class="file_infoleft">View Permission</div><div class="file_inforight">You do not have permission to view this file</div></div>'); 	}
		if ($Permissions['use']==1) 	{ 	echo('<div class="file_infoline"><div class="file_infoleft">Use Permission</div><div class="file_inforight">You have permission to use this file</div></div>'); 
									}else { echo('<div class="file_infoline"><div class="file_infoleft">Use Permission</div><div class="file_inforight">You do not have permission to use this file</div></div>'); 	}
		if ($Permissions['edit']==1) 	{ 	echo('<div class="file_infoline"><div class="file_infoleft">Edit Permission</div><div class="file_inforight">You have permission to edit this file</div></div>'); 
									}else { echo('<div class="file_infoline"><div class="file_infoleft">Edit Permission</div><div class="file_inforight">You do not have permission to edit this file</div></div>'); 	}


		if ($edit==1)
		{
			if (strlen($FileInfo['Workspace']['description'])>0) { 	echo('<div class="file_infoline"><div class="file_infoleft">File Description</div><div id="file_description" class="file_inforight">'.$FileInfo['Workspace']['description'].'</div></div>'); 
			}else { 												echo('<div class="file_infoline"><div class="file_infoleft">File Description</div><div id="file_description" class="file_inforight">Enter file description</div></div>');  }
		}else
		{
			if (strlen($FileInfo['Workspace']['description'])>0) {	echo('<div class="file_infoline"><div class="file_infoleft">File Description</div><div class="file_inforight">'.$FileInfo['Workspace']['description'].'</div></div>'); 
			}else { 												echo('<div class="file_infoline"><div class="file_infoleft">File Description</div><div class="file_inforight">No description available</div></div>');  }
		}

	echo('</div>');
echo('</div>');
	
	
echo('<div id="InputBody" class="bodymain">');
	echo('<div class="fileheader">Inputs from Worksheets and Data Sets</div>');
	echo('<div class="Input_Desc">Inputs can be taken from data sets that have been uploaded to a directory, or from other worksheets. To accomplish this, select one of the items below ');
	echo('and follow the instructions. Note that to prevent erroneous calculations, the current worksheet cannot have an equation with the same name as an imported equation.</div>');

	if ($edit) 	{ echo('<div id="Input_line"><div id="Inputs_showinputfile">Add Inputs</div></div>'); 
	}else 		{ echo('<div id="Input_line" class="hidden"><div id="Inputs_showinputfile">Add Inputs</div></div>'); }

	echo('<div id="Inputs_files">');
		echo('<div class="Inputs_largedesc">Enter the directory to start navigating for files</div>');
		echo('<div id="Inputs_location"><input id="Inputs_currentlocation"></div>');
		echo('<div class="Inputs_smalldesc">Select the file to take inputs from</div>');
		echo('<div class="Inputs_smalldesc">Check the equations to use as inputs</div>');
		echo('<div id="Inputs_folderwindow">');
		
		echo('</div>');
		echo('<div id="Inputs_equationwindow">');
		
		echo('</div>');
	echo('</div>');
	
	echo('<div id="Inputs_currentinputs">');
		echo('<div class="fileheader">Current Inputs</div>');
		echo('<table id="inputstable" class="inputs">');			
			echo('<tr><th width="175px">Original Name</th><th width="125px">Value</th><th width="75px">Units</th><th width="75px">Source</th><th width="350px">Source Name</th><th width="25px"></th></tr>');	
		echo('</table>');
		echo('<div id="noinputsmessage">There are currently no inputs to this worksheet.</div>');
	echo('</div>');
echo('</div>');
	
	
echo('<div id="FunctionBody" class="bodymain">');
	echo('<div class="fileheader">Name of file as a function</div>');
	echo('<div class="file_description">Each page can be used as a function that is called from another sheet. The user can set the name used to call this file as a function. ');
	echo('For example, if the users sets this name as "FunctionName" then this file would be called within an equation using the statement "FunctionName("Input1, Input1)." This ');
	echo('name cannot be the same as a built in function such as sin or cos. CAD Wolf will search through this file\'s parent folders, and then the folders listed in the creator\'s ');
	echo('path to find a file with the appropriate name.</div>');
	echo('<div class="file_info">');
		echo('<div class="file_nameline"><div id="filename_error"></div></div>');
		echo('<div class="file_nameline">');
			echo('<div class="file_nametext">Name of the file as a function : </div>');
			if ($edit) 	{	
				if ($FileInfo['Workspace']['FunctionName']) { 
							echo('<div id="filefunctionname" class="file_nameinput"><input type="text" value="'.$FileInfo['Workspace']['FunctionName'].'" id="file_functionname"></div>'); 
				}else { 	echo('<div id="filefunctionname" class="file_nameinput"><input type="text" placeholder="Name of File as a Function" id="file_functionname"></div>');  }
			}else{			echo('<div class="file_nameinput">'.$FileInfo['Workspace']['FunctionName'].'</div>'); 
				if ($FileInfo['Workspace']['FunctionName']) { 
							echo('<div id="filefunctionname" class="file_nameinput">'.$FileInfo['Workspace']['FunctionName'].'</div>'); 
				}else { 	echo('<div id="filefunctionname" class="file_nameinput">This file has no function name.</div>'); }
			}
		echo('</div>');
	echo('</div>');
	echo('<div class="fileheader">Inputs for file as a function</div>');
	echo('<div class="file_description"> ');
	echo('The inputs given to this function and how they are interpreted are set here. The sheet is called by its name and with the set number of inputs below in the form FunctionName(Input1, Input2, ... Input N). You can add ');
	echo(' or delete inputs and assign them the name they will be used as in the function. For example, if the one input is set and given the name "X", then the sheet will be solved used whatever value of "X" sent.</div>');
	echo('<div class="file_info">');
		if ($edit) 	{ echo('<div class="file_infoline"><div id="addfileinput">Add File Input</div></div>'); 
		}else 		{ echo('<div class="file_infoline hidden"><div id="addfileinput">Add File Input</div></div>'); }
		echo('<div id="FileInputList">');
			$a=0;
			if ($FileInfo['Workspace']['inputs']=="NULL") { $temp=array(); }else { $temp=json_decode($FileInfo['Workspace']['inputs'], true); }
			for ($a=0; $a<count($temp); $a++) 
			{	
				echo('<div class="functioninputline">');
					echo('<div class="functioninputnumber" number="'.$a.'">Input Number '.$a.' :</div>');
					echo('<div class="functioninputname">'.$temp[$a].'</div>');
					if ($edit) { echo('<div class="functioninputdelete"></div>'); }else { echo('<div class="functioninputdelete hidden"></div>'); }
				echo('</div>');
			} 
		echo('</div>');
	echo('</div>');
	echo('<div class="fileheader">Outputs for file as a function</div>');
	echo('<div class="file_description">When the page is called as a function, it will return the values set here. This is done by calling the function in the following format [Output1, Output2]=FunctionName(Input1, Input2).</div>');
	echo('<div class="file_info">');
		if ($edit) 	{ echo('<div class="file_infoline"><div id="addfileoutput">Add File Output</div></div>'); 
		}else 		{ echo('<div class="file_infoline hidden"><div id="addfileoutput">Add File Output</div></div>'); }
		echo('<div id="FileOutputList">');
			$a=0;
			if ($FileInfo['Workspace']['outputs']=="NULL") { $temp=array(); }else { $temp=json_decode($FileInfo['Workspace']['outputs'], true); }
			for ($a=0; $a<count($temp); $a++) 
			{	
				echo('<div class="functionoutputline">');
					echo('<div class="functionoutputnumber" number="'.$a.'">Output Number '.$a.' :</div>');
					echo('<div class="functionoutputname">'.$temp[$a].'</div>');
					if ($edit) { echo('<div class="functionoutputdelete"></div>'); }else { echo('<div class="functionoutputdelete hidden"></div>'); }
				echo('</div>');
			} 
		echo('</div>');
	echo('</div>');
echo('</div>');


echo('<div id="RefBody" class="bodymain">');
	echo('<div class="fileheader">References in the file</div>');
	echo('<div class="file_description">When a user adds a reference to a worksheet, it shows up near that item. However, all references are listed here in order for convenience. ');
	echo('The type of item that the reference is linked to is also noted and relevant links are given. You must have edit permissions to set a reference.</div>');
	echo('<div id="References"></div>');
echo('</div>');

?>