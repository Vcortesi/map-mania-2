// Variables
let map;
var i = 0;
var lat;
var lng;

var places = [
  {content:"Chicago, Illinois",lat:41.878113,lng:-87.629799},  
  {content:"Cody, Wyoming",lat:44.527130,lng:-109.056351}, 
  {content:"South  Korea",lat:35.907757,lng:127.766922},  
  {content:"Tokyo, Japan",lat:35.689487,lng:139.691711},   
  {content:"London, England",lat:51.507351,lng:-0.127758},    
  {content:"Rome, Italy",lat:41.902782,lng:12.496365},    
  {content:"Otago, New Zealand",lat:-45.479069,lng:170.154755},  
  {content:"Grand Canyon",lat:36.106964,lng:-112.112999},  
  {content:"Angkor, Cambodia",lat:13.376220,lng:102.463722},
  {content:"Herrand, Sweden",lat:60.128162,lng:18.643501},
]

function initMap() {
  alert("Thank-you for wanting to play this game!\nIn order to play, look for the 10 hidden markers\nLook at the hints tab for hints on whether or not you are hot or cold!\nIf you decide to give up, click on the cheat button in the top right corner!")

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  google.maps.event.addListener(map,'idle', function() {
    updateGame()
  });

  // Listener for grabbing the current screens lat and long and
  // compares current lat and long to the hidden markers lat and long
  google.maps.event.addDomListener(map, 'idle', function(event) {
    
    var lat = map.data.map.center.lat();
    var lng = map.data.map.center.lng();
    // If-statements for the hints
    if(distance(lat,lng,places[i].lat,places[i].lng)>1) {
      initHint("SUPER HOT")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>500 && distance(lat,lng,places[i].lat,places[i].lng)<1000) {
      initHint("Hot")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>1000 && distance(lat,lng,places[i].lat,places[i].lng)<2000) {
      initHint("Warm")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>2000 && distance(lat,lng,places[i].lat,places[i].lng)<3000) {
      initHint("Cold")
    }
    if(distance(lat,lng,places[i].lat,places[i].lng)>3000) {
      initHint("SUPER COLD")
    }
  });

}

// Function that iterates through all the hidden markers and sets score to 10
function cheat() {
  for(let j = 0; j<11; j++){
    var marker = new google.maps.Marker({content:places[j],position:places[j], map:map});
  }

  initScore(10);
  alert("You Won! But at what cost? Press f5 to refresh the game")
}

// Function that handles all of the markers that iterate through i
// The function also resets map zoom and center
function updateGame(){
  var zoomLvl = map.getZoom()
  console.log(zoomLvl);
  
  
  if (map.getBounds().contains(places[i])&&((zoomLvl==8)||(zoomLvl==9)||(zoomLvl==10))) {
    var marker = new google.maps.Marker({position:places[i], map:map});
    var infoWindow = new google.maps.InfoWindow(places[i]);

    marker.addListener('click',function() {
      infoWindow.open(map, marker);
    });
    
    i++;
    initScore(i);
    alert("Congradulation! You just found marker number: " + (i))

    map.setCenter( {lat: -34.397, lng: 150.644 });
    map.setZoom(6) 
  }
}

// This distance function was derived from https://www.geodatasource.com/developers/javascript
function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}

// Function that sets hint value
function initHint(hint) {
  document.getElementById("hint-id").value = hint;  
}

// Function that sets score value
function initScore(score) {
  document.getElementById("score-id").value = score; 
}

function initApplication() {
  console.log("Map Mania 2 Starting Up!")
}