var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, t = require("../../components/passwordModal/passwordModal.js"), o = (function(e) {
    e && e.__esModule;
}(require("../../components/toast/toast.js")), require("../../utils/util.js")), n = (require("../../utils/MPay.js"), 
require("../../utils/newMPay.js")), r = (require("../../utils/message_push.js"), 
require("../../utils/keplerReport.js").init()), i = getApp();

Page(Object.assign({}, t.passwordModalObject, {
    data: {
        pDir: "/kwxp",
        isShowContent: !1,
        addressInfo: {},
        commodityInfo: {},
        couponInfo: {},
        invoiceInfo: {},
        payShipMap: {},
        zzfp: !0,
        dzfp: !1,
        gr: !0,
        invoiceShow: !1,
        phoneVal: "",
        emailVal: "",
        phoneTest: !1,
        emailTest: !1,
        invoiceInfoInner: {},
        invoiceContent: [],
        objGift: {},
        loadOption: {
            wareId: "",
            wareNum: ""
        },
        isSupportEleInvoice: !0,
        returnpage: "",
        isfirstload: "0",
        isSupportHDFK: !1,
        picurl: "",
        submitLoading: !1,
        lastOptionTime: 0,
        imageDomain: "",
        mainCommodities: [],
        imgListWidth: 0,
        yunfeeList: [],
        totalInteger: 0,
        totalDecimal: 0,
        stockStatus: "",
        isMidSmallDate: !1,
        isNormalDate: !1,
        isOtherTip: !1,
        isSopTip: !1,
        isOpenPassword: !1,
        isPasswordModalData: {
            passwordShort: !1,
            modalDisplay: !1,
            passwordFocus: !0,
            passWordValue: "",
            mondalHint: ""
        },
        jdBeanObj: {
            jdBeanList: [],
            currentJdBeanIndex: 0,
            jdInfoObj: null,
            isShowRuleInfo: !1,
            isSwitchChecked: !1,
            isAccordRule: !1,
            jdBeanDiscount: 0
        },
        presaleData: {},
        earnestDescription: "",
        presaleUserConfirmation: !1,
        buttonTitle: "微信支付",
        phoneNum: "",
        phoneChange: !1,
        resetDefaultPhoneNum: !0,
        usePhoneNum: "",
        noData: !1,
        noOrderItem: {
            msg: "当前页面出错，请稍后重试"
        },
        isShowLoc: !1,
        isShowAddressPromptMsg: !1,
        cashOnDeliveryYunfeeList: [],
        cashOnDeliveryModal: {
            isShow: !1
        },
        cashOnDeliveryPriceLength: "",
        isIphoneX: i.globalData.isIphoneX,
        isCashOnDelivery: !1
    },
    onLoad: function(e) {
        try {
            wx.setStorageSync("presale", "0"), o.umpMonitor("2503");
            var t = this;
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                mask: !0
            }), t.setScreenInfo(), t.invoice = t.invoiceFunction(t), t.setData({
                loadOption: e
            }), this.data.isfirstload = "1";
            var n = "", a = wx.getStorageSync("sid");
            "presale" == e.proType ? n = i.globalRequestUrl + t.data.pDir + "/norder/wxorder.json?enterOrder=true&isPresale=true&preWareId=" + e.wareId + "&preWareNum=" + e.wareNum : e.wareId ? n = i.globalRequestUrl + t.data.pDir + "/norder/wxorder.json?wareId=" + e.wareId + "&wareNum=" + e.wareNum + "&enterOrder=true" : a ? n = i.globalRequestUrl + t.data.pDir + "/norder/wxorder.json?enterOrder=true&sid=" + a : (console.log("非法请求或者请求时参数丢失"), 
            o.reportErr(encodeURIComponent("非法请求或者请求时参数丢失，参数如下：") + e)), o.request({
                url: n,
                success: t.dealWithOrdeData.bind(t),
                fail: function(e) {
                    o.reportErr(encodeURIComponent("填写订单页onload数据请求request失败，具体信息：") + e.errMsg);
                }
            }), r.set({
                urlParam: e,
                title: "填写订单",
                siteId: "WXAPP-JA2016-1",
                account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
            });
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页onload异常，具体信息：") + e.message);
        }
    },
    onUnload: function() {
        wx.setStorageSync("presale", "0");
    },
    bindKeyInput: function(e) {
        this.setData({
            usePhoneNum: e.detail.value,
            phoneChange: !0
        });
    },
    bindfocusInput: function() {
        this.data.phoneChange || this.setData({
            phoneNum: ""
        }), this.setData({
            phoneChange: !0
        });
    },
    checkPhone: function(e) {
        return /^1[3-9][0-9]{9}$/.test(e);
    },
    setScreenInfo: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.setData({
                    screenHeight: t.windowHeight,
                    screenWidth: t.windowWidth
                });
            }
        });
    },
    onShow: function() {
        try {
            wx.showToast({
                title: "加载中...",
                icon: "loading",
                mask: !0
            });
            var e = this;
            "1" != e.data.isfirstload && o.request({
                url: i.globalRequestUrl + e.data.pDir + "/norder/wxorder.json?tt=" + new Date().getTime(),
                success: e.dealWithOrdeData.bind(e),
                fail: function(e) {
                    o.reportErr(encodeURIComponent("填写订单页onShow数据请求request失败，具体信息：") + e.errMsg);
                }
            }), this.data.isfirstload = "0", r.pv();
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页onShow异常，具体信息：") + e.message);
        }
    },
    checkboxChange: function(e) {
        var t = this;
        this.setData({
            presaleUserConfirmation: !t.data.presaleUserConfirmation
        });
    },
    dealWithOrdeData: function(t) {
        try {
            console.log(t);
            var n = this;
            if ("999" == t.code) {
                var r = "";
                n.data.loadOption && n.data.loadOption.sid && (r = n.data.loadOption.sid);
                var a = "/pages/pay/pay?enterOrder=true&sid=" + r;
                return n.setData({
                    returnpage: a
                }), n.loginModalShow(), !1;
            }
            if (wx.hideToast(), this.setData({
                isOpenMainCommodities: t.isOpenMainCommodities,
                isOpenGiftCard: t.isOpenGiftCard,
                isOpenInvoice: t.isOpenInvoice
            }), t.currentOrder || this.setData({
                noData: !0
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.paymentInfo && t.currentOrder.orderInfo.paymentInfo[0].presaleStepPay && t.currentOrder.orderInfo.address && t.currentOrder.orderInfo.address.Mobile && this.data.resetDefaultPhoneNum && this.setData({
                phoneChange: !1,
                phoneNum: t.currentOrder.orderInfo.address.Mobile,
                resetDefaultPhoneNum: !1,
                usePhoneNum: t.currentOrder.orderInfo.address.Mobile
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.paymentInfo && t.currentOrder.orderInfo.paymentInfo[0].presaleStepPay ? (wx.setStorageSync("presale", "1"), 
            t.currentOrder.orderInfo.paymentInfo[0].step2List[1] && t.currentOrder.orderInfo.paymentInfo[0].step2List[1].valueChange && (t.currentOrder.orderInfo.paymentInfo[0].step2List[1].value = t.currentOrder.orderInfo.paymentInfo[0].step2List[1].valueChange), 
            this.setData({
                presaleData: t.currentOrder.orderInfo.paymentInfo[0]
            })) : wx.setStorageSync("presale", "0"), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.paymentInfo && "2" == t.currentOrder.orderInfo.paymentInfo[0].presaleStepPay && this.setData({
                buttonTitle: "支付定金"
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.earnestDescription && this.setData({
                earnestDescription: t.currentOrder.orderInfo.earnestDescription
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.stockStatus && this.setData({
                stockStatus: t.currentOrder.orderInfo.stockStatus
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.address) {
                if ("" != t.currentOrder.orderInfo.address.Where ? t.currentOrder.orderInfo.address.isNeedAdd = !1 : t.currentOrder.orderInfo.address.isNeedAdd = !0, 
                t.currentOrder.orderInfo.address.addressPromptMsg) {
                    var c = t.currentOrder.orderInfo.address.addressPromptMsg;
                    t.currentOrder.orderInfo.address.addressPromptMsg = c.split(",")[1] ? c.split(",")[1] : "（收货地址中的手机号将用于接受商品消费码）";
                }
                this.setData({
                    addressInfo: t.currentOrder.orderInfo.address
                });
            }
            if (t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.mainCommodities && 1 == t.currentOrder.orderInfo.mainCommodities.length) {
                var s = t.currentOrder.orderInfo.mainCommodities[0];
                if (s.returnGoodsMsg) {
                    var d = s.returnGoodsMsg.split(",");
                    s.returnGoodsMsg = d[1], s.returnGoodColor = d[0];
                }
                s.isLoc && this.setData({
                    isShowLoc: s.isLoc,
                    isShowAddressPromptMsg: !0
                }), s.finalNumShowShow = s.weightAndNum || s.num, this.setData({
                    mainCommodities: t.currentOrder.orderInfo.mainCommodities,
                    commodityInfo: s,
                    picurl: "https://img10.360buyimg.com/n4/" + s.imageUrl
                }), this.justifyStock(this.data.stockStatus) || wx.showModal({
                    title: "提示",
                    content: "所选商品暂时无货，请选择返回上一页或者修改当前收货地址",
                    showCancel: !0,
                    cancelText: "修改地址",
                    confirmText: "回上一页",
                    confirmColor: "#f23030",
                    success: function(e) {
                        e.confirm ? wx.navigateBack() : wx.navigateTo({
                            url: "../addressul/addressul"
                        });
                    }
                });
            }
            if (t.currentOrder && t.currentOrder.orderInfo) {
                var p = {};
                if (p.isShowLoc = this.data.isShowLoc, t.currentOrder.orderInfo.imageDomain && (p.imageDomain = t.currentOrder.orderInfo.imageDomain), 
                t.currentOrder.orderInfo.mainCommodities && t.currentOrder.orderInfo.mainCommodities.length > 1) {
                    p.mainCommodities = t.currentOrder.orderInfo.mainCommodities, p.imgListWidth = 178 * t.currentOrder.orderInfo.mainCommodities.length + "rpx", 
                    p.isShowLoc = !0;
                    for (var l = 0; l < p.mainCommodities.length; l++) p.mainCommodities[l].isLoc ? p.isShowAddressPromptMsg = !0 : p.isShowLoc = !1;
                }
                this.setData(p);
            }
            if (t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.payShipMap && t.currentOrder.orderInfo.payShipMap.sopOtherShipment && !t.currentOrder.orderInfo.payShipMap.otherShipment && !t.currentOrder.orderInfo.payShipMap.jdShipment ? this.setData({
                distributionUrl: "",
                distriHoverClass: "none"
            }) : this.setData({
                distributionUrl: "../distribution/distribution?title=navigate",
                distriHoverClass: "navigator-hover"
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.payShipMap) {
                var u = {};
                t.currentOrder.orderInfo.payShipMap.jdShipment && !t.currentOrder.orderInfo.payShipMap.otherShipment && t.currentOrder.orderInfo.payShipMap.jdShipment.bigItemShipDate && t.currentOrder.orderInfo.payShipMap.jdShipment.midSmallDate ? u.isMidSmallDate = !0 : u.isMidSmallDate = !1, 
                t.currentOrder.orderInfo.payShipMap.jdShipment && !t.currentOrder.orderInfo.payShipMap.jdShipment.bigItemShipDate ? u.isNormalDate = !0 : u.isNormalDate = !1, 
                t.currentOrder.orderInfo.payShipMap.jdShipment || !t.currentOrder.orderInfo.payShipMap.otherShipment || t.currentOrder.orderInfo.payShipMap.otherShipment.bigItemShipDate ? u.isOtherTip = !1 : u.isOtherTip = !0, 
                t.currentOrder.orderInfo.payShipMap.jdShipment || !t.currentOrder.orderInfo.payShipMap.sopOtherShipment || t.currentOrder.orderInfo.payShipMap.otherShipment ? u.isSopTip = !1 : u.isSopTip = !0, 
                this.setData(u);
            }
            if (t.virtualPayNew && this.setData({
                isOpenPassword: t.virtualPayNew.openPaymentPassword,
                "isPasswordModalData.passwordShort": t.virtualPayNew.shortPwd
            }), t.virtualPayNew && t.virtualPayNew.couponInfos && this.setData({
                couponInfo: t.virtualPayNew.couponInfos
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.virtualPay) {
                var v = t.currentOrder.orderInfo.virtualPay;
                if (v.CouponDiscount && "0.0" != v.CouponDiscount || v.FreeFreight && "0.0" != v.FreeFreight) {
                    var m = 0;
                    m = v.CouponDiscount + v.FreeFreight, m = parseFloat(m).toFixed(2), this.setData({
                        sumCouponPri: m
                    });
                } else this.setData({
                    sumCouponPri: ""
                });
            }
            t.currentOrder && t.currentOrder.orderInfo && this.setData({
                isSupportInvoiceImprove: t.currentOrder.orderInfo.isSupportInvoiceImprove
            }), t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.invoice && this.invoiceFn(t.currentOrder.orderInfo.invoice), 
            t.currentOrder && t.currentOrder.orderInfo && t.currentOrder.orderInfo.payShipMap && this.deliveryFn(t.currentOrder.orderInfo.payShipMap), 
            t.currentOrder && t.currentOrder.yunfeeList && n.operatePrice(t.currentOrder.yunfeeList), 
            t.virtualPayNew && t.virtualPayNew.usedJdBeanMap && (t.virtualPayNew.usedJdBeanMap.useJdBeanCount && t.jdBeanList && t.jdBeanList.length > 0 && n.setData({
                "jdBeanObj.currentJdBeanIndex": t.jdBeanList.indexOf(t.virtualPayNew.usedJdBeanMap.useJdBeanCount)
            }), n.setData({
                "jdBeanObj.jdInfoObj": t.virtualPayNew.usedJdBeanMap,
                "jdBeanObj.isAccordRule": !!(t.jdBeanList && t.jdBeanList.length > 0),
                "jdBeanObj.isSwitchChecked": !!t.virtualPayNew.usedJdBeanMap.useJdBeanCount
            })), t.jdBeanList && t.jdBeanList.length > 0 && n.setData({
                "jdBeanObj.jdBeanList": t.jdBeanList
            }), "object" == e(t.availablePaymentType) && "object" == e(t.availablePaymentType[1]) && n.setData({
                isSupportHDFK: !0
            });
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页dealWithOrdeData处理数据方法异常，具体信息：") + e.message);
        }
        n.setData({
            isShowContent: !0
        }), i.globalConfig && i.globalConfig.needBindUserRel && require("../../utils/bindUserRel.js").bindUserRel(), 
        i.globalConfig && i.globalConfig.needUserVisitHistory && require("./option/userVisitHistory.js").userVisitHistory.bind(this, i)();
    },
    operatePrice: function(e) {
        var t = this;
        if (e) {
            this.setData({
                yunfeeList: e
            });
            for (var o = 0; o < e.length; o++) if ("应付总额" == e[o].label) {
                var n = t.devidePrice(e[o].value);
                t.setData({
                    totalInteger: n.integer,
                    totalDecimal: n.decimal
                });
            }
        }
    },
    useJingdou: function(e, t) {
        var n = this;
        wx.showToast({
            title: "请稍后...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        });
        var r = i.globalRequestUrl + n.data.pDir + "/norder/calcYunfeeVm.json?useJdBeanCount=" + e + "&updateFlag=1&IsUseJdBean=" + t;
        o.request({
            url: r,
            method: "get",
            success: function(e) {
                n.operatePrice(e.yunfeeList), e && e.virtualPayNew && e.virtualPayNew.usedJdBeanMap && n.setData({
                    "jdBeanObj.jdInfoObj": e.virtualPayNew.usedJdBeanMap
                });
            },
            complete: function() {
                wx.hideToast();
            },
            fail: function(e) {
                o.reportErr(encodeURIComponent("使用京豆结算失败，具体信息：") + e.errMsg);
            }
        });
    },
    showRuleInfo: function() {
        this.setData({
            "jdBeanObj.isShowRuleInfo": !0
        });
    },
    closeModal: function() {
        this.setData({
            "jdBeanObj.isShowRuleInfo": !1
        });
    },
    jdPickerChange: function(e) {
        var t = this, o = e.detail.value;
        t.useJingdou(t.data.jdBeanObj.jdBeanList[o], !0), t.setData({
            "jdBeanObj.currentJdBeanIndex": o
        });
    },
    jdSwitchChange: function(e) {
        var t = this, o = e.detail.value;
        console.log(o), o ? t.data.jdBeanObj.isAccordRule ? (t.useJingdou(t.data.jdBeanObj.jdBeanList[t.data.jdBeanObj.currentJdBeanIndex], !0), 
        t.setData({
            "jdBeanObj.isSwitchChecked": !0
        })) : t.setData({
            "jdBeanObj.isSwitchChecked": !1,
            "jdBeanObj.isShowRuleInfo": !0
        }) : (t.useJingdou(t.data.jdBeanObj.jdBeanList[t.data.jdBeanObj.currentJdBeanIndex], !1), 
        t.setData({
            "jdBeanObj.isSwitchChecked": !1
        }));
    },
    tapPriceInfoFn: function() {
        wx.showModal({
            title: "价格说明",
            content: "因可能存在系统缓存、页面更新导致价格变动异常等不确定性情况出现,商品售价以本结算价格为准；如有疑问，请您立即联系销售商咨询。",
            showCancel: !1,
            confirmText: "我知道了",
            success: function(e) {
                e.confirm;
            }
        });
    },
    devidePrice: function(e) {
        var t, o, n;
        return t = /^(\d*)(\.\d{2})\d*\D*$/, o = e.replace(t, "$1"), n = e.replace(t, "$2"), 
        {
            integer: o,
            decimal: n
        };
    },
    invoiceFn: function(e) {
        try {
            var t = "", n = "";
            1 == e.IdInvoiceType || 2 == e.IdInvoiceType ? (t = e.invoiceTypeNameText ? e.invoiceTypeNameText : e.InvoiceTypeName + "-", 
            1 == e.IdInvoiceType && 4 == e.IdInvoiceHeaderType ? t += e.InvoiceTitle : t += e.CompanyName) : t = e.invoiceTypeNameText ? e.invoiceTypeNameText : e.InvoiceTypeName + "-" + e.InvoiceTitle, 
            this.data.isSupportInvoiceImprove ? e.InvoiceContentsType && (n += e.InvoiceContentsType) : (e.InvoiceContentsTypeBook && (n = "图书商品-" + e.InvoiceContentsTypeBook), 
            e.InvoiceContentsType && (e.InvoiceContentsTypeBook && (n += " | "), 2 == e.IdInvoiceType ? n += "明细" : n += "非图书商品-" + e.InvoiceContentsType)), 
            e.invoiceName = t, e.invoiceType = n, this.setData({
                invoiceInfo: e
            });
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页invoiceFn异常，具体信息：") + e.message);
        }
    },
    deliveryFn: function(e) {
        try {
            var t = "";
            e.jdShipment && e.jdShipment.name && (t = e.jdShipment.name), e.pickShipment && e.pickShipment.pickName && (t = e.pickShipment.pickName, 
            this.resetShipment()), e.otherShipment && e.otherShipment.name && (t = "第三方快递"), 
            e.sopOtherShipment && e.sopOtherShipment.name && ((e.pickShipment || e.jdShipment || e.otherShipment) && (t += "+"), 
            t += "商家配送"), e.jdShipment && e.jdShipment.midSmallDate && (e.deliverDate = e.jdShipment.midSmallDate), 
            e.jdShipment && e.jdShipment.bigItemShipDate ? e.deliverDate = e.jdShipment.bigItemShipDate : e.otherShipment && e.otherShipment.bigItemShipDate && (e.deliverDate = e.otherShipment.bigItemShipDate), 
            e.jdShipment && e.jdShipment.bigItemInstallDate ? e.installDate = e.jdShipment.bigItemInstallDate : e.otherShipment && e.otherShipment.bigItemInstallDate && (e.installDate = e.otherShipment.bigItemInstallDate), 
            e.deliveryName = t, this.setData({
                payShipMap: e
            });
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页deliveryFn处理数据方法异常，具体信息：") + e.message);
        }
    },
    resetShipment: function() {
        var e = this;
        o.request({
            url: i.globalRequestUrl + e.data.pDir + "/norder/savePaymentShipment.json?order.shipmentId=65&order.paymentId=4",
            success: function(t) {
                e.onShow();
            },
            fail: function(e) {
                o.reportErr(encodeURIComponent("填写订单页resetShipment数据请求request失败，具体信息：") + e.errMsg), 
                wx.navigateTo({
                    url: "../error/error"
                });
            }
        });
    },
    pingClick: function(e, t, o, n, i) {
        r.click({
            eid: e,
            elevel: t,
            eparam: o,
            pname: "",
            pparam: "",
            target: n,
            event: i
        });
    },
    paymentPingClick: function(e) {
        var t = this;
        t.pingClick("MNeworder_PayType", "", "", t.data.distributionUrl, e);
    },
    userAddressPingClick: function(e) {
        this.pingClick("MNeworder_Address", "", "", "../address/address?addressId=0&addressType=add", e);
    },
    couponPingClick: function(e) {
        this.pingClick("MNeworder_Coupons", "", "", "../coupon/coupon?title=navigate", e);
    },
    setInput: function(e) {
        var t = e.currentTarget.dataset.type;
        "phone" == t && this.setData({
            phoneVal: e.detail.value
        }), "email" == t && this.setData({
            emailVal: e.detail.value
        });
    },
    typeClick: function(e) {
        this.invoice.typeClick(e);
    },
    invoiceFunction: function(e) {
        var t = this;
        try {
            return {
                prevent: e,
                invoiceData: null,
                invoiceDataTemp: null,
                typeClick: function(e) {
                    var t = this, o = e.currentTarget.dataset.type;
                    1 == o ? (t.invoiceDataTemp.zzfp = !0, t.invoiceDataTemp.dzfp = !1) : 2 == o && (t.invoiceDataTemp.zzfp = !1, 
                    t.invoiceDataTemp.dzfp = !0), t.prevent.setData({
                        zzfp: t.invoiceDataTemp.zzfp,
                        dzfp: t.invoiceDataTemp.dzfp
                    });
                },
                invoiceShow: function() {
                    var e = this;
                    e.prevent.pingClick("MNeworder_Invoice", "", "", "", ""), o.request({
                        url: i.globalRequestUrl + e.prevent.data.pDir + "/norder/invoice.json?isExposedPay=true",
                        success: function(t) {
                            t.invoiceInfo && t.invoiceInfo.selectedInvoiceType ? (e.invoiceData = {}, e.invoiceData.invoiceInfo = t.invoiceInfo, 
                            e.initInvoiceData(t.invoiceInfo, t.order)) : (e.invoiceData = {}, e.invoiceData.invoiceInfo = t.invoiceInfo, 
                            e.initInvoiceData(null, null)), e.invoiceDataTemp = JSON.parse(JSON.stringify(e.invoiceData)), 
                            e.invoiceView();
                        },
                        fail: function(e) {
                            o.reportErr(encodeURIComponent("填写订单页invoiceShow数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                },
                initInvoiceData: function(e, t) {
                    var o = this;
                    if (e && e.selectedInvoiceType) {
                        if (o.invoiceData.selectedInvoiceType = e.selectedInvoiceType, 1 == o.invoiceData.selectedInvoiceType ? (o.invoiceData.zzfp = !0, 
                        o.invoiceData.dzfp = !1) : (o.invoiceData.zzfp = !1, o.invoiceData.dzfp = !0), e && e.electroInvoice ? (o.invoiceData.phoneVal = e.electroInvoice.invoiceConsigneePhone, 
                        o.invoiceData.emailVal = e.electroInvoice.invoiceConsigneeEmail, o.invoiceData.isSupportEleInvoice = !0) : o.invoiceData.isSupportEleInvoice = !1, 
                        o.invoiceData.hasBookSku = e.hasBookSku, o.invoiceData.hasCommonSku = e.hasCommonSku, 
                        e.normalInvoice) {
                            if (1 == e.hasBookSku && e.normalInvoice.bookInvoiceContent) {
                                o.invoiceData.normalBookSupportContent = e.normalInvoice.bookInvoiceContent.supportContent, 
                                o.invoiceData.normalBookSelectContent = e.normalInvoice.bookInvoiceContent.selectContent;
                                var n = o.transferResult("normalBook", o.invoiceData.normalBookSupportContent);
                                o.getDefaultChecked("normalBook", n);
                            }
                            if (1 == e.hasCommonSku && e.normalInvoice.normalInvoiceContent) {
                                o.invoiceData.normalComSupportContent = e.normalInvoice.normalInvoiceContent.supportContent, 
                                o.invoiceData.normalComSelectContent = e.normalInvoice.normalInvoiceContent.selectContent;
                                var r = o.transferResult("normalCom", o.invoiceData.normalComSupportContent);
                                o.getDefaultChecked("normalCom", r);
                            }
                        }
                        if (e.electroInvoice) {
                            if (1 == e.hasBookSku && e.electroInvoice.bookInvoiceContent) {
                                o.invoiceData.electroBookSupportContent = e.electroInvoice.bookInvoiceContent.supportContent, 
                                o.invoiceData.electroBookSelectContent = e.electroInvoice.bookInvoiceContent.selectContent;
                                var i = o.transferResult("electroBook", o.invoiceData.electroBookSupportContent);
                                o.getDefaultChecked("electroBook", i);
                            }
                            if (1 == e.hasCommonSku && e.electroInvoice.normalInvoiceContent) {
                                o.invoiceData.electroComSupportContent = e.electroInvoice.normalInvoiceContent.supportContent, 
                                o.invoiceData.electroComSelectContent = e.electroInvoice.normalInvoiceContent.selectContent;
                                var a = o.transferResult("electroCom", o.invoiceData.electroComSupportContent);
                                o.getDefaultChecked("electroCom", a);
                            }
                        }
                    } else o.invoiceData.zzfp = !0, o.invoiceData.dzfp = !1;
                    o.invoiceData && o.invoiceData.invoiceInfo && o.invoiceData.invoiceInfo.electroInvoice && (e.hasBookSku && o.invoiceData.invoiceInfo.electroInvoice.bookInvoiceContent && (o.invoiceData.dzfpBooKSendArg = o.invoiceData.invoiceInfo.electroInvoice.bookInvoiceContent.selectContent), 
                    e.hasCommonSku && o.invoiceData.invoiceInfo.electroInvoice.normalInvoiceContent && (o.invoiceData.dzfpComSendArg = o.invoiceData.invoiceInfo.electroInvoice.normalInvoiceContent.selectContent)), 
                    o.invoiceData && o.invoiceData.invoiceInfo && o.invoiceData.invoiceInfo.normalInvoice && (e.hasBookSku && o.invoiceData.invoiceInfo.normalInvoice.bookInvoiceContent && (o.invoiceData.ptfpBooKSendArg = o.invoiceData.invoiceInfo.normalInvoice.bookInvoiceContent.selectContent), 
                    e.hasCommonSku && o.invoiceData.invoiceInfo.normalInvoice.normalInvoiceContent && (o.invoiceData.ptfpComSendArg = o.invoiceData.invoiceInfo.normalInvoice.normalInvoiceContent.selectContent));
                },
                transferResult: function(e, t) {
                    var n = this, r = o.transfer2Array(t);
                    n.invoiceData[e + "SupportContentObject"] = n.getBackJsonArr(r.arrValue), n.invoiceData[e + "SupportContentKey"] = r.arrKey;
                    var i = -1, a = 0;
                    for (var c in t) n.judgInvoiceSelect(c, n.invoiceData[e + "SelectContent"]) && 0 == a && (i = n.getIndexByVal(n.invoiceData[e + "SupportContentKey"], c), 
                    a = 1);
                    return i;
                },
                judgInvoiceSelect: function(e, t) {
                    return e == t;
                },
                getDefaultChecked: function(e, t) {
                    var o = this;
                    -1 != t ? o.invoiceData[e + "SupportContentObject"][t].checked = !0 : o.invoiceData.invoiceInfo.hasBookSku && ("normalBook" == e ? -1 != (t = o.getIndexByVal(o.invoiceData[e + "SupportContentKey"], "-2")) ? o.invoiceData[e + "SupportContentObject"][t].checked = !0 : o.invoiceData[e + "SupportContentObject"][0].checked = !0 : "electroBook" == e && (o.invoiceData[e + "SupportContentObject"][0].checked = !0));
                },
                invoiceView: function() {
                    var e = this;
                    e.prevent.setData({
                        phoneVal: e.invoiceData.phoneVal,
                        emailVal: e.invoiceData.emailVal,
                        zzfp: e.invoiceData.zzfp,
                        dzfp: e.invoiceData.dzfp,
                        invoiceInfoInner: e.invoiceData.invoiceInfo,
                        nrBookArr: e.invoiceData.normalBookSupportContentObject ? e.invoiceData.normalBookSupportContentObject : "",
                        nrComArr: e.invoiceData.normalComSupportContentObject ? e.invoiceData.normalComSupportContentObject : "",
                        dzBookArr: e.invoiceData.electroBookSupportContentObject ? e.invoiceData.electroBookSupportContentObject : "",
                        dzComArr: e.invoiceData.electroComSupportContentObject ? e.invoiceData.electroComSupportContentObject : "",
                        nrBookArrKey: e.invoiceData.normalBookSupportContentKey ? e.invoiceData.normalBookSupportContentKey : "",
                        nrComArrKey: e.invoiceData.normalComSupportContentKey ? e.invoiceData.normalComSupportContentKey : "",
                        dzBookArrKey: e.invoiceData.electroBookSupportContentKey ? e.invoiceData.electroBookSupportContentKey : "",
                        dzComArrKey: e.invoiceData.electroComSupportContentKey ? e.invoiceData.electroComSupportContentKey : "",
                        isSupportEleInvoice: e.invoiceData.isSupportEleInvoice
                    });
                },
                getBackJsonArr: function(e) {
                    for (var t = [], o = 0, n = e.length; o < n; o++) t.push({
                        inner: e[o],
                        checked: !1
                    });
                    return t;
                },
                getIndexByVal: function(e, t) {
                    if (!e || !e.length) return -1;
                    for (var o = 0, n = e.length; o < n; o++) if (e[o] == t) return o;
                },
                invoiveConClick: function(e, t, o, n) {
                    var r = this, i = e.currentTarget.dataset.index, a = r.prevent.data[t];
                    a.forEach(function(e) {
                        e.checked = !1;
                    }), a[i].checked = !0;
                    var c = r.prevent.data[t + "Key"];
                    r.invoiceDataTemp[o + "SupportContentObject"] = a, r.invoiceDataTemp[o + "SupportContentKey"] = c, 
                    r.invoiceDataTemp[n + "SendArg"] = c[i];
                    var s = {};
                    s[t] = a, r.prevent.setData(s);
                },
                invoiceClose: function() {
                    var e = this;
                    o.request({
                        url: i.globalRequestUrl + e.prevent.data.pDir + "/norder/wxorder.json",
                        success: e.prevent.dealWithOrdeData.bind(t),
                        fail: function(e) {
                            o.reportErr(encodeURIComponent("填写订单页invoiceClose数据请求request失败，具体信息：") + e.errMsg);
                        }
                    }), e.prevent.setData({
                        invoiceShow: !1
                    });
                },
                invoiceConfirm: function() {
                    var e = this, t = i.globalRequestUrl + e.prevent.data.pDir + "/norder/updateNormalInvoice.action?personInvoiceTitleContant=" + encodeURIComponent("个人");
                    e.invoiceData.hasBookSku && (t += "&normalInvoiceFormData.idInvoiceContentTypeBook=" + e.invoiceDataTemp.ptfpBooKSendArg), 
                    e.invoiceData.hasCommonSku && (t += "&normalInvoiceFormData.idInvoiceContentsType=" + e.invoiceDataTemp.ptfpComSendArg), 
                    o.request({
                        url: t,
                        success: function(t) {
                            var o = getCurrentPages();
                            o && o.data && wxPrevPage.data.presaleData && o.data.presaleData.presaleStepPay && 2 == o.data.presaleData.presaleStepPay && (o.data.resetDefaultPhoneNum = !0), 
                            e.invoiceData = e.invoiceDataTemp, e.invoiceClose();
                        },
                        fail: function(e) {
                            o.reportErr(encodeURIComponent("填写订单页invoiceConfirm数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                },
                dzInvoiceConfirm: function() {
                    var e = this, t = new RegExp("^(1)[0-9]{10}$");
                    if (e.prevent.data.phoneVal != e.invoiceData.phoneVal && !t.test(e.prevent.data.phoneVal)) return e.prevent.setData({
                        phoneTest: !0
                    }), !1;
                    if (null != e.prevent.data.emailVal && e.prevent.data.emailVal.length > 40) return !1;
                    var n = i.globalRequestUrl + e.prevent.data.pDir + "/norder/updateEleInvoice.action?dzpInvoiceFormData.electroInvoiceEmail=" + e.prevent.data.emailVal + "&dzpInvoiceFormData.electroInvoicePhone=" + e.prevent.data.phoneVal + "&dzpInvoiceFormData.idInvoiceHeaderType=4";
                    e.invoiceData.hasBookSku && (n += "&dzpInvoiceFormData.idInvoiceContentTypeBook=" + e.invoiceDataTemp.dzfpBooKSendArg), 
                    e.invoiceData.hasCommonSku && (n += "&dzpInvoiceFormData.idInvoiceContentsType=" + e.invoiceDataTemp.dzfpComSendArg), 
                    o.request({
                        url: n,
                        success: function(t) {
                            e.invoiceData = e.invoiceDataTemp, e.invoiceClose();
                        },
                        fail: function(e) {
                            o.reportErr(encodeURIComponent("填写订单页dzInvoiceConfirm数据请求request失败，具体信息：") + e.errMsg);
                        }
                    });
                }
            };
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页invoiceFunction处理数据方法异常，具体信息：") + e.message);
        }
    },
    invoiceInit: function() {
        this.invoice.invoiceShow(), this.setData({
            invoiceShow: !0,
            phoneTest: !1,
            emailTest: !1
        });
    },
    invoiceClose: function() {
        this.setData({
            invoiceShow: !1
        });
    },
    invoiceConfirm: function() {
        this.invoice.invoiceConfirm();
    },
    dzInvoiceConfirm: function() {
        this.invoice.dzInvoiceConfirm();
    },
    nrBookClick: function(e) {
        this.invoice.invoiveConClick(e, "nrBookArr", "normalBook", "ptfpBooK");
    },
    nrComClick: function(e) {
        this.invoice.invoiveConClick(e, "nrComArr", "normalCom", "ptfpCom");
    },
    dzBookClick: function(e) {
        this.invoice.invoiveConClick(e, "dzBookArr", "electroBook", "dzfpBooK");
    },
    dzComClick: function(e) {
        this.invoice.invoiveConClick(e, "dzComArr", "electroCom", "dzfpCom");
    },
    loginModalShow: function() {
        o.globalLoginShow(this);
    },
    submitOrder: function(e) {
        if (this.data.phoneChange && !this.checkPhone(this.data.usePhoneNum) || this.data.phoneChange && "" == this.data.usePhoneNum) wx.showModal({
            title: "提示",
            content: "请输入11位正确的手机号码",
            success: function(e) {
                e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
            }
        }); else {
            var t = this;
            !this.data.presaleData.presaleStepPay || this.data.presaleUserConfirmation ? this.submitOrderSecondStage(e) : wx.showModal({
                title: "提示",
                content: "预售商品定金不支持退款，同意后可继续下单",
                confirmText: "同意下单",
                cancelText: "再想想",
                success: function(o) {
                    o.confirm ? t.submitOrderSecondStage(e) : o.cancel && console.log("用户点击取消");
                }
            });
        }
    },
    submitOrderSecondStage: function(e) {
        try {
            o.umpMonitor("2504"), this.data && this.data.cashOnDeliveryModal && this.data.cashOnDeliveryModal.isShow && this.setData({
                cashOnDeliveryModal: {
                    isShow: !1
                }
            });
            var t = e.detail.formId, a = this.data.lastOptionTime;
            if (0 == a) this.setData({
                lastOptionTime: new Date().getTime()
            }); else if (new Date().getTime() - a < 5e3) return !1;
            var c = this;
            if (this.justifyStock(this.data.stockStatus)) {
                wx.showToast({
                    title: "正在提交订单",
                    icon: "loading",
                    mask: !0,
                    duration: 1e4
                });
                i.globalRequestUrl, c.data.pDir;
                var s = c.data.isPasswordModalData.passWordValue;
                c.data.isPasswordModalData.modalDisplay, [ "__jda", (i.globalData.__ad__ ? i.globalData.__ad__.jda : wx.getStorageSync("__jda")) + ";" ].join("="), 
                [ "__jdv", (i.globalData.__ad__ ? i.globalData.__ad__.jdv : wx.getStorageSync("__jdv")) + ";" ].join("=");
                this.data.presaleData && this.data.presaleData.presaleStepPay ? this.pingClick("MNeworder_Submit", "", "C", "", e) : this.pingClick("MNeworder_Submit", "", "A", "", e);
                var d = {
                    formId: t
                };
                n.newGotopay(c, r, d);
            } else wx.showModal({
                title: "提示",
                content: "所选商品/赠品部分无货，请选择返回购物车或者去除无货商品重新下单",
                showCancel: !0,
                cancelText: "去除无货",
                confirmText: "回上一页",
                confirmColor: "#f23030",
                success: function(e) {
                    e.confirm ? wx.navigateBack() : o.request({
                        url: i.globalRequestUrl + c.data.pDir + "/norder/removeCommodityFromOrder.action?stockStatusValue=无货",
                        method: "POST",
                        success: function(e) {
                            c.onShow();
                        },
                        fail: function(e) {
                            o.reportErr(encodeURIComponent("去除无货removeCommodityFromOrder.action数据异常，具体信息：") + e.errMsg);
                        }
                    });
                }
            });
        } catch (e) {
            o.reportErr(encodeURIComponent("填写订单页submitOrder处理数据方法异常，具体信息：") + e.message);
        }
    },
    justifyStock: function(e) {
        return !(!e || 1 == e || 3 == e);
    },
    strList2ArrObjList: function(e) {
        for (var t = {}, o = 0; o < e.length; o++) t[e[o]] = 1;
        return t;
    },
    gotoInvoice: function() {
        this.data.isSupportInvoiceImprove ? this.chooseFacture() : this.invoiceInit();
    },
    chooseFacture: function() {
        this.pingClick("MNeworder_Invoice", "", "", "", ""), wx.navigateTo({
            url: "../facture/facture"
        });
    },
    showModalCashOnDelivery: function() {
        var e = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), o.request({
            url: i.globalRequestUrl + e.data.pDir + "/norder/savePaymentType.json",
            data: {
                idPaymentType: 1
            },
            method: "POST",
            success: function(t) {
                if (e.data.cashOnDeliveryModal = {
                    isShow: !0
                }, t && t.currentOrder && t.currentOrder.yunfeeList && t.currentOrder.yunfeeList.length > 0) {
                    for (var o = 0, n = 0, r = 0; r < t.currentOrder.yunfeeList.length; r++) {
                        var i = t.currentOrder.yunfeeList[r];
                        "运费" == i.label ? o = i.value.length : "应付总额" == i.label && (n = i.value.length);
                    }
                    for (var a = "", c = 0; c < n - o; c++) a += "0";
                    e.setData({
                        cashOnDeliveryModal: e.data.cashOnDeliveryModal,
                        cashOnDeliveryYunfeeList: t.currentOrder.yunfeeList,
                        cashOnDeliveryPriceLength: a,
                        isCashOnDelivery: !0
                    });
                } else wx.showModal({
                    title: "提示",
                    content: "页面已经过期了,返回购物车看看吧",
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: "#f23030"
                });
            },
            fail: function(e) {
                o.reportErr(encodeURIComponent("货到付款参数数据请求request失败，具体信息：") + e.errMsg);
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    cancelCashOnDelivery: function() {
        var e = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), o.request({
            url: i.globalRequestUrl + e.data.pDir + "/norder/savePaymentType.json",
            data: {
                idPaymentType: 4
            },
            method: "POST",
            success: function(t) {
                t && t.currentOrder && t.currentOrder.yunfeeList && t.currentOrder.yunfeeList.length > 0 || wx.showModal({
                    title: "提示",
                    content: "页面已经过期了,返回购物车看看吧",
                    showCancel: !1,
                    confirmText: "我知道了",
                    confirmColor: "#f23030"
                }), e.closecashOnDeliveryModal();
            },
            fail: function(e) {
                o.reportErr(encodeURIComponent("货到付款参数数据请求request失败，具体信息：") + e.errMsg);
            },
            complete: function() {
                wx.hideToast();
            }
        });
    },
    closecashOnDeliveryModal: function() {
        this.setData({
            "cashOnDeliveryModal.isShow": !1,
            isCashOnDelivery: !1
        });
    }
}));