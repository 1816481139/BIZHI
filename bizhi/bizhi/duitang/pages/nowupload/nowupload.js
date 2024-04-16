// index.js
const app = getApp();
Page({
  data: {
    userName:'',
    imageUrl: '',             // 图片地址
    options: ["美女壁纸","游戏壁纸","人物明星","动漫壁纸","植物多肉","搞笑萌宠","人文艺术","家居生活","美食菜谱", "手工DIY", "时尚搭配", "美妆造型","文字句子","插画绘画","设计","古风","壁纸","旅行","头像","素材"], // 下拉框选项
    selectedOptionIndex: 0,   // 下拉框选中的索引
    inputValue: ''            // 输入框的值
  },
  // 页面加载时获取用户信息
  onLoad: function() {
    let that = this;
    wx.getStorage({
      key: 'username',
      success(res) {
        // 在这里可以对获取到的用户数据进行处理
        that.setData({
          userName: res.data
        });
        console.log('从本地存储中获取到的用户数据：', that.data.userName);
      },
     
     
      // fail(err) {
      //   console.error('获取用户数据失败：', err);
      // }
    });
  },

  // 渲染页面请求
 

 
  
  // 下拉框改变事件
  bindPickerChange: function(e) {
    console.log(this.data.options[this.data.selectedOptionIndex] ,'e');
    this.setData({
      selectedOptionIndex: e.detail.value
    });
  },
  
  // 输入框改变事件
  inputChange: function(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },
   // 选择图片并展示
   chooseImage: function() {
    let that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      success: function (chooseImageRes) {
        console.log(chooseImageRes.tempFilePaths[0], 'res');
        console.log('res', chooseImageRes);
        if (chooseImageRes.tempFilePaths.length > 0) {
          that.setData({
            imageUrl: chooseImageRes.tempFilePaths[0]
          });
        }
      }
    });
  },
  // 提交表单
  submitForm: function() {
    // 在这里编写提交表单的逻辑，可以获取 this.data 中的数据进行提交处理
    
    // 例如：
    let that = this;
    console.log('选择的图片地址：', this.data.imageUrl);
    console.log('选择的选项索引：', this.data.options[this.data.selectedOptionIndex]);
    console.log('输入的内容：', this.data.inputValue);

    const tempFilePaths = that.data.imageUrl;
    const uploadUrl = app.globalData.baseUrl + 'img/'; // 你的上传接口地址
    const imgSource = that.data.inputValue; // img_source 参数值
    const imgType = that.data.options[that.data.selectedOptionIndex]; // img_type 参数值
    const user = that.data.userName; // user 参数值
  
   // 构建带查询参数的URL
   const queryString = `img_source=${encodeURIComponent(imgSource)}&img_type=${encodeURIComponent(imgType)}&user=${encodeURIComponent(user)}`;
   const urlWithQuery = `${uploadUrl}?${queryString}`;
    
   wx.uploadFile({
     
    url: urlWithQuery, // 带查询参数的接口地址
    filePath: tempFilePaths, // 要上传文件资源的路径
    name: 'file', // 后端通过这个 key 来获取文件二进制内容
    header: {
      'Content-Type': 'multipart/form-data'
    },
    success: function (uploadRes) {
      // 上传成功后的操作
      console.log(11, uploadRes.data);
      wx.showToast({
        title: '上传成功',
      })
      // 清空页面值
      wx.navigateBack();
    },
    fail: function (error) {
      // 上传失败后的操作
      console.error(error);
    }
  });
  }
})

