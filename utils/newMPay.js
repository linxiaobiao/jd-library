function e(e) {
    wx.requestPayment({
        timeStamp: e.timeStamp,
        nonceStr: e.nonceStr,
        package: e.package,
        signType: e.signType,
        paySign: e.paySign,
        success: function(s) {
            "requestPayment:ok" == s.errMsg && (wx.redirectTo({
                url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + e.factPrice + "&btnType=primary"
            }), r.sendMsgFront({
                commonId: e.package.split("=")[1],
                businessId: e.submitResult.submitOrder.OrderId,
                businessType: 30008
            }), t.request({
                url: a.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=1&orderId=" + e.submitResult.submitOrder.OrderId,
                success: function(e) {}
            }));
        },
        fail: function(s) {
            t.request({
                url: a.globalRequestUrl + "/kwxp/wx/succeed.json?payResult=0&orderId=" + e.submitResult.submitOrder.OrderId,
                success: function(e) {}
            }), r.messagePush({
                formId: e.package.split("=")[1],
                times: 3,
                type: 30008
            }), "requestPayment:fail cancel" == s.errMsg ? wx.redirectTo({
                url: "../order/order"
            }) : (wx.showModal({
                title: "支付失败",
                confirmText: "我知道了",
                showCancel: !1
            }), setTimeout(function() {
                wx.redirectTo({
                    url: "../order/order"
                });
            }, 500));
        },
        complete: function(e) {
            "requestPayment:cancel" == e.errMsg && wx.redirectTo({
                url: "../order/order"
            });
        }
    });
}

var s = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../components/toast/toast.js")), a = getApp(), t = require("util.js"), r = require("./message_push.js");

module.exports = {
    newGotopay: function(o, d, i) {
        var l = wx.getStorageSync("appid") || "", c = i.formId || null, u = [ "__jda", (a.globalData.__ad__ ? a.globalData.__ad__.jda : wx.getStorageSync("__jda")) + ";" ].join("="), n = [ "__jdv", (a.globalData.__ad__ ? a.globalData.__ad__.jdv : wx.getStorageSync("__jdv")) + ";" ].join("=");
        wx.login({
            success: function(i) {
                var m = i.code;
                if (m) {
                    var p = a.globalRequestUrl + "/kwxp/wx/submitOrderUnion.json", w = o.data.isPasswordModalData.passWordValue, g = {};
                    g = o.data.isPasswordModalData.modalDisplay ? {
                        code: m,
                        appId: l,
                        wxclient: a.globalWxclient ? a.globalWxclient : null,
                        "order.securityPayPassword": w
                    } : {
                        code: m,
                        appId: l,
                        wxclient: a.globalWxclient ? a.globalWxclient : null
                    }, o.data && o.data.presaleData && o.data.presaleData.presaleStepPay && (g.notifyMobile = o.data.usePhoneNum), 
                    t.request({
                        url: p,
                        data: g,
                        selfCookie: "kxcxtype=" + a.globalData.kxcxtype + ";" + u + n,
                        success: function(a) {
                            wx.hideToast();
                            var t = a.submitResult.submitOrder;
                            if (a.flag && t.OrderId > 0) {
                                c && r.messagePush({
                                    formId: c,
                                    times: 1,
                                    type: 30001
                                }), o.setData({
                                    "isPasswordModalData.modalDisplay": !1,
                                    "isPasswordModalData.passwordFocus": !1
                                });
                                var i = t.OrderId, l = t.FactPrice, u = a.skuIdsList;
                                d.order({
                                    eid: "",
                                    orderList: o.strList2ArrObjList(u),
                                    orderid: i,
                                    total: l
                                }), o.data && o.data.isCashOnDelivery ? wx.redirectTo({
                                    url: "../order/order"
                                }) : t.FactPrice > 0 ? e(a) : wx.redirectTo({
                                    url: "../orderSubmitSuccess/orderSubmitSuccess?factPrice=" + a.factPrice + "&btnType=primary"
                                });
                            } else a.submitResult.needPassword ? o.data.isOpenPassword ? o.setData({
                                "isPasswordModalData.modalDisplay": !0,
                                "isPasswordModalData.passwordFocus": !0
                            }) : s.default.show({
                                icon: s.default.icon.error,
                                message: "请到“京东APP-账户设置-账户安全-支付密码”设置支付密码",
                                pageObj: o,
                                duration: 3e3,
                                complete: function() {}
                            }) : 60065 == a.submitResult.submitOrder.MessageType ? (o.setData({
                                "isPasswordModalData.modalDisplay": !1,
                                "isPasswordModalData.passwordFocus": !1
                            }), wx.showModal({
                                content: a.submitResult.submitOrder.Message,
                                showCancel: !1,
                                confirmText: "我知道了",
                                confirmColor: "#f23030",
                                success: function(e) {
                                    e.confirm && o.setData({
                                        "isPasswordModalData.modalDisplay": !0,
                                        "isPasswordModalData.passwordFocus": !0,
                                        "isPasswordModalData.passWordValue": ""
                                    });
                                }
                            })) : wx.showModal({
                                title: "提示",
                                content: a.submitResult.submitOrder.Message,
                                showCancel: !1,
                                confirmText: "我知道了",
                                confirmColor: "#f23030"
                            });
                        },
                        fail: function() {
                            wx.hideToast();
                        },
                        complete: function() {
                            wx.hideToast();
                        }
                    });
                } else console.log("wx.login获取code失败！" + i.errMsg);
            }
        });
    }
};