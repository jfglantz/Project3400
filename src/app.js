var app = new Vue({ 		//web app object
	el: '#app',						
	data:{
		inVal:null,
		inUnit:"",
		outUnit:"",
		outVal:null,
		output:"",
		outputError:"",
		inValError:"",
		inUnitError:"",
		outUnitError:"",
	},
	methods:{
		inValOnChange: function(){      //handle changes to the value input field
			if(isNaN(app.inVal)){  				//if not a number output, error
				errorHandler(1);
			}
			else if(app.inVal<0){ 				//if less than 0 zero, error
				errorHandler(4);
			}
			else {
				document.getElementById("inVal").classList.remove('inputError');
				this.inValError="";
				this.outputError="";
			}
		},
		inUnitOnChange: function(){
		},
		outUnitOnChange: function(){
		},
		convert: function(){
			this.outputError="";
			if(errorCheck()){
				this.output="";
				this.outputError="INVALID INPUT"
				return;
			}
			var box1val = parseFloat(this.inVal);
			var userInputUnits = this.inUnit; 
			var userOutputUnits = this.outUnit;

			finalOutput = new UnitObject("",0,""); //global variable, init to dummy vals
			var inputObject = new UnitObject(box1val, 0, userInputUnits);
			var outputObject = new UnitObject(0, 0, userOutputUnits);

			convertUnits(inputObject, outputObject);
			

			normalizeExponent(finalOutput);
			outVal = finalOutput.val * Math.pow(10, finalOutput.exp);
			this.output = outVal + " " + finalOutput.units;
		},
		clear: function(){ //revert to intial load state
			this.output="";
			this.inUnit="";
			this.outUnit="";
			this.inVal=null;
			this.inputArray="";
			this.outVal=null;
			errorHandler(0);
		},

	},
	directives: { //focus on load
		focus: {
			inserted: function (el) {
				el.focus();
			}
		}
	}
});

function errorCheck(){ //call error handler with appropriate code and return error status
	var isError=false;
	if(isNaN(app.inVal)){
		isError=true;
		errorHandler(1);
	}
	else document.getElementById("inVal").classList.remove('inputError');
	if(app.inVal<0){
		isError=true;
		errorHandler(4);
	}
	else document.getElementById("inVal").classList.remove('inputError');
	if(!isUnit(app.inUnit)){
		isError=true;
		errorHandler(2);
	}
	else {
		document.getElementById("inUnit").classList.remove('inputError');
		app.inUnit=isUnit(app.inUnit);
		app.inUnitError="";
	}
	if(!isUnit(app.outUnit)){
		isError=true;
		errorHandler(3);
	}	
	else {
		document.getElementById("outUnit").classList.remove('inputError');
		app.outUnit=isUnit(app.outUnit);
		app.outUnitError="";
	}
	return isError;
}

function errorHandler(code) { //output error messages
	switch(code){
		case 0: // No Error clear all error messages
			app.inValError = app.inUnitError = app.outUnitError = app.outputError="";
			document.getElementById("outUnit").classList.remove('inputError');
			document.getElementById("inVal").classList.remove('inputError');
			document.getElementById("inUnit").classList.remove('inputError');
			break;	
		case 1: //inVal not a number 
			app.output="";
			app.inValError="invalid input";
			app.outputError="only digits and periods in value field"
			document.getElementById("inVal").classList.add('inputError');
			break;
		case 2: //inUnit invalid
			document.getElementById("inUnit").classList.add('inputError');
			app.inUnitError="invalid input";
			break;
		case 3: //outUnit invalid
			document.getElementById("outUnit").classList.add('inputError');
			app.outUnitError="invalid unit";
			break;
		case 4:  //inVal less than 
			app.output="";
			app.inValError="less than 0";
			app.outputError="positive values only"
			document.getElementById("inVal").classList.add('inputError');
			break;
		case 5: //incompatible units
			document.getElementById("inUnit").classList.add('inputError');
			document.getElementById("outUnit").classList.add('inputError');
			app.inUnitError="incompatible";
			app.UnitError="incompatible units";
			app.outputError="incompatible units";

		default: //some bad input
			app.outputError="unknown error";
			break;
	}
	return;
}

function isUnit(unit){ //verfiy unit input validity
	for(i=0; i<metricbig.length; i++){
		if(unit === metricbig[i][0] + "m" || unit === metricbig[i][1]+"meters" || unit === metricbig[i][1]+"meter") {		
			return metricbig[i][0] +"m";
		}
	}

	for(i=0; i<impDistSpell.length; i++){
		for(j=0; j<impDistSpell[i].length; j++){
			if(unit === impDistSpell[i][j])	return impDistSpell[i][0];
		}
	}

	return false;
}

var impDistSpell = [
	["in", "inch", "inches" ],
	["ft", "foot", "feet" ],
	["yd", "yard", "yards", "yds"],
	["mi", "mile", "miles", "moles"],
	["leage", "league", "leagues", "leges"]
];

