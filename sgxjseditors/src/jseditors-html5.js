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

	/**
	 * the element into which to attach this editor when rendered. Optional
	 * @property el  
	 * @type HTMLElement
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
		 * @param {String} the resulting html code. 
		 */
		renderHTML : function(html) {
			/**
			 * the id of the generated html element for this editor.
			 * 
			 * @property elid {String}
			 */
			if(!this.elid) {
				this.elid = this.buildUniqueId();
			}
			if(this.el) {
				ns.util.setHtml(this.el, html);
			}
			return html; 
		}
		/**
		 * @method renderTemplate
		 * @param templ Function a html underscode template to render this editor.
		 * @param {String} the resulting html code. 
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

})(jseditors);