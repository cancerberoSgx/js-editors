/* sgxjseditors - a general lightweight editor generation utility. HTML5 implementation. 
 * 
 * 
 *  Target: HTML5 capable browsers
 *  
 * @author sgurin
 * 
 */

(function(ns) {

	/**
	 * sgxjseditors - a general lightweight editor generation utility. HTML5 implementation.
	 * 
	 * Use case example:
	 * 
	 * <pre>
	 * var obj = {name: 'Seba', age: 29}; 
	 * var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
	 * ed.render(containerEl); 
	 * ...
	 * $acceptButton1.click(function(e){
	 * ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
	 * window.alert('Edited name='); 
	 * }); 
	 * </pre>
	 * 
	 * @module jseditors-html5-impl
	 */
	/**
	 * @class HTML5AbstractEditor
	 * @extends Editor base class for this html5 implementation.
	 */
	ns.util.defineClass(ns, "HTML5AbstractEditor", ns.Editor,
	function() { // constructor
		this.additionalAttrs = {};
		ns.Editor.apply(this, arguments);
	}, { // instance fields
		/**
		 * renders this editor directly into the DOM using html element this.el as the container element.
		 * @method renderHTML
		 * @param html String
		 */
		renderHTML : function(html) {
			/**
			 * the id of the generated html element for this editor.
			 * 
			 * @property elid {String}
			 */
			this.elid = this.buildUniqueId();
			ns.util.setHtml(this.el, html);
		}
		/**
		 * @method renderTemplate
		 * @param templ Function a html underscode template to render this editor.
		 */
	,	renderTemplate: function(templ) {
			var templateContext = {
				ed : this
			}; 
			var templateStr = templ(templateContext);			
			return this.renderHTML(templateStr); 
		}
		/**
		 * @method getInputEl
		 */
		,
		getInputEl : function() {
			return ns.util.getById(this.elid);
		}
		/**
		 * by default the implementation will return the html string for this editor. 
		 * @method render String
		 */
	,	render: function(){
			ns.Editor.render.apply(this, arguments);
		}

		/**
		 * additional html parameters for the input or textarea generated html element.
		 * html attributes added to this collection by the editor are id and class. User may override all of the other. In the case of class 
		 * user classes will be appended to editor's. User cannot override ids. 
		 * 
		 * @property additionalAttrs
		 * @typer {Object}
		 */
		/**
		 * @method getAdditionAttrsHTML
		 * @return {String} with additional attribtues ready to use in html elements.
		 */
		,
		getAdditionalAttrsHTML : function() {	 
			if(!this.additionalAttrs.id) {
				this.additionalAttrs.id = this.elid; 
			}
			var self = this; 
			var additionalAttrsStr = ''; //TODO buffer
			_.each(_.keys(this.additionalAttrs), function(attr) {
				if (attr != 'innerHTML') {
					additionalAttrsStr += ' ' + attr + '="' + self.additionalAttrs[attr] + '"';
				}
			});
			return additionalAttrsStr;
		}
	/**
	 * inner html to put inside the generated html element for this editor.
	 * 
	 * @property innerHTML
	 */

	});

	
	
	
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
			this.renderTemplate(ns.templates.InputEditorBoolean);
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

	/**
	 * Abstract utility class for implementing some kind of object editor. An
	 * object editor is an editor able to edit a js object, this is a list of
	 * named-values, optionally supporting 1) property order, 2) property
	 * grouping, 3) recursiveness (object editors inside object editors).
	 * 
	 * @class AbstractObjectEditor
	 */
	ns.util.defineClass(ns, "AbstractObjectEditor", ns.HTML5AbstractEditor,
	// constructor
	null
	// dynamic properties
	, {
		name : 'AbstractObjectEditor',
		canEdit : function(obj) {
			return _.isObject(obj);
		},
		canEditType : function(type) {
			return type === ns.types.OBJECT;
		},
		render : function() {
			var elid = ns.util.buildUniqueId();
			this.elid = elid;
			var str = ns.AbstractInputEditor.templInput(this);
			ns.util.setHtml(this.el, str);
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

})(jseditors);