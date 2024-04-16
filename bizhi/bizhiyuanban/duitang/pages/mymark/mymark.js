// myFavorites.js
Page({
  data: {
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
        category:"风景",
        imgUrl: '/image/upload_2.webp',
        uploadUser: '用户2',
        favoritesCount: 1
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
    // 页面加载时，初始化显示的收藏数据
    this.filterFavorites(this.data.selectedCategory);
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
      selectedCategory: selectedCategory // 更新选中的分类
    });
    // 根据新的分类过滤收藏数据
    this.filterFavorites(selectedCategory);
  }
});