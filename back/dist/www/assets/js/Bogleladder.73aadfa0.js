(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Bogleladder"],{"69cf":function(t,e,a){},"6a9f":function(t,e,a){},"6eba":function(t,e,a){var s=a("23e7"),i=a("da84"),r=a("e330"),n=i.Date,l=r(n.prototype.getTime);s({target:"Date",stat:!0},{now:function(){return l(new n)}})},"848c":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mb-5",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col mb-3"},[a("div",{staticClass:"row mt-3"},[t._m(0),a("div",{staticClass:"col text-right d-none d-xl-block"},[a("button",{staticClass:"btn-board red px-4 py-2",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.deleteBetAll()}}},[t._v(" 전체삭제 ")])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-list"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col px-0 text-center"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-borderless table-board text-nowrap"},[t._m(1),a("tbody",t._l(t.minigameBetListRecent,(function(e,s){return a("tr",{key:s},[a("td",[t._v(" "+t._s(t.$config.convertMiniGameType[e.gameKind])+" ")]),a("td",[t._v(" "+t._s(e.round)+" ("+t._s(e.rotation)+") "+t._s(t.betSelectConvert(e.betType,e.betSelect))+" "),e.isFollow?a("span",{staticClass:"badge badge-info"},[t._v("F")]):t._e()]),a("td",[t._v(t._s(t.$numeral(e.betAmount).format("0,0")))]),a("td",{class:"W"===e.betResult?"text-blue":"L"===e.betResult?"text-pink":""},[t._v(t._s("W"===e.betResult?t.$numeral(e.betBenefit).format(0,0):"L"===e.betResult?0:"진행중"))]),a("td",{class:"W"===e.betResult?"text-blue":"L"===e.betResult?"text-red":""},[t._v(t._s("W"===e.betResult?"당첨":"L"===e.betResult?"미당첨":""))]),a("td",[a("span",{staticClass:"badge badge-danger p-1 cursor-pointer",on:{click:function(a){return t.deleteBet(e._id)}}},[t._v("삭제")])])])})),0)])])])])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[t._v(" 베팅내역 ("),a("span",[t._v("최근7일이내/최대50개")]),t._v(") ")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{},[t._v("종류")]),a("th",[t._v("회차/배팅")]),a("th",[t._v("배팅머니")]),a("th",[t._v("당첨금")]),a("th",[t._v("결과")]),a("th",{staticClass:"w-10"},[t._v("삭제")])])])}],r=a("1da1"),n=a("5530"),l=(a("99af"),a("96cf"),a("2f62")),c={name:"MinigameBetListRecent",computed:Object(n["a"])({},Object(l["c"])(["loading","minigameBetListRecent"])),data:function(){return{}},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["getMinigameBetListRecent"])),{},{deleteBet:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$http["delete"]("/api/bet-delete",{_id:t});case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:e.getMinigameBetListRecent();case 6:case"end":return a.stop()}}),a)})))()},deleteBetAll:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http["delete"]("/api/bet-delete-all");case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.getMinigameBetListRecent();case 6:case"end":return e.stop()}}),e)})))()},betSelectConvert:function(t,e){var a="";"PWBPOE"!==t&&"PWBPUO"!==t&&"PWBPCOMBO"!==t||(a="파워"),"PWBNOE"!==t&&"PWBNUO"!==t&&"PWBNCOMBO"!==t&&"PWBBMS"!==t&&"PWBBMSCOMBO"!==t||(a="일반"),"PWBRNAPOE"!==t&&"PWBRNCOMBO"!==t||(a="역");var s="";return"Odd"===e&&(s="홀"),"Even"===e&&(s="짝"),"Under"===e&&(s="언더"),"Over"===e&&(s="오버"),"OddUnder"===e&&(s="홀+언더"),"EvenUnder"===e&&(s="짝+언더"),"OddOver"===e&&(s="홀+오버"),"EvenOver"===e&&(s="짝+오버"),"Big"===e&&(s="대"),"Middle"===e&&(s="중"),"Small"===e&&(s="소"),"OddBig"===e&&(s="홀+대"),"OddMiddle"===e&&(s="홀+중"),"OddSmall"===e&&(s="홀+소"),"EvenBig"===e&&(s="짝+대"),"EvenMiddle"===e&&(s="짝+중"),"EvenSmall"===e&&(s="짝+소"),"OddUnderOdd"===e&&(s="홀+언더/홀"),"OddUnderEven"===e&&(s="홀+언더/짝"),"OddOverOdd"===e&&(s="홀+오버/홀"),"OddOverEven"===e&&(s="홀+오버/짝"),"EvenUnderOdd"===e&&(s="짝+언더/홀"),"EvenUnderEven"===e&&(s="짝+언더/짝"),"EvenOverOdd"===e&&(s="짝+오버/홀"),"EvenOverEven"===e&&(s="짝+오버/짝"),"Left"===e&&(s="좌출"),"Right"===e&&(s="우출"),"Three"===e&&(s="3줄"),"Four"===e&&(s="4줄"),"LeftThree"===e&&(s="좌3"),"LeftFour"===e&&(s="좌4"),"RightThree"===e&&(s="우3"),"RightFour"===e&&(s="우4"),"".concat(a," [").concat(s,"]")}})},o=c,d=a("2877"),u=Object(d["a"])(o,s,i,!1,null,null,null);e["a"]=u.exports},"8a83":function(t,e,a){"use strict";a("69cf")},"9fd3":function(t,e,a){"use strict";a("6a9f")},aa95:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid d-none d-xl-block"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 nrgent-notice"},[a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-11 notice"},[a("marquee",{attrs:{direction:"left"}},[t._v(t._s(t.shortNotice))])],1)])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-1 px-4"},[a("div",{staticClass:"notice-button"},[t._v("긴급공지")])])}],r=a("5530"),n=a("2f62"),l={computed:Object(r["a"])({},Object(n["c"])(["shortNotice"]))},c=l,o=(a("9fd3"),a("2877")),d=Object(o["a"])(c,s,i,!1,null,"825dfcd0",null);e["a"]=d.exports},d823:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("UrgentNotice"),a("div",{staticClass:"content-box"},[a("hr",{staticClass:"mt-0 pb-3 d-none d-xl-block"}),a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-7 text-right d-none d-xl-block"},[a("div",{staticClass:"minigame-menu"},[a("ul",[a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/googlepowerball1",!1)}}},[t._v("구글 1분")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/googlepowerball3",!1)}}},[t._v("구글 3분")])]),a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/speedladder",!1)}}},[t._v("스피드사다리")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/coinpowerball",!1)}}},[t._v("코인 5분")])]),a("li",[a("div",{staticClass:"active",on:{click:function(e){return t.$tools.pushRouter("/bogleladder",!1)}}},[t._v("보글사다리")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/coinpowerball3",!1)}}},[t._v("코인 3분")])]),a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/boglepowerball",!1)}}},[t._v("보글파워볼")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/eospowerball",!1)}}},[t._v("EOS 5분")])]),a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/kenoladder",!1)}}},[t._v("키노사다리")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/eospowerball3",!1)}}},[t._v("EOS 3분")])]),a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/powerladder",!1)}}},[t._v("파워사다리")]),a("div",{staticClass:"mt-2",on:{click:function(e){return t.$tools.pushRouter("/eospowerball1",!1)}}},[t._v("EOS 1분")])]),a("li",[a("div",{on:{click:function(e){return t.$tools.pushRouter("/powerball",!1)}}},[t._v("파워볼")])])])])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col px-0 d-xl-none"},[a("div",{staticClass:"header-mobile-menu"},[a("div",{staticClass:"header-mobile-menu-wrap"},[a("ul",[a("li",{on:{click:function(e){return t.$tools.pushRouter("/powerball",!1)}}},[t._v("파워볼")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/powerladder",!1)}}},[t._v("파워사다리")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/kenoladder",!1)}}},[t._v("키노사다리")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/boglepowerball",!1)}}},[t._v("보글파워볼")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/bogleladder",!1)}}},[t._v(" 보글사다리 "),a("div",{staticClass:"active"})]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/speedladder",!0)}}},[t._v("스피드사다리")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/googlepowerball1",!1)}}},[t._v("구글 1분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/googlepowerball3",!1)}}},[t._v("구글 3분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/eospowerball1",!1)}}},[t._v("EOS 1분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/eospowerball3",!1)}}},[t._v("EOS 3분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/eospowerball",!1)}}},[t._v("EOS 5분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/coinpowerball3",!1)}}},[t._v("코인 3분")]),a("li",{on:{click:function(e){return t.$tools.pushRouter("/coinpowerball",!1)}}},[t._v("코인 5분")])])])])])]),a("hr",{staticClass:"d-none d-xl-block"}),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col"},[a("div",{staticClass:"minigames px-xl-3"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.isHide,expression:"!isHide"}],staticClass:"row mt-1"},[t._m(1)]),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col d-xl-none"},[a("div",{staticClass:"row"},[t._m(2),a("div",{staticClass:"col"},[a("div",{staticClass:"game-title-time"},[t._v(" 마감 : "+t._s(t.minute?t.minute:"--")+":"+t._s(t.second?t.second:"--")+" ")])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 game-title-round"},[a("span",{staticClass:"text-blue"},[t._v(t._s(t.round))]),t._v(" ("),a("span",{staticClass:"text-blue"},[t._v(t._s(t.rotation))]),t._v(") 회차 ")])])])]),a("div",{staticClass:"row mt-xl-4"},[a("div",{staticClass:"col d-none d-xl-block"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-7 game-title-round"},[a("span",{staticClass:"text-blue"},[t._v(t._s(t.round))]),t._v(" ("),a("span",{staticClass:"text-blue"},[t._v(t._s(t.rotation))]),t._v(") 회차 ")]),t._m(3),t._m(4),t._m(5),a("div",{staticClass:"col pl-xl-0"},[a("div",{staticClass:"game-title-time"},[t._v(" 마감 : "+t._s(t.minute?t.minute:"--")+":"+t._s(t.second?t.second:"--")+" ")])])])])]),a("hr",{staticClass:"mt-0 mt-xl-3"}),t._m(6),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-blue",class:"BLDLR"===t.betType&&"Left"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDLR","Left",t.games.BLDLR.rateOfLeft)}}},[a("div",[t._v("좌")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDLR.rateOfLeft?t.$numeral(t.games.BLDLR.rateOfLeft).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-red",class:"BLDLR"===t.betType&&"Right"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDLR","Right",t.games.BLDLR.rateOfRight)}}},[a("div",[t._v("우")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDLR.rateOfRight?t.$numeral(t.games.BLDLR.rateOfRight).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-blue",class:"BLDTF"===t.betType&&"Three"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDTF","Three",t.games.BLDTF.rateOfThree)}}},[a("div",[t._v("3줄")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDTF.rateOfThree?t.$numeral(t.games.BLDTF.rateOfThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-red",class:"BLDTF"===t.betType&&"Four"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDTF","Four",t.games.BLDTF.rateOfFour)}}},[a("div",[t._v("4줄")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDTF.rateOfFour?t.$numeral(t.games.BLDTF.rateOfFour).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-blue",class:"BLDOE"===t.betType&&"Odd"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDOE","Odd",t.games.BLDOE.rateOfOdd)}}},[a("div",[t._v("홀")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDOE.rateOfOdd?t.$numeral(t.games.BLDOE.rateOfOdd).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 col-md"},[a("div",{staticClass:"btn-bet btn-bet-red",class:"BLDOE"===t.betType&&"Even"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDOE","Even",t.games.BLDOE.rateOfEven)}}},[a("div",[t._v("짝")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDOE.rateOfEven?t.$numeral(t.games.BLDOE.rateOfEven).format("0.00"):"--")+" ")])])])]),t._m(7),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col-3 col-md"},[a("div",{staticClass:"btn-bet btn-bet-blue",class:"BLDCOMBO"===t.betType&&"LeftThree"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDCOMBO","LeftThree",t.games.BLDCOMBO.rateOfLeftThree)}}},[a("div",[t._v("좌3")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDCOMBO.rateOfLeftThree?t.$numeral(t.games.BLDCOMBO.rateOfLeftThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 col-md"},[a("div",{staticClass:"btn-bet btn-bet-blue",class:"BLDCOMBO"===t.betType&&"LeftFour"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDCOMBO","LeftFour",t.games.BLDCOMBO.rateOfLeftFour)}}},[a("div",[t._v("좌4")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDCOMBO.rateOfLeftFour?t.$numeral(t.games.BLDCOMBO.rateOfLeftFour).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 col-md"},[a("div",{staticClass:"btn-bet btn-bet-red",class:"BLDCOMBO"===t.betType&&"RightThree"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDCOMBO","RightThree",t.games.BLDCOMBO.rateOfRightThree)}}},[a("div",[t._v("우3")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDCOMBO.rateOfRightThree?t.$numeral(t.games.BLDCOMBO.rateOfRightThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 col-md"},[a("div",{staticClass:"btn-bet btn-bet-red",class:"BLDCOMBO"===t.betType&&"RightFour"===t.betSelect?"game-active":"",on:{click:function(e){return t.setBet(t.id,"BLDCOMBO","RightFour",t.games.BLDCOMBO.rateOfRightFour)}}},[a("div",[t._v("우4")]),a("div",{staticClass:"rate"},[t._v(" "+t._s(this.end?"--":t.games.BLDCOMBO.rateOfRightFour?t.$numeral(t.games.BLDCOMBO.rateOfRightFour).format("0.00"):"--")+" ")])])])])])])]),a("div",{staticClass:"row mt-5"},[a("div",{staticClass:"col"},[a("MinigameBetListRecent")],1)])])],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col"},[a("div",{staticClass:"title"},[t._v(" 보글 사다리 "),a("span",[t._v("BOGLE LADDER")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"broadcast"},[a("div",{attrs:{id:"frame-wrap-bepick"}},[a("iframe",{staticClass:"iframe-game-bepick",attrs:{src:"https://bepick.net/live/bubbleladder",scrolling:"no"}})])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col pl-5"},[a("div",{staticClass:"game-title-time-second"},[t._v(" 중계 접기 ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col px-0"},[a("div",{staticClass:"game-title-time-second"},[t._v(" 중계 접기 ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col px-0"},[a("div",{staticClass:"game-title-time-second"},[t._v(" 게임방법 ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col px-0"},[a("div",{staticClass:"game-title-time-second"},[t._v(" 공식홈페이지 ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-3",attrs:{id:"section1"}},[a("div",{staticClass:"col-12"},[t._v(" 보글 사다리 ")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-3",attrs:{id:"section2"}},[a("div",{staticClass:"col-12"},[t._v(" 보글 사다리 조합 ")])])}],r=a("1da1"),n=a("5530"),l=(a("96cf"),a("6eba"),a("0d03"),a("4795"),a("99af"),a("2f62")),c=a("848c"),o=a("aa95"),d={name:"Bogleladder",components:{MinigameBetListRecent:c["a"],UrgentNotice:o["a"]},computed:Object(n["a"])(Object(n["a"])({},Object(l["c"])(["loading","betCart","router","isLogin"])),{},{betType:function(){return this.betCart.length>0?this.betCart[0].betType:null},betSelect:function(){return this.betCart.length>0?this.betCart[0].betSelect:null}}),data:function(){return{isHide:!1,end:!1,id:null,rotation:0,round:0,gameTime:null,localTime:null,serverTime:null,minute:null,second:null,games:{BLDOE:{rateOfOdd:null,rateOfEven:null},BLDLR:{rateOfLeft:null,rateOfRight:null},BLDTF:{rateOfThree:null,rateOfFour:null},BLDCOMBO:{rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null}},gameInterval:null,betlistInterval:null}},created:function(){this.getGame()},mounted:function(){window.addEventListener("resize",this.frameHandleResize),this.frameHandleResize()},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["deleteBetCartAll","getInformation","getMinigameBetListRecent","setCartMinigames"])),{},{frameHandleResize:function(){var t=document.querySelector(".broadcast").offsetWidth;if(t>830)document.querySelector("#frame-wrap-bepick").style.width="100%",document.querySelector("#frame-wrap-bepick").style.height="660px",document.querySelector(".iframe-game-bepick").style.width="100%",document.querySelector(".iframe-game-bepick").style.transform="scale(1.0)";else{document.querySelector("#frame-wrap-bepick").style.width="830px",document.querySelector(".iframe-game-bepick").style.width="830px";var e=830,a=660,s=window.innerWidth,i=280,r=280,n=0;s>=1200&&(n=s-i-r-112,n<=e&&(t=n));var l=0;l=Math.floor(t/e*1e3/10)/100,l>1&&(l=1),t>e&&(t=e);var c=Math.ceil(a*l);c>a&&(c=a),t>e*l&&(t=Math.ceil(e*l)),document.querySelector("#frame-wrap-bepick").style.width=t+"px",document.querySelector("#frame-wrap-bepick").style.height=c+"px",document.querySelector(".iframe-game-bepick").style.transform="scale("+l+")"}},timeSet:function(){var t=this,e=this.$config.bogleladderTerm,a=Date.now()+(this.serverTime-this.localTime),s=(this.gameTime-a)/1e3-e,i="0"+Math.floor(s%3600/60),r="0"+Math.floor(s%60);s<=0&&(i="00",r="00"),i.length>2&&(i=i.substring(1,3)),r.length>2&&(r=r.substring(1,3)),this.minute=i,this.second=r,s<=0?(this.end=!0,this.deleteBetCartAll()):this.end=!1,s<=-1*(e+3)&&(clearInterval(this.gameInterval),this.getGame(),clearTimeout(this.betlistInterval),this.betlistInterval=setTimeout((function(){t.getMinigameBetListRecent(),t.getInformation()}),2e4))},getGame:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-bogleladder");case 2:if(a=e.sent,a.data){e.next=7;break}return t.end=!0,"Bogleladder"===t.router?t.gameInterval=setInterval((function(){t.timeSet()}),1e3):(clearInterval(t.gameInterval),clearTimeout(t.betlistInterval)),e.abrupt("return");case 7:t.getMinigameBetListRecent(),t.id=a.data._id,a.data.rotation>0&&a.data.rotation>t.rotation&&(t.gameTime=new Date(t.$moment(a.data.gameDateTime).format("YYYY/MM/DD HH:mm:ss")).getTime(),t.localTime=Date.now(),t.serverTime=a.data.serverTime,t.rotation=a.data.rotation,t.round=a.data.round,t.games=a.data.games,a.data.games.BLDOE||(t.games.BLDOE={rateOfOdd:null,rateOfEven:null}),a.data.games.BLDLR||(t.games.BLDLR={rateOfLeft:null,rateOfRight:null}),a.data.games.BLDTF||(t.games.BLDTF={rateOfThree:null,rateOfFour:null}),a.data.games.BLDCOMBO||(t.games.BLDCOMBO={rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null})),"Bogleladder"===t.router?t.gameInterval=setInterval((function(){t.timeSet()}),1e3):(clearInterval(t.gameInterval),clearTimeout(t.betlistInterval));case 11:case"end":return e.stop()}}),e)})))()},setBet:function(t,e,a,s){if(this.isLogin){if(!this.end&&s)if(e===this.betType&&a===this.betSelect)this.deleteBetCartAll();else{var i="";i="BLDOE"===e||"BLDLR"===e||"BLDTF"===e?"#section1":"#section2",window.innerWidth<1200&&this.$scrollTo(i,300,{offset:-70}),this.setCartMinigames({_id:t,gameInfo:"".concat(this.round," (").concat(this.rotation,") 회차"),gameType:"minigame",gameKind:"bogleladder",betType:e,betSelect:a,selectRate:s})}}else this.$tools.sw("info","로그인","로그인 후 이용 가능 합니다.")}}),beforeRouteLeave:function(t,e,a){window.removeEventListener("resize",this.frameHandleResize),clearInterval(this.gameInterval),clearTimeout(this.betlistInterval),this.deleteBetCartAll(),a()}},u=d,v=(a("8a83"),a("2877")),m=Object(v["a"])(u,s,i,!1,null,"d0291c46",null);e["default"]=m.exports}}]);