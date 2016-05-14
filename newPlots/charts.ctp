<?php
/**********************************************************************************************************************************
*	This file is the layout file for the charts page. 
***********************************************************************************************************************************/

echo('<!DOCTYPE html>');
echo('<html>');
echo('<head>');
    echo $this->Html->charset(); 
    echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
    echo $this->fetch('css');
    echo $this->Html->meta('icon');
    echo $this->fetch('meta');
    echo $this->fetch('script');
?>
    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>

    <!-- Custom CSS -->
    <link rel="stylesheet" href="http://www.cadwolf.com/css/spectrum.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/cadwolf.chartAngular.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-default.min.css" type="text/css">
    <link rel="stylesheet" href="http://www.cadwolf.com/css/ngDialog-theme-plain.min.css" type="text/css">

<?php
echo('</head>');
echo $this->element('analyticstracking'); 
echo $this->element('plot_body'); 
echo('</html>');

?>