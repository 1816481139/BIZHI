const app = getApp();
Page({
  data: {
    app:'',
    userId:'',
    downloadList: []
  },

  onLoad: function(options) {
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
      url: app.globalData.baseUrl +'hot/user-marks/'+ that.data.userId, // 使用that.data.username获取用户名
      method: 'GET',
      success: function(res) {
        console.log('请求成功123456', res);
        
        // 检查是否存在 res.data.data
        if (res.data && Array.isArray(res.data.data)) {
            // 对每个对象的 img.create_time 进行截取前十位的处理
            const processedData = res.data.data.map(item => ({
                ...item,
                img: {
                    ...item.img,
                    create_time: item.img.create_time ? item.img.create_time.substring(0, 10) : ''
                }
            }));
    
            // 更新页面数据
            that.setData({
                downloadList: processedData
            });
    
            console.log('that.data.downloadList', that.data.downloadList);
        } else {
            console.error('数据格式不正确或为空');
        }
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
      key: 'userId',
      success(res) {
        // 将获取到的用户名设置到页面数据中
        that.setData({
          userId: res.data
        });
        console.log('我的上传里面获取用户名', that.data.username);
      },
      fail(err) {
        console.error('获取用户数据失败：', err);
      }
    });
  },
  // 请求
 
});