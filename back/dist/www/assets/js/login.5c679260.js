(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"40d0":function(t,a,s){"use strict";s("f5f5")},a55b:function(t,a,s){"use strict";s.r(a);var o=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"row"},[s("div",{staticClass:"col"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-12 col-xl-4 offset-xl-4 mt-0"},[s("div",{staticClass:"login"},[s("div",{staticClass:"logo-wrap"},[s("img",{staticClass:"cursor-pointer logo-login",attrs:{src:"/images/logo.png",alt:"GOLDEN"},on:{click:function(a){return t.$tools.pushRouter("/",!1)}}})]),s("div",{staticClass:"login-title"},[t._v(" 로그인 후 다양한 혜택을 누리실 수 있습니다. ")]),s("div",{staticClass:"mt-4"},[s("form",{staticClass:"row",on:{submit:function(a){return a.preventDefault(),t.login()}}},[s("div",{staticClass:"col-12"},[s("label",{attrs:{for:"id"}},[t._v("아이디")]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.id,expression:"id"}],staticClass:"form-control form-control-sm login-input",attrs:{type:"text",id:"id",tabindex:"1",maxlength:"20",placeholder:"아이디를 입력하세요."},domProps:{value:t.id},on:{input:function(a){a.target.composing||(t.id=a.target.value)}}})]),s("label",{attrs:{for:"password"}},[t._v("비밀번호")]),s("div",{staticClass:"form-group"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"form-control form-control-sm login-input",attrs:{type:"password",tabindex:"2",id:"password",maxlength:"50",placeholder:"비밀번호를 입력하세요.",autocomplete:"new-password"},domProps:{value:t.password},on:{input:function(a){a.target.composing||(t.password=a.target.value)}}})])]),s("div",{staticClass:"col-6"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn-cancel-login",attrs:{type:"button",tabindex:"12",disabled:t.loading},on:{click:function(a){return t.$tools.pushRouter("/")}}},[s("font-awesome-icon",{attrs:{icon:["fa","ban"]}}),t._v(" 취소 ")],1)])]),s("div",{staticClass:"col-6"},[s("div",{staticClass:"form-group"},[s("button",{staticClass:"btn-login",attrs:{type:"submit",tabindex:"11",disabled:t.loading}},[s("font-awesome-icon",{attrs:{icon:["fa","sign-in-alt"]}}),t._v(" 로그인 ")],1)])]),s("div",{staticClass:"col-12 mt-1 text-light-brown"},[s("span",{staticClass:"cursor-pointer",on:{click:function(a){return t.$tools.pushRouter("/join")}}},[t._v("아직 회원이 아니세요? 회원가입")])])])])])])])])])])},e=[],i=s("1da1"),n=s("5530"),r=(s("96cf"),s("2f62")),c={name:"Login",data:function(){return{id:"",password:""}},computed:Object(n["a"])({},Object(r["c"])(["loading"])),methods:Object(n["a"])(Object(n["a"])({},Object(r["b"])(["setRouter"])),{},{login:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("/api/login",{id:t.id,password:t.password},!0);case 2:if(s=a.sent,!s.error){a.next=5;break}return a.abrupt("return");case 5:localStorage.setItem("access-token",s.headers["access-token"]),localStorage.setItem("duplicate",s.headers["duplicate"]),t.$store.commit("setUser",{_id:s.data._id,id:s.data.id,nick:s.data.nick,bankOwner:s.data.bankOwner,grade:s.data.grade,status:s.data.status,recommendCount:s.data.recommendCount,recommendLevel:s.data.recommendLevel,money:s.data.money,point:s.data.point,isAgent:s.data.isAgent}),t.id="",t.password="",t.$tools.pushRouter("/");case 11:case"end":return a.stop()}}),a)})))()}})},l=c,d=(s("40d0"),s("2877")),u=Object(d["a"])(l,o,e,!1,null,"7c392084",null);a["default"]=u.exports},f5f5:function(t,a,s){}}]);