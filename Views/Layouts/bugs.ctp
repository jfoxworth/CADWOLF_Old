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
	<title>CADWOLF - Report a Bug</title>

	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('cadwolf.bug');
		echo $this->Html->css('cadwolf.leftbar');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->script('jquery');
		echo $this->Html->script('bugsystem');
		echo $this->Html->script('http://connect.facebook.net/en_US/all.js');

		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => 'CADWOLF - Report a Bug' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => 'Report a bug to the CADWOLF system' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
?>
</head>
<body>
<?php
		echo $this->Html->meta(array('name' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.gif'));
		echo $this->Html->meta(array('name' => 'og:desccription', 'content' => 'CADWOLF is a web based mathematics and engineering platform. Alternative to mathcad and matlab'));
?>
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-544ab34c65dd3a23" async="async"></script>
<?php 	echo $this->element('analyticstracking'); 
		$thisurl=Router::url(null, true);
		echo $this->element('bugs');

?>
</body>
</html>

<?php
