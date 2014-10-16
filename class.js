/*
 *	
 *
 *	
 *
 *	
 *
 *
*/

(function(exports){

	// var 

	var Class = function(){

	};

	Class.prototype.create = function(){

	};

	Class.prototype.extend = function(){

	};

	Class.createClass = function(name, options){
		var _class = function(){

		};

		_class.__className = name;
		
		for(var attr in options){
			if('base' in options && attr == 'base'){

			}else if(attr == '__construct'){
				options['__construct'].apply( _class,  );
				_class.apply();
			}else{
				_class.prototype[attr] = options[attr];
			}
		}

		return '';
	};

	exports.Class = Class;

})(window);



/***** Test ****/
var Test = (function(){

	var People = Class.createClass('People', {

		base : null,

		__construct : function(name, age){
			this.name = name;
			this.age = age;
		},

		say : function(){
			console.log('My name is' + this.name);
		}

	});

	var tom = new People('Tom', 3);
	tom.say();

})();

