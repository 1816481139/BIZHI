Page({
  data: {
    downloadList: [
      // 这里应该是从后端获取的用户下载记录
      // 示例数据
      { id: 1, title: '古装', time: '2024-03-17 17:00', uploadUser:"user1", imgUrl: '/image/upload_3.webp' },
      { id: 2, title: '赵露思', time: '2024-03-16 17:00', uploadUser:"user2", imgUrl: '/image/upload_4.webp' },
      { id: 3, title: '刘亦菲', time: '2024-03-15 17:00', uploadUser:"user3", imgUrl: '/image/upload_5.webp' },
      { id: 4, title: '赵露思', time: '2024-03-14 17:00', uploadUser:"user4", imgUrl: '/image/upload_6.webp' }
    
    
    ]
  },

  onLoad: function(options) {
    // 在页面加载时获取用户的下载记录
    // 这里可以调用后端API获取数据，暂时使用静态数据
  }
});