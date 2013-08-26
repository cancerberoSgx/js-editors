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

//(function(_, Backbone){
	
	var ns=jseditors;
	var defineStaticField = function(obj, name, val, replace) {
		if(replace || !obj[name])
			obj[name]=val;
	}
//	if(!ns.impls)
//		ns.impls={};
//	var impl={}
//	ns.impls['html5impl']=impl;
		
	/**
	 * Attributes: 'isTextArea'
	 */
	ns.StringEditor = ns.Editor.extend({
		initialize: function(attributes, options) {
			Backbone.Model.prototype.initialize.apply(this, arguments);
			
			//init templ as static fields
			defineStaticField(ns.StringEditor, 'templInput', 
				_.template('<input type="text" id="<%= id %>" value="<%= value %>"></input>')); 
			
			defineStaticField(ns.StringEditor, 'templTextArea', 
				_.template('<textarea type="text" id="<%= id %>"><%= value %></textarea>')); 
			
			defineStaticField(ns.StringEditor, 'templReadOnly', 
				_.template('<p id="<%= id %>"><%= value %></p>')); 
			
//			if(ns.StringEditor.templInput)
//			var templInput: '<input type="text" id="<%= id %>" value="<%= value %>"></input>'
//			,	templTextArea: '<textarea type="text" id="<%= id %>"><%= value %></textarea>'; 
//			ns.StringEditor.templInput=_.underscore('<input type="text" id="<%= id %>" value="<%= value %>"></input>')
				
		}
	,	name: 'StringEditor'// getName: function(){return "StringEditor";}
	,	canEdit: function(obj){return _.isString(obj); }
	,	render: function(){		
			var templ = this.get('isTextArea') ? ns.StringEditor.templTextArea : ns.StringEditor.templInput; 
//			if(this.get('isTextArea')) {
//				templ = ns.StringEditor.templTextArea; //_.template(this.templTextArea);// TODO: field
//			}
//			else {
//				templ = ns.StringEditor.templInput;//.template(this.templInput);// TODO: field
//			}
			var elid = this.buildUniqueId();
			this.set('elid', elid);
			var ctx = {
				id: elid
			,	value: this.get('value')
			}; 
			var str = templ(ctx);
			ns.util.setHtml(this.get('el'), str);
		}
	,	flush: function() {
			
		}
	}); 
// })(_, Backbone);
