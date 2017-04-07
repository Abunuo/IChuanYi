<template>
    <div class="find-container">
        <header>
            <i class="back" onclick="window.history.go(-1)"></i>
            <span>找回密码</span>
        </header>
        <section id="main">
            <div class="phone">
                <span></span>
                <input type="text" name="name" value="" placeholder="手机号">
            </div>
            <div class="code">
                <span></span>
                <input type="text" name="name" value="" placeholder="验证码">
                <i>获取验证码</i>
            </div>
            <div class="password">
                <span></span>
                <input type="text" name="name" value="" placeholder="新密码">
            </div>
            <button class="reset" type="button" name="button">重置密码</button>
        </section>
    </div>
</template>
