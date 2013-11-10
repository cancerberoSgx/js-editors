/* sgxjseditors - a general lightweight editor generation utility. HTML5 implementation. 
 * 
 * Dependencies: jseditors, backbone, underscore, jquery. 
 * 
 *  Target: HTML5 capable browsers
 *  
 * @author sgurin
 * 
 * Use case example: 
 * var obj = {name: 'Seba', age: 29}; 
 * var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
 * ed.render(containerEl); 
 * ...
 * $acceptButton1.click(function(e){
 * ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 * window.alert('Edited name='); 
 * }); 
 */
var ns=jseditors;

/**
 * @class HTML5AbstractEditor - base class for this html5 implementation.
 * @extends Editor
 */
ns.util.defineClass(ns, "HTML5AbstractEditor", ns.Editor, null /*constructor*/
,	{	//instance fields
		/**
		 * @method renderHTML
		 * @property elid {String} he id of the generated html element for this editor.
		 */
		renderHTML: function(templ) {
			this.elid = ns.util.buildUniqueId();
			ns.util.setHtml(this.el, templ({ed: this})); 
		}
		/**
		 * @method getInputEl
		 */
		,	getInputEl: function() {
			return ns.util.getById(this.elid); 
		}
	}
);


/**
 * @class InputEditor  * 
 * @extends HTML5AbstractEditor
 * @property isTextArea
 * @property readonly
 * @property type
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

///**
// * @class InputEditorNumber
// * @extends InputEditor
// */
//ns.util.defineClass(ns, "InputEditor", ns.HTML5AbstractEditor
//	/*constructor*/
//,	function() {
//		//first default options and then user overridings calling super. 
//		this.type='number'; 
//		this.isTextArea=false;
//		this.__super.apply(this, arguments); // super()
//	}
//					
//,	{  /*instance fields*/
//		name: 'InputNumberEditor' 
////	,	init: function(){
////			this.isTextArea = false;
////			this.type='number'
////		}
//	,	parseValue: function(val) {
//			return parseFloat(val+""); 
//		}
//	,	canEdit: function(obj){
//			return _.isNumber(obj); 
//		}
//	,	canEditType: function(type){
//			return type === ns.types.STRING;
//		}
//	}
//); 


/**
 * @class AbstractObjectEditor
 * abstract utility class for implementing some kind of object editor. An object editor is an editor able to 
 * edit a js object, optionally supporting recursiveness.
 */
ns.util.defineClass(ns, "AbstractObjectEditor", ns.HTML5AbstractEditor, 
	//constructor	
	null
	//dynamic properties
,	{
		name: 'AbstractObjectEditor'
	,	canEdit: function(obj){
			return _.isObject(obj); 
		}//subclass must override
	,	getInputEl: function() {
			return ns.util.getById(this.elid); 
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
