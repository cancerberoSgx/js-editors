

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
	 * @property name String
	 */
	/**
	 * @method objectIs 
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
		
		COLOR: {name: 'Color', objectIs: ns.util.methodNotImplemented}
	};
	//ns.types.all = [ns.types.STRING, ns.types.OBJECT, ns.types.NUMBER, ns.types.BOOLEAN, ns.types.ARRAY, ns.types.COLOR]; 
	
	
	/**
	 * namespace for concrete abstract data types like color, selectionlist, etc.
	 * @class jseditors.type
	 */
	//
	ns.type = {}; 
	/**
	 * @class type.Color
	 */
	ns.util.defineClass(ns.type, "Color", null /*has no parent*/, null/*constructor */
		,	{/*instance fields */
				r: 0, g: 0, b: 0
			}
	);
	/**
	 * @class type.SelectionList
	 */
	ns.util.defineClass(ns.type, "Color", null /*has no parent*/, null/*constructor */
			,	{/*instance fields */
					r: 0, g: 0, b: 0
				}
		);


})(jseditors);