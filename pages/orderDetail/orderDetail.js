var e = require("../../utils/util.js"), r = require("../../utils/message_push.js"), t = require("../../utils/MPay.js"), o = require("../../utils/keplerReport.js").init(), a = getApp();

Page({
    data: {
        homedir: "/kwxhome",
        canShowMore: !1,
        toast: {
            toastShow: !1,
            toastMsg: ""
        },
        scrollTop: 0,
        windowHeight: 0,
        showIM: !1,
        venderId: "",
        orderId: "",
        isLogin: !1,
        isShowContent: !1,
        locCodeList: [ {
            code: 18780250846,
            endTime: "2017-12-31",
            isExpire: !1
        }, {
            code: 18780250846,
            endTime: "2017-12-31",
            isExpire: !0
        } ],
        isShowLoc: !1,
        isIphoneX: a.globalData.isIphoneX
    },
    onLoad: function(e) {
        var r, t, a = this, n = "", d = e.orderId;
        e.fromPage && "h5" == e.fromPage ? (r = "newUserAllOrderList", t = "") : (r = e.from ? e.from : "", 
        t = e.passKey ? e.passKey : ""), n = "/newAllOrders/queryOrderDetailInfo.json?orderId=" + d + "&from=" + r + "&passKey=" + t, 
        a.getOrderDetail(n), a.setData({
            detailUrl: n,
            orderId: d
        }), o.set({
            urlParam: e,
            title: "订单详情",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        }), wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    windowHeight: e.windowHeight,
                    windowWidth: e.windowWidth
                });
            }
        });
    },
    onShow: function() {
        o.pv();
    },
    checkLogin: function(r) {
        if ("999" == r.code) {
            var t = this;
            return this.setData({
                returnpage: "/pages/orderDetail/orderDetail?orderId=" + t.data.orderId
            }), e.globalLoginShow(this), !1;
        }
        return !0;
    },
    getOrderDetail: function(r) {
        var t = this;
        if (r) {
            var o = getApp().globalRequestUrl + t.data.homedir + r;
            e.request({
                url: o,
                success: t.toViewPage.bind(t)
            });
        }
    },
    goPay: function(e) {
        wx.showToast({
            title: "正在拉起支付",
            icon: "loading",
            mask: !0,
            duration: 1e4
        });
        var r = e.detail.formId, a = "";
        a = this.data.orderDetail.wareInfoList.map(function(e) {
            return e.wareId;
        }).join("_"), o.click({
            eid: "Morder_Orderdetailed_Pay",
            elevel: "",
            eparam: a + "_" + e.currentTarget.dataset.ordertype,
            pname: "",
            pparam: "",
            target: "",
            event: e
        }), t.gotopay({
            orderId: e.currentTarget.dataset.orderid,
            orderType: e.currentTarget.dataset.ordertype,
            orderTypeCode: e.currentTarget.dataset.ordertypecode,
            factPrice: e.currentTarget.dataset.factprice,
            source: "orderDetail",
            formId: r
        });
    },
    toViewPage: function(r) {
        try {
            var t = this;
            if (!t.checkLogin(r)) return;
            var o = t.data.isShowLoc;
            r.isLoc && r.locOrder && r.locOrder.skuInfos && (o = !0, wx.setStorageSync("isOrderLocDetail", !0), 
            r.wareInfoList = r.locOrder.skuInfos), r.newOrderInfo || wx.redirectTo({
                url: "../error/error"
            }), t.setData({
                orderDetail: r,
                showIM: r.newOrderInfo.showIM,
                venderId: r.newOrderInfo.canGoToShop ? r.newOrderInfo.venderId || "" : 1,
                orderId: r.newOrderInfo.orderId,
                isLogin: !!r.desPin,
                isShowContent: !0,
                isShowLoc: o
            }), r.newOrderInfo.cancelProgressText && e.request({
                url: getApp().globalRequestUrl + t.data.homedir + "/newAllOrders/getCancelProgressInfo.json?orderId=" + r.newOrderInfo.orderId + "&shopId=" + r.newOrderInfo.shopId + "&venderId=" + r.newOrderInfo.venderId,
                success: function(e) {
                    var r = {};
                    e && e.refundMsg && e.refundMsg.refundMessage.length && e.refundMsg.refundMessage[0] ? (r = e.refundMsg.refundMessage[0]).status = e.refundMsg.refundState : (r.message = "", 
                    r.time = "", r.status = ""), t.setData({
                        cancelOrderProgress: r
                    });
                }
            }), wx.removeStorageSync("order_detai_updated"), wx.setStorage({
                key: "order_detai_updated",
                data: {
                    updatedOrder: {
                        home_orderdetail_confirm618: r.home_orderdetail_confirm618,
                        orderStatusShow: o && r.locOrder ? r.locOrder.orderStatusDesc : r.newOrderInfo.orderStatusShow,
                        message: r.newOrderInfo.message,
                        orderId: r.newOrderInfo.orderId,
                        buttons: r.newOrderInfo.orderInfoButtons,
                        isOtcSelfOrder: r.newOrderInfo.isOtcSelfOrder,
                        isPreSaleOrder: r.newOrderInfo.isPreSaleOrder,
                        internationalType: r.newOrderInfo.internationalType,
                        orderType: r.newOrderInfo.orderType,
                        payTypeCode: r.newOrderInfo.payTypeCode
                    }
                },
                fail: function() {
                    console.log("set order_detai_updated error in order detail module");
                }
            });
        } catch (r) {
            e.reportErr("order detail toview: " + r.message);
        }
    },
    showMoreWareInfos: function() {
        var e = this.data.canShowMore;
        e = !e, this.setData({
            canShowMore: e
        });
    },
    cancelOrder: function(t) {
        var a = this, n = t.currentTarget.dataset.orderid, d = getApp().globalRequestUrl + a.data.homedir + "/user/cancelOrder.json?orderId=" + n;
        o.click({
            eid: "Morder_Cancel",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: "",
            event: t
        }), wx.showModal({
            content: "是否确定取消该订单？",
            showCancel: !0,
            cancelText: "否",
            confirmText: "是",
            confirmColor: "#f23030",
            success: function(n) {
                n.confirm ? (o.click({
                    eid: "MOrderCenter_CancelConfirm",
                    elevel: "",
                    eparam: "",
                    pname: "",
                    pparam: "",
                    target: "",
                    event: t
                }), e.request({
                    url: d,
                    method: "GET",
                    success: function(e) {
                        "1" == e.cancelResult ? (r.messagePush({
                            formId: t.detail.formId,
                            times: 1,
                            type: 30004
                        }), a.kwxToast({
                            toastMsgUp: "申请提交成功",
                            toastMsgDown: "稍后您可以在本页面顶部查看结果",
                            closeToastCb: function() {
                                a.getOrderDetail(a.data.detailUrl), a.setData({
                                    scrollTop: 0
                                });
                            }
                        })) : a.kwxToast({
                            toastMsgUp: "申请提交失败，请重新尝试！"
                        });
                    },
                    fail: function(r) {
                        e.reportErr(encodeURIComponent("订单详情页cancelOrder操作失败，具体信息：") + r.errMsg);
                    }
                })) : o.click({
                    eid: "MOrderCenter_CancelCancel",
                    elevel: "",
                    eparam: "",
                    pname: "",
                    pparam: "",
                    target: "",
                    event: t
                });
            }
        });
    },
    confirmOrder: function(t) {
        var a = this, n = t.currentTarget.dataset.orderid, d = getApp().globalRequestUrl + a.data.homedir + "/user/confirmGoods.json?orderId=" + n;
        wx.showModal({
            content: "是否确定已收到货品？",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确认",
            confirmColor: "#f23030",
            success: function(o) {
                o.confirm && e.request({
                    url: d,
                    method: "GET",
                    success: function(e) {
                        "true" == e.flag ? (r.messagePush({
                            formId: t.detail.formId,
                            times: 1,
                            type: 30003
                        }), a.getOrderDetail(a.data.detailUrl), a.setData({
                            scrollTop: 0
                        })) : a.kwxToast({
                            toastMsgUp: "无法完成收货，请稍后重试。"
                        });
                    },
                    fail: function(r) {
                        e.reportErr(encodeURIComponent("订单详情页confirmOrder操作失败，具体信息：") + r.errMsg);
                    }
                });
            }
        }), o.click({
            eid: "WOrder_DetailConfirmReceipt",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: "",
            event: t
        });
    },
    kwxToast: function(e) {
        var r = this;
        e = {
            toastMsgUp: e.toastMsgUp || null,
            toastMsgDown: e.toastMsgDown || null,
            closeToastCb: e.closeToastCb || null,
            delay: e.delay || 3e3
        }, r.setData({
            toast: {
                toastShow: !0,
                toastMsgUp: e.toastMsgUp,
                toastMsgDown: e.toastMsgDown
            }
        }), setTimeout(function() {
            r.setData({
                toast: {
                    toastShow: !1
                }
            }), e.closeToastCb && "function" == typeof e.closeToastCb && e.closeToastCb();
        }, e.delay);
    },
    jump2orderTrack: function(e) {
        var r = this.data.lastOptionTime;
        if (0 == r) this.setData({
            lastOptionTime: new Date().getTime()
        }); else {
            if (new Date().getTime() - r < 5e3) return !1;
            this.setData({
                lastOptionTime: new Date().getTime()
            });
        }
        var t = e.currentTarget.dataset.url;
        o.click({
            eid: "Morder_Orderdetailed_Check",
            elevel: "",
            eparam: "",
            pname: "",
            pparam: "",
            target: t,
            event: e
        }), wx.removeStorageSync("order_track_jump_url"), wx.setStorage({
            key: "order_track_jump_url",
            data: {
                trackUrl: t
            },
            fail: function() {
                console.log("set order_track_jump_url error in order module");
            },
            success: function() {
                wx.navigateTo({
                    url: "../orderTrack/orderTrack"
                });
            }
        });
    },
    goToChat: function(e) {
        var r = this, t = getCurrentPages(), o = r.data.isLogin, a = "", n = "entry=" + (a = r.data.orderDetail && r.data.orderDetail.newOrderInfo && r.data.orderDetail.newOrderInfo.canGoToShop ? "pop_m_kpl_order" : "jd_m_kpl_order") + "&venderId=" + r.data.venderId + "&orderId=" + r.data.orderId;
        o && (t.length > 4 ? wx.redirectTo({
            url: "../chat/chat?" + n
        }) : wx.navigateTo({
            url: "../chat/chat?" + n
        }));
    }
});