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
			var templateStr = templ(this.getDefaultTemplateContext());			
			return this.renderHTML(templateStr); 
		}
		/**
		 * subclasses can override for adding more properties 
		 * @method getDefaultTempalteContext
		 */
	,	getDefaultTemplateContext: function() {
			return {
				ed : this,
				ns: ns,
				_: _
			};
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
		 * html attributes added to this collection by the editor are id and class. 
		 * User may override all of the other. In the case of class 
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
//				if (attr != 'innerHTML') {
				additionalAttrsStr += ' ' + attr + '="' + self.additionalAttrs[attr] + '"';
//				}
			});
			return additionalAttrsStr;
		}

//		/**
//		 * inner html to put inside the generated html element for this editor.
//		 * 
//		 * @property innerHTML
//		 */

	});

	

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
	 * 
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
	 * 'ed', 'propertyName', 'propertyValue', 'propertyEditor'
	 * where the most interesting one is 'propertyEditor' that is an Editor instance ready to use
	 * for editing the property value. propertyTempalteis responsible of rendering this editor in the right place.  
	 * @property propertyTemplate
	 * @type Function
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
		/**
		 * @override
		 */
		getDefaultTemplateContext: function(){},
		canEditType : function(type) {
			return type === ns.types.OBJECT;
		},
		render : function() {
			var html = '';
			if(this.prefixTemplate) {
				this.prefixTemplate(); 
			}
			return this.renderHTML(html);
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
	 * prove of concept implementation of AbstractObjectEditor
	 * @class ObjectEditorTable
	 */
	ns.util.defineClass(ns, "ObjectEditorTable", ns.AbstractObjectEditor,
		// constructor
		null
		// dynamic properties
		, {
			name : 'ObjectEditorTable',
			render : function() {
				var html = '';
				
				return this.renderHTML(html);
			},
			flush : function() {
				if (this.readonly) {
					return this.value;
				} else {
					// works both for input and text area elements.
					var val = ns.util.val(this.getInputEl()); 
				}
			}
		}
	);
	

})(jseditors);