<template>
    <div class="swiper-slide">
        <section id="index-scroll">
            <div class="htmleaf-content bgcolor-3">
                <!-- 下拉刷新 -->
                <div class="reLoad">
                    <img src="/images/reLoad.jpg"/>
                    <p class="reloadNotice">下拉刷新 . . .</p>
                </div>
                <!-- banner -->
                <div class="swiper-container" id="banner-swiper" v-link="{path: '/search'}">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="item in bannerList">
                            <img v-bind:src="item"/>
                        </div>
                    </div>
                    <!-- Add Pagination -->
                    <div class="swiper-pagination"></div>
                </div>

                <!-- nav -->
                <nav class="typeList" >
                    <div v-for="item in typeList">
                        <img v-bind:src="item.url"/>
                        <p>{{item.name}}</p>
                    </div>
                </nav>

                <!-- fashion -->
                <section class="fashion">
                    <div class="fashion-title"></div>
                    <img v-bind:src = "item" v-for="item in fashionList" v-link="{path: '/search'}"/>
                    <div class="fashion-footer"></div>
                    <div class="fashion-more">
                        <img v-bind:src = "item" v-for="item in fashionMore" v-link="{path: '/search'}"/>
                    </div>
                </section>

                <!-- perfect -->
                <section class="prefect">
                    <div class="prefect-title"></div>
                    <div class="swiper-container" id="prefect-swiper">
                        <div class="swiper-wrapper" style="width:100%;height:100%;">
                            <div class="swiper-slide" v-for="item in prefectList">
                                <img v-bind:src="item" v-link="{path: '/search'}"/>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- show -->
                <section class="show">
                    <div id="picList-title"></div>
                    <div id="div1"></div>
                </section>

            </div>
            <!--  回到顶部 -->
            <section class="goTop" v-on:click="goTop"></section>
        </section>
    </div>
    <div class="swiper-slide">
        <router-view></router-view>
    </div>
</template>

<script>
    import waterfallUtil from '../utils/waterfall.util.js';
    var lifeScroll, sw2, sw3, sw4, head, reLoad, reloadNotice, goTop, topImgHasClass;
    export default {
        data(){
            return {
                bannerList:[
                    '/images/CgAAGlgHR1sEAAAAAAAAAGlaEZk043.jpg',
                    '/images/CgAAGlgHYCEEAAAAAAAAAGajc3w567.jpg',
                    '/images/CgAAGlgIiR8EAAAAAAAAAEAaoSs393.jpg',
                    '/images/CgAAGlgIdvcEAAAAAAAAAECL7XE874.png',
                    '/images/CgAAGlgIWnEEAAAAAAAAALN9cvY289.jpg',
                    '/images/CgAAGlgIO0YEAAAAAAAAANFqid0320.jpg'
                ],
                typeList:[
                    {url:'/images/CgAANVey4hEEAAAAAAAAAOEZ5Ek631.png',name:"明天穿什么"},
                    {url:'/images/CgAANVey4kgEAAAAAAAAAKevqgo279.png',name:"搭配测试"},
                    {url:'/images/CgAAGley4foEAAAAAAAAAA5aZsk592.png',name:"穿搭手册"},
                    {url:'/images/girl.png',name:"搭配师小丫"}
                ],
                fashionList:[
                    '/images/CgAANVgI378EAAAAAAAAAJK_FcY577.jpg',
                    '/images/CgAANFdOin0EAAAAAAAAAPSQLPY578.png'
                ],
                fashionMore:[
                    '/images/CgAANVexe84EAAAAAAAAAGZrILU643.png',
                    '/images/CgAAGlexe5oEAAAAAAAAAFdbfeE313.png',
                    '/images/CgAAGlexe9MEAAAAAAAAAOPFhf8834.png'
                ],
                prefectList:[
                    '/images/CgAAGlf_cdcEAAAAAAAAAJgGu1A995.jpg',
                    '/images/CgAAGlgAkPsEAAAAAAAAAJKVJf8191.jpg',
                    '/images/CgAAGlgAsYAEAAAAAAAAAIWPsMc052.jpg',
                    '/images/CgAAGlgEr1sEAAAAAAAAAMlYFCg610.jpg',
                    '/images/CgAAGlgEtwQEAAAAAAAAACf1zQw967.jpg',
                    '/images/CgAAGlgEvDMEAAAAAAAAABiSUP8136.jpg',
                    '/images/CgAAGlgF-K0EAAAAAAAAAHqQWJo168.jpg',
                    '/images/CgAAGlgFl8AEAAAAAAAAALw0Mq8047.jpg',
                    '/images/CgAAGlgG3PkEAAAAAAAAAEnZZyc026.jpg',
                    '/images/CgAAGlgGAngEAAAAAAAAAMQ2KVs886.jpg',
                    '/images/CgAAGlgILBUEAAAAAAAAAAHDBR0868.jpg',
                    '/images/CgAAGlgJkKcEAAAAAAAAAO9VlJw581.jpg',
                    'images/CgAANVgApyUEAAAAAAAAANxLVoc445.jpg',
                    'images/CgAANVgEPTYEAAAAAAAAAK5hQ9A018.jpg',
                    'images/CgAANVgEy3cEAAAAAAAAAMbwthE484.jpg'
                ]
            }
        },
        methods: {
          goTop() {
            goTop = $('.goTop');
            lifeScroll.scrollTo(0, -100);
            goTop.css('display', 'none');
          }
        },
        ready(){
            head = $('.reLoad img');
            reLoad = $('.reLoad');
            reloadNotice = $('.reLoad .reloadNotice');
            goTop = $('.goTop');
            topImgHasClass = head.hasClass('up');

            sw2 = new Swiper('#banner-swiper', {
                loop:true,
                speed:1000,
                autoplay:2000,
                paginationClickable : true,
                pagination : '.swiper-pagination',
                spaceBetween: 0
            });
            sw3 = new Swiper('#info-swiper', {
                spaceBetween: 0
            });
            sw4 = new Swiper('#prefect-swiper', {
                slidesPerView: 3,
                spaceBetween: 10
            });
            lifeScroll = new IScroll('#index-scroll', {
                probeType: 3,
                click:true,
                bounce:false,
                mouseWheel: true,
            });
            waterfallUtil(lifeScroll);
            lifeScroll.scrollTo(0, -100);
            lifeScroll.on('scroll', function() {
                var y = this.y;
                if (y > -100) {
                    !topImgHasClass && head.addClass('up');
                    reloadNotice.html("松开即可刷新 . . .");
                    return '';
                };
                if (y < -1000) {
                  goTop.css('display', 'block');
                  return '';
                } else {
                  goTop.css('display', 'none');
                  return '';
                }
            });
            lifeScroll.on('scrollEnd', function() {
                if (this.y > -100 && this.y < 0) {
                    lifeScroll.scrollTo(0, -100);
                    head.removeClass('up');
                } else if (this.y >= 0) {
                    clearTimeout(clear);
                          head.removeClass('up');
                          reloadNotice.html("正在奋力加载中 . . .");
                          var clear = setTimeout(function(){
                              lifeScroll.scrollTo(0, -100);
                              reloadNotice.html("下拉刷新 . . .");
                          },1500)
                }else{
                    reloadNotice.html("下拉刷新 . . .");
                }
            });
        }
 }
</script>
