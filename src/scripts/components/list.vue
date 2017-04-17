<template>
  <div class="list-container">
      <img :src='info.src'}} />
      <p>{{info.title}}</p>
  </div>
</template>

<script>
module.exports = {
    props: ['info']
}
</script>

<style lang=sass>
.list-container {
    width: 100%;
    margin-top: .05rem;
    padding: .09rem;
    background: white;
    img {
        width: 23%;
    }
    p {
        width:70%;
        vertical-align: middle;
        margin-left: .1rem;
        display: inline-block;
    }
}
</style>
