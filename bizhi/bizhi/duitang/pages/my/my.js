// my.js
Page({
  data: {
    userInfo: {
      user_nick: '登录', // 默认显示点击登录
      user_img: null // 用户头像
    },
    canClick: true, // 控制是否可以点击登录
    isModalHidden: true, // 控制模态框是否隐藏
    isHidden:false //显示隐藏退出登录
  },

  onShow: function() {
    // 页面显示时检查登录状态
    this.checkLoginStatus();
  },
  onLoad:function(){

  },
  
  checkLoginStatus: function() {
    // 假设使用本地存储来保存登录状态
    const username = wx.getStorageSync('username');
    const userImg = wx.getStorageSync('userImg'); // 假设用户头像也保存在本地存储
    if (username) {
      // 如果用户已登录，更新用户信息
      this.setData({
        'userInfo.user_nick': username,
        'userInfo.user_img': userImg,
        'canClick': false // 用户已登录，不需要显示登录按钮
      });
    } else {
      // 如果用户未登录，重置用户信息
      this.setData({
        'userInfo.user_nick': '登录',
        'userInfo.user_img': null,
        'canClick': true // 显示登录按钮
      });
    }
  },

  login: function() {
    // 处理用户点击登录
    if (this.data.canClick) {
      // 如果用户未登录，跳转到登录页面
      wx.navigateTo({
        url: '/pages/login/login'
      });
    }
  },

  // 其他的方法，例如上传、我的上传、我的下载等
  upload: function() {
    // 处理用户点击上传图标
    wx.navigateTo({
      url: '/pages/nowupload/nowupload'
    });
  },

  myupload: function() {
    // 处理用户点击我的上传
    wx.navigateTo({
      url: '/pages/myupload/myupload'
    });
  },

  mydownload: function() {
    // 处理用户点击我的下载
    wx.navigateTo({
      url: '/pages/mydownload/mydownload'
    });
  },

  mymark: function() {
    // 处理用户点击我的收藏
    wx.navigateTo({
      url: '/pages/mymark/mymark'
    });
  },

  showAgreementModal: function() {
    // 显示平台协议模态框
    this.setData({
      isModalHidden: false
    });
  },

  hideAgreementModal: function() {
    // 隐藏平台协议模态框
    this.setData({
      isModalHidden: true
    });
  },

  aboutUs: function() {
    // 处理用户点击关于我们
  },

  contactService: function() {
    // 处理用户点击咨询客服
  },

  logout: function() {
    // 处理用户点击退出登录
    wx.clearStorageSync(); // 清除本地存储的用户信息
    this.checkLoginStatus(); // 重新检查登录状态
    wx.showToast({
      title: '退出成功',
    })
    // 退出后跳转登录页面
    setTimeout(()=>{
      wx.reLaunch({
        url: '/pages/login/login',
      })
    },500)
    // 隐藏退出登录按钮
    this.setData({
      isHidden:true
    })
  }
});
