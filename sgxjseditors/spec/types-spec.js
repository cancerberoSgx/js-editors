describe("Types", function() {

	var ns = jseditors;	

	it("basic class compare", function() {
		var selectionList1 = new ns.type.SelectList([1,2,3,4], [2,4]); 
		expect(selectionList1 instanceof ns.type.SelectList).toBe(true);
		expect(selectionList1.all).toBe([1,2,3,4]);
		expect(selectionList1.selection).toBe([2,4]);

//		expect(ns.util.instanceOf(selectionList1, ns.type.SelectionList)).toBe(true);
	});

});
