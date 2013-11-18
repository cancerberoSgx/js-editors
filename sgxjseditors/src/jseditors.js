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
/**
 * @property templates
 * @type Object
 */
ns.templates={}; 
/**
 * editors mapping by name
 * @property editors
 * @type Object
 */
ns.editors = {}; 
/**
 * @method registerEditor
 * @param editorConstructor {Function} an Editor Constructor (class)
 */
ns.registerEditor = function(editorConstructor) {
	var editorName = editorConstructor.prototype.name;
	if(!editorName) {
		ns.util.logerror('ns.registerEditor - missing editorConstructor.prototype.name: editorName'+editorName);
	}
	ns.editors[editorName]=editorConstructor;
}; 
/**
 * @method newEditor
 * @param editorName
 * @param editorConfig
 */
ns.newEditor = function(editorName, editorConfig) {
	var editorConstructor = ns.editors[editorName]; 
	if(!editorConstructor)
		return null; 
	var ed = new editorConstructor();
	_.extend(ed, editorConfig);
	return ed;
}; 
ns._editorInstances = {}; //private
/**
 * @method getEditorsForValue
 * @param value
 * @return Array of String with the names of registered editors that can edit this value 
 */
ns.getEditorsForValue = function(value) {
	var result = [];
	for(var name in ns.editors) {		
		var ed = ns._getEditorInstance(name); 
		if(ed.name && ed.canEdit(value)) {
			result.push(name); 
		}
	}
	return result; 
}; 
/**
 * @method getEditorsForType
 * @param type {String} a valid type name
 * @return Array of String with the names of registered editors that can edit given type 
 */
ns.getEditorsForType = function(type) {
	var result = [];
	for(var name in ns.editors) {		
		var ed = ns._getEditorInstance(name); 
		if(ed.name && ed.canEditType(type)) {
			result.push(name); 
		}
	}
	return result; 
}; 
ns._getEditorInstance=function(name) { //private
	//internal editor instance examples when we need to work with instances. Never returned to the user. 
	if(!ns._editorInstances[name]) {
		ns._editorInstances[name] = ns.newEditor(name, {}); 
	}
	if(!ns._editorInstances[name]) {
//		debugger;
		ns.util.logerror('_getEditorInstance null 1 - name: '+name); 
	}
	return ns._editorInstances[name]; 
}; 

///**
// * @method getEditorsForValue
// * @param value
// * @return {Editor}
// */
//ns.getEditorsForValue = function(value) {
//	var result = [];
//	for(var name in ns.editors) {
//		var ed = ns.editors[name]; 
//		if(ed.canEdit(value))
//			result.push(ed); 
//	}
//	return result; 
//}; 


})(this);