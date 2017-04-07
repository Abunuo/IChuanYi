<template>
    <div>
        <!-- <img v-bind:src="productUrl"></p> -->
        <p>{{productName}}</p>
        <p>{{productHead}}</p>
        <p>{{productDetail}}</p>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          productUrl: '',
          productName: '',
          productHead: '',
          productDetail: ''
        }
      },
      ready() {
        var that = this;
        var id = this.$route.params.id;
        this.$http.get('/rest/list')
            .then((res) => {
                let data = res.data.data;
                data.forEach(function(item) {
                  if (item.name.indexOf(id) != -1) {
                      that.productUrl = item.url;
                      that.productName = item.name;
                      that.productHead = item.head;
                      that.productDetail = item.detail;
                  }
                })
            })
      }
    }
</script>
