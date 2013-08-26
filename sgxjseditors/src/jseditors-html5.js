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
 *  ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 * 	window.alert('Edited name='); 
 * }); 
 */
	
var ns=jseditors;
ns.editors && (ns.editors={}); 
//ns.util.defineStaticField(ns, "editors", {}); 




/**
 * @class StringEditor 
 * Attributes: 'isTextArea'
 */
ns.StringEditor = ns.util.defineClass(ns, "StringEditor", ns.Editor, 
	//constructor		
	function(attrs) {
		this.__super.apply(this, arguments); //call super
	}
	//dynamic properties
,	{
		name: 'StringEditor'
	,	canEdit: function(obj){return _.isString(obj); }
	,	render: function(){		
			var templ = this.isTextArea ? ns.StringEditor.templTextArea : ns.StringEditor.templInput; 
			var elid = ns.util.buildUniqueId();
			this.elid=elid;
			var ctx = {
				id: elid
			,	value: this.value
			}; 
			var str = templ(ctx);
			ns.util.setHtml(this.el, str);
//			this.inputEl = ns.util.getById(elid); 
		}
	,	getInputEl: function() {
		 	return ns.util.getById(this.elid); 
		}
	,	flush: function() {
			if(this.readonly) {
				return this.value;
			}		
			else {
				return ns.util.getValue(this.getInputEl()); //words both for input and textarea
			}
		}
	}
	//static properties
,	{
		templInput: _.template('<input type="text" id="<%= id %>" value="<%= value %>"></input>')
	,	templTextArea: _.template('<textarea type="text" id="<%= id %>"><%= value %></textarea>')
	,	templReadOnly: _.template('<p id="<%= id %>"><%= value %></p>')
	}
); 









/**
 * abstract editor for supporting all native html5 input types. 
 * @class AbstractInputEditor 
 * Attributes: 'type' - one of 
 */
ns.AbstractInputEditor = ns.util.defineClass(ns, "AbstractInputEditor", ns.Editor, 
	//constructor		
	function(attrs) {
		this.__super.apply(this, arguments);
	}
	//dynamic properties
,	{
		name: 'AbstractInputEditor'
	,	canEdit: function(obj){return false; }//subclass must override
	,	getInputEl: function() {
		 	return ns.util.getById(this.elid); 
		}
	,	render: function(){			
			var elid = ns.util.buildUniqueId();
			this.elid=elid;
			var ctx = {
				id: elid
			,	value: this.value
			,	type: this.type || text
			}; 
			var str = ns.AbstractInputEditor.templInput(ctx);
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
		templInput: _.template('<input type="<%= type%>" id="<%= id %>" value="<%= value %>"></input>')
	}
); 

