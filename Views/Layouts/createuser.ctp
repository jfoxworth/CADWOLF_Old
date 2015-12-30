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
	<title>CAD Wolf - A Complete Engineering Platform; </title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.createuser');
		echo $this->Html->css('cadwolf.header');
		echo $this->Html->css('cadwolf.logindrop');
		echo $this->Html->css('cadwolf.homepage');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel+Decorative');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('LoginDrop');
		echo $this->Html->script('CreateUser');
		echo $this->Html->script('http://connect.facebook.net/en_US/all.js');
	?>
</head>
<body>
	<?php echo $this->element('createuserform'); ?>
</body>
</html>
