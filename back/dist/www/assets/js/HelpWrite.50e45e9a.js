(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["HelpWrite"],{"4c18":function(t,e,a){"use strict";a("dd5b")},a069:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("UrgentNotice"),a("div",{staticClass:"content-box"},[a("hr",{staticClass:"mt-0 pb-3 d-none d-xlock"}),t._m(0),a("hr"),a("div",{staticClass:"row mt-3"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-write"},[a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control form-control-sm board-input",attrs:{type:"text",placeholder:"제목",maxlength:"100",tabindex:"1"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"form-control form-control-sm board-input",attrs:{placeholder:"내용",rows:"10",maxlength:"500",tabindex:"2"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-board red",attrs:{type:"button",disabled:t.loading,tabindex:"4"},on:{click:function(e){return t.$tools.pushRouter("/help/?page="+t.$route.params.page)}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),t._v(" 취소 ")],1),a("button",{staticClass:"btn-board ml-2",attrs:{type:"button",disabled:t.loading,tabindex:"3"},on:{click:function(e){return t.submit()}}},[a("font-awesome-icon",{attrs:{icon:["fa","pen"]}}),t._v(" 문의 등록 ")],1)])])])])])])],1)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"title"},[t._v(" 고객센터 문의 "),a("span",[t._v("CS CENTER")])])])])}],o=a("1da1"),i=a("5530"),c=(a("96cf"),a("2f62")),r=a("aa95"),l={name:"HelpWrite",components:{UrgentNotice:r["a"]},computed:Object(i["a"])({},Object(c["c"])(["loading"])),data:function(){return{title:"",content:""}},methods:{submit:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("/api/help",{title:t.title,content:t.content});case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.$tools.sw("success","문의하기 성공","문의내역이 등록 되었습니다.","html"),t.$tools.pushRouter("/help/?page=".concat(t.$route.params.page));case 7:case"end":return e.stop()}}),e)})))()}}},u=l,d=a("2877"),p=Object(d["a"])(u,s,n,!1,null,null,null);e["default"]=p.exports},aa95:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid d-none d-xl-block"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 nrgent-notice"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-1 px-4"},[a("div",{staticClass:"notice-button"},[t._v("긴급공지")])]),a("div",{staticClass:"col-11 notice px-0"},[t._v(" 신규회원 베팅규정 필독후 이용해주시기를 바라며, 고객센터 계좌문의후 입금을 해주시기를 바랍니다. ")])])])])])}],o={},i=o,c=(a("4c18"),a("2877")),r=Object(c["a"])(i,s,n,!1,null,"72a88b09",null);e["a"]=r.exports},dd5b:function(t,e,a){}}]);