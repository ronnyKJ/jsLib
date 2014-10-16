/*
 *	任意对象监听和触发事件
 *	TODO:
 *		处理DOM冒泡, true & false
 *		once
 *		一次绑定多个事件，用空格隔开
 *
 *
*/

(function(exports){
	var domEvents = ['click', 'mousedown'];
	var isDomEvent = function( type ){
		return !!~domEvents.indexOf( type );
	}

	var Event = function( type, target, domEvent ){
		this.type = type;
		this.target = target;

		domEvent && (this.domEvent = domEvent);
	};

	var wrapEvent = function( type, target, handler ){
		return function( oev ){
			handler.call( target, new Event( type, target, oev ) );
		};
	}

	var addDomEvent = function( dom, type, handler ){
		dom.addEventListener( type, wrapEvent(type, dom, handler) );
	}

	var removeDomEvent = function( dom, type, handler ){
		dom.removeEventListener( type );
	}

	var EventHandler = {
		on : function( type, handler ){
			this._events = this._events || {};
			var evts = this._events[ type ] = this._events[ type ] || [];
			evts.push(handler);

			if( isDomEvent( type ) ){
				addDomEvent( this, type, handler );
			}
		},
		off : function( type, handler ){
			var evts = this._events[ type ];
			if( !evts || evts.length == 0 ) return;

			if( handler ){
				var i = evts.indexOf( handler );
				evts.splice(i, 1);
			}else{
				this._events[ type ] = [];
			}

			if( isDomEvent( type ) ){
				this.removeEventListener( type );
			}
		},
		fire : function( type, data ){
			var e;
			if( typeof type === 'string' ){
				e = new Event(type, this);
			}

			e.data = data || null;

			var self = this;
			this._events[ e.type ].forEach(function( f, i ){
				f.call( self, e );
			});

		},
		once : function( type, handler ){
			var self = this;
			var wrapHandler = function(ev){
				handler.call( self, ev );
				self.off( type, wrapHandler );
			}
			this.on( type, wrapHandler );
			self.off( type, wrapHandler );
		}
	};

	exports.EventHandler = EventHandler;

})(window);



/***** Test ****/
var Test = (function(){

	Utils.mix( Object.prototype, EventHandler );

	// normal object
	var a = {
		name : 'object'
	};
	var f = function(ev){
		console.log('not mouse event');
	};
	// a.on('hit', f);
	// a.on('hit', function(ev){
	// 	console.log(ev);
	// });
	// a.fire('hit', {a:11});
	// a.off('hit', f);
	// a.fire('hit');

	// dom object
	var e = document.getElementById('evt');
	var f1 = function( ev ){
		console.log(11);
	};
	var f2 = function( ev ){
		console.log(22);
	};
	e.on('mousedown', f1);
	e.on('mousedown', f2);
	e.off('mousedown');
	// e.fire('mousedown');

})();

