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

/**
 * @class StringEditor 
 * Attributes: 'isTextArea'
 */
ns.editors = ns.util.defineClass(ns, "StringEditor", ns.Editor, 
	//constructor
		
	function(attrs) {
		this.__super.apply(this, arguments); //call super
//		ns.Editor.apply(this, arguments); //call super
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
		}
	,	flush: function() {
			
		}
	}

	//static properties
,	{
		templInput: _.template('<input type="text" id="<%= id %>" value="<%= value %>"></input>')
	,	templTextArea: _.template('<textarea type="text" id="<%= id %>"><%= value %></textarea>')
	,	templReadOnly: _.template('<p id="<%= id %>"><%= value %></p>')
	}
); 

