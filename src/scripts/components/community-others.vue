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
                title: "高圆圆丸子头时尚搭配！",
                src: "/images/CgAAGljs1bQEAAAAAAAAAG8l_64654.jpg"
            }, {
                type: "block",
                title: "杨幂的风衣是有多拉风，连邓超都想要同款",
                src: "/images/CgAAKljww5kEAAAAAAAAAGt9rYg499.jpg"
            }, {
                type: "list",
                title: "潮流搭配 | 不一样的风格，不一样的搭配",
                src: "/images/sh6.jpg"
            }, {
                type: "list",
                title: "潮流单件 | 走在潮流前线，感受不一样的气息",
                src: "/images/sh2.jpg"
            }, {
                type: "list",
                title: "潮流单件 | 时尚女王",
                src: "/images/sh4.jpg"
            }, {
                type: "list",
                title: "潮流单件 | 走在潮流前线，感受不一样的气息",
                src: "/images/sh3.jpg"
            }, {
                type: "list",
                title: "家居 VS 搭配 | 最完美的搭配",
                src: "/images/sh1.jpg"
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
