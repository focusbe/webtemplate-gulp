define(["../prefix/index","jquery","../device/index","../utli/index"],function(a,b,c,d){'use strict';function e(a){// str = str.toLowerCase();
var b=a.split(" "),c="";for(var d in b)c+=b[d].substring(0,1).toUpperCase()+b[d].substring(1)+"";return c}//var transformStyle = ["scale", "rotate", "translate", "skew", "perspective"];
// function istransformstyle(style) {
//     if (style == "x" || style == "y" || style == "z") {
//         style = "translate";
//     }
//     for (var i in transformStyle) {
//         if (isSameStyle(style, transformStyle[i])) {
//             return true;
//         }
//     }
//     return false;
// }
// function isSameStyle(str1, str2) {
// 	if (str1.toLowerCase() == str2.toLowerCase()) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }
function f(a){var b,c="";for(var d in s)for(var e in b=s[d],b)if(-1<b[e].indexOf("(")){if(a.match(new RegExp(b[e],"ig")))return c="no"==d?"":d,c;}else if(b[e]==a)return c="no"==d?"":d,c;return c}function g(a){var b,c="",d="50% 50%",e={};for(var g in a){b=a[g];// console.log(i);
var h=f(g);isNaN(b)||(b+=h);"translate"==g?c+="translate("+b+","+b+") ":"x"===g?c+="translateX("+b+") ":"y"===g?c+="translateY("+b+") ":"z"===g?c+="translateZ("+b+") ":"scaleX"===g?c+="scaleX("+b+") ":"scaleY"===g?c+="scaleY("+b+") ":"scaleZ"===g?c+="scaleZ("+b+") ":"scale"===g?c+="scale("+b+") ":"rotate"===g?c+="rotate("+b+") ":"rotateX"===g?c+="rotateX("+b+") ":"rotateY"===g?c+="rotateY("+b+") ":"rotateZ"===g?c+="rotateZ("+b+") ":"skewX"===g?c+="skewX("+b+") ":"skewY"===g?c+="skewY("+b+") ":"skew"===g?c+="skew("+b+") ":"perspective"===g?c+="perspective("+b+") ":"origin"===g?d=b:e[g]=b}return{origin:d,transform:c,css2:e}}function h(c){c=d.query(c);// console.log(element);
var e=c.style[a.js+"Transform"];if(!e)return{};var f,g,h,j=e.split(" "),k={};for(var l in j){if(h=j[l].split("("),2>h.length)break;f=b.trim(h[0]),"translateX"==f&&(f="x"),"translateY"==f&&(f="y"),"translateZ"==f&&(f="z"),g=b.trim(h[1].replace(")","").replace("px","")),k[f]=g}return k}function j(b,c,f){if(b=d.query(b),!!b){if(b instanceof Array){for(var g in b)j(b[g],c,f);return}b.style[a.js+e(c)]=f,b.style[c]=f}}function k(c,e,f,j){if(c=d.query(c),!!c){if(c instanceof Array){for(var l in c)k(c[l],e,f,j);return}if("undefined"==typeof f?f=!1:"function"==typeof f&&(callback=f,f=!1),!f&&r("transition")){b(c).css("transition","all 0s linear "),b(c).css(a.css+"transition","all 0s linear ")}var i=h(c),m=g(b.extend(i,e));c.style[a.css+"transform"]=m.transform,b(c).css(a.css+"transform-origin",m.origin),j||b(c).css(m.css2)}}function l(a){r("animation")&&(a=d.query(a),a&&j(a,"animationPlayState","paused"))}function m(a){r("animation")&&(a=d.query(a),a&&(j(a,"animationPlayState","paused"),j(a,"animationName","none"),j(a,"animationDuration",0),j(a,"animationTimingFunction","linear"),j(a,"animationDelay",0),j(a,"animationIterationCount","none"),j(a,"animationDirection","none"),j(a,"animationFillMode","none")))}function n(c,e,f,g){if((c=d.query(c),!!c)&&"undefined"!=typeof e&&e){if("undefined"!=typeof f&&f?"function"==typeof f&&(g=f,f={}):f={},!r("animation"))return void("function"==typeof g&&g());if(c instanceof Array){var h=null;for(var k in c)k!=c.length-1||!g||(h=g),n(c[k],e,f,h);return}f=b.extend({speed:400,easing:"linear",count:1,delay:0,direction:"normal",fillmode:"both"},f),isNaN(f.speed)||(f.speed+="ms"),isNaN(f.delay)||(f.delay+="ms");var i=g;j(c,"animationName",e),j(c,"animationDuration",f.speed),j(c,"animationTimingFunction",f.easing),j(c,"animationDelay",f.delay),j(c,"animationIterationCount",f.count),j(c,"animationDirection",f.direction),j(c,"animationPlayState","running"),j(c,"animationFillMode",f.fillmode),g="undefined"==typeof g?function(){}:function(){c.removeEventListener(a.js+"AnimationEnd",g,!1),c.removeEventListener("animationend",g,!1),setTimeout(function(){"function"==typeof i&&i()})},c.addEventListener(a.js+"AnimationEnd",g,!1),c.addEventListener("animationend",g,!1)}}function o(a){return a?a.toString().replace("px",""):""}function p(a,c){if("object"!=typeof c||!a)return!1;var d=h(a),e=!0;for(var f in c)if(c[f]!=d[f]&&o(c[f])!=o(b(a).css(f))){e=!1;break}return e}function q(c,e,f,g,h){if(c=d.query(c),c&&e){if("undefined"==typeof f?(f=400,g="linear"):"function"==typeof f&&(h=f,f=400,g="linear"),"undefined"==typeof g&&(g="linear"),"function"==typeof g&&(h=g,g="linear"),c instanceof Array){var j;for(var l in c)l!=c.length-1||!h||(j=h),q(c[l],e,f,g,j);return}if(!r("transform"))return void b(c).animate(e,f,g,h);//判断是否已经是当前的属性
if(!r("transition"))return k(c,e,!0,!0),void b(c).animate(e,f,g,h);if(p(c,e))return void("function"==typeof h&&setTimeout(h,f));var i=h;h="undefined"==typeof h?function(){}:function(){c.removeEventListener("transitionend",h,!1),setTimeout(function(){"function"==typeof i&&i()})};//console.log(support_css3("transition"));
var m=f/1e3+"s",n="all "+m+" "+g;b(c).css("transition",n),b(c).css(a.css+"transition",n),k(c,e,!0),c.addEventListener("transitionend",h,!1)}}a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a,b=b&&Object.prototype.hasOwnProperty.call(b,"default")?b["default"]:b,c=c&&Object.prototype.hasOwnProperty.call(c,"default")?c["default"]:c,d=d&&Object.prototype.hasOwnProperty.call(d,"default")?d["default"]:d;/**
        @author:pengzai
        @blog:http://pengzai.dev
        @github:https://github.com/pengzai-dev
    **/var r=c.support_css3,s={deg:["rotate(.*)","skew(.*)"],px:["width","height","x","y","translate(.+)","margin(.*)","padding(.+)"]};return{set:function(a,b){k(a,b,!1)},getCss3:h,to:q,keyframe:{run:n,pause:l,resume:function(a){r("animation")&&j(a,"animationPlayState","running")},stop:m}}});
