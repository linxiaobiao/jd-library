require("../../utils/util.js");

var t = require("../../utils/h5Login.js"), e = require("../../utils/keplerReport.js").init(), o = require("../../utils/individualMark.js"), a = getApp();

Page({
    data: {
        h5Url: "",
        sourceVal: "",
        appkeyVal: "",
        unpl: "",
        customerinfoVal: "",
        ulSkuId: "",
        returnpage: "pages/ftproduct/ftproduct",
        canIUse: wx.canIUse("web-view.src")
    },
    onLoad: function(u) {
        u && u.sku ? this.setData({
            appkeyVal: u.appkey,
            customerinfoVal: u.customerinfo || "",
            sourceVal: u.source,
            ulSkuId: u.sku
        }) : this.setData({
            appkeyVal: wx.getStorageSync("jdwcx").wxversion,
            customerinfoVal: o.getCustomerinfo() || "",
            sourceVal: a.globalData.source,
            ulSkuId: u.ulSkuId,
            unpl: u.unpl ? u.unpl : wx.getStorageSync("unpl") ? wx.getStorageSync("unpl") : ""
        }), console.log(this.data.unpl);
        var n = this, s = "", i = {
            appkey: this.data.appkeyVal,
            source: this.data.sourceVal,
            customerinfo: this.data.customerinfoVal,
            unpl: this.data.unpl
        }, l = JSON.stringify(i), r = encodeURIComponent("https://wqs.jd.com/pingou/kepler/item.shtml?sku=" + n.data.ulSkuId + "#cookie=" + l);
        t.promiseGentoken().then(function(t) {
            console.log(r), 0 == t.data.err_code && (s = t.data.url + "?to=" + r + "&tokenkey=" + t.data.tokenkey, 
            n.setData({
                h5Url: s
            }));
        }, function(t) {
            wx.showToast({
                title: "网络信号较差",
                icon: "loading",
                duration: 3e3
            });
        }), e.set({
            urlParam: u,
            title: "拼购商详",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onReady: function() {},
    onShow: function() {
        e.pv(), wx.showShareMenu();
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = "";
        return t = "" != this.data.unpl ? "/pages/ftproduct/ftproduct?ulSkuId=" + this.data.ulSkuId + "&unpl=" + this.data.unpl : "/pages/ftproduct/ftproduct?ulSkuId=" + this.data.ulSkuId, 
        {
            title: "快来拼团啦！",
            desc: a.shareDesc,
            path: t,
            success: function() {
                console.log(t);
            }
        };
    }
});