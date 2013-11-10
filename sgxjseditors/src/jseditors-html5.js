/* sgxjseditors - a general lightweight editor generation utility. HTML5 implementation. 
 * 
 * 
 *  Target: HTML5 capable browsers
 *  
 * @author sgurin
 * 
 */

(function(ns){
//var ns=jseditors;
 
/**
 * sgxjseditors - a general lightweight editor generation utility. HTML5 implementation. 
 * 
 * 
 * Use case example: 
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
 * @extends Editor
 * base class for this html5 implementation.
 */
ns.util.defineClass(ns, "HTML5AbstractEditor", ns.Editor, null /*constructor*/
,	{	//instance fields
		/**
		 * @method renderHTML
		 * @param templ Function a html underscode template to render this editor. 
		 */
		renderHTML: function(templ) {
			/**
			 * the id of the generated html element for this editor.
			 * @property elid {String} 
			 */
			this.elid = this.buildUniqueId();
			ns.util.setHtml(this.el, templ({ed: this})); 
		}
		/**
		 * @method getInputEl
		 */
	,	getInputEl: function() {
			return ns.util.getById(this.elid); 
		}
		/** 
		 * @method getAdditionAttrsHTML
		 * @returns {String} with additional attribtues ready to use in html elements.  
		 * @property additionalAttrs {Object} with additional html parameters for the input or textarea generated html element. 
		 */ 
	,	getAdditionAttrsHTML: function() {
			this.additionalAttrs = this.additionalAttrs || {}; 
			var additionalAttrsStr = '';
			_.each(_.keys(this.additionalAttrs), function(attr){
				additionalAttrsStr+=' '+additionalAttrsStr+'="'+this.additionalAttrs[attr]+'"'; 
			}); 
			return additionalAttrsStr; 
		}
	}
);


/**
 * TODO loremmm
 * @class InputEditor 
 * @extends HTML5AbstractEditor
 * @property isTextArea
 * @property readonly {Boolean}
 * @property type {String} the html type attribute value. It only applies for input el.
 * @property tagName the tagname to use to show the value. It only applies for readonly==true
 */
ns.util.defineClass(ns, "InputEditor", ns.HTML5AbstractEditor, null /*constructor*/		
,	{  /*instance fields*/
		name: 'InputEditor'
	,	canEdit: function(obj){
			return _.isString(obj); 
		}
	,	canEditType: function(type){
			return type === ns.types.NUMBER;
		}
	,	render: function(){
			this.renderHTML(ns.templates.InputEditor); 
		}
	,	flush: function() {
			if(this.readonly) {
				return this.parseValue(this.value);
			}		
			else {
				return this.parseValue(ns.util.getValue(this.getInputEl())); //works both for input and textarea
			}
		}
		/** 
		 * @method parseValue. 
		 * This editor can be extensible to return custom value type. By default it will work string. @see InputNumberEditor
		 */
	,	parseValue: function(val) {
			return val; 
		}
	}
); 



/**extends InputEditor specially or editing numbers performing stuff like retuning
 *  the casted number value on flush(), or showing type="number", in the generated markup.
 * @class InputEditorNumber 
 * @extends InputEditor
 */
ns.util.defineClass(ns, "InputEditorNumber", ns.InputEditor
	/*constructor*/
,	function() {
		//first default options and then user overriding calling super() 
		this.type='number'; 
		this.isTextArea=false;
		this.__super.apply(this, arguments);
	}
					
,	{  /*instance fields*/
		name: 'InputNumberEditor' 
	,	parseValue: function(val) {
			return parseFloat(val+""); 
		}
	,	canEdit: function(obj){
			return _.isNumber(obj); 
		}
	,	canEditType: function(type){
			return type === ns.types.NUMBER;
		}
	}
); 





/**
 * abstract utility class for implementing some kind of object editor. An object editor is an editor able to 
 * edit a js object, this is a list of named-values, optionally supporting 1) property order, 2) property grouping, 
 * 3) recursiveness (object editors inside object editors). 
 * 
 * @class AbstractObjectEditor
 */
ns.util.defineClass(ns, "AbstractObjectEditor", ns.HTML5AbstractEditor, 
	//constructor	
	null
	//dynamic properties
,	{
		name: 'AbstractObjectEditor'
	,	canEdit: function(obj){
			return _.isObject(obj); 
		}
	,	canEditType: function(type){
			return type===ns.types.OBJECT; 
		}
	,	render: function(){			
			var elid = ns.util.buildUniqueId();
			this.elid=elid;
			var str = ns.AbstractInputEditor.templInput(this);
			ns.util.setHtml(this.el, str);
		}
	,	flush: function() {
			if(this.readonly) {
				return this.value;
			}		
			else {
				var val = ns.util.getValue(this.getInputEl()); //works both for input and textarea
				return val; 
			}
		}
	}
);




///**
//* abstract editor for supporting all native html5 input types. 
//* @class AbstractInputEditor 
//* Attributes: 'type' - one of 
//*/
//ns.util.defineClass(ns, "AbstractInputEditor", ns.HTML5AbstractEditor, 
//	//constructor		
//	null
//	//dynamic properties
//,	{
//		name: 'AbstractInputEditor'
//	,	canEdit: function(obj){return false; }//subclass must override
//	,	getInputEl: function() {
//			return ns.util.getById(this.elid); 
//		}
//	,	render: function(){	
//			this.renderHTML(ns.AbstractInputEditor.templInput);
//		}
//	,	flush: function() {
//			if(this.readonly) {
//				return this.value;
//			}		
//			else {
//				var val = ns.util.getValue(this.getInputEl()); //works both for input and textarea
//				return val; 
//			}
//		}
//	}
//	//static properties
//,	{
//		templInput: _.template('<input type="<%= type%>" id="<%= elid %>" value="<%= value %>"></input>')
//	}
//); 

})(jseditors);