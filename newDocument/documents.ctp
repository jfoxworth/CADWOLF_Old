<?php
/**********************************************************************************************************************************
*	This file is the layout file for the workspaces page. It looks at the permissions of the user and then calls the appropriate
*	files. This is done both to protect against possible improper actions of someone without edit permissions, but also to make
*	downloads easier for view and use permissions since much fewer files and actions are needed.
***********************************************************************************************************************************/
Configure::write('Config.timezone', 'US/Central');
/*
if ($UserName=="The Wolf")
{	
	echo('<!DOCTYPE html>');
	echo('<html>');
	echo('<head>');
		echo $this->Html->charset(); 
	    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
	   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('cadwolf.document');
	    echo $this->Html->css('cadwolf.leftbar_new');
		echo $this->Html->css('spectrum');
		echo $this->fetch('css');
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('Spectrum');
		echo $this->Html->script('big.min');
		echo $this->Html->script('document_ww');
		echo $this->Html->script('Three');
		echo $this->Html->script('Lut');
		echo $this->Html->script('Detector');
		echo $this->Html->script('TrackballControls');
		echo $this->Html->script('THREEx.KeyboardState');
		echo $this->Html->script('THREEx.WindowResize');
		echo $this->Html->script('THREEx.FullScreen');
		echo $this->Html->script('helvetiker_regular.typeface.js');

		echo('<script type="text/javascript" src="http://www.cadwolf.com/MathJax/MathJax.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>');
		echo('<script src="http://www.cadwolf.com/js/HighCharts.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts2.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/Heatmap.js"></script>');
		
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));

	echo('</head>');
	echo('<body>');
	    echo $this->element('analyticstracking'); 
		echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');
		echo('<div id="main_wrapper">');
			echo('<div id="content_wrapper">');
				echo('<div id="main_column">');
					echo('<div id="main_contents">');
						echo $this->element('documents_mainbody'); 
						echo $this->element('documents_file'); 
						echo $this->element('documents_importfunction'); 
						echo $this->element('documents_units'); 
						echo $this->element('documents_cloneitems'); 
					echo('</div>');
				echo('</div>');
				echo('<div id="OpenLeft">&nbsp</div>'); 
				echo('<div id="main_leftcolumn">');
					echo $this->element('documents_leftbar_new'); 
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</body>');
	echo('</html>');
*/
if ($UserName=="The Wolf")
{	
	echo('<!DOCTYPE html>');
	echo('<html>');
	echo('<head>');
		echo $this->Html->charset(); 
	    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
	   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->fetch('css');
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('script');
        echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
    ?>		
        <!-- Custom Fonts -->
        <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

        <!-- Custom CSS -->
        <link rel="stylesheet" href="http://www.cadwolf.com/css/spectrum.css" type="text/css">
        <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.documentAngular.css" type="text/css">
        <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.leftbar.css" type="text/css">
        <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog.min.css" type="text/css">
        <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-default.min.css" type="text/css">
        <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-plain.min.css" type="text/css">
    </head>
    <?php
        echo $this->element('analyticstracking'); 
        echo $this->element('document_body'); 
    echo('</html>');

}elseif (($Permissions['edit']==1)||($FileInfo['Workspace']['id']=="129"))
{	
	echo('<!DOCTYPE html>');
	echo('<html>');
	echo('<head>');
		echo $this->Html->charset(); 
	    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
	   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('cadwolf.document');
	    echo $this->Html->css('cadwolf.leftbar');
		echo $this->Html->css('spectrum');
		echo $this->fetch('css');
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('Spectrum');
		echo $this->Html->script('big.min');
		echo $this->Html->script('document_ww');
		echo $this->Html->script('Three');
		echo $this->Html->script('Lut');
		echo $this->Html->script('Detector');
		echo $this->Html->script('TrackballControls');
		echo $this->Html->script('THREEx.KeyboardState');
		echo $this->Html->script('THREEx.WindowResize');
		echo $this->Html->script('THREEx.FullScreen');
		echo $this->Html->script('helvetiker_regular.typeface.js');

		echo('<script type="text/javascript" src="http://www.cadwolf.com/MathJax/MathJax.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>');
		echo('<script src="http://www.cadwolf.com/js/HighCharts.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts2.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/Heatmap.js"></script>');
		
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));

	echo('</head>');
	echo('<body>');
	    echo $this->element('analyticstracking'); 
		echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');
		echo('<div id="main_wrapper">');
			echo('<div id="content_wrapper">');
				echo('<div id="main_column">');
					echo('<div id="main_contents">');
						echo $this->element('documents_mainbody'); 
						echo $this->element('documents_file'); 
						echo $this->element('documents_importfunction'); 
						echo $this->element('documents_units'); 
						echo $this->element('documents_cloneitems'); 
					echo('</div>');
				echo('</div>');
				echo('<div id="OpenLeft">&nbsp</div>'); 
				echo('<div id="main_leftcolumn">');
					echo $this->element('documents_leftbar'); 
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</body>');
	echo('</html>');


}elseif ($Permissions['use']==1)
{
	echo('<!DOCTYPE html>');
	echo('<html>');
	echo('<head>');
		echo $this->Html->charset(); 
	    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
	   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('cadwolf.document');
	    echo $this->Html->css('cadwolf.leftbar');
		echo $this->fetch('css');
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('big.min');
		echo $this->Html->script('documents_use');
		echo $this->Html->script('Spectrum');
		echo $this->Html->script('Three');
		echo $this->Html->script('Lut');
		echo $this->Html->script('Detector');
		echo $this->Html->script('TrackballControls');
		echo $this->Html->script('THREEx.KeyboardState');
		echo $this->Html->script('THREEx.WindowResize');
		echo $this->Html->script('THREEx.FullScreen');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/MathJax/MathJax.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts2.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/Heatmap.js"></script>');
		
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));

		echo $this->fetch('meta');

	echo('</head>');
	echo('<body>');
	    echo $this->element('analyticstracking'); 
		echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');
		echo('<div id="main_wrapper">');
			echo('<div id="content_wrapper">');
				echo('<div id="main_column">');
					echo('<div id="main_usecontents">');
						echo $this->element('documents_mainbody_use'); 
						echo $this->element('documents_file'); 
						echo $this->element('documents_importfunction'); 
						echo $this->element('documents_units'); 
						echo $this->element('documents_cloneitems'); 
					echo('</div>');
				echo('</div>');
				echo('<div id="OpenLeft">&nbsp</div>'); 
				echo('<div id="main_leftcolumn">');
					echo $this->element('documents_leftbar'); 
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</body>');
	echo('</html>');
	
}elseif ($Permissions['view']==1)
{
	echo('<!DOCTYPE html>');
	echo('<html>');
	echo('<head>');
		echo $this->Html->charset(); 
	    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
	   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('cadwolf.document');
	    echo $this->Html->css('cadwolf.leftbar');
		echo $this->fetch('css');
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('big.min');
		echo $this->Html->script('documents_view');
		echo $this->Html->script('Three');
		echo $this->Html->script('Spectrum');
		echo $this->Html->script('Lut');
		echo $this->Html->script('Detector');
		echo $this->Html->script('TrackballControls');
		echo $this->Html->script('THREEx.KeyboardState');
		echo $this->Html->script('THREEx.WindowResize');
		echo $this->Html->script('THREEx.FullScreen');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/MathJax/MathJax.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/HighCharts2.js"></script>');
        echo('<script src="http://www.cadwolf.com/js/Heatmap.js"></script>');
		
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
		echo $this->fetch('meta');

	echo('</head>');
	echo('<body>');
	    echo $this->element('analyticstracking'); 
//		echo('<div id="Format_Wrapper"><div id="NicEdit_Wrapper"><div id="cktoolbar" style="width: 935px;"> </div></div></div>');
		echo('<div id="main_wrapper">');
			echo('<div id="content_wrapper">');
				echo('<div id="main_column">');
					echo('<div id="main_usecontents">');
						echo $this->element('documents_mainbody_view'); 
						echo $this->element('documents_file'); 
						echo $this->element('documents_importfunction'); 
						echo $this->element('documents_units'); 
					echo('</div>');
				echo('</div>');
				echo('<div id="OpenLeft">&nbsp</div>'); 
				echo('<div id="main_leftcolumn">');
					echo $this->element('documents_leftbar'); 
				echo('</div>');
			echo('</div>');
		echo('</div>');
	echo('</body>');
	echo('</html>');
	
}