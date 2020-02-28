var map, heatmap, overlay, img, bounds
heatmapOverlay.prototype = new google.maps.OverlayView();

function initialize(imgPath) {

	var swBound = new google.maps.LatLng(39.902541, -75.357601);
	var neBound = new google.maps.LatLng(39.909508, -75.351278);
 	bounds = new google.maps.LatLngBounds(

		//new google.maps.LatLng(62.281819, -150.287132),
		//new google.maps.LatLng(62.400471, -150.005608));
		//new google.maps.LatLng(39.902725, -75.349260),
		//new google.maps.LatLng(39.908450, -75.35727));
		//works for kohlberg map
		//new google.maps.LatLng(39.902725, -75.35727),
		//new google.maps.LatLng(39.908450, -75.349260));

		new google.maps.LatLng(39.902541, -75.357601),
		new google.maps.LatLng(39.909508, -75.351278))
	var srcImage = imgPath


    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.906912, lng: -75.354920},
        //center: {lat: 62.323907, lng: -150.109291},
        scrollwheel: false,
        zoom: 17,
    });

	overlay = new heatmapOverlay(bounds, srcImage, map);

	// Obtain signal strength on click
	google.maps.event.addListener(map, 'click', function (e) {
	    var loc = e.latLng;

	  	var latfrac = (neBound.lat() - loc.lat()) / (neBound.lat() - swBound.lat());
	  	var lngfrac = (neBound.lng() - loc.lng()) / (neBound.lng() - swBound.lng());

	  	if (latfrac < 0 || lngfrac < 0 || latfrac >= 1 || lngfrac >= 1) {
			return;
	  	}

	  	var rendersize = 1000; // Size of image

	  	var x = (1-lngfrac) * rendersize;
	  	var y = latfrac * rendersize;

	  	var canvas = document.createElement('canvas');
	  	canvas.width = rendersize;
	  	canvas.height = rendersize;
	  	ctx = canvas.getContext('2d');
	  	ctx.drawImage(img, 0, 0, rendersize, rendersize);
	  	var pixelData = ctx.getImageData(x, y, 1, 1).data;

	  	var r = pixelData[0];
	  	var g = pixelData[1];
	  	var b = pixelData[2];

	  	val = 50*(Math.acos(b/255.0)*2/Math.PI) - 90
	  	alert(val)
  	});

	sciCenter.setMap(map);
	hicks.setMap(map);
    kohlberg.setMap(map);
	parrish.setMap(map);

}

/** @constructor */
function heatmapOverlay(bounds, image, map) {

        // Initialize all properties.
        this.bounds_ = bounds;
        this.image_ = image;
        this.map_ = map;

        // Define a property to hold the image's div. We'll
        // actually create this div upon receipt of the onAdd()
        // method so we'll leave it null for now.
        this.div_ = null;

        // Explicitly call setMap on this overlay.

        try {
          this.setMap(map);
        }
        catch(err){
          alert(err)
        }
}

/**
 * onAdd is called when the map's panes are ready and the overlay has been
 * added to the map.
 */
heatmapOverlay.prototype.onAdd = function() {

    var div = document.createElement('div');
    div.style.borderStyle = 'none';
    div.style.borderWidth = '0px';
    div.style.position = 'absolute';
	div.setAttribute('id','heatImage');

    // Create the img element and attach it to the div.
    img = document.createElement('img');
    img.src = this.image_;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.position = 'absolute';
    img.style.opacity = 0.5;
    img.style.filter = 'alpha(opacity=50)';
    div.appendChild(img);

    this.div_ = div;

    // Add the element to the "overlayLayer" pane.
    var panes = this.getPanes();
    panes.overlayLayer.appendChild(div);
};

heatmapOverlay.prototype.draw = function() {

    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    var overlayProjection = this.getProjection();

    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
    var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

    // Resize the image's div to fit the indicated dimensions.
    var div = this.div_;
    div.style.left = sw.x + 'px';
    div.style.top = ne.y + 'px';
    div.style.width = (ne.x - sw.x) + 'px';
    div.style.height = (sw.y - ne.y ) + 'px';
    console.log("WIDTH: " + div.style.width)
    console.log("HEIGHT: " + div.style.height)
};

  // The onRemove() method will be called automatically from the API if
  // we ever set the overlay's map property to 'null'.
heatmapOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};


function getPoints(data) {

  var heatMapData = [];
  for (var i=0; i<data.length; i++) {
    //console.log('New Point')
    var max = -1000;
    for (var j=0; j<data[i]['wifi'].length; j++) {
      if (parseFloat(data[i]['wifi'][j]['DBM']) > max && data[i]['wifi'][j]['SSID'] == 'eduroam') {

        max = parseFloat(data[i]['wifi'][j]['DBM']);

      }
    }

    max = Math.pow(10,max/10) //Convert to mW
    //console.log(data[i]['Latitude'], data[i]['Longitude'])
    heatMapData[i] = {location: new google.maps.LatLng(data[i]['Latitude'],data[i]['Longitude'])};
    console.log(i)
  }
  return heatMapData;
}

function readJSON() {
  var pts;

  $.ajax({
    url: 'wifi_gps_data.json',
    dataType: 'json',
    async: false,
    success: function(json){
      pts = getPoints(json['JsonData'])
  }});
  return pts;
}

google.maps.event.addDomListener(window, 'load', function(){
	initialize('images/wifi_final.png')
});
