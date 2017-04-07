<template>
    <div class="m-container">
        <header class="header">
            <span class="search" v-link="{path: '/search'}"></span>
            <nav>
                <a class="hot {{cur == 0 ? 'active':''}}" v-on:click="greet(0)">热点</a>
                <a class="attention {{cur == 1 ? 'active':''}}" v-on:click="greet(1)">关注</a>
            </nav>
            <span class="car"></span>
        </header>
        <div class="swiper-container content htmleaf-container" id="index-swiper">
          <div class="swiper-wrapper ">
              <router-view></router-view>
          </div>
        </div>
    </div>
</template>

<script>
import { tabChanger } from '../vuex/actions';

    var sw1 = {};

    export default {
        vuex: {
          actions: {
            change: tabChanger
          }
        },
        data(){
            return{
                cur:0
            }
        },
        ready() {
            this.change(0);
            var _this = this;
            setTimeout(function(){
                sw1 = new Swiper('#index-swiper', {
                    paginationClickable: true,
                    spaceBetween: 0,
                    click:true,
                    onSlideChangeStart: function(){
                      _this.cur = sw1.activeIndex;
                    }
                });
            }, 500);
        },
        methods:{
            greet(index){
                this.cur = index;
                sw1.slideTo(index);
            }
        }
    };

</script>
<style
