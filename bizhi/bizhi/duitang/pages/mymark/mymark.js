// myFavorites.js
const app = getApp()
Page({
  data: {
    app:'',
    userId:'',
    categories: ['美女', '风景', '运动', '古装'], // 下拉框选项
    selectedCategory: '美女', // 当前选中的分类
    allFavorites: [ // 假设的收藏数据
      {
        category:"风景",
        imgUrl: '/image/upload_1.webp',
        uploadUser: '用户1',
        favoritesCount: 32
      },
     
      {
        category:"古装",
        imgUrl: '/image/upload_3.webp',
        uploadUser: '用户3',
        favoritesCount: 120
      },
    
     
      {
        category:"美女",
        imgUrl: '/image/upload_4.webp',
        uploadUser: '用户4',
        favoritesCount: 35
      },
      {
        category:"美女",
        imgUrl: '/image/upload_5.webp',
        uploadUser: '用户4',
        favoritesCount: 70
      },{
        category:"美女",
        imgUrl: '/image/upload_6.webp',
        uploadUser: '用户4',
        favoritesCount: 66
      },{
        category:"美女",
        imgUrl: '/image/upload_7.webp',
        uploadUser: '用户4',
        favoritesCount: 88
      },{
        category:"美女",
        imgUrl: '/image/upload_8.webp',
        uploadUser: '用户4',
        favoritesCount: 150
      },

      // ...更多收藏项
    ],
    favorites: []
  },
  onLoad: function() {
    this.setData({
      app:app.globalData.baseUrl
    }),
    setTimeout(() => {
      this.myUpLoad()
     }, 500);
    // 页面加载时，初始化显示的收藏数据
    this.filterFavorites(this.data.selectedCategory);
    // 获取本地名称
   this.getName() 

  },
  myUpLoad(){
    const that = this; // 保存页面对象的引用
    wx.request({
      url: app.globalData.baseUrl +'hot/user-marks/'+ that.data.userId, // 使用that.data.username获取用户名
      method: 'GET',
      success: function(res) {
        console.log('请求成功123456111', res);
        
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
  // 过滤收藏数据的函数
  filterFavorites: function(category) {
    const filtered = this.data.allFavorites.filter(item => item.category === category);
    this.setData({
      favorites: filtered
    });
  },

  // 处理下拉框选择事件
  onCategoryChange: function(e) {
    const index = e.detail.value; // 获取picker选择的index
    const selectedCategory = this.data.categories[index]; // 根据index获取对应的分类
    this.setData({
      allFavorites: selectedCategory // 更新选中的分类
    });
    // 根据新的分类过滤收藏数据
    this.filterFavorites(selectedCategory);
  }
});