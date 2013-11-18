

/**
 * abstract base classes for the Editor framework model. 
 * @module jseditors-base
 */


(function(ns){
	 

/**
 * Main Abstract Editor class. An editor is an object that knows how to 
 * 1) represent the state of some object or value in a UI (load()) 
 * 2) let the user edit interactively the value and get back this edited value (flush())
 * 3) 
 * @class Editor
 * @constructor
 */
/**
 * the name of this editor, must be unique across all the framework.
 * @property name 
 * @type String 
 */
/**
 * The value being edited by this editor. Normally it won't be a copy and the editor is able to modify it to reflect current editor state when you call flush
 * @property value 
 * @type Any
 */
/**
 * Default: false. If true the user won't be able to edit any value. For example a String editor will show a span HTML element instead input or textarea for presenting a string.
 * @property readonly 
 * @type boolean 
 */
///**
// * reference to the main namespace. 
// * @property ns 
// */
ns.util.defineClass(ns, "Editor", null /*has no parent*/, 
		
	function(config) {
		_.extend(this, config);
//		this.ns = ns;
	}

,	{
		name: null
		/**
		 * @method canEdit
		 * @param value {Any}
		 * @return true if this editor can edit a type of the given object
		 */
	,	canEdit: ns.util.noop 
		/**
		 * @method canEditType
		 * @param type {String}
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
		 * it 'flushes' the current GUI state returning this value and updating the 'value' property
		 *  
		 * This method signature is flexible. For example one implementation can return 
		 * the value synchronously and other implementation can choose to flush 
		 * asynchronously for example returning a promise/deferred object. 
		 * 
		 * @method flush	 
		 * @return the updated value
		 */
	,	flush: ns.util.noop 
	
		/**
		 * returns a unique id for html els
		 * @method buildUniqueId
		 */
	,	buildUniqueId: function() {
			return _.uniqueId('jseditors_'+this.name); 
		}
	}
); 

})(jseditors);