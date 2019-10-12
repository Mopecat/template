import App from "./App.vue";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import { sync } from "vuex-router-sync";
import store from "./store";
import filters from "./filters";

browserId.setBrowserId();
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(ElementUI);

// let isInitStatistics = false
router.beforeResolve((to, from, next) => {
  next();
});
// 路由控制，用来处理一些全局状态
router.afterEach(route => {});

/* eslint-disable no-new */
let app = new Vue({
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});

app.$mount("#app");
