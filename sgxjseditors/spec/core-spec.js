describe("Core", function() {

	var ns = jseditors; 
	//editor subclass example
	var Editor1 = ns.util.defineClass(ns, "Editor1", ns.Editor, null, {
		name: 'Editor1', 
		canEdit: function(val){return _.isString(val); }, 
		canEditType: function(t){return t==='String'; }
	});

	it("editor registering", function() {
		
		ns.registerEditor(Editor1); 
		var ed1 = ns.newEditor('Editor1', {param1: 1234});

	    expect(ed1.name).toEqual('Editor1');
	    expect(ed1.canEdit('a string')).toBe(true);
	    expect(ed1.canEdit(3.14)).toBe(false);
	    expect(ed1.canEdit({foo: 'bar'})).toBe(false);
	    
	    var ednames1 = ns.getEditorsForType('String'); 
	    expect(ednames1.length).toBe(1);
	    expect(ednames1[0]).toBe('Editor1');
	    
	    expect(ns.getEditorsForType('Number').length).toBe(0);
	    
	    var ednames1 = ns.getEditorsForValue('astring'); 
	    expect(ednames1.length).toBe(1);
	    expect(ednames1[0]).toBe('Editor1');
	    
	});
});
