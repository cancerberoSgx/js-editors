
/**
 * @module jseditors-util
 */


(function(ns){
	 
/**
 * @class util
 * @static
 */
ns.util = {
	noop: function(){},
	methodNotImplemented: function(){throw ' methodNotImplemented searchme_for_breakpoint'; }
	
}; 


/* utilities needed to implement using some library like jquery, underscore, etc. 
 * Currently provided by the user - see test/*.html for jquery and other implementations. 
 * We want to separate dependencies here because 1) we dont want to force the user to some 
 * particular DOM library like jquery, 2) editor implementations may even not be html ones 
 * but other (think on node - desktop) 
 */
_.extend(ns.util, {
	
	/**
	 * setHtml: function(el, str). User must provide using jquery or other. See test.sgxjseditors.html. 
	 * @method setHtml
	 * @static
	 */
	setHtml: function(el, str) {
		el.innerHTML=str;  
	}
	/**
	 * gets or sets the value of an input element. like jquery's val()
	 * @method val
	 * @static
	 */
,	val: function(el, val) {}
//	/**
//	 * setValue: function(el, val). User must provide using jquery or other. See test.sgxjseditors.html. 
//	 * @method setValue
//	 */
//,	setValue: ns.util.noop
//	/**
//	 * getValue: function(el). User must provide using jquery or other. See test.sgxjseditors.html. 
//	 * @method getValue
//	 */
//,	getValue: ns.util.noop
	/**
	 * getById: function(elId). User must provide using jquery or other. See test.sgxjseditors.html. 
	 * @method getById
	 * @static
	 */
,	getById: function(elId) {
		return document.getElementById(elId);
	}
	/**
	 * get or sets an element's attribute. It basically works the sames as jquery's
	 * @method attr
	 * @static
	 */
,	attr: function(el, attrName, val) {}
}); 




/**
 * OOP related utilities based on underscorejs. Defines a new class inside the given namespace ns. 
 * If no constructor is given, then a default constructor that calls super() will be made.
 * 
 * @method defineClass
 * @static  
 * @return the new class constructor function. 
 * @param ns 
 * @param constructor Function. Optional. If falsy then a new function that calls super() is used. 
 * @author sgurin
 */
ns.util.defineClass = function(ns, className, parentClass, constructor, instanceFields, classFields) {
	var noop = function(){}; 
	parentClass = parentClass || noop;
	if(_.isString(parentClass) && ns)
		parentClass=ns[parentClass]; 
	instanceFields=instanceFields||{}; 
	classFields = classFields || {}; 
	constructor = constructor || function() {
		parentClass.apply(this, arguments); // super()
	}; 
	if(className && ns) {
		ns[className]=constructor;	
	}
	 
	var newClass = constructor;//className ? ns[className]; 
	
	var extend = jseditors.util.extend; 
	//extends the static/class properties
	extend(newClass, parentClass);

	//extends given static properties classFields
	extend(newClass, classFields);
	
	//extends the instance properties
	extend(newClass.prototype, parentClass.prototype); 
	
	//extends given instance properties instanceFields
	extend(newClass.prototype, instanceFields);		
	
	//create a super shortcut for easy accessing the super class for example when calling super in constructor.  
//	newClass.prototype.__super = parentClass;
	
	return newClass; 
}; 
ns.util.extend = function(dest, src, except){
	for(var i in src) {
		if(!_.contains(except, i)) {
			dest[i] = src[i]; 
		}
	}
	return dest; 
}

ns.util.logerror = function(msg, e){
	console.error(msg, e); 
}; 

})(jseditors);