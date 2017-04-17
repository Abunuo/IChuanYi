<template>
  <div class="container">
      <swiper></swiper>
      <template v-for="content in lists">
        <block v-if="content.type=='block'"  :info="content"></block>
        <list v-if="content.type=='list'"  :info="content"></list>
      </template>
  </div>
</template>
<script>
import swiper from './swiper.vue';
import list from './list.vue';
import block from './block.vue';
module.exports = ({
    data() {
        return {
            lists: [, {
                type: "list",
                title: "最新推荐 | 时尚女王范",
                src: "/images/sh13.jpg"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/sh20.jpg"
            }, {
                type: "block",
                title: "【i搭配31期】高圆圆潮流搭配！",
                src: "/images/CgAAGlgHYCEEAAAAAAAAAGajc3w567.jpg"
            }, {
                type: "block",
                title: "【i搭配32期】街拍女王，我的潮流我做主！",
                src: "/images/CgAAGlgIiR8EAAAAAAAAAEAaoSs393.jpg",
            }]
        }
    },
    components: {
        swiper,
        list,
        block
    }
})
</script>
<style>

</style>
