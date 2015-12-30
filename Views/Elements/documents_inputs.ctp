<?php
if (($Permissions['edit'])&&($DirInfo['checkedout']==$UserName)) 										{	$edit=1;
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']!=$UserName)&&($DirInfo['checkedout']!=NULL)) 	{	$edit=0;	
}elseif (($Permissions['edit'])&&($DirInfo['checkedout']==NULL)) 										{ 	$edit=0;
}else																									{ 	$edit=0; 	}	

echo('<div id="InputBody">');
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
			echo('<tr><th width="175px">Original Name</th><th width="175px">Alternate Name</th><th width="125px">Value</th><th width="75px">Units</th><th width="75px">Source</th><th width="200px">Source Name</th></tr>');	
		echo('</table>');
		echo('<div id="noinputsmessage">There are currently no inputs to this worksheet.</div>');
	echo('</div>');
echo('</div>');
?>