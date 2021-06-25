import api from '../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: 0,
    shopList: [],
  },
  todetails(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../../pages/details/details?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },
  getList() {
    var that = this
    let data = {
      page: 1,
      pageSize: 20
    }
    //调用接口
    api.post('/goods/list', data).
    then(res => {
      //成功时回调函数
      var shopList = res.data
      wx.setStorageSync("shopList", shopList)
      that.setData({
        shopList
      })
    }).catch(err => {
      //失败时回调函数
    })
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