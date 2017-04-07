<template>
    <div class="community-container">
        <header>
            <span>社区</span>
        </header>
        <nav class="nav">
            <ul id="swiper-nav">
                <template v-for="nav in navList">
                    <li  v-on:click="switchSwiper($index)"  v-bind:class="curIndex == $index ? 'active': ''"><span>{{nav}}</span></li>
                </template>
            </ul>
        </nav>
        <section class="com-container">
            <div class="swiper-container" id="index-swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <section id="index-scroll" class="index-scroll">
                            <Hot></Hot>
                        </section>
                    </div>
                    <div class="swiper-slide">
                        <section class="index-scroll">
                            <others></others>
                        </section>
                    </div>
                    <div class="swiper-slide">
                        <section class="index-scroll">
                            <others></others>
                        </section>
                    </div>
                    <div class="swiper-slide">
                        <section class="index-scroll">
                            <others></others>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import { tabChanger } from '../vuex/actions';
var mySwiper;
import commonUtil from '../utils/common.util.js';
import Hot from './Hot.vue';
import others from './community-others.vue';
module.exports = ({
    vuex: {
      actions: {
        change: tabChanger
      }
    },
    data: function() {
        return {
            curIndex: 0,
            navList: ['热门', '搭配师', '穿衣茶话会', '潮流穿搭志']
        }
    },
    ready: function() {
        this.change(2);
        var that = this;
        Vue.nextTick(function() {
                commonUtil.isAllLoaded('#index-scroll', function() {
                    var rolls=document.querySelectorAll('.index-scroll');
                    for (var i = 0; i < rolls.length; i++) {
                        // console.log(rolls);
                        new IScroll(rolls[i], {
                            probeType: 3,
                            mouseWheel: true,
                            click: true
                        })
                    }
                });
            mySwiper = new Swiper("#index-swiper", {
                onSlideChangeStart: function() {
                    that.curIndex = mySwiper.activeIndex;
                    // console.log(that.curIndex);
                }
            });
        })
    },
    components: {
        Hot,
        others
    },
    methods: {
        switchSwiper(index) {
            this.curIndex = index;
            mySwiper.slideTo(index);
        }
    }
})
</script>
<style scoped lang='sass'>
@import "../../styles/usage/core/reset.scss";
.community-container{
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: #eee;
    .com-container {
        height: 100%;
    }
    .swiper-container {
        height: 100%;
    }
    #index-scroll {
        height: 100%;
    }
    .nav {
        width: 100%;
    }
    #swiper-nav .active {
        color: #8a5899;
        border-bottom: 0.02rem solid #8a5899;
    }
    #swiper-nav {
        width: 100%;
        background: #fff;
        font-size:14px;
        @include flexbox();
        @include flex-direction(row);
        @include align-items(center);
        @include justify-content(space-around);
        li {
            height: 0.44rem;
            line-height: 0.44rem;
            box-sizing: border-box;
        }
        span {
            padding: 0 0.1rem;
        }
    }
    .nav {
        height: 44px;
    }
}
.community-container header{
    background: #fff;
    height: .44rem;
    @include border(0 0 1px 0,#ddd,solid);
}
.community-container header span{
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: .44rem;
    font-size: .18rem;
}

</style>
