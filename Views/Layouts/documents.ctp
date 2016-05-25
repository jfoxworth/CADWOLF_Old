<?php
/**********************************************************************************************************************************
*	This file is the layout file for the workspaces page. It looks at the permissions of the user and then calls the appropriate
*	files. This is done both to protect against possible improper actions of someone without edit permissions, but also to make
*	downloads easier for view and use permissions since much fewer files and actions are needed.
***********************************************************************************************************************************/
Configure::write('Config.timezone', 'US/Central');

echo('<!DOCTYPE html>');
echo('<html>');
echo('<head>');
    echo $this->Html->charset(); 
    if ($FileInfo['Workspace']['title']=='') { echo('<title>'.$FileInfo['Workspace']['name'].'</title>'); 
                                             }else { echo('<title>'.$FileInfo['Workspace']['title'].'</title>'); } 
    
    echo('<script type="text/x-mathjax-config">MathJax.Hub.Config({ extensions: ["tex2jax.js"], jax: ["input/TeX","output/HTML-CSS"], });</script>');
    echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
    echo $this->fetch('css');
    echo $this->Html->meta('icon');
    echo $this->fetch('meta');
    echo $this->fetch('script');
    echo $this->Html->meta(array('property' => 'og:type', 'content' => 'article' ),'',array('inline'=>false));
    echo $this->Html->meta(array('property' => 'og:title', 'content' => 
                                 $FileInfo['Workspace']['title'] ),'',array('inline'=>false));
    echo $this->Html->meta(array('property' => 'og:description', 'content' => 
                                 $FileInfo['Workspace']['description'] ),'',array('inline'=>false));
    echo $this->Html->meta(array('property' => 'og:image', 'content' => 
                                 'http://www.cadwolf.com/Images/blacklogo.jpg' ),'',array('inline'=>false));
?>		
    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.documentAngular.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.leftbar.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-default.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-plain.min.css" type="text/css">
</head>

<?php   echo $this->element('analyticstracking'); ?>

<body ng-controller="documentController" ng-cloak>

    <!-- This is the red or green bar at the top that displays a message to the user -->
    <?php    echo $this->element('documents/messageBar'); ?>

    <!-- The bar at the top that show the ckeditor format tool -->
    <?php    echo $this->element('documents/formatBar'); ?>
    
    <!-- This is the left column with the options to show and hide the various views -->
    <?php   echo $this->element('documents/leftBar'); ?>

    <!-- This is the bar to the left of the page that lets the user enter items, move them, and edit their margins -->
    <?php   echo $this->element('documents/editBar'); ?>

    <!-- This is the main column of data  -->
    <div id="main_wrapper">
        <div id="content_wrapper">
            <div id="main_column">
                <div id="main_contents">

                    <!-- The main repeater loop to display items -->
                    <?php    echo $this->element('documents/mainCol'); ?>

                    <!-- The table of contents -->
                    <?php    echo $this->element('documents/tableOfContents'); ?>
                            
                    <!-- The file properties   -->
                    <?php    echo $this->element('documents/properties'); ?>
                    
                    <!-- The bibliography  -->
                    <?php    echo $this->element('documents/bibliography'); ?>
                        
                    <!-- The inputs -->
                    <?php    echo $this->element('documents/inputs'); ?>

                    <!-- The datasets  -->
                    <?php    echo $this->element('documents/datasets'); ?>
                                        
                    <!-- The Units Conversion -->
                    <?php    echo $this->element('documents/units'); ?>

                    <!-- The constants   -->
                    <?php    echo $this->element('documents/constants'); ?>
                    
                    <!-- The file as a function section       -->
                    <?php    echo $this->element('documents/fileAsFunction'); ?>

                    <!-- Defined Functions -->
                    <?php    echo $this->element('documents/functions'); ?>

                    <!-- Bug Body -->
                    <?php    echo $this->element('documents/bugs'); ?>
                    
                </div>
            </div>
        </div>
    </div>
    
    <!-- The specifics view directives -->
    <?php    echo $this->element('documents/directives'); ?>

    <!-- The Javascript and CSS scripts -->
    <?php    echo $this->element('documents/includes'); ?>

</body>
</html>
