var t = require("../../utils/util.js"), e = require("../../utils/keplerReport.js").init();

Page({
    data: {
        payType: "",
        factPrice: ""
    },
    onLoad: function(a) {
        t.umpMonitor("2505");
        var i = "";
        i = "primary" == a.btnType ? "微信支付" : "货到付款";
        var r = a.factPrice;
        this.setData({
            payType: i,
            factPrice: r
        }), e.set({
            urlParam: a,
            title: "订单提交",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        e.pv();
    }
});