!function(t){function n(e){if(r[e])return r[e].exports;var i=r[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var r={};n.m=t,n.c=r,n.i=function(t){return t},n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s="./src/emitter.js")}({"./src/emitter.js":function(t,n,r){"use strict";var e={};e.TypeFilter=function(t){return function(n){return n.type===t}},e.EqualityFilter=function(t){return function(n){return n===t}},e.getListener=function(t){return t.listener},e.isString=function(t){return"string"==typeof t},e.isArray=function(t){return t instanceof Array},e.isFunction=function(t){return"function"==typeof t},e.isEmpty=function(t){return t.length<1},e.assert=function(t,n){if(!t)throw new Error(n)},e.ArgumentCheck=function(t,n){var r=e.assert,i=e.isArray,u=e.isString,o=e.isFunction,f=e.isEmpty;return r(o(n),"'method' must be a function"),function e(c,s){return i(c)?c.forEach(function(t){return e(t,s)}):(r(u(c)&&!f(c),"'type' must be a string"),r(t.includes(c),'"'+c+'" listener type is not allowed'),i(s)?s.forEach(function(t){return e(c,t)}):(r(o(s),"'listener' must be a function"),void n(c,s)))}},e.Emitter=t.exports=function(t){var n=e.assert,r=e.TypeFilter,i=e.EqualityFilter,u=e.getListener,o=e.isArray,f=e.isString,c=e.isEmpty;n(o(t)&&!c(t)&&t.every(f),"'types' must be an array of string");var s=[],a=function(t){return s.filter(r(t)).map(u)},p=function(t,n){return a(t).find(i(n))},l={on:function(t,n){p(t,n)||s.push({type:t,listener:n})},off:function(t,n){var r=p(t,n);r&&s.splice(s.findIndex(function(n){return n.type===t&&n.listener===r}),1)},emit:function(t){for(var r=arguments.length,e=Array(r>1?r-1:0),i=1;i<r;i++)e[i-1]=arguments[i];n(f(t)&&!c(t),"'type' must be a string"),a(t).forEach(function(t){return void t.apply(void 0,e)})}};return l.on=e.ArgumentCheck(t,l.on),l.off=e.ArgumentCheck(t,l.off),l}}});