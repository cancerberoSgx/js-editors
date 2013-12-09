describe("HTML5-SelectEditor", function() {

	var ns = jseditors; 
	var createEl = function(tag) {
		tag=tag||'span'; 
		var p1 = document.createElement(tag);
		document.body.appendChild(p1);	
		return p1; 
	}; 
	var container, $container;  
	beforeEach(function(){
		container = createEl('div')
		$container = jQuery(container); 
	}); 
	afterEach(function(){
		$container.remove(); 
	}); 

	it("basic rendering", function() {
		var all = ['Mozart', 'Beethoven', 'Bach']; 
		var ed = new ns.SelectListEditor({
			value: new ns.type.SelectList(all, ['Bach']), 
			el: container}); 
		ed.render();
		expect($container.find('select').size()).toBe(1);
		expect($container.find('select>option').size()).toBe(3);
		expect($container.find('select>option:selected').size()).toBe(1);
		
		var flushed = ed.flush();
		expect(ed.flush().all.join('')).toBe(all.join('')); 
	});
});
