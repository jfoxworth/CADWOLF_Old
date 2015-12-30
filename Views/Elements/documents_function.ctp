<?php
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--- .
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 
if (($Permissions['edit'])&&($DirInfo['checkedout']==$UserName)) 										{	$edit=1;
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']!=$UserName)&&($DirInfo['checkedout']!=NULL)) 	{	$edit=0;	
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']==NULL)) 										{ 	$edit=0;
}else																									{ 	$edit=0; 	}	
 
echo('<div id="FunctionBody">');

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
			if ($FunctionInputs['inputs']=="NULL") { $temp=array(); }else { $temp=json_decode($FunctionInputs['inputs'], true); }
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
			if ($FunctionInputs['outputs']=="NULL") { $temp=array(); }else { $temp=json_decode($FunctionInputs['outputs'], true); }
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
?>