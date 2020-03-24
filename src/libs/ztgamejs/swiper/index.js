define(["jquery","../touch/index","../css3animate/index","../../node_modules/style-inject/dist/style-inject.es"],function(a,b,c,d){'use strict';a=a&&Object.prototype.hasOwnProperty.call(a,"default")?a["default"]:a,b=b&&Object.prototype.hasOwnProperty.call(b,"default")?b["default"]:b,c=c&&Object.prototype.hasOwnProperty.call(c,"default")?c["default"]:c,d=d&&Object.prototype.hasOwnProperty.call(d,"default")?d["default"]:d;d(".swiper-slide {\n  position: relative;\n  width: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 100%; }\n\n.swiper-wrapper {\n  position: relative;\n  overflow: visible;\n  width: 100%;\n  height: 100%; }\n\n.swiper-container {\n  position: relative;\n  overflow: hidden; }\n\n.swiper-pagination {\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n  text-align: center;\n  z-index: 100; }\n\n.swiper-pagination span {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background: #000;\n  opacity: 0.5;\n  margin: 0 5px; }\n\n.swiper-pagination span.active {\n  background: #4390ee;\n  opacity: 1; }\n");var e=function(d,e){var f=this;d=a(d);var g,h,i={mode:"auto",className:{next:"next",prev:"prev"},animation:"slide",start:0,item_list:d.children(".swiper-wrapper"),item:d.children(".swiper-wrapper").children(".swiper-slide"),next_btn:null,prev_btn:null,index_btn:null,dock:!0,direction:"horizontal",dock_trigger:"click",index_trigger:"click",time:400,onClass:"active",autoPlay:!0,autoDelayTime:5e3,loop:!0,onStart:function(){},onEnd:function(){}},e=a.extend({},i,e),j=0,k=0,l=0,m=null,n=n,o=function(){k=e.item.length;1>=k||(//添加dock
n?imgLoaded(e.item.eq(0),function(){}):(e.item.css({display:"inline-block"}),e.item_list.css({whiteSpace:"nowrap",fontSize:0})),q(),p(),s(),u(),r())},p=function(){//添加循环的时候 两边的元素
var a=e.item.eq(k-1).clone(),b=e.item.eq(0).clone();n?a.css({marginTop:"-100%"}):a.css({marginLeft:"-100%"}),e.item_list.prepend(a),e.item_list.append(b)},q=function(){if(!e.dock||e.dock_wrap||(e.dock_wrap=a("<div class='swiper-pagination'></div>"),d.append(e.dock_wrap)),e.dock_wrap){for(var b="",c=0;c<k;c++)b+=0==c?"<span class='"+e.onClass+"'></span>":"<span></span>";e.dock_wrap.html(b),g=e.dock_wrap.find("span")}},r=function(){e.autoPlay&&(!!m&&(clearInterval(m),m=null),m=setInterval(function(){f.goto(j+1)},e.autoDelayTime))},s=function(){n?(l=e.item.outerHeight(),h=e.item.outerWidth(),d.css({height:l})):(l=e.item.outerWidth(),h=e.item.outerHeight(),e.item_list.css({width:l}))};this.goToNext=function(){f.goto(j+1)},this.goto=function(a){// console.log(index);
var b=a-j;c.to(e.item_list,{x:-b*l},200,function(){//console.log(-index * 100 + "%");
//console.log(index);
j=a%k,0>j&&(j+=k),c.set(e.item_list,{x:0,left:100*-j+"%"}),t(j)})};var t=function(a){e.dock_wrap.find("span").removeClass(e.onClass),e.dock_wrap.find("span").eq(a).addClass(e.onClass);e.loop||e.next_btn&&e.prev_btn&&(a==k-1?(e.prev_btn.css({opacity:1,cursor:"pointer"}).show(),e.next_btn.css({opacity:.8,cursor:"default"}).hide()):0==a?(e.prev_btn.css({opacity:.8,cursor:"default"}).hide(),e.next_btn.css({opacity:1,cursor:"pointer"}).show()):(e.next_btn.css({opacity:1,cursor:"pointer"}).show(),e.prev_btn.css({opacity:1,cursor:"pointer"}).show()))},u=function(){d.find("img").on("mousedown",function(a){a.preventDefault()});// if (options.next_btn) {
// 	options.next_btn.bind("click", function() {
// 		self.goto(current + 1, false, -1);
// 	});
// }
// if (options.prev_btn) {
// 	options.prev_btn.bind("click", function() {
// 		self.goto(current - 1, false, 1);
// 	});
// }
// if (options.index_btn) {
// 	options.index_btn.bind(options.index_trigger, function() {
// 		var index = $(this).index();
// 		self.goto(index);
// 	});
// }
// if (docks) {
// 	docks.unbind(options.dock_trigger).bind(options.dock_trigger, function() {
// 		var index = $(this).index();
// 		self.goto(index);
// 	});
// }
var a=!1,g=0;//var oldVal = parseInt(options.item_list.css("left"));
f.touch=new b(d[0],{start:function(){// lastdelay = {
// 	x: 0,
// 	y: 0
// };
//oldVal = parseInt(options.item_list.css("left"));
a=!0,r()},move:function(b){if(a){if(e.loop)g=n?b.y:b.x;else{var d=l,f=b.x<d?b.x:d;g=(f-f*f/(2*d))/6}// setAuto();
// console.log(x, y);
// if(current==0){
// }
n?c.set(e.item_list,{y:g}):c.set(e.item_list,{x:g})}},end:function(){var a=Math.abs;r();// curY = point.y + curY;
// curX = point.x + curX;
// Animate.to(
// 	options.item_list,
// 	{
// 		x: 0
// 	},
// 	100
// );
var b=g/l;// console.log(bili);
if(.2<a(b)){var c=b/a(b);f.goto(j-c)}else f.goto(j)}})};o()};return e});
