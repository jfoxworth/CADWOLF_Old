<?php
echo('<div id="fb-root"></div>');
echo('<div id="facebookid"></div>');
echo('<div id="container">');


	echo('<div id="Documentation_Wrapper">');

		echo('<div class="right_wrapper">');

			echo('<div class="mainblock">');
				echo('<h2>Guides and Examples</h2>');
				echo('<div class="textblock_text">');
					echo('<p>To assist users, CADWOLF provides both a user\'s guide and a list of built-in functions. The user\'s guide introduces users to the basic building blocks of CADWOLF and takes the reader ');
					echo('through all available tools. The list of built-in functions provides a quick reference for what functions are available, how to properly use them, and what conditioned produce errors.</p>');
					echo('<p>The examples below provide additional resources for the reader to learn how to use all of CADWOLF\'s functions. Clicking on a title will provide a short description of the example and clicking ');
					echo('on the icon will open that example\'s page. Each example is set so that the reader can use the file, but not edit it. This means that you can change the values, but not add or delete items.</p>');
				echo('</div>');
			echo('</div>');

			echo('<div class="example_block">');
				echo('<div class="example_link" thisaddress="http://www.cadwolf.com/Documents/Documentation/Examples/Table_and_Data">&nbsp</div>');
				echo('<div class="example_title">Simple Table and Plot</div>');
				echo('<div class="example_description">This basic example shows the user how to create a table, enter data, and then plot that data in a pie chart. There are no equations outside of the table.</div>');
			echo('</div>');
			echo('<div class="example_block">');
				echo('<div class="example_link" thisaddress="http://www.cadwolf.com/Documents/Documentation/Examples/Quadratic_Equation">&nbsp</div>');
				echo('<div class="example_title">Quadratic Equation</div>');
				echo('<div class="example_description">In this example, text blocks are used to describe the quadratic equation. Symbolic equations are set up to show a quadratic function and the solutions to it\'s ');
				echo('two roots. Then, equations are established to set the integers of a, b, and c and solve for those roots mathematically. Finally, two vectors are created to solve for the function over a given range. ');
				echo('A line chart then shows the function as created in these equations. This allows the user to visually verify where the function crosses zero.</div>');
			echo('</div>');

		echo('</div>');

	echo('</div>');

echo('</div>');


if ($loggedIn)
{ 
	echo('<div id="login_wrapper2">');
		echo('<div id="login_dropwrapper2"><div id="login_drop2">'.$this->Session->read('Auth.User.username').'</div></div>');
		echo('<div id="dropbox2">');
			echo('<div id="droplogin_image"><img width="140px" src="'.$this->Session->read('Auth.User.image').'" /></div>');
			echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Profiles/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Profile Page</a></div>');
			echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/Workspaces/'.str_replace(" ","_",$this->Session->read('Auth.User.username')).'/">Workspace</a></div>');
			echo('<div class="droplogin_line"><a href="http://www.cadwolf.com/users/logout">Log Out</a></div>');
		echo('</div>');
	echo('</div>');
} else 
{ 
	echo('<div id="login_wrapper2">');
		echo('<div id="login_dropwrapper2"><div id="login_drop2">Login</div></div>'); 
		echo('<div id="dropbox2">');
			echo('<div id="droplogin_left">');
	    		echo('<div class="droplogin_title">Traditional Login</div>');
//				    	    	echo('<input class="droplogin" id="dropname" placeholder="Name">');
//				    	    	echo('<input class="droplogin" id="droppass" placeholder="Password">');
	echo $this->Form->create('User'); 
	    	echo $this->Form->input('username', array('class' => 'half_input', 'placeholder'=>'User Name', 'label'=>false));
	    	  	echo $this->Form->input('password', array('class' => 'half_input', 'placeholder'=>'Password', 'label'=>false));
	echo $this->Form->end(__('Login')); 
			echo('</div>');
			echo('<div id="droplogin_right">');
	    		echo('<div class="droplogin_title">Facebook Login</div>');
				echo('<div id="facebook_data"></div>');
   				echo('<div id="fb_button"><fb:login-button autologoutlink="true"></div>');
			echo('</div>');
		echo('</div>');
	echo('</div>');
}


?>