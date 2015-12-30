<?php
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
/*
        This is the main code that outputs the flyer and the business card. I use it because the builders did not have the best font and images
*/
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------------------------//
echo('<div id="MainBody">');

	echo('<div id="flyer_wrapper">');
		echo('<div id="flyer">');
			echo('<div id="main_banner_wrapper">');
				echo('<div id="main_banner">');
					echo('<div id="logowrapper">');
						echo('<div id="logo"></div>');
					echo('</div>');
				echo('</div>');
				echo('<div id="logotext_wrapper"><div id="logotext">A Web Based Mathematics and Engineering Platform</div></div>');
			echo('</div>');

			echo('<div class="banner_largetextwrapper"><div class="banner_largetext">CADWOLF lets users write text, solve equations, show symbolic equations, insert images, and make plots. It can replace a programming language, Word or PDF, and Excel.</div></div>');
	
			echo('<div id="wrapper1">');
				echo('<div id="image_wrapper">');
					echo('<div id="mac_screen1">&nbsp</div>');
					echo('<div id="mac_screen2">&nbsp</div>');
					echo('<div id="mac_screen3">&nbsp</div>');
					echo('<div id="mac_screen4">&nbsp</div>');
				echo('</div>');

				echo('<div id="left_text">');
					echo('<div id="left_title">Overview</div>');
					echo('<ul class="left_list">');
						echo('<li class="left_list">Create web pages that act as programs, solving equations from top to bottom</li>');
						echo('<li class="left_list">Add text, equations, symbolic equations, tables, images, charts, and more</li>');
						echo('<li class="left_list">Web based - all you need is the web browser</li>');
					echo('</ul>');
				echo('</div>');
				echo('<div id="right_text">');
					echo('<div id="right_title">Features</div>');
					echo('<ul class="right_list">');
						echo('<li class="right_list">Advanced built-in functions like an FFT, linear algebra, curve fitting, derivatives, integrals, and statistics</li>');
						echo('<li class="right_list">Wide array of charts and plots with the ability to view them independently</li>');
					echo('</ul>');
				echo('</div>');

/*				echo('<div id="left_text">');
					echo('<div id="left_title">Features</div>');
					echo('<ul class="left_list">');
						echo('<li class="left_list">Text, Equations, Symbolic Equations, Tables, Images, charts, and more</li>');
						echo('<li class="left_list">Advanced built-in functions like an FFT, linear algebra, curve fitting, derivatives, and integrals</li>');
						echo('<li class="left_list">Wide array of charts as well as 3D plotting</li>');
					echo('</ul>');
				echo('</div>');
				echo('<div id="right_text">');
					echo('<div id="right_title">Web Based</div>');
					echo('<ul class="right_list">');
						echo('<li class="right_list">Work from any computer, accessible from anywhere</li>');
						echo('<li class="right_list">Permissions can be set to let users edit only specific equations</li>');
						echo('<li class="right_list">Nothing to download, install, or maintain</li>');
					echo('</ul>');
				echo('</div>');
*/

			echo('</div>');

		echo('</div>');
	echo('</div>');

echo('</div>');
