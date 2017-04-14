<template>
    <div class="login-container">
        <header>
            <i class="back" onclick="window.history.go(-1)"></i>
            <span>登录</span>
        </header>
        <section id="main">
            <p v-show="show" class="ts" transition="bounce">
                用户名不能为空
            </p>
            <div class="user">
                <span></span>
                <input type="text" id="user_name" name="name" v-model="user_name" value="" placeholder="手机号/用户名/邮箱">
            </div>
            <div class="password">
                <span></span>
                <input type="password" id="password" name="name" v-model="password" value="" placeholder="密码">
                <i v-link="{ path: '/find' }">忘记密码？</i>
            </div>
            <button class="login" type="button" name="button" v-on:click="logining">登录</button>
            <button class="register" type="button" name="button" v-link="{ path: '/register' }">新用户注册</button>
        </section>
        <section id="share">
            <div class="border"></div>
            <p>使用以下方式直接登录</p>
            <div class="others">
                <i class="sina"></i>
                <i class="qq"></i>
                <i class="wechat"></i>
            </div>
        </section>
    </div>

</template>

<script>
import { staChanger } from '../vuex/actions';
import { getStainedx } from '../vuex/getters';
 export default {
     vuex: {
       actions: {
         change: staChanger
       },
       getters: {
         getStainedx: getStainedx
       }
     },
     data(){
         return{
             show: false,
             flag: true,
             photo: '',
             user_name: '',
             password: '',
             userlist: []
         }
     },
     methods: {
         logining(){
             var site = localStorage.getItem("user");
             var userArr = JSON.parse(site);
             var findflag=false;

             if(this.user_name == ""){
                 this.judge();
             }else if(!(/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/).test(this.user_name)){
                 $(".ts").html("用户名有误，请重填");
                 this.judge();
             }else if(this.password==""){
                 $(".ts").html("密码不能为空");
                 this.judge();
             }else if (userArr) {
                 for (var i = 0; i < userArr.length; i++) {
                     //console.log(userArr.length);
                    //  console.log(!(userArr[i].phone == this.user_name));
                     if (userArr[i].phone == this.user_name && userArr[i].password == this.password) {
                         findflag=true;
                         break;
                     } else if(userArr[i].phone == this.user_name && userArr[i].password != this.password){
                         $(".ts").html("密码输入错误");
                         this.judge();
                         break;
                     }
                     if (findflag==false && i==userArr.length-1) {
                         $(".ts").html("该手机号还没有被注册过");
                         this.judge();
                     }
                 }
             } else {
                 $(".ts").html("该手机号还没有被注册过");
                 this.judge();
             };

            //  console.log(this.flag);
             if (this.flag) {
                 var that = this;
                 setTimeout(function() {
                    //  that.$route.router.go({
                    //      path: "/my"
                    //  });
                    window.history.go(-1);
                 }, 2000);
                  $(".ts").html("登录成功！");
                  this.judge();
                  this.change(true,this.user_name);
             }
         },
         judge(){
             var that = this;
             this.show = true;
             this.flag = false;
             setTimeout(function(){
                 that.show = false;
             },2000);
         }
     },
     ready: function() {
         this.user_name = this.getStainedx.phone;
     }
 }


</script>
