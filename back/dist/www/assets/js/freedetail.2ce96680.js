(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["freedetail"],{"265b":function(t,e,a){},"523e":function(t,e,a){"use strict";a("265b")},b8e0:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[a("font-awesome-icon",{attrs:{icon:["fa","comments"]}}),a("span",{staticClass:"ml-2"},[t._v("게시판 상세 BOARD DETAIL")])],1)])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-detail"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-board ml-2",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.getDetail()}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),t._v(" 새로고침 ")],1),a("button",{staticClass:"btn-board ml-2",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.$tools.pushRouter("/free/?page="+t.$route.params.page)}}},[a("font-awesome-icon",{attrs:{icon:["fa","list"]}}),t._v(" 목록 ")],1)])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-borderless table-board text-nowrap"},[a("thead",[a("tr",[a("th",[a("div",{staticClass:"float-left"},[t._v(" "+t._s(t.title)+" ")]),a("div",{staticClass:"float-right text-yellow"},[a("img",{staticClass:"comment-level",attrs:{src:"/images/icon-lv"+(t.writerGrade?t.writerGrade:1)+".png"}}),t._v(" "+t._s(t.writerNick)+" ")])])])]),a("tbody",[a("tr",[a("td",[a("div",[t._v(" "+t._s(t.content)+" ")]),t.betInfo?a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col"},[a("div",{staticClass:"card bet-card mb-3"},[a("div",{staticClass:"card-header"},[a("span",[t._v(" "+t._s(t.$config.convertSportsGameType[t.betInfo.gameType])+" - "+t._s(t.$moment(t.betInfo.regDateTime).format("YY.MM.DD HH:mm"))+" ")]),a("span",{staticClass:"float-right"},[a("span",{staticClass:"mr-2",class:t.$config.sportsResultBadgeColor[t.betInfo.betResult]},[t._v("[ "+t._s(t.$config.result[t.betInfo.betResult])+" ]")])])]),a("div",{staticClass:"card-body d-none d-md-block"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-borderless table-board text-nowrap"},[t._m(0),a("tbody",t._l(t.betInfo.detail,(function(e,s){return a("tr",{key:s,staticClass:"bg-content text-light-gray"},[a("td",[t._v(t._s(t.$moment(e.gameDateTime).format("MM/DD HH:mm")))]),a("td",[a("img",{staticClass:"sports-img",attrs:{src:"/images/"+t.$config.iconSport[e.sport]}}),t._v(" "+t._s(e.leagueKor)+" ")]),a("td",[t._v(t._s(e.homeTeam)+" vs "+t._s(e.awayTeam))]),a("td",[t._v(t._s(t.$config.convertBetTypeSports[e.type]))]),a("td",[a("span",[t._v(t._s(t.$config.convertBetTypeSports[e.type]))]),e.standard||0===e.standard?a("span",[t._v(" ["+t._s("bothTeamsGoalWin"===e.type||"bothTeamsGoalWinOrDraw"===e.type?t.$config.convertBetStandard[e.standard]:"xWithUnderOver"===e.type?t.$config.convertBetStandardXwithUnderOver(e.standard):e.standard)+"] ")]):t._e(),"correctScoreFullTime"!==e.type?a("span",[t._v(" ("+t._s(t.$config.convertBetSelectSports[e.select])+")")]):t._e()]),a("td",[t._v(t._s(t.$numeral(e.finalRate).format("0.00")))]),a("td",{class:t.$config.sportsResultTextColor[e.betResult]},[t._v(t._s(t.$config.result[e.betResult]))]),a("td",["I"!==e.betResult?a("span",[t.$config.specialGameType.indexOf(e.type)>-1?a("span",[t._v(" "+t._s(t.displaySpecialScore(e.type,e.select,e.betResult))+" ")]):a("span",[t._v(" "+t._s(e.score?(e.score.homeScore||0===e.score.homeScore?e.score.homeScore:"-")+":"+(e.score.awayScore||0===e.score.awayScore?e.score.awayScore:"-"):"-:-")+" ")])]):a("span",[t._v("-")])])])})),0)])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col-6 col-xl-3 text-light-brown"},[t._v(" 배팅금액 : "),a("span",[t._v(t._s(t.$numeral(t.betInfo.betAmount).format("0,0")))])]),a("div",{staticClass:"col-6 col-xl-3 text-light-brown"},[t._v(" 예상 당첨금액 : "),a("span",[t._v(t._s(t.$numeral(parseInt(t.betInfo.betAmount*t.betInfo.betRate)).format("0,0")))])]),a("div",{staticClass:"col-6 mt-2 mt-xl-0 col-xl-3 text-light-brown"},[t._v(" 배당 : "+t._s(t.$numeral(t.betInfo.betRate).format("0,0.00"))+" "),t.betInfo.bonusRate?a("span",{staticClass:"text-pink"},[t._v("("),a("font-awesome-icon",{attrs:{icon:["fab","bitcoin"]}}),t._v(" "+t._s(t.betInfo.bonusRate)+")")],1):t._e()]),a("div",{staticClass:"col-6 mt-2 mt-xl-0 col-xl-3 text-green"},[t._v(" 당첨금액 : "),a("span",[t._v(t._s(t.calcResult(t.betInfo.betResult,t.betInfo.betAmount,t.betInfo.betRate)))])])])]),a("div",{staticClass:"card-body d-md-none"},[a("div",{staticClass:"mobile-betting-history"},[t._m(1),t._l(t.betInfo.detail,(function(e,s){return a("div",{key:s,staticClass:"col betting-history-list"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-3 mt-2"},[a("div",[t._v(" "+t._s(t.$moment(e.gameDateTime).format("MM/DD HH:mm"))+" ")]),a("div",{staticClass:"league-name"},[a("img",{staticClass:"sports-img",attrs:{src:"/images/"+t.$config.iconSport[e.sport]}}),t._v(" "+t._s(e.leagueKor)+" ")])]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"team-name"},[t._v(t._s(e.homeTeam))]),a("div",{staticClass:"team-name"},[t._v("VS")]),a("div",{staticClass:"team-name"},[t._v(t._s(e.awayTeam))])]),a("div",{staticClass:"col mt-3"},[a("span",[t._v(t._s(t.$config.convertBetTypeSports[e.type]))]),e.standard||0===e.standard?a("span",[t._v(" ["+t._s("bothTeamsGoalWin"===e.type||"bothTeamsGoalWinOrDraw"===e.type?t.$config.convertBetStandard[e.standard]:"xWithUnderOver"===e.type?t.$config.convertBetStandardXwithUnderOver(e.standard):e.standard)+"] ")]):t._e(),"correctScoreFullTime"!==e.type?a("span",[t._v(" ("+t._s(t.$config.convertBetSelectSports[e.select])+")")]):t._e()]),a("div",{staticClass:"col mt-3",class:t.$config.sportsResultTextColor[e.betResult]},[t._v(" "+t._s(t.$config.result[e.betResult])+" ")]),a("div",{staticClass:"col mt-3"},["I"!==e.betResult?a("span",[t.$config.specialGameType.indexOf(e.type)>-1?a("span",[t._v(" "+t._s(t.displaySpecialScore(e.type,e.select,e.betResult))+" ")]):a("span",[t._v(" "+t._s(e.score?(e.score.homeScore||0===e.score.homeScore?e.score.homeScore:"-")+":"+(e.score.awayScore||0===e.score.awayScore?e.score.awayScore:"-"):"-:-")+" ")])]):a("span",[t._v("-")])])])])}))],2),a("div",{staticClass:"row mt-2 text-center"},[a("div",{staticClass:"col-6 text-light-brown"},[t._v(" 배팅금액 : "),a("span",[t._v(t._s(t.$numeral(t.betInfo.betAmount).format("0,0")))])]),a("div",{staticClass:"col-6 text-light-brown"},[t._v(" 예상 당첨금액 : "),a("span",[t._v(t._s(t.$numeral(parseInt(t.betInfo.betAmount*t.betInfo.betRate)).format("0,0")))])]),a("div",{staticClass:"col-6 my-2 text-light-brown"},[t._v(" 배당 : "+t._s(t.$numeral(t.betInfo.betRate).format("0,0.00"))+" "),t.betInfo.bonusRate?a("span",{staticClass:"text-pink"},[t._v("("),a("font-awesome-icon",{attrs:{icon:["fab","bitcoin"]}}),t._v(" "+t._s(t.betInfo.bonusRate)+")")],1):t._e()]),a("div",{staticClass:"col-6 my-2 text-green"},[t._v(" 당첨금액 : "),a("span",[t._v(t._s(t.calcResult(t.betInfo.betResult,t.betInfo.betAmount,t.betInfo.betRate)))])])])])])])]):t._e()])])])])])])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.commentContent,expression:"commentContent"}],staticClass:"form-control form-control-sm board-input",attrs:{type:"text",placeholder:"댓글",maxlength:"100",tabindex:"1"},domProps:{value:t.commentContent},on:{input:function(e){e.target.composing||(t.commentContent=e.target.value)}}})]),a("div",{staticClass:"col-2"},[a("button",{staticClass:"btn-write",staticStyle:{height:"28px"},attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.submit()}}},[a("font-awesome-icon",{attrs:{icon:["fa","pen"]}}),t._v(" 등록 ")],1)])])])])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-comment"},t._l(t.comment,(function(e,s){return a("div",{key:s,class:s>0?"comment-top":""},[a("div",{staticClass:"text-gray"},[a("img",{staticClass:"comment-level",attrs:{src:"/images/icon-lv"+(e.writerGrade?e.writerGrade:1)+".png"}}),t._v(" "+t._s(e.writerNick)+" "+t._s(t.$moment(e.regDateTime).format("YYYY-MM-DD"))+" ")]),a("div",{staticClass:"text-white mt-1"},[t._v(t._s(t.$striptags(e.comment)))])])})),0)])])])])},o=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{attrs:{scope:"col",width:"7%"}},[t._v("경기시간")]),a("th",{attrs:{scope:"col",width:"20%"}},[t._v("리그")]),a("th",{attrs:{scope:"col",width:"24%"}},[t._v("홈팀 vs 원정팀")]),a("th",{attrs:{scope:"col",width:"14%"}},[t._v("경기타입")]),a("th",{attrs:{scope:"col",width:"20%"}},[t._v("배팅")]),a("th",{attrs:{scope:"col",width:"5%"}},[t._v("배당")]),a("th",{attrs:{scope:"col",width:"5%"}},[t._v("상태")]),a("th",{attrs:{scope:"col",width:"5%"}},[t._v("결과")])])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"col betting-history-header"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-3"},[t._v(" 일시/리그 ")]),a("div",{staticClass:"col-4"},[a("div",{staticClass:"team-name"},[t._v(" 홈팀 vs 원정팀 ")])]),a("div",{staticClass:"col"},[t._v(" 베팅 ")]),a("div",{staticClass:"col"},[t._v(" 상태 ")]),a("div",{staticClass:"col"},[t._v(" 결과 ")])])])}],r=a("c7eb"),n=a("1da1"),i=a("5530"),c=(a("ac1f"),a("5319"),a("2f62")),l={name:"FreeDetail",components:{},computed:Object(i["a"])({},Object(c["c"])(["loading"])),data:function(){return{title:"",content:"",regDateTime:"",writerGrade:1,writerNick:1,gameID:null,comment:[],commentContent:"",betInfo:null}},mounted:function(){this.getDetail()},methods:Object(i["a"])(Object(i["a"])({},Object(c["b"])(["getInformation"])),{},{getDetail:function(){var t=this;return Object(n["a"])(Object(r["a"])().mark((function e(){var a,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-free-detail",{_id:t.$route.params._id});case 2:if(a=e.sent,!a.error){e.next=6;break}return t.$tools.pushRouter("/free/?page=".concat(t.$route.params.page)),e.abrupt("return");case 6:if(a.data.free){e.next=9;break}return t.$tools.pushRouter("/free/?page=".concat(t.$route.params.page)),e.abrupt("return");case 9:if(t.title=a.data.free.title,t.content=a.data.free.content,t.regDateTime=a.data.free.regDateTime,t.writerGrade=a.data.free.writerGrade,t.writerNick=a.data.free.writerNick,t.gameID=a.data.free.gameID,t.comment=a.data.answer,!t.gameID){e.next=23;break}return e.next=19,t.$http.get("/api/get-board-bet-list-view",{_id:t.gameID});case 19:if(s=e.sent,!s.error){e.next=22;break}return e.abrupt("return");case 22:t.betInfo=s.data;case 23:case"end":return e.stop()}}),e)})))()},submit:function(){var t=this;return Object(n["a"])(Object(r["a"])().mark((function e(){var a;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("/api/free-comment",{_id:t.$route.params._id,commentContent:t.commentContent});case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.commentContent="",t.$tools.sw("success","댓글 성공","작성하신 댓글이 등록 되었습니다."),t.getDetail(),t.getInformation();case 9:case"end":return e.stop()}}),e)})))()},calcResult:function(t,e,a){return"I"===t||"L"===t||"C"===t?0:"N"===t?this.$numeral(e).format("0,0"):"W"===t?this.$numeral(parseInt(e*a)).format("0,0"):void 0},displaySpecialScore:function(t,e,a){var s="";return"home"===e&&"W"===a||"away"===e&&"L"===a?s="홈":("home"===e&&"L"===a||"away"===e&&"W"===a)&&(s="원정"),"run1stInning"===t&&(s=s.replace(/홈/gi,"득점").replace(/원정/gi,"무득점")),s}})},d=l,m=(a("523e"),a("2877")),v=Object(m["a"])(d,s,o,!1,null,"72754b1f",null);e["default"]=v.exports}}]);