(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["rulesdetail"],{"5dc0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[e("div",{staticClass:"col"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col"},[e("div",{staticClass:"page-title-wrap"},[e("div",{staticClass:"page-title"},[e("font-awesome-icon",{attrs:{icon:["fa","info"]}}),e("span",{staticClass:"ml-2"},[t._v("경기규정 상세 RULES DETAIL")])],1)])])]),e("div",{staticClass:"row mt-1"},[e("div",{staticClass:"col"},[e("div",{staticClass:"board-detail"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col text-right"},[e("button",{staticClass:"btn-board",attrs:{type:"button",disabled:t.loading},on:{click:function(a){return t.$tools.pushRouter("/rules/?page="+t.$route.params.page)}}},[e("font-awesome-icon",{attrs:{icon:["fa","list"]}}),t._v(" 목록 ")],1)])]),e("div",{staticClass:"row mt-2"},[e("div",{staticClass:"col"},[e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-borderless table-board text-nowrap"},[e("thead",[e("tr",[e("th",[t.header?e("span",{style:"#000000"!==t.headerColor?"color: "+t.headerColor:""},[t._v("["+t._s(t.header)+"]")]):t._e(),e("span",{staticClass:"cursor-pointer",class:t.header?"ml-2":"",style:"#000000"!==t.titleColor?"color: "+t.titleColor:""},[t._v(" "+t._s(t.title)+" ")])])])]),e("tbody",[e("tr",[e("td",{staticClass:"board-content",domProps:{innerHTML:t._s(t.content)}})])])])])])])])])])])])},r=[],o=e("c7eb"),i=e("1da1"),l=e("5530"),n=e("2f62"),c={name:"RulesDetail",components:{},computed:Object(l["a"])({},Object(n["c"])(["loading"])),data:function(){return{header:"",headerColor:"",title:"",titleColor:"",content:"",regDateTime:""}},mounted:function(){this.getDetail()},methods:{getDetail:function(){var t=this;return Object(i["a"])(Object(o["a"])().mark((function a(){var e;return Object(o["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/api/get-rules-detail",{_id:t.$route.params._id});case 2:if(e=a.sent,!e.error){a.next=6;break}return t.$tools.pushRouter("/rules/page=".concat(t.$route.params.page)),a.abrupt("return");case 6:if(e.data){a.next=9;break}return t.$tools.pushRouter("/rules/page=".concat(t.$route.params.page)),a.abrupt("return");case 9:t.header=e.data.header,t.headerColor=e.data.headerColor,t.title=e.data.title,t.titleColor=e.data.titleColor,t.content=e.data.content,t.regDateTime=e.data.regDateTime;case 15:case"end":return a.stop()}}),a)})))()}}},d=c,u=e("2877"),p=Object(u["a"])(d,s,r,!1,null,null,null);a["default"]=p.exports}}]);