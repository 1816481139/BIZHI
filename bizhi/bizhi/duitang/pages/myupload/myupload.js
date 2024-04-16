const app = getApp();
Page({
  data: {
    username:'',
    uploadList: [],
    app:'',
  },

  onLoad() {
    this.setData({
      app:app.globalData.baseUrl
    })
    // 获取本地存储的用户名
    this.getName();
    setTimeout(() => {
     this.myUpLoad()
    }, 500);
  },
  myUpLoad(){
    const that = this; // 保存页面对象的引用
    wx.request({
      url: app.globalData.baseUrl +'img/images/'+ that.data.username, // 使用that.data.username获取用户名
      method: 'GET',
      success: function(res) {
        console.log('请求成功', res);
       
        // 获取响应数据
        var uploadData = res.data.data;
        
        // 对每个对象的create_time进行截取前十位的处理
        for (var i = 0; i < uploadData.length; i++) {
          // 截取前十位并更新create_time字段
          uploadData[i].create_time = uploadData[i].create_time.substring(0, 10);
        }
        
        // 更新页面数据
        that.setData({
          uploadList: uploadData
        });
      },
      fail: function(err) {
        console.error('请求失败', err);
        // 在这里处理请求失败的逻辑
      }
    });
  },
  // 获取本地名称
  getName() {
    const that = this;
    wx.getStorage({
      key: 'username',
      success(res) {
        // 将获取到的用户名设置到页面数据中
        that.setData({
          username: res.data
        });
        console.log('我的上传里面获取用户名', that.data.username);
      },
      fail(err) {
        console.error('获取用户数据失败：', err);
      }
    });
  },
  
});