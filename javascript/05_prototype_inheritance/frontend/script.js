function start() {
	
	let helloWorld = function() {
		this.name = "World";
		this.message = "Hello";
	}
	
	let helloInstance = new helloWorld();
	
	helloWorld.prototype.name = "Jaska";
	helloWorld.prototype.message2 = "Goodbye";
	
	console.log(helloInstance.name);
	console.log(helloInstance.message);
	console.log(helloInstance.message2);
	console.log(helloInstance);
	helloInstance.message2 = "This works";
	console.log(helloInstance.message2);

	let object_test = {
		myVar:10,
		myFunction:function() {
			return this.myVar+10;
		}
	}
	
	console.log(object_test);

	let object1 = Object.create(object_test);
	let object2 = Object.create(object_test);
	console.log(object1);
	console.log(object2);
	object1.myVar = 15;
	object2.myVar = 100;
	console.log(object_test.myVar);
	console.log(object1.myFunction());
	console.log(object2.myFunction());
	object_test.myVar = 50;
	
	console.log(Array.prototype)
}