(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"01bf":function(t,a,s){"use strict";s("b714")},b714:function(t,a,s){},bb51:function(t,a,s){"use strict";s.r(a);var e=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"home"},[s("div",{staticClass:"main-banner"},[s("video",{staticClass:"movie",attrs:{autoplay:"",loop:"",muted:"",playsinline:""},domProps:{muted:!0}},[s("source",{attrs:{src:"/videos/bg-video-crop.mp4",type:"video/mp4"}})]),s("div",{staticClass:"video-filter"})])])])]),s("div",{staticClass:"row pt-2 d-none d-xl-flex"},[s("div",{staticClass:"col"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{class:"notice"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="notice"}}},[t._v("공지사항")]),s("span",{staticClass:"ml-3",class:"faq"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="faq"}}},[t._v("FAQ")]),s("span",{staticClass:"float-right text-light-brown",on:{click:function(a){return t.$tools.pushRouter("/"+t.selectBoard,!0)}}},[t._v("+more")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"notice"===t.selectBoard,expression:"selectBoard === 'notice'"}],staticClass:"board-content"},[s("ul",t._l(t.notice,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/notice/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)]),s("div",{directives:[{name:"show",rawName:"v-show",value:"faq"===t.selectBoard,expression:"selectBoard === 'faq'"}],staticClass:"board-content"},[s("ul",t._l(t.faq,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/faq/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])]),s("div",{staticClass:"col"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{staticClass:"active"},[t._v("이벤트")]),s("span",{staticClass:"float-right text-light-brown",on:{click:function(a){return t.$tools.pushRouter("/event",!0)}}},[t._v("+more")])]),s("div",{staticClass:"board-content"},[s("ul",t._l(t.event,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/event/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(a.title)+" ")])])})),0)])])]),s("div",{staticClass:"col-3"},[s("div",{staticClass:"community-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",[s("img",{staticClass:"img-fluid cursor-pointer",attrs:{src:"/images/banner-main-help.jpg",alt:"고객센터",titme:"고객센터"},on:{click:function(a){return t.$tools.pushRouter("/help",!0)}}})]),s("div",{staticClass:"mt-1"},[s("img",{staticClass:"img-fluid cursor-pointer",attrs:{src:"/images/banner-main-attendance.jpg",alt:"출석체크",titme:"출석체크"},on:{click:function(a){return t.$tools.pushRouter("/attendance",!0)}}})])])])]),s("div",{staticClass:"row pt-2"},[s("div",{staticClass:"col-6 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=0},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sports",!1)}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" SPORTS ")],1),s("div",{staticClass:"game-banner-cover",class:0===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" SPORTS ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 유럽형 스포츠 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-1.jpg",alt:"SPORTS",title:"SPORTS"}})])]),s("div",{staticClass:"col-6 col-xl d-none d-xl-block"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=1},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sportscross",!1)}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" CROSS ")],1),s("div",{staticClass:"game-banner-cover",class:1===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" CROSS ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 크로스 스포츠 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-2.jpg",alt:"CROSS",title:"CROSS"}})])]),s("div",{staticClass:"col-6 col-xl"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=2},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/sportslive",!1)}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" LIVE ")],1),s("div",{staticClass:"game-banner-cover",class:2===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" LIVE ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 라이브 스포츠 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-3.jpg",alt:"LIVE",title:"LIVE"}})])]),s("div",{staticClass:"col col-xl mt-2 mt-xl-0"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=3},mouseout:function(a){t.bannerIndex=null},click:function(a){"justin"===t.user.id?t.$tools.pushRouter("/casino",!0):t.$tools.ready()}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" LIVE CASINO ")],1),s("div",{staticClass:"game-banner-cover",class:3===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" LIVE CASINO ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 라이브 카지노 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-4.jpg",alt:"LIVE CASINO",title:"LIVE CASINO"}})])]),s("div",{staticClass:"col col-xl d-none d-xl-block"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=4},mouseout:function(a){t.bannerIndex=null},click:function(a){"justin"===t.user.id?t.openKplay(0):t.$tools.ready()}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" SLOT GAMES ")],1),s("div",{staticClass:"game-banner-cover",class:4===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" SLOT GAMES ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 슬롯게임 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-5.jpg",alt:"SLOT GAMES",title:"SLOT GAMES"}})])]),s("div",{staticClass:"col col-xl d-xl-none mt-2 mt-xl-0"},[s("div",{staticClass:"game-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"},on:{mouseover:function(a){t.bannerIndex=5},mouseout:function(a){t.bannerIndex=null},click:function(a){return t.$tools.pushRouter("/powerball")}}},[s("div",{staticClass:"game-banner-site-name"},[t._v(" GOLDEN ")]),s("div",{staticClass:"game-banner-title"},[s("font-awesome-icon",{attrs:{icon:["fa","cubes"]}}),t._v(" MINIGAMES ")],1),s("div",{staticClass:"game-banner-cover",class:5===t.bannerIndex?"active":""},[s("div",{staticClass:"game-banner-cover-content"},[s("div",{staticClass:"game-banner-cover-icon"},[s("font-awesome-icon",{attrs:{icon:["fa","plus"]}})],1),s("div",{staticClass:"game-banner-cover-title"},[t._v(" MINIGAMES ")]),s("div",{staticClass:"game-banner-cover-sub-title"},[t._v(" 각종 미니게임 배팅 ")])])]),s("img",{attrs:{src:"/images/banner-6.jpg",alt:"SLOT GAMES",title:"SLOT GAMES"}})])])]),s("div",{staticClass:"row d-xl-none"},[s("div",{staticClass:"col-12 mt-2"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{class:"notice"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="notice"}}},[t._v("공지사항")]),s("span",{staticClass:"ml-3",class:"faq"===t.selectBoard?"active":"",on:{click:function(a){t.selectBoard="faq"}}},[t._v("FAQ")]),s("span",{staticClass:"float-right text-light-brown",on:{click:function(a){return t.$tools.pushRouter("/"+t.selectBoard,!0)}}},[t._v("+more")])]),s("div",{directives:[{name:"show",rawName:"v-show",value:"notice"===t.selectBoard,expression:"selectBoard === 'notice'"}],staticClass:"board-content"},[s("ul",t._l(t.notice,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/notice/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(""+t.$tools.cut(a.title,35,"..."))+" ")])])})),0)]),s("div",{directives:[{name:"show",rawName:"v-show",value:"faq"===t.selectBoard,expression:"selectBoard === 'faq'"}],staticClass:"board-content"},[s("ul",t._l(t.faq,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/faq/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(""+t.$tools.cut(a.title,35,"..."))+" ")])])})),0)])])]),s("div",{staticClass:"col-12 mt-2"},[s("div",{staticClass:"board",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",{staticClass:"board-title"},[s("span",{staticClass:"active"},[t._v("이벤트")]),s("span",{staticClass:"float-right text-light-brown",on:{click:function(a){return t.$tools.pushRouter("/event",!0)}}},[t._v("+more")])]),s("div",{staticClass:"board-content"},[s("ul",t._l(t.event,(function(a,e){return s("li",{key:e},[a.header?s("span",{style:"#000000"!==a.headerColor?"color: "+a.headerColor:""},[t._v("["+t._s(a.header)+"]")]):t._e(),s("span",{staticClass:"cursor-pointer",class:a.header?"ml-2":"",style:"#000000"!==a.titleColor?"color: "+a.titleColor:"",on:{click:function(s){return t.$tools.pushRouter("/event/detail/"+a._id+"/1",!0)}}},[t._v(" "+t._s(""+t.$tools.cut(a.title,35,"..."))+" ")])])})),0)])])]),s("div",{staticClass:"col-6 mt-2"},[s("div",{staticClass:"community-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",[s("img",{staticClass:"img-fluid cursor-pointer",attrs:{src:"/images/banner-main-help.jpg",alt:"고객센터",titme:"고객센터"},on:{click:function(a){return t.$tools.pushRouter("/help",!0)}}})])])]),s("div",{staticClass:"col-6 mt-2"},[s("div",{staticClass:"community-banner",attrs:{"data-aos":"zoom-in","data-aos-duration":"1500"}},[s("div",[s("img",{staticClass:"img-fluid cursor-pointer",attrs:{src:"/images/banner-main-attendance.jpg",alt:"출석체크",titme:"출석체크"},on:{click:function(a){return t.$tools.pushRouter("/attendance",!0)}}})])])])]),t._m(0),t._m(1),t._m(2)])])},n=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"payment-banner"},[s("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-payment.png",alt:"PAYMENT METHOD",title:"PAYMENT METHOD"}})])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"sports-banner"},[s("img",{staticClass:"img-fluid",attrs:{src:"/images/banner-sports.png",alt:"SPORTS",title:"SPORTS"}})])])])},function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"copyright"},[t._v(" Copyright © 믿을 수 있는 GOLDEN ALL RIGHTS RESERVE."),s("br"),t._v("Solution By SOFT365. ")])])])}],o=s("1da1"),i=s("5530"),r=(s("96cf"),s("2f62")),c={name:"Home",components:{},computed:Object(i["a"])({},Object(r["c"])(["user"])),data:function(){return{bannerIndex:null,selectBoard:"notice",notice:[],event:[],faq:[]}},created:function(){this.getDashboard()},methods:{getDashboard:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/api/get-dashboard",{n:100});case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:t.notice=s.data.notice,t.event=s.data.event,t.faq=s.data.faq;case 8:case"end":return a.stop()}}),a)})))()},openKplay:function(t){var a=this;return Object(o["a"])(regeneratorRuntime.mark((function s(){var e,n;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return e=window.open("","kplay","_blank"),s.next=3,a.$http.get("/api/kpay-url",{id:t},!1);case 3:n=s.sent,e.location=n.data.launch_url;case 5:case"end":return s.stop()}}),s)})))()}}},l=c,d=(s("01bf"),s("2877")),u=Object(d["a"])(l,e,n,!1,null,null,null);a["default"]=u.exports}}]);