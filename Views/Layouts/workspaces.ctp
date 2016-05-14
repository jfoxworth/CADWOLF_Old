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
		if ($FileInfo['Workspace']['title']=='') { echo('<title>CADWOLF Workspace</title>'); }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); }
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
		echo $this->fetch('meta');
		
	?>

    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.workspace.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.leftbar.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-default.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-plain.min.css" type="text/css">

    <!-- Javascript Files -->
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>

    </head>

    <?php echo $this->element('analyticstracking'); ?>
	<?php echo $this->element('workspacebody'); ?>

</html>