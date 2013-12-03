js-editors
=============

Editor framework focusing in automatic GUI / forms generation from JSON model Objects. 

This is currently a WORK IN PROGRESS project and an INVESTIGATION about best ways of using a JavaScript building frameworks. In particular grunt is used and it has a simple usage of the following grunt extensions: jshint, underscore templates, jasmine for unit testing, yuidocs, and more. 
 
Dependencies: underscore js. 

Distributed under the MIT license http://www.opensource.org/licenses/mit-license.php 

Compiling it
=============
Install nodejs on your system

```
cd jseditors
npm install
grunt
```
If all goes fine, then files will be available under the dist/ folder. 

Some Notes
=============
This is a very new / investigation project!

It defines an extendible / scalable abstract model, utilities and data types not existing in javascript
 like colors, etc. 

The first implementation will be pure HTML 5
with no particular style or widgets and using html5 advanced inputs for data and color. 

 Use case example: 
 
```
 var obj = {name: 'Seba', age: 29}; 
 var ed = new editors.ObjectEditor({formType: 'inline', value: obj}); 
 ed.render(containerEl); 
 ...
 $acceptButton1.click(function(e){
  ed.flush(); //the editor will modify its value and this is the same value referenced by 'obj', 'ed.get('value')'
 	window.alert('Edited name='); 
 });   
 
```


Roadmap & ideas
===============

* be able of creating an object editor from a form element.
* be compatible with serverside nodejs/rhino for generating real markup. support pure string rendering.  