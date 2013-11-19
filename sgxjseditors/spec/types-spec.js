describe("Types", function() {

	var ns = jseditors;	

	it("basic class compare", function() {
		var selectionList1 = new ns.type.SelectionList([1,2,3,4], [2,4]); 
		expect(selectionList1 instanceof ns.type.SelectionList).toBe(true);
//		expect(ns.util.instanceOf(selectionList1, ns.type.SelectionList)).toBe(true);
	});
});
