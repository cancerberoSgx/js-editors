/* sgxjseditors - a general lightweight editor generation utility. 
 * 
 * based on html5
 *  
 * Requires underscorejs and backbonejs (~20kb)
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
 * 	window.alert('Edited name='); 
 * }); 
 */


//var SUPERROOT=this; //needs to be outside the wrapper function
//(function(_, Backbone){
	
//	console.log(SUPERROOT); 
var ns=null;
jseditors = ns = {}; 

ns.editors = {}; 
ns.registerEditor=function(ed) {
// ed.get('name') && ns.editors[ed.get('name'), ed];
}; 

ns.util = {

	/* utilities that may be needed to implement using some library like jquery */
	setHtml: function(el, str) {
		el.innerHTML=str;
	}

	/* OOP related utilities based on underscore */
,	defineStaticField: function(obj, name, val, replace) {
		if(replace || !obj[name])
			obj[name]=val;
	}
	/**
	 * defines a new class inside the given namespace ns. 
	 * @return the new class constructor function. 
	 */
,	defineClass: function(ns, className, parentClass, constructor, classBody, staticFields) {
		ns[className]=constructor; 
		ns[className].prototype = _.clone(parentClass.prototype);
		_.extend(ns[className].prototype, classBody); 
		ns[className].prototype["__super"]=parentClass;
		if(staticFields) 
			_.extend(ns[className], staticFields);
		return ns[className]; 
	}

	/* misc */
,	noop: function(){}
,	buildUniqueId: function() {
		return _.uniqueId('sgxjseds_'+this.name); 
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
ns.editors = ns.util.defineClass(ns, "Editor", ns.util.noop, 
		
	function(config) {
		_.extend(this, config);
//		this.config=config;
		ns.registerEditor(this); 
	}

,	{
		name: null
		/**
		 * @return true if this editor can edit a type of the given object
		 */
	,	canEdit: function(obj){return false; }
		/**
		 * renders this editor instance inside given html element (append). the
		 * visual implementation will be builded when this method is called, so
		 * editors will have a chance of being configured before.
		 */
	,	render: function(el){}
	
		/**
		 * updates 'value' attribute value with current state of the GUI
		 * 
		 * @return the updated value
		 */
	,	flush: function() {
			return this.get('value'); 
		}
	}
); 