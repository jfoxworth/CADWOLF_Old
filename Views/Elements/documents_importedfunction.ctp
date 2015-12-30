<?php
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*--- This function displays the items that show and control the Files used as Functions. There is a subtab menu that shows the FAF list for this file and the equations
	which have files as functions. 
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

if ($Permissions['edit']) 
{ 
	echo('<div id="FunctionList" class="bodymain">');
		echo('<div class="fileheader">Function List for this file</div>');
		echo('<div class="file_description" id="functiontext">CADWOLF allows for the use of files as functions. To do this, the name of any function must be tagged to the proper file. The list ');
		echo('below pairs function names in this file with outside files. To add a file as a function, click the add symbol below. To import your personal list of files and functions, click the ');
		echo('appropriate button. Note that you cannot overwrite an existing function name without first deleting it.</div>');
	
		echo('<div id="FAFList">');
			echo('<div id="message"></div>');
			echo('<div id="AddFAFLine">Add a File as a Function</div>');
			echo('<div id="FAFHeaderRow"><div class="Profile_FAF_header2 FAFHeader">URL of File</div><div class="Profile_FAF_header1 FAFHeader">Name of Function</div></div>');
			echo('<div id="Profile_FAF">');
				$FAFs=json_decode($FileInfo['Workspace']['Functions']);
				if (count($FAFs)>0)
				{	
					foreach ($FAFs as $index=>$value) 
					{	echo('<div class="Profile_FAF_line" fileid="'.$FAFs->{$index}->{'fileid'}.'">');
							echo('<div class="Profile_FAF_addressholder"><div class="Profile_FAF_address">'.$FAFs->{$index}->{'filepath'}.'</div></div>');
							echo('<div class="Profile_FAF_nameholder"><div class="Profile_FAF_name">'.$index.'</div></div>');
							echo('<div class="File_FAF_delete">&nbsp</div>');
						echo('</div>');
					}
				}	
			echo('</div>');
		echo('</div>');
	
	echo('</div>');
}else
{
	echo('<div id="FunctionList" class="bodymain">');
		echo('<div class="fileheader">Function List for this file</div>');
		echo('<div class="file_description" id="functiontext">CADWolf allows for the use of files as functions. You must have edit permission to add the use of a file as a function. ');
		echo('Any outside files that have been added to this file to be used as a function are listed here.</div>');
	
		echo('<div id="FAFList">');
			echo('<div id="Profile_FAF">');
				$FAFs=json_decode($FileInfo['Workspace']['Functions']);
				if (count($FAFs)>0)
				{	
					echo('<div class="Profile_FAF_line">');
						echo('<div class="Profile_FAF_header2">Address</div>');
						echo('<div class="Profile_FAF_header1">Name</div>');
					echo('</div>');
					foreach ($FAFs as $index=>$value) 
					{	echo('<div class="Profile_FAF_line" fileid="'.$FAFs->{$index}->{'fileid'}.'">');
							echo('<div class="Profile_FAF_addressholder">'.$FAFs->{$index}->{'address'}.'</div>');
							echo('<div class="Profile_FAF_nameholder">'.$FAFs->{$index}->{'name'}.'</div>');
						echo('</div>');
					}
				}else { echo('<p>There have been no files added as functions.</p>'); }	
			echo('</div>');
		echo('</div>');
	
	echo('</div>');
	
}	
	
echo('<div id="FunctionsImported" class="bodymain">');
	echo('<div class="fileheader">Imported functions</div>');
	echo('<div id="functiontext" class="file_description">Users are allowed to use other worksheets as functions. This page lists all the worksheets that are actually used as functions on this page. ');
	echo('Before a file can be used as a function on this page, it must first be defined. This is done on the defined functions page.</div>');
	echo('<div id="importedfunctionslist"></div>');
echo('</div>');


/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------- This function displays the items that show and control the datasets to be pulled in.  -----------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*-------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

if ($Permissions['edit']) 
{ 
	echo('<div id="DatasetBody" class="bodymain">');
		echo('<div class="fileheader">Datasets for this file</div>');
		echo('<div class="file_description" id="functiontext">CADWOLF lets users create datasets in workspaces and then pull those datasets into documents as variables. ');
		echo('To add a dataset as a variable, click the button below and then enter the URL of the dataset where appropriate.</div> ');
	
		echo('<div id="AddDataset">Add a new dataaset</div>'); 
		echo('<div id="dataset_fail"></div>'); 
		echo('<div id="dataset_success"></div>'); 
		echo('<div id="DatasetList">');
		echo('</div>');
	
	echo('</div>');
}else
{
	echo('<div id="DatasetBody" class="bodymain">');
		echo('<div class="fileheader">Datasets for this file</div>');
		echo('<div class="file_description" id="functiontext">CADWOLF lets users create datasets in workspaces and then pull those datasets into documents as variables. ');
		echo('To add a dataset as a variable, click the button below and then enter the URL of the dataset where appropriate.</div> ');
	
		echo('<div id="AddDataset">Add a new dataset</div>'); 
		echo('<div id="DatasetList">');
		echo('</div>');
	
	echo('</div>');
	
}	


?>