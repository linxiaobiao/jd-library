function e(e, a) {
    var o = require("../keplerReport.js"), r = require("../util.js");
    console.log("appjs onshow options=====", e), wx.canIUse("button.open-type.getUserInfo") || wx.showModal({
        title: "提示",
        content: "亲，好久不见~请您下载微信最新版本,只有最新版本支持买买买~",
        showCancel: !1
    }), o.setAppData({
        abtest: 1
    }), wx.setStorageSync("wxappStorageName", a.globalData.wxappStorageName), r.getPhoneModel(a);
}

module.exports = {
    appLaunch: function(e, a) {
        e.query && e.query.customerinfo || wx.removeStorageSync("customerinfo");
        try {
            var o = require("../fingerPrint.js"), r = o.Jdwebm;
            r && r(), a.globalData.wxCookie = o.CookieUtils;
        } catch (e) {
            console.log("fingerPrint error:", e);
        }
    },
    appShow: function(a, o) {
        e(a, o);
        var r = a.query, t = r.subUnionId ? r.subUnionId : "", n = r.wareId ? r.wareId : "";
        r.unionId ? wx.setStorageSync(o.globalData.wxappStorageName, {
            unionid: r.unionId,
            wxversion: o.globalData.wxversion
        }) : wx.setStorageSync(o.globalData.wxappStorageName, {
            unionid: o.globalData.unionid,
            wxversion: o.globalData.wxversion
        }), wx.getStorageSync(o.globalData.wxappStorageName).unionid && require("../MFollow.js").generateClickLog({
            unionId: wx.getStorageSync(o.globalData.wxappStorageName).unionid,
            url: o.globalRequestUrl + "/" + a.path,
            sku: n,
            that: o,
            subUnionId: t
        }), r.customerinfo && wx.setStorageSync("customerinfo", r.customerinfo), wx.setStorageSync("appid", o.globalData.appid);
    },
    appTemplateShow: function(a, o) {
        e(a, o);
        var r = require("../onLaunch.js"), t = a.query, n = t.subUnionId ? t.subUnionId : "", i = t.wareId ? t.wareId : "", l = r.getExtConfig();
        r.setStorageAll(t, l, o), wx.getStorageSync(o.globalData.wxappStorageName).unionid && require("../MFollow.js").generateClickLog({
            unionId: wx.getStorageSync(o.globalData.wxappStorageName).unionid,
            url: o.globalRequestUrl + "/" + a.path,
            sku: i,
            that: o,
            subUnionId: n
        }), t.pin && r.getSellerInfo(t, l, o), o.globalConfig.isMessagePush && require("../message_push.js").getOpenIdKey(o.globalRequestUrl, l), 
        a.referrerInfo && a.referrerInfo.extraData && (a.referrerInfo.extraData.customerinfo && wx.setStorageSync("customerinfo", a.referrerInfo.extraData.customerinfo), 
        a.referrerInfo.extraData.unpl && wx.setStorageSync("unpl", a.referrerInfo.extraData.unpl));
    }
};