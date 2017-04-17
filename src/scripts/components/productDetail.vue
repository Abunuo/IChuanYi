<template>
  <div class="productDetail_container">
    <!-- title -->
    <header class="header">
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">商品详情</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>

    <section id="productDetail-scroll">
      <div class="detail-box">
        <!-- 搭配图例 -->
        <section class="img">
          <img v-bind:src="productUrl" />
          <span class="pagenation">1/1</span>
        </section>

        <!-- 商品信息 -->
        <section class="productDetail">
          <p class="productName">{{productName}}</p>
          <div class="productInfo">
            <div>
              <span class="price">￥{{productPrice}}</span>
              <span class="originalPrice">￥{{productOldPrice}}</span>
              <span class="rate">{{productRate}}折</span>
            </div>
            <span class="productSaleCount">已售{{productSaleCount}}件</span>
          </div>
          <div class="productSale">
            <span>库存{{productCount}}件</span>
            <span>{{productReception}}%好评</span>
            <span>{{productSaleCount}}人喜欢</span>
          </div>
        </section>

        <!-- 店铺栏 -->
        <section class="shopInfo">
          <div>
            <img v-bind:src="shopHead"/>
            <i>{{shopName}}</i>
          </div>
          <span class="attention" v-show="show.attShow" @click="attClick">+ 关注</span>
          <span class="attention" v-show="!show.attShow" @click="attClick">已关注</span>
        </section>

        <!-- 评价 -->
        <section class="reception">
          <div class="title">
            <p>商品评价</p>
            <span>共{{productSaleCount}}评价，好评率{{productReception}}%</span>
          </div>
          <ul class="receptionInfo">
            <li v-for="list in receptions">
              <div class="userInfo">
                <img v-bind:src="list.userHead">
                <span>{{list.name}}</span>
              </div>
              <div class="receptionContent">
                <p class="content">{{list.content}}</p>
                <p class="productInfo">颜色 :{{list.productInfo.color}}   尺码 :{{list.productInfo.size}}</p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </section>

    <!-- foot -->
    <section class="buyBar">
      <div class='options'>
        <span class="contect" @click="contectClick">联系卖家</span>
        <span class="love" v-show='show.loveShow' @click="loveClick">喜欢</span>
        <span class="loveCollect" v-show="!show.loveShow" @click="loveClick">喜欢</span>
      </div>
      <span class="addCar" @click="addCarClick(productName)">加入购物车</span>
      <span class="buy" @click="bug(productName)">立即购买</span>
    </section>

    <!-- notice -->
    <section class="notice" v-show="show.noticeShow">
      <p class="content">
        {{notice}}
      </p>
    </section>
  </div>
</template>

<script>
  import commonUtil from '../utils/common.util.js';
  import { staChanger } from '../vuex/actions';
  import { getStainedx } from '../vuex/getters';
  var detailScroll, time;
  export default {
    vuex: {
      getters: {
        getStainedx: getStainedx
      }
    },
    data() {
      return {
        shopHead: '/images/CgAAGlgHPT4EAAAAAAAAAD8nSgg769.jpg',
        shopName: '糯米家',
        products: [],
        productUrl: '',
        productName: '',
        productPrice: 0,  //商品现价
        productOldPrice: 0, //商品原价
        productSaleCount: 0,   //已售商品数
        productCount: 999,  // 商品总数
        productReception: 98.42,  //商品好评率
        productRate: 0,  // 商品现价/商品原价
        show: {  //页面展示状态
          attShow: true,
          loveShow: true,
          noticeShow: false
        },
        notice: '',
        receptions: [
          {
            userHead: '/images/sh6.jpg',
            name: 'wuli小妹',
            content: '宝贝收到了，包装严实，高端；衣服手感也可以哈哈，好评美美哒。',
            productInfo: {
              color: '冰激凌印花',
              size: 'S'
            }
          },{
            userHead: '/images/sh7.jpg',
            name: 'Monologue',
            content: '物流给力，客服很细心的介绍；衣服很舒服，价钱很合理，好评。',
            productInfo: {
              color: '巧克力雪花',
              size: 'M'
            }
          }
        ]
      }
    },
    methods: {
      //判断是登录
      loginTest(){
        var user = this.getStainedx.phone;
        if(user){
          return true;
        } else {
          this.$route.router.go('/login');
        }
      },

      //添加到 localStorage （数据库）
      addLocalStorage(name) {
        var carArr = JSON.parse(localStorage.getItem("carList")),
            user = this.getStainedx.phone,
            carList = [],
            userFlag = true,
            dataFlag = true;
        if(this.loginTest()) {
          if(carArr){
            carArr.forEach((item) => {
              if(item.user == user){
                item.data.forEach((data) => {
                  if(data.name == name) {
                    data.count ++;
                    dataFlag = false;
                  }
                });
                if(dataFlag) {
                  item.data.unshift({name,count:1});
                }
                userFlag = false;
              }
            });
          } else {
            carArr = [];
          };
          if(userFlag) {
            carArr.push({
              user: user,
              data: [{name,count:1}]
            });
          }
          localStorage.setItem("carList", JSON.stringify(carArr));
          return true;
        }
      },

      //关注
      attClick() {
        if(this.loginTest()){
          this.show.attShow = !this.show.attShow;
        };
      },

      //喜欢收藏
      loveClick() {
        if(this.loginTest()){
          this.show.loveShow = !this.show.loveShow;
        };
      },

      //添加购物车
      addCarClick(name) {
        clearTimeout(time);
        if(this.addLocalStorage(name)){
          this.notice = "成功添加购物车";
          this.show.noticeShow = true;
          time = setTimeout(() => {
            this.show.noticeShow = false;
          },1500);
        }
      },

      //联系客服
      contectClick() {
        clearTimeout(time);
        if(this.loginTest()){
          this.notice = "等待客服小米中~~~";
          this.show.noticeShow = true;
          time = setTimeout(() => {
            this.show.noticeShow = false;
          },3500);
        }
      },

      //立即购买
      bug(name) {
        if(this.addLocalStorage(name)) {
          this.$route.router.go('/car');
        }
      }
    },
    ready() {
      var that = this;
      var id = this.$route.params.id;
      detailScroll = new IScroll('#productDetail-scroll', {
          probeType: 3,
          click:true,
          bounce:false,
          mouseWheel: true,
      });
      let p1 = this.$http.get('/rest/listrefresh'),
          p2 = this.$http.get('/rest/products'),
          p3 = this.$http.get('/rest/listmore'),
          p4 = this.$http.get('/rest/qianggou');
      Promise.all([p1, p2, p3, p4]).then((responses) => {
        that.products = responses[0].data.concat(that.products);
        that.products = responses[1].data.concat(that.products);
        that.products = responses[2].data.concat(that.products);
        that.products = responses[3].data.concat(that.products);
        that.products.forEach((item) => {
          if(item.name == id){
            that.productUrl = item.imgsrc;
            that.productName = item.name;
            that.productPrice = item.newprice;
            that.productOldPrice = item.oldprice;
            that.productSaleCount = item.saleCount ? item.saleCount : 0;
            that.productRate =  (item.newprice/item.oldprice*10).toFixed(1);
            return;
          }
        });
        //刷新 Iscroll 长度
        Vue.nextTick(function() {
          commonUtil.isAllLoaded('#productDetail-scroll', function() {
            detailScroll.refresh();
          });
        });
      });
    }
  }
</script>
