define(["../device/index"],function(a){'use strict';a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a;return function(b,c){var d,f,g,h,i,j,k=this,l=!1;this._init=function(){return b?void(a.isMobile?(g="touchstart",h="touchmove",i="touchend"):(g="mousedown",h="mousemove",i="mouseup"),k.bind()):void console.warn()("\u7F3A\u5C11\u53C2\u6570")},this.bind=function(){b.addEventListener(g,k._startHandle,!1),document.addEventListener(h,k._moveHandle,!1),b.addEventListener(i,k._endHandle,!1),document.addEventListener(i,k._endHandle,!1)},this.unbind=function(){b.removeEventListener(g,k._startHandle,!1),document.removeEventListener(h,k._moveHandle,!1),b.removeEventListener(i,k._endHandle,!1),document.removeEventListener(i,k._endHandle,!1)},this._startHandle=function(a){if(l=!0,!!a.touches)j=a.touches[0];else if("undefined"!=typeof a.pageX&&"undefined"!=typeof a.pageY)j={pageX:a.pageX,pageY:a.pageY};else return;d={x:j.pageX,y:j.pageY},"function"==typeof c.start&&c.start(d,a)},this._moveHandle=function(a){if(l){if(!!a.changedTouches&&"undefined"!=typeof a.changedTouches)j=a.changedTouches[0];else if("undefined"!=typeof a.pageX&&"undefined"!=typeof a.pageY)j={pageX:a.pageX,pageY:a.pageY};else return;f={x:j.pageX-d.x,y:j.pageY-d.y},"function"==typeof c.move&&c.move(f,a)}},this._endHandle=function(a){if(l){if(l=!1,!!a.changedTouches&&"undefined"!=typeof a.changedTouches)j=a.changedTouches[0];else if("undefined"!=typeof a.pageX&&"undefined"!=typeof a.pageY)j={pageX:a.pageX,pageY:a.pageY};else return;"function"==typeof c.end&&(f={x:j.pageX-d.x,y:j.pageY-d.y},"function"==typeof c.end&&c.end(f,a))}},this._init()}});