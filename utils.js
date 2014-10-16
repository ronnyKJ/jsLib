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

	var utils = {
		mix : function(target, source){
			var src = Array.prototype.slice.call(arguments);
			var isCover = true;
			if( utils.isBoolean(arguments[ arguments.length-1 ]) ){
				src = Array.prototype.slice.call(arguments, 1, arguments.length-1);
				isCover = arguments[ arguments.length-1 ];
			}

			var i, attr, tmp;
			for (i = 0; i < src.length; i++) {
				tmp = src[i];
				for(attr in tmp){
					if( isCover || !target.hasOwnProperty(attr) ){
						target[ attr ] = tmp[ attr ];
					}
				}
			};
			return target;
		},

		copy : function(obj){
            if(typeof obj !== 'object') return obj;
            if(typeof obj === 'function') return null;
            return JSON.parse(JSON.stringify(obj));
		},
	};

    (['String', 'Function', 'Array', 'Number', 'RegExp', 'Object', 'Boolean']).map(function(type){
    	utils[ 'is' + type ] = function(obj){
    		return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    	}
    });

	exports.Utils = utils;

})(window);



/***** Test ****/
var Test = (function(){
	var result = Utils.isBoolean(false);
	// console.log( result );

	var a = {
		x:1
	};

	var b = {
		x:2,
		y:3
	};

	var c = {
		x:2,
		y:3,
		z:4
	};

	var r = Utils.mix(a, b, c);
	console.log(r);
})();

