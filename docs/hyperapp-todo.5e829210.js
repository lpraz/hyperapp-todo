parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"2S39":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.app=exports.h=exports.Lazy=void 0;var e=1,n=2,r=3,t={},o=[],l=o.map,i=Array.isArray,u=requestAnimationFrame||setTimeout,f=function(e){var n="";if("string"==typeof e)return e;if(i(e)&&e.length>0)for(var r,t=0;t<e.length;t++)""!==(r=f(e[t]))&&(n+=(n&&" ")+r);else for(var t in e)e[t]&&(n+=(n&&" ")+t);return n},a=function(e,n){var r={};for(var t in e)r[t]=e[t];for(var t in n)r[t]=n[t];return r},c=function(e){return e.reduce(function(e,n){return e.concat(n&&!0!==n?"function"==typeof n[0]?[n]:c(n):0)},o)},s=function(e,n){return i(e)&&i(n)&&e[0]===n[0]&&"function"==typeof e[0]},p=function(e,n){if(e!==n)for(var r in a(e,n)){if(e[r]!==n[r]&&!s(e[r],n[r]))return!0;n[r]=e[r]}},d=function(e,n,r){for(var t,o,l=0,i=[];l<e.length||l<n.length;l++)t=e[l],o=n[l],i.push(o?!t||o[0]!==t[0]||p(o[1],t[1])?[o[0],o[1],o[0](r,o[1]),t&&t[2]()]:t:t&&t[2]());return i},v=function(e,n,r,t,o,l){if("key"===n);else if("style"===n)for(var i in a(r,t))r=null==t||null==t[i]?"":t[i],"-"===i[0]?e[n].setProperty(i,r):e[n][i]=r;else"o"===n[0]&&"n"===n[1]?((e.actions||(e.actions={}))[n=n.slice(2).toLowerCase()]=t)?r||e.addEventListener(n,o):e.removeEventListener(n,o):!l&&"list"!==n&&n in e?e[n]=null==t?"":t:null==t||!1===t||"class"===n&&!(t=f(t))?e.removeAttribute(n):e.setAttribute(n,t)},y=function(e,n,t){var o=e.type===r?document.createTextNode(e.name):(t=t||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name):document.createElement(e.name),l=e.props;for(var i in l)v(o,i,null,l[i],n,t);for(var u=0,f=e.children.length;u<f;u++)o.appendChild(y(e.children[u]=z(e.children[u]),n,t));return e.node=o},h=function(e){return null==e?null:e.key},m=function(n,t,o,l,i,u){if(o===l);else if(null!=o&&o.type===r&&l.type===r)o.name!==l.name&&(t.nodeValue=l.name);else if(null==o||o.name!==l.name)t=n.insertBefore(y(l=z(l),i,u),t),null!=o&&n.removeChild(o.node);else{var f,c,s,p,d=o.props,g=l.props,w=o.children,x=l.children,C=0,k=0,L=w.length-1,b=x.length-1;for(var A in u=u||"svg"===l.name,a(d,g))("value"===A||"selected"===A||"checked"===A?t[A]:d[A])!==g[A]&&v(t,A,d[A],g[A],i,u);for(;k<=b&&C<=L&&null!=(s=h(w[C]))&&s===h(x[k]);)m(t,w[C].node,w[C],x[k]=z(x[k++],w[C++]),i,u);for(;k<=b&&C<=L&&null!=(s=h(w[L]))&&s===h(x[b]);)m(t,w[L].node,w[L],x[b]=z(x[b--],w[L--]),i,u);if(C>L)for(;k<=b;)t.insertBefore(y(x[k]=z(x[k++]),i,u),(c=w[C])&&c.node);else if(k>b)for(;C<=L;)t.removeChild(w[C++].node);else{A=C;for(var N={},E={};A<=L;A++)null!=(s=w[A].key)&&(N[s]=w[A]);for(;k<=b;)s=h(c=w[C]),p=h(x[k]=z(x[k],c)),E[s]||null!=p&&p===h(w[C+1])?(null==s&&t.removeChild(c.node),C++):null==p||o.type===e?(null==s&&(m(t,c&&c.node,c,x[k],i,u),k++),C++):(s===p?(m(t,c.node,c,x[k],i,u),E[p]=!0,C++):null!=(f=N[p])?(m(t,t.insertBefore(f.node,c&&c.node),f,x[k],i,u),E[p]=!0):m(t,c&&c.node,null,x[k],i,u),k++);for(;C<=L;)null==h(c=w[C++])&&t.removeChild(c.node);for(var A in N)null==E[A]&&t.removeChild(N[A].node)}}return l.node=t},g=function(e,n){for(var r in e)if(e[r]!==n[r])return!0;for(var r in n)if(e[r]!==n[r])return!0},z=function(e,r){return e.type===n?((!r||g(r.lazy,e.lazy))&&((r=e.lazy.view(e.lazy)).lazy=e.lazy),r):e},w=function(e,n,r,t,o,l){return{name:e,props:n,children:r,node:t,type:l,key:o}},x=function(e,n){return w(e,t,o,n,null,r)},C=function(n){return n.nodeType===r?x(n.nodeValue,n):w(n.nodeName.toLowerCase(),t,l.call(n.childNodes,C),n,null,e)},k=function(e){return{lazy:e,type:n}};exports.Lazy=k;var L=function(e,n){for(var r,o=[],l=[],u=arguments.length;u-- >2;)o.push(arguments[u]);for(;o.length>0;)if(i(r=o.pop()))for(u=r.length;u-- >0;)o.push(r[u]);else!1===r||!0===r||null==r||l.push("object"==typeof r?r:x(r));return n=n||t,"function"==typeof e?e(n,l):w(e,n,l,null,n.key)};exports.h=L;var b=function(e,n){var r={},t=!1,o=e.view,l=e.node,f=l&&C(l),a=e.subscriptions,s=[],p=function(e){y(this.actions[e.type],e)},v=function(e){return r!==e&&(r=e,a&&(s=d(s,c([a(r)]),y)),o&&!t&&u(h,t=!0)),r},y=(n||function(e){return e})(function(e,n,t){return"function"==typeof e?y(e(r,n),t||n):i(e)?"function"==typeof e[0]?y(e[0],"function"==typeof(e=e[1])?e(n):e,n):(c(e.slice(1)).map(function(e){e&&e[0](y,e[1],n)},v(e[0])),r):v(e)}),h=function(){t=!1,l=m(l.parentNode,l,f,f="string"==typeof(f=o(r))?x(f):f,p)};y(e.init)};exports.app=b;
},{}],"Focm":[function(require,module,exports) {
"use strict";var e=require("hyperapp");function t(e){return i(e)||r(e)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function i(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){u(e,t,n[t])})}return e}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var l=function(e,t,n){return e.map(function(r,i){switch(i){case t:return e[n];case n:return e[t];default:return e[i]}})},c=function(e){return e.target.value},m="hyperapp-todo_items",a=function(e,t){var n=localStorage.getItem(t.key);e(t.action,n)},s=function(e){return[a,e]},d=function(e,t){localStorage.setItem(t.key,t.value)},f=function(e){return[d,e]},p=function(e,t){return[t,f({key:m,value:JSON.stringify(t.items)})]},h=function(){return[{addingItem:!1,newItemName:"",editingItem:!1,editingItemName:"",removingItem:!1,filter:""},s({key:m,action:function(e,t){return o({},e,{items:null!==JSON.parse(t)?JSON.parse(t):[{name:"Learn Hyperapp",completed:!1},{name:"Conquer the world",completed:!1},{name:"Add some more tasks!",completed:!1}]})}})]},g=function(e,t){return o({},e,{filter:t})},I=function(e,t){return p(e,o({},e,{items:e.items.map(function(e,n){return t===n?o({},e,{completed:!e.completed}):e})}))},b=function(e,t){return p(e,o({},e,{items:l(e.items,t,t-1)}))},v=function(e,t){return p(e,o({},e,{items:l(e.items,t,t+1)}))},y=function(e){return o({},e,{addingItem:!0})},k=function(e,t){return o({},e,{newItemName:t})},w=function(e){return o({},e,{addingItem:!1,newItemName:""})},N=function(e){return p(e,o({},e,{items:[].concat(t(e.items),[{name:e.newItemName,completed:!1}]),addingItem:!1,newItemName:""}))},O=function(e,t){return o({},e,{editingItem:t,editingItemName:e.items[t].name})},A=function(e,t){return o({},e,{editingItemName:t})},S=function(e){return o({},e,{editingItem:!1})},j=function(e){return p(e,o({},e,{items:e.items.map(function(t,n){return e.editingItem===n?o({},t,{name:e.editingItemName}):t}),editingItem:!1,editingItemName:""}))},C=function(e,t){return o({},e,{removingItem:t})},E=function(e){return o({},e,{removingItem:!1})},P=function(e){return p(e,o({},e,{items:e.items.filter(function(t,n){return e.removingItem!==n}),removingItem:!1}))},x=function(e){return o({},e,{removingItem:"all"})},J=function(e){return o({},e,{removingItem:!1})},L=function(e){return p(e,o({},e,{items:[],removingItem:!1}))};(0,e.app)({init:h(),view:function(t){return(0,e.h)("div",null,(0,e.h)("label",null,"Filter:")," ",(0,e.h)("input",{type:"text",value:t.filter,oninput:[g,c]}),(0,e.h)("ul",null,t.items.map(function(n,r){return n.name.toLowerCase().includes(t.filter.toLowerCase())?(0,e.h)("li",{class:n.completed?"completed":""},(0,e.h)("span",null,n.name),(0,e.h)("br",null),(0,e.h)("button",{class:"green",onclick:[I,r]},"✔"),(0,e.h)("button",{class:"yellow",onclick:[O,r]},"✏"),(0,e.h)("button",{class:"red",onclick:[C,r]},"✖"),(0,e.h)("button",{disabled:0===r,onclick:[b,r]},"↗"),(0,e.h)("button",{disabled:r===t.items.length-1,onclick:[v,r]},"↘")):""})),(0,e.h)("p",null,(0,e.h)("button",{class:"blue",onclick:y},"+ Add"),t.items.length?(0,e.h)("button",{class:"red",onclick:x},"✖ Remove All"):""),!1!==t.addingItem?(0,e.h)("div",{class:"modal"},(0,e.h)("p",null,"Enter a name for the task:"),(0,e.h)("input",{type:"text",value:t.newItemName,onInput:[k,c]}),(0,e.h)("br",null),(0,e.h)("button",{onclick:w},"↩ Cancel"),(0,e.h)("button",{class:"blue",onclick:N},"+ Add")):"",!1!==t.editingItem?(0,e.h)("div",{class:"modal"},(0,e.h)("p",null,"Enter a new name for the task:"),(0,e.h)("input",{type:"text",value:t.editingItemName,onInput:[A,c]}),(0,e.h)("br",null),(0,e.h)("button",{onclick:S},"↩ Cancel"),(0,e.h)("button",{class:"yellow",onclick:[j]},"✏ Edit")):"",[!1,"all"].includes(t.removingItem)?"":(0,e.h)("div",{class:"modal"},(0,e.h)("p",null,'Are you sure you want to remove the task "',t.items[t.removingItem].name,'"?'),(0,e.h)("button",{onclick:E},"↩ Cancel"),(0,e.h)("button",{class:"red",onclick:P},"✖ Remove")),"all"===t.removingItem?(0,e.h)("div",{class:"modal"},(0,e.h)("p",null,"Are you sure you want to remove all tasks from the list?"),(0,e.h)("button",{onclick:J},"↩ Cancel"),(0,e.h)("button",{class:"red",onclick:[L]},"✖ Remove All")):"")},node:document.getElementById("app")});
},{"hyperapp":"2S39"}]},{},["Focm"], null)
//# sourceMappingURL=/hyperapp-todo.5e829210.js.map