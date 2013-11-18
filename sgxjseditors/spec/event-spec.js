describe("Events", function() {

	var ns = jseditors; 
	var EventSource1 = ns.util.defineClass(ns, null, "EventSource", null, {});

	it("basic usage 1", function() {
		var source1 = new EventSource1();
		
//		var someListeners = jasmine.createSpyObj('someListeners', ['listener1', 'listener2']);	
		
		var someListeners = {
			listener1: function(event){},
			listener2: function(event){}
		}; 

	    spyOn(someListeners, 'listener1');
	    spyOn(someListeners, 'listener2');
	    
		source1.addListener('type1', someListeners.listener1);
		source1.addListener('type2', someListeners.listener2); 
		
		source1.trigger({custom:'event', name: 'type1'}); 
		
		expect(someListeners.listener1).toHaveBeenCalled();
		expect(someListeners.listener2).not.toHaveBeenCalled();		

		source1.trigger({custom:'event2', name: 'type2'}); 

		expect(someListeners.listener2).toHaveBeenCalled();
	    expect(someListeners.listener1.calls.length).toEqual(1);
	    
	    source1.removeListener('type1', someListeners.listener1);

		source1.trigger({custom:'event', name: 'type1'}); 
	    expect(someListeners.listener1.calls.length).toEqual(1);

	});
});
