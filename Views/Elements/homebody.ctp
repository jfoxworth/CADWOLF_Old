<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-544ab34c65dd3a23" async="async"></script>
<?php
echo('<div id="fb-root"></div>');
echo('<div id="facebookid"></div>');
echo('<div id="container">');
echo ($this->Html->meta(array('property' => 'og:image', 'type' => 'meta', 'content' => 'www.cadwolf.com/Images/blacklogo.gif'), NULL, array('inline' => false))); 

	echo('<div id="landing_wrapper">');
		echo('<div id="main_banner_wrapper">');
			echo('<div id="main_banner">');
				echo('<div id="logowrapper">');
					echo('<div id="logo"></div>');
					echo('<div id="logotext">A Web Based Mathematics and Engineering Platform</div>');
				echo('</div>');
				echo('<div id="videowrapper">');
					echo('<div id="video_inner"><video src="CADWOLF_Intro.mp4" controls width="500px" preload="auto">HTML5 Video is required for this example</video></div>');
				echo('</div>');
				echo('<div id="statementwrapper">');
					echo('<div id="statement">');
						echo('CADWOLF lets users create web pages that have equations, text, charts, tables, images, symbolic equations, and more. It can replace a word processor like Word or PDF, an analysis tool like Excel, and a programming language. All of this happens within the browser.');
					echo('</div>');
					echo('<div id="createUserWrapper"><div id="createUserButton">Sign Up Now</div></div>');
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');



	echo('<div id="WhatIsWrapper">');
		echo('<div class="Wrapper_Title">How It Works</div>');
		echo('<div class="banner_item">');
			echo('<div class="banner_logo_wrapper"><div class="banner_logo" id="banner1"></div></div>');
			echo('<div class="banner_title">Documents</div>');
			echo('<div class="banner_text">Users create web pages that act as programs with equations solved as the page is created from top to bottom. ');
			echo('They can also add text, plots, loops, if statements, and other items. Documents can be used to solve homework problems, design an engineering component, or just solve a math problem. </div>');
		echo('</div>');

		echo('<div class="banner_item">');
			echo('<div class="banner_logo_wrapper"><div class="banner_logo" id="banner2"></div></div>');
			echo('<div class="banner_title">Analysis</div>');
			echo('<div class="banner_text">Equations are solved in real time and displayed in the proper mathematical format. This provides for what we call simultaneous analysis and documentation. ');
			echo('CADWOLF also tracks units for the user, provides a number of debugging tools, and lets the creator determine which equations can be edited by others.</div>');
		echo('</div>');

		echo('<div class="banner_item">');
			echo('<div class="banner_logo_wrapper"><div class="banner_logo" id="banner3"></div></div>');
			echo('<div class="banner_title">Portability</div>');
			echo('<div class="banner_text">Since the system is web based, the platform is accessible from anywhere and documents can be shared with other users through a simple URL. ');
			echo('There are no conflicting version problems, and no need for a customer or coworker to download software to see your work.</div>');
		echo('</div>');

	echo('</div>');

	echo('<div id="LookWrapper">');

		echo('<div class="Wrapper_Title2">What it looks like</div>');

		echo('<div id="LookBigWrapper">');

			echo('<div id="HeaderWrapper">');
				echo('<div id="HeaderInner" class="doc_main">');
					echo('<div id="doc_tab" class="look_tab_wrapper"><div id="doc_image_c" class="look_tab_image">&nbsp</div><div class="look_tab_text current_tab">Documents</div></div>');
					echo('<div id="equation_tab" class="look_tab_wrapper"><div id="eq_image" class="look_tab_image">&nbsp</div><div class="look_tab_text">Equations</div></div>');
					echo('<div id="chart_tab" class="look_tab_wrapper"><div id="chart_image" class="look_tab_image">&nbsp</div><div class="look_tab_text">Charts</div></div>');
					echo('<div id="work_tab" class="look_tab_wrapper"><div id="work_image" class="look_tab_image">&nbsp</div><div class="look_tab_text">Workspaces</div></div>');
				echo('</div>');
			echo('</div>');

			echo('<div id="doc_section" class="look_section">');
				echo('<div class="look_inner">');
					echo('<div class="look_subtext" id="looksub_doc1">');
						echo('<p>An edit bar on the left of the screen lets users add items anywhere on the page and format their width and margins. Equations and charts can use any equation or table cell above it on the page.</p>');
						echo('<p>In addition to equations, users can add text, charts, symbolic equations, images, or Excel like tables.</p>');
						echo('<div class="left_tabs">');
							echo('<div class="left_tab current_tab" id="chart_1">Quadratic Equation</div>');
							echo('<div class="left_tab" id="chart_2">Simple Collision</div>');
							echo('<div class="left_tab" id="chart_3">Table and Chart</div>');
						echo('</div>');
					echo('</div>');
					echo('<div class="look_images">');
						echo('<div class="look_image" id="look_image1"></div>');
						echo('<div class="look_image" id="look_image2"></div>');
						echo('<div class="look_image" id="look_image3"></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');

			echo('<div id="eq_section" class="look_section">');
				echo('<div class="look_inner">');
					echo('<div class="look_subtext" id="looksub_doc2">');
						echo('<p>Equations have a great deal of mathematical functionality including integration, differentiation, finding roots, curve fitting, matrix operations, and linear algebra. The equations are displayed in ');
						echo('the proper mathematical format using the appropriate symbols. Whenever a variable or equation is updated, all equations and charts that depend on it are updated as well.</p>');
						echo('<p>Unlike programming languages or Excel, users can enter units in CADWOLF and the system tracks them and makes any necessary adjustements. It also ensures that no inappropriate actions are carried out ');
						echo('such as adding a force to a weight.</p>');
					echo('</div>');
					echo('<div class="look_images">');
						echo('<div class="look_image" id="look_image4"></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');

			echo('<div id="chart_section" class="look_section">');
				echo('<div class="look_inner">');
					echo('<div class="left_tabs">');
						echo('<div class="left_tab current_tab" id="chart_5">Bar and Column</div>');
						echo('<div class="left_tab" id="chart_6">Pie and Donut</div>');
						echo('<div class="left_tab" id="chart_7">Line and Spline</div>');
						echo('<div class="left_tab" id="chart_8">Heat Maps</div>');
						echo('<div class="left_tab" id="chart_9">Surface Maps</div>');
					echo('</div>');
					echo('<div class="look_images">');
						echo('<div class="look_image" id="look_image5"></div>');
						echo('<div class="look_image" id="look_image6"></div>');
						echo('<div class="look_image" id="look_image7"></div>');
						echo('<div class="look_image" id="look_image8"></div>');
						echo('<div class="look_image" id="look_image9"></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');

			echo('<div id="work_section" class="look_section">');
				echo('<div class="look_inner">');
					echo('<div class="look_subtext" id="looksub_doc10">');
						echo('<p>Workspaces act as folders that hold all the users documents, images, subfolders, and databases. The workspace is the default view when a user logs on and prevents the inevitable problems that come ');
						echo('with storing files on PCs.</p>');
					echo('</div>');
					echo('<div class="look_images">');
						echo('<div class="look_image" id="look_image10"></div>');
					echo('</div>');
				echo('</div>');
			echo('</div>');

		echo('</div>');

	echo('</div>');

	echo('<div id="IconsWrapper">');
		echo('<div class="Wrapper_Title">Documentation, Resources, and Accounts</div>');
		echo('<div id="icons_wrapper">');
			echo('<div class="icon_wrapper">');
				echo('<div class="icon_wrap"><a href="http://www.cadwolf.com/Workspaces/Documentation"><div class="cadwolf_icon" id="icon_documentation"></div></a></div>');
				echo('<div class="icon_text"><div class="icon_innertext">Documentation</div></div>');
				echo('<div class="icon_smalltext">Full documentation and <a class="headerlink" href="http://www.cadwolf.com/Documents/Documentation/What_is_CADWOLF">What is CADWOLF?</a></div>');
			echo('</div>');
			echo('<div class="icon_wrapper">');
				echo('<div class="icon_wrap"><a href="http://www.cadwolf.com/Workspaces/Documentation/Examples"><div class="cadwolf_icon" id="icon_examples"></div></a></div>');
				echo('<div class="icon_text"><div class="icon_innertext">Examples</div></div>');
				echo('<div class="icon_smalltext">Examples of CADWOLF documents</div>');
			echo('</div>');
			echo('<div class="icon_wrapper">');
				echo('<div class="icon_wrap"><a href="http://www.cadwolf.com/Documents/Documentation/Example_File"><div class="cadwolf_icon" id="icon_sample"></div></a></div>');
				echo('<div class="icon_text"><div class="icon_innertext">Sample File</div></div>');
				echo('<div class="icon_smalltext">A sample document that anyone can edit</div>');
			echo('</div>');
			echo('<div class="icon_wrapper">');
				echo('<div class="icon_wrap"><a href="http://www.cadwolf.com/Users"><div class="cadwolf_icon" id="icon_accounts"></div></a></div>');
				echo('<div class="icon_text"><div class="icon_innertext">Accounts</div></div>');
				echo('<div class="icon_smalltext">Login or create an account</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');

echo('</div>');


echo('<div id="footer">');
	echo('<div id="footer_inner">');
		echo('<div id="footer_content">');
			echo('<div class="footer_column">');
				echo('<div class="footer_title" id="column1">About CADWOLF</div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Users/">Login / Create Account</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Future/">The Future</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Team_and_Culture/">Team and Culture</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Bugs/">Report a Bug / Feature Request</a></div>');
				echo('<div class="footer_item"><div class="addthis_sharing_toolbox"></div></div>');
			echo('</div>');
			echo('<div class="footer_column">');
				echo('<div class="footer_title" id="column2">Documentation</div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Workspaces/Documentation">Main Folder</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Documents/Documentation/What_is_CADWOLF">What is CADWOLF?</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Documents/Documentation/Users_Guide_-_Documents">Documents</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Documents/Documentation/Users_Guide_-_Workspaces">Workspaces</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Documents/Documentation/Users_Guide_-_Equations">Equations</a></div>');
				echo('<div class="footer_item"><a class="footerlink" href="http://www.cadwolf.com/Documents/Documentation/Users_Guide_-_Plots_and_Charts">Charts</a></div>');
//				echo('<div class="footer_item">Tables</div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');
echo('</div>');

?>