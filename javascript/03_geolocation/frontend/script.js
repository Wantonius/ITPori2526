function findMe() {
	
	const status = document.querySelector("#status");
	const mapLink = document.querySelector("#mapLink");
	
	mapLink.href = "";
	mapLink.textContent = "";
	
	function success(position) {
		const longitude = position.coords.longitude;
		const latitude = position.coords.latitude;
		
		status.textContent = "";
		
		mapLink.href = "https://www.openstreetmap.org/#map=18/"+latitude+"/"+longitude
		mapLink.textContent = "Latitude:"+latitude+", Longitude:"+longitude
	}
	
	function error() {
		status.textContent = "Cannot retrieve your location"
	}
	
	if(!navigator.geolocation) {
		status.textContent = "Browser doesn't support geolocation"
	} else {
		status.textContent = "Locating..."
	}
	
	navigator.geolocation.getCurrentPosition(success,error);
}