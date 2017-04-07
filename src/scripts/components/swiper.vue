<template>
<div class="swiper-container" id="banner">
    <div class="swiper-wrapper">
        <div v-for="path in imgs" class="swiper-slide"><img v-bind:src="path"/></div>
    </div>
    <div class="swiper-pagination"></div>
</div>
</template>
<script>
module.exports = ({
    data() {
        return {
            imgs: ['https://image1.ichuanyi.cn/group1/M00/74/F0/CgAANFdOin0EAAAAAAAAAPSQLPY578.png?imageView2/1/w/640/h/325/q/60',
                'https://image1.ichuanyi.cn/group3/M00/45/A3/CgAAGlgIdvcEAAAAAAAAAECL7XE874.png'
            ]
        }
    },
    ready: function() {
        // setTimeout(function() {
        //     new IScroll('#index-scroll');
        // }, 500);

        var banerSwiper = new Swiper("#banner", {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onSlideChangeStart: function() {

            }
        });
    },
    methods: {}
})
</script>
<style lang="sass">
.swiper-wrapper {
    img {
        width: 100%;

    }

}
.swiper-pagination-bullet-active {
    background:#8a5899!important;
}
</style>
