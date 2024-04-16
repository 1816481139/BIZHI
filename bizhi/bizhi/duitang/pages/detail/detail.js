// pages/detail/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgMessage:{},
    datalist:{},
    imgId:'',
    app:''
  },
  save: function () {
    console.log(this.data.datalist.photo)
    const url = this.data.datalist.photo
    // 下载网络文件
    wx.downloadFile({

      url: url,
      success: function (res) {
        console.log(res)
        wx.showLoading({
          title: '加载中...'
        });
        //图片保存到本地相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            console.log(data)
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '图片保存成功',
              showCancel: true,
            })

          },
          complete:function(){
            wx.hideLoading()
          }

        })
       
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: '图片详情',
    })
    this.setData({
      app:app.globalData.baseUrl
    })
    const eventChannel = this.getOpenerEventChannel()
    // 监听dataFromOpenerPageA事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('dataFromOpenerPageA', (data) => {
      console.log(data.data)
      // 图片id存储
      this.setData({
        imgId:data.data.id
      })
      //  存储数据
      this.setData({
        datalist: data.data
      })
      console.log(this.data.imgId,'imgid')
      // 这里发请求单张图片页面
      wx.request({
        url: app.globalData.baseUrl + 'img/' + that.data.imgId,
        success(res) {
          that.setData({
            imgMessage: res.data.data
          });
          console.log('imgMessage', that.data.imgMessage.user);
        },
        fail(err) {
          console.error('请求失败', err);
        }
      });
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