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
	<?php 
		echo $this->Html->charset(); 
		if ($FileInfo['Workspace']['title']=='') { echo('<title>CADWOLF Workspace</title>');
		}else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); }
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.workspace');
		echo $this->Html->css('jqueryui');
		echo $this->Html->css('cadwolf.leftbar');
		
		
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('jquery-ui');
		echo $this->Html->script('workspace');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>');
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
		echo $this->fetch('meta');
		
	?>
</head>
<body>

<?php echo $this->element('analyticstracking'); ?>
	<div id="container">
			<?php echo $this->element('workspacebody'); ?>
	</div>
</body>
</html>