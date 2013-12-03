(function(ns) {

	/**
	 * Support editing a SelectList object type, this is let the user chose 1 or more items from a selection option list using html select element.
	 * @class SelectListEditor
	 * @extends HTML5AbstractEditor
	 */
	ns.util.defineClass(ns, "SelectListEditor", ns.HTML5AbstractEditor, null /* constructor */
	, { /* instance fields */
		name : 'SelectListEditor',
		canEdit : function(obj) {
			return obj instanceof ns.type.SelectList; 
		},
		canEditType : function(type) {
			return type === ns.types.SELECTLIST.name;
		},
		render : function() {
			return this.renderTemplate(ns.templates.SelectEditor1);
		},
		flush : function() { //TODO: jquery used directly
			var all = [], selection = []; 
			jQuery(this.el).find('select>option').each(function(){
				var opt = jQuery(this);
				all.push(opt.text()); 
				if(opt.is('selected'))
					selection.push(opt.text);
			}); 
			if(!this.value)
				this.value = new ns.types.SelectList(all,selection);
			this.value.all=all;
			this.value.selection=selection; 
			return this.value; 
		}
	});

	

})(jseditors);