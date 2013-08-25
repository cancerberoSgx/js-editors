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


//var SUPERROOT=this; //needs to be outside the wrapper function
//(function(_, Backbone){
	
//	console.log(SUPERROOT); 
	var ns=jseditors;
//	if(!ns.impls)
//		ns.impls={};
//	
//	var impl={}
//	ns.impls['html5impl']=impl;
		
	/**
	 * Attributes: 'isTextArea'
	 */
	ns.StringEditor = ns.Editor.extend({
		initialize: function(attributes, options) {
			Backbone.Model.prototype.initialize.apply(this, arguments);
		}
	,	name: 'StringEditor'// getName: function(){return "StringEditor";}
	,	canEdit: function(obj){return _.isString(obj); }
	,	templInput: '<input type="text" id="<%= id %>" value="<%= value %>"></input>'
	,	templTextArea: '<textarea type="text" id="<%= id %>"><%= value %></textarea>'
	,	render: function(){		
			var templ = null; 
			if(this.get('isTextArea')) {
				templ = _.template(this.templTextArea);// TODO: field
			}
			else {
				templ = _.template(this.templInput);// TODO: field
			}
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
	
	// inheritance using .extend
	/*
	 * ns.EditorDef = { init: function(){ this.color = "blue"; } , getColor:
	 * function(){ return this.color; } };
	 * 
	 * ns.Editor = function(){ _.extend(this, ns.EditorDef); this.init(); };
	 */
// })(_, Backbone);
