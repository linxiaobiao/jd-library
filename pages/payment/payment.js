var e = require("../../utils/BuyingPay.js");

Page({
    data: {
        factPrice: "",
        fromType: "payment"
    },
    onLoad: function(r) {
        var t = this;
        this.setData({
            factPrice: r.factPrice ? r.factPrice : ""
        }), (0, e.buyingPay)({
            orderId: r.orderId ? r.orderId : "",
            orderType: r.orderType ? r.orderType : "",
            factPrice: r.factPrice ? r.factPrice : "",
            appId: r.appId ? r.appId : "",
            orderTypeCode: "8"
        }).then(function(e) {
            if ("success" == e.status) {
                var a = r.appkey ? r.appkey : wx.getStorageSync("jdwcx").wxversion;
                wx.redirectTo({
                    url: "../buyingDetails/buyingDetails?sku=" + r.sku + "&orderId=" + r.orderId + "&activeid=" + r.activeid + "&appkey=" + a + "&fromType=" + t.data.fromType + "&source=" + r.source + "&customerinfo=" + r.customerinfo
                });
            }
        }).catch(function(e) {
            "fail_cancel" == e.status ? wx.redirectTo({
                url: "../order/order"
            }) : "unknown_mistake" == e.status && (wx.showModal({
                title: "支付失败",
                confirmText: "我知道了",
                showCancel: !1
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../order/order"
                });
            }, 500));
        });
    }
});