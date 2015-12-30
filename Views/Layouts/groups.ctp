<?php
/**********************************************************************************************************************************
*	This file is the layout file for the groups page. 
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
		echo $this->Html->css('cadwolf.group');
		echo $this->Html->css('cadwolf.header');
		echo $this->Html->css('cadwolf.logindrop');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel+Decorative');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->Html->script('jquery');
		echo $this->Html->script('group');
		echo $this->Html->script('LoginDrop');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
	?>
</head>
<body>
	<div id="container">
			<?php echo $this->element('header'); ?>
			<?php echo $this->element('group'); ?>
	</div>
</body>
</html>
