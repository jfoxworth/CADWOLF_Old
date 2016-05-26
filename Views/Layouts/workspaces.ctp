<?php
/**********************************************************************************************************************
*	This file is the layout file for the workspaces page. 
*
*
**********************************************************************************************************************/
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
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:title', 'content' => 
                                     $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:description', 'content' => 
                                     $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
		echo $this->Html->meta(array('property' => 'og:image', 'content' => 
                                     'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
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
	
    <body ng-controller="workspacesController">

        <div id="container">																														

            <!-- The left column showing user info and views -->
            <?php    echo $this->element('workspaces/leftBar'); ?>

            <!-- The bar at the top holding the text editor icons -->
            <?php    echo $this->element('workspaces/formatBar'); ?>

            <!-- The column that lets users add items -->
            <?php    echo $this->element('workspaces/editBar'); ?>

            <div id="main_wrapper" ng-cloak>

                <div id="content_wrapper">

                    <!-- Good / Bad message bar across the top -->
                    <?php    echo $this->element('workspaces/messageBar'); ?>


                    <!-- The files and folders in this workspace -->
                    <?php    echo $this->element('workspaces/filesAndFolders'); ?>

                    <!-- The permissions tree view -->
                    <?php    echo $this->element('workspaces/permissions'); ?>

                </div>
            </div>
        </div>
    
        <!-- The files that are included in this download -->
        <?php    echo $this->element('workspaces/includes'); ?>

        <!-- The ngDialog popup to make sure the user wants to delete a file -->
        <?php    echo $this->element('workspaces/ngDelete'); ?>

        <script>angular.bootstrap(document, ['cadwolfApp']);</script>


    </body>

</html>