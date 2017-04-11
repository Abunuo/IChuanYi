import "../styles/usage/page/app.scss";

// views
import mMainHot from './components/m-main-hot.vue';
import mMainAttention from './components/m-main-attention.vue';
import mMain from './components/m-main.vue';
import index from "./components/index.vue";
import my from "./components/my.vue";
import community from "./components/community.vue";
import shopping from "./components/shopping.vue";
import login from "./components/login.vue";
import register from "./components/register.vue";
import find from "./components/find.vue";
import search from './components/search.vue';
import detail from './components/detail.vue';
import productDetail from './components/productDetail.vue';

// 在根组件加入 store，让它的子组件和 store 连接
import store from './vuex/store';

let App = Vue.extend({
    store: store
});

let router = new VueRouter();

router.map({
  '/': {
    component: index,
    subRoutes: {
      '/': {
        component: mMain,
        subRoutes:{
            '/':{
                component:mMainHot,
                subRoutes:{
                    '/':{
                        component:mMainAttention
                    }
                }
            }
        }
      },
      '/my': {
        component: my
      },
      '/community': {
        component: community
      },
      '/shopping': {
        component: shopping
      }
    }
},
 '/login': {
     component: login,
 },
 '/register': {
   component: register
 },
 '/find': {
   component: find
 },
  '/search': {
    component: search,
 },
  '/detail/:id':{
    component: detail,
 },
  '/productDetail/:id': {
    component: productDetail,
  }
});

router.start(App, 'body');
