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
          <div>
            <img v-bind:src="productHead"></img>
            <i>{{productName}}</i>
          </div>
          <span class="attention" v-show="show.attShow" @click="attClick">+ 关注</span>
          <span class="attention" v-show="!show.attShow" @click="attClick">已关注</span>
        </section>

        <!-- 店铺推荐 -->
        <section class="recommend">
          <p class="introduce">
            “{{productDetail}}”
          </p>
          <ul class="recommendList">
            <li class='recommend' v-for='item in recommendList' v-link='"/productDetail/" + item.name'>
              <div class='imgbox'>
                <img v-bind:src='item.imgsrc' />
              </div>
              <h4>{{item.name}}</h4>
              <span>￥{{item.price}}</span>
            </li>
          </ul>
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
          productLabels: [],
          recommendList: [],
          show: {
            attShow: true,
          }
        }
      },
      methods: {
        attClick() {
          this.show.attShow = !this.show.attShow;
        },
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

        let p1 = this.$http.get('/rest/list'),
            p2 = this.$http.get('/rest/products');
        Promise.all([p1, p2]).then((responses) => {
          responses[0].data.data.forEach(function(item) {
            if (item.name.indexOf(id) != -1) {
                that.productUrl = item.url;
                that.productName = item.name;
                that.productHead = item.head;
                that.productDetail = item.detail;
                that.productLabels = item.labels;
                return;
            }
          });
          responses[1].data.forEach((item) => {
            if(that.recommendList.length < 4){
              that.recommendList.push(item);
            } else {
              return;
            }
          });

          //刷新 Iscroll 长度
          Vue.nextTick(function() {
            commonUtil.isAllLoaded('#detail-scroll', function() {
              detailScroll.refresh();
            });
          });
        });
      }
    }
</script>
