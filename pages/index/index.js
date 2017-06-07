//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    showClearIcon: false,
    phoneNumber: '',
    phoneInputFocus: true,
    nextStepActive: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  sendVerifyCode: function () {
    var data = {
      line_number: this.data.phoneNumber,
      calling_code: '86',
      session_key: ''
    }

    wx.request({
      url: '',
      data: data,
      method: 'POST'
    })
  },

  wechatLogin: function() {
    wx.login({
      success: function(res) {
        var appid = ''
        var appsecret = ''

        wx.request({
          url: `https://api.weixin.qq.com/sns/jscode2session?appid=${ appid }&secret=${ appsecret }&js_code=${ res.code }&grant_type=authorization_code`,
          success: function(res) {
            console.log(res)
          }
        })
      }
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      phoneNumber: e.detail.value
    })

    var phone = this.data.phoneNumber

    if (phone) {
      this.setData({
        showClearIcon: true
      })

      if (phone.length === 11) {
        this.setData({
          nextStepActive: true
        })
      } else {
        this.setData({
          nextStepActive: false
        })
      }
    }
  },
  clearPhoneNumber: function(e) {
    this.setData({
      phoneNumber: '',
      showClearIcon: false,
      phoneInputFocus: true
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
