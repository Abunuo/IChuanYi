<template>
  <div class="discount_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">在线问题</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <section class="none" v-show="!allShow" v-bind:style="{height: '100%', background: '#f5f5f5'}">
      <img src="/images/order-none.png" />
      <span>客服旷工了，明天再来吧~</span>
    </section>
</template>

<script>
  export default {
    data() {
      return {
        loveShow: false
      }
    },
    methods: {

    },
    ready() {

    }
  }
</script>
