// pages/ceshi/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  uploadFile: function() {
    // 在这里编写提交表单的逻辑，可以获取 this.data 中的数据进行提交处理
    
    // 例如：
    let that = this
    // console.log('选择的图片地址：', this.data.imageUrl);
    // console.log('选择的选项索引：', this.data.options[this.data.selectedOptionIndex]);
    // console.log('输入的内容：', this.data.inputValue);
    wx.request({
      url: app.globalData.baseUrl + 'img',
      img_source: '请问',
      img_type: '美女图片',
      user: 'admin',
      file:'http://tmp/sqPXy0MgGudL0cc712ec2c675f50ed4720c99eb7f159.jpg' ,
      name: 'file',
      header: { // 请求头
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      success(res) {
        console.log('提交表单成功：', res.data);
        // 在这里可以处理提交成功后的逻辑，例如显示成功提示、清空表单等
        // 示例代码：
        // // 清空表单数据
        // that.setData({
        //   inputValue: '',
        //   selectedOptionIndex: 0,
        //   imageUrl: ''
        // });
        // 显示成功提示
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail(err) {
        console.error('提交表单失败：', err);
        // 在这里可以处理提交失败后的逻辑，例如显示失败提示、重新尝试等
        // 示例代码：
        wx.showToast({
          title: '提交失败，请重试',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})