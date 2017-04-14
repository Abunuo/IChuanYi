
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
                      <li>我的喜欢</li>
                      <li>优惠券</li>
                      <li>推荐奖励</li>
                      <li>签到</li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li>联系卖家</li>
                      <li>消息中心</li>
                  </ul>
              </div>
              <div class="order">
                  <p>我的订单</p>
                  <ul>
                      <li>代付款</li>
                      <li>代发货</li>
                      <li>代收货</li>
                      <li>代评价</li>
                      <li>退款\退货</li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li>常见问题</li>
                      <li>在线问题</li>
                      <li class="kf">
                          客服电话
                        <span>
                            <b>400-060-6989</b>
                            <i>( 周一到周日 09:00-21:00 )</i>
                        </span>
                      </li>
                  </ul>
              </div>
              <div class="others">
                  <ul>
                      <li class="bd" v-show="flag">绑定手机<span>请绑定手机号</span></li>
                      <li class="bd" v-show="!flag">绑定手机<span v-bind:style="{color:'#f4f'}">{{phone}}</span></li>
                      <li>收货地址</li>
                      <li>系统设置</li>
                  </ul>
              </div>
          </div>
      </section>
  </div>
</template>
<script>
    import { tabChanger } from '../vuex/actions';
    import { staChanger } from '../vuex/actions';
    import { getStainedx } from '../vuex/getters';
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
               myScroll: {}
           }
       },
       methods: {
         loginOut() {
           this.flag = true;
           this.staChange(false, '');
         }
       },
     ready: function() {
         this.phone = this.getStainedx.phone;
         if(this.getStainedx.loginState){
             this.flag = false;
         };
         this.change(3);
         this.myScroll = new IScroll('#index-scroll', {
             bounce: false,
             mouseWheel: true,
             click:true
         });
     }
   }





</script>
