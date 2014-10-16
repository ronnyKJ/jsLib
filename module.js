/*
 *	AMD规范 https://github.com/amdjs/amdjs-api/wiki/AMD
 *
 *	CMD规范 https://github.com/seajs/seajs/issues/242
 *
 *	
 *
 *
*/

(function(exports){

	var _modules = {};
	window._modules = _modules;

	var define = function(id, dependencies, factory){
		if(arguments.length === 2){
			factory = dependencies;
			dependencies = [];
		}

		if(typeof factory === 'object'){
			_modules[id] = {
				value : factory,
				factory : null
			};
			return;
		}

		var deps = getDeps(dependencies);

		_modules[id] = {
			value : factory.apply({}, deps),
			factory : factory
		};
	};

	var require = function(dependencies, factory){
		var deps = getDeps(dependencies);

		factory.apply({}, deps);
	};

	var getDeps = function(dependencies){
		return dependencies.map(function(id, index){
			return _modules[id].value;
		});
	};

	exports.define = define;
	exports.require = require;
})(window);



/***** Test ****/
var Test = (function(){
	define('add', function(){
		console.log(1);
		return {
			add: function(a, b){
				return a+b;
			},
			des: 'do add'
		};
	});

	define('minus', function(){
		console.log(2);
		return {
			minus: function(a, b){
				return a-b;
			},
			des: 'do minus'
		};
	});

	define('people', {
		name : 'Tom',
		age : 3
	});

	define('num', [1, 2, 4]);

	define('main', ['add', 'minus', 'people'], function(add, minus, people){
		console.log(3);
		function test(){
			return add.add(1,5) + minus.minus(2,1);
		};

		return {
			test : test
		};
	});

	require(['add', 'minus', 'people', 'num'], function(add, minus, people, num){
		var result = add.add(2, people.age) - minus.minus(5, num[2]);

		console.log(result);
	});

	require(['main'], function(main){
		var r = main.test();
		console.log(r);
	});

	require(['main'], function(main){
		var r = main.test();
		console.log(r);
	});

})();

