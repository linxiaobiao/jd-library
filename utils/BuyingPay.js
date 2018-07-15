Object.defineProperty(exports, "__esModule", {
    value: !0
});

var e = getApp(), r = require("util.js");

exports.buyingPay = function(t) {
    if (!t || t == {}) return console.log("request can not be executed without data."), 
    !1;
    var a, o = t.orderId ? t.orderId : "", c = t.orderType ? t.orderType : "0", n = t.orderTypeCode ? t.orderTypeCode : "0", s = t.factPrice ? t.factPrice : "", p = wx.getStorageSync("wxappStorageName"), i = (wx.getStorageSync(p), 
    t.appId ? t.appId : wx.getStorageSync("appid") || "");
    return new Promise(function(t, p) {
        wx.login({
            success: function(u) {
                if (a = u.code) {
                    var d = "";
                    d = e.globalWxclient ? e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + a + "&orderId=" + o + "&orderType=" + c + "&orderTypeCode=" + n + "&factPrice=" + s + "&appId=" + i + "&wxclient=" + e.globalWxclient : e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + a + "&orderId=" + o + "&orderType=" + c + "&orderTypeCode=" + n + "&factPrice=" + s + "&appId=" + i, 
                    r.request({
                        url: d,
                        success: function(e) {
                            var r = e.nonceStr, a = e.timeStamp, o = e.package, c = e.paySign, n = e.signType;
                            wx.requestPayment({
                                timeStamp: a,
                                nonceStr: r,
                                package: o,
                                signType: n,
                                paySign: c,
                                success: function(e) {
                                    "requestPayment:ok" == e.errMsg && t({
                                        status: "success"
                                    });
                                },
                                fail: function(e) {
                                    p("requestPayment:fail cancel" == e.errMsg ? {
                                        status: "fail_cancel"
                                    } : {
                                        status: "unknown_mistake"
                                    });
                                },
                                complete: function(e) {
                                    "requestPayment:cancel" == e.errMsg && p({
                                        status: "fail_cancel"
                                    });
                                }
                            });
                        }
                    });
                } else console.log("获取用户登录态失败！" + u.errMsg);
            }
        });
    });
};