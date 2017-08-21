//获取应用实例
Page({
  data: {
    tipSwitch: false,
    phoneNumber: '18310768907',
    code: '',
    hideClearIcon: true,
    countDownNumber: 60,
    timer: null
  },
  onShow: function () {
    var phone = Number(18310768907).toString()

    console.log(this.countDown())
    this.setData({
      phoneNumber: phone.slice(0, 3) + ' **** **' + phone.slice(-2)
    })
  },
  //事件处理函数
  bindKeyInput: function(e) {
    this.setData({
      code: e.detail.value
    })

    if (this.data.code) {
      this.setData({
        hideClearIcon: false
      })
    } else {
      this.setData({
        hideClearIcon: true
      })
    }
    return this.data.code
  },

  clearCode: function() {
    this.setData({
      code: ''
    })
  },

  countDown: function() {
    var num = this.data.countDownNumber
    var self = this

    if (num > 0) {
      this.setData({
        timer: setTimeout(function() {
          self.setData({
            countDownNumber: num - 1
          })
          self.countDown()
        }, 1000)
      })
    } else {
      clearTimeout(this.data.timer)
      this.setData({
        tipSwitch: true
      })
    }
  }
})
