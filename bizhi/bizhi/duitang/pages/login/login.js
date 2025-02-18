// login.js
const app = getApp();
Page({
  data: {
    username: '', // 用户输入的账号
    password: '' // 用户输入的密码
  },

  // 绑定账号输入框的输入事件
  inputAccount: function(event) {
    this.setData({
      username: event.detail.value
    });
  },

  // 绑定密码输入框的输入事件
  inputPassword: function(event) {
    this.setData({
      password: event.detail.value
    });
  },
  // 跳转注册页面
  doregister:function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
 
  // 登录按钮的点击事件
  doLogin: function() {
     // 效验登录框是否为空
    if(this.data.username.trim()==='' || this.data.password.trim()===''){
      wx.showToast({
        title: '信息不能为空',
        icon:'error'
      })
      return
    }
    const that = this;
    wx.request({
      url: app.globalData.baseUrl +'login', 
      method: 'POST',
      data: {
        username: this.data.username,
        password: this.data.password
      },
      success: function(res) {
        if (res.data && res.data.status === 'success') {
          // 登录成功，获取用户id，跳转到我的页面
          console.log(res);
          const userId = res.data.data.user_id; // 假设返回的数据中包含用户id
          const username = res.data.data.username;
          wx.setStorageSync('userId', userId); // 可以将用户id存储在本地
          wx.setStorageSync('username', username);
          wx.showToast({
            title: '登录成功!',
          })
          // 跳转我的页面
         setTimeout(()=>{
          wx.switchTab({
            url: '/pages/my/my'
          });
         },500)
        } else {
          // 登录失败，弹出提示
          wx.showToast({
            title: '账号或密码错误',
            icon: 'error',
            duration: 2000
          });
        }
      },
      fail: function() {
        // 请求失败的处理
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});
