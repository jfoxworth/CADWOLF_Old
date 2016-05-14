<?php
/**********************************************************************************************************************************
*	This file is the layout file for the datasets page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php 
	echo $this->Html->charset(); 
   	echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
	echo('<script type="text/javascript" src="http://www.cadwolf.com/MathJax/MathJax.js"></script>');

		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		if ($FileData['Workspace']['name']=='') { echo('<title>CADWOLF Datasets</title>');
		}else { echo('<title>CADWOLF Dataset - '.$FileData['Workspace']['name'].'</title>'); }

		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.datasets');
		echo $this->Html->css('cadwolf.leftbar');
		
		
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('datasets');		
	?>
</head>
<body>
<?php echo $this->element('analyticstracking'); ?>
	<div id="container">
			<?php echo $this->element('datasets'); ?>
	</div>
</body>
</html>