(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Mypage"],{"0d9b":function(s,t,a){"use strict";a("f570")},"22f7":function(s,t,a){},"7ec2":function(s,t,a){"use strict";a("22f7")},aa95:function(s,t,a){"use strict";var o=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"container-fluid d-none d-xl-block"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 nrgent-notice"},[a("div",{staticClass:"row"},[s._m(0),a("div",{staticClass:"col-6 notice"},[a("marquee",{attrs:{direction:"left"}},[s._v("신규회원 베팅규정 필독후 이용해주시기를 바라며, 고객센터 계좌문의후 입금을 해주시기를 바랍니다.")])],1)])])])])},e=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"col-1 px-4"},[a("div",{staticClass:"notice-button"},[s._v("긴급공지")])])}],l={},i=l,r=(a("7ec2"),a("2877")),c=Object(r["a"])(i,o,e,!1,null,"3fcdf5da",null);t["a"]=c.exports},bd34:function(s,t,a){"use strict";a.r(t);var o=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("UrgentNotice"),a("div",{staticClass:"content-box"},[a("hr",{staticClass:"mt-0 mb-5 d-none d-xl-block"}),s._m(0),a("hr",{staticClass:"mt-5 d-none d-xl-block"}),s._m(1),a("div",{staticClass:"horizon-line my-xl-3"}),a("div",{staticClass:"row mt-xl-4"},[a("div",{staticClass:"col-12 col-xl-4 offset-xl-4 change-info"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"title"},[s._v("정보변경")]),a("div",{staticClass:"title-sub"},[a("span",[s._v(s._s(s.user.nick))]),s._v(" 님의 회원정보 입니다 ")])])]),a("hr",{staticClass:"mt-4"}),a("div",{staticClass:"row"},[a("div",{staticClass:"col-10 offset-1"},[a("div",{staticClass:"mypage"},[a("form",{on:{submit:function(t){return t.preventDefault(),s.editUser()}}},[a("div",{staticClass:"row"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"id"}},[s._v("아이디")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{staticClass:"form-control form-control-sm join-input",attrs:{type:"text",id:"id",tabindex:"1",maxlength:"20",readonly:""},domProps:{value:s.user.id}})])]),a("div",{staticClass:"row mt-2"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"nick"}},[s._v("닉네임")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{staticClass:"form-control form-control-sm join-input",attrs:{type:"text",id:"nick",tabindex:"2",maxlength:"20",readonly:""},domProps:{value:s.user.nick}})])]),a("div",{staticClass:"row mt-2"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"passwordNow"}},[s._v("현재 비밀번호")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.passwordNow,expression:"passwordNow"}],staticClass:"form-control form-control-sm join-input",attrs:{type:"password",tabindex:"3",id:"passwordNow",maxlength:"50",placeholder:"비밀번호를 입력하세요.",autocomplete:"new-password"},domProps:{value:s.passwordNow},on:{input:function(t){t.target.composing||(s.passwordNow=t.target.value)}}})])]),a("div",{staticClass:"row mt-2"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"password"}},[s._v("변경 비밀번호")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.password,expression:"password"}],staticClass:"form-control form-control-sm join-input",attrs:{type:"password",tabindex:"4",id:"password",maxlength:"50",placeholder:"변경 하실 비밀번호를 입력하세요.",autocomplete:"new-password"},domProps:{value:s.password},on:{input:function(t){t.target.composing||(s.password=t.target.value)}}})])]),a("div",{staticClass:"row mt-2"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"passwordRe"}},[s._v("비밀번호 확인")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.passwordRe,expression:"passwordRe"}],staticClass:"form-control form-control-sm join-input",attrs:{type:"password",id:"passwordRe",tabindex:"5",maxlength:"50",placeholder:"변경 비밀번호 확인",autocomplete:"new-password"},domProps:{value:s.passwordRe},on:{input:function(t){t.target.composing||(s.passwordRe=t.target.value)}}})])]),a("div",{staticClass:"row mt-2"},[a("label",{staticClass:"col-12 col-xl-4 pt-xl-2",attrs:{for:"passwordRe"}},[s._v("출금 비밀번호")]),a("div",{staticClass:"col-12 col-xl-8"},[a("input",{directives:[{name:"model",rawName:"v-model",value:s.passwordExchange,expression:"passwordExchange"}],staticClass:"form-control form-control-sm join-input",attrs:{type:"password",id:"passwordExchange",tabindex:"6",maxlength:"50",placeholder:"출금 비밀번호를 입력하세요.",autocomplete:"new-password"},domProps:{value:s.passwordExchange},on:{input:function(t){t.target.composing||(s.passwordExchange=t.target.value)}}})])]),a("div",{staticClass:"row mt-4 mb-5"},[a("div",{staticClass:"col-12 text-center"},[a("button",{staticClass:"btn-board btn-block",attrs:{type:"submit",tabindex:"7",disabled:s.loading}},[s._v(" 변경하기 ")])])])])])])])])])])],1)])},e=[function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"title"},[s._v(" 마이페이지 "),a("span",[s._v("MYPAGE")])])])])},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("div",{staticClass:"row mt-4 mt-xl-3"},[a("div",{staticClass:"col-12 px-0 px-xl-3"},[a("div",{staticClass:"notice-box"},[a("div",{staticClass:"notice-box-title"},[s._v(" 주의사항 ")]),a("div",{staticClass:"notice-box-content"},[a("ul",[a("li",[s._v("비밀번호 및 출금비밀번호 수정이 가능합니다. "),a("span",{staticClass:"red"},[s._v("(최소 4자 이상 입력해주세요.)")])]),a("li",[s._v("타인에게 계정양도 및 아이디 대여시 "),a("span",{staticClass:"red"},[s._v("정지 또는 탈퇴처리 됩니다.")])]),a("li",[s._v("출금계좌 변경은 고객센터로 문의주시기 바랍니다.")]),a("li",[s._v("정기적으로 비밀번호 및 출금비밀번호를 변경하시길 권장 합니다.")]),a("li",[s._v("개인정보 도용 및 악의적인 사용자에 의해 피해를 최대한 방지하기 위해서 쉽게 추측이 가능한 비밀번호 사용을 자제 하시기 바랍니다.")])])])])])])}],l=a("1da1"),i=a("5530"),r=(a("96cf"),a("2f62")),c=a("aa95"),n={name:"Mypage",components:{UrgentNotice:c["a"]},computed:Object(i["a"])({},Object(r["c"])(["loading","user"])),data:function(){return{passwordNow:"",password:"",passwordRe:"",passwordExchange:""}},methods:{editUser:function(){var s=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.$http.put("/api/edit-user",{passwordNow:s.passwordNow,password:s.password,passwordRe:s.passwordRe,passwordExchange:s.passwordExchange});case 2:if(a=t.sent,!a.error){t.next=5;break}return t.abrupt("return");case 5:s.passwordNow="",s.password="",s.passwordRe="",s.passwordExchange="",s.$tools.sw("success","회원 정보 수정 성공","회원 정보가 수정 되었습니다.","html");case 10:case"end":return t.stop()}}),t)})))()}}},d=n,p=(a("0d9b"),a("2877")),u=Object(p["a"])(d,o,e,!1,null,"46350e8c",null);t["default"]=u.exports},f570:function(s,t,a){}}]);