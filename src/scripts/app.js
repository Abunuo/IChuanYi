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
import _search from './components/search.vue';
import detail from './components/detail.vue';
import productDetail from './components/productDetail.vue';
import car from './components/car.vue';
import order from './components/order.vue';
import discount from './components/discount.vue';
import love from './components/love.vue';
import phoneEdit from './components/phoneEdit.vue';
import address from './components/address.vue';
import award from './components/award.vue';
import footMark from './components/footmark.vue';
import questions from './components/questions.vue';
import questionsOnline from './components/questions_online.vue';

// 在根组件加入 store，让它的子组件和 store 连接
import store from './vuex/store';

let App = Vue.extend({
    store: store
});

let router = new VueRouter({
  // hashbang: true, //将路径格式化为#!开头 默认 true
  // history:true  //启用HTML5 history模式，可以使用pushState和replaceState来管理记录  默认 false
});

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
  '/car': {
    component: car,
  },
  '/order': {
    component: order
  },
  '/order/:id': {
    name: 'order',
    component: order
  },
  '/discount': {
    component: discount
  },
  '/love': {
    component: love
  },
  '/phoneEdit': {
    component: phoneEdit
  },
  '/address': {
    component: address
  },
  'award': {
    component: award
  },
  'footmark': {
    component: footMark
  },
  'questions': {
    component: questions
  },
  'questionsOnline': {
    component: questionsOnline
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
   component: _search
  },
  '/search/:type': {
    component: _search,
  },
  '/detail/:id':{
    component: detail,
  },
  '/productDetail/:id': {
    component: productDetail,
  }
});

router.start(App, 'body');
