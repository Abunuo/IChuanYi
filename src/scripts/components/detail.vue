<template>
  <div class="detail_container">
    <header class="header">
      <i class="back" onclick="window.history.go(-1)"></i>
      <span class="title">搭配详情</span>
    </header>
    <section id="detail-scroll">
      <div class="detail-box">
        <!-- 搭配图例 -->
        <section class="img">
          <img v-bind:src="productUrl" />
        </section>

        <!-- 标签 -->
        <nav class="labels">
          <li class="label" v-for='item in productLabels'>
            {{item}}
          </li>
        </nav>

        <!-- 店铺信息 -->
        <section class="shop">
          <img v-bind:src="productHead"></img>
          <i>{{productName}}</i>
        </section>

      </div>
    </section>
  </div>
</template>

<script>
    import commonUtil from '../utils/common.util.js';
    var detailScroll;
    export default {
      data() {
        return {
          productUrl: '',
          productName: '',
          productHead: '',
          productDetail: '',
          productLabels: []
        }
      },
      ready() {
        var that = this;
        var id = this.$route.params.id;
        detailScroll = new IScroll('#detail-scroll', {
            probeType: 3,
            click:true,
            bounce:false,
            mouseWheel: true,
        });
        this.$http.get('/rest/list')
            .then((res) => {
                let data = res.data.data;
                data.forEach(function(item) {
                  if (item.name.indexOf(id) != -1) {
                      that.productUrl = item.url;
                      that.productName = item.name;
                      that.productHead = item.head;
                      that.productDetail = item.detail;
                      that.productLabels = item.labels;
                      Vue.nextTick(function() {
                          commonUtil.isAllLoaded('#detail-scroll', function() {
                              detailScroll.refresh();
                          });
                      });
                  }
                })
            });
      }
    }
</script>
