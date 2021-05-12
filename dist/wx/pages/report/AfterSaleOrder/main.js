require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([25],{382:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var o=s(3),e=s.n(o),n=s(383);e.a.config.errorHandler=function(t){console&&console.error&&console.error(t)},new e.a(n.a).$mount()},383:function(t,i,s){"use strict";var o=s(386),e=s(390),n=!1;var a=function(t){n||(s(384),s(385))},r=s(0)(o.a,e.a,a,"data-v-3564d0b4",null);r.options.__file="src\\pages\\report\\AfterSaleOrder\\index.vue",r.esModule&&Object.keys(r.esModule).some(function(t){return"default"!==t&&"__"!==t.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),i.a=r.exports},384:function(t,i){},385:function(t,i){},386:function(t,i,s){"use strict";var o=s(1),e=s.n(o),n=s(2),a=s.n(n),r=s(50),v=s(35),c=s(6),l=s(4),d=s(17),p=s(48),u=s(26),_=s.n(u),m=s(27),f=s.n(m),h=s(14),g=s.n(h),C=s(11),w=s.n(C),b=s(15),k=s.n(b),x=s(71),O=s.n(x);i.a={data:function(){return{jt:k.a,tpsc:g.a,del:w.a,dshtb:O.a,info:{},pushInfo:{},centerList:[{nm:"工作打卡",imgUrl:_.a},{nm:"异常报告",imgUrl:f.a}],currentIndex:0,isModel:!1,changeModel:!1,type:1,id:"",imglist1:[],imglist2:[],imglist3:[],nametype:1,options:"",sure:0,custSign:"",myQrcode:""}},onShow:function(){var t=this;return a()(e.a.mark(function i(){return e.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}},i,t)}))()},methods:{toPage:function(t){t&&this.util.aHref(t)},changeTab:function(t,i){0==i?this.toPage("/pages/report/tabDetail/clock/main?id="+this.id+"&type=0"):this.toPage("/pages/report/tabDetail/exceptionReport/main?id="+this.id+"&type=0")},getlist:function(){var t=this;return a()(e.a.mark(function i(){var s;return e.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.next=2,t.api.getServiceDtl(t.id);case 2:s=i.sent,t.info=s.data,t.info.bidStart=t.info.bidStart.slice(0,10),t.info.bidEnd=t.info.bidEnd.slice(0,10),t.pushInfo=t.info.worksCompletion2VO,t.pushInfo.completionTm=t.pushInfo.completionTm.slice(0,10),t.imglist1=t.pushInfo.imgBefore.split(","),t.imglist2=t.pushInfo.imgAfter.split(","),t.imglist3=t.pushInfo.feedbackImg.split(",");case 11:case"end":return i.stop()}},i,t)}))()},submit:function(t){var i=this,s=void 0;s=1==t?{id:this.info.worksCompletion2VO.id,orderId:this.info.worksCompletion2VO.orderId,audit:3,options:this.options}:{id:this.info.worksCompletion2VO.id,orderId:this.info.worksCompletion2VO.orderId,audit:2,options:this.options},this.api.workscompletion2approvePC(s).then(function(t){i.getlist()})},getsign:function(t){this.custSign=t,wx.showToast({icon:"none",title:"保存成功",duration:2e3})},custsubmit:function(t){var i,s=this;if(""==this.custSign)return wx.showToast({icon:"none",title:"请签名后提交",duration:2e3});1!=t&&(i={id:this.info.worksCompletion2VO.id,orderId:this.info.worksCompletion2VO.orderId,audit:5,custSign:this.custSign,signTm:"2021-04-03 00:00:00"},this.api.workscompletion2custAudit(i).then(function(t){s.toPage("/pages/report/satisfactionSurvey/main?id="+s.id)}))}},onLoad:function(t){this.id=t.id,this.nametype=wx.getStorageSync("loginType"),this.sure=t.sure,this.options="";var i=this.wxHostUrl+"/views/smith/AfterSale.html?id="+this.id;console.log(this.wxHostUrl),Object(r.a)({width:100,height:100,canvasId:"myQrcode",text:i}),this.getlist()},components:{Reports:p.a,bottomBase:l.a,modelMask:d.a,dateRange:c.a,signature:v.a}}},390:function(t,i,s){"use strict";var o=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",{staticClass:"app"},[s("div",{staticClass:"main"},[s("div",{staticClass:"infoBox"},[s("ul",[s("li",[s("span",[t._v("发布日期")]),t._v(" "),s("p",[t._v(t._s(t.info.bidStart))])],1),t._v(" "),s("li",[s("span",[t._v("接单日期")]),t._v(" "),s("p",[t._v(t._s(t.info.orderTm))])],1),t._v(" "),s("li",[s("span",[t._v("项目人员")]),t._v(" "),s("p",[t._v(t._s(t.info.userName))])],1),t._v(" "),s("li",[s("span",[t._v("工单编号")]),t._v(" "),s("p",[t._v(t._s(t.info.cd))])],1),t._v(" "),s("li",[s("span",[t._v("项目")]),t._v(" "),s("p",[t._v(t._s(t.info.projNm))])],1),t._v(" "),s("li",[s("span",[t._v("经销商名称")]),t._v(" "),s("p",[t._v(t._s(t.info.custNm))])],1),t._v(" "),s("li",[s("span",[t._v("要求到场时间")]),t._v(" "),s("p",[t._v(t._s(t.info.arrivalDt))])],1),t._v(" "),s("li",[s("span",[t._v("工作类型")]),t._v(" "),s("p",[t._v(t._s(t.info.workTypeNm))])],1),t._v(" "),s("li",[s("span",[t._v("工作内容")]),t._v(" "),s("p",[t._v(t._s(t.info.workCont))])],1),t._v(" "),s("li",[s("span",[t._v("客户联系人")]),t._v(" "),s("p",[t._v(t._s(t.info.custContact))])],1),t._v(" "),s("li",[s("span",[t._v("客户联系电话")]),t._v(" "),s("p",[t._v(t._s(t.info.custMob))])],1),t._v(" "),s("li",[s("span",[t._v("客户联系地址")]),t._v(" "),s("p",[t._v(t._s(t.info.custAddr))])],1)],1)],1),t._v(" "),s("div",{staticClass:"navBox"},[s("ul",t._l(t.centerList,function(i,o){return s("li",{key:o,attrs:{eventid:"0_"+o},on:{click:function(s){t.changeTab(i,o)}}},[s("img",{staticClass:"img",attrs:{src:i.imgUrl,mode:"aspectFit"}}),t._v(" "),s("p",{style:{color:"#303030"}},[t._v(t._s(i.nm))])],1)}))],1),t._v(" "),s("div",{staticClass:"repairbefore"},[s("div",{staticClass:"title"},[t._v("维修前照片")]),t._v(" "),s("div",{staticClass:"br"}),t._v(" "),s("div",{staticClass:"picture"},[s("div",{staticClass:"imgbox"},t._l(t.imglist1,function(t,i){return s("div",{key:i,staticClass:"imgs"},[s("img",{attrs:{src:t,mode:"heightFix"}})])}))])]),t._v(" "),s("div",{staticClass:"repairbefore"},[s("div",{staticClass:"title"},[t._v("维修后照片")]),t._v(" "),s("div",{staticClass:"br "}),t._v(" "),s("div",{staticClass:"picture"},[s("div",{staticClass:"imgbox"},t._l(t.imglist2,function(t,i){return s("div",{key:i,staticClass:"imgs"},[s("img",{attrs:{src:t,mode:"heightFix"}})])}))])]),t._v(" "),s("div",{staticClass:"work bottom"},[s("div",{staticClass:"title"},[t._v("工作完成情况：(填写工作内容)")]),t._v(" "),s("div",{staticClass:"br br1"}),t._v(" "),s("div",{staticClass:"textarea"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.pushInfo.completionDesc,expression:"pushInfo.completionDesc"}],attrs:{bindblur:"bindTextAreaBlur","auto-height":"",disabled:"",eventid:"1"},domProps:{value:t.pushInfo.completionDesc},on:{input:function(i){i.target.composing||(t.pushInfo.completionDesc=i.target.value)}}})]),t._v(" "),s("div",{staticClass:"time"},[s("span",[t._v("完成日期")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:t.pushInfo.completionTm,expression:"pushInfo.completionTm"}],attrs:{type:"text",disabled:"",eventid:"2"},domProps:{value:t.pushInfo.completionTm},on:{input:function(i){i.target.composing||(t.pushInfo.completionTm=i.target.value)}}})])]),t._v(" "),s("div",{staticClass:"question"},[s("div",{staticClass:"title"},[t._v("问题反馈：(描述并附带现场照片)")]),t._v(" "),s("div",{staticClass:"br br1"}),t._v(" "),s("div",{staticClass:"feedback"},[t._v("\n        "+t._s(t.pushInfo.feedback)+"\n      ")]),t._v(" "),s("div",{staticClass:"picture",staticStyle:{"padding-top":"80rpx"}},[s("div",{staticClass:"imgbox"},t._l(t.imglist3,function(t,i){return s("div",{key:i,staticClass:"imgs"},[s("img",{attrs:{src:t,mode:"heightFix"}})])}))])]),t._v(" "),s("div",{staticClass:"infoBox review"},[s("ul",[s("li",[s("span",[t._v("工作人员")]),t._v(" "),s("p",[t._v(t._s(t.info.constructionManagerNm?t.info.constructionManagerNm:"暂无"))])],1),t._v(" "),s("li",[s("span",[t._v("提交时间")]),t._v(" "),s("p",[t._v(t._s(t.info.worksCompletion2VO.createTime))])],1)],1)],1),t._v(" "),t.info.worksCompletion2VO.audit>=2?s("div",{staticClass:"infoBox review"},[s("ul",[s("li",[s("span",[t._v("售后审核")]),t._v(" "),s("p",[t._v(t._s(t.info.userName?t.info.userName:"暂无"))])],1),t._v(" "),s("li",[s("span",[t._v("审核状态")]),t._v(" "),s("p",[t._v(t._s(3==t.info.worksCompletion2VO.audit?"驳回":"通过"))])],1),t._v(" "),s("li",[s("span",[t._v("审核时间")]),t._v(" "),s("p",[t._v(t._s(t.info.worksCompletion2VO.auditTm?t.info.worksCompletion2VO.auditTm:"暂无"))])],1)],1)],1):t._e(),t._v(" "),t.info.worksCompletion2VO.audit>=5?s("div",{staticClass:"infoBox review"},[s("ul",[s("li",[s("span",[t._v("确认二维码")]),t._v(" "),s("canvas",{staticStyle:{width:"100px",height:"100px"},attrs:{"canvas-id":"myQrcode"}})]),t._v(" "),s("li",[s("span",[t._v("客户确认")]),t._v(" "),s("image",{attrs:{src:t.info.worksCompletion2VO.custSign,mode:"widthFix"}})]),t._v(" "),s("li",[s("span",[t._v("确认时间")]),t._v(" "),s("p",[t._v(t._s(t.info.worksCompletion2VO.signTm?t.info.worksCompletion2VO.signTm:"暂无"))])],1)],1)],1):t._e(),t._v(" "),2==t.info.worksCompletion2VO.audit&&1!=t.sure?s("div",{staticClass:"infoBox review"},[s("ul",[s("li",[s("span",[t._v("确认二维码")]),t._v(" "),s("canvas",{staticStyle:{width:"100px",height:"100px"},attrs:{"canvas-id":"myQrcode"}})])],1)],1):t._e(),t._v(" "),1==t.sure&&2==t.info.worksCompletion2VO.audit?s("div",{staticClass:"infoBox review"},[t._m(0),t._v(" "),s("div",{staticClass:"sign"},[s("signature",{attrs:{eventid:"3",mpcomid:"0"},on:{success:t.getsign}})],1)]):t._e(),t._v(" "),2==t.nametype&&1==t.info.worksCompletion2VO.audit?s("div",{staticClass:"infoBox options"},[s("p",[t._v("审核意见")]),t._v(" "),s("div",{staticClass:"textarea"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.options,expression:"options"}],attrs:{placeholder:"请输入建议...",name:"",id:"",cols:"30",rows:"10",eventid:"4"},domProps:{value:t.options},on:{input:function(i){i.target.composing||(t.options=i.target.value)}}})])],1):t._e(),t._v(" "),(2!=t.nametype||1!=t.info.worksCompletion2VO.audit)&&1!=t.sure&&t.info.worksCompletion2VO.audit<=3?s("div",{staticClass:"infoBox review"},[s("ul",[s("li",{staticClass:"icon"},[s("p",[s("img",{attrs:{src:t.dshtb,mode:"width"}}),t._v("\n            "+t._s(1==t.info.worksCompletion2VO.audit?"待售后审核":2==t.info.worksCompletion2VO.audit?"待客户确认":"审核已驳回")+"\n          ")])],1)],1)],1):t._e()]),t._v(" "),s("bottomBase",{attrs:{mpcomid:"1"}}),t._v(" "),2==t.nametype&&1==t.info.worksCompletion2VO.audit?s("div",{staticClass:"button"},[s("div",{staticClass:"btn1",attrs:{eventid:"5"},on:{click:function(i){t.submit(1)}}},[t._v("不通过")]),t._v(" "),s("div",{staticClass:"btn2",attrs:{eventid:"6"},on:{click:function(i){t.submit(2)}}},[t._v("通过")])]):t._e(),t._v(" "),1==t.sure&&2==t.info.worksCompletion2VO.audit?s("div",{staticClass:"button"},[s("div",{staticClass:"btn1",attrs:{eventid:"7"},on:{click:function(i){t.custsubmit(1)}}},[t._v("取消")]),t._v(" "),s("div",{staticClass:"btn2",attrs:{eventid:"8"},on:{click:function(i){t.custsubmit(2)}}},[t._v("提交")])]):t._e()],1)};o._withStripped=!0;var e={render:o,staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"title"},[i("span",[this._v("客户负责人签名")])])}]};i.a=e}},[382]);