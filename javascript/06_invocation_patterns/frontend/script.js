function start() {
	console.log("-------------- Method Invocation Pattern ---------");
	
	var person = {
		name:"Calvin",
		age:25,
		greet:function(){
			console.log("Hello, my name is "+this.name)
		}
	}
	
	person.greet();
	
	console.log("---------- Function Invocation Pattern ---------");
	
	person.calculateAge = function(yearsOld) {
		function calculateYearsOld() {
			return this.age + yearsOld;
		}
		console.log("I will be "+calculateYearsOld()+" years old in "+yearsOld+" years.");
	}
	
	person.calculateAge(10);

	console.log("------ Let's Fix This ------------");
	
	person.calculateAge = function(yearsOld) {
		function calculateYearsOld() {
			return this.age + yearsOld;
		}
		calculateYearsOld = calculateYearsOld.bind(this);
		console.log("I will be "+calculateYearsOld()+" years old in "+yearsOld+" years.");
	}
	
	person.calculateAge(10);

	console.log("------------- Constructor Invocation Pattern -----------");
	
	var person2 = function(name) {
		this.name = name;
	}
	
	person2.prototype.greet = function() {
		return this.name + " says hi!";
	}
	
	console.log(new person2("Calvin").greet());
	console.log(person2);
	
	console.log("------------ Apply Invocation Pattern ----------");
	
	person2.prototype.waveTo = function(who) {
		console.log(this);
		return this.name+" waves to "+who.name
	}
	
	let calvin = new person2("Calvin");
	let hobbes = new person2("Hobbes");
	let rover = Object.create({"name":"Rover"});
	
	console.log(calvin.waveTo.apply(hobbes,[calvin]));
	console.log(calvin.waveTo.apply(rover,[hobbes]));
	console.log(rover);
}