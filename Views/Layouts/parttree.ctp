<?php
/**********************************************************************************************************************************
*	This file is the layout file for the part tree page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html>
<head>
	<?php 
		echo $this->Html->charset(); 
		echo('<title>Part Tree - '.$FileInfo['Workspace']['name'].'</title>'); 
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->meta('icon');
		echo $this->Html->css('cadwolf.parttree');
		echo $this->Html->css('jqueryui');
		echo $this->Html->css('cadwolf.leftbar');
		
		
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Roboto');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->fetch('script');
		echo $this->Html->script('jquery');
		echo $this->Html->script('jquery-ui');
		if (($Permissions['admin']=='1')||($Permissions['edit']=='1')) { echo $this->Html->script('parttree');	
		}else{ echo $this->Html->script('parttree_view'); }
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>');
		echo('<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/adapters/jquery.js"></script>');
		
	?>
</head>
<body>
<?php echo $this->element('analyticstracking'); ?>
	<div id="container">
			<?php 	echo $this->element('parttree'); ?>
	</div>
</body>
</html>