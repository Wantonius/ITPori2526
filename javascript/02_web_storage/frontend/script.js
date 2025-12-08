window.onload = function() {
	if(localStorage.getItem("message")) {
		message = localStorage.getItem("message");
		local = document.getElementById("local");
		local.textContent = "In local storage:"+message;
	}
	if(sessionStorage.getItem("message")) {
		message = sessionStorage.getItem("message");
		session = document.getElementById("session");
		session.textContent = "In session storage:"+message;
	}
}

function storeToLocalStorage() {
	localStorage.setItem("message",document.getElementById("tostorage").value);
}

function storeToSessionStorage() {
	sessionStorage.setItem("message",document.getElementById("tostorage").value);
}