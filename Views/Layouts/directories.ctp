<?php
/**********************************************************************************************************************************
*	This file is the layout file for the directories page. 
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
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel+Decorative');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('LoginDrop');
	?>
</head>
<body>
	<div id="container">
			<?php echo $this->element('homeheader'); ?>
			<?php echo $this->element('directoryheader'); ?>
			<?php echo $this->element('directorybody'); ?>
	</div>
</body>
</html>