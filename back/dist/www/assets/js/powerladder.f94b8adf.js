(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["powerladder"],{3415:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"content-box"},[e._m(0),a("hr"),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"minigames"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!e.isHide,expression:"!isHide"}],staticClass:"row mt-1"},[e._m(1)]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"minigame-info clearfix"},[a("div",{staticClass:"float-left"},[a("font-awesome-icon",{staticClass:"text-light-brown",attrs:{icon:["fa","star"]}}),e._v(" 파워 사다리-"),a("span",{staticClass:"text-light-brown"},[e._v(e._s(e.round))]),e._v(" ("),a("span",{staticClass:"text-light-brown"},[e._v(e._s(e.rotation))]),e._v(") 회차 ")],1),a("div",{staticClass:"float-right"},[a("div",{staticClass:"game-time-box"},[a("span",[e._v("마감 : ")]),a("span",[e._v(e._s(e.minute?e.minute:"--")+":"+e._s(e.second?e.second:"--"))])])])])])]),e._m(2),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDLR"===e.betType&&"Left"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDLR","Left",e.games.PLDLR.rateOfLeft)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDLR.rateOfLeft?"":"blue"},[a("span",[e._v("좌")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDLR.rateOfLeft?e.$numeral(e.games.PLDLR.rateOfLeft).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDLR"===e.betType&&"Right"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDLR","Right",e.games.PLDLR.rateOfRight)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDLR.rateOfRight?"":"red"},[a("span",[e._v("우")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDLR.rateOfRight?e.$numeral(e.games.PLDLR.rateOfRight).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDTF"===e.betType&&"Three"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDTF","Three",e.games.PLDTF.rateOfThree)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDTF.rateOfThree?"":"blue"},[a("span",[e._v("3줄")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDTF.rateOfThree?e.$numeral(e.games.PLDTF.rateOfThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDTF"===e.betType&&"Four"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDTF","Four",e.games.PLDTF.rateOfFour)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDTF.rateOfFour?"":"red"},[a("span",[e._v("4줄")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDTF.rateOfFour?e.$numeral(e.games.PLDTF.rateOfFour).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDOE"===e.betType&&"Odd"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDOE","Odd",e.games.PLDOE.rateOfOdd)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDOE.rateOfOdd?"":"blue"},[a("span",[e._v("홀")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDOE.rateOfOdd?e.$numeral(e.games.PLDOE.rateOfOdd).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDOE"===e.betType&&"Even"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDOE","Even",e.games.PLDOE.rateOfEven)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDOE.rateOfEven?"":"blue"},[a("span",[e._v("짝")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDOE.rateOfEven?e.$numeral(e.games.PLDOE.rateOfEven).format("0.00"):"--")+" ")])])])]),e._m(3),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDCOMBO"===e.betType&&"LeftThree"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDCOMBO","LeftThree",e.games.PLDCOMBO.rateOfLeftThree)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDCOMBO.rateOfLeftThree?"":"blue"},[a("span",[e._v("좌3")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDCOMBO.rateOfLeftThree?e.$numeral(e.games.PLDCOMBO.rateOfLeftThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDCOMBO"===e.betType&&"LeftFour"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDCOMBO","LeftFour",e.games.PLDCOMBO.rateOfLeftFour)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDCOMBO.rateOfLeftFour?"":"blue"},[a("span",[e._v("좌4")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDCOMBO.rateOfLeftFour?e.$numeral(e.games.PLDCOMBO.rateOfLeftFour).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDCOMBO"===e.betType&&"RightThree"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDCOMBO","RightThree",e.games.PLDCOMBO.rateOfRightThree)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDCOMBO.rateOfRightThree?"":"red"},[a("span",[e._v("우3")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDCOMBO.rateOfRightThree?e.$numeral(e.games.PLDCOMBO.rateOfRightThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col"},[a("div",{staticClass:"btn-minigame",class:"PLDCOMBO"===e.betType&&"RightFour"===e.betSelect?"active":"",on:{click:function(t){return e.setBet(e.id,"PLDCOMBO","RightFour",e.games.PLDCOMBO.rateOfRightFour)}}},[a("div",{staticClass:"bet",class:e.end||!e.games.PLDCOMBO.rateOfRightFour?"":"red"},[a("span",[e._v("우4")])]),a("div",{staticClass:"rate"},[e._v(" "+e._s(this.end?"--":e.games.PLDCOMBO.rateOfRightFour?e.$numeral(e.games.PLDCOMBO.rateOfRightFour).format("0.00"):"--")+" ")])])])])])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("MinigameBetListRecent")],1)])])])])},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"title"},[e._v(" 파워 사다리 "),a("span",[e._v("POWER LADDER")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"broadcast"},[a("div",{attrs:{id:"frame-wrap-named"}},[a("iframe",{staticClass:"iframe-game-named",attrs:{src:"https://named.com/games/powerladder/view.php",scrolling:"no"}})])])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"minigame-title",attrs:{id:"section1"}},[e._v(" 파워 사다리 배팅 ")])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"minigame-title",attrs:{id:"section2"}},[e._v(" 파워 사다리 조합 배팅 ")])])])}],r=(a("99af"),a("6eba"),a("0d03"),a("4795"),a("96cf"),a("1da1")),n=a("5530"),l=a("2f62"),c=a("848c"),d={name:"Powerladder",components:{MinigameBetListRecent:c["a"]},computed:Object(n["a"])(Object(n["a"])({},Object(l["c"])(["loading","betCart","router","isLogin"])),{},{betType:function(){return this.betCart.length>0?this.betCart[0].betType:null},betSelect:function(){return this.betCart.length>0?this.betCart[0].betSelect:null}}),data:function(){return{isHide:!1,end:!1,id:null,rotation:0,round:0,gameTime:null,localTime:null,serverTime:null,minute:null,second:null,games:{PLDOE:{rateOfOdd:null,rateOfEven:null},PLDLR:{rateOfLeft:null,rateOfRight:null},PLDTF:{rateOfThree:null,rateOfFour:null},PLDCOMBO:{rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null}},gameInterval:null,betlistInterval:null}},created:function(){this.getGame()},mounted:function(){window.addEventListener("resize",this.frameHandleResize),this.frameHandleResize()},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["deleteBetCartAll","getInformation","getMinigameBetListRecent","setCartMinigames"])),{},{frameHandleResize:function(){var e=document.querySelector(".broadcast").offsetWidth;if(e>830)document.querySelector("#frame-wrap-named").style.width="100%",document.querySelector("#frame-wrap-named").style.height="565px",document.querySelector(".iframe-game-named").style.width="100%",document.querySelector(".iframe-game-named").style.transform="scale(1.0)";else{document.querySelector("#frame-wrap-named").style.width="830px",document.querySelector(".iframe-game-named").style.width="830px";var t=830,a=565,s=window.innerWidth,i=280,r=280,n=0;s>=1200&&(n=s-i-r-112,n<=t&&(e=n));var l=0;l=Math.floor(e/t*1e3/10)/100,l>1&&(l=1),e>t&&(e=t);var c=Math.ceil(a*l);c>a&&(c=a),e>t*l&&(e=Math.ceil(t*l)),document.querySelector("#frame-wrap-named").style.width=e+"px",document.querySelector("#frame-wrap-named").style.height=c+"px",document.querySelector(".iframe-game-named").style.transform="scale("+l+")"}},timeSet:function(){var e=this,t=this.$config.powerladderTerm,a=Date.now()+(this.serverTime-this.localTime),s=(this.gameTime-a)/1e3-t,i="0"+Math.floor(s%3600/60),r="0"+Math.floor(s%60);s<=0&&(i="00",r="00"),i.length>2&&(i=i.substring(1,3)),r.length>2&&(r=r.substring(1,3)),this.minute=i,this.second=r,s<=0?(this.end=!0,this.deleteBetCartAll()):this.end=!1,s<=-1*(t+3)&&(clearInterval(this.gameInterval),this.getGame(),clearTimeout(this.betlistInterval),this.betlistInterval=setTimeout((function(){e.getMinigameBetListRecent(),e.getInformation()}),15e3))},getGame:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/api/get-powerladder");case 2:if(a=t.sent,a.data){t.next=7;break}return e.end=!0,"Powerladder"===e.router?e.gameInterval=setInterval((function(){e.timeSet()}),1e3):(clearInterval(e.gameInterval),clearTimeout(e.betlistInterval)),t.abrupt("return");case 7:e.getMinigameBetListRecent(),e.id=a.data._id,a.data.rotation>0&&a.data.rotation>e.rotation&&(e.gameTime=new Date(e.$moment(a.data.gameDateTime).format("YYYY/MM/DD HH:mm:ss")).getTime(),e.localTime=Date.now(),e.serverTime=a.data.serverTime,e.rotation=a.data.rotation,e.round=a.data.round,e.games=a.data.games,a.data.games.PLDOE||(e.games.PLDOE={rateOfOdd:null,rateOfEven:null}),a.data.games.PLDLR||(e.games.PLDLR={rateOfLeft:null,rateOfRight:null}),a.data.games.PLDTF||(e.games.PLDTF={rateOfThree:null,rateOfFour:null}),a.data.games.PLDCOMBO||(e.games.PLDCOMBO={rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null})),"Powerladder"===e.router?e.gameInterval=setInterval((function(){e.timeSet()}),1e3):(clearInterval(e.gameInterval),clearTimeout(e.betlistInterval));case 11:case"end":return t.stop()}}),t)})))()},setBet:function(e,t,a,s){if(this.isLogin){if(!this.end&&s)if(t===this.betType&&a===this.betSelect)this.deleteBetCartAll();else{var i="";i="PLDOE"===t||"PLDLR"===t||"PLDTF"===t?"#section1":"#section2",window.innerWidth<1200&&this.$scrollTo(i,300,{offset:-70}),this.setCartMinigames({_id:e,gameInfo:"".concat(this.round," (").concat(this.rotation,") 회차"),gameType:"minigame",gameKind:"powerladder",betType:t,betSelect:a,selectRate:s})}}else this.$tools.sw("info","로그인","로그인 후 이용 가능 합니다.")}}),beforeRouteLeave:function(e,t,a){window.removeEventListener("resize",this.frameHandleResize),clearInterval(this.gameInterval),clearTimeout(this.betlistInterval),this.deleteBetCartAll(),a()}},o=d,m=a("2877"),u=Object(m["a"])(o,s,i,!1,null,null,null);t["default"]=u.exports},"6eba":function(e,t,a){var s=a("23e7");s({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},"848c":function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[a("font-awesome-icon",{attrs:{icon:["fa","question-circle"]}}),a("span",{staticClass:"ml-2"},[e._v("최근 배팅내역")])],1)])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-list"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-board",attrs:{type:"button",disabled:e.loading},on:{click:function(t){return e.getMinigameBetListRecent()}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),e._v(" 새로고침 ")],1)])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-borderless table-board text-nowrap"},[e._m(0),a("tbody",e._l(e.minigameBetListRecent,(function(t,s){return a("tr",{key:s},[a("td",[e._v(" "+e._s(e.$config.convertMiniGameType[t.gameKind])+" ")]),a("td",[e._v(" "+e._s(t.round)+" ("+e._s(t.rotation)+") "+e._s(e.betSelectConvert(t.betType,t.betSelect))+" "),t.isFollow?a("span",{staticClass:"badge badge-info"},[e._v("F")]):e._e()]),a("td",[e._v(e._s(e.$numeral(t.betAmount).format("0,0")))]),a("td",{class:"W"===t.betResult?"text-green":"L"===t.betResult?"text-pink":""},[e._v(e._s("W"===t.betResult?e.$numeral(t.betBenefit).format(0,0):"L"===t.betResult?0:"진행중"))])])})),0)])])])])])])])])])},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("thead",[a("tr",[a("th",[e._v("종류")]),a("th",[e._v("회차/배팅")]),a("th",[e._v("배팅머니")]),a("th",[e._v("당첨금")])])])}],r=(a("99af"),a("96cf"),a("1da1")),n=a("5530"),l=a("2f62"),c={name:"MinigameBetListRecent",computed:Object(n["a"])({},Object(l["c"])(["loading","minigameBetListRecent"])),data:function(){return{}},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["getMinigameBetListRecent"])),{},{deleteBet:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http["delete"]("/api/bet-delete",{_id:e});case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:t.getMinigameBetListRecent();case 6:case"end":return a.stop()}}),a)})))()},deleteBetAll:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http["delete"]("/api/bet-delete-all");case 2:if(a=t.sent,!a.error){t.next=5;break}return t.abrupt("return");case 5:e.getMinigameBetListRecent();case 6:case"end":return t.stop()}}),t)})))()},betSelectConvert:function(e,t){var a="";"PWBPOE"!==e&&"PWBPUO"!==e&&"PWBPCOMBO"!==e||(a="파워"),"PWBNOE"!==e&&"PWBNUO"!==e&&"PWBNCOMBO"!==e&&"PWBBMS"!==e&&"PWBBMSCOMBO"!==e||(a="일반"),"PWBRNAPOE"!==e&&"PWBRNCOMBO"!==e||(a="역");var s="";return"Odd"===t&&(s="홀"),"Even"===t&&(s="짝"),"Under"===t&&(s="언더"),"Over"===t&&(s="오버"),"OddUnder"===t&&(s="홀+언더"),"EvenUnder"===t&&(s="짝+언더"),"OddOver"===t&&(s="홀+오버"),"EvenOver"===t&&(s="짝+오버"),"Big"===t&&(s="대"),"Middle"===t&&(s="중"),"Small"===t&&(s="소"),"OddBig"===t&&(s="홀+대"),"OddMiddle"===t&&(s="홀+중"),"OddSmall"===t&&(s="홀+소"),"EvenBig"===t&&(s="짝+대"),"EvenMiddle"===t&&(s="짝+중"),"EvenSmall"===t&&(s="짝+소"),"OddUnderOdd"===t&&(s="홀+언더/홀"),"OddUnderEven"===t&&(s="홀+언더/짝"),"OddOverOdd"===t&&(s="홀+오버/홀"),"OddOverEven"===t&&(s="홀+오버/짝"),"EvenUnderOdd"===t&&(s="짝+언더/홀"),"EvenUnderEven"===t&&(s="짝+언더/짝"),"EvenOverOdd"===t&&(s="짝+오버/홀"),"EvenOverEven"===t&&(s="짝+오버/짝"),"Left"===t&&(s="좌출"),"Right"===t&&(s="우출"),"Three"===t&&(s="3줄"),"Four"===t&&(s="4줄"),"LeftThree"===t&&(s="좌3"),"LeftFour"===t&&(s="좌4"),"RightThree"===t&&(s="우3"),"RightFour"===t&&(s="우4"),"".concat(a," [").concat(s,"]")}})},d=c,o=a("2877"),m=Object(o["a"])(d,s,i,!1,null,null,null);t["a"]=m.exports}}]);