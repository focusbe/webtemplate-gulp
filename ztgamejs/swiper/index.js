import $ from"jquery";import Touch from"../touch/index";import Animate from"../css3animate/index";var css_248z=".swiper-slide {\n  position: relative;\n  width: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 100%; }\n\n.swiper-wrapper {\n  position: relative;\n  overflow: visible;\n  width: 100%;\n  height: 100%; }\n\n.swiper-container {\n  position: relative;\n  overflow: hidden; }\n\n.swiper-pagination {\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n  text-align: center;\n  z-index: 100; }\n\n.swiper-pagination span {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background: #000;\n  opacity: 0.5;\n  margin: 0 5px; }\n\n.swiper-pagination span.active {\n  background: #4390ee;\n  opacity: 1; }\n",styleInject=require("style-inject");styleInject(".swiper-slide {\n  position: relative;\n  width: 100%;\n  top: 0;\n  left: 0;\n  overflow: hidden;\n  width: 100%;\n  height: 100%; }\n\n.swiper-wrapper {\n  position: relative;\n  overflow: visible;\n  width: 100%;\n  height: 100%; }\n\n.swiper-container {\n  position: relative;\n  overflow: hidden; }\n\n.swiper-pagination {\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n  text-align: center;\n  z-index: 100; }\n\n.swiper-pagination span {\n  display: inline-block;\n  width: 12px;\n  height: 12px;\n  border-radius: 6px;\n  background: #000;\n  opacity: 0.5;\n  margin: 0 5px; }\n\n.swiper-pagination span.active {\n  background: #4390ee;\n  opacity: 1; }\n");var Swiper=function(a,b){var c=this;a=$(a);var d,e,f={mode:"auto",className:{next:"next",prev:"prev"},animation:"slide",start:0,item_list:a.children(".swiper-wrapper"),item:a.children(".swiper-wrapper").children(".swiper-slide"),next_btn:null,prev_btn:null,index_btn:null,dock:!0,direction:"horizontal",dock_trigger:"click",index_trigger:"click",time:400,onClass:"active",autoPlay:!0,autoDelayTime:5e3,loop:!0,onStart:function(){},onEnd:function(){}},b=$.extend({},f,b),g=0,h=0,i=0,j=null,k=k,l=function(){h=b.item.length;1>=h||(//添加dock
k?imgLoaded(b.item.eq(0),function(){}):(b.item.css({display:"inline-block"}),b.item_list.css({whiteSpace:"nowrap",fontSize:0})),n(),m(),p(),r(),o())},m=function(){//添加循环的时候 两边的元素
var a=b.item.eq(h-1).clone(),c=b.item.eq(0).clone();k?a.css({marginTop:"-100%"}):a.css({marginLeft:"-100%"}),b.item_list.prepend(a),b.item_list.append(c)},n=function(){if(!b.dock||b.dock_wrap||(b.dock_wrap=$("<div class='swiper-pagination'></div>"),a.append(b.dock_wrap)),b.dock_wrap){for(var c="",e=0;e<h;e++)c+=0==e?"<span class='"+b.onClass+"'></span>":"<span></span>";b.dock_wrap.html(c),d=b.dock_wrap.find("span")}},o=function(){b.autoPlay&&(!!j&&(clearInterval(j),j=null),j=setInterval(function(){c.goto(g+1)},b.autoDelayTime))},p=function(){k?(i=b.item.outerHeight(),e=b.item.outerWidth(),a.css({height:i})):(i=b.item.outerWidth(),e=b.item.outerHeight(),b.item_list.css({width:i}))};this.goToNext=function(){c.goto(g+1)},this.goto=function(a){// console.log(index);
var c=a-g;Animate.to(b.item_list,{x:-c*i},200,function(){//console.log(-index * 100 + "%");
//console.log(index);
g=a%h,0>g&&(g+=h),Animate.set(b.item_list,{x:0,left:100*-g+"%"}),q(g)})};var q=function(a){b.dock_wrap.find("span").removeClass(b.onClass),b.dock_wrap.find("span").eq(a).addClass(b.onClass);b.loop||b.next_btn&&b.prev_btn&&(a==h-1?(b.prev_btn.css({opacity:1,cursor:"pointer"}).show(),b.next_btn.css({opacity:.8,cursor:"default"}).hide()):0==a?(b.prev_btn.css({opacity:.8,cursor:"default"}).hide(),b.next_btn.css({opacity:1,cursor:"pointer"}).show()):(b.next_btn.css({opacity:1,cursor:"pointer"}).show(),b.prev_btn.css({opacity:1,cursor:"pointer"}).show()))},r=function(){a.find("img").on("mousedown",function(a){a.preventDefault()});// if (options.next_btn) {
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
var d=!1,e=0;//var oldVal = parseInt(options.item_list.css("left"));
c.touch=new Touch(a[0],{start:function(){// lastdelay = {
// 	x: 0,
// 	y: 0
// };
//oldVal = parseInt(options.item_list.css("left"));
d=!0,o()},move:function(a){if(d){if(b.loop)e=k?a.y:a.x;else{var c=i,f=a.x<c?a.x:c;e=(f-f*f/(2*c))/6}// setAuto();
// console.log(x, y);
// if(current==0){
// }
k?Animate.set(b.item_list,{y:e}):Animate.set(b.item_list,{x:e})}},end:function(){var a=Math.abs;o();// curY = point.y + curY;
// curX = point.x + curX;
// Animate.to(
// 	options.item_list,
// 	{
// 		x: 0
// 	},
// 	100
// );
var b=e/i;// console.log(bili);
if(.2<a(b)){var d=b/a(b);c.goto(g-d)}else c.goto(g)}})};l()};export default Swiper;
