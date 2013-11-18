this["jseditors"] = this["jseditors"] || {};
this["jseditors"]["templates"] = this["jseditors"]["templates"] || {};

this["jseditors"]["templates"]["InputEditor"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if(ed.readonly) { 
	var tagName = ed.tagName || 'span'; 
;
__p += '\n\t<' +
((__t = (tagName)) == null ? '' : __t) +
' ' +
((__t = ( ed.getAdditionalAttrsHTML() )) == null ? '' : __t) +
'>' +
((__t = ( ed.value )) == null ? '' : __t) +
'</' +
((__t = (tagName)) == null ? '' : __t) +
'>\n\t\n';
 } else if(ed.isTextArea) { ;
__p += '\n\t<textarea ' +
((__t = ( ed.getAdditionalAttrsHTML() )) == null ? '' : __t) +
'>' +
((__t = ( ed.value )) == null ? '' : __t) +
'</textarea>\n\t\t\n';
 } else { ;
__p += '\n\t<input type="' +
((__t = ( ed.type || 'text' )) == null ? '' : __t) +
'" value="' +
((__t = ( ed.value )) == null ? '' : __t) +
'" ' +
((__t = ( ed.getAdditionalAttrsHTML() )) == null ? '' : __t) +
'></input>\n';
 } ;
__p += '\n';

}
return __p
};

this["jseditors"]["templates"]["InputEditorBoolean"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {


ed.type=ed.type||'checkbox';
if(ed.type==='checkbox') {
;
__p += '\n\t<input type="checkbox"  \n\t\t' +
((__t = ( ed.getAdditionalAttrsHTML() )) == null ? '' : __t) +
'\n\t\t' +
((__t = ( ed.value ? 'checked' : '')) == null ? '' : __t) +
'\n\t\t>\n\t\t' +
((__t = ( ed.value )) == null ? '' : __t) +
'\n\t</input>\n\t\n';
 } else { /* is 2-item select list */
var trueLabel = ed.trueLabel || 'true';
var falseLabel = ed.falseLabel || 'false';  
;
__p += '\n<select id="' +
((__t = ( ed.elid )) == null ? '' : __t) +
'">\n\t<option value="true">' +
((__t = ( trueLabel )) == null ? '' : __t) +
'</option>\n\t<option value="false">' +
((__t = ( falseLabel )) == null ? '' : __t) +
'</option>\n</select>\t\n';
 } ;
__p += '\n';

}
return __p
};

this["jseditors"]["templates"]["ObjectEditorTableProperty"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 
var html = propertyEditor.render(); 
console.log(html); 
;
__p += '\n<tr><td>' +
((__t = ( propertyName )) == null ? '' : __t) +
'</td><td>' +
((__t = ( html )) == null ? '' : __t) +
'</td></tr>';

}
return __p
};