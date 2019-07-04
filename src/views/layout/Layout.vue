function injectStyle (ssrContext) {
  require("!!vue-style-loader!css-loader?minimize!../../../node_modules/vue-loader/lib/style-compiler/index?{\"vue\":true,\"id\":\"data-v-73451c94\",\"scoped\":true,\"hasInlineConfig\":false}!sass-loader!../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./Layout.vue")
}
var normalizeComponent = require("!../../../node_modules/vue-loader/lib/component-normalizer")
/* script */
import __vue_script__ from "!!babel-loader!../../../node_modules/vue-loader/lib/selector?type=script&index=0!./Layout.vue"
/* template */
import __vue_template__ from "!!../../../node_modules/vue-loader/lib/template-compiler/index?{\"id\":\"data-v-73451c94\",\"hasScoped\":true}!../../../node_modules/vue-loader/lib/selector?type=template&index=0!./Layout.vue"
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-73451c94"
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
// ./src/views/layout/Layout.vue
// module id = AkUR
// module chunks = 172