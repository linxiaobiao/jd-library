require("../../utils/h5Login.js");

var e = getApp();

Page({
    data: {
        h5Url: "",
        redirectUrl: ""
    },
    onLoad: function(o) {
        return console.log("options", o), e.globalData.fromH5LoginRedirectUrl = o.redirectUrl, 
        void wx.switchTab({
            url: "/pages/recommend/recommend"
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {}
});