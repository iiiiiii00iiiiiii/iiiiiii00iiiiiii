(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"01bf":function(t,a,s){"use strict";s("b714")},b714:function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"home"},[s("div",{staticClass:"main-banner"},[s("video",{staticClass:"movie",attrs:{autoplay:"",loop:"",muted:"",playsinline:""},domProps:{muted:!0}},[s("source",{attrs:{src:"/videos/bg-video-crop.mp4",type:"video/mp4"}})]),s("div",{staticClass:"video-filter"})])])])]),s("div",{staticClass:"row pt-2 d-none d-xl-flex"},[s("div",{staticClass:"col"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{class:"notice"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="notice"}}},[t._v("공지사항")]),s("span",{staticClass:"float-right text-white",on:{click:function(a){return t.$tools.pushRouter("/"+t.selectBoard,!0)}}},[t._v("+more")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"notice"===t.selectBoard,expression:"selectBoard === 'notice'"}],staticClass:"board-content"},[s("ul",t._l(t.notice,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/notice/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)]),s("div",{directives:[{name:"show",rawName:"v-show",value:"faq"===t.selectBoard,expression:"selectBoard === 'faq'"}],staticClass:"board-content"},[s("ul",t._l(t.faq,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/faq/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])]),s("div",{staticClass:"col"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{staticClass:"active"},[t._v("이벤트")]),s("span",{staticClass:"float-right text-white",on:{click:function(a){return t.$tools.pushRouter("/event",!0)}}},[t._v("+more")])]),s("div",{staticClass:"board-content"},[s("ul",t._l(t.event,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/event/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])])]),s("div",{staticClass:"row mt-2"},[s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/sports",!1)}}},[s("img",{attrs:{src:"/images/banner-1.png",alt:"SPORTS",title:"SPORTS"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/sportscross",!1)}}},[s("img",{attrs:{src:"/images/banner-2.png",alt:"CROSS",title:"CROSS"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/sportsspecial",!1)}}},[s("img",{attrs:{src:"/images/banner-3.png",alt:"LIVE",title:"SPECIAL"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/minigamemenu",!1)}}},[s("img",{attrs:{src:"/images/banner-4.png",alt:"미니게임",title:"미니게임"}})])])]),s("div",{staticClass:"row mt-3"},[s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.ready("/casino",!0)}}},[s("img",{attrs:{src:"/images/banner-5.png",alt:"SPORTS",title:"SPORTS"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.ready("/casino",!0)}}},[s("img",{attrs:{src:"/images/banner-6.png",alt:"CROSS",title:"CROSS"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/charge",!0)}}},[s("img",{attrs:{src:"/images/banner-7.png",alt:"LIVE",title:"LIVE"}})])]),s("div",{staticClass:"col-3 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{click:function(a){return t.$tools.pushRouter("/exchange",!0)}}},[s("img",{attrs:{src:"/images/banner-8.png",alt:"EXCHANGE",title:"EXCHANGE"}})])])]),t._m(0),t._m(1),t._m(2)])])},o=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"payment-banner"},[s("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-payment.png",alt:"PAYMENT METHOD",title:"PAYMENT METHOD"}})])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"sports-banner"},[s("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-sports.png",alt:"SPORTS",title:"SPORTS"}})])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"copyright"},[t._v(" Copyright © 믿을 수 있는 NACHO BET ALL RIGHTS RESERVE."),s("br"),t._v("Solution By SOFT365. ")])])])}],i=s("1da1"),r=s("5530"),n=(s("96cf"),s("2f62")),l={name:"Home",components:{},computed:Object(r["a"])({},Object(n["c"])(["user"])),data:function(){return{bannerIndex:null,selectBoard:"notice",notice:[],event:[],faq:[]}},created:function(){this.getDashboard()},methods:{getDashboard:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/api/get-home",{n:100});case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:t.notice=s.data.dashboard.notice,t.event=s.data.dashboard.event,t.faq=s.data.dashboard.faq;case 8:case"end":return a.stop()}}),a)})))()},openKplay:function(t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var e,o;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e=window.open("","kplay","_blank"),s.next=3,a.$http.get("/api/kpay-url",{id:t},!1);case 3:o=s.sent,e.location=o.data.launch_url;case 5:case"end":return s.stop()}}),s)})))()}}},c=l,d=(s("01bf"),s("2877")),u=Object(d["a"])(c,e,o,!1,null,null,null);a["default"]=u.exports}}]);