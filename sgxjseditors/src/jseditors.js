/* sgxjseditors - a general lightweight editor generation utility. 
 * 
 * based on html5
 *  
 * Requires underscorejs and backbonejs (~20kb)
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
	var ns=null;
	window.jseditors = ns = {}; 
	
	ns.editors = {}; 
	ns.registerEditor=function(ed) {
// ed.get('name') && ns.editors[ed.get('name'), ed];
	}; 
	
	/** utilities that may be needed to implement using some library like jquery */
	ns.util = {
		setHtml: function(el, str) {
			el.innerHTML=str;
		}
	}; 
	
	/**
	 * Main Abstract Editor class. 
	 * 
	 * Attributes: 
	 * 'name' : the name of this editor, must be unique across all the framework. 
	 * 'el' : the element into which to attach this editor when rendered. 
	 * 'value' : the value being edited by this editor. Normally it won't be a copy and the editor is able to modify it to reflect current editor state when you call flush
	 */
	ns.Editor = Backbone.Model.extend({
		initialize: function() {
			ns.registerEditor(this); 
		}
	,	name: null
// /**
// * @return the name of this editor, must be unique across all the framework.
// */
// , getName: function(){return null; }
		/**
		 * @return true if this editor can edit a type of the given object
		 */
	,	canEdit: function(obj){return false; }
		/**
		 * renders this editor instance inside given html element (append). the
		 * visual implementation will be builded when this method is called, so
		 * editors will have a chance of being configured before.
		 */
	,	render: function(el){}
	,	buildUniqueId: function() {
			return _.uniqueId('sgxjseds_'+this.name); 
		}
		/**
		 * updates 'value' attribute value with current state of the GUI
		 * 
		 * @return the updated value
		 */
	,	flush: function(){
			return this.get('value'); 
		}
	}); 
	
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
