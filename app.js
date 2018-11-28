var imported = document.createElement('script');
imported.src='convEngine.js'
document.head.appendChild(imported);

var app = new Vue({
	el: '#app',
	data:{
		output:"",
		input:"",
		inputArray:"",
		inVal:5,
		inUnit:"mi",
		outUnit:"ft",
		outVal:0,
		exp:0,
	},
	methods:{
		convert: function(){
			this.inputArray=this.input.split(' ');
			this.inVal = this.inputArray[0];
			this.inUnit = this.inputArray[1];
			this.outUnit= this.inputArray[3];
			globalOutput=imperialDistToImperialDist(this.inVal, this.exp, this.inUnit, this.outUnit);
			this.output = globalOutput.val + " " + globalOutput.units;
		},
		clear: function(){
			this.output="";
			this.input="";
			this.inputArray="";
		}
	}

});
