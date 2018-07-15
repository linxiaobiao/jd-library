var e = require("./util.js");

module.exports = {
    getExtConfig: function() {
        if (wx.getExtConfigSync) {
            var e = wx.getExtConfigSync();
            return console.log("extConfig===", e), e.shopId && (e.shopID = e.shopId, delete e.shopId), 
            e;
        }
        wx.redirectTo({
            url: "pages/upgrade/upgrade"
        });
    },
    setStorageAll: function(e, t, r) {
        var n = r.globalData.wxappStorageName;
        if (t && t.shopID && wx.setStorageSync("shopId", t.shopID), t && t.hasOwnProperty("relatedAppId") && wx.setStorageSync("relatedAppId", t.relatedAppId), 
        t && t.hasOwnProperty("relatedUrl") && wx.setStorageSync("relatedUrl", t.relatedUrl), 
        t && t.hasOwnProperty("relatedIconUrl") && wx.setStorageSync("relatedIconUrl", t.relatedIconUrl), 
        t && t.activityUrl) {
            var o = t.activityUrl.indexOf("?"), a = "wxAppName=Kepler&wxAppId=" + t.appid + "&siteId=WXAPP-JA2016-1", i = "";
            i = o >= 0 ? t.activityUrl + "&" + a : t.activityUrl + "?" + a, wx.setStorageSync("activityUrl", i);
        } else wx.removeStorageSync("activityUrl");
        if (t && t.activityId && wx.setStorageSync("activityId", t.activityId), t && t.wxVersion) {
            var l = wx.getStorageSync(n) || {};
            l.wxversion = t.wxVersion, wx.setStorageSync(n, l);
        }
        if (e.unionId) {
            var s = wx.getStorageSync(n) || {};
            s.unionid = e.unionId, wx.setStorageSync(n, s);
        } else if (t && t.unionid) {
            var p = wx.getStorageSync(n) || {};
            p.unionid = t.unionid, wx.setStorageSync(n, p);
        }
        t && t.appid && wx.setStorageSync("appid", t.appid), t && t.mpChannelId && wx.setStorageSync("mpChannelId", t.mpChannelId), 
        e && e.customerinfo && wx.setStorageSync("customerinfo", e.customerinfo);
    },
    getSellerInfo: function(t, r, n) {
        var o = r && r.shopID, a = t.pin;
        (0, e.request)({
            url: n.globalRequestUrl + "/kwxitem/wxappshare/getSellerInfo.json?pin=" + a + "&shopid=" + o,
            success: function(e) {
                e.value && e.value.sellerid && wx.setStorageSync("extuserid", e.value.sellerid);
            },
            fail: function(t) {
                (0, e.reportErr)("getSellerInfo.json fail: " + t.errMsg);
            }
        });
    }
};