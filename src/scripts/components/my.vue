
<template>
  <div class="my-container">
      <header>
          <span>我的主页</span>
      </header>
      <section id="index-scroll">
          <div id="scroll-box">
              <div class="user">
                  <img src="/images/agent_pay_share_icon.png" />
                  <ul>
                      <li v-show="flag">匿名用户<span class="login" v-link="{ path: '/login' }">登录/注册</span></li>
                      <li v-show="!flag">{{phone}}<span class="login" v-on:click="loginOut">注销</span></li>
                      <li><i>关注<span>0</span></i><b>粉丝<span>0</span></b></li>
                  </ul>
              </div>
              <div class="tabs">
                  <ul>
                      <li v-link="{path: '/love'}">我的喜欢</li>
                      <li v-link="{path: '/discount'}">优惠券</li>
                      <li v-link="{path: '/award'}">推荐奖励</li>
                      <li @click="signIn">签到</li>
                  </ul>
              </div>
              <div class="order">
                  <p v-link="{path: '/order'}">我的订单</p>
                  <ul>
                      <li v-link="{ name: 'order', params: { id: 1}}">代付款</li>
                      <li v-link="{ name: 'order', params: { id: 2}}">代发货</li>
                      <li v-link="{ name: 'order', params: { id: 3}}">代收货</li>
                      <li v-link="{ name: 'order', params: { id: 4}}">代评价</li>
                      <li v-link="{ name: 'order', params: { id: 0}}">退款\退货</li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li v-link="{path: '/footmark'}">我的足迹</li>
                      <li v-link="{path: '/love'}">我的收藏</li>
                      <li v-link="{path: '/discount'}">我的卡包</li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li class="bd" v-show="flag">绑定手机<span>请绑定手机号</span></li>
                      <li class="bd" v-show="!flag" v-link="{ path: '/phoneEdit'}">绑定手机<span v-bind:style="{color:'#f4f'}">{{phone}}</span></li>
                      <li v-link='{path: "/address"}'>编辑收货地址</li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li class="kf">
                          客服电话
                        <span>
                            <b>400-060-6989</b>
                            <i>( 周一到周日 09:00-21:00 )</i>
                        </span>
                      </li>
                      <li v-link="{path: '/questions'}">常见问题</li>
                      <li v-link="{path: '/questionsOnline'}">在线问题</li>
                  </ul>
              </div>
              <p class="notice" v-show="noticeShow" >签到成功</p>
          </div>
      </section>
  </div>
</template>
<script>
    import { tabChanger } from '../vuex/actions';
    import { staChanger } from '../vuex/actions';
    import { getStainedx } from '../vuex/getters';
    var time;
    export default {
       vuex: {
         actions: {
           change: tabChanger,
           staChange: staChanger,
         },
         getters: {
             getStainedx: getStainedx
         }
       },
       data(){
           return{
               phone : '',
               flag : true,
               myScroll: {},
               noticeShow: false
           }
       },
       methods: {
         loginOut() {
           this.flag = true;
           this.staChange(false, '');
         },
         signIn() {
           var that = this
           clearTimeout(time);
           this.noticeShow = true;
           time = setTimeout(function() {
             that.noticeShow = false;
             $(".notice").html("已签到");
           },1500);
         }
       },
       ready: function() {
           this.phone = this.getStainedx.phone;
           if(this.getStainedx.loginState){
               this.flag = false;
           };
           this.change(3);
           this.myScroll = new IScroll('#index-scroll', {
               probeType: 3,
               bounce: false,
               mouseWheel: true,
               click:true
           });
       }
   }





</script>
