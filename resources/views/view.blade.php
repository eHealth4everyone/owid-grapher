<!doctype html>
<html class="no-js" lang="">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>Our World In Data - Chart Builder</title>
		<meta name="description" content="">
		<meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'>
		
		<link rel="apple-touch-icon" href="apple-touch-icon.png">
		<!-- Place favicon.ico in the root directory -->

		<link href="{{ asset('css/libs/bootstrap.min.css') }}" rel="stylesheet" type="text/css" />    
		<link href="{{ asset('css/libs/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet" type="text/css" />
		<!-- <link href="http://code.ionicframework.com/ionicons/2.0.0/css/ionicons.min.css" rel="stylesheet" type="text/css" />  -->  
		
		<link href="{{ asset('css/nv.d3.css') }}" rel="stylesheet" type="text/css">
		<link href="{{ asset('css/main.css') }}" rel="stylesheet" type="text/css">
		
		@yield('styles')

		<script src="{{ asset('js/libs/modernizr-2.8.3.min.js') }}"></script>
		
		<style>

			/*.nv-point {
				fill-opacity: 1 !important;
			}
			path.nv-line {
				opacity: 0;
			}*/

		</style>

	</head>
	<body>
		<!--[if lt IE 9]>
			<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

		<div class="wrapper">
			@yield('content')
		</div>

		<script>
			var Global = {};
			Global.rootUrl = "{!! Request::root() !!}";
		</script>
		
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/libs/jquery-1.11.3.min.js"><\/script>')</script>
		
		<script src="{{ asset('js/libs/html5csv.js') }}"></script>
		<script src="{{ asset('js/libs/d3.js') }}"></script>
		<script src="{{ asset('js/libs/nv.d3.js') }}"></script>

		<script src="{{ asset('js/libs/underscore.js') }}"></script>    
		<script src="{{ asset('js/libs/backbone.js') }}"></script>    
		<script src="{{ asset('js/libs/chosen.jquery.min.js') }}"></script>    
		
		<script src="{{ asset('js/namespaces.js') }}"></script>
		
		<script src="{{ asset('js/app/App.Utils.js') }}"></script>
		
		<script src="{{ asset('js/app/models/App.Models.ChartModel.js') }}"></script>
		
		<script src="{{ asset('js/app/views/ui/App.Views.ui.ColorPicker.js') }}"></script>
		
		@yield('scripts')

		<script src="{{ asset('js/app/views/App.Views.Main.js') }}"></script>
		<script src="{{ asset('js/app/App.js') }}"></script>
		<script src="{{ asset('js/main.js') }}"></script>

		<!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
		<script>
			(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
			function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
			e=o.createElement(i);r=o.getElementsByTagName(i)[0];
			e.src='https://www.google-analytics.com/analytics.js';
			r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
			ga('create','UA-XXXXX-X','auto');ga('send','pageview');
		</script>
	</body>
</html>
