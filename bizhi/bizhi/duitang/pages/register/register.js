// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '', // 用户输入的账号
    password: '' // 用户输入的密码
  },

   // 绑定密码输入框的输入事件
   inputPassword: function(event) {
    this.setData({
      password: event.detail.value
    });
  },
  // 绑定账号输入框的输入事件
  inputUser:function(event){
    this.setData({
      username: event.detail.value
    });
  },
  // 返回登录页面
  doregister:function () {
    wx.navigateBack({
      delta: 1,
    })
  },
  // 注册之后的操作
  registBtn: function(){
    // 效验登录框是否为空
    if(this.data.username.trim()==='' || this.data.password.trim()===''){
      wx.showToast({
        title: '信息不能为空',
        icon:'error'
      })
      return
    }
    // 发请求
    // wx.request({
    //   url: 'url',
    // })
    wx.showToast({
      title: '注册成功',
    })
    // 返回登录页面
    setTimeout(()=>{
      this.doregister()
    },500)
  },
 
})