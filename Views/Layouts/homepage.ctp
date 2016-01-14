<?php
/**********************************************************************************************************************************
*	This file is the layout file for the home page. 
*
*
***********************************************************************************************************************************/
?>

<!DOCTYPE html>
<html lang="en">
<head>

	<?php echo $this->Html->charset(); ?>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<meta property="og:url"                content="http://www.cadwolf.com" />
	<meta property="og:type"               content="website" />
	<meta property="og:title"              content="CADWOLF - A web based mathematics and engineering platform" />
	<meta property="og:description"        content="CADWOLF is a web based mathematics and engineering platform. Alternative to Word, Excel, Mathcad and Matlab" />
	<meta property="og:image"              content="http://www.cadwolf.com/Images/blacklogo.jpg" />

    <title>CADWOLF - A web based mathematics and engineering platform</title>


    <?php
		echo $this->Html->meta('icon');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Cinzel');
		echo $this->Html->css('http://fonts.googleapis.com/css?family=Lato:300');
		echo $this->Html->meta('favicon.ico', '/favicon.png', array('type' => 'icon'));
		echo $this->fetch('meta');
		echo $this->fetch('css');
		echo $this->Html->script('http://connect.facebook.net/en_US/all.js');
		echo $this->fetch('js');
    ?>
    <!-- Bootstrap Core CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css" type="text/css">

    <!-- Custom Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic,900,900italic' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Cinzel' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" type="text/css">

    <!-- Plugin CSS -->
    <link rel="stylesheet" href="css/animate.min.css" type="text/css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="css/cadwolf.homepage.css" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
    
    <!-- Go to www.addthis.com/dashboard to customize your tools -->
    <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-544ab34c65dd3a23" async="async"></script>

<body>
<?php
?>
<?php 	echo $this->element('analyticstracking'); 
		$thisurl=Router::url(null, true);
		echo $this->element('homebody');
?>
</body>
</html>

<?php
