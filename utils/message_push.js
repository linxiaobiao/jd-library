function e(e, n) {
    var t = e || getApp().globalRequestUrl;
    return wx.removeStorageSync("oi_key"), new Promise(function(e, o) {
        wx.login({
            success: function(o) {
                var s = o.code;
                i.request({
                    url: t + "/kwxhome/myJd/initOpenIdKey.json",
                    method: "POST",
                    data: {
                        wxcode: s,
                        wxAppId: n.appid,
                        clientType: "tempwx"
                    },
                    success: function(n) {
                        n && n.openIdKey ? (wx.setStorageSync("oi_key", n.openIdKey), e()) : wx.removeStorageSync("oi_key");
                    }
                });
            },
            fail: function() {
                o();
            },
            complete: function() {}
        });
    });
}

function n(e, n) {
    i.request({
        url: e,
        method: "POST",
        data: n,
        success: function(e) {},
        fail: function() {},
        complete: function() {}
    });
}

function t(e) {
    var t = wx.getStorageSync("oi_key");
    n(getApp().messagePushRequestUrl + "/sendTemplateMsg/saveCacheFormId", {
        identityKey: t,
        cacheFormJson: JSON.stringify(e)
    });
}

function o(e) {
    n(getApp().messagePushRequestUrl + "/sendTemplateMsg/sendMsgFront", {
        frontInfoBoJson: JSON.stringify(e)
    });
}

var i = require("./util.js");

module.exports = {
    messagePush: function(n) {
        if ("the formId is a mock one" != n.formId) {
            var o = getApp();
            if ("tempwx" == o.globalWxclient && o.globalConfig && o.globalConfig.isMessagePush) {
                var i = require("./onLaunch.js");
                wx.getStorageSync("oi_key") ? t(n) : e(o.messagePushRequestUrl, i.getExtConfig()).then(function() {
                    return t(n);
                }, function() {
                    wx.removeStorageSync("oi_key");
                });
            }
        }
    },
    getOpenIdKey: e,
    sendMsgFront: function(n) {
        var t = getApp();
        if ("tempwx" == t.globalWxclient && t.globalConfig && t.globalConfig.isMessagePush) {
            var i = require("./onLaunch.js");
            n.appId = i.getExtConfig().appid, n.identityKey = wx.getStorageSync("oi_key"), n.pin = wx.getStorageSync("jdlogin_pt_key"), 
            n.identityKey ? o(n) : e(t.messagePushRequestUrl, i.getExtConfig()).then(function() {
                return o(n);
            }, function() {
                wx.removeStorageSync("oi_key");
            });
        }
    }
};