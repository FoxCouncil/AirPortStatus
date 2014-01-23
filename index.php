<!doctype html>
<html lang="en">
<head>

  <meta charset="utf-8">

  <title></title>
  
  <meta name="description" content="AirPortStatus">
  <meta name="author" content="Fox Diller">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css">

  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <!--[if IE]>
  <script type="text/javascript" src="excanvas.js"></script>
  <![endif]-->
  
  <style>
  body { background-color: #121212; color: #999; backface-visibility: hidden; }
  hr { border-color: #444; }
  img { vertical-align: baseline; }
  img + canvas, canvas + img { margin-left: 10px; }
  #dClock {  margin-top: 15px; }
  .col-md-4 { margin-top: 15px; }
  hr { margin-top: 25px; }
  </style>
  
</head>

<body>
  
  <div class="container">
  
	<div class="row">
	  <div class="col-md-4 text-center"><h3 id="dTitle"></h3></div>
	  <div class="col-md-4 text-center"></div>
	</div>
  	
	<hr>
	
    <div class="row">
		<div class="col-md-4 text-center"><img src="wifi.png" width="64" height="64"><canvas id="dWirelessClients" width="160" height="64"></canvas></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dWifiUPSpeed" width="120" height="32"></canvas><img id="dWifiUPSpeedSign" src="kbs.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dWifiDOWNSpeed" width="120" height="32"></canvas><img id="dWifiDOWNSpeedSign" src="kbs.png" width="32" height="32"></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dWifiUPTotal" width="140" height="32"></canvas><img id="dWifiUPTotalSign" src="b.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dWifiDOWNTotal" width="140" height="32"></canvas><img id="dWifiDOWNTotalSign" src="b.png" width="32" height="32"></div>
	</div>
	
	<hr>
	
	<div class="row">
		<div class="col-md-4 text-center"><img src="computer.png" width="64" height="64"><canvas id="dDHCPClients" width="160" height="64"></canvas></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dEthernetUPSpeed" width="120" height="32"></canvas><img id="dEthernetUPSpeedSign" src="kbs.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dEthernetDOWNSpeed" width="120" height="32"></canvas><img id="dEthernetDOWNSpeedSign" src="kbs.png" width="32" height="32"></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dEthernetUPTotal" width="140" height="32"></canvas><img id="dEthernetUPTotalSign" src="b.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dEthernetDOWNTotal" width="140" height="32"></canvas><img id="dEthernetDOWNTotalSign" src="b.png" width="32" height="32"></div>
	</div>
	
	<hr>
	
	<div class="row">
	
		<div class="col-md-4 text-center"><h2 id="dIPAddress"></h2></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dInternetUPSpeed" width="120" height="32"></canvas><img id="dInternetUPSpeedSign" src="bs.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dInternetDOWNSpeed" width="120" height="32"></canvas><img id="dInternetDOWNSpeedSign" src="bs.png" width="32" height="32"></div>
		<div class="col-md-4 text-center"><img src="up.png" width="32" height="32"><canvas id="dInternetUPTotal" width="140" height="32"></canvas><img id="dInternetUPTotalSign" src="b.png" width="32" height="32"><br><img src="down.png" width="32" height="32"><canvas id="dInternetDOWNTotal" width="140" height="32"></canvas><img id="dInternetDOWNTotalSign" src="b.png" width="32" height="32"></div>
		
	</div>
	
	<hr>
	
	<div class="row">
	
		<div class="col-md-4 text-center">
		
			<canvas id="dClock" width="168" height="36"></canvas>
			
		</div>			
		
	</div>
  
	<script type="text/javascript" src="segment-display.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js"></script>
	<script type="text/javascript" src="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="status.js"></script>
  
</body>
</html>