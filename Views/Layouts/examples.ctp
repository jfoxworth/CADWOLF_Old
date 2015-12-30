<?php
/**********************************************************************************************************************************
*	This file is the layout file for the examples page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); ?>
	<title>CADWOLF - Examples</title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.examples');
echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->script('jquery');
		echo $this->Html->script('UserLogin');
		echo $this->Html->script('http://connect.facebook.net/en_US/all.js');
		echo $this->Html->script('examples');
		echo $this->fetch('meta');
		echo $this->fetch('script');
	?>
</head>
<body>
<?php echo('This is a test'); echo $this->fetch('example'); ?>
</body>
</html>