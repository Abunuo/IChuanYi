<template>
<div class="block-container">
    <img :src="info.src" />
    <p class="detail">
        {{info.title}}
    </p>
</div>
</template>
<script>
module.exports = {
    props: ['info']
}
</script>
<style lang=sass>
.block-container {
    width: 100%;
    margin-top: .05rem;
    background: white;
    img {
        width: 100%;
    }
    p {
        text-align: center;
        padding:10px 0;

    }
}
</style>
