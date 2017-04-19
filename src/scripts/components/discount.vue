<template>
  <div class="discount_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的优惠券</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <nav>
      <span class="{{cur == index ? 'active':''}}" v-on:click="greet(index)" v-for="(index, item) in navList">{{item}}</span>
    </nav>

    <section id="index-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <nav class="show" v-show="allShow">
            <li  class="discount" v-for="item in discountList">
              <div class="price_container">
                <i>￥<span class="price">{{item.price}}</span></i>
                <span>{{item.notice}}</span>
              </div>
              <div class='info'>
                <div class="discountInfo">
                  <p>{{item.name}}</p>
                  <p>{{item.type}}</p>
                </div>
                <div class="detail">
                  <p>{{item.time}}</p>
                  <p v-show="item.count > 1 ? true : false">{{item.count}}张</p>
                </div>
                <span class="timeOut" v-show='item.timeout'></span>
              </div>
            </li>
            <p>没有更多优惠券了</p>
          </nav>
          <section class="none" v-show="!allShow">
            <img src="/images/order-none.png" />
            <span>您没有优惠券哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <nav class="show" v-show="shopShow">

          </nav>
          <section class="none" v-show="!shopShow">
            <img  src="/images/order-none.png" />
            <span>您没有优惠券哦~</span>
          </section>
        </div>
        <div class="swiper-slide">
          <nav class="show" v-show="platShow" >
            <li  class="discount" v-for="item in discountList">
              <div class="price_container">
                <i>￥<span class="price">{{item.price}}</span></i>
                <span>{{item.notice}}</span>
              </div>
              <div class='info'>
                <div class="discountInfo">
                  <p>{{item.name}}</p>
                  <p>{{item.type}}</p>
                </div>
                <div class="detail">
                  <p>{{item.time}}</p>
                  <p v-show="item.count > 1 ? true : false">{{item.count}}张</p>
                </div>
                <span class="timeOut" v-show='item.timeout'></span>
              </div>
            </li>
            <p>没有更多优惠券了</p>
          </nav>
          <section class="none" v-show="!platShow" >
            <img src="/images/order-none.png" />
            <span>您没有优惠券哦~</span>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  var sw;
  export default {
    data() {
      return {
        cur: 0,
        allShow: true,
        shopShow: false,
        platShow: true,
        navList: ['全部', '店铺券', '平台券'],
        discountList: [
          {
            name: '新人大礼包',
            price: 100,
            notice: '满999元使用',
            type: '全场通用',
            time: '2017.04.11 00:00 - 2017.04.17 23:59',
            timeout: true,
            count: 2
          }, {
            name: '会员大礼包',
            price: 199,
            notice: '满500元使用',
            type: '全场通用',
            time: '2017.04.11 00:00 - 2017.08.17 23:59',
            timeout: false,
            count: 1
          }, {
            name: '会员大礼包',
            price: 100,
            notice: '满199元使用',
            type: '全场通用',
            time: '2017.04.11 00:00 - 2017.08.17 23:59',
            timeout: false,
            count: 3
          }, {
            name: '新人大礼包',
            price: 50,
            notice: '满99元使用',
            type: '全场通用',
            time: '2017.04.11 00:00 - 2017.04.17 23:59',
            timeout: true,
            count: 1
          }
        ]
      }
    },
    methods: {
      greet(index) {
        this.cur = index;
        sw.slideTo(index);
      }
    },
    ready() {
      var _this = this;
      sw = new Swiper('#index-swiper', {
          onSlideChangeStart: function(){
            _this.cur = sw.activeIndex;
          }
      });
    }
  }
</script>
