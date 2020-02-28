var sciCoords, hicksCoords, kohlCoords, parrishCoords;
var sciCenter, hicks, kohlberg, parrish;
var sciString, hicksString, kohlString, parrishString;
var sciWindow, hicksWindow, kohlWindow, parrishWindow;

sciCoords = [
  {lat: 39.907602, lng: -75.355435},
  {lat:39.907138, lng:-75.356310},
  {lat:39.906869, lng:-75.356071},
  {lat:39.906721, lng:-75.356379},
  {lat:39.906451, lng:-75.356152},
  {lat:39.906346, lng:-75.356338},
  {lat:39.906088, lng:-75.356137},
  {lat:39.906253, lng:-75.355753},
  {lat:39.906389, lng:-75.355889},
  {lat:39.906620, lng:-75.355434},
  {lat:39.906785, lng:-75.355589},
  {lat:39.907161, lng:-75.355014}
];

hicksCoords = [
	{lat: 39.906861, lng: -75.354643},
	{lat: 39.906713, lng: -75.354508},
	{lat: 39.906930, lng: -75.354107},
	{lat: 39.907073, lng: -75.354244}
];

kohlCoords = [
	{lat: 39.905776, lng: -75.355142},
	{lat: 39.905467, lng: -75.354855},
	{lat: 39.905529, lng: -75.354675},
	{lat: 39.905772, lng: -75.354901},
	{lat: 39.905895, lng: -75.354689},
	{lat: 39.905788, lng: -75.354579},
	{lat: 39.905876, lng: -75.354431},
	{lat: 39.906072, lng: -75.354624}
];
parrishCoords = [
	{lat: 39.905402, lng: -75.353605},
	{lat: 39.904828, lng: -75.354640},
	{lat: 39.905045, lng: -75.354824},
	{lat: 39.905135, lng: -75.354646},
	{lat: 39.905055, lng: -75.354564},
	{lat: 39.905191, lng: -75.354328},
	{lat: 39.905410, lng: -75.354525},
	{lat: 39.905514, lng: -75.354346},
	{lat: 39.905311, lng: -75.354158},
	{lat: 39.905426, lng: -75.353899},
	{lat: 39.905506, lng: -75.353983},
	{lat: 39.905606, lng: -75.353803}
];

sciCenter = new google.maps.Polygon({
  paths: sciCoords,
  strokeColor: '#FF0000',
  strokeOpacity: 0.5,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35
});

hicks = new google.maps.Polygon({
	paths: hicksCoords,
	strokeColor: '#FF0000',
	strokeOpacity: 0.5,
	strokeWeight: 2,
	fillColor: '#FF0000',
	fillOpacity: 0.35
});

kohlberg = new google.maps.Polygon({
	paths: kohlCoords,
	strokeColor: '#FF0000',
	strokeOpacity: 0.5,
	strokeWeight: 2,
	fillColor: '#FF0000',
	fillOpacity: 0.35
});


parrish = new google.maps.Polygon({
	paths: parrishCoords,
	strokeColor: '#FF0000',
	strokeOpacity: 0.5,
	strokeWeight: 2,
	fillColor: '#FF0000',
	fillOpacity: 0.35
});



var sciString = 		'<div id="content">'+
										'<div id="siteNotice">'+
										'</div>'+
										'<h1 id="firstHeading" class="firstHeading">Sci Center</h1>'+
										'<div id="bodyContent">'+
										'<p>Sci Center contains 72 access points</p>'+
										'</div>'+
										'</div>';

var hicksString = 	'<div id="content">'+
										'<div id="siteNotice">'+
										'</div>'+
										'<h1 id="firstHeading" class="firstHeading">Hicks</h1>'+
										'<div id="bodyContent">'+
										'<p>Hicks contains 10 access points</p>'+
										'</div>'+
										'</div>';


var kohlString = 		'<div id="content">'+
										'<div id="siteNotice">'+
										'</div>'+
										'<h1 id="firstHeading" class="firstHeading">Kohlberg</h1>'+
										'<div id="bodyContent">'+
										'<p>Kohlberg contains 35 access points</p>'+
										'</div>'+
										'</div>';

var parrishString = '<div id="content">'+
										'<div id="siteNotice">'+
										'</div>'+
										'<h1 id="firstHeading" class="firstHeading">Parrish</h1>'+
										'<div id="bodyContent">'+
										'<p>Kohlberg contains 117 access points</p>'+
										'</div>'+
										'</div>';







var sciWindow = new google.maps.InfoWindow({
	position: {lat: 39.907602, lng: -75.355435},
	content: sciString
});

var kohlWindow = new google.maps.InfoWindow({
	position: {lat: 39.905831, lng: -75.354893},
	content: kohlString
});

var hicksWindow = new google.maps.InfoWindow({
	position: {lat: 39.906861, lng: -75.354643},
	content: hicksString
});

var parrishWindow = new google.maps.InfoWindow({
	position: {lat: 39.905402, lng: -75.353605},
	content: parrishString
});



sciCenter.addListener("mouseover",function(){
	sciWindow.open(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});
sciCenter.addListener("mouseout",function(){
	sciWindow.close(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});

hicks.addListener("mouseover",function(){
	hicksWindow.open(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});
hicks.addListener("mouseout",function(){
	hicksWindow.close(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});

kohlberg.addListener("mouseover",function(){
	kohlWindow.open(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});
kohlberg.addListener("mouseout",function(){
	kohlWindow.close(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});

parrish.addListener("mouseover",function(){
	parrishWindow.open(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});
parrish.addListener("mouseout",function(){
	parrishWindow.close(map,this);
	//this.setOptions({fillColor: "#00FF00"});
});


function toggleAPs() {
	sciCenter.setVisible(!sciCenter.getVisible());
	kohlberg.setVisible(!kohlberg.getVisible());
	hicks.setVisible(!hicks.getVisible());
	parrish.setVisible(!parrish.getVisible());
}

function toggleHeat() {
	var x = document.getElementById('heatImage');
	if (x.style.display != 'none') {
		x.style.display = 'none'
	}
	else {
		x.style.display = 'block'
	}
}


function python(mac) {
	url = '/scripts?' + $.param({addr: mac})
	fetch(url).then(function(response) {
		var img = 'images/wifi_mac.png';
		initialize(img);
	})
}
