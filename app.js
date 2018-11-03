var app = new Vue({
	el: '#app',
	data:{
		output:"",
		input:"",
	},
	methods:{
		convert: function(){
			this.output=this.input;
		},
		clear: function(){
			this.output="";
			this.input="";
		}
	}

});
