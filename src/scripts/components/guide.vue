<template>
    <div class="m-guide">
        <div class="swiper-container" id="index-swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="img in imgList">
                    <img v-if="$index-slide" v-link="{path: '/index'}" :src="img" />
                    <img v-else:src="img" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                imglist: [
                    "/images/slide1.png",
                    "/images/slide1.png",
                    "/images/slide1.png",
                    "/images/slide1.png",
                ]
            }
        },
        ready () {
            new Swiper('#guide-swiper')
        }
    }

</script>
