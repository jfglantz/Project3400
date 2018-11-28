var app = new Vue({
	el: '#app',
	data:{
		output:"",
		input:"",
		inputArray:"",
		inVal:5,
		inUnit:"miles",
		outUnit:"feet",
		outVal:0,
	},
	methods:{
		dump: function(){
			this.inputArray=this.input.split(' ');
		},
		convert: function(){
			this.output=this.outVal + " " + this.outUnit;
		},
		clear: function(){
			this.output="";
			this.input="";
			this.inputArray="";
		}
	}

});
