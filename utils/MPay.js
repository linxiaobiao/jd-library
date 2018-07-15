var e = getApp(), r = require("util.js"), o = require("./message_push.js");

module.exports = {
    gotopay: function(s) {
        if (!s || s == {}) return console.log("request can not be executed without data."), 
        !1;
        var t = s.orderId ? s.orderId : "", c = s.orderType ? s.orderType : "0", n = s.orderTypeCode ? s.orderTypeCode : "0", u = s.factPrice ? s.factPrice : "", d = s.source ? s.source : "", i = wx.getStorageSync("appid") || "", a = s.formId ? s.formId : null;
        wx.login({
            success: function(s) {
                var l = s.code;
                if (l) {
                    var p = "";
                    p = e.globalWxclient ? e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + l + "&orderId=" + t + "&orderType=" + c + "&orderTypeCode=" + n + "&factPrice=" + u + "&appId=" + i + "&wxclient=" + e.globalWxclient : e.globalRequestUrl + "/kwxp/wx/pay.json?code=" + l + "&orderId=" + t + "&orderType=" + c + "&orderTypeCode=" + n + "&factPrice=" + u + "&appId=" + i, 
                    r.request({
                        url: p,
                        success: function(s) {
                            wx.hideToast();
                            var c = s.nonceStr, n = s.timeStamp, i = s.package, l = s.paySign, p = s.signType;
                            a && o.messagePush({
                                formId: a,
                                times: 1,
                                type: 30002
                            }), wx.requestPayment({
                                timeStamp: n,
                                nonceStr: c,
                                package: i,
                                signType: p,
                                paySign: l,
                                success: function(s) {
                                    "requestPayment:ok" == s.errMsg && (o.sendMsgFront({
                                        commonId: i.split("=")[1],
                                        businessId: t,
                                        businessType: 30008
                                    }), r.request({
                                        url: e.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=1&orderId=" + t,
                                        success: function(e) {}
                                    }), wx.redirectTo({
                                        url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + u + "&btnType=primary"
                                    }));
                                },
                                fail: function(s) {
                                    o.messagePush({
                                        formId: i.split("=")[1],
                                        times: 3,
                                        type: 30008
                                    }), r.request({
                                        url: e.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=0&orderId=" + t,
                                        success: function(e) {}
                                    }), "requestPayment:fail cancel" == s.errMsg ? "" == d && wx.redirectTo({
                                        url: "../order/order"
                                    }) : (wx.showModal({
                                        title: "支付失败",
                                        confirmText: "我知道了",
                                        showCancel: !1
                                    }), "" == d && setTimeout(function() {
                                        wx.redirectTo({
                                            url: "../order/order"
                                        });
                                    }, 500));
                                },
                                complete: function(e) {
                                    "requestPayment:cancel" == e.errMsg && "" == d && wx.redirectTo({
                                        url: "../order/order"
                                    });
                                }
                            });
                        },
                        fail: function() {
                            wx.hideToast();
                        },
                        complete: function() {
                            wx.hideToast();
                        }
                    });
                } else console.log("wx.login获取code失败！" + s.errMsg);
            }
        });
    }
};