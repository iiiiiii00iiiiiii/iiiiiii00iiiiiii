(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["notice"],{"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"841c":function(t,e,a){"use strict";var s=a("c65b"),i=a("d784"),n=a("825a"),r=a("1d80"),c=a("129f"),o=a("577e"),l=a("dc4a"),u=a("14c3");i("search",(function(t,e,a){return[function(e){var a=r(this),i=void 0==e?void 0:l(e,t);return i?s(i,e,a):new RegExp(e)[t](o(a))},function(t){var s=n(this),i=o(t),r=a(e,s,i);if(r.done)return r.value;var l=s.lastIndex;c(l,0)||(s.lastIndex=0);var d=u(s,i);return c(s.lastIndex,l)||(s.lastIndex=l),null===d?-1:d.index}]}))},c9d4:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row",attrs:{"data-aos":"fade-in","data-aos-duration":"1500"}},[a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"page-title-wrap"},[a("div",{staticClass:"page-title"},[a("font-awesome-icon",{attrs:{icon:["fa","bullhorn"]}}),a("span",{staticClass:"ml-2"},[t._v("공지사항 NOTICE")])],1)])])]),a("div",{staticClass:"row mt-1"},[a("div",{staticClass:"col"},[a("div",{staticClass:"board-list"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col text-right"},[a("button",{staticClass:"btn-board",attrs:{type:"button",disabled:t.loading},on:{click:function(e){return t.getList()}}},[a("font-awesome-icon",{attrs:{icon:["fa","redo"]}}),t._v(" 새로고침 ")],1)])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("table",{staticClass:"table table-borderless table-board"},[t._m(0),a("tbody",t._l(t.data,(function(e,s){return a("tr",{key:s},[a("td",{staticClass:"en"},[t._v(" 공지사항 ")]),a("td",[e.header?a("span",{style:"#000000"!==e.headerColor?"color: "+e.headerColor:""},[t._v("["+t._s(e.header)+"]")]):t._e(),a("span",{staticClass:"cursor-pointer",class:e.header?"ml-2":"",style:"#000000"!==e.titleColor?"color: "+e.titleColor:"",on:{click:function(a){return t.$tools.pushRouter("/notice/detail/"+e._id+"/"+t.search.page)}}},[t._v(" "+t._s(e.title)+" ")])])])})),0)])])]),a("div",{staticClass:"row mt-2"},[a("div",{staticClass:"col"},[a("b-pagination-nav",{attrs:{"first-class":"first-class","last-class":"last-class","prev-class":"prev-class","next-class":"next-class","ellipsis-class":"ellipsis-class","page-class":"page-class","link-gen":t.linkGen,"number-of-pages":t.numberOfPages,align:"center",limit:t.$config.pageLimit,"use-router":"",pills:"",size:"sm"},model:{value:t.search.page,callback:function(e){t.$set(t.search,"page",e)},expression:"search.page"}})],1)])])])])])])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",{staticClass:"w-25"},[t._v("종류")]),a("th",[t._v("제목")])])])}],n=a("1da1"),r=a("5530"),c=(a("96cf"),a("ac1f"),a("841c"),a("2f62")),o={name:"Notice",components:{},computed:Object(r["a"])(Object(r["a"])({},Object(c["c"])(["loading"])),{},{numberOfPages:function(){return 0===Math.ceil(this.totalCount/this.$config.pageSize)?1:Math.ceil(this.totalCount/this.$config.pageSize)}}),watch:{$route:function(){this.setFromRouter()}},data:function(){return{search:{page:1},data:[],totalCount:0}},created:function(){this.setFromRouter()},methods:{setFromRouter:function(){this.search.page=this.$route.query.page?this.$route.query.page:1,this.getList()},linkGen:function(t){return"?page=".concat(t)},getList:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$http.get("/api/get-notice-list",t.search);case 2:if(a=e.sent,!a.error){e.next=5;break}return e.abrupt("return");case 5:t.data=a.data.recordSet,t.totalCount=a.data.recordCount;case 7:case"end":return e.stop()}}),e)})))()}}},l=o,u=a("2877"),d=Object(u["a"])(l,s,i,!1,null,null,null);e["default"]=d.exports}}]);