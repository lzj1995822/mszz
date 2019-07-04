function injectStyle (ssrContext) {
  require("!!../../../node_modules/extract-text-webpack-plugin/loader.js?{\"omit\":1,\"remove\":true,\"publicPath\":\"../../\"}!vue-style-loader!css-loader?{\"minimize\":true,\"sourceMap\":true}!../../../node_modules/vue-loader/lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-3aa8bb5b\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./ServedPersonInfo.vue")
}
var normalizeComponent = require("!../../../node_modules/vue-loader/lib/component-normalizer")
/* script */
import __vue_script__ from "!!babel-loader!../../../node_modules/vue-loader/lib/selector?type=script&index=0!./ServedPersonInfo.vue"
/* template */
import __vue_template__ from "!!../../../node_modules/vue-loader/lib/template-compiler/index?{\"id\":\"data-v-3aa8bb5b\",\"hasScoped\":true}!../../../node_modules/vue-loader/lib/selector?type=template&index=0!./ServedPersonInfo.vue"
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3aa8bb5b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

export default Component.exports



//////////////////
// WEBPACK FOOTER
// ./src/views/zongzhizuzhi/ServedPersonInfo.vue
// module id = KAYL
// module chunks = 3