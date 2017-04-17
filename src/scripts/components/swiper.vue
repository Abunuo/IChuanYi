<template>
<div class="swiper-container" id="banner">
    <div class="swiper-wrapper">
        <div v-for="path in imgs" class="swiper-slide"><img v-bind:src="path" v-link="{path: '/search'}"/></div>
    </div>
    <div class="swiper-pagination"></div>
</div>
</template>
<script>
module.exports = ({
    data() {
        return {
            imgs: [
              '/images/CgAAGlgIdvcEAAAAAAAAAECL7XE874.png',
              '/images/CgAAGlgIWnEEAAAAAAAAALN9cvY289.jpg',
              '/images/CgAAGlgIO0YEAAAAAAAAANFqid0320.jpg'
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
            autoplay: 2000,
            loop: true,
            speed:1000,
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
