var mode = 0;

window.onload = function() {
	createForm();
}

createForm = () => {
	const root = document.getElementById("root");
	const form = document.createElement("form");
	form.setAttribute("class","m-3");
	
	//Type input and label
	const typeLabel = document.createElement("label");
	typeLabel.setAttribute("for","type");
	typeLabel.setAttribute("class","form-label");
	const typeLabelText = document.createTextNode("Type");
	typeLabel.appendChild(typeLabelText);
	const typeInput = document.createElement("input");
	typeInput.setAttribute("type","text");
	typeInput.setAttribute("name","type");
	typeInput.setAttribute("id","type");
	typeInput.setAttribute("class","form-control");
	
	//Count input and label
	const countLabel = document.createElement("label");
	countLabel.setAttribute("for","count");
	countLabel.setAttribute("class","form-label");
	const countLabelText = document.createTextNode("Count");
	countLabel.appendChild(countLabelText);
	const countInput = document.createElement("input");
	countInput.setAttribute("type","number");
	countInput.setAttribute("name","count");
	countInput.setAttribute("id","count");
	countInput.setAttribute("class","form-control");
	
	//price input and label
	const priceLabel = document.createElement("label");
	priceLabel.setAttribute("for","price");
	priceLabel.setAttribute("class","form-label");
	const priceLabelText = document.createTextNode("Price");
	priceLabel.appendChild(priceLabelText);
	const priceInput = document.createElement("input");
	priceInput.setAttribute("type","number");
	priceInput.setAttribute("name","price");
	priceInput.setAttribute("id","price");
	priceInput.setAttribute("class","form-control");
	
	//Submit Button
	const submitButton = document.createElement("input");
	submitButton.setAttribute("type","submit");
	submitButton.setAttribute("id","submitbutton");
	submitButton.setAttribute("name","submitbutton");
	submitButton.setAttribute("class","btn btn-primary");
	submitButton.setAttribute("value","Add");
	
	form.append(typeLabel,typeInput,countLabel,countInput,priceLabel,priceInput,submitButton);
	form.addEventListener("submit",function(e) {
		e.preventDefault();
		addShoppingItem();
	})
	root.appendChild(form);
}

addShoppingItem = async () => {
	const typeInput = document.getElementById("type");
	const countInput = document.getElementById("count");
	const priceInput = document.getElementById("price");
	let item = {
		"type":typeInput.value,
		"count":countInput.value,
		"price":priceInput.value
	}
	let url = "/api/shopping";
	let request = {
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify(item)
	}
	if(mode) {
		url = "/api/shopping/"+mode;
		request.method = "PUT";
	}
	try {
		const response = await fetch(url,request);
		if(response.ok) {
			typeInput.value = "";
			countInput.value = "";
			priceInput.value = "";
			const submitButton = document.getElementById("submitbutton");
			submitButton.value = "Add";
			mode = 0;
			getShoppingList();
		}
	} catch (error) {
		console.log("Failed to connect to server",error)
	}
}

getShoppingList = async () => {
	try {
		const response = await fetch("/api/shopping");
		if(response.ok) {
			const list = await response.json();
			if(list) {
				populateTable(list);
			} 
		}
	} catch (error) {
		console.log("Failed to connect to server",error)
	}
} 

populateTable = (list) => {
	
}