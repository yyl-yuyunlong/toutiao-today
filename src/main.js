import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'

// 加载注册 Vant 组件
import 'vant/lib/index.css'

// 加载全局样式
import './styles/index.less'

// 自动设置REM基准值(html 标签字体大小)
import 'amfe-flexible'

// 加载 dayjs
import './utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
