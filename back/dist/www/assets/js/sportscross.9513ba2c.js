(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sportscross"],{"1ba0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[e("div",{staticClass:"col"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"page-title-wrap"},[e("div",{staticClass:"page-title"},[e("font-awesome-icon",{attrs:{icon:["fa","futbol"]}}),e("span",{staticClass:"ml-2"},[t._v("국내형 크로스 SPORTS CROSS")]),e("span",{staticClass:"float-right"},[e("button",{staticClass:"btn-board",attrs:{type:"button",disabled:t.loading},on:{click:function(a){return t.$tools.pushRouter("/sportscross")}}},[e("font-awesome-icon",{attrs:{icon:["fa","globe"]}}),t._v(" 전체보기 ")],1)])],1)])])]),e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col"},[e("div",{staticClass:"sports-icon"},[e("div",{staticClass:"sports-icon-wrap"},[e("ul",[e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-football-gray.png",id:"Football",alt:"축구",title:"축구"},on:{click:function(a){return t.selectCategory("Football")}}}),e("b-tooltip",{attrs:{target:"Football",title:"축구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-basketball-gray.png",id:"Basketball",alt:"농구",title:"농구"},on:{click:function(a){return t.selectCategory("Basketball")}}}),e("b-tooltip",{attrs:{target:"Basketball",title:"농구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-baseball-gray.png",id:"Baseball",alt:"야구",title:"야구"},on:{click:function(a){return t.selectCategory("Baseball")}}}),e("b-tooltip",{attrs:{target:"Baseball",title:"야구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-icehockey-gray.png",id:"Ice Hockey",alt:"아이스하키",title:"아이스하키"},on:{click:function(a){return t.selectCategory("Ice Hockey")}}}),e("b-tooltip",{attrs:{target:"Ice Hockey",title:"아이스하키"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-handball-gray.png",id:"Handball",alt:"핸드볼",title:"핸드볼"},on:{click:function(a){return t.selectCategory("Handball")}}}),e("b-tooltip",{attrs:{target:"Handball",title:"핸드볼"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-volleyball-gray.png",id:"Volleyball",alt:"배구",title:"배구"},on:{click:function(a){return t.selectCategory("Volleyball")}}}),e("b-tooltip",{attrs:{target:"Volleyball",title:"배구"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-rugby-gray.png",id:"Rugby League",alt:"럭비",title:"럭비"},on:{click:function(a){return t.selectCategory("Rugby League")}}}),e("b-tooltip",{attrs:{target:"Rugby League",title:"럭비"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-rugbyunion-gray.png",id:"Rugby Union",alt:"럭비유니언",title:"럭비유니언"},on:{click:function(a){return t.selectCategory("Rugby Union")}}}),e("b-tooltip",{attrs:{target:"Rugby Union",title:"럭비유니언"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-boxing-gray.png",id:"Boxing",alt:"권투",title:"권투"},on:{click:function(a){return t.selectCategory("Boxing")}}}),e("b-tooltip",{attrs:{target:"Boxing",title:"권투"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-mma-gray.png",id:"MMA",alt:"이종격투기",title:"이종격투기"},on:{click:function(a){return t.selectCategory("MMA")}}}),e("b-tooltip",{attrs:{target:"MMA",title:"이종격투기"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-golf-gray.png",id:"Golf",alt:"골프",title:"골프"},on:{click:function(a){return t.selectCategory("Golf")}}}),e("b-tooltip",{attrs:{target:"Golf",title:"골프"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-darts-gray.png",id:"Darts",alt:"다트",title:"다트"},on:{click:function(a){return t.selectCategory("Darts")}}}),e("b-tooltip",{attrs:{target:"Darts",title:"다트"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-lol-gray.png",id:"LOL",alt:"LOL",title:"LOL"},on:{click:function(a){return t.selectCategory("LoL")}}}),e("b-tooltip",{attrs:{target:"LOL",title:"LOL"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-csgo-gray.png",id:"CS:GO",alt:"CS:GO",title:"CS:GO"},on:{click:function(a){return t.selectCategory("CS:GO")}}}),e("b-tooltip",{attrs:{target:"CS:GO",title:"CS:GO"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-dota2-gray.png",id:"Dota 2",alt:"Dota 2",title:"Dota 2"},on:{click:function(a){return t.selectCategory("Dota 2")}}}),e("b-tooltip",{attrs:{target:"Dota 2",title:"Dota 2"}})],1),e("li",[e("img",{staticClass:"sports-category-icon",attrs:{src:"/images/icon-fifa-gray.png",id:"FIFA",alt:"FIFA",title:"FIFA"},on:{click:function(a){return t.selectCategory("FIFA")}}}),e("b-tooltip",{attrs:{target:"FIFA",title:"FIFA"}})],1)])])])])]),e("b-overlay",{attrs:{show:t.overlay,variant:"white",opacity:"0.2",rounded:"sm"}},[e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col"},[e("div",{staticClass:"sports"},[t._l(t.data,(function(a,s){return e("div",{key:s,staticClass:"row mb-2"},[t.data[s].leagueKor!==(s>0?t.data[s-1].leagueKor:null)?e("div",{staticClass:"col-9 col-xl-12 mt-3 g-league-mobile"},[e("img",{staticClass:"sports-img",attrs:{src:"/images/"+t.$config.iconSport[a.sport]}}),e("span",{staticClass:"g-league"},[e("font-awesome-icon",{staticClass:"ml-1 icon-league",attrs:{icon:["fa","angle-double-right"]}}),t._v(" "+t._s(a.leagueKor)+" ")],1)]):t._e(),t.data[s].leagueKor!==(s>0?t.data[s-1].leagueKor:null)?e("div",{staticClass:"col-3 d-xl-none mt-3 text-right g-date-mobile"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]):t._e(),e("div",{staticClass:"col-12 mt-1",class:{"mb-3":s+1===t.data.length}},[e("div",{staticClass:"sports-px"},[a.games.x&&a.showConfig.x&&"ACTIVE"===a.games.x[0].status&&a.games.x[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{n:!a.showConfig.x||"ACTIVE"!==a.games.x[0].status||!a.games.x[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"x"===t.type&&null===t.standard&&"home"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"x",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"home",selectRate:a.games.x[0].homeRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[t._v(" "+t._s(t.$numeral(a.games.x[0].homeRate).format("0.00"))+" ")])]),e("div",{staticClass:"col-2 g-x",class:{n:!a.showConfig.x||"ACTIVE"!==a.games.x[0].status||!a.games.x[0].showStatus,"can-bet":a.showConfig.x&&"ACTIVE"===a.games.x[0].status&&a.games.x[0].showStatus&&a.games.x[0].drawRate,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"x"===t.type&&null===t.standard&&"draw"===t.select}))>-1},on:{click:function(e){a.showConfig.x&&"ACTIVE"===a.games.x[0].status&&a.games.x[0].showStatus&&a.games.x[0].drawRate&&t.setBet({_id:a._id,sport:a.sport,type:"x",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"draw",selectRate:a.games.x[0].drawRate,standard:null})}}},[t._v(" "+t._s(a.games.x[0].drawRate?t.$numeral(a.games.x[0].drawRate).format("0.00"):"vs")+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{n:!a.showConfig.x||"ACTIVE"!==a.games.x[0].status||!a.games.x[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"x"===t.type&&null===t.standard&&"away"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"x",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"away",selectRate:a.games.x[0].awayRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.x[0].awayRate).format("0.00"))+" ")]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 승무패 ")])]):t._e(),a.games.handicap&&a.showConfig.handicap&&"ACTIVE"===a.games.handicap[0].status&&a.games.handicap[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),a.games.handicap[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"handicap"===t.type&&t.standard===a.games.handicap[0].homeStandard&&"home"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"handicap",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"home",selectRate:a.games.handicap[0].homeRate,standard:a.games.handicap[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross "},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"h"},[t._v("H")]),t._v(" "+t._s(t.$numeral(a.games.handicap[0].homeRate).format("0.00"))+" ")])]):t._e(),e("div",{staticClass:"col-2 g-x"},[t._v(" "+t._s(a.games.handicap[0].homeStandard)+" ")]),a.games.handicap[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"handicap"===t.type&&t.standard===a.games.handicap[0].homeStandard&&"away"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"handicap",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"away",selectRate:a.games.handicap[0].awayRate,standard:a.games.handicap[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.handicap[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"h"},[t._v("H")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]):t._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 핸디캡 ")])]):t._e(),a.games.handicapTotalSet&&a.showConfig.handicapTotalSet&&"ACTIVE"===a.games.handicapTotalSet[0].status&&a.games.handicapTotalSet[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),a.games.handicapTotalSet[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"handicapTotalSet"===t.type&&t.standard===a.games.handicapTotalSet[0].homeStandard&&"home"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"handicapTotalSet",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"home",selectRate:a.games.handicapTotalSet[0].homeRate,standard:a.games.handicapTotalSet[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross "},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"h"},[t._v("H")]),t._v(" "+t._s(t.$numeral(a.games.handicapTotalSet[0].homeRate).format("0.00"))+" ")])]):t._e(),e("div",{staticClass:"col-2 g-x"},[t._v(" "+t._s(a.games.handicapTotalSet[0].homeStandard)+" ")]),a.games.handicapTotalSet[0].showStatus?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"handicapTotalSet"===t.type&&t.standard===a.games.handicapTotalSet[0].homeStandard&&"away"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"handicapTotalSet",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"away",selectRate:a.games.handicapTotalSet[0].awayRate,standard:a.games.handicapTotalSet[0].homeStandard})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.handicapTotalSet[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"h"},[t._v("H")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]):t._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 핸디캡 ")])]):t._e(),a.games.underOver&&a.showConfig.underOver&&"ACTIVE"===a.games.underOver[0].status&&a.games.underOver[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),a.games.underOver[0].status?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"underOver"===t.type&&t.standard===a.games.underOver[0].standard&&"over"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"underOver",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"over",selectRate:a.games.underOver[0].overRate,standard:a.games.underOver[0].standard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"o"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-up"]}})],1),t._v(" "+t._s(t.$numeral(a.games.underOver[0].overRate).format("0.00"))+" ")])]):t._e(),e("div",{staticClass:"col-2 g-x"},[t._v(" "+t._s(a.games.underOver[0].standard)+" ")]),a.games.underOver[0].status?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"underOver"===t.type&&t.standard===a.games.underOver[0].standard&&"under"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"underOver",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"under",selectRate:a.games.underOver[0].underRate,standard:a.games.underOver[0].standard})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.underOver[0].underRate).format("0.00"))+" "),e("small",{staticClass:"u"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-down"]}})],1)]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]):t._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 오버언더 ")])]):t._e(),a.games.underOverTotalSet&&a.showConfig.underOverTotalSet&&"ACTIVE"===a.games.underOverTotalSet[0].status&&a.games.underOverTotalSet[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),a.games.underOverTotalSet[0].status?e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"underOverTotalSet"===t.type&&t.standard===a.games.underOverTotalSet[0].standard&&"over"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"underOverTotalSet",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"over",selectRate:a.games.underOverTotalSet[0].overRate,standard:a.games.underOverTotalSet[0].standard})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"o"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-up"]}})],1),t._v(" "+t._s(t.$numeral(a.games.underOverTotalSet[0].overRate).format("0.00"))+" ")])]):t._e(),e("div",{staticClass:"col-2 g-x"},[t._v(" "+t._s(a.games.underOverTotalSet[0].standard)+" ")]),a.games.underOverTotalSet[0].status?e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"underOverTotalSet"===t.type&&t.standard===a.games.underOverTotalSet[0].standard&&"under"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"underOverTotalSet",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"under",selectRate:a.games.underOverTotalSet[0].underRate,standard:a.games.underOverTotalSet[0].standard})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.underOverTotalSet[0].underRate).format("0.00"))+" "),e("small",{staticClass:"u"},[e("font-awesome-icon",{attrs:{icon:["fa","arrow-down"]}})],1)]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]):t._e(),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 오버언더 ")])]):t._e(),a.games.first7Points&&a.showConfig.first7Points&&"ACTIVE"===a.games.first7Points[0].status&&a.games.first7Points[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{n:!a.showConfig.first7Points||"ACTIVE"!==a.games.first7Points[0].status||!a.games.first7Points[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"first7Points"===t.type&&null===t.standard&&"home"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"first7Points",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"home",selectRate:a.games.first7Points[0].homeRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"first7Points d-sm-none"},[t._v("선7")]),e("small",{staticClass:"first7Points d-none d-sm-inline"},[t._v("선7득점")]),t._v(" "+t._s(t.$numeral(a.games.first7Points[0].homeRate).format("0.00"))+" ")])]),e("div",{staticClass:"col-2 g-x"},[t._v(" vs ")]),e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{n:!a.showConfig.first7Points||"ACTIVE"!==a.games.first7Points[0].status||!a.games.first7Points[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"first7Points"===t.type&&null===t.standard&&"away"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"first7Points",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"away",selectRate:a.games.first7Points[0].awayRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.first7Points[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"first7Points d-sm-none"},[t._v("선7")]),e("small",{staticClass:"first7Points d-none d-sm-inline"},[t._v("선7득점")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 선 7득점 ")])]):t._e(),a.games.first5Points&&a.showConfig.first5Points&&"ACTIVE"===a.games.first5Points[0].status&&a.games.first5Points[0].showStatus?e("div",{staticClass:"row g"},[e("div",{staticClass:"col-1 g-date d-none d-xl-block"},[t._v(" "+t._s(t.$moment(a.gameDateTime).format("MM/DD HH:mm"))+" ")]),e("div",{staticClass:"col-5 col-xl-4 g-home can-bet",class:{n:!a.showConfig.first5Points||"ACTIVE"!==a.games.first5Points[0].status||!a.games.first5Points[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"first5Points"===t.type&&null===t.standard&&"home"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"first5Points",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"home",selectRate:a.games.first5Points[0].homeRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2 g-home-team-mobile-cross"},[t._v(" "+t._s(a.homeTeamKor?a.homeTeamKor:a.homeTeam)+" ")]),e("div",{staticClass:"float-right pr-2"},[e("small",{staticClass:"first5Points d-sm-none"},[t._v("선5")]),e("small",{staticClass:"first5Points d-none d-sm-inline"},[t._v("선5득점")]),t._v(" "+t._s(t.$numeral(a.games.first5Points[0].homeRate).format("0.00"))+" ")])]),e("div",{staticClass:"col-2 g-x"},[t._v(" vs ")]),e("div",{staticClass:"col-5 col-xl-4 g-away can-bet",class:{n:!a.showConfig.first5Points||"ACTIVE"!==a.games.first5Points[0].status||!a.games.first5Points[0].showStatus,selectBet:t.betCart.findIndex((function(t){return t._id===a._id&&"first5Points"===t.type&&null===t.standard&&"away"===t.select}))>-1},on:{click:function(e){return t.setBet({_id:a._id,sport:a.sport,type:"first5Points",homeTeam:a.homeTeamKor?a.homeTeamKor:a.homeTeam,awayTeam:a.awayTeamKor?a.awayTeamKor:a.awayTeam,select:"away",selectRate:a.games.first5Points[0].awayRate,standard:null})}}},[e("div",{staticClass:"float-left pl-2"},[t._v(" "+t._s(t.$numeral(a.games.first5Points[0].awayRate).format("0.00"))+" "),e("small",{staticClass:"first5Points d-sm-none"},[t._v("선5")]),e("small",{staticClass:"first5Points d-none d-sm-inline"},[t._v("선5득점")])]),e("div",{staticClass:"float-right pr-2 g-away-team-mobile-cross"},[t._v(" "+t._s(a.awayTeamKor?a.awayTeamKor:a.awayTeam)+" ")])]),e("div",{staticClass:"col-1 g-count d-none d-xl-block o"},[t._v(" 선 5득점 ")])]):t._e()])])])})),e("infinite-loading",{ref:"InfiniteLoading",attrs:{spinner:"waveDots"},on:{infinite:t.infiniteHandler}},[e("div",{staticClass:"text-light-brown",attrs:{slot:"no-more"},slot:"no-more"},[t._v("마지막 페이지 입니다")]),e("div",{staticClass:"text-light-brown",attrs:{slot:"no-results"},slot:"no-results"},[t._v("마지막 페이지 입니다")])])],2)])])])],1)])},o=[],i=e("b85c"),r=e("1da1"),n=e("5530"),l=(e("96cf"),e("ac1f"),e("841c"),e("99af"),e("c740"),e("2f62")),c=e("e166"),m=e.n(c),d={name:"SportsCross",components:{InfiniteLoading:m.a},computed:Object(n["a"])(Object(n["a"])({},Object(l["c"])(["loading","isLogin","user","betCart"])),{},{numberOfPages:function(){return 0===Math.ceil(this.totalCount/this.$config.pageSize)?1:Math.ceil(this.totalCount/this.$config.pageSize)}}),watch:{$route:function(){this.getInitList()}},data:function(){return{overlay:!1,search:{page:1,sport:""},expand:{},data:[],dataCount:0}},created:function(){this.setFromRouter()},methods:Object(n["a"])(Object(n["a"])({},Object(l["b"])(["setBetCart","changeBetCart","deleteBetCart","deleteBetCartAll","setBetInfo"])),{},{setFromRouter:function(){this.search.page=this.$route.query.page?this.$route.query.page:1,this.search.sport=this.$route.query.sport?this.$route.query.sport:""},getInitList:function(){this.data=[],this.search.page=this.$route.query.page?this.$route.query.page:1,this.search.sport=this.$route.query.sport?this.$route.query.sport:"",this.getList()},linkGen:function(t){return"?page=".concat(t,"&sport=").concat(this.search.sport)},getList:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.overlay=!0,a.next=3,t.$http.get("/api/get-prematch-cross-list",t.search);case 3:if(e=a.sent,t.overlay=!1,!e.error){a.next=7;break}return a.abrupt("return");case 7:t.data=e.data.recordSet,t.dataCount=e.data.recordCount,t.betInfo=e.data.betInfo,t.isLogin&&t.setBetInfo({min:e.data.betInfo["lv".concat(t.user.grade)].min,max:e.data.betInfo["lv".concat(t.user.grade)].max,benefit:e.data.betInfo["lv".concat(t.user.grade)].benefit});case 11:case"end":return a.stop()}}),a)})))()},infiniteHandler:function(t){var a=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.$http.get("/api/get-prematch-cross-list",a.search);case 3:s=e.sent,a.search.page++,a.isLogin&&a.setBetInfo({min:s.data.betInfo["lv".concat(a.user.grade)].min,max:s.data.betInfo["lv".concat(a.user.grade)].max,benefit:s.data.betInfo["lv".concat(a.user.grade)].benefit}),s.data.recordSet.length>0?setTimeout((function(){var e,o=Object(i["a"])(s.data.recordSet);try{for(o.s();!(e=o.n()).done;){var r=e.value;a.data.push(r)}}catch(n){o.e(n)}finally{o.f()}t.loaded(),s.data.recordSet.length<a.$config.pageSize&&t.complete()}),1e3):t.complete(),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},selectCategory:function(t){this.search.sport=t;var a=encodeURI("".concat(this.$route.path).concat(this.linkGen(1)));a!==this.$route.fullPath?this.$router.push(a):this.getList()},calcCount:function(t,a){var e=0;for(var s in a)if("xKor"!==s&&"handicapKor"!==s&&"underOverKor"!==s)for(var o=0;o<a[s].length;o++)!a[s][o].showStatus||"ACTIVE"!==a[s][o].status&&"HIDE"!==a[s][o].status||!t[s]||e++;return e},setBet:function(t){if(this.isLogin){t.gameType="sportsCross";var a=this.betCart.findIndex((function(a){return t._id===a._id&&t.type===a.type&&t.standard===a.standard&&t.select===a.select}));if(a>-1)this.$store.commit("deleteBetCart",a);else{if("x"===t.type||"handicap"===t.type||"handicapTotalSet"===t.type){var e=this.betCart.findIndex((function(a){return t._id===a._id&&t.type!==a.type&&("x"===a.type||"handicap"===a.type||"handicapTotalSet"===a.type)}));if(e>-1)return void this.$tools.sw("warning","조합불가","동일경기 승무패, 핸디캡은 조합이 불가능 합니다.")}if("Football"===t.sport){var s=this.betCart.findIndex((function(a){return t._id===a._id&&t.type!==a.type}));if(s>-1)return void this.$tools.sw("warning","조합불가","동일경기 조합은 불가능 합니다.")}var o=this.betCart.findIndex((function(a){return t._id===a._id&&t.type===a.type}));o>-1?this.$store.commit("changeBetCart",{index:o,bet:t}):this.setBetCart(t)}}else this.$tools.sw("info","로그인","로그인 후 이용 가능 합니다.")}}),beforeRouteLeave:function(t,a,e){this.deleteBetCartAll(),e()}},g=d,u=e("2877"),h=Object(u["a"])(g,s,o,!1,null,null,null);a["default"]=h.exports}}]);