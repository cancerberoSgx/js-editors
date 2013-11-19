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
			return type === ns.types.BOOLEAN.name;
		},
		render : function() {
			return this.renderTemplate(ns.templates.InputEditorBoolean);
		},
		flush : function() {
			if (this.readonly) {
				return this.parseValue(this.value);
			} else {
				// works both for input and text area elements.
				return this.parseValue(ns.util.val(this.getInputEl())); 
			}
		}
	});

	

})(jseditors);