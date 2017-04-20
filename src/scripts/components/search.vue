<template>
    <div class="search_box">
      <header>
          <i onclick="window.history.go(-1)"></i>
          <div class="search">
              <input type="text" v-model.trim="msg" />
          </div>
          <button v-on:click='searchContent'>搜索</button>
      </header>
      <nav class='menu'>
        <ul>
          <li class='liactive' v-on:click='moren'>默认</li>
          <li v-on:click='saleCount' >销量</li>
          <li v-on:click='price' >价格<i></i><em></em></li>
          <li v-on:click='shuaixuan' >筛选<b></b></li>
        </ul>
      </nav>
      <div v-if='selected' class='priceselect'>
        <span>价格区间(元)</span>
        <div>
          <input type="text" number v-model='startprice' />
          <span>--</span>
          <input type="text" number  v-model='endprice' />
        </div>
        <button v-on:click='selectprice'>确定</button>
      </div>
      <section id='search_scroll-view'>
        <div class="conbox">
          <div v-show='topshow' class="head">
            <img v-bind:src='imgArrow' />
            <span>努力刷新中...</span>
          </div>
          <ul>
            <li v-for='list in productList' v-link='"/productDetail/" + list.name'>
              <div class='imgbox'>
                <img v-bind:src='list.imgsrc' />
              </div>
              <h4>{{list.name}}</h4>
              <span>￥{{list.newprice}}<i>{{list.saleCount>=10000 ? (list.saleCount/10000).toFixed(2) + "万" : list.saleCount}}人付款</i></span>
            </li>
          </ul>
          <div v-show='bottomshow' class="foot">
            <img v-bind:src='imgArrow' />
            <span>努力加载中...</span>
          </div>
          <div v-show='notice' class="foot">
            <span>没有符合的数据~</span>
          </div>
        </div>
      </section>
    </div>
</template>
<script>
    var myScroll;
    import commonUtil from '../utils/common.util.js';
    export default {
        data() {
            return {
                msg: '',
                type: this.$route.params.type,
                curIndex: 0,
                priceClickCount: 0,
                selectClickCount: 0,
                selected: false,
                productList: [],
                startprice: 0,
                endprice: 999,
                productbeifen: [],
                imgArrow: '/images/arrow.png',
                saleselected: false,
                priceSelected: false,
                transitionName: 'goto',
                bottomshow:false,
                topshow:false,
                notice: false
            }
        },
        ready: function() {
            myScroll = new IScroll('#search_scroll-view', {
                probeType: 3,
                mouseWheel: true,
                click: true
            });
            var that = this;
            that.loadData(that);
            // that.topshow=true;
            // that.bottomshow=true;
            var head = $('.head img');
            var topImgHasClass = head.hasClass('up');
            var foot = $('.foot img');
            var bottomImgHasClass = head.hasClass('down');
            myScroll.on('scroll', function() {
                var y = this.y;
                var maxY = this.maxScrollY - y;
                if (y >= 0) {
                    !topImgHasClass && head.addClass('up');
                    return '';
                }
                if (maxY >= 0) {
                    !bottomImgHasClass && foot.addClass('down');
                    return '';
                }
            });
            myScroll.on('scrollEnd', function() {
                if (this.y >= -35 && this.y < 0) {
                    myScroll.scrollTo(0, -35);
                    head.removeClass('up');
                } else if (this.y >= 0 && that.topshow) {
                    head.attr('src', '/images/ajax-loader.gif');

                    // ajax下拉刷新数据
                    that.$http.get('/rest/listrefresh')
                        .then((res) => {
                            that.productList = (that.typeLoadDate(that, res.data)).concat(that.productList);
                            that.productbeifen= res.data.concat(that.productbeifen);
                            that.notice = false;
                            that.judgeState(that);
                            myScroll.scrollTo(0, -35);
                            head.removeClass('up');
                            head.attr('src', '/images/arrow.png');
                            Vue.nextTick(function() {
                                myScroll.refresh();
                            });
                        })
                }

                var self = this;
                var maxY = this.maxScrollY - this.y;
                if (maxY > -35 && maxY < 0) {
                    myScroll.scrollTo(0, self.maxScrollY + 35);
                    foot.removeClass('down')
                } else if (maxY >= 0 && that.bottomshow) {
                    foot.attr('src', '/images/ajax-loader.gif');
                    //ajax上拉加载数据
                    that.$http.get('/rest/listmore')
                        .then((res) => {
                            that.productList = that.productList.concat(that.typeLoadDate(that, res.data));
                            that.productbeifen = that.productbeifen.concat(res.data);
                            that.judgeState(that);
                            that.notice = false;
                            foot.removeClass('down');
                            foot.attr('src', '/images/arrow.png');
                            Vue.nextTick(function() {
                                myScroll.refresh();
                                myScroll.scrollTo(0, self.maxScrollY + 35);
                            });
                        });
                }
            });
        },
        methods: {
            judgeState(that){
              //console.log(that.saleselected);
              // console.log(that.priceSelected);
              if (that.saleselected) {
                  that.productList.sort(that.sortBySale);
              }
              if (that.priceSelected) {
                  if (that.priceClickCount == 1) {
                      this.productList.sort(that.sortbypriceAscending);
                  } else {
                      //降序
                      that.productList.sort(that.sortbypriceReduce);
                  }
              }
            },
            typeLoadDate(that, data) {
              let temp = [];
              if(that.type) {
                data.forEach((item) => {
                  if(item.type == that.type) {
                    temp.push(item);
                  }
                });
              } else {
                temp = data;
                that.topshow=true;
                that.bottomshow=true;
                myScroll.scrollTo(0, -35);
              };
              that.type = null;
              return temp;
            },
            loadData(that) {
                that.$http.get('/rest/products')
                    .then((res) => {
                        that.productList = that.typeLoadDate(that, res.data);
                        if(!that.productList.length){
                          that.notice=true;
                        }
                        that.productbeifen = res.data;
                        Vue.nextTick(function() {
                            commonUtil.isAllLoaded('#search_scroll-view', function() {
                                myScroll.refresh();
                            });
                        });
                    });
            },
            searchContent() {
                let pro = this.productbeifen;
                // let foot = $('.foot');
                // console.log(pro);
                this.productList = [];
                // myScroll.scrollTo(0, -35);
                for (let i = 0; i < pro.length; i++) {
                    let str = pro[i].name;
                    //console.log(this.msg.length);
                    //for (let j = 0; j < this.msg.length; j++) {
                    //console.log(this.msg[j]);
                    if (str.indexOf(this.msg) != -1) {
                        this.productList.push(pro[i]);
                    }
                    //}
                };
                this.notice = false;
                if(!this.msg){
                  this.topshow=true;
                  this.bottomshow = true;
                  myScroll.scrollTo(0, -35);
                } else {
                  this.topshow=false;
                  this.bottomshow = false;
                }
                if(!this.productList.length){
                  this.notice=true;
                }
                Vue.nextTick(function() {
                    commonUtil.isAllLoaded('#search_scroll-view', function() {
                        myScroll.refresh();
                    });
                });
            },
            //按照价格区间排序
            selectprice() {
                let pro = this.productList;
                pro.sort(this.sortbypriceReduce);
                this.productList = [];
                for (let i = 0.; i < pro.length; i++) {
                    if (pro[i].price >= this.startprice && pro[i].price < this.endprice) {
                        this.productList.push(pro[i]);
                    }
                }
            },
            init(parent) {
                this.saleselected = false;
                this.priceSelected = false;
                for (let i = 0; i < parent.children.length - 1; i++) {
                    parent.children[i].className = '';
                    if (i == 2) {
                        for (let j = 0; j < parent.children[i].children.length; j++) {
                            parent.children[i].children[j].className = '';
                        }
                    }
                }
            },
            //默认
            moren(event) {
                var that = this;
                that.priceClickCount == 0;
                let targetName = event.target;
                let parent = targetName.parentNode;
                this.init(parent);
                targetName.className = 'liactive';
                that.loadData(that);
            },
            //升序排序规则
            sortbypriceAscending(a, b) {
                return a.newprice - b.newprice;
            },
            //降序排序规则
            sortbypriceReduce(a, b) {
                return b.newprice - a.newprice;
            },
            //按照销量排序规则
            sortBySale(a, b) {
                return b.saleCount - a.saleCount;
            },
            //销售
            saleCount(event) {
                this.priceClickCount == 0;
                let targetName = event.target;
                let parent = targetName.parentNode;
                this.init(parent);
                targetName.className = 'liactive';
                this.productList.sort(this.sortBySale);
                this.saleselected = true;
                // console.log(this.saleselected);
            },
            //价格
            price(event) {
                let targetName = event.target;
                let parent;
                if (targetName.nodeName == 'LI') {
                    parent = targetName.parentNode;
                } else {
                    parent = targetName.parentNode.parentNode;
                    targetName = targetName.parentNode;
                }
                this.init(parent);
                targetName.className = 'liactive';
                //升序
                if (this.priceClickCount == 0) {
                    targetName.children[0].className = 'iactive';
                    targetName.children[1].className = '';
                    this.priceClickCount = 1;
                    this.productList.sort(this.sortbypriceAscending);
                } else {
                    //降序
                    targetName.children[0].className = '';
                    targetName.children[1].className = 'emactive';
                    this.priceClickCount = 0;
                    this.productList.sort(this.sortbypriceReduce);
                }
                this.priceSelected = true;

            },
            //筛选
            shuaixuan(event) {
                this.priceClickCount == 0;
                let targetName = event.target;
                if (targetName.nodeName != 'LI') {
                    targetName = targetName.parentNode;
                }
                if (this.selectClickCount == 0) {
                    targetName.children[0].className = 'bactive';
                    this.selectClickCount = 1;
                    this.selected = true;
                } else {
                    targetName.children[0].className = '';
                    this.selectClickCount = 0;
                    this.selected = false;
                }
            }
        }
    }
</script>
