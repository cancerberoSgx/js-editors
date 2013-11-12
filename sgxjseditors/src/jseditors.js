/* sgxjseditors - a general lightweight editor generation utility. 
 * 
 * based on html5
 *  
 * Requires underscorejs 
 * 
 * This file contains an abstract model and utlities. Then in other files like jseditors-html5 will be the concrete implementations that will extend this.
 *  
 * @author sgurin
 * 
 * Use case example: 
 * var obj = {name: 'Seba', age: 29}; 
 * var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
 * ed.render(containerEl); 
 * ...
 * $acceptButton1.click(function(e){
 *  ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 *  window.alert('Edited name='); 
 * }); 
 */


//var SUPERROOT=this; //needs to be outside the wrapper function
//(function(_, Backbone){



/**
 * @module jseditors-core
 */


(function(GLOBAL){
	 
var ns=null;

/**
 * main global variable namespace for accessing this framework
 * @class jseditors
 * @static
 */
/**
 * @property util 
 * @type util
 */
GLOBAL.jseditors = GLOBAL.jseditors || {}; 
ns = GLOBAL.jseditors;  
ns.templates={}; 

ns.editors = {}; //editors mapping. 
ns.registerEditor=function(ed) {
	ns.editors[ed.name]=ed;
}; 
ns.getEditorsFor = function(value) {
	var result = [];
	for(var name in ns.editors) {
		var ed = ns.editors[name]; 
		if(ed.canEdit(value))
			result.push(ed); 
	}
	return result; 
}; 

//ns.tyPES = {STRING: 'STRING', OBJECT: 'OBJECT', NUMBER: 'NUMBER', BOOLEAN: 'BOOLEAN', ARRAY: 'ARRAY'};
//NS.TYPEs.all = [ns.types.STRING, ns.types.OBJECT, ns.types.NUMBER, ns.types.BOOLEAN, ns.types.ARRAY]; 

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
	classFields = classFields || {}; 
	constructor = constructor || function() {
		(parentClass||noop).apply(this, arguments); // super()
	}; 
	ns[className]=constructor; 
	var newClass = ns[className]; 
	
	//extends the static/class properties
	_.extend(newClass, parentClass);

	//extends given static properties classFields
	_.extend(newClass, classFields);
	
	//extends the instance properties
	_.extend(newClass.prototype, parentClass.prototype); 
	
	//extends given instance properties instanceFields
	_.extend(newClass.prototype, instanceFields);		
	
	//create a super shortcut for easy accessing the super class for example when calling super in constructor.  
//	newClass.prototype.__super = parentClass;
	
	return newClass; 
}; 



/**
 * Main Abstract Editor class.  
 * Attributes:<br/> 
 * 'name' : the name of this editor, must be unique across all the framework. <br/>
 * 'el' : the element into which to attach this editor when rendered. <br/>
 * 'value' : the value being edited by this editor. Normally it won't be a copy and the editor is able to modify it to reflect current editor state when you call flush<br/>
 * 'readonly': Default: false. If true the user won't be able to edit any value. For example a String editor will show a span HTML element instead input or textarea for presenting a string.<br/>
 * @class Editor
 * @constructor
 */
/**
 * the name of this editor, must be unique across all the framework.
 * @property name String 
 */
/**
 * @property el HTMLElement the element into which to attach this editor when rendered.
 */
/**
 * @property value Any the value being edited by this editor. Normally it won't be a copy and the editor is able to modify it to reflect current editor state when you call flush
 */
/**
 * @property readonly Boolean Default: false. If true the user won't be able to edit any value. For example a String editor will show a span HTML element instead input or textarea for presenting a string.
 */
ns.util.defineClass(ns, "Editor", null /*has no parent*/, 
		
	function(config) {
		_.extend(this, config);//this.config=config;
		ns.registerEditor(this); 
		this.ns = ns;//reference to the main namespace.
	}

,	{
		name: null
		/**
		 * @method canEdit
		 * @return true if this editor can edit a type of the given object
		 */
	,	canEdit: ns.util.noop 
		/**
		 * @method canEditType
		 * @return true if this editor can edit the given type
		 */
	,	canEditType: ns.util.noop
		/**
		 * renders this editor instance inside given html element (append). the
		 * visual implementation will be builded when this method is called, so
		 * editors will have a chance of being configured before.
		 * @method render
		 */
	,	render: ns.util.noop  
	
		/**
		 * Updates 'value' attribute value with current state of the GUI. 
		 * This method signature is flexible. For example one implementation can return 
		 * the value synchronously and other implementation can choose to flush 
		 * asynchronously for example returning a promise/deferred object	
		 * @method flush	 
		 * @return the updated value
		 */
	,	flush: ns.util.noop 
	

	,	buildUniqueId: function() {
			return _.uniqueId('jseditors_'+this.name); 
		}
	}
); 

})(this);