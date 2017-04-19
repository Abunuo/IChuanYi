<template>
  <section class="order_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的订单</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>

    <nav>
      <span class="{{cur == index ? 'active':''}}" v-on:click="greet(index)" v-for="(index, item) in navList">{{item}}</span>
    </nav>

    <section id="index-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <section class="show" v-show="allShow">

          </section>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>暂无订单哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <section class="show" v-show="allShow">

          </section>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>暂无订单哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <section class="show" v-show="allShow">

          </section>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>暂无订单哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <section class="show" v-show="allShow">

          </section>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>暂无订单哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <section class="show" v-show="allShow">

          </section>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>暂无订单哦~</span>
          </section>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  var sw;
  export default {
    data() {
      return {
        navList: ['全部', '待付款', '待发货', '待收货', '待评价'],
        cur: 0,
        allShow: false
      }
    },
    methods:{
      greet(index){
          this.cur = index;
          sw.slideTo(index);
      },
    },
    ready() {
      if(this.$route.params.id) {
        this.cur = this.$route.params.id
      }
      var _this = this;
      sw = new Swiper('#index-swiper', {
          onSlideChangeStart: function(){
            _this.cur = sw.activeIndex;
          }
      });
    }
  }
</script>
