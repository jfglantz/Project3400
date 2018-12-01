var imported = document.createElement('script'); // import conversion engine
imported.src='src/convEngine.js'
document.head.appendChild(imported);

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
		inValOnChange: function(){
			if(isNaN(app.inVal)){
				document.getElementById("inVal").classList.add('inputError');
				errorHandler(1);
			}
			else if(app.inVal<0){
				document.getElementById("inVal").classList.add('inputError');
				errorHandler(4);
			}
			else {
				document.getElementById("inVal").classList.remove('inputError');
				this.inValError="";
			}
		},
		inUnitOnChange: function(){
			this.inUnitError="";
		},
		outUnitOnChange: function(){
			this.outUnitError="";
		},
		convert: function(){
			if(errorCheck()){
				this.output="";
				this.outputError="Error Invalid Input";
				return;
			}
			this.outputError="";
			this.outVal=this.inVal * 2000;
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
	directives: {
		focus: {
			inserted: function (el) {
				el.focus();
			}
		}
	}
});

function errorCheck(){
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
	else document.getElementById("inUnit").classList.remove('inputError');
	if(!isUnit(app.outUnit)){
		document.getElementById("outUnit").classList.add('inputError');
		isError=true;
		errorHandler(3);
	}	
	else document.getElementById("outUnit").classList.remove('inputError');
	if(isError) return 1;
	else {
		errorHandler(0);
		return 0;
	}
}

function errorHandler(code) {
	switch(code){
		case 0:
			app.inValError="";
			break;	
		case 1:
			app.inValError="input decimal number only";
			break;
		case 2:
			app.inUnitError="invalid distance unit";
			break;
		case 3:
			app.outUnitError="invalid distance unit";
			break;
		case 4: 
			app.inValError="value must be greater than 0";
			break;
		default:
			app.outputError="unknown error";
			break;
	}
	return;
}

function isUnit(unit){ //verfiy unit input validity
	if(unit) return true;
	else return false;
}
