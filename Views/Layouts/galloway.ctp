<!DOCTYPE html>
<html>
<head>
	<?php 
		echo $this->Html->charset(); 
		echo $this->Html->meta('icon');
		echo $this->Html->css('galloway');
		
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Open+Sans');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Source+Sans+Pro');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('galloway');
echo $this->fetch('content');
		
	?>
</head>
<body>
	<div id="container">
			<? echo $this->element('galloway'); ?>
	</div>
</body>
</html>