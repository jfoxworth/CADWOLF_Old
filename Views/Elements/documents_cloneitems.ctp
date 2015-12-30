<?php
echo('<div id="CloneBody" class="bodymain">');
	echo('<div id="toclonetext" class="main_item top_item currrent" type="0">');
		echo('<div class="icon_holder"><div class="deletebutton"></div><div class="text_specs"></div></div>');
		echo('<div class="text_block" id=""></div>');			
	echo('</div>');
	
	echo('<div id="tocloneheader" class="main_item top_item currrent" type="2">');
		echo('<div class="icon_holder"><div class="deletebutton"></div><div class="headerbutton"></div></div>');
		echo('<div class="header_block" id="" htype="h1"><div class="header_edit"><input type="text" class="h1edit" placeholder="Enter Header Text"></div></div>');			
	echo('</div>');
	
	echo('<div id="tocloneeq" class="main_item top_item currrent" type="0" style="width:825px;" >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="equationspecs"></div>');
		echo('</div>');
		echo('<div class="equationblock" id="" value="NewEq=0 km">');
			echo('<div class="eqshow input_valid">$$NewEq=0 km$$</div>');
			echo('<div class="eqparam_cont"><input type="text" value="NewEq=0 km" class="eqparam" /></div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="toclonesubeq" class="main_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="equationspecs"></div>');
			echo('<div class="sublineshow"></div>');
		echo('</div>');
		echo('<div class="subequationblock" id="" value="NewEq=0 km">');
			echo('<div class="subeqshow input_valid">$$NewEq=0 km$$</div>');
			echo('<div class="subparam_cont"><input type="text" value="NewEq=0 km" class="eqparam" /></div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="toclonesym" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder"><div class="deletebutton"></div><div class="symeq_specs"></div></div>');
		echo('<div class="symequationblock" id="" value="NewSymEq=0km">');
			echo('<div class="symeqshow">Temp=NewSymbolicEquation</div>');
			echo('<div class="symeqparam_cont"><input type="text" value="Temp=NewSymbolic" class="symeqparam" /></div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="toclonetable" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder"><div class="deletebutton"></div><div class="tablespecs"></div></div>');
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
		echo('<div class="tableblock" id="">');
			echo('<table class="contenttable">');
				echo('<caption>Table Caption</caption>');
				echo('<tbody>');
					echo('<tr class="headerrow"><td class="empty" width="15px">&nbsp</td><td class="empty" width="15px">&nbsp</td><td class="empty" width="25px">&nbsp</td><td  class="empty"><div class="tcdelete">&nbsp</div><div class="tcadd"></div></td><td  class="empty"><div class="tcdelete">&nbsp</div><div class="tcadd"></div></td><td  class="empty"><div class="tcdelete">&nbsp</div><div class="tcadd"></div></td></tr>');
					echo('<tr class="headerrow"><td class="empty" width="15px">&nbsp</td><td class="empty" width="15px">&nbsp</td><td class="empty" width="25px">&nbsp</td><td class="label">A</td><td class="label">B</td><td class="label">C</td></tr>');
					echo('<tr class="headerrow"><th class="empty">&nbsp</th><th class="empty">&nbsp</th><th class="empty">&nbsp</th><th class="edit" width="200px"></th><th class="edit" width="200px"></th><th class="edit" width="200px"></th></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">1</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">2</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">3</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">4</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">5</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
					echo('<tr class="normalrow"><td class="empty"><div class="trdelete">&nbsp</div></td><td class="empty"><div class="tradd"></div></td><td class="label">6</td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td><td style="width:200px"><div class="toedit">&nbsp</div></td></tr>');
				echo('</tbody>');		
			echo('</table>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneforloop" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="loopspecs"></div>');
			echo('<div class="sublineshow"></div>');
			echo('<div class="updateforloop"></div>');
		echo('</div>');
		echo('<div class="forloop" id="" parent="none" counter="a">');
			echo('<div class="forlooptext">');
				echo('<div class="forloopstarttext">');
					echo('<div class="forloopfor">for</div>');
					echo('<div class="forlooplabel">a</div>');
					echo('<div class="forloopequal">=</div>');
					echo('<div class="forloopstart">');
						echo('<div class="forloopvaluewrapper" type="start"><div class="forloopvalue">0</div></div>');
					echo('</div>');
				echo('</div>');
				echo('<div class="forloopwhiletext">');
					echo('<div class="forloopwhile">While</div>');
					echo('<div class="forlooplabel">a</div>');
					echo('<div class="forloopequal">');
						echo('<div class="forloopwhilevalue"><</div>');
						echo('<select class="forloopwhileselect"><option value="greater">></option><option value="less"><</option><option value="greaterequal">>=</option><option value="lessequal"><=</option></select>');
					echo('</div>');
					echo('<div class="forloopend">');
						echo('<div class="forloopvaluewrapper" type="end"><div class="forloopvalue">1</div></div>');
					echo('</div>');
				echo('</div>');
				echo('<div class="forloopinctext">');
					echo('<div class="forloopinc">Increment by</div>');
					echo('<div class="forloopincrease">');
						echo('<div class="forloopvaluewrapper" type="inc"><div class="forloopvalue">1</div></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');
			echo('<div class="forloopcontent itemneedsupdate">');
			echo('</div>');
		echo('</div>');
	echo('</div>');
	
	
	echo('<div id="toclonewhileloop" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="loopspecs"></div>');
			echo('<div class="sublineshow"></div>');
			echo('<div class="updatewhileloop"></div>');
		echo('</div>');
		echo('<div class="whileloop" id="" parent="none">');
			echo('<div class="whilelooptext">');
				echo('<div class="loopwhile">While</div>');
				echo('<div class="whileloopblock">');
					echo('<div class="whileloopstatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
						echo('<div class="whileloopflag">');
							echo('<div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">flag</div></div>');
						echo('</div>');
						echo('<div class="whileloopcondition">');
							echo('<div class="whileloopconditionvalue">==</div>');
						echo('</div>');
						echo('<div class="whileloopdependent">');
							echo('<div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">1</div></div>');
						echo('</div>');
					echo('</div>');
					echo('<div class="whileloopaddstatements">+</div>');
				echo('</div>');
				echo('<div class="whileloopaddblock">+</div>');
			echo('</div>');
	
			echo('<div class="whileloopcontent itemneedsupdate">');
			echo('</div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneifelse" class="main_item top_item currrent" type="0">');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="loopspecs"></div>');
			echo('<div class="sublineshow"></div>');
			echo('<div class="updateifelse"></div>');
		echo('</div>');
		echo('<div class="ifelse" id="" parent="none">');
			echo('<div class="ifelsetext">');
				echo('<div class="ifelseif">If</div>');
				echo('<div class="ifelseblock">');
					echo('<div class="ifelsestatements falsestatements" flag="flag" dependent="1" condition="=="><div class="deleteblock">&nbsp</div>');
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
			echo('<div class="ifelsecontent itemneedsupdate">');
			echo('</div>');
		echo('<div class="ifelseaddline"><div class="ifelseaddif">Else If</div></div><div class="ifelseaddline"><div class="ifelseaddelse">Else</div></div><div class="ifelseaddline"><div class="ifelsedelete">Delete</div></div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneifelseadd" class="subifelse">');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="sublineshow"></div>');
		echo('</div>');
		echo('<div class="ifelse">');
			echo('<div class="ifelsetext">');
				echo('<div class="ifelseif">If</div>');
				echo('<div class="ifelseblock">');
					echo('<div class="ifelsestatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
						echo('<div class="ifelseflag">');
							echo('<div class="ifelsevaluewrapper" type="flag"><div class="ifelsevalue">flag</div></div>');
						echo('</div>');
						echo('<div class="ifelsecondition">');
							echo('<div class="ifelseconditionvalue">==</div>');
						echo('</div>');
						echo('<div class="ifelsedependent">');
							echo('<div class="ifelsevaluewrapper" type="dependent"><div class="ifelsevalue">1</div></div>');
						echo('</div>');
					echo('</div>');
					echo('<div class="ifelseaddstatements">+</div>');
				echo('</div>');
				echo('<div class="ifelseaddblock">+</div>');
			echo('</div>');
			echo('<div class="ifelsecontent itemneedsupdate">');
			echo('</div>');
			echo('<div class="ifelseaddline"><div class="ifelseaddif">Else If</div></div><div class="ifelseaddline"><div class="ifelseaddelse">Else</div></div><div class="ifelseaddline"><div class="ifelsedelete">Delete</div></div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneifelsestatements" class="ifelsestatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
		echo('<div class="ifelseflag">');
			echo('<div class="ifelsevaluewrapper" type="flag"><div class="ifelsevalue">flag</div></div>');
		echo('</div>');
		echo('<div class="ifelsecondition">');
			echo('<div class="ifelseconditionvalue">==</div>');
		echo('</div>');
		echo('<div class="ifelsedependent">');
			echo('<div class="ifelsevaluewrapper" type="dependent"><div class="ifelsevalue">1</div></div>');
		echo('</div>');
	echo('</div>');
	
	
	echo('<div id="tocloneifelseblock" class="ifelseblock">');
		echo('<div class="ifelsestatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
			echo('<div class="ifelseflag">');
				echo('<div class="ifelsevaluewrapper" type="flag"><div class="ifelsevalue">flag</div></div>');
			echo('</div>');
			echo('<div class="ifelsecondition">');
				echo('<div class="ifelseconditionvalue">==</div>');
			echo('</div>');
			echo('<div class="ifelsedependent">');
				echo('<div class="ifelsevaluewrapper" type="dependent"><div class="ifelsevalue">1</div></div>');
			echo('</div>');
		echo('</div>');
		echo('<div class="ifelseaddstatements">+</div>');
	echo('</div>');
	
	
	echo('<div id="toclonewhileloop" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="loopspecs"></div>');
			echo('<div class="sublineshow"></div>');
			echo('<div class="updatewhileloop"></div>');
		echo('</div>');
		echo('<div class="whileloop" id="" parent="none">');
			echo('<div class="whilelooptext">');
				echo('<div class="loopwhile">While</div>');
				echo('<div class="whileloopblock">');
					echo('<div class="whileloopstatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
						echo('<div class="whileloopflag">');
							echo('<div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">flag</div></div>');
						echo('</div>');
						echo('<div class="whileloopcondition">');
							echo('<div class="whileloopconditionvalue">==</div>');
						echo('</div>');
						echo('<div class="whileloopdependent">');
							echo('<div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">1</div></div>');
						echo('</div>');
					echo('</div>');
					echo('<div class="whileloopaddstatements">+</div>');
				echo('</div>');
				echo('<div class="whileloopaddblock">+</div>');
			echo('</div>');
	
			echo('<div class="whileloopcontent">');
			echo('</div>');
		echo('</div>');
	echo('</div>');
	
	
	
	echo('<div id="toclonewhileloopstatements" class="whileloopstatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
		echo('<div class="whileloopflag">');
			echo('<div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">flag</div></div>');
		echo('</div>');
		echo('<div class="whileloopcondition">');
			echo('<div class="whileloopconditionvalue">==</div>');
		echo('</div>');
		echo('<div class="whileloopdependent">');
			echo('<div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">1</div></div>');
		echo('</div>');
	echo('</div>');
	
	
	echo('<div id="toclonewhileloopblock" class="whileloopblock">');
		echo('<div class="whileloopstatements falsestatements" flag="flag" condition="==" dependent="1"><div class="deleteblock">&nbsp</div>');
			echo('<div class="whileloopflag">');
			echo('<div class="whileloopvaluewrapper" type="flag"><div class="whileloopvalue">flag</div></div>');
			echo('</div>');
			echo('<div class="whileloopcondition">');
				echo('<div class="whileloopconditionvalue">==</div>');
			echo('</div>');
			echo('<div class="whileloopdependent">');
			echo('<div class="whileloopvaluewrapper" type="dependent"><div class="whileloopvalue">1</div></div>');
			echo('</div>');
		echo('</div>');
		echo('<div class="whileloopaddstatements">+</div>');
	echo('</div>');
	
	echo('<input class="tableinput" id="tocloneinput" >');
	
	echo('<div id="toclonesubline" >');
		echo('<div class="addequationsub"></div>');
		echo('<div class="addforloopsub"></div>');
		echo('<div class="addwhileloopsub"></div>');
		echo('<div class="addifelsesub"></div>');
		echo('<div class="pulloutsub"></div>');
	echo('</div>');
	
	echo('<div id="tocloneplot" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="expandbutton"></div>');
		echo('</div>');
		echo('<div class="plot_block" id="" parent="none">');
			echo('<div class="plot_holder"></div>');
		echo('</div>');
	echo('</div>');

	echo('<div id="toclonesurface" class="main_item top_item currrent" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="surfaceexpandbutton"></div>');
		echo('</div>');
		echo('<div class="surface_block" id="" parent="none">');
			echo('<div class="surface_holder"></div>');
		echo('</div>');
	echo('</div>');

	/*
	echo('<div id="save_nofileperm">This file is set so that users cannot save changes.</div>');
	echo('<div id="save_nouserperm">You do not have permission to save edits to this file.</div>');
	echo('<div id="save_success">The file was successfully saved.</div>');
	echo('<div id="noaddperm">You must check out this file to add, delete, or change items.</div>');
	echo('<div id="checkoutfile_success">You have now checked out this file and can edit it and save changes.</div>');
	echo('<div id="checkoutfile_failure">You do not have permission to check out this file.</div>');
	echo('<div id="checkoutfile_failure2">This file is already checked out.</div>');
	*/
	echo('<div id="tocloneimage" class="main_item top_item" type="0"  >');
		echo('<div class="icon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="imagespecs"></div>');
		echo('</div>');
		echo('<div class="image" id="" src="/Images/sample.jpg" type="image/jpg" parent="none"><img src="/UserImages/sample.jpg"/></div>');
	echo('</div>');
	
	echo('<div id="tocloneequalblock" class="equalblock">');
		echo('<div class="equalline">');
			echo('<div class="equalitem">==</div>');
			echo('<div class="equalitem">!=</div>');
			echo('<div class="equalitem">></div>');
			echo('<div class="equalitem">>=</div>');
			echo('<div class="equalitem"><</div>');
			echo('<div class="equalitem"><=</div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneequalblock2" class="equalblock2">');
		echo('<div class="equalline2">');
			echo('<div class="equalitem2">></div>');
			echo('<div class="equalitem2">>=</div>');
			echo('<div class="equalitem2"><</div>');
			echo('<div class="equalitem2"><=</div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneandorblock" class="andorsegment">');
		echo('<div class="andorline">');
			echo('<div class="andoritem">||</div>');
			echo('<div class="andoritem">&&</div>');
		echo('</div>');
	echo('</div>');
	
	echo('<div id="tocloneandorstatements" class="andorst">');
		echo('<div class="andorlinest">');
			echo('<div class="andoritemst">||</div>');
			echo('<div class="andoritemst">&&</div>');
		echo('</div>');
	echo('</div>');

	echo('<div id="toclonelinebreak" class="main_item top_item currrent" type="11">');
		echo('<div class="icon_holder"><div class="deletebutton"></div></div>');
		echo('<div class="linebreak_block" id="" ></div>');			
	echo('</div>');

	echo('<div id="toclonerefline" class="refline"><div class="reficon_wrapper"><div class="reficon"></div></div></div>');
	echo('<div id="toclonereficon" class="reficon_wrapper"><div class="reficon"></div></div>');

	echo('<div id="toclonevideo" class="main_item top_item" type="12"  >');
		echo('<div class="videoicon_holder">');
			echo('<div class="deletebutton"></div>');
			echo('<div class="videospecs"></div>');
		echo('</div>');
		echo('<div class="video_block" id=""><div class="default_video"></div></div>');
	echo('</div>');

echo('</div>');

	
?>