<template>
  <div class="love_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的喜欢</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <section class="content">
      <div class="love" v-show="loveShow">

      </div>
      <div class="noLove" v-show="!loveShow">
        <img src="/images/love_empty.png"/>
      </div>
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
