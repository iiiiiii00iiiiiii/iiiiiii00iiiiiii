(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sportscross"],{"129f":function(a,t){a.exports=Object.is||function(a,t){return a===t?0!==a||1/a===1/t:a!=a&&t!=t}},"1ba0":function(a,t,e){"use strict";e.r(t);var s=function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[e("div",{staticClass:"col"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"page-title-wrap"},[e("div",{staticClass:"page-title"},[e("font-awesome-icon",{attrs:{icon:["fa","futbol"]}}),e("span",{staticClass:"ml-2"},[a._v("국내형 크로스 SPORTS CROSS")]),e("span",{staticClass:"float-right"},[e("button",{staticClass:"btn-board",attrs:{type:"button",disabled:a.loading},on:{click:function(t){return a.selectCategory("")}}},[e("font-awesome-icon",{attrs:{icon:["fa","globe"]}}),a._v(" 전체보기 ")],1)])],1)])])]),e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col"},[e("div",{staticClass:"sports-icon"},[e("div",{staticClass:"sports-icon-wrap"},[e("ul",[e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-all-gray.png",id:"All",alt:"전체",title:"전체"},on:{click:function(t){return a.selectCategory("")}}}),e("b-tooltip",{attrs:{target:"All",title:"전체"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-football-gray.png",id:"Football",alt:"축구",title:"축구"},on:{click:function(t){return a.selectCategory("Football")}}}),e("b-tooltip",{attrs:{target:"Football",title:"축구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-basketball-gray.png",id:"Basketball",alt:"농구",title:"농구"},on:{click:function(t){return a.selectCategory("Basketball")}}}),e("b-tooltip",{attrs:{target:"Basketball",title:"농구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-baseball-gray.png",id:"Baseball",alt:"야구",title:"야구"},on:{click:function(t){return a.selectCategory("Baseball")}}}),e("b-tooltip",{attrs:{target:"Baseball",title:"야구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-volleyball-gray.png",id:"Volleyball",alt:"배구",title:"배구"},on:{click:function(t){return a.selectCategory("Volleyball")}}}),e("b-tooltip",{attrs:{target:"Volleyball",title:"배구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-icehockey-gray.png",id:"Ice Hockey",alt:"아이스하키",title:"아이스하키"},on:{click:function(t){return a.selectCategory("Ice Hockey")}}}),e("b-tooltip",{attrs:{target:"Ice Hockey",title:"아이스하키"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-rugby-gray.png",id:"Rugby League",alt:"럭비",title:"럭비"},on:{click:function(t){return a.selectCategory("Rugby League")}}}),e("b-tooltip",{attrs:{target:"Rugby League",title:"럭비"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-lol-gray.png",id:"LOL",alt:"LOL",title:"LOL"},on:{click:function(t){return a.selectCategory("LoL")}}}),e("b-tooltip",{attrs:{target:"LOL",title:"LOL"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-mma-gray.png",id:"MMA",alt:"이종격투기",title:"이종격투기"},on:{click:function(t){return a.selectCategory("MMA")}}}),e("b-tooltip",{attrs:{target:"MMA",title:"이종격투기"}})],1)])])])])]),e("b-overlay",{attrs:{show:a.overlay,variant:"white",opacity:"0.2",rounded:"sm"}},[e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col"},[e("div",{staticClass:"sports"},a._l(a.data,(function(t,s){return e("div",{key:s,staticClass:"row mb-2"},[a.data[s].leagueKor!==(s>0?a.data[s-1].leagueKor:null)?e("div",{staticClass:"col-9 col-xl-12 mt-3 g-league-mobile"},[e("img",{staticClass:"sports-img",attrs:{src:"/images/"+a.$config.iconSport[t.sport]}}),e("span",{staticClass:"g-league"},[e("font-awesome-icon",{staticClass:"ml-1 icon-league",attrs:{icon:["fa","angle-double-right"]}}),a._v(" "+a._s(t.leagueKor)+" ")],1)]):a._e(),a.data[s].leagueKor!==(s>0?a.data[s-1].leagueKor:null)?e("div",{staticClass:"col-3 d-xl-none mt-3 text-right g-date-mobile"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]):a._e(),e("div",{staticClass:"col-12 mt-1",class:{"mb-3":s+1===a.data.length}},[e("div",{staticClass:"sports-px"},[t.games.xKor&&t.showConfig.xKor&&"ACTIVE"===t.games.xKor[0].status&&t.games.xKor[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{n:!t.showConfig.xKor||"ACTIVE"!==t.games.xKor[0].status||!t.games.xKor[0].showStatus,selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"xKor"===a.type&&null===a.standard&&"home"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"xKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"home",selectRate:t.games.xKor[0].homeRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[a._v(" "+a._s(t.homeTeamKor?t.homeTeamKor:t.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[a._v(" "+a._s(a.$numeral(t.games.xKor[0].homeRate).format("0.00"))+" ")])]),e("div",{staticClass:"col-2 g-x",class:{n:!t.showConfig.xKor||"ACTIVE"!==t.games.xKor[0].status||!t.games.xKor[0].showStatus,"can-bet":t.showConfig.xKor&&"ACTIVE"===t.games.xKor[0].status&&t.games.xKor[0].showStatus&&t.games.xKor[0].drawRate,selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"xKor"===a.type&&null===a.standard&&"draw"===a.select}))>-1},on:{click:function(e){t.showConfig.xKor&&"ACTIVE"===t.games.xKor[0].status&&t.games.xKor[0].showStatus&&t.games.xKor[0].drawRate&&a.setBet({_id:t._id,sport:t.sport,type:"xKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"draw",selectRate:t.games.xKor[0].drawRate,standard:null})}}},[a._v(" "+a._s(t.games.xKor[0].drawRate?a.$numeral(t.games.xKor[0].drawRate).format("0.00"):"vs")+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{n:!t.showConfig.xKor||"ACTIVE"!==t.games.xKor[0].status||!t.games.xKor[0].showStatus,selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"xKor"===a.type&&null===a.standard&&"away"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"xKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"away",selectRate:t.games.xKor[0].awayRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2"},[a._v(" "+a._s(a.$numeral(t.games.xKor[0].awayRate).format("0.00"))+" ")]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[a._v(" "+a._s(t.awayTeamKor?t.awayTeamKor:t.awayTeam)+" ")])]),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[a._v(" 승무패 ")])]):a._e(),t.games.handicapKor&&t.showConfig.handicapKor&&"ACTIVE"===t.games.handicapKor[0].status&&t.games.handicapKor[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]),t.games.handicapKor[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"handicapKor"===a.type&&a.standard===t.games.handicapKor[0].homeStandard&&"home"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"handicapKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"home",selectRate:t.games.handicapKor[0].homeRate,standard:t.games.handicapKor[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross "},[a._v(" "+a._s(t.homeTeamKor?t.homeTeamKor:t.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"h"},[a._v("H")]),a._v(" "+a._s(a.$numeral(t.games.handicapKor[0].homeRate).format("0.00"))+" ")])]):a._e(),e("div",{staticClass:"col-2 g-x"},[a._v(" "+a._s(t.games.handicapKor[0].homeStandard)+" ")]),t.games.handicapKor[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"handicapKor"===a.type&&a.standard===t.games.handicapKor[0].homeStandard&&"away"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"handicapKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"away",selectRate:t.games.handicapKor[0].awayRate,standard:t.games.handicapKor[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2"},[a._v(" "+a._s(a.$numeral(t.games.handicapKor[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"h"},[a._v("H")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[a._v(" "+a._s(t.awayTeamKor?t.awayTeamKor:t.awayTeam)+" ")])]):a._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[a._v(" 핸디캡 ")])]):a._e(),t.games.handicapTotalSetKor&&t.showConfig.handicapTotalSetKor&&"ACTIVE"===t.games.handicapTotalSetKor[0].status&&t.games.handicapTotalSetKor[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]),t.games.handicapTotalSetKor[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"handicapTotalSetKor"===a.type&&a.standard===t.games.handicapTotalSetKor[0].homeStandard&&"home"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"handicapTotalSetKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"home",selectRate:t.games.handicapTotalSetKor[0].homeRate,standard:t.games.handicapTotalSetKor[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross "},[a._v(" "+a._s(t.homeTeamKor?t.homeTeamKor:t.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"h"},[a._v("H")]),a._v(" "+a._s(a.$numeral(t.games.handicapTotalSetKor[0].homeRate).format("0.00"))+" ")])]):a._e(),e("div",{staticClass:"col-2 g-x"},[a._v(" "+a._s(t.games.handicapTotalSetKor[0].homeStandard)+" ")]),t.games.handicapTotalSetKor[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"handicapTotalSetKor"===a.type&&a.standard===t.games.handicapTotalSetKor[0].homeStandard&&"away"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"handicapTotalSetKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"away",selectRate:t.games.handicapTotalSetKor[0].awayRate,standard:t.games.handicapTotalSetKor[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2"},[a._v(" "+a._s(a.$numeral(t.games.handicapTotalSetKor[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"h"},[a._v("H")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[a._v(" "+a._s(t.awayTeamKor?t.awayTeamKor:t.awayTeam)+" ")])]):a._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[a._v(" 핸디캡 ")])]):a._e(),t.games.underOverKor&&t.showConfig.underOverKor&&"ACTIVE"===t.games.underOverKor[0].status&&t.games.underOverKor[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]),t.games.underOverKor[0].status?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"underOverKor"===a.type&&a.standard===t.games.underOverKor[0].standard&&"over"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"underOverKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"over",selectRate:t.games.underOverKor[0].overRate,standard:t.games.underOverKor[0].standard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[a._v(" "+a._s(t.homeTeamKor?t.homeTeamKor:t.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"o"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-up"]}})],1),a._v(" "+a._s(a.$numeral(t.games.underOverKor[0].overRate).format("0.00"))+" ")])]):a._e(),e("div",{staticClass:"col-2 g-x"},[a._v(" "+a._s(t.games.underOverKor[0].standard)+" ")]),t.games.underOverKor[0].status?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"underOverKor"===a.type&&a.standard===t.games.underOverKor[0].standard&&"under"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"underOverKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"under",selectRate:t.games.underOverKor[0].underRate,standard:t.games.underOverKor[0].standard})}}},[e("div",{staticClass:"float-left pl-2"},[a._v(" "+a._s(a.$numeral(t.games.underOverKor[0].underRate).format("0.00"))+" "),e("small",{staticClass:"u"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-down"]}})],1)]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[a._v(" "+a._s(t.awayTeamKor?t.awayTeamKor:t.awayTeam)+" ")])]):a._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[a._v(" 오버언더 ")])]):a._e(),t.games.underOverTotalSetKor&&t.showConfig.underOverTotalSetKor&&"ACTIVE"===t.games.underOverTotalSetKor[0].status&&t.games.underOverTotalSetKor[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[a._v(" "+a._s(a.$moment(t.gameDateTime).format("MM/DD HH:mm"))+" ")]),t.games.underOverTotalSetKor[0].status?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"underOverTotalSetKor"===a.type&&a.standard===t.games.underOverTotalSetKor[0].standard&&"over"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"underOverTotalSetKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"over",selectRate:t.games.underOverTotalSetKor[0].overRate,standard:t.games.underOverTotalSetKor[0].standard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[a._v(" "+a._s(t.homeTeamKor?t.homeTeamKor:t.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"o"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-up"]}})],1),a._v(" "+a._s(a.$numeral(t.games.underOverTotalSetKor[0].overRate).format("0.00"))+" ")])]):a._e(),e("div",{staticClass:"col-2 g-x"},[a._v(" "+a._s(t.games.underOverTotalSetKor[0].standard)+" ")]),t.games.underOverTotalSetKor[0].status?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:a.betCart.findIndex((function(a){return a._id===t._id&&"underOverTotalSetKor"===a.type&&a.standard===t.games.underOverTotalSetKor[0].standard&&"under"===a.select}))>-1},on:{click:function(e){return a.setBet({_id:t._id,sport:t.sport,type:"underOverTotalSetKor",homeTeam:t.homeTeamKor?t.homeTeamKor:t.homeTeam,awayTeam:t.awayTeamKor?t.awayTeamKor:t.awayTeam,select:"under",selectRate:t.games.underOverTotalSetKor[0].underRate,standard:t.games.underOverTotalSetKor[0].standard})}}},[e("div",{staticClass:"float-left pl-2"},[a._v(" "+a._s(a.$numeral(t.games.underOverTotalSetKor[0].underRate).format("0.00"))+" "),e("small",{staticClass:"u"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-down"]}})],1)]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[a._v(" "+a._s(t.awayTeamKor?t.awayTeamKor:t.awayTeam)+" ")])]):a._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[a._v(" 오버언더 ")])]):a._e()])])])})),0)])])]),e("div",{staticClass:"row my-3"},[e("div",{staticClass:"col-12"},[e("div",{staticClass:"card bg-pagination"},[e("div",{staticClass:"card-body pagination-body"},[e("b-pagination-nav",{attrs:{"first-class":"first-class","last-class":"last-class","prev-class":"prev-class","next-class":"next-class","ellipsis-class":"ellipsis-class","page-class":"page-class","link-gen":a.linkGen,"number-of-pages":a.numberOfPages,align:"center",limit:a.$config.pageLimit,"use-router":"",pills:""},model:{value:a.search.page,callback:function(t){a.$set(a.search,"page",t)},expression:"search.page"}})],1)])])])],1)])},o=[],r=e("1da1"),i=e("5530"),n=(e("96cf"),e("ac1f"),e("841c"),e("99af"),e("c740"),e("2f62")),l={name:"SportsCross",components:{},computed:Object(i["a"])(Object(i["a"])({},Object(n["c"])(["loading","isLogin","user","betCart"])),{},{numberOfPages:function(){return 0===Math.ceil(this.dataCount/this.$config.pageSize)?1:Math.ceil(this.dataCount/this.$config.pageSize)}}),watch:{$route:function(){this.setFromRouter()}},data:function(){return{overlay:!1,search:{page:1,sport:""},expand:{},data:[],dataCount:0}},created:function(){this.setFromRouter()},methods:Object(i["a"])(Object(i["a"])({},Object(n["b"])(["setBetCart","changeBetCart","deleteBetCart","deleteBetCartAll","setBetInfo"])),{},{setFromRouter:function(){this.search.page=this.$route.query.page?this.$route.query.page:1,this.search.sport=this.$route.query.sport?this.$route.query.sport:"",this.getList()},linkGen:function(a){return"?page=".concat(a,"&sport=").concat(this.search.sport)},getList:function(){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a.overlay=!0,t.next=3,a.$http.get("/api/get-prematch-cross-list-pent",a.search);case 3:if(e=t.sent,a.overlay=!1,!e.error){t.next=7;break}return t.abrupt("return");case 7:a.data=e.data.recordSet,a.dataCount=e.data.recordCount,a.betInfo=e.data.betInfo,a.isLogin&&a.setBetInfo({min:e.data.betInfo["lv".concat(a.user.grade)].min,max:e.data.betInfo["lv".concat(a.user.grade)].max,benefit:e.data.betInfo["lv".concat(a.user.grade)].benefit});case 11:case"end":return t.stop()}}),t)})))()},selectCategory:function(a){this.search.sport=a;var t=encodeURI("".concat(this.$route.path).concat(this.linkGen(1)));t!==this.$route.fullPath?this.$router.push(t):this.getList()},calcCount:function(a,t){var e=0;for(var s in t)if("xKor"!==s&&"handicapKor"!==s&&"underOverKor"!==s)for(var o=0;o<t[s].length;o++)!t[s][o].showStatus||"ACTIVE"!==t[s][o].status&&"HIDE"!==t[s][o].status||!a[s]||e++;return e},setBet:function(a){if(this.isLogin){a.gameType="sportsCross";var t=this.betCart.findIndex((function(t){return a._id===t._id&&a.type===t.type&&a.standard===t.standard&&a.select===t.select}));if(t>-1)this.$store.commit("deleteBetCart",t);else{if("xKor"===a.type||"handicapKor"===a.type||"handicapTotalSetKor"===a.type){var e=this.betCart.findIndex((function(t){return a._id===t._id&&a.type!==t.type&&("xKor"===t.type||"handicapKor"===t.type||"handicapTotalSetKor"===t.type)}));if(e>-1)return void this.$tools.sw("warning","조합불가","동일경기 승무패, 핸디캡은 조합이 불가능 합니다.")}if("Football"===a.sport||"FIFA"===a.sport||"Volleyball"===a.sport){var s=this.betCart.findIndex((function(t){return a._id===t._id&&a.type!==t.type}));if(s>-1)return void this.$tools.sw("warning","조합불가","동일경기 조합은 불가능 합니다.")}var o=this.betCart.findIndex((function(t){return a._id===t._id&&a.type===t.type}));o>-1?this.$store.commit("changeBetCart",{index:o,bet:a}):this.setBetCart(a)}}else this.$tools.sw("info","로그인","로그인 후 이용 가능 합니다.")}}),beforeRouteLeave:function(a,t,e){this.deleteBetCartAll(),e()}},c=l,m=e("2877"),d=Object(m["a"])(c,s,o,!1,null,null,null);t["default"]=d.exports},"841c":function(a,t,e){"use strict";var s=e("c65b"),o=e("d784"),r=e("825a"),i=e("1d80"),n=e("129f"),l=e("577e"),c=e("dc4a"),m=e("14c3");o("search",(function(a,t,e){return[function(t){var e=i(this),o=void 0==t?void 0:c(t,a);return o?s(o,t,e):new RegExp(t)[a](l(e))},function(a){var s=r(this),o=l(a),i=e(t,s,o);if(i.done)return i.value;var c=s.lastIndex;n(c,0)||(s.lastIndex=0);var d=m(s,o);return n(s.lastIndex,c)||(s.lastIndex=c),null===d?-1:d.index}]}))}}]);