var a = require("../../utils/h5Login.js"), t = require("../../utils/individualMark.js"), e = getApp();

Page({
    data: {
        h5Url: "",
        sku: "",
        orderId: "",
        activeid: "",
        appkey: "",
        tuanid: "",
        fromType: "",
        sourceVal: "",
        appkeyVal: "",
        customerinfoVal: ""
    },
    onLoad: function(i) {
        console.log(i), this.setData({
            sku: i.sku,
            orderId: i.orderId,
            activeid: i.activeid,
            appkey: i.appkey,
            fromType: i.fromType,
            appkeyVal: wx.getStorageSync("jdwcx").wxversion,
            customerinfoVal: i.customerinfo ? i.customerinfo : t.getCustomerinfo(),
            sourceVal: i.source ? i.source : e.globalData.source
        }), i.tuanid && this.setData({
            tuanid: i.tuanid
        });
        var s = this, o = "", d = "", r = {
            appkey: this.data.appkeyVal,
            source: this.data.sourceVal,
            customerinfo: this.data.customerinfoVal
        }, u = JSON.stringify(r);
        d = i.fromType && "payment" == i.fromType ? encodeURIComponent("https://wqs.jd.com/pingou/kepler/detail.shtml?sku=" + i.sku + "&dealId=" + i.orderId + "&activeid=" + i.activeid + "&appkey=" + i.appkey) : encodeURIComponent("https://wqs.jd.com/pingou/kepler/detail.shtml?sku=" + i.sku + "&dealId=" + i.orderId + "&activeid=" + i.activeid + "&tuanid=" + i.tuanid + "#cookie=" + u), 
        a.promiseGentoken().then(function(a) {
            0 == a.data.err_code && (o = a.data.url + "?to=" + d + "&tokenkey=" + a.data.tokenkey, 
            s.setData({
                h5Url: o
            }));
        });
    },
    onShow: function() {},
    onShareAppMessage: function() {
        var a = "";
        return a = this.data.tuanid ? "/pages/buyingDetails/buyingDetails?sku=" + this.data.sku + "&orderId=" + this.data.orderId + "&activeid=" + this.data.activeid + "&appkey=" + this.data.appkey + "&source=" + this.data.sourceVal + "&customerinfo=" + this.data.customerinfoVal + "&tuanid=" + this.data.tuanid : "/pages/buyingDetails/buyingDetails?sku=" + this.data.sku + "&orderId=" + this.data.orderId + "&activeid=" + this.data.activeid + "&appkey=" + this.data.appkey + "&source=" + this.data.sourceVal + "&customerinfo=" + this.data.customerinfoVal, 
        {
            title: "快来拼团啦！",
            desc: e.shareDesc,
            path: a
        };
    }
});