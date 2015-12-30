<?php
/**********************************************************************************************************************************
*	This file is the layout file for the create users page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>CADWOLF - Login and Create an Account; </title>
	<?php
		require_once('facebook/facebook.php');		
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.user');
		echo $this->Html->css('cadwolf.leftbar');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('Users');
		echo $this->Html->script('UserLogin');
		echo $this->Html->script('http://connect.facebook.net/en_US/all.js');
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => 'CADWOLF Login and Create User Page' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => 'CADWOLF Login and Create User Page' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
		echo $this->fetch('meta');
	?>
</head>
<body>
	<?php echo $this->element('analyticstracking'); ?>
	<?php echo $this->element('users'); ?>
</body>
</html>

