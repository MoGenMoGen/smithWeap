require("../../../common/manifest.js")
require("../../../common/vendor.js")
global.webpackJsonpMpvue([29],{259:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3),o=n.n(r),s=n(260);o.a.config.errorHandler=function(e){console&&console.error&&console.error(e)},new o.a(s.a).$mount()},260:function(e,t,n){"use strict";var r=n(263),o=n(264),s=!1;var a=function(e){s||(n(261),n(262))},i=n(0)(r.a,o.a,a,"data-v-24835cf9",null);i.options.__file="src\\pages\\my\\helpCenter\\index.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__"!==e.substr(0,2)})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions."),t.a=i.exports},261:function(e,t){},262:function(e,t){},263:function(e,t,n){"use strict";var r=n(1),o=n.n(r),s=n(2),a=n.n(s),i=n(44),c=n(4);t.a={data:function(){return{info:{}}},onShow:function(){var e=this;return a()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.getHelpCenter();case 1:case"end":return t.stop()}},t,e)}))()},methods:{toPage:function(e){e&&this.util.aHref(e)},getHelpCenter:function(){var e=this;return a()(o.a.mark(function t(){var n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.api.getHelpCenter();case 2:n=t.sent,e.info=n.data;case 4:case"end":return t.stop()}},t,e)}))()}},components:{headerBase:i.a,bottomBase:c.a}}},264:function(e,t,n){"use strict";var r=function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"app"},[t("div",{staticClass:"main"},[t("div",{staticClass:"mainBox"},[t("div",{staticClass:"core"},[t("p",{domProps:{innerHTML:this._s(this.info.content)}})],1)])]),this._v(" "),t("bottomBase",{attrs:{mpcomid:"0"}})],1)};r._withStripped=!0;var o={render:r,staticRenderFns:[]};t.a=o}},[259]);