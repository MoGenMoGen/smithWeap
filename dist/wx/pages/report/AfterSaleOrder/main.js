require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([7],{337:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=i(1),a=i.n(e),n=i(338);a.a.config.errorHandler=function(t){console&&console.error&&console.error(t)},new a.a(n.a).$mount()},338:function(t,s,i){"use strict";var e=i(341),a=i(343),n=!1;var o=function(t){n||(i(339),i(340))},r=i(0)(e.a,a.a,o,"data-v-3564d0b4",null);r.options.__file="src\\pages\\report\\AfterSaleOrder\\index.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),s.a=r.exports},339:function(t,s){},340:function(t,s){},341:function(t,s,i){"use strict";var e=i(3),a=i.n(e),n=i(4),o=i.n(n),r=i(13),v=i(2),c=i(21),l=i(67),p=i(32),u=i.n(p),d=i(33),_=i.n(d),m=i(34),f=i.n(m),g=i(35),h=i.n(g),b=i(16),C=i.n(b),A=i(31),x=i.n(A),w=i(17),k=i.n(w),y=i(342),I=i.n(y);s.a={data:function(){return{jt:k.a,tpsc:C.a,del:x.a,dshtb:I.a,info:{},pushInfo:{},centerList:[{nm:"工作打卡",imgUrl:u.a,imgUrlActive:_.a},{nm:"异常报告",imgUrl:f.a,imgUrlActive:h.a}],currentIndex:0,isModel:!1,changeModel:!1,type:1,id:"",imglist1:[],imglist2:[],imglist3:[]}},onShow:function(){var t=this;return o()(a.a.mark(function s(){return a.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},s,t)}))()},methods:{toPage:function(t){t&&this.util.aHref(t)},changeTab:function(t,s){this.currentIndex=s},getlist:function(){var t=this;return o()(a.a.mark(function s(){var i;return a.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.next=2,t.api.getServiceDtl(t.id);case 2:i=s.sent,t.info=i.data,t.pushInfo=t.info.worksCompletion2,t.imglist1=t.pushInfo.imgBefore.split(","),t.imglist2=t.pushInfo.imgAfter.split(","),t.imglist3=t.pushInfo.feedbackImg.split(",");case 8:case"end":return s.stop()}},s,t)}))()}},onLoad:function(t){this.id=t.id,this.getlist()},components:{Reports:l.a,bottomBase:v.a,modelMask:c.a,dateRange:r.a}}},342:function(t,s){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABsUlEQVQ4T61TQUsbQRh9XzRoejc7ZiO0h14E8SBO8OLNeBJ/QL2X0pNiir9BRSiKor9BEMGD0ZseJCMeit4UW8juZlbPTSya/WTSXV1jIoLObebNvO99b95HaFpOWg4iga8EjDLQZWAC/jFwgADr2Sv1K/6Eog3jY7dr9fwkon4wLZJ/t5/BSdXgHoY+sNU5BqDAxKe2vpom/LkJyYEyRlIk6jsE7NpaLQJgA1aEXA6Av7ZWc2EhcoUsMCPPvjfRB6fWUOAIuUbApa3VQlye2yu3AFTtivry5FzIHwx8ymr1jUzPlMCKrdVoVDm63I7A2OJauUNm/k6OkKvEVLT90nazoS8QwLVyk0w8bno6I12XkWGvaSEyNhAdJaPgPKvV5+bqZv+SgtC7i7cSnL9LC21N9NLDU8SJm97r0uYzgxsmBnny03Lwrs03tvIlCpRj5Q6T5htjQfptazUff+QJuQpwNaOPZ9sGyQBlZFMkMibKxTCNjSi3IGgd5RjJEpgGCPWFwE/u9eGo9h8bSSWs2zyjowDiU9bejJmDh2GKyzOe3D6Oc3eI1QA+SAa0YTWN8z2PyvCH9RCY8QAAAABJRU5ErkJggg=="},343:function(t,s,i){"use strict";var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"app"},[i("div",{staticClass:"main"},[i("div",{staticClass:"infoBox"},[i("ul",[i("li",[i("span",[t._v("发布日期")]),t._v(" "),i("p",[t._v(t._s(t.info.bidStart))])],1),t._v(" "),i("li",[i("span",[t._v("接单日期")]),t._v(" "),i("p",[t._v(t._s(t.info.orderTm))])],1),t._v(" "),i("li",[i("span",[t._v("项目人员")]),t._v(" "),i("p",[t._v(t._s(t.info.userName))])],1),t._v(" "),i("li",[i("span",[t._v("工单编号")]),t._v(" "),i("p",[t._v(t._s(t.info.cd))])],1),t._v(" "),i("li",[i("span",[t._v("项目")]),t._v(" "),i("p",[t._v(t._s(t.info.projNm))])],1),t._v(" "),i("li",[i("span",[t._v("经销商名称")]),t._v(" "),i("p",[t._v(t._s(t.info.custNm))])],1),t._v(" "),i("li",[i("span",[t._v("要求到场时间")]),t._v(" "),i("p",[t._v(t._s(t.info.arrivalDt))])],1),t._v(" "),i("li",[i("span",[t._v("工作类型")]),t._v(" "),i("p",[t._v(t._s(t.info.workTypeNm))])],1),t._v(" "),i("li",[i("span",[t._v("工作内容")]),t._v(" "),i("p",[t._v(t._s(t.info.workCont))])],1),t._v(" "),i("li",[i("span",[t._v("客户联系人")]),t._v(" "),i("p",[t._v(t._s(t.info.custContact))])],1),t._v(" "),i("li",[i("span",[t._v("客户联系电话")]),t._v(" "),i("p",[t._v(t._s(t.info.custMob))])],1),t._v(" "),i("li",[i("span",[t._v("客户联系地址")]),t._v(" "),i("p",[t._v(t._s(t.info.custAddr))])],1)],1)],1),t._v(" "),i("div",{staticClass:"navBox"},[i("ul",t._l(t.centerList,function(s,e){return i("li",{key:e,attrs:{eventid:"0_"+e},on:{click:function(i){t.changeTab(s,e)}}},[i("img",{staticClass:"img",attrs:{src:s.imgUrl,mode:"aspectFit"}}),t._v(" "),i("p",{style:{color:"#303030"}},[t._v(t._s(s.nm))])],1)}))],1),t._v(" "),i("div",{staticClass:"repairbefore"},[i("div",{staticClass:"title"},[t._v("维修前照片")]),t._v(" "),i("div",{staticClass:"br"}),t._v(" "),i("div",{staticClass:"picture"},[i("div",{staticClass:"imgbox"},t._l(t.imglist1,function(t,s){return i("div",{key:s,staticClass:"imgs"},[i("img",{attrs:{src:t,mode:"heightFix"}})])}))])]),t._v(" "),i("div",{staticClass:"repairbefore"},[i("div",{staticClass:"title"},[t._v("维修后照片")]),t._v(" "),i("div",{staticClass:"br "}),t._v(" "),i("div",{staticClass:"picture"},[i("div",{staticClass:"imgbox"},t._l(t.imglist2,function(t,s){return i("div",{key:s,staticClass:"imgs"},[i("img",{attrs:{src:t,mode:"heightFix"}})])}))])]),t._v(" "),i("div",{staticClass:"work bottom"},[i("div",{staticClass:"title"},[t._v("工作完成情况：(填写工作内容)")]),t._v(" "),i("div",{staticClass:"br br1"}),t._v(" "),i("div",{staticClass:"textarea"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.pushInfo.completionDesc,expression:"pushInfo.completionDesc"}],attrs:{bindblur:"bindTextAreaBlur","auto-height":"",disabled:"",eventid:"1"},domProps:{value:t.pushInfo.completionDesc},on:{input:function(s){s.target.composing||(t.pushInfo.completionDesc=s.target.value)}}})]),t._v(" "),i("div",{staticClass:"time"},[i("span",[t._v("完成日期")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.pushInfo.completionTm,expression:"pushInfo.completionTm"}],attrs:{type:"text",disabled:"",eventid:"2"},domProps:{value:t.pushInfo.completionTm},on:{input:function(s){s.target.composing||(t.pushInfo.completionTm=s.target.value)}}})])]),t._v(" "),i("div",{staticClass:"question"},[i("div",{staticClass:"title"},[t._v("问题反馈：(描述并附带现场照片)")]),t._v(" "),i("div",{staticClass:"br br1"}),t._v(" "),i("div",{staticClass:"feedback"},[t._v("\n        "+t._s(t.pushInfo.feedback)+"\n      ")]),t._v(" "),i("div",{staticClass:"picture",staticStyle:{"padding-top":"80rpx"}},[i("div",{staticClass:"imgbox"},t._l(t.imglist3,function(t,s){return i("div",{key:s,staticClass:"imgs"},[i("img",{attrs:{src:t,mode:"heightFix"}})])}))])])]),t._v(" "),i("div",{staticClass:"wait"},[i("img",{attrs:{src:t.dshtb,alt:""}}),t._v(" "),i("span",[t._v("待售后审核")])]),t._v(" "),i("bottomBase",{attrs:{mpcomid:"0"}})],1)};e._withStripped=!0;var a={render:e,staticRenderFns:[]};s.a=a}},[337]);