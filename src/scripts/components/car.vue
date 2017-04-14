<template>
  <div class="car_container">
    <header class="header">
      <i class="back" v-link="{path: '/'}"></i>
      <span class="title">我的购物车</span>
    </header>
    <section id="carList_scroll">
      <div class="car_box">
        <ul v-show="carShow">
          <!-- <li class="carList" v-for="item in carList">

          </li> -->
          123
        </ul>
        <p v-show="!carShow">购物车空空如也~~快去购物吧</p>
      </div>
    </section>
    <section class="toolBar">

    </section>
  </div>
</template>

<script>
  import commonUtil from '../utils/common.util.js';
  import { staChanger } from '../vuex/actions';
  import { getStainedx } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        getStainedx: getStainedx
      }
    },
    data() {
      return {
        carData: [],
        carList: [],
        carShow: false
      }
    },
    methods: {
      init() {
        var carArr = JSON.parse(localStorage.getItem("carList"));
        var user = this.getStainedx.phone;
        if(carArr){
          carArr.forEach((item) => {
            if(item.user == user){
              this.carData = item.data;
              this.search();
              this.carShow = true;
            }
          });
        };
      },
      search() {
        let p1 = this.$http.get('/rest/listrefresh'),
            p2 = this.$http.get('/rest/products'),
            p3 = this.$http.get('/rest/listmore'),
            p4 = this.$http.get('/rest/qianggou'),
            p5 = this.$http.get('/rest/bibei'),
            p6 = this.$http.get('/rest/gouwu');
        let products = [];
        Promise.all([p1, p2, p3, p4, p5, p6]).then((responses) => {
          products = responses[0].data.concat(products);
          products = responses[1].data.concat(products);
          products = responses[2].data.concat(products);
          products = responses[3].data.concat(products);
          products = responses[4].data.concat(products);
          products = responses[5].data.concat(products);
          products.forEach((item) => {
            carData.forEach((data) => {
              if(item.name = data.name){
                carList.push({count:data.count, ...item});
              }
            })
          });
        });
        console.log(carList);
    },
    ready() {
      this.init();
    }
  }
</script>
