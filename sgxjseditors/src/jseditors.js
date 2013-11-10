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
	
//	console.log(SUPERROOT); 
var ns=null;
jseditors = ns = {}; 
jseditors.templates={}; 

ns.editors = {}; //main editor instance dict
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

ns.types = {STRING: 'String', OBJECT: 'Object', NUMBER: 'Number', BOOLEAN: 'Boolean', ARRAY: 'Array'};
ns.types.all = [ns.types.STRING, ns.types.OBJECT, ns.types.NUMBER, ns.types.BOOLEAN, ns.types.ARRAY]; 

ns.util = {

	/* utilities needed to implement using some library like jquery, underscore, etc. 
	 * Currently provided by the user - see test/*.html for jquery and other implementations. 
	 * We want to separate dependencies here because 1) we dont want to force the user to some 
	 * particular DOM library like jquery, 2) editor implementations may even not be html ones 
	 * but other (think on node - desktop) 
	 */

	/* OOP related utilities based on underscorejs */
	defineStaticField: function(obj, name, val, replace) {
		if(replace || !obj[name])
			obj[name]=val;
	}
	/**
	 * defines a new class inside the given namespace ns. If no constructor is given, then a default constructor that calls __super will be made. 
	 * @return the new class constructor function. 
	 */
,	defineClass: function(ns, className, parentClass, constructor, instanceFields, classFields) {
		parentClass = parentClass || ns.util.noop; 
		classFields = classFields || {}; 
		constructor = constructor || function() {
			parentClass.apply(this, arguments); // super()
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
		newClass.prototype.__super = parentClass;
		
		return newClass; 
	}

	/* misc */
,	noop: function(){}
,	buildUniqueId: function() {
		return _.uniqueId('jseditors_'+this.name); 
	}
}; 
	
/**
 * @class Editor
 * Main Abstract Editor class. 
 * 
 * Attributes: 
 * 'name' : the name of this editor, must be unique across all the framework. 
 * 'el' : the element into which to attach this editor when rendered. 
 * 'value' : the value being edited by this editor. Normally it won't be a copy and the editor is able to modify it to reflect current editor state when you call flush
 * 'readonly': Default: false. If true the user won't be able to edit any value. For example a String editor will show a span HTML element instead input or textarea for presenting a string.
 */
ns.util.defineClass(ns, "Editor", null /*has no parent*/, 
		
	function(config) {
		_.extend(this, config);//this.config=config;
		ns.registerEditor(this); 
		this.ns=ns;//reference to the workspace
//		this.init && this.init();			
	}

,	{
		name: null
//		/**
//		 * @method init
//		 */
//	,	init: ns.util.noop; 
		/**
		 * @method canEdit
		 * @return true if this editor can edit a type of the given object
		 */
	,	canEdit: ns.util.noop //function(obj){return false; }
		/**
		 * @method canEditType
		 * @return true if this editor can edit the given type
		 */
	,	canEditType: ns.util.noop //function(type){return false; }
		/**
		 * @method render
		 * renders this editor instance inside given html element (append). the
		 * visual implementation will be builded when this method is called, so
		 * editors will have a chance of being configured before.
		 */
	,	render: ns.util.noop //function(el){}//default impl, subclass must override. 
	
		/**
		 * @method flush
		 * Updates 'value' attribute value with current state of the GUI. 
		 * This method signature is flexible. For example one implementation can return 
		 * the value synchronously and other implementation can choose to flush 
		 * asynchronously for example returning a promise/deferred object		 * 
		 * @return the updated value
		 */
	,	flush: ns.util.noop //function() {return this.value;	}//default impl, subclass must override.
	}
); 