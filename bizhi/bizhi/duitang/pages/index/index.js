// pages/index/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   
   */

  data: {
    navtxt:["美女壁纸","游戏壁纸","人物明星","动漫壁纸","植物多肉","搞笑萌宠","人文艺术","家居生活","美食菜谱", "手工DIY", "时尚搭配", "美妆造型","文字句子","插画绘画","设计","古风","壁纸","旅行","头像","素材"
      ],
    //当前显示导航词条
    nowIndex:0,
    datalist:[],
    statr:0,
    img_type :'',
    app:'',
  },
  // 点击导航
  navclick:function(e){
    //下标
    const index=e.target.dataset.in
    // 关键字
    const word=e.target.dataset.txt
    console.log(word)
    // 绑定关键字
    this.setData({
      img_type:word
    })
   // 修改当前显示下标
    this.setData({
      nowIndex:index
    })
    this.getdata(word)
  },
  //设计请求数据方法
  getdata:function(word){
    const that=this
    const start= this.data.statr
    // 根据词条请求数据
    wx.request({
      url: app.globalData.baseUrl+'img',
      methods:'GET',
      data:{
        img_type:that.data.img_type
      },
      dataType: "json",
      
      success: (result) => {
        console.log('获取成功',result)
        that.setData({
          datalist:result.data.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取登录存在本地的用户名字
    wx.getStorage({
      key: 'username',
      success: function(res) {
      },
      fail: function(err) {
        //没有名字跳转登录页面
        wx.reLaunch({
          url: '/pages/login/login',
        })
      }
    });
    

     // 设置页面title
     wx.setNavigationBarTitle({
      title: '堆糖图库分类',
    })
    this.setData({
      app:app.globalData.baseUrl
    })
     //根据下标拿到词条
     const word=this.data.navtxt[this.data.nowIndex]
     console.log(word)
     this.getdata(word)
  },
 // 点击图片挑战详情页
 imgshow:function(e){
  // const index=e.target.dataset.index

  // 拿到自定义属性绑定的id
  // 通过id查找数组当中的本条数据
  console.log(e.currentTarget.dataset.index)
  const index=e.currentTarget.dataset.index
   
const timestamp = this.data.datalist[index].create_time;
const date = new Date(timestamp);
console.log(date.toLocaleString()); // 输出本地时间格式

  // 解析有价值数据进行组合传递
  const id = this.data.datalist[index].id
  const title=this.data.datalist[index].img_type
  const time=date.toLocaleString()
  const photo=this.data.datalist[index].img_url
  // const username=this.data.datalist[index].sender.username
  const userpic=this.data.datalist[index].img_url
  // 定义参数对象
  const msgobj={
    id,
    title,
    time,
    photo,
    // username,
    userpic
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})