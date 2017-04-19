<template>
  <div class="discount_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的足迹</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <section class="none" v-show="!allShow" v-bind:style="{height: '100%', background: '#f5f5f5'}">
      <img src="/images/order-none.png" />
      <span>没发现您的足迹哦，快去逛逛吧~</span>
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
