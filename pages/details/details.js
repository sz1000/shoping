Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    id: '',
  },
  goodInfo: {},
  /**
   * 1：绑定点击事件
   * 2：获取缓存中购物车数据 数组
   * 3：先判断当前商品是否存在购物车
   * 4：已经存在购物车就执行购物车数量++ =>从新把购物车数组添加缓存
   * 5：不存在购物车数组中  直接给购物车添加一个元素，带上购买数量num  =>从新把购物车数组添加缓存
   * 6：弹出提示添加成功
   */
  // 点击加入购物车
  addCart() {
    //刚开始返回的是空字符串，false||[]，这种返回第二个
    let cart = wx.getStorageSync('cart') || [];
    //使用findIndex遍历数组，找出对应项的index，否则返回-1
    let index = cart.findIndex(
      (n) => n.id === this.goodInfo.id
    );
    if (index === -1) {
      // 购物车中没有此商品
      this.goodInfo.num = 1;
      this.goodInfo.checked = false;
      cart.push(this.goodInfo);
    } else {
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);

    wx.showToast({
      title: '成功加入购物车',
      mask: true, //添加模板
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      id: options.id, //点击商品后进入详情页，顺便获取商品ID
    });
    let id = options.id
    // 获取商品详情
    let shopList = wx.getStorageSync('shopList') || [];
    let arr = shopList.filter(function (item) {
      return item.id == id
    })
    this.setData({
      list: arr
    })
    this.goodInfo = arr[0];
    wx.setStorageSync('list', arr);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})