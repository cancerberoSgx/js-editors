(function(ns) {
	
	
	/**
	 * A concrete class for editing simple String values using input or textarea
	 * html elements. Supports readonly mode and configurable attributes and typecasting for easily extend new types.
	 * 
	 * @class InputEditor
	 * @extends HTML5AbstractEditor
	 */
	/**
	 * @property readonly {Boolean}
	 */
	/**
	 * @property isTextArea
	 */
	/**
	 * Type attribute value for html input elements. It only applies for input
	 * el.
	 * 
	 * @property type {String}
	 */
	/**
	 * The tag name to use to show the value. It only applies for readonly==true
	 * 
	 * @property tagName
	 */
	ns.util.defineClass(ns, "InputEditor", ns.HTML5AbstractEditor, null /* constructor */
	, { /* instance fields */
		name : 'InputEditor',
		canEdit : function(obj) {
			return _.isString(obj);
		},
		canEditType : function(type) {
			return type === ns.types.NUMBER;
		},
		render : function() {
			this.renderTemplate(ns.templates.InputEditor);
		},
		flush : function() {
			if (this.readonly) {
				return this.parseValue(this.value);
			} else {
				// works both for input and text area elements. 
				return this.parseValue(ns.util.val(this.getInputEl())); 
			}
		}
		/**
		 * This editor can be extensible to return custom value type. By default
		 * it will return with no casting
		 * 
		 * @see InputNumberEditor
		 * @method parseValue
		 * @param val
		 */
		,
		parseValue : function(val) {
			return val;
		}
	});

	
	
	
	/**
	 * Extends InputEditor specially or editing numbers performing stuff like
	 * retuning the casted number value on flush(), or showing type="number", in
	 * the generated markup.
	 * 
	 * @class InputEditorNumber
	 * @extends InputEditor
	 */
	ns.util.defineClass(ns, "InputEditorNumber", ns.InputEditor
	/* constructor */
	, function() {
		// first default options and then user overriding calling super()
		this.type = 'number';
		this.isTextArea = false;
		ns.InputEditor.apply(this, arguments);
	}

	, { /* instance fields */
		name : 'InputNumberEditor',
		parseValue : function(val) {
			return parseFloat(val + "");
		},
		canEdit : function(obj) {
			return _.isNumber(obj);
		},
		canEditType : function(type) {
			return type === ns.types.NUMBER;
		}
	});
	
	
	
	/**
	 * Extends InputEditor specially or editing numbers performing stuff like
	 * retuning the casted number value on flush(), or showing type="number", in
	 * the generated markup.
	 * 
	 * @class InputEditorNumber
	 * @extends InputEditor
	 */
	ns.util.defineClass(ns, "InputColorEditor", ns.InputEditor
	/* constructor */
	, function() {
		// first default options and then user overriding calling super()
		this.type = 'color';
		this.isTextArea = false;
		ns.InputEditor.apply(this, arguments);
	}

  , { /* instance fields */
		name : 'InputColorEditor',
		parseValue : function(val) {
			return parseFloat(val + "");
		},
		canEdit : function(obj) {
			return _.isNumber(obj);
		},
		canEditType : function(type) {
			return type === ns.types.NUMBER;
		}
	});
	

	/**
	 * A boolean editor supporting the following types: 1) checkbox 2) 2-item
	 * select list: true, false w configurable labels.
	 * 
	 * @class InputEditorBoolean
	 * @extends InputEditor
	 */
	ns.util.defineClass(ns, "InputEditorBoolean", ns.HTML5AbstractEditor, null /* constructor */
	, { /* instance fields */
		name : 'InputEditorBoolean',
		canEdit : function(obj) {
			return _.isBoolean(obj);
		},
		canEditType : function(type) {
			return type === ns.types.BOOLEAN;
		},
		render : function() {
			return this.renderTemplate(ns.templates.InputEditorBoolean);
		},
		flush : function() {
			if (this.readonly) {
				return this.parseValue(this.value);
			} else {
				// works both for input and text area elements.
				return this.parseValue(ns.util.val(this.getInputEl())); 
			}
		}
	});

	

})(jseditors);