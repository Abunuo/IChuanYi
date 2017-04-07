var _waterfall = function (liveScroll) {
  var dataArr = [];
  function getData() {
    $.ajax({
      url: '/rest/list',
      async: false,
      success: function (rs) {
        dataArr = rs.data;
      }
    });
  }

  var boxArr, num, columnHeightArr;

  function render(){
    getData();
    $.each(dataArr,
      function (index, item) { 
        if(item.head == ""){
            var str = "";
            var link = '#';
        }else{
            var str = '<img src="'+item.head+'"></img><i>'+item.name
            +'</i>';
            var link = '/#!/detail/'+ item.name;
        }
        $('#div1').append('<a class="box box-item" href="'+link+'"><div class="gap">' +
        '<img class="img" style="padding-bottom:' + cRate(item) * 100 + "%" + '" data-src="' + item.url + '"></img>' +  
        '<p class="desc">'+str+'</p></div></a>'); 
      }); 

      boxArr = $('.box');
      num = Math.floor(document.body.clientWidth / boxArr.eq(0).width());
      columnHeightArr = [];
      columnHeightArr.length = num;
      arrangement(); 　　
      $('#div1').css('minHeight', Math.max.apply(null, columnHeightArr));  
      liveScroll.refresh();
      lazyLoad();
  }

  function arrangement() { 
      boxArr.each(function (index, item) { 
          if (index < num) { 
              columnHeightArr[index] = $(item).height(); 
          } else { 
              var minHeight = Math.min.apply(null, columnHeightArr),
                  minHeightIndex = $.inArray(minHeight, columnHeightArr); 
              $(item).css({  
                  position: 'absolute',
                  top: minHeight,
                  left: boxArr.eq(minHeightIndex).position().left
              }); 
              columnHeightArr[minHeightIndex] += $(item).height(); 
          } 
      }); 
  }  

  function lazyLoad() { 
      var boxArr = $('.box-item'); 
      boxArr.each(function (index, item) {
          var viewTop = $(item).offset().top - $('#div1').scrollTop(),
              imgObj = $(item).find('.img'); 
          if ((viewTop < $('#div1').height()) && ($(item).offset().top + $(item).height() > $('#div1').scrollTop())) {
              imgObj.attr('src', imgObj.attr("data-src"))
                    .css("padding-bottom","")
                    .removeClass('data-src'); 
              $(item).removeClass('box-item'); 
          } 
      }) 
  }  

  function cRate(obj) { 
      return obj.height / obj.width; 

  }

  render();

  liveScroll.on('scrollEnd', function() {
    if(this.maxScrollY == this.y){
      getData();
      render();
    }
  });
}

module.exports = _waterfall;
