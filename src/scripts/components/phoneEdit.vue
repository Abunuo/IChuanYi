<template>
  <section class="award_container">
    <header>
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">我的主页</span>
      <span class="car" v-link="{path: '/car'}"></span>
    </header>
    <section class='content'  v-show="!edit">
      <div class="confirm">
        <img src="/images/phone.jpg"/>
        <p class="phone">已绑定手机号：{{phone}}</p>
        <p class="notice">绑定手机号之后，可使用手机号登录，还方便查找订单。</p>
        <p class="edit_c" @click="changeEdit">更换手机号</p>
      </div>
    </section>
    <section class="edit" v-show="edit">
      <div>
        <p v-show="show" class="ts">
            手机号不能为空
        </p>
        <div class="phone">
            <span></span>
            <input type="text" id="phone" v-model="phoneNew" name="name" value="" placeholder="手机号">
        </div>
        <div class="code">
            <span></span>
            <input type="text"  name="name" value="" placeholder="验证码">
            <i>获取验证码</i>
        </div>
        <p class="submit" type="button" v-on:click="confirm" name="button">绑定</p>
      </div>
    </section>
  </section>
</template>

<script>
  import { getStainedx } from '../vuex/getters';
  export default {
    vuex: {
      getters: {
        getStainedx: getStainedx
      }
    },
    data() {
      return {
        phone: '',
        phoneNew: '',
        edit: false
      }
    },
    methods: {
      changeEdit() {
        this.edit = true;
      },
      confirm() {
        let flag = false, flag1 = false;
        var userArr = JSON.parse(localStorage.getItem("user"));
        var carList = JSON.parse(localStorage.getItem("carList"));
        userArr.forEach((item) => {
          if(item.phone == this.phone) {
            item.phone = this.phoneNew;
            flag = true;
            return;
          }
        });
        carList.forEach((item) => {
          if(item.user == this.phone) {
            item.user = this.phoneNew;
            flag1 = true;
            return;
          }
        });
        if(flag && flag1){
          localStorage.setItem("user", JSON.stringify(userArr));
          localStorage.setItem("carList", JSON.stringify(carList));
          this.$route.router.go('/login');
        }
      }
    },
    ready() {
      this.phone = this.getStainedx.phone;
    }
  }
</script>
