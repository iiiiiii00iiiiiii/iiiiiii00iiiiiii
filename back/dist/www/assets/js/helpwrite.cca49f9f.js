(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["helpwrite"],{a069:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[a("font-awesome-icon",{attrs:{icon:["fa","comments"]}}),a("span",{staticClass:"ml-2"},[t._v("고객센터 문의 HELP")])],1)])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-write"},[a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],staticClass:"form-control form-control-sm board-input",attrs:{type:"text",placeholder:"제목",maxlength:"100",tabindex:"1"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"form-control form-control-sm board-input",attrs:{placeholder:"내용",rows:"10",maxlength:"500",tabindex:"2"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-board py-2",attrs:{type:"button",disabled:t.loading,tabindex:"4"},on:{click:function(e){return t.$tools.pushRouter("/help/?page="+t.$route.params.page)}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),t._v(" 취소 ")],1),a("button",{staticClass:"btn-write ml-2 py-2",attrs:{type:"button",disabled:t.loading,tabindex:"3"},on:{click:function(e){return t.submit()}}},[a("font-awesome-icon",{attrs:{icon:["fa","pen"]}}),t._v(" 문의 등록 ")],1)])])])])])])])},o=[],n=a("1da1"),i=a("5530"),r=(a("96cf"),a("2f62")),c={name:"HelpWrite",components:{},computed:Object(i["a"])({},Object(r["c"])(["loading"])),data:function(){return{title:"",content:""}},methods:{submit:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.post("/api/help",{title:t.title,content:t.content});case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.$tools.sw("success","문의하기 성공","문의내역이 등록 되었습니다.","html"),t.$tools.pushRouter("/help/?page=".concat(t.$route.params.page));case 7:case"end":return e.stop()}}),e)})))()}}},l=c,u=a("2877"),d=Object(u["a"])(l,s,o,!1,null,null,null);e["default"]=d.exports}}]);