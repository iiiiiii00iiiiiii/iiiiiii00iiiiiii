(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["helpdetail"],{"29e7":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[a("font-awesome-icon",{attrs:{icon:["fa","comments"]}}),a("span",{staticClass:"ml-2"},[t._v("고객센터 상세 HELP DETAIL")])],1)])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-detail"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-delete",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.deleteHelp(t.$route.params._id)}}},[a("font-awesome-icon",{attrs:{icon:["fa","trash-alt"]}}),t._v(" 삭제 ")],1),a("button",{staticClass:"btn-board ml-2",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.getDetail()}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),t._v(" 새로고침 ")],1),a("button",{staticClass:"btn-board ml-2",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.$tools.pushRouter("/help/?page="+t.$route.params.page)}}},[a("font-awesome-icon",{attrs:{icon:["fa","list"]}}),t._v(" 목록 ")],1)])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-borderless table-board text-nowrap"},[a("thead",[a("tr",[a("th",[t._v(" "+t._s(t.title)+" ")])])]),a("tbody",[a("tr",[a("td",{domProps:{innerHTML:t._s(t.content)}})]),t.answerStatus?a("tr",[a("td",{staticClass:"board-content",domProps:{innerHTML:t._s(t.comment)}})]):t._e()])])])])])])])])])])},s=[],r=a("c7eb"),o=a("1da1"),c=a("5530"),i=(a("99af"),a("2f62")),l={name:"HelpDetail",components:{},computed:Object(c["a"])({},Object(i["c"])(["loading"])),data:function(){return{title:"",content:"",answerStatus:!1,regDateTime:"",comment:""}},mounted:function(){this.getDetail()},methods:{getDetail:function(){var t=this;return Object(o["a"])(Object(r["a"])().mark((function e(){var a;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-help-detail",{_id:t.$route.params._id});case 2:if(a=e.sent,!a.error){e.next=6;break}return t.$tools.pushRouter("/help/?page=".concat(t.$route.params.page)),e.abrupt("return");case 6:if(a.data.help){e.next=9;break}return t.$tools.pushRouter("/help/?page=".concat(t.$route.params.page)),e.abrupt("return");case 9:t.title=a.data.help.title,t.content=a.data.help.content,t.answerStatus=a.data.help.answerStatus,t.regDateTime=a.data.help.regDateTime,t.answerStatus&&(t.comment='<p class="text-orange mb-3">ㄴ관리자 답변 - '.concat(t.$moment(a.data.answer.regDateTime).format("YY-MM-DD HH:mm"),"</p>").concat(a.data.answer.comment));case 14:case"end":return e.stop()}}),e)})))()},deleteHelp:function(t){var e=this;return Object(o["a"])(Object(r["a"])().mark((function a(){return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:e.$sw.fire({title:"문의 내역 삭제",text:"문의 내역을 삭제 하시겠습니까?",icon:"info",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"네",cancelButtonText:"아니오",focusConfirm:!1}).then(function(){var a=Object(o["a"])(Object(r["a"])().mark((function a(n){var s;return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(!n.value){a.next=8;break}return a.next=3,e.$http.delete("/api/delete-help",{_id:t});case 3:if(s=a.sent,!s.error){a.next=6;break}return a.abrupt("return");case 6:e.$tools.sw("success","문의 내역 삭제 성공","문의 내역이 삭제 되었습니다.",null),e.$tools.pushRouter("/help/?page=".concat(e.$route.params.page));case 8:case"end":return a.stop()}}),a)})));return function(t){return a.apply(this,arguments)}}());case 1:case"end":return a.stop()}}),a)})))()}}},u=l,d=a("2877"),p=Object(d["a"])(u,n,s,!1,null,null,null);e["default"]=p.exports}}]);