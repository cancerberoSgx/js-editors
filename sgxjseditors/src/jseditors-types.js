

/**
 * jseditors.types is named-value collection of the types supported by the framework. Framework extensions are allowed to extend it.
 * @module jseditors-types
 */
///**
// * jseditors.types is named-value collection of the types supported by the framework. Framework extensions are allowed to extend it.  
// * @class jseditors.types
// * @static
// */

(function(ns) {
	
	/**
	 * the freamework support accessing meta information from each editable type, like native strings, boolean, number, arrays and objects, 
	 * and also other artificial types like colors, dates, etc. Type class is not instanceable, the framework provide the 'types' object dictionary. 
	 * @class types.Type
	 */
	/**
	 * @property name 
	 * @type String
	 */
	/**
	 * true if passed parameter is a valid instance for this type. 
	 * @method objectIs 
	 * @param obj
	 * @return Boolean
	 */
	ns.types = {
		STRING: {name: 'String', objectIs: ns.util.methodNotImplemented},
		OBJECT: {name: 'Object', objectIs: ns.util.methodNotImplemented}, 
		NUMBER: {name: 'Number', objectIs: ns.util.methodNotImplemented}, 
		BOOLEAN: {name: 'Boolean', objectIs: ns.util.methodNotImplemented}, 
		ARRAY: {name: 'Array', objectIs: ns.util.methodNotImplemented},
		
		DATE: {name: 'Date', objectIs: ns.util.methodNotImplemented},
		DATETIME: {name: 'DateTime', objectIs: ns.util.methodNotImplemented},
		TIME: {name: 'Time', objectIs: ns.util.methodNotImplemented},
		
		COLOR: {name: 'Color', objectIs: ns.util.methodNotImplemented},
		SELECTLIST: {name: 'Color', objectIs: ns.util.methodNotImplemented}
	};
	//ns.types.all = [ns.types.STRING, ns.types.OBJECT, ns.types.NUMBER, ns.types.BOOLEAN, ns.types.ARRAY, ns.types.COLOR]; 
	
	
	/**
	 * namespace for concrete abstract data types like color, selectionlist, etc.
	 * @class jseditors.type
	 * @static
	 */
	ns.type = {}; 
	
	
	

	/**
	 * @class type.Color
	 */
	ns.util.defineClass(ns.type, "Color", null /*has no parent*/, 
		function(r, g, b){ //constructor
			if(arguments.length==1 && _(arguments[0]).isString()) {
				//TODO accept hex strings
				_extends(this, ns.util.hexToRgb(arguments[0]));
			}
			else {
				this.red=r; 
				this.green=g; 
				this.blue=b; 
			}
		}
	,	{	/* instance fields */
			toHex: function(){
				return this.rgbToHex(this.red, this.green, this.blue);
			}//TODO
		,	toCSS: function(){}//TODO
		}
	);
	_(ns.util).extend({
		// 	hexToR:function(h) {return parseInt((cutHex(h)).substring(0,2),16)}
		// ,	hexToG:function(h) {return parseInt((cutHex(h)).substring(2,4),16)}
		// ,	hexToB: function(h) {return parseInt((cutHex(h)).substring(4,6),16)}
		// ,	cutHex: function(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
		componentToHex: function (c) {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		}
	,	rgbToHex: function (r, g, b) {
			return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
	,	hexToRgb: function (hex) {
    		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				red: parseInt(result[1], 16),
				green: parseInt(result[2], 16),
				blue: parseInt(result[3], 16)
			} : null;
		}
	}); 
	
	
	
	/**
	 * a SelectionList represents a value consisting on a selected subset (this.selection) of a total list (all). 
	 * Items can be of any type. 
	 * @class type.SelectionList
	 */
	/**
	 * @property all
	 * @type Array of Any
	 */
	/**
	 * @property selection
	 * @type Array of Any
	 */
	ns.util.defineClass(ns.type, "SelectList", null /*has no parent*/, 
		function(all, selection) { // constructor
			this.all=all;
			this.selection=selection; 
		}
	,	{/*instance fields */			
		}
	);


})(jseditors);