<?php
/**********************************************************************************************************************************
*	This file is the layout file for the workspaces page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php echo $this->Html->charset(); 
		echo('<title>CADWOLF Profile - '.$this->Session->read('Auth.User.username').'</title>');
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.profile');
		echo $this->Html->css('cadwolf.leftbar');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('profile');
	?>
</head>
<body>
	<?php echo $this->element('profile'); ?>
</body>
</html>