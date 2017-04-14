<template>
    <div class="register-container">
        <header>
            <i class="back" onclick="window.history.go(-1)"></i>
            <span>注册</span>
        </header>
        <section id="main">
            <p v-show="show" class="ts" transition="bounce">
                手机号不能为空
            </p>
            <div class="phone">
                <span></span>
                <input type="text" id="phone" v-model="phone" name="name" value="" placeholder="手机号">
            </div>
            <div class="password">
                <span></span>
                <input type="password" id="password" v-model="password" name="name" value="" placeholder="密码">
            </div>
            <div class="code">
                <span></span>
                <input type="text"  name="name" value="" placeholder="验证码">
                <i>获取验证码</i>
            </div>
            <i class="yxtk">隐私条款>></i>
            <button class="submit" type="button" v-on:click="save" name="button">注册</button>
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
export default {
    vuex: {
      actions: {
        change: staChanger
      }
  },
    data(){
        return{
            show: false,
            flag: true,
            phone: '',
            password: '',
            userlist: []
        }
    },
    methods: {
        save(){
            var site = localStorage.getItem("user");
            var userArr = JSON.parse(site);
            if (userArr) {
                for (var i = 0; i < userArr.length; i++) {
                    // console.log(userArr[i].phone==this.phone);
                    if (userArr[i].phone == this.phone) {
                        $(".ts").html("该手机号已经注册过啦");
                        this.judge();
                    }
                }
            }else {
                userArr = [];
            }

            if(this.phone == ""){
                this.judge();
            }else{
                if(!(/^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/).test(this.phone)){
                    $(".ts").html("手机号码有误，请重填");
                    this.judge();
                    return false;
                }else {
                    if(password==""){
                        $(".ts").html("密码不能为空");
                        this.judge();
                    }
                }
            }
            if (this.flag) {
                userArr.push({
                    "phone": this.phone,
                    "password": this.password
                });
                console.log(userArr);
                var userStorage = JSON.stringify(userArr);
                localStorage.setItem("user", userStorage);
                var that = this;
                setTimeout(function() {
                    that.$route.router.go({
                        path: "/my"
                    });
                }, 2000);
                $(".ts").html("注册成功，正在为您自动登录 ^_^");
                this.judge();
                this.change(true,this.phone);
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
    }
}

</script>
