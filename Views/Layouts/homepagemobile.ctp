<?php
/**********************************************************************************************************************************
*	This file is the layout file for the home page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>CADWOLF - A Web Based Mathematics and Engineering Platform</title>

	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.homepagemobile');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->script('jquery');
		if ($UserData=="The Wolf") { echo $this->Html->script('HomePage2'); }else { echo $this->Html->script('HomePage'); }
?>
		<meta property="og:url"                content="http://www.cadwolf.com" />
		<meta property="og:type"               content="website" />
		<meta property="og:title"              content="CADWOLF - A web based mathematics and engineering platform" />
		<meta property="og:description"        content="CADWOLF is a web based mathematics and engineering platform. Alternative to Word, Excel, Mathcad and Matlab" />
		<meta property="og:image"              content="http://www.cadwolf.com/Images/blacklogo.jpg" />
</head>
<body>
<?php
?>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-544ab34c65dd3a23" async="async"></script>
<?php 	echo $this->element('analyticstracking'); 
		$thisurl=Router::url(null, true);
		if 		(($thisurl=="http://www.cadwolf.com/Future")||($thisurl=="http://www.cadwolf.com/Future/")){ echo $this->element('futurebody');
		}elseif (($thisurl=="http://www.cadwolf.com/Team_and_Culture")||($thisurl=="http://www.cadwolf.com/Team_and_Culture/")){ echo $this->element('teambody'); 
		}else	{	echo $this->element('homebodymobile');  }

?>
</body>
</html>

<?php
