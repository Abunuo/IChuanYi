<template>
  <div class="shopping_box">
      <header>
          <div class="header_left">
            <em></em>
            <input placeholder='暖心毛衣'  type="text"/>
          </div>
          <div class='header_right' v-link="{path: '/car'}"></div>
      </header>
      <section  id='shopping_scroll-view'>
        <div class="conbox">
          <!-- 团购 -->
          <div class='header_nav'>
            <div class="nav_left">
              <img src="/images/shop6.jpg" v-link="{path: '/search'}"/>
            </div>
            <div class="nav_right">
              <div>
                <img src="/images/shop7.jpg" v-link="{path: '/search'}"/>
              </div>
              <div>
                <img src="/images/shop8.jpg" v-link="{path: '/search'}" />
              </div>
            </div>
          </div>
          <!--  抢购-->
          <div class="qianggou">
            <div class="qianggou_title">
                <div class='title_left'>
                  <h4>限时抢购</h4>
                  <h5>每天早9点、晚9点更新</h5>
                </div>
                <div class='title_right'>
                   <span>据本场结束还剩</span>
                   <div class="data">
                     <i>{{hh}}</i> :
                     <i>{{mm}}</i> :
                     <i>{{ss}}</i>
                   </div>
                </div>
            </div>
            <div id='qianggou_con' class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for='l in qinggou'>
                    <dl v-link='"/productDetail/" + l.name'>
                      <dt>
                        <img v-bind:src='l.imgsrc'/>
                      </dt>
                      <dd>
                        <h4>{{l.name}}</h4>
                        <i>￥{{l.newprice}}</i>
                        <em>￥{{l.oldprice}}</em>
                      </dd>
                    </dl>
                </div>
              </div>
            </div>
          </div>
          <!-- 当季必备 -->
          <div class="bibei_box">
            <div class="title">
                <h4><img src='/images/bg1.jpg' /></h4>
            </div>
            <div class="bibei_con">
              <dl v-link='"/search/" + b.name' v-for='b in bibei'>
                  <dt><img v-bind:src='b.imgsrc' /></dt>
                  <dd>{{b.name}}</dd>
              </dl>
            </div>
          </div>
          <!-- 全部分类 -->
          <div class="feilei_box">
            <div class="title">
                <h4><img src='/images/bg2.jpg' /></h4>
            </div>
            <ul class='fenlei_con' >
              <li  v-link='"/search/上衣"'>
                <div class="fenlei_left">
                  <h3>上衣</h3>
                  <h4>TOPS</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav1.jpg'/>
                </div>
              </li>
              <li v-link='"/search/裤子"'>
                <div class="fenlei_left">
                  <h3>裤子</h3>
                  <h4>PANTS</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav2.jpg'/>
                </div>
              </li>
              <li v-link='"/search/裙装"'>
                <div class="fenlei_left">
                  <h3>裙装</h3>
                  <h4>DRESSES</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav3.jpg'/>
                </div>
              </li>
              <li v-link='"/search/包包"'>
                <div class="fenlei_left">
                  <h3>包包</h3>
                  <h4>BAGS</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav4.jpg'/>
                </div>
              </li>
              <li v-link='"/search/鞋子"'>
                <div class="fenlei_left">
                  <h3>鞋子</h3>
                  <h4>SHONES</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav5.jpg'/>
                </div>
              </li>
              <li v-link='"/search/配饰"'>
                <div class="fenlei_left">
                  <h3>配饰</h3>
                  <h4>ACCESSORY</h4>
                </div>
                <div class="fenlei_right">
                  <img  src='/images/nav7.jpg'/>
                </div>
              </li>
            </ul>
          </div>
          <!-- 推荐好店 -->
          <div class="tuijian">
            <div class="title">
                <h4><img src='/images/bg3.jpg' /></h4>
            </div>
            <div class="seemore">
                <img src="/images/good1.jpg"  />
            </div>
            <ul class="links">
                <li><img src='/images/link1.jpg' /></li>
                <li><img src='/images/link2.jpg' /></li>
                <li><img src='/images/link3.jpg' /></li>
                <li><img src='/images/link4.jpg' /></li>
                <li><img src='/images/link5.jpg' /></li>
                <li><img src='/images/link6.jpg' /></li>
                <li><img src='/images/link7.jpg' /></li>
                <li><img src='/images/link8.jpg' /></li>
            </ul>
          </div>
          <!-- 推荐好店 -->
          <div class="gouwu_box">
            <div class="title">
                <h4><img src='/images/bg5.jpg' /></h4>
            </div>
            <ul class='gouwu_con'>
              <li v-for='gou in gouwu'>
                <img  v-bind:src='gou.imgsrc'/>
                <div class='gouwu_detail'>
                  <h4>{{gou.problem}}</h4>
                  <span>含<i>{{gou.count}}</i>件单品</span>
                </div>
                <div class="gouwu_bottom">
                  <span>{{gou.title}}</span>
                  <i>浏览 {{gou.seecount}}</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
  </div>
</template>
<script>
import { tabChanger } from '../vuex/actions';

    // var Vue = require('../libs/vue.js');
    // var VueResource = require('../libs/vue-resource.js');
    // Vue.use(VueResource);
    var time;
    var mySwiper = null;
    var scroll;
    import commonUtil from '../utils/common.util.js';
    export default {
        vuex: {
          actions: {
            change: tabChanger
          }
        },
        data() {
            return {
                qinggou: [],
                bibei: [],
                gouwu: [],
                hh: '--',
                mm: '--',
                ss: '--',
                transitionName: 'goto'
            }
        },
        ready: function() {
            this.change(1);
             scroll = new IScroll('#shopping_scroll-view', {
                probeType: 3,
                click:true,
                bounce:false,
                mouseWheel: true
            });
            mySwiper = new Swiper("#qianggou_con", {
                slidesPerView: 3
            });
            //倒计时
            function checkTime(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
            clearInterval(time);
            var that = this;
            time = setInterval(function() {
                var ts = (new Date(2017, 8, 7, 18, 30, 0)) - (new Date()); //计算剩余的毫秒数
                if (ts == 0) {
                    clearInterval(time);
                    that.hh = '00';
                    that.mm = '00';
                    that.ss = '00';
                } else {
                    var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10); //计算剩余的小时数
                    var mm = parseInt(ts / 1000 / 60 % 60, 10); //计算剩余的分钟数
                    var ss = parseInt(ts / 1000 % 60, 10); //计算剩余的秒数
                    that.hh = checkTime(hh);
                    that.mm = checkTime(mm);
                    that.ss = checkTime(ss);
                }
            }, 1000);
            //抢购
            that.$http.get('/rest/qianggou')
                .then((res) => {
                    that.qinggou = res.data;
                    this.scrollRefresh();
                })
                //必备
            that.$http.get('/rest/bibei')
                .then((res) => {
                    that.bibei = res.data;
                    this.scrollRefresh();
                })
                //购物清单
            that.$http.get('/rest/gouwu')
                .then((res) => {
                    that.gouwu = res.data;
                    this.scrollRefresh();
                })
        },
        methods: {
          scrollRefresh(){
            Vue.nextTick(function(){
              commonUtil.isAllLoaded('#shopping_scroll-view',function () {
                scroll.refresh();
              });
            });
          }
        }

    }
</script>
