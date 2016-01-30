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

	echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
	if ($FileData['Workspace']['name']=='') { echo('<title>CADWOLF Datasets</title>');
	}else { echo('<title>CADWOLF Dataset - '.$FileData['Workspace']['name'].'</title>'); }

	echo $this->Html->meta('icon');
	echo $this->Html->css('cadwolf.datasets');
	echo $this->Html->css('cadwolf.leftbar');

?>		

    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

    <!-- Javascript Files -->
<!--
    <script type="text/javascript" src="js/angular.js"></script>
    <script type="text/javascript" src="js/sanitize.js"></script>
    <script type="text/javascript" src="js/httpBackend.js"></script>
    <script type="text/javascript" src="js/datasets/app.js"></script>
    <script type="text/javascript" src="js/datasets/controllers.js"></script>
    <script type="text/javascript" src="js/datasets/directives.js"></script>
	<script type="text/javascript" src="http://www.cadwolf.com/ckeditor/ckeditor.js"></script>
    <script lang="javascript" src="js/dist/xlsx.core.min.js"></script>
-->		
</head>
<?php echo $this->element('analyticstracking'); ?>
<?php echo $this->element('datasets'); ?>
</html>