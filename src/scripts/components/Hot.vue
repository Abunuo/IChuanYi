<template>
  <div class="container">
      <swiper>
      </swiper>
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
            lists: [{
                type: "block",
                title: "【i搭配31期】时尚搭配精心推荐！",
                src: "/images/CgAAGlgIWnEEAAAAAAAAALN9cvY289.jpg"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
            }, {
                type: "block",
                title: "【i搭配32期】时尚搭配精心推荐！",
                src: "/images/CgAAGlgIdvcEAAAAAAAAAECL7XE874.png",
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
