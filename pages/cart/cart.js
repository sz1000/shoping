Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    isSelectAll: false,
    totalMoney: 0 //总金额
  },
  getsumTotal: function () { //合计总金额
    let sum = 0
    for (let i = 0; i < this.data.cartList.length; i++) {
      if (this.data.cartList[i].checked) {
        sum += this.data.cartList[i].num * this.data.cartList[i].minPrice
      }
    }
    //更新数据
    this.setData({
      totalMoney: sum
    })
  },
  remove(e) {
    let index = e.currentTarget.dataset.index;
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          var cartList = that.data.cartList //获取购物车列表
          cartList.splice(index, 1)
          that.setData({
            cartList
          });
          that.getsumTotal()
          wx.setStorageSync("cartList", cartList)
        } else if (sm.cancel) {}
      }
    })
  },
  decrease(e) { //数量递减
    let index = e.currentTarget.dataset.index;
    let newli = 'cartList[' + index + '].num';
    this.data.cartList.forEach((item, i) => {
      if (i === index) {
        if (this.data.cartList[index].num > 1) {
          this.setData({
            [newli]: this.data.cartList[index].num - 1
          })
          this.getsumTotal()
        } else {
          wx.showToast({
            title: '不能再少了',
            mask: true,
            success: (res) => {}
          })
          return
        }
      }
    })
  },
  increase(e) { //递增
    let index = e.currentTarget.dataset.index;
    let newli = 'cartList[' + index + '].num';
    this.data.cartList.forEach((item, i) => {
      if (i === index) {
        if (this.data.cartList[index].num < 10) {
          this.setData({
            [newli]: this.data.cartList[index].num + 1
          })
          this.getsumTotal()
        } else {
          wx.showToast({
            title: '最多只能添加10个',
            mask: true,
            success: (res) => {}
          })
          return
        }
      }
    })
  },
  select: function (e) {
    let index = e.currentTarget.dataset.index;
    let newli = 'cartList[' + index + '].checked';
    this.setData({
      [newli]: !this.data.cartList[index].checked
    })
    let num = 0;
    for (var i = 0; i < this.data.cartList.length; i++) {
      if (this.data.cartList[i].checked) {
        num++;
      }
    }
    if (num == this.data.cartList.length) {
      this.setData({
        isSelectAll: true
      })
    } else {
      this.setData({
        isSelectAll: false
      })
    }
    this.getsumTotal()
  },
  selectAll() { //点击全选
    let list = this.data.cartList;
    let isSelectAll = this.data.isSelectAll;
    if (isSelectAll == false) {
      for (let i = 0; i < list.length; i++) {
        let newli = 'cartList[' + i + '].checked';
        this.setData({
          [newli]: true,
          isSelectAll: true
        })
        this.getsumTotal()
      }
    } else {
      for (let i = 0; i < list.length; i++) {
        let newli = 'cartList[' + i + '].checked';
        this.setData({
          [newli]: false,
          isSelectAll: false,
          totalMoney: 0
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let cartList = wx.getStorageSync('cart') || [];
    cartList.forEach((item) => {
      item.checked = false;
    })
    this.setData({
      cartList
    })
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