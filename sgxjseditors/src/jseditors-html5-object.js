//TODO: change this file name for jseditors-object.js

(function(ns) {

	/**
	 * Abstract utility class for implementing some kind of object editor. An
	 * object editor is an editor able to edit a js object, this is a list of
	 * named-values, optionally supporting 1) property order, 2) property
	 * grouping, 3) recursiveness (object editors inside object editors).
	 * 
	 * This abstract object editor implementation support the concept of 
	 * prefixTemplate, propertyTemplate and postfixTemplate so it is easy to 
	 * build different subclases concrete subclasses table, forms, list, for presenting the properties names. 
	 * Concrete subclasses must provide a prefixTemplate (optional), propertyTemplate (required), postFixTemplate (optional). 
	 * 
	 * @extends HTML5AbstractEditor
	 * @class AbstractObjectEditor
	 */
	/**
	 * array of strings indicating the order of property by name. Properties not referenced in this array will be 
	 * rendered at the bottom on any arbitrary order
	 * @property propertyOrder
	 * @type Array
	 */
	/**
	 * @property prefixTemplate
	 * @type Function
	 */
	/**
	 * @property postfixTemplate
	 * @type Function
	 */
	/**
	 * template for each property. As context it will receive the following names: 
	 * 'propertyName', 'propertyValue', 'propertyEditor'
	 * where the most interesting one is 'propertyEditor' that is an Editor instance ready to use
	 * for editing the property value. the property template is responsible of rendering this editor in the right place.  
	 * @property propertyTemplate
	 * @type Function
	 */
	/**
	 * @property propertyTemplate
	 * @type Function
	 */
	/**
	 * a map of property configuration by name. This map may not contain all the properties and can be empty. 
	 * This ObjectEditor implementation should know how to represents not configured properties. 
	 * @see AbstractObjectEditorPropertyConfig
	 * @property properties
	 * @type Object name -> AbstractObjectEditorPropertyConfig
	 */
	ns.util.defineClass(ns, "AbstractObjectEditor", ns.HTML5AbstractEditor,
	// constructor
	null
	// dynamic properties
	, {
//		name : 'AbstractObjectEditor',
		/**
		 * map of property editors by property name. 
		 * @private
		 * @property propertyEditors
		 * @type Object
		 */
		propertyEditors: {},
		canEdit : function(obj) {
			return _.isObject(obj);
		},
		canEditType : function(type) {
			return type === ns.types.OBJECT.name;
		},
		/**
		 * return all the obejct value property names, respecting the order given by property propertyOrder
		 * @method getPropertyOrder
		 * @return Array of String
		 */
		getPropertyOrder: function(){
			var order = this.propertyOrder || [];
			for(var i in this.value) {
				if(!_.contains(order, i)) {
					order.push(i); 
				}
			}
			return order;
		},
		/**
		 * @method getPropertyEditor
		 * @param propertyName {String}
		 * @param propertyValue {String}
		 * @return Editor
		 */
		getPropertyEditor: function(propertyName, propertyValue) {
			var editor = null; 
			if(!this.propertyEditors[propertyName]) {
				var config = ( this.properties && this.properties[propertyName] ) ? this.properties[propertyName] : {};				
				if(config.editorName) {
					editor = ns.newEditor(config.editorName, config);
				}
				if(!editor) {
					var edForVal = ns.getEditorsForValue(propertyValue);
					if(edForVal && edForVal.length>0){
						var edName = edForVal[0]; //chose the first match
						editor = ns.newEditor(edName, config);
					}
				}
				this.propertyEditors[propertyName] = editor; 
			}
			editor = this.propertyEditors[propertyName]; 
			//TODO: if (! editor)
			editor.value=propertyValue;
			return editor;  
		},
		/**
		 * @method getPropertyContext
		 * @param propertyName {String}
		 * @param propertyValue {Any}
		 * @return {Object} the context for a property
		 * @protected
		 */
		getPropertyContext: function(propertyName, propertyValue) {
			var context = this.getDefaultTemplateContext();
			context.propertyName=propertyName; 
			context.propertyValue=propertyValue;
			context.propertyEditor = this.getPropertyEditor(propertyName, propertyValue); 
			return context; 
		},
		render : function() {
			var sb = [];
			var context = this.getDefaultTemplateContext();
			if(this.prefixTemplate) {
				sb.push(this.prefixTemplate(context)); 
			}
			var propertyOrder = this.getPropertyOrder(); 
			for ( var i = 0; i < propertyOrder.length; i++) {
				var propertyName = propertyOrder[i]; 
				var propertyValue = this.value[propertyName]; 
				var propertyContext = this.getPropertyContext(propertyName, propertyValue); 
				sb.push(this.propertyTemplate(propertyContext));
			}			
			if(this.postfixTemplate) {
				sb.push(this.postfixTemplate(context));
			}			
//			sb.push('<p>examplecontent</p>');
			var html = sb.join(''); 
			return this.renderHTML(html); 
//			return this.renderHTML();
		},
		flush : function() {
			if (this.readonly) {
				return this.value;
			} else {
				// works both for input and text area elements.
				var val = ns.util.val(this.getInputEl()); 
			}
		}
	});
	
	/**
	 * Configuration plain object for editor instances -  in general each Editor subclass may logically also extends this implicity Abstract Object Editor Configuration class
	 * Valid configuration properties are documented but other editor's subclasses defined config property are valid.   
	 * @class AbstractObjectEditorPropertyConfig 
	 */
	/**
	 * internationalized label for the property
	 * @property label
	 * @type String
	 */
	/**
	 * internationalized label for the property
	 * @property a valid Editor class name to use @see jseditors.editors
	 * @type String
	 */
	
	
	
	/**
	 * prove of concept implementation of AbstractObjectEditor
	 * @class ObjectEditorTable
	 */
	ns.util.defineClass(ns, "ObjectEditorTable", ns.AbstractObjectEditor, 
	function(){ //constructor
		ns.AbstractObjectEditor.apply(this, arguments); 
		this.propertyTemplate=ns.templates.ObjectEditorTableProperty;
		this.prefixTemplate = function(){return '<table>'; }; 
		this.postfixTemplate = function(){return '</table>'; }; 
	}, {//fields
		name : 'ObjectEditorTable'	
	}
	);
	

})(jseditors);