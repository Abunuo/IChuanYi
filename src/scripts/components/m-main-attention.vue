<template>
    <div class="m-main-attentive">
        <section v-if="isLoad" class="main-notice">
            <p class="notice">
                好凄凉o(╯□╰)o姑娘，看到你感兴趣的人就关注吧~你可以点击下面的按钮去寻找你感兴趣的人
            </p>
            <button class="toGo">
                寻找感兴趣的人
            </button>
        </section>
        <section v-else="isLoad" class="main">

        </section>
    </div>
</template>

<script>
    export default {
        data()　{
            return {
                isLoad:true
            }
        }
    }
</script>
