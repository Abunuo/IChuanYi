<template>
  <div class="car_container">
    <header class="header">
      <i class="back" v-link="{path: '/'}"></i>
      <span class="title">我的购物车</span>
      <span class="edit" v-show="!edit" @click="edit_op">编辑</span>
      <span class="edit finish" v-show="edit" @click="edit_op">完成</span>
    </header>
    <section id="carList_scroll">
      <div class="car_box">
        <ul v-show="carShow">
          <li class="carList" v-for="item in carList">
            <div class="shopInfo">
              <img class='select' v-show="!item.checked" src="/images/circle.png" @click="select(item)"/>
              <img class='select' v-show="item.checked" src="/images/icon-checked.png" @click="select(item)"/>
              <div>
                <img src="/images/shopImg.jpg" />
                <span>{{item.shopName}}</span>
              </div>
            </div>
            <div class="proInfo">
              <img class='select' v-show="!item.checked" src="/images/circle.png" @click="select(item)"/>
              <img class='select' v-show="item.checked" src="/images/icon-checked.png" @click="select(item)"/>
              <div class="pro">
                <img v-bind:src="item.imgsrc" />
                <div>
                  <p v-link='"/productDetail/" + item.name'>{{item.name}}<span>￥{{item.newprice}}</span></p>
                  <p>款式：冰激凌印花  尺码：M <span>￥{{item.oldprice}}</span></p>
                  <div>
                     <span class="sub" @click="sub(item)">-</span>
                     <span class="count">{{item.count}}</span>
                     <span class="add" @click='add(item)'>+</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="subtotal">
              <p>共<span>{{item.tempCount}}</span>件商品</p>
              <p v-show="!edit">总价: <span>￥{{item.tempPriceAll}}</span></p>
            </div>
          </li>
        </ul>
        <div class="car-none" v-show="!carShow" >
          <img src="/images/car-none.jpg" />
        </div>
      </div>
    </section>
    <section class="toolBar" v-show="!edit">
      <span class='unSelectAll' v-show="!selectAllState" @click="selectAll">全选</span>
      <span class='selectAll' v-show="selectAllState" @click="selectAll">全选</span>
      <div class="priceAll">
        <p class="price">总价<span>￥{{priceAll}}</span></p>
        <p class="preferential">不含满减优惠，不含运费</p>
      </div>
      <span class="buy" @click="buy">结算{{checkedCount}}</span>
    </section>
    <section class='toolBar' v-show='edit'>
      <span class='unSelectAll' v-show="!selectAllState" @click="selectAll">全选</span>
      <span class='selectAll' v-show="selectAllState" @click="selectAll">全选</span>
      <span class="deleteAll" @click="delete">删除</span>
    </section>
  </div>
</template>

<script>
  import commonUtil from '../utils/common.util.js';
  import { staChanger } from '../vuex/actions';
  import { getStainedx } from '../vuex/getters';
  let carScroll;
  export default {
    vuex: {
      getters: {
        getStainedx: getStainedx
      }
    },
    data() {
      return {
        user: '',
        selectAllState: false,
        edit: false,
        carData: [],
        carList: [],
        carShow: false,
        priceAll: 0,
        checkedCount: '',
        selectArr: []
      }
    },
    methods: {
      //初始化数据
      init() {
        this.user = this.getStainedx.phone;
        if(!this.user){
          this.$route.router.go('/login');
        } else {
          var carArr = JSON.parse(localStorage.getItem("carList"));
          if(carArr){
            carArr.forEach((item) => {
              if(item.user == this.user){
                if(item.data.length != 0 ) {
                  this.carData = item.data;
                  this.search();
                  this.carShow = true;
                }
              }
            });
          };
        }
      },

      //添加到 localStorage (数据库)
      addLocalStorage() {
        var carArr = JSON.parse(localStorage.getItem("carList"));
        if(carArr){
          carArr.forEach((item) => {
            if(item.user == this.user){
              item.data = this.carData;
            }
          });
        };
        localStorage.setItem("carList", JSON.stringify(carArr));
      },

      //查询购物车数据
      search() {
        let p1 = this.$http.get('/rest/listrefresh'),
            p2 = this.$http.get('/rest/products'),
            p3 = this.$http.get('/rest/listmore'),
            p4 = this.$http.get('/rest/qianggou');
        let products = [];
        Promise.all([p1, p2, p3, p4]).then((responses) => {
          products = responses[0].data.concat(products);
          products = responses[1].data.concat(products);
          products = responses[2].data.concat(products);
          products = responses[3].data.concat(products);
          this.carData.forEach((data) => {
            products.forEach((item) => {
              if(item.name == data.name){
                item.count = data.count;
                item.tempCount = 0;
                item.tempPriceAll = '0.00';
                item.checked = false;
                this.carList.push(item);
              }
            })
          });
          this.refresh();
        });
      },

      //scroll 长度刷新
      refresh() {
        Vue.nextTick(function() {
          commonUtil.isAllLoaded('#carList_scroll', function() {
            carScroll.refresh();
          });
        });
      },

      //编辑模式
      edit_op() {
        this.edit = !this.edit;
        if(!this.edit) {
          this.countPrice();
          this.selectAllState = false;
        }
      },

      //选择
      select(item) {
        item.checked = !item.checked;
        this.count(item);
        this.countPrice();
        if(item.checked) {
          this.selectArr.push(item.name);
        } else {
          this.selectArr.splice(this.selectArr.indexOf(item.name),1);
        };
        if(this.selectArr.length == this.carList.length) {
          this.selectAllState = true;
        } else {
          this.selectAllState = false;
        };
      },

      //全选
      selectAll() {
        this.selectArr = [];
        if(this.selectAllState) {
          this.selectAllState = false;
          this.carList.forEach((item) => {
            item.checked = false;
            this.count(item);
          });
        } else {
          this.selectAllState = true;
          this.carList.forEach((item) => {
            item.checked = true;
            this.selectArr.push(item.name)
            this.count(item);
          });
        };
        this.countPrice();
      },


      //数量增加、数量减少
      sub(item) {
        if(item.count > 1) {
          item.count--;
          if(item.checked){
            this.count(item);
            this.countPrice();
          };
          this.carData.forEach((list, index) => {
            if(item.name == list.name){
              list.count --;
            }
          });
        };
        this.addLocalStorage();
      },
      add(item) {
        if(item.count < 10 ) {
          item.count++;
          if(item.checked){
            this.count(item);
            this.countPrice();
          };
          this.carData.forEach((list, index) => {
            if(item.name == list.name){
              list.count ++;
            }
          });
        };
        this.addLocalStorage();
      },

      //支付
      buy() {
        if(this.priceAll != "0.00") {
          alert("支付成功，共支付" + this.priceAll + '元')
        }
      },

      //删除
      delete() {
        this.selectArr.forEach((item, index) => {
          this.carList.forEach((list, index) => {
            if(item == list.name) {
              this.carList.splice(index, 1);
              this.refresh();
            }
          });
          this.carData.forEach((list, index) => {
            if(item == list.name){
              this.carData.splice(index, 1);
            }
          });
        });
        if(this.carList.length == 0) {
          this.carShow = false;
        }
        this.selectArr = [];
        this.addLocalStorage();
      },

      //计算单个价格
      count(item) {
        if(item.checked) {
          item.tempPriceAll = (item.count * item.newprice).toFixed(2);
          item.tempCount = item.count;
        } else {
          item.tempPriceAll = "0.00";
          item.tempCount = 0;
        };
      },

      //价格全部
      countPrice(){
        var tempPrice = 0,
            tempChecked = 0;
        this.carList.forEach((item) => {
          if(item.checked) {
            tempPrice += item.count * item.newprice;
            tempChecked += item.count;
          }
        });
        this.priceAll = tempPrice.toFixed(2);
        if(tempChecked) {
          this.checkedCount = "(" + tempChecked + ")";
        } else {
          this.checkedCount = '';
        }
      }
    },
    ready() {
      this.init();
      this.priceAll = this.priceAll.toFixed(2);
      carScroll = new IScroll('#carList_scroll', {
          probeType: 3,
          click:true,
          bounce:false,
          mouseWheel: true,
      });
    }
  }
</script>
