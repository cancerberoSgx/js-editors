Editor framework focusing in automatic GUI / forms generation from JSON model Objects. 

Require underscorejs and backbonejs. Based on backbone models. 

 Use case example: 
 var obj = {name: 'Seba', age: 29}; 
 var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
 ed.render(containerEl); 
 ...
 $acceptButton1.click(function(e){
  ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 	window.alert('Edited name='); 
 });   