<template>
  <div>
    <div class="index-container">
        <router-view :transition="transitionName" transition-mode="out-in"></router-view>
    </div>
    <footer id="footer">
        <ul>
            <li v-for="tab in tablist" v-link="{path: tab.path}" v-bind:class="tabIndex == $index ? 'active' : ''">
                <i class="iconfont"><img v-bind:src="tab.iconPath"/></i>
                <em class="iconfont"><img v-bind:src="tab.selectedIconPath"/></em>
                <b v-html="tab.name"></b>
            </li>
        </ul>
    </footer>
  </div>
</template>

<script>
    import { tabChanger } from '../vuex/actions';
    import { getTabindex } from '../vuex/getters';
    export default {
        vuex: {
          actions: {
            change: tabChanger
          },
          getters: {
            tabIndex: getTabindex
          }
        },
        data() {
          return {
            cur: 0,
            tablist: [
              {path: '/', iconPath: '/images/tabitem0.png', selectedIconPath: "/images/tabitem_0.png", name: '首页'},
              {path: '/shopping', iconPath: '/images/tabitem1.png', selectedIconPath: "/images/tabitem_1.png", name: '购物'},
              {path: '/community', iconPath: '/images/tabitem3.png', selectedIconPath: "/images/tabitem_3.png", name: '社区'},
              {path: '/my', iconPath: '/images/tabitem4.png', selectedIconPath: "/images/tabitem_4.png",name: '我的'}
              ],
              transitionName: 'fade'
          }
      },
      
}
</script>
