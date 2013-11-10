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
 * Attributes: 'isTextArea', readonly
 */
ns.util.defineClass(ns, "HTML5AbstractEditor", ns.Editor, 
	//constructor
	null 
,	{
		/**
		 * @method renderHTML
		 * @property elid {String} he id of the generated html element for this editor.
		 */
		renderHTML: function(templ) {
			var elid = ns.util.buildUniqueId();
			this.elid=elid;
			var str = templ(this);
			ns.util.setHtml(this.el, str); 
		}
	}
);


/**
 * @class StringEditor 
 * Attributes: 'isTextArea', readonly
 */
ns.util.defineClass(ns, "StringEditor", ns.HTML5AbstractEditor, 
	//constructor	
	null
	
	//dynamic properties
,	{ 
		name: 'StringEditor'
	,	canEdit: function(obj){
			return _.isString(obj); 
		}
	,	render: function(){
			var templ = this.isTextArea ? ns.StringEditor.templTextArea : ns.StringEditor.templInput; 
			templ = this.readonly ? ns.StringEditor.templReadOnly : templ; 
			this.renderHTML(templ); 
		}
	,	getInputEl: function() {
			return ns.util.getById(this.elid); 
		}
	,	flush: function() {
			if(this.readonly) {
				return this.value;
			}		
			else {
				return ns.util.getValue(this.getInputEl()); //works both for input and textarea
			}
		}
	}

	//static properties
,	{
		templInput: _.template('<input type="text" id="<%= elid %>" value="<%= value %>"></input>')
	,	templTextArea: _.template('<textarea type="text" id="<%= elid %>"><%= value %></textarea>')
	,	templReadOnly: _.template('<p id="<%= elid %>"><%= value %></p>')
	}
); 




///**
// * abstract editor for supporting all native html5 input types. 
// * @class AbstractInputEditor 
// * Attributes: 'type' - one of 
// */
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
	//static properties
,	{
		templ: _.template('<input type="<%= type%>" id="<%= elid %>" value="<%= value %>"></input>')
	}
);

/**
 * @class ObjectEditorTable
 */
ns.util.defineClass(ns, "ObjectEditorTable", ns.AbstractObjectEditor, 
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
	//static properties
,	{
		templ: _.template('<table></table>')
		
	}
);

