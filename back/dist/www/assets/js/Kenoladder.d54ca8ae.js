(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Kenoladder"],{"1b65":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"row d-xl-none"},[a("div",{staticClass:"col-12 text-center money-bg fixed-top"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("img",{staticClass:"mr-1",attrs:{src:"/images/icon-logged-money.png",alt:"보유머니"}}),a("span",{staticClass:"text-primary"},[t._v(" "+t._s(t.$numeral(t.money).format("0,0"))+" "),a("span",[t._v("원")])])]),a("div",{staticClass:"col-4"},[a("img",{staticClass:"mr-1",attrs:{src:"/images/icon-logged-point.png",alt:"포인트"}}),a("span",{staticClass:"text-warning"},[t._v(" "+t._s(t.$numeral(t.point).format("0,0"))+" "),a("span",[t._v("P")])])]),a("div",{staticClass:"col-4"},[a("img",{staticClass:"mr-1",attrs:{src:"/images/icon-logged-casino.png",alt:"카지노머니"}}),a("span",{staticClass:"text-danger"},[t._v(" "+t._s(t.$numeral(t.casinoMoney).format("0,0"))+" "),a("span",[t._v("원")])])])])])])])},n=[],i={name:"NavTop",data:function(){return{routeName:"",canAccess:!1}},created:function(){},methods:{currentMenu:function(t){return t===this.routeName?"font-weight-bold text-danger":""},goRouter:function(t){this.$router.push(t)["catch"]((function(){}))},goPopup:function(t){window.open(t)}},computed:{thisRouter:function(){return this.$store.state.router},isLogin:function(){return this.$store.state.isLogin},nick:function(){return this.$store.state.user.nick},grade:function(){return this.$store.state.user.grade},money:function(){return this.$numeral(this.$store.state.user.money).format("0,0")},point:function(){return this.$numeral(this.$store.state.user.point).format("0,0")},messageCount:function(){return this.$numeral(this.$store.state.user.messageCount).format("0,0")},betMoney:function(){return this.$numeral(this.$store.state.user.betMoney).format("0,0")},casinoMoney:function(){return this.$store.state.user.casinoMoney}}},r=i,o=(a("eac9"),a("2877")),l=Object(o["a"])(r,s,n,!1,null,null,null);e["a"]=l.exports},"2faa":function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-2 mb-5"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"row no-gutters-25 px-xl-2"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"row"},[t._m(0),a("div",{staticClass:"col-5 text-right"},[a("button",{staticClass:"btn btn-xs btn-danger ml-2 py-1",attrs:{type:"button",disabled:t.disabledButton},on:{click:function(e){return t.deleteBetAll()}}},[a("font-awesome-icon",{attrs:{icon:["fa","trash-alt"]}}),t._v(" 전체삭제 ")],1)]),a("div",{staticClass:"col-12 mt-2"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-striped table-borderless text-nowrap table-light"},[t._m(1),a("tbody",t._l(t.betListMinigames,(function(e,s){return a("tr",{key:s,staticClass:"bg-content text-light-gray",class:"W"===e.betResult?"text-primary":"L"===e.betResult?"text-danger":"",staticStyle:{"border-bottom":"1px solid #aaa !important"}},[a("td",[t._v(" "+t._s(e.rotation)+" "+t._s(t.betSelectConvert(e.betType,e.betSelect))+" "),e.isAuto?a("span",{staticClass:"badge badge-info"},[t._v("A")]):t._e()]),a("td",[t._v(" "+t._s(t.$numeral(e.betAmount).format("0,0"))+" ")]),a("td",{class:"W"===e.betResult?"text-primary":""},[t._v(" "+t._s("W"===e.betResult?t.$numeral(e.betBenefit).format(0,0):"L"===e.betResult?0:"진행중")+" ")]),a("td",[a("span",{staticClass:"badge badge-danger p-1 cursor-pointer",on:{click:function(a){return t.deleteBet(e._id)}}},[t._v("삭제")])])])})),0)])])])])])])])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-7 betting-details-title"},[a("strong",[t._v("배팅내역(최근 7일이내 / 50개)")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",{staticClass:"bg-light-violet text-white"},[a("tr",[a("th",[t._v("회차/배팅")]),a("th",[t._v("배팅머니")]),a("th",[t._v("당첨금")]),a("th",[t._v("삭제")])])])}],i=(a("99af"),a("ac1f"),a("5319"),a("96cf"),a("1da1")),r={name:"BetListMinigames",data:function(){return{}},methods:{deleteBet:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.$http["delete"]("/api/minigames-bet-delete",{_id:t});case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:e.$store.dispatch("betListMinigames",e.thisRouter.toLowerCase().replace(/powerballr/gi,"powerball"));case 6:case"end":return a.stop()}}),a)})))()},deleteBetAll:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http["delete"]("/api/minigames-bet-delete-all-type",{gameKind:t.thisRouter.toLowerCase().replace(/powerballr/gi,"powerball")});case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.$store.dispatch("betListMinigames",t.thisRouter.toLowerCase().replace(/powerballr/gi,"powerball"));case 6:case"end":return e.stop()}}),e)})))()},betSelectConvert:function(t,e){var a="";"PWBPOE"!==t&&"PWBPUO"!==t&&"PWBPCOMBO"!==t||(a="파워"),"PWBNOE"!==t&&"PWBNUO"!==t&&"PWBNCOMBO"!==t&&"PWBBMS"!==t&&"PWBBMSCOMBO"!==t||(a="일반"),"PWBRNAPOE"!==t&&"PWBRNCOMBO"!==t||(a="역");var s="";return"Odd"===e&&(s="홀"),"Even"===e&&(s="짝"),"Under"===e&&(s="언더"),"Over"===e&&(s="오버"),"OddUnder"===e&&(s="홀+언더"),"EvenUnder"===e&&(s="짝+언더"),"OddOver"===e&&(s="홀+오버"),"EvenOver"===e&&(s="짝+오버"),"Big"===e&&(s="대"),"Middle"===e&&(s="중"),"Small"===e&&(s="소"),"OddBig"===e&&(s="홀+대"),"OddMiddle"===e&&(s="홀+중"),"OddSmall"===e&&(s="홀+소"),"EvenBig"===e&&(s="짝+대"),"EvenMiddle"===e&&(s="짝+중"),"EvenSmall"===e&&(s="짝+소"),"OddUnderOdd"===e&&(s="홀+언더/홀"),"OddUnderEven"===e&&(s="홀+언더/짝"),"OddOverOdd"===e&&(s="홀+오버/홀"),"OddOverEven"===e&&(s="홀+오버/짝"),"EvenUnderOdd"===e&&(s="짝+언더/홀"),"EvenUnderEven"===e&&(s="짝+언더/짝"),"EvenOverOdd"===e&&(s="짝+오버/홀"),"EvenOverEven"===e&&(s="짝+오버/짝"),"Left"===e&&(s="좌출"),"Right"===e&&(s="우출"),"Three"===e&&(s="3줄"),"Four"===e&&(s="4줄"),"LeftThree"===e&&(s="좌3"),"LeftFour"===e&&(s="좌4"),"RightThree"===e&&(s="우3"),"RightFour"===e&&(s="우4"),"".concat(a," [").concat(s,"]")}},computed:{disabledButton:{get:function(){return this.$store.state.disabledButton},set:function(t){this.$store.commit("setDisabledButton",t)}},thisRouter:function(){return this.$store.state.router},betListMinigames:function(){return this.$store.state.betListMinigames}}},o=r,l=(a("5ed8"),a("2877")),d=Object(l["a"])(o,s,n,!1,null,"613d20fa",null);e["a"]=d.exports},4184:function(t,e,a){},"4b02":function(t,e,a){},"5ed8":function(t,e,a){"use strict";a("4b02")},"6eba":function(t,e,a){var s=a("23e7");s({target:"Date",stat:!0},{now:function(){return(new Date).getTime()}})},a5ef:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"kenoladder"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("NavMinigame")],1),a("div",{staticClass:"col-12 bg-content-mini"},[t._m(0),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"row px-2"},[a("div",{staticClass:"col-12 bg-content-game-dark rounded py-3 text-white"},[a("div",{staticClass:"float-left game-title"},[a("font-awesome-icon",{staticClass:"text-yellow",attrs:{icon:["fa","star"]}}),t._v(" KENO LADDER-"),a("span",{staticClass:"text-yellow"},[t._v(t._s(t.round))]),t._v(" ("),a("span",{staticClass:"text-yellow"},[t._v(t._s(t.rotation))]),t._v(") 회차 ")],1),a("div",{staticClass:"float-right"},[a("div",{staticClass:"game-time-box min-w-110px"},[a("span",[t._v("마감 : ")]),a("span",[t._v(t._s(t.minute?t.minute:"--")+":"+t._s(t.second?t.second:"--"))])])])])])])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"row px-2",attrs:{id:"section1"}},[t._m(1),a("div",{staticClass:"col-12 bg-minigame-background rounded py-3 mt-1"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDOE"===t.type&&"Odd"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDOE","Odd",t.games.KLDOE.rateOfOdd)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 blue",class:[this.end||!t.games.KLDOE.rateOfOdd?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"홀")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDOE.rateOfOdd?t.$numeral(t.games.KLDOE.rateOfOdd).format("0.00"):"--")+" ")])])]),t.$config.isKenoladderEven?t._e():a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button"},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 game-bet-end",class:[this.end||!t.games.KLDOE.rateOfEven?{"game-bet-end":!0}:""]},[t._v(" -- ")])]),a("div",{staticClass:"mt-1"},[t._v(" -- ")])])]),t.$config.isKenoladderEven?a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDOE"===t.type&&"Even"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDOE","Even",t.games.KLDOE.rateOfEven)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 red",class:[this.end||!t.games.KLDOE.rateOfEven?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"짝")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDOE.rateOfEven?t.$numeral(t.games.KLDOE.rateOfEven).format("0.00"):"--")+" ")])])]):t._e(),a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDLR"===t.type&&"Left"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDLR","Left",t.games.KLDLR.rateOfLeft)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 blue",class:[this.end||!t.games.KLDLR.rateOfLeft?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"좌")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDLR.rateOfLeft?t.$numeral(t.games.KLDLR.rateOfLeft).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDLR"===t.type&&"Right"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDLR","Right",t.games.KLDLR.rateOfRight)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 red",class:[this.end||!t.games.KLDLR.rateOfRight?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"우")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDLR.rateOfRight?t.$numeral(t.games.KLDLR.rateOfRight).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDTF"===t.type&&"Three"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDTF","Three",t.games.KLDTF.rateOfThree)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 blue",class:[this.end||!t.games.KLDTF.rateOfThree?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"3줄")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDTF.rateOfThree?t.$numeral(t.games.KLDTF.rateOfThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-2 px-1"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDTF"===t.type&&"Four"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDTF","Four",t.games.KLDTF.rateOfFour)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 red",class:[this.end||!t.games.KLDTF.rateOfFour?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"4줄")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDTF.rateOfFour?t.$numeral(t.games.KLDTF.rateOfFour).format("0.00"):"--")+" ")])])])])])]),a("div",{staticClass:"row mt-2 px-2",attrs:{id:"section2"}},[t._m(2),a("div",{staticClass:"col-12 bg-minigame-background rounded py-3 mt-1"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-3 px-2"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDCOMBO"===t.type&&"LeftThree"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDCOMBO","LeftThree",t.games.KLDCOMBO.rateOfLeftThree)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 blue",class:[this.end||!t.games.KLDCOMBO.rateOfLeftThree?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"좌3")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDCOMBO.rateOfLeftThree?t.$numeral(t.games.KLDCOMBO.rateOfLeftThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 px-2"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDCOMBO"===t.type&&"LeftFour"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDCOMBO","LeftFour",t.games.KLDCOMBO.rateOfLeftFour)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 red",class:[this.end||!t.games.KLDCOMBO.rateOfLeftFour?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"좌4")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDCOMBO.rateOfLeftFour?t.$numeral(t.games.KLDCOMBO.rateOfLeftFour).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 px-2"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDCOMBO"===t.type&&"RightThree"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDCOMBO","RightThree",t.games.KLDCOMBO.rateOfRightThree)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 blue",class:[this.end||!t.games.KLDCOMBO.rateOfRightThree?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"우3")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDCOMBO.rateOfRightThree?t.$numeral(t.games.KLDCOMBO.rateOfRightThree).format("0.00"):"--")+" ")])])]),a("div",{staticClass:"col-3 px-2"},[a("div",{staticClass:"rounded py-2 game-button",class:"KLDCOMBO"===t.type&&"RightFour"===t.select?"game-active":"",on:{click:function(e){return t.setBet(t.id,"KLDCOMBO","RightFour",t.games.KLDCOMBO.rateOfRightFour)}}},[a("div",[a("span",{staticClass:"badge p-1 p-lg-3 red",class:[this.end||!t.games.KLDCOMBO.rateOfRightFour?{"game-bet-end":!0}:""]},[t._v(" "+t._s(this.end?"--":"우4")+" ")])]),a("div",{staticClass:"mt-1"},[t._v(" "+t._s(this.end?"--":t.games.KLDCOMBO.rateOfRightFour?t.$numeral(t.games.KLDCOMBO.rateOfRightFour).format("0.00"):"--")+" ")])])])])])])])]),a("BetListMinigames")],1)])])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"row px-2"},[a("div",{staticClass:"col-12 bg-content rounded py-3"},[a("div",{attrs:{id:"wrap_game"}},[a("iframe",{staticClass:"iframe-game",attrs:{src:"http://named.com/games/kenoladder/view.php",scrolling:"no"}})])])])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 bg-content-game-dark rounded py-2 text-gray"},[a("span",{staticClass:"text-light-yellow"},[t._v("키노사다리")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col-12 bg-content-game-dark rounded py-2 text-gray"},[a("span",{staticClass:"text-light-yellow"},[t._v("키노사다리 조합")])])}],i=(a("99af"),a("6eba"),a("0d03"),a("4795"),a("96cf"),a("1da1")),r=a("1b65"),o=a("2faa"),l={name:"Kenoladder",components:{NavMinigame:r["a"],BetListMinigames:o["a"]},data:function(){return{end:!1,id:null,rotation:0,round:0,gameTime:null,localTime:null,serverTime:null,minute:null,second:null,games:{KLDOE:{rateOfOdd:null,rateOfEven:null},KLDLR:{rateOfLeft:null,rateOfRight:null},KLDTF:{rateOfThree:null,rateOfFour:null},KLDCOMBO:{rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null}},kenoladderInterval:null,betlistInterval:null}},created:function(){this.getKenoladderBetInfo()},mounted:function(){window.addEventListener("resize",this.kenoladderHandleResize),this.kenoladderHandleResize(),this.getKenoladder(),this.$store.commit("deleteBetCartAll")},methods:{kenoladderHandleResize:function(){var t=830,e=565,a=0,s=document.querySelector(".kenoladder").offsetWidth-16;a=Math.floor(s/t*1e3/10)/100,a>1&&(a=1),s>t&&(s=t);var n=Math.ceil(e*a);n>e&&(n=e),s>t*a&&(s=Math.ceil(t*a)),document.querySelector("#wrap_game").style.width=s+"px",document.querySelector("#wrap_game").style.height=n+"px",document.querySelector(".iframe-game").style.transform="scale("+a+")"},timeSet:function(){var t=this,e=this.$config.kenoladderTerm,a=Date.now()+(this.serverTime-this.localTime),s=(this.gameTime-a)/1e3-e,n="0"+Math.floor(s%3600/60),i="0"+Math.floor(s%60);s<=0&&(n="00",i="00"),n.length>2&&(n=n.substring(1,3)),i.length>2&&(i=i.substring(1,3)),this.minute=n,this.second=i,s<=0?(this.end=!0,this.$store.commit("deleteBetCartAll")):this.end=!1,s<=-1*(e+3)&&(clearInterval(this.kenoladderInterval),this.getKenoladder(),clearInterval(this.betlistInterval),this.betlistInterval=setTimeout((function(){t.$store.dispatch("betListMinigames","kenoladder"),t.$store.dispatch("getInformation")}),15e3))},getKenoladderBetInfo:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-kenoladder-bet-info");case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.$store.commit("setBetInfo",{betMin:a.data.min,betMax:a.data.max,benefitMax:a.data.benefit});case 6:case"end":return e.stop()}}),e)})))()},getKenoladder:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-kenoladder",null,"Kenoladder");case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:if(a.data){e.next=9;break}return t.end=!0,t.kenoladderInterval=setInterval((function(){t.timeSet()}),1e3),e.abrupt("return");case 9:a.data.rotation>0&&a.data.rotation>t.rotation&&0===t.rotation&&t.$store.dispatch("betListMinigames","kenoladder"),t.id=a.data._id,a.data.rotation>0&&a.data.rotation>t.rotation&&(t.gameTime=new Date(t.$moment(a.data.gameDateTime).format("YYYY/MM/DD HH:mm:ss")).getTime(),t.localTime=Date.now(),t.serverTime=a.data.serverTime,t.rotation=a.data.rotation,t.round=a.data.round,t.games=a.data.games,a.data.games.KLDOE||(t.games.KLDOE={rateOfOdd:null,rateOfEven:null}),a.data.games.KLDLR||(t.games.KLDLR={rateOfLeft:null,rateOfRight:null}),a.data.games.KLDTF||(t.games.KLDTF={rateOfThree:null,rateOfFour:null}),a.data.games.KLDCOMBO||(t.games.KLDCOMBO={rateOfLeftThree:null,rateOfLeftFour:null,rateOfRightThree:null,rateOfRightFour:null})),t.kenoladderInterval=setInterval((function(){t.timeSet()}),1e3);case 13:case"end":return e.stop()}}),e)})))()},setBet:function(t,e,a,s){if(!this.end&&s)if(e===this.type&&a===this.select)this.$store.commit("deleteBetCartAll");else{var n="";n="KLDOE"===e||"KLDLR"===e||"KLDTF"===e?"#section1":"#section2",window.innerWidth<1200&&this.$scrollTo(n,300,{offset:-70}),this.$store.commit("setBetCartMinigames",{_id:t,gameInfo:"키노사다리-".concat(this.round," (").concat(this.rotation,") 회차"),gameType:"minigame",gameKind:"kenoladder",type:e,select:a,selectRate:s})}}},computed:{disabledButton:{get:function(){return this.$store.state.disabledButton},set:function(t){this.$store.commit("setDisabledButton",t)}},type:function(){return this.$store.state.betCart.length>0?this.$store.state.betCart[0].type:null},select:function(){return this.$store.state.betCart.length>0?this.$store.state.betCart[0].select:null}},beforeRouteLeave:function(t,e,a){window.removeEventListener("resize",this.kenoladderHandleResize),clearInterval(this.kenoladderInterval),clearTimeout(this.betlistInterval),this.$store.commit("deleteBetCartAll"),document.querySelector("#betAmount").value=0,this.$store.commit("setBetAmount",0),a()}},d=l,c=a("2877"),u=Object(c["a"])(d,s,n,!1,null,null,null);e["default"]=u.exports},eac9:function(t,e,a){"use strict";a("4184")}}]);