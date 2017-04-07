<template>
  <div class="container">
    <template v-for="content in lists">
        <block v-if="content.type=='block'"  :info="content"></block>
        <list v-if="content.type=='list'"  :info="content"></list>
    </template>
  </div>
</template>
<script>
import list from './list.vue';
import block from './block.vue';
module.exports = ({
    data() {
        return {
            lists: [{
                type: "block",
                title: "【i搭配31期】时尚搭配精心推荐！",
                src: "/images/block.png"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
            }, {
                type: "list",
                title: "搭配小助手 | 张雨绮同款上衣推荐",
                src: "/images/list.png"
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
                src: "/images/block.png"
            }]
        }
    },
    components: {

        list,
        block
    }
})
</script>
<style>

</style>
