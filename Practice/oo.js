function Base(n){
	this.name = n;
}

Base.prototype.func = function() {
	console.log("In Base func, " + this.name);
};

var o = new Base("linn");
o.func();



function Tmp(n){
	this.name = n;
}

TmpProto = {
	func: function (){
		console.log("In TmpProto func, " + this.name);
	},

	func2: function(callback){
		callback(this.name);
	}
};

Tmp.prototype = TmpProto;

var t = new Tmp("linn");
t.func();

function callback(n){
	console.log("In callback " + n);
	console.log("This " + this);
}

t.func2(callback);