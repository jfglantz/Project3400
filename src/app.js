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
				document.getElementById("inVal").classList.add('inputError');
				errorHandler(1);
			}
			else if(app.inVal<0){ 				//if less than 0 zero, error
				document.getElementById("inVal").classList.add('inputError');
				errorHandler(4);
			}
			else {
				document.getElementById("inVal").classList.remove('inputError');
				this.inValError="";
			}
		},
		inUnitOnChange: function(){
		},
		outUnitOnChange: function(){
		},
		convert: function(){
			if(errorCheck()){
				this.output="";
				this.outputError="INVALID INPUT"
				return;
			}
			this.outputError="";
			this.output=this.outVal + " " + this.outUnit;
		},
		clear: function(){ //revert to intial load state
			this.output="";
			this.inUnit="";
			this.outUnit="";
			this.inVal=null;
			this.inputArray="";
			this.outVal=null;
			this.inValError="";
			this.outputError="";
			this.inUnitError="";
			this.outUnitError="";
			document.getElementById("outUnit").classList.remove('inputError');
			document.getElementById("inUnit").classList.remove('inputError');
			document.getElementById("inVal").classList.remove('inputError');
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
		document.getElementById("inVal").classList.add('inputError');
		isError=true;
		errorHandler(1);
	}
	else document.getElementById("inVal").classList.remove('inputError');
	if(app.inVal<0){
		document.getElementById("inVal").classList.add('inputError');
		isError=true;
		errorHandler(4);
	}
	else document.getElementById("inVal").classList.remove('inputError');
	if(!isUnit(app.inUnit)){
		document.getElementById("inUnit").classList.add('inputError');
		isError=true;
		errorHandler(2);
	}
	else {
		document.getElementById("inUnit").classList.remove('inputError');
		app.inUnitError="";
	}
	if(!isUnit(app.outUnit)){
		document.getElementById("outUnit").classList.add('inputError');
		isError=true;
		errorHandler(3);
	}	
	else {
		document.getElementById("outUnit").classList.remove('inputError');
		app.outUnitError="";
	}

	return isError;
}

function errorHandler(code) { //output error messages
	switch(code){
		case 0:
			app.inValError="";
			break;	
		case 1:
			app.inValError="invalid input";
			break;
		case 2:
			app.inUnitError="invalid unit";
			break;
		case 3:
			app.outUnitError="invalid unit";
			break;
		case 4: 
			app.inValError="less than 0";
			break;
		default:
			app.outputError="unknown error";
			break;
	}
	return;
}

function isUnit(unit){ //verfiy unit input validity
	for(i=0;i<metricbig.length; i++)
		if(unit === metricbig[i][0] || unit === metricbig[i][1]+"meters") return true;

	for(i=0;i<imperialDistances.length; i++)
		if(unit === imperialDistances[i][0] || unit === imperialDistances[i][1]) return true;
	return false;
}



