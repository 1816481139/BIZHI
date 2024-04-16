Page({
  data: {
    uploadList: [
      // 这里应该是从后端获取的用户上传记录
      // 示例数据
      { id: 1, title: '故宫', flag:"风景", time: '2024-03-19 18:00', imgUrl: '/image/upload_1.webp'},
      { id: 2, title: '烟火', flag:"风景", time: '2024-03-18 17:00', imgUrl: '/image/upload_2.webp'},
      { id: 3, title: '古装',flag:"古装", time: '2024-03-17 17:00', imgUrl: '/image/upload_3.webp'},
      { id: 4, title: '赵露思', flag:"美女", time: '2024-03-16 17:00', imgUrl: '/image/upload_4.webp'},
      { id: 5, title: '刘亦菲', flag:"美女", time: '2024-03-15 17:00', imgUrl: '/image/upload_5.webp'},
      { id: 6, title: '赵露思', flag:"美女", time: '2024-03-14 17:00', imgUrl: '/image/upload_6.webp'},
      { id: 7, title: '范冰冰', flag:"美女", time: '2024-03-15 14:00', imgUrl: '/image/upload_7.webp'},
      { id: 8, title: '江疏影', time: '2024-03-14 15:00', imgUrl: '/image/upload_8.webp'},



,
      // 更多上传记录...
    ]
  },

  onLoad: function(options) {
    // 在页面加载时获取用户的上传记录
    this.getUserUploads();
  },

  getUserUploads: function() {
    // 这里应该是调用后端API获取用户上传记录的代码
    // 假设使用wx.request从后端获取数据
    wx.request({
      url: '你的后端API地址', // 获取上传记录的API
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            uploadList: res.data // 假设后端直接返回了上传记录数组
          });
        } else {
          // 处理错误情况
        }
      },
      fail: () => {
        // 请求失败的处理逻辑
      }
    });
  },
  

  onLoad: function(options) {
    // 在页面加载时获取用户的上传记录
    this.getUserUploads();
  },

  getUserUploads: function() {
    // 这里应该是调用后端API获取用户上传记录的代码
    // 假设使用wx.request从后端获取数据
    wx.request({
      url: '你的后端API地址', // 获取上传记录的API
      method: 'GET',
      success: (res) => {
        if (res.statusCode === 200) {
          this.setData({
            uploadList: res.data // 假设后端直接返回了上传记录数组
          });
        } else {
          // 处理错误情况
        }
      },
      fail: () => {
        // 请求失败的处理逻辑
      }
    });
  }
});