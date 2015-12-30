<?php
echo('<div id="SurfaceInfo">'.$Surface_Data['data']);

echo('</div>');

echo('<div id="Option_Bar_Show"></div>');

echo('<div id="Option_Bar">');

	echo('<div class="plot_datasetappearancesection" class="plot_subclass">');
		echo('<div class="titles">Camera Properties</div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">View X Pos</div><input type="text" class="surface_vxloc surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">View Y Pos</div><input type="text" class="surface_vyloc surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">View Z Pos</div><input type="text" class="surface_vzloc surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Camera X Pos</div><input type="text" class="surface_cxpos surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Camera Y Pos</div><input type="text" class="surface_cypos surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Camera Z Pos</div><input type="text" class="surface_czpos surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Rotate X</div><input type="text" class="surface_xrotate surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Rotate Y</div><input type="text" class="surface_yrotate surface_camoption"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Rotate Z</div><input type="text" class="surface_zrotate surface_camoption"></div>');
		echo('<div class="titles">Dataset Properties</div>');
		echo('<div id="dataselect"><select class="surface_dataoption" id="surface_dataselect"></select></div>');	
		echo('<div class="plot_appbox"><div class="plot_appeartext">Color Map</div><select id="surface_colormap" class="plot_legendselect surface_dataoption"><option value="rainbow">Rainbow</option><option value="cooltowarm">Cool to Warm</option><option value="blackbody">Black Body</option><option value="grayscale">Grayscale</option></select></div>');	
		echo('<div class="plot_appbox"><div class="plot_appeartext">Num of Colors</div><select id="surface_numcolors" class="plot_legendselect surface_dataoption"><option value="8">8</option><option value="16">16</option><option value="32">32</option><option value="64">64</option><option value="128">128</option><option value="256">256</option><option value="512">512</option><option value="1024">1024</option></select></div>');	
		echo('<div class="plot_appbox"><div class="plot_appeartext">X Offset</div><input type="text" class="surface_xoffset surface_datainput"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Y Offset</div><input type="text" class="surface_yoffset surface_datainput"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Z Offset</div><input type="text" class="surface_zoffset surface_datainput"></div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Map Shape</div><select id="surface_flat" class="plot_dataplotselect surface_dataoption"><option value="1">Flat Map</option><option value="0">Shaped Map</option></select></div>');
		echo('<div class="titles">Legend Properties</div>');
		echo('<div class="plot_appbox"><div class="plot_appeartext">Num of Ticks</div><select id="surface_numticks" class="plot_legendselect surface_leginput"><option value="3">3</option><option value="5">5</option><option value="9">9</option><option value="11">11</option><option value="13">13</option><option value="15">15</option><option value="17">17</option></select></div>');	
		echo('<div class="plot_appbox"><div class="plot_appeartext">Colormaps</div><select id="surface_mapsplit" class="plot_dataplotselect surface_leginput"><option value="0">Single</option><option value="1">Split</option></select></div>');

	echo('</div>');


echo('</div>');



?>