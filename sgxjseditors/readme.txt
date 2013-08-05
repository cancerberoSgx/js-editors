Editor framework focusing in automatic GUI / forms generation from JSON model Objects. 

Requires underscorejs and backbonejs. Based on backbone models.

Distributed under the MIT license http://www.opensource.org/licenses/mit-license.php 

It defines an extendable / scalable abstract model, utilities and data types not existing in javascript
 like colors, etc. 

The first implementation will be pure HTML 5
with no particular style or widgets and using html5 advanced inputs for data and color. 

 Use case example: 
 var obj = {name: 'Seba', age: 29}; 
 var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
 ed.render(containerEl); 
 ...
 $acceptButton1.click(function(e){
  ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 	window.alert('Edited name='); 
 });   