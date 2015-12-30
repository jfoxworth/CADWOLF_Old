<?php
echo('<div id="ConstantBody" class="bodymain">');
	echo('<div>');
		echo('<div class="fileheader">Constants Used in Calculations</div>');
		echo('<div class="file_description"><p>The table below shows the constants that can be entered by the user to be recognized on the worksheet. To use the constant, enter the text as shown in the second column and ');
		echo('the item will appear as shown in the first column with the appropriate numeric value and units. Note that you cannot designate your own variable that has the same name as one of the constants.</p></div>');
	echo('</div>');
		echo('<table id="constants" class="units">');			
		echo('<tr><th width="125px">Symbol</th><th width="125px">Text</th><th width="175px">Value</th><th width="125px">Units</th><th width="100px">Quantity</th></tr>');	
		foreach ($Constants as $index=>$value) 
		{ 
			echo('<tr base="'.$value['Constant']['Base'].'">');
				echo('<td showvalue="'.$value['Constant']['showvalue'].'">$$'.$value['Constant']['showvalue'].'$$</td>');
				echo('<td>'.$value['Constant']['name'].'</td>');
				echo('<td>'.$value['Constant']['value'].'</td>');
				echo('<td>'.$value['Constant']['units'].'</td>');
			echo('</tr>');	
		}

	echo('</table>');
echo('</div>');
?>