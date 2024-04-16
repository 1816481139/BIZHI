// pages/hot/hot.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //开始id  页码
    start:0,
    datalist:[],
    word:"设计"

  },
  getdata: function(start) {
    // 获取关键字
    const word = this.data.word;
    const that = this;
    wx.request({
      url: app.globalData.baseUrl + 'hot/hot-images',
      method: 'GET',
      data: {
        start: start // 将起始位置作为请求参数传递
      },
      success: (result) => {
        if (result.data.result === 'ok') {
          console.log('获取数据了!',result);
          // 将获取到的数据拼接到已有数据后面
          that.setData({
            datalist: that.data.datalist.concat(result.data.data)
          });
        }
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置页面title
    wx.setNavigationBarTitle({
      title: '堆糖热门推荐',
    });
    this.setData({
      app: app.globalData.baseUrl
    });
    // 拿到页码数据
    const start = this.data.start;
    this.getdata(start);
  },
  
  // 搜索关键词监听
  search:function(e){
    // console.log(e.detail.value)
    const word=e.detail.value
    if (!word) {
      this.setData({
        word:"迪丽热巴"
      })
      return
    }
    this.setData({
      word:word
    })
  },
  //搜索触发
  clickSearch:function(){
    // 清空数据
    //页码归0
    this.setData({
      datalist:[],
      start:0
    })
    // 拿到页码渲染
    const start= this.data.start
    this.getdata(start)
  },
  // 点击图片挑战详情页
  imgshow:function(e){
    const index=e.target.dataset.index
    // 拿到自定义属性绑定的id
    // 通过id查找数组当中的本条数据
    // console.log(this.data.datalist[index])
     
    // 解析有价值数据进行组合传递
    const title=this.data.datalist[index].img.img_type
    const time=this.data.datalist[index].img.create_time
    const photo=this.data.datalist[index].img.img_url
    // const username=this.data.datalist[index].sender.username
    const user=this.data.datalist[index].img.user
    // 定义参数对象
    const msgobj={
      title,
      time,
      photo,
    }
    //挑转
    wx.navigateTo({
      url:  "../detail/detail",
      // 回调函数当中进行参数对象传递
      success:function(res){
           res.eventChannel.emit('dataFromOpenerPageA',{data:msgobj})
      }
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    wx.showLoading({
      title: '正在加载',
    });
    // console.log("触底")
    let start = this.data.start;
    start += 24;
    // console.log(start)
    this.getdata(start);
    this.setData({
      start: start
    });
    setTimeout(function() {
      wx.hideLoading();
    }, 1000);
    // 瞬移到顶部
    // wx.pageScrollTo({
    //   scrollTop: 0
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})