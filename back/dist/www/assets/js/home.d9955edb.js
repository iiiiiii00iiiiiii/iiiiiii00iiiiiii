(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"01bf":function(t,a,e){"use strict";e("b714")},b714:function(t,a,e){},bb51:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"home"},[e("div",{staticClass:"main-banner"},[e("video",{staticClass:"movie",attrs:{autoplay:"",loop:"",muted:"",playsinline:""},domProps:{muted:!0}},[e("source",{attrs:{src:"/videos/bg-video-crop.mp4",type:"video/mp4"}})]),e("div",{staticClass:"video-filter"})])])])]),e("div",{staticClass:"row pt-2 d-none d-xl-flex"},[e("div",{staticClass:"col"},[e("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[e("div",{staticClass:"board-title"},[e("span",{class:"notice"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="notice"}}},[t._v("공지사항")]),e("span",{staticClass:"float-right text-white",on:{click:function(a){return t.$tools.pushRouter("/"+t.selectBoard,!0)}}},[t._v("+more")])]),e("div",{directives:[{name:"show",rawName:"v-show",value:"notice"===t.selectBoard,expression:"selectBoard === 'notice'"}],staticClass:"board-content"},[e("ul",t._l(t.notice,(function(a,s){return e("li",{key:s},[a.header?e("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),e("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(e){return t.$tools.pushRouter("/notice/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)]),e("div",{directives:[{name:"show",rawName:"v-show",value:"faq"===t.selectBoard,expression:"selectBoard === 'faq'"}],staticClass:"board-content"},[e("ul",t._l(t.faq,(function(a,s){return e("li",{key:s},[a.header?e("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),e("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(e){return t.$tools.pushRouter("/faq/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])]),e("div",{staticClass:"col"},[e("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[e("div",{staticClass:"board-title"},[e("span",{staticClass:"active"},[t._v("이벤트")]),e("span",{staticClass:"float-right text-white",on:{click:function(a){return t.$tools.pushRouter("/event",!0)}}},[t._v("+more")])]),e("div",{staticClass:"board-content"},[e("ul",t._l(t.event,(function(a,s){return e("li",{key:s},[a.header?e("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),e("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(e){return t.$tools.pushRouter("/event/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])])]),e("div",{staticClass:"row pt-2"},[e("div",{staticClass:"col-6 col-xl"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=0},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sports",!1)}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" SPORTS ")],1),e("div",{staticClass:"game-banner-cover",class:0===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" SPORTS ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 유럽형 스포츠 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-1.jpg",alt:"SPORTS",title:"SPORTS"}})])]),e("div",{staticClass:"col-6 col-xl d-none d-xl-block"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=1},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sportscross",!1)}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" CROSS ")],1),e("div",{staticClass:"game-banner-cover",class:1===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" CROSS ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 크로스 스포츠 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-2.jpg",alt:"CROSS",title:"CROSS"}})])]),e("div",{staticClass:"col-6 col-xl"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=2},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sportslive",!1)}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" LIVE ")],1),e("div",{staticClass:"game-banner-cover",class:2===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" LIVE ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 라이브 스포츠 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-3.jpg",alt:"LIVE",title:"LIVE"}})])]),e("div",{staticClass:"col col-xl mt-2 mt-xl-0"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=3},mouseout:function(a){t.bannerIndex=null},click:function(a){"justin"===t.user.id?t.$tools.pushRouter("/casino",!0):t.$tools.ready()}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" LIVE CASINO ")],1),e("div",{staticClass:"game-banner-cover",class:3===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" LIVE CASINO ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 라이브 카지노 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-4.jpg",alt:"LIVE CASINO",title:"LIVE CASINO"}})])]),e("div",{staticClass:"col col-xl d-none d-xl-block"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=4},mouseout:function(a){t.bannerIndex=null},click:function(a){"justin"===t.user.id?t.openKplay(0):t.$tools.ready()}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" SLOT GAMES ")],1),e("div",{staticClass:"game-banner-cover",class:4===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" SLOT GAMES ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 슬롯게임 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-5.jpg",alt:"SLOT GAMES",title:"SLOT GAMES"}})])]),e("div",{staticClass:"col col-xl d-xl-none mt-2 mt-xl-0"},[e("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=5},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/powerball")}}},[e("div",{staticClass:"game-banner-site-name"},[t._v(" PentHouse ")]),e("div",{staticClass:"game-banner-title"},[e("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" MINIGAMES ")],1),e("div",{staticClass:"game-banner-cover",class:5===t.bannerIndex?"active":""},[e("div",{staticClass:"game-banner-cover-content"},[e("div",{staticClass:"game-banner-cover-icon"},[e("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),e("div",{staticClass:"game-banner-cover-title"},[t._v(" MINIGAMES ")]),e("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 각종 미니게임 배팅 ")])])]),e("img",{attrs:{src:"/images/banner-6.jpg",alt:"SLOT GAMES",title:"SLOT GAMES"}})])])]),t._m(0),t._m(1),t._m(2)])])},n=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"payment-banner"},[e("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-payment.png",alt:"PAYMENT METHOD",title:"PAYMENT METHOD"}})])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"sports-banner"},[e("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-sports.png",alt:"SPORTS",title:"SPORTS"}})])])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"copyright"},[t._v(" Copyright © 믿을 수 있는 PentHouse BET ALL RIGHTS RESERVE."),e("br"),t._v("Solution By SOFT365. ")])])])}],i=e("1da1"),o=e("5530"),r=(e("96cf"),e("2f62")),c={name:"Home",components:{},computed:Object(o["a"])({},Object(r["c"])(["user"])),data:function(){return{bannerIndex:null,selectBoard:"notice",notice:[],event:[],faq:[]}},created:function(){this.getDashboard()},methods:{getDashboard:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/api/get-home",{n:100});case 2:if(e=a.sent,!e.error){a.next=5;break}return a.abrupt("return");case 5:t.notice=e.data.dashboard.notice,t.event=e.data.dashboard.event,t.faq=e.data.dashboard.faq;case 8:case"end":return a.stop()}}),a)})))()},openKplay:function(t){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var s,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return s=window.open("","kplay","_blank"),e.next=3,a.$http.get("/api/kpay-url",{id:t},!1);case 3:n=e.sent,s.location=n.data.launch_url;case 5:case"end":return e.stop()}}),e)})))()}}},l=c,d=(e("01bf"),e("2877")),v=Object(d["a"])(l,s,n,!1,null,null,null);a["default"]=v.exports}}]);