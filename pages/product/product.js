function a(e, a, o) {
    return a in e ? Object.defineProperty(e, a, {
        value: o,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[a] = o, e;
}

var o, t = function(e) {
    return e && e.__esModule ? e : {
        default: e
    };
}(require("../../components/toast/toast.js")), r = getApp(), s = require("../../utils/util.js"), n = require("../../utils/keplerReport.js").init(), i = require("../../wxParse/wxParse.js"), d = require("../../utils/message_push.js"), l = require("../../utils/Ad.js"), u = {}, c = require("./modules/loc/loc.js"), p = require("./modules/reservation/reservation.js"), w = require("./modules/service/service.js");

r.globalConfig && r.globalConfig.haveAuthorFloor && (u = require("../author/bookAuthor.js").bookAuthor);

var f = {};

r.globalConfig && r.globalConfig.haveSlidebar && (f = require("../../components/slidebar/slidebar.js").slidebar), 
Page(Object.assign({}, u, f, c, p, w, {
    data: (o = {
        productDir: "/kwxitem",
        pDir: "/kwxp",
        isShowContent: !1,
        screenHeight: 0,
        screenWidth: 0,
        wareId: "",
        wareInfo: [],
        skuColorSize: [],
        currentColorSize: null,
        indicatorDots: !0,
        autoplay: !1,
        duration: 200,
        couponList: {},
        couponOpen: "icon-arrow-down",
        couponClass: "coupon-down",
        promotionClass: "promotion-down",
        promotionOpen: "icon-arrow-down",
        couponTitle: "",
        couponType: "",
        couponPopupsShow: "none",
        codeKey: "",
        vcodeUrl: "",
        inputVcode: "",
        couponRequestUrl: "",
        errorMsg: "",
        imgHeight: [],
        detailImgIndex: 0,
        detailImgUrls: [],
        assessImgWidth: 0,
        assessImgHeight: 0,
        detailOpen: "icon-arrow-down",
        detailShow: "none",
        loadnone: !1,
        scrollPostion: 0,
        promiseOpen: "icon-arrow-down",
        promiseClass: "promise-down",
        serviceWrapClass: "service-wrap-hide",
        shadeClass: "back-shade-hide",
        toTopDisplay: "none",
        buyNumTip: "",
        buyNumValue: 1,
        leftLimited: "1",
        rightLimited: "0",
        scrollTop: 0,
        wareComment: {},
        commentPercent: "",
        currentPromotionSize: 0,
        privoinceName: "",
        cityName: "",
        countryName: "",
        townName: "",
        privoinceId: "",
        cityId: "",
        countryId: "",
        townId: "",
        isBuy: !1,
        navigatorToThirdAddress: "navigatorToThirdAddress",
        buyDisabled: !1,
        buyLoading: !1,
        commentDisabled: !1,
        hasDetail: !0,
        returnpage: "",
        fromPageLevel: "",
        colorSelClass: "selected",
        sizeSelClass: "selected",
        specSelClass: "selected",
        selectedtap: "",
        jdPriceErr: " ",
        buyBtnText: "立即购买",
        detailFirstComplete: !1,
        wxParseItem: {
            scaleParentStyle: "",
            scaleBoxStyle: ""
        },
        isDegrade: !1,
        cartNum: 0,
        isCartNumShow: !1,
        lowestBuy: !1,
        lowestBuyNum: 1,
        noBuyInfoTxt: "该商品暂不支持在此购买，非常抱歉！",
        isNoBuyInfoHide: !0,
        hasChat: !1,
        countTimeObj: null,
        haveAuthorFloor: !1,
        countDownTimer: -1,
        yuYue: {
            isYuYue: !1,
            buyStartTime: 0,
            buyEndTime: 0,
            yuYueType: 1,
            yuYueStartTime: 0,
            countDownText: "距结束还剩：",
            isNoCountTime: !1
        },
        isShowReasonTips: !1,
        yuShou: {
            isYuShou: !1,
            countDownText: "距结束还剩：",
            isYuShouDeposit: !1,
            yuShouPrice: null
        },
        modal: {
            isShow: !1,
            title: "",
            txtList: [],
            textAlign: "left",
            buttons: []
        }
    }, a(o, "haveAuthorFloor", !1), a(o, "haveSlidebar", !1), a(o, "slidebarData", []), 
    a(o, "isShowLoc", !1), a(o, "locVenderInfo", null), a(o, "locIconList", [ {
        img: "http://newbuz.360buyimg.com/jingshop/product/product_loc_process_1.png",
        text: "选择商品及门店"
    }, {
        img: "http://newbuz.360buyimg.com/jingshop/product/product_loc_process_2.png",
        text: "付款成功"
    }, {
        img: "http://newbuz.360buyimg.com/jingshop/product/product_loc_process_3.png",
        text: "获取消费码"
    }, {
        img: "http://newbuz.360buyimg.com/jingshop/product/product_loc_process_4.png",
        text: "到店服务"
    } ]), a(o, "isIphoneX", r.globalData.isIphoneX), o),
    onLoad: function(e) {
        console.log("options_product=======", e);
        var a = this;
        if (a.getOptionParam(e), s.umpMonitor("2501"), n.set({
            urlParam: e,
            skuid: e.wareId,
            title: "商品详情",
            shopid: "",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        }), l.reportAdsData(e), r.globalConfig && r.globalConfig.haveAuthorFloor && this.setData({
            haveAuthorFloor: r.globalConfig.haveAuthorFloor
        }), r.globalConfig && r.globalConfig.haveSlidebar) {
            var o = Object.assign({}, {
                slidebarData: r.globalConfig.slidebarData
            }, f);
            this.setData({
                haveSlidebar: r.globalConfig.haveSlidebar,
                slidebarData: o
            });
        }
        if ("" != e.extendUrl && null != e.extendUrl) {
            this.data.extendUrl = e.extendUrl, this.data.JingfenUnionid = e.JingfenUnionid, 
            this.data.JingfenType = e.JingfenType;
            var t = e.wareId ? e.wareId : "";
            a.pageLoadData(e, t);
        } else if ("" != e.spreadUrl && null != e.spreadUrl) {
            var i = require("../../utils/getUnplUnion.js"), d = require("./option/productUnionJump");
            i.getUnplUnion({
                url: e.spreadUrl,
                jda: wx.getStorageSync("__jda") || "",
                pin: wx.getStorageSync("jdlogin_pt_pin") || "",
                wxUnionId: wx.getStorageSync("appid") || "",
                openId: wx.getStorageSync("openId") || "",
                sourceAppid: e.appId || "",
                successCb: function(o) {
                    var t = d.judgmentJump(r, o);
                    t && a.pageLoadData(e, t);
                },
                failCb: function() {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                }
            });
        } else {
            var u = e.wareId ? e.wareId : "";
            a.pageLoadData(e, u);
        }
        if (r.globalConfig && r.globalConfig.needDocumentary) {
            var c = require("./option/product_documentary.js"), p = wx.getStorageSync("wxappStorageName") || "";
            p && c.trackOrderFn(p, e.wareId, r);
        }
        a.setLocVenderInfo(e);
    },
    pageLoadData: function(e, a) {
        var o = this, t = this, n = t.getSelfCookie();
        s.request({
            url: r.globalRequestUrl + t.data.productDir + "/ware/view.json?wareId=" + a,
            selfCookie: n,
            success: t.toViewPage.bind(t),
            complete: function() {
                o.setData({
                    isShowContent: !0
                }), o.couponRequestSync(e);
            },
            fail: function(e) {
                t.setData({
                    jdPriceErr: "价格异常",
                    buyBtnText: "立即购买"
                }), t.goErrorPage(), s.reportErr("item view.json: " + e.errMsg);
            }
        }), wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        }), this.assessImg(t.data.screenWidth, 10, 10, 4);
    },
    goErrorPage: function() {
        wx.redirectTo({
            url: "../error/error?thisBarTitle=商品详情"
        });
    },
    onShow: function() {
        n.pv();
        var e = this;
        this.setData({
            navigatorToThirdAddress: "navigatorToThirdAddress",
            buyLoading: !1,
            buyDisabled: !1,
            commentDisabled: !1
        }), this.firstCheckIsLogin(), e.updateAddressData(), e.updateCartNum();
        var a = wx.getStorageSync("jdlogin_pt_key");
        if (r.globalConfig && r.globalConfig.isOperatorTemplate && a) {
            var o = require("../../utils/bindUserRel.js");
            console.log("用户是登录状态，准备绑定分佣关系"), o.bindUserRel(this.globalRequestUrl);
        }
    },
    onUnload: function() {
        this.data.countDownTimer && clearInterval(this.data.countDownTimer);
    },
    couponRequestSync: function(e) {
        var a = this;
        s.request({
            url: r.globalRequestUrl + a.data.productDir + "/coupon/coupon.json?wareId=" + e.wareId,
            success: a.toViewCouponPage.bind(a),
            complete: a.assessRequestSync.bind(a, e),
            fail: function(e) {
                s.reportErr("item coupon.json: " + e.errMsg);
            }
        });
    },
    assessRequestSync: function(e) {
        var a = this;
        s.request({
            url: r.globalRequestUrl + a.data.productDir + "/ware/getDetailCommentList.json?wareId=" + e.wareId,
            success: a.toViewCommentPage.bind(a),
            complete: a.cartNumRequestSync,
            fail: function(e) {
                s.reportErr("item getDetailCommentList.json: " + e.errMsg);
            }
        });
    },
    cartNumRequestSync: function() {
        var e = this;
        s.request({
            url: r.globalRequestUrl + e.data.pDir + "/cart/cart.json?ttt=" + new Date().getTime(),
            success: e.toViewCartNum.bind(e),
            fail: function(e) {
                s.reportErr(encodeURIComponent("请求购物车数据失败，具体信息：") + e.errMsg);
            }
        });
    },
    bigPicPreview: function(e) {
        for (var a = this, o = [], t = 0; t < a.data.wareInfo.ware.images.length; t++) o.push(a.data.wareInfo.ware.images[t].kwxpath);
        this.unionClick("MProductdetail_Photo", "5", "", "../bigPic/bigPic?wareId=" + a.data.wareId, e), 
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: o
        });
    },
    onShareAppMessage: function() {
        var e = this, a = wx.getStorageSync("jd_guiderId");
        return a ? {
            title: e.data.wareInfo.ware.wname,
            desc: r.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId + "&guiderId=" + a
        } : this.data.extendUrl ? {
            title: e.data.wareInfo.ware.wname,
            desc: r.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId + "&spreadUrl=" + e.data.extendUrl,
            success: function(a) {
                e.data.JingfenUnionid && e.data.JingfenType && n.click({
                    eid: "WProductDetail_ShareSuccess",
                    elevel: "",
                    eparam: e.data.JingfenUnionid + "_" + e.data.JingfenType,
                    pname: "",
                    pparam: "",
                    target: "",
                    event: ""
                });
            }
        } : {
            title: e.data.wareInfo.ware.wname,
            desc: r.shareDesc,
            path: "/pages/product/product?wareId=" + e.data.wareId
        };
    },
    toViewPage: function(e) {
        var a = this;
        if (e && e.ware) {
            if (e.ware.jumpH5Flag) return void wx.redirectTo({
                url: "../ftproduct/ftproduct?ulSkuId=" + e.ware.wareId
            });
            if (a.data.wareInfo = e, a.data.wareId = e.ware.wareId, e.ware.servIconList = a.operateIconList(e.ware.servIconList, e.ware), 
            e.ware.locInfo && e.ware.locInfo.storeGroupId && e.ware.venderId && (a.data.storeGroupId = e.ware.locInfo.storeGroupId, 
            a.data.venderId = e.ware.venderId, a.setData({
                isShowLoc: !!e.ware.locInfo.isloc
            })), e.ware.miaosha ? a.countDown(e.ware.miaoshaRemainTime) : a.data.countDownTimer && clearInterval(a.data.countDownTimer), 
            e.ware.skuColorSizeHandler && (a.operaColor(e.ware.skuColorSizeHandler), a.data.skuColorSize = e.ware.skuColorSizeHandler.skuColorSize.colorSize, 
            a.data.currentColorSize = e.ware.skuColorSizeHandler.currentColorSize), e.proInformation) {
                var o = 0, t = 0;
                if (e.proInformation.giftList && e.proInformation.giftList.length > 0 && (o = e.proInformation.giftList.length), 
                e.proInformation.activityList && e.proInformation.activityList.length > 0) for (var r = 0; r < e.proInformation.activityList.length; r++) e.proInformation.activityList[r] && e.proInformation.activityList[r].text && t++;
                a.data.currentPromotionSize = o + t;
            }
            if (e.ware.lowestBuy && e.ware.lowestBuyNum && (a.data.lowestBuy = e.ware.lowestBuy, 
            a.data.lowestBuyNum = e.ware.lowestBuyNum, a.data.buyNumValue = e.ware.lowestBuyNum), 
            e.ware.shopInfo && e.ware.shopInfo.customerService) {
                var s = e.ware.shopInfo.customerService;
                a.data.hasChat = s.hasChat;
            }
            e.ware.yuShouInFo && e.ware.yuShouInFo.isYuShou && !e.ware.miaosha ? (a.data.yuShou.isYuShou = !0, 
            a.operateYuShou(e)) : a.data.yuShou.isYuShou = !1, !(e && e.yuYue && e.yuYue.isYuYue) || e.ware.miaosha || e.ware.yuShouInFo && e.ware.yuShouInFo.isYuShou ? a.data.yuYue.isYuYue = !1 : a.operateYuYue(e), 
            a.setData({
                wareInfo: a.data.wareInfo,
                jdPriceErr: "价格异常",
                wareId: a.data.wareId,
                skuColorSize: a.data.skuColorSize,
                currentColorSize: a.data.currentColorSize,
                currentPromotionSize: a.data.currentPromotionSize,
                lowestBuy: a.data.lowestBuy,
                lowestBuyNum: a.data.lowestBuyNum,
                buyNumValue: a.data.buyNumValue,
                hasChat: a.data.hasChat,
                yuYue: a.data.yuYue,
                yuShou: a.data.yuShou,
                isShowReasonTips: a.data.isShowReasonTips
            });
        } else a.goErrorPage();
        a.getBuyStatus();
    },
    toViewCouponPage: function(e) {
        if (e.coupon) {
            var a = JSON.parse(e.coupon);
            this.setData({
                couponList: a
            });
        }
    },
    couponOpenFn: function(e) {
        "coupon-down" == this.data.couponClass ? this.setData({
            couponClass: "coupon-up",
            couponOpen: "icon-arrow-up"
        }) : "coupon-up" == this.data.couponClass && this.setData({
            couponClass: "coupon-down",
            couponOpen: "icon-arrow-down"
        }), this.unionClick("WProductDetail_CouponUnfold", "", "", "", e);
    },
    firstCheckIsLogin: function() {
        var e = this;
        s.request({
            url: r.globalRequestUrl + e.data.productDir + "/wxdetail/isLogin.json?fromType=wxapp",
            selfCookie: e.getSelfCookie(),
            success: function(a) {
                "999" == a.code ? e.setData({
                    isLogin: !1
                }) : e.setData({
                    isLogin: !0
                });
            },
            fail: function(e) {
                s.reportErr("item isLogin.json fail: " + e.errMsg);
            }
        });
    },
    tapCoupon: function(e) {
        var a = this;
        this.unionClick("WProductDetail_GetCoupon", "", e.currentTarget.dataset.roleid, "", e);
        var o = "";
        o = this.data.extendUrl ? "/pages/product/product?wareId=" + this.data.wareId + "&extendUrl=" + this.data.extendUrl : "/pages/product/product?wareId=" + this.data.wareId, 
        this.getLoginState({
            event: e,
            returnUrl: o,
            success: function() {
                a.data.couponList[e.currentTarget.dataset.idx].applicability && a.receiveCoupon.bind(a, e)();
            },
            isRedirect: !0
        });
    },
    receiveCoupon: function(e) {
        var a = this, o = e.detail.formId, n = r.globalData.wxCookie, i = n.getCookie("shshshfp"), l = n.getCookie("shshshfpa"), u = n.getCookie("shshshfpb"), c = r.globalRequestUrl + this.data.productDir + "/coupon/getNewActiveCoupon.json?sku=" + this.data.wareId + "&discount=" + e.currentTarget.dataset.discount + "&encryptedKey=" + e.currentTarget.dataset.encryptedkey + "&roleId=" + e.currentTarget.dataset.roleid + "&isPop=" + a.data.wareInfo.ware.isPop + "&shshshfp=" + i + "&shshshfpa=" + l + "&shshshfpb=" + u;
        this.setData({
            seledCouponIndex: e.currentTarget.dataset.idx,
            couponTitle: e.currentTarget.dataset.name,
            couponRequestUrl: c,
            errorMsg: ""
        }), this.data.wareInfo.ware.isPop ? this.couponRequest(this.data.couponRequestUrl, o) : s.request({
            url: r.globalRequestUrl + a.data.productDir + "/coupon/couponDetail.json",
            data: {
                wareId: a.data.wareId,
                isPop: a.data.wareInfo.ware.isPop
            },
            success: function(e) {
                d.messagePush({
                    formId: o,
                    times: 1,
                    type: 20001
                }), a.setData({
                    couponPopupsShow: "block",
                    codeKey: e.codeKey,
                    vcodeUrl: r.globalRequestUrl + a.data.productDir + "/authCode/authCodePinImg.action?key=" + e.codeKey
                });
            },
            fail: function(e) {
                t.default.show({
                    icon: t.default.icon.error,
                    message: "领取失败，看看别的优惠券吧",
                    pageObj: a
                }), s.reportErr("item couponDetail.json: " + e.errMsg);
            }
        });
    },
    couponRequest: function(e, a) {
        var o = this;
        s.request({
            url: e,
            success: function(e) {
                a && d.messagePush({
                    formId: a,
                    times: 1,
                    type: 20001
                }), e && e.couponResult ? (o.data.couponList[o.data.seledCouponIndex].applicability = !1, 
                o.setData({
                    couponList: o.data.couponList,
                    couponPopupsShow: "none",
                    errorMsg: ""
                }), t.default.show({
                    icon: t.default.icon.success,
                    message: "领取成功\n            5~10分钟到账",
                    pageObj: o
                })) : (o.resetVcode(), e && e.volidateMsg ? e.msg && o.setData({
                    errorMsg: e.msg
                }) : (o.setData({
                    errorMsg: ""
                }), e && e.msg && t.default.show({
                    icon: t.default.icon.error,
                    message: e.msg,
                    pageObj: o
                })));
            },
            fail: function(e) {
                o.setData({
                    couponPopupsShow: "none"
                }), t.default.show({
                    icon: t.default.icon.error,
                    message: "领取失败，看看别的优惠券吧",
                    pageObj: o
                }), s.reportErr("item getActiveCoupon.json: " + e.errMsg);
            }
        });
    },
    resetVcode: function() {
        var a = this;
        s.request({
            url: r.globalRequestUrl + a.data.productDir + "/authCode/createCodeWithPinKey.json?args=115",
            success: function(e) {
                a.setData({
                    codeKey: e.codeKey,
                    vcodeUrl: r.globalRequestUrl + a.data.productDir + "/authCode/authCodePinImg.action?key=" + e.codeKey + "&rand=" + a.getRandomNum(1, 1e6)
                });
            },
            fail: function() {
                s.reportErr("item createCodeWithPinKey.json: " + e.errMsg);
            }
        });
    },
    getVcodeInput: function(e) {
        this.setData({
            inputVcode: e.detail.value.replace(/\s/g, "")
        });
    },
    getYuyueVcodeInput: function(e) {
        this.setData({
            "yuYue.vcode": e.detail.value.replace(/\s/g, "")
        });
    },
    couponCancel: function() {
        this.setData({
            couponPopupsShow: "none"
        });
    },
    couponConfirm: function() {
        var e = this;
        setTimeout(function() {
            var a = e.data.couponRequestUrl + "&codeKey=" + e.data.codeKey + "&validateCode=" + e.data.inputVcode;
            e.couponRequest(a);
        }, 200);
    },
    slideChangeFn: function(e) {
        this.unionClick("MProductdetail_SlideFocusPic", "", "", "", e);
    },
    operaColor: function(e) {
        for (var a = e.colorSet, o = e.sizeSet, t = e.specSet, r = [], s = [], n = [], i = 0; i < a.length; i++) {
            var d = new Object();
            d.colorName = a[i], d.colorClass = "", d.colorTap = "changeWareInfo", r.push(d);
        }
        for (i = 0; i < o.length; i++) {
            var l = new Object();
            l.colorName = o[i], l.colorClass = "", l.colorTap = "changeWareInfo", s.push(l);
        }
        for (i = 0; i < t.length; i++) {
            var u = new Object();
            u.colorName = t[i], u.colorClass = "", u.colorTap = "changeWareInfo", n.push(u);
        }
        var c = this.data.wareInfo;
        c.ware.skuColorSizeHandler.colorSet = r, c.ware.skuColorSizeHandler.sizeSet = s, 
        c.ware.skuColorSizeHandler.specSet = n, this.setData({
            wareInfo: c
        });
    },
    buyNumBlurFn: function(e) {
        this.setData({
            buyNumTip: "",
            buyNumValue: e.detail.value
        }), this.MinCheckFn(), this.MaxCheckFn(), this.buyNumTipBlurFn();
    },
    addNumFn: function(e) {
        var a = this, o = parseInt(a.data.buyNumValue) + 1;
        o > 200 && (o = 200), a.setData({
            buyNumValue: o
        }), this.unionClick("MProductdetail_NumAdd", "", "", "", e), a.MinCheckFn(), a.MaxCheckFn(), 
        a.buyNumTipBlurFn();
    },
    minusNumFn: function(e) {
        var a = this, o = parseInt(a.data.buyNumValue) - 1, t = parseInt(this.data.lowestBuyNum);
        this.data.lowestBuy && t > 1 ? o <= t && (o = t) : o <= 0 && (o = 1), a.setData({
            buyNumValue: o
        }), this.unionClick("MProductdetail_NumSub", "", "", "", e), a.MinCheckFn(), a.MaxCheckFn(), 
        a.buyNumTipBlurFn();
    },
    promotionOpenFn: function(e) {
        var a = this;
        "promotion-down" == this.data.promotionClass ? (a.setData({
            promotionClass: "promotion-up",
            promotionOpen: "icon-arrow-up"
        }), a.unionClick("MProductdetail_Saleinfo", "5", "open", "", e)) : "promotion-up" == this.data.promotionClass && (a.setData({
            promotionClass: "promotion-down",
            promotionOpen: "icon-arrow-down"
        }), a.unionClick("MProductdetail_Saleinfo", "5", "close", "", e));
    },
    promiseOpenFn: function(e) {
        if ("service-wrap-hide" != this.data.serviceWrapClass || "back-shade-show" != this.data.shadeClass) {
            var a = this;
            "service-wrap-hide" == this.data.serviceWrapClass ? a.setData({
                serviceWrapClass: "service-wrap-show",
                promiseOpen: "icon-arrow-up",
                shadeClass: "back-shade-show"
            }) : "service-wrap-show" == this.data.serviceWrapClass && (a.setData({
                serviceWrapClass: "service-wrap-hide",
                promiseOpen: "icon-arrow-down"
            }), setTimeout(function() {
                a.setData({
                    shadeClass: "back-shade-hide"
                });
            }, 600)), this.unionClick("MProductdetail_ServiceInfo", "5", "", "", e);
        }
    },
    cusImageLoad: function(e) {
        var a = this, o = e.currentTarget.dataset.index;
        a.autoHeight(a.data.screenWidth, e.detail.height, e.detail.width, o);
    },
    refreshPage: function() {
        var e = this;
        e.closeModal();
        var a = "", o = e.data.wareId;
        e.data.wareInfo && e.data.wareInfo.defaultAddress && (a = "&provinceId=" + e.data.wareInfo.defaultAddress.provinceId + "&cityId=" + e.data.wareInfo.defaultAddress.cityId + "&countryId=" + e.data.wareInfo.defaultAddress.countyId + "&townId=" + e.data.wareInfo.defaultAddress.townId), 
        s.request({
            url: r.globalRequestUrl + e.data.productDir + "/ware/view.json?wareId=" + o + a,
            selfCookie: e.getSelfCookie(),
            success: e.toViewPage.bind(e),
            fail: function(e) {
                s.reportErr("item changeWareInfo view.json: " + e.errMsg);
            }
        }), s.request({
            url: r.globalRequestUrl + e.data.productDir + "/ware/getDetailCommentList.json?wareId=" + o,
            selfCookie: e.getSelfCookie(),
            success: e.toViewCommentPage.bind(e),
            fail: function(e) {
                s.reportErr("item changeWareInfo getDetailCommentList.json: " + e.errMsg);
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    onPullDownRefresh: function() {
        this.refreshPage();
    },
    onReachBottom: function(e) {
        var a = this;
        if ("icon-arrow-down" == a.data.detailOpen) {
            if (!a.data.wareId) return;
            a.data.detailFirstComplete ? a.setData({
                detailOpen: "icon-arrow-up",
                detailShow: "block"
            }) : s.request({
                url: r.globalRequestUrl + a.data.productDir + "/wxdetail/detail.json?wareId=" + a.data.wareId,
                success: a.toDetailPage.bind(a),
                fail: function(e) {
                    s.reportErr("item detail.json: " + e.errMsg);
                }
            }), a.setData({
                detailFirstComplete: !0
            }), this.unionClick("MProductdetail_ProductdetailEntrance", "5", "", "", e);
        }
    },
    toDetailPage: function(e) {
        var a = this;
        if (a.setData({
            loadnone: !0
        }), (e.popWareDetailWebView || !this.data.isDegrade && !wx.createSelectorQuery) && this.setData({
            isDegrade: !0
        }), this.data.isDegrade) e && e.imgList && e.imgList.length > 0 ? a.setData({
            detailImgUrls: e.imgList,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        }) : a.setData({
            hasDetail: !1,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        }); else if (e && e.isbook && e.bookAttr) {
            for (var o = "", t = JSON.parse(e.bookAttr), r = 0; r < t.length; r++) o += "<p>【" + t[r].label + "】</p>" + t[r].value;
            a.WxParseInit("detailHtml", o, a);
        } else if (e && e.wdis) {
            o = e.wdis;
            a.WxParseInit("detailHtml", o, a);
        } else a.setData({
            hasDetail: !1,
            detailOpen: "icon-arrow-up",
            detailShow: "block"
        });
    },
    WxParseInit: function(e, a, o) {
        o.setData({
            detailOpen: "icon-arrow-up",
            detailShow: "block",
            wxParseItem: {
                scaleParentStyle: "",
                scaleBoxStyle: ""
            },
            wxParseData: []
        }), i.wxParse(e, "html", a, o, 5, !0);
    },
    onPageScroll: function(e) {
        var a = this;
        a.data.scrollPostion = e.scrollTop, a.data.countTimeObj && a.setData({
            countTimeObj: a.data.countTimeObj
        }), e.scrollTop > a.data.screenHeight ? a.setData({
            toTopDisplay: "block"
        }) : a.setData({
            toTopDisplay: "none"
        });
    },
    selectLocVender: function(e) {
        this.openLocPage({
            tapFrom: 1
        }, e);
    },
    toTopTap: function(e) {
        wx.pageScrollTo({
            scrollTop: .001 * Math.random(),
            duration: 300
        }), this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        }), this.unionClick("MProductdetail_BackToTop", "5", "", "", e);
    },
    changeWareInfo: function(e) {
        var a = this, o = e.target.dataset.colorname, t = e.target.dataset.colortype, n = a.data.skuColorSize, i = "", d = "", l = "", u = 0;
        a.setData({
            colorSelClass: "selected",
            sizeSelClass: "selected",
            specSelClass: "selected"
        }), a.data.wareInfo && a.data.wareInfo.ware && a.data.wareInfo.ware.skuColorSizeHandler && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize && (i = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color, 
        d = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size, l = a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec), 
        a.data.wareInfo.ware.skuColorSizeHandler.colorSet && a.data.wareInfo.ware.skuColorSizeHandler.colorSet.length > 0 && (S = a.data.wareInfo.ware.skuColorSizeHandler.colorSet, 
        u += 1), a.data.wareInfo.ware.skuColorSizeHandler.sizeSet && a.data.wareInfo.ware.skuColorSizeHandler.sizeSet.length > 0 && (y = a.data.wareInfo.ware.skuColorSizeHandler.sizeSet, 
        u += 1), a.data.wareInfo.ware.skuColorSizeHandler.specSet && a.data.wareInfo.ware.skuColorSizeHandler.specSet.length > 0 && (b = a.data.wareInfo.ware.skuColorSizeHandler.specSet, 
        u += 1));
        for (var c = "", p = 0; p < n.length; p++) {
            if ("color" == t && n[p].color == o) {
                if (3 == u && d && l && n[p].size == d && n[p].spec == l) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && d && n[p].size == d) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && l && n[p].spec == l) {
                    c = n[p].skuId;
                    break;
                }
                if (!d && !l) {
                    c = n[p].skuId;
                    break;
                }
            }
            if ("size" == t && n[p].size == o) {
                if (3 == u && i && l && n[p].color == i && n[p].spec == l) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && i && n[p].color == i) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && l && n[p].spec == l) {
                    c = n[p].skuId;
                    break;
                }
                if (!i && !l) {
                    c = n[p].skuId;
                    break;
                }
            }
            if ("spec" == t && n[p].spec == o) {
                if (3 == u && d && i && n[p].size == d && n[p].color == i) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && d && n[p].size == d) {
                    c = n[p].skuId;
                    break;
                }
                if (2 == u && i && n[p].color == i) {
                    c = n[p].skuId;
                    break;
                }
                if (!i && !d) {
                    c = n[p].skuId;
                    break;
                }
            }
        }
        if ("" != c) {
            a.data.wareId = c;
            var w = "";
            a.data.wareInfo && a.data.wareInfo.defaultAddress && (w = "&provinceId=" + a.data.wareInfo.defaultAddress.provinceId + "&cityId=" + a.data.wareInfo.defaultAddress.cityId + "&countryId=" + a.data.wareInfo.defaultAddress.countyId + "&townId=" + a.data.wareInfo.defaultAddress.townId), 
            s.request({
                url: r.globalRequestUrl + a.data.productDir + "/ware/view.json?wareId=" + c + w,
                selfCookie: a.getSelfCookie(),
                success: a.toViewPage.bind(a),
                fail: function(e) {
                    s.reportErr("item changeWareInfo view.json: " + e.errMsg);
                }
            }), s.request({
                url: r.globalRequestUrl + a.data.productDir + "/ware/getDetailCommentList.json?wareId=" + c,
                selfCookie: a.getSelfCookie(),
                success: a.toViewCommentPage.bind(a),
                fail: function(e) {
                    s.reportErr("item changeWareInfo getDetailCommentList.json: " + e.errMsg);
                }
            }), a.setData({
                detailOpen: "icon-arrow-down",
                detailShow: "none",
                detailImgUrls: [],
                hasDetail: !0,
                loadnone: !1
            });
        } else {
            for (var f = a.data.wareInfo, g = new Map(), h = new Map(), m = new Map(), u = -1, I = -1, C = -1, p = 0; p < n.length; p++) "color" == t && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color = o, 
            n[p].color == o && h.set(n[p].size, n[p].size), n[p].color == o && m.set(n[p].spec, n[p].spec)), 
            "size" == t && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size = o, 
            n[p].size == o && g.set(n[p].color, n[p].color), n[p].size == o && m.set(n[p].spec, n[p].spec)), 
            "spec" == t && (a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec = o, 
            n[p].spec == o && h.set(n[p].size, n[p].size), n[p].spec == o && g.set(n[p].color, n[p].color));
            for (var S = a.data.wareInfo.ware.skuColorSizeHandler.colorSet, y = a.data.wareInfo.ware.skuColorSizeHandler.sizeSet, b = a.data.wareInfo.ware.skuColorSizeHandler.specSet, p = 0; p < S.length; p++) {
                var v = S[p];
                "color" == t ? (S[p].colorClass = "", S[p].colorTap = "changeWareInfo", S[p].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != v.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != v.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != v.colorName || (u = p)) : g.get(v.colorName) && g.get(v.colorName) == v.colorName ? (g.get(v.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color && (u = p), 
                S[p].colorClass = "", S[p].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color == v.colorName ? (S[p].selectedtap = "", 
                S[p].colorClass = "no-goods") : S[p].selectedtap = "") : (a.setData({
                    colorSelClass: ""
                }), S[p].colorClass = "no-goods", S[p].colorTap = "", S[p].selectedtap = "");
            }
            for (p = 0; p < y.length; p++) {
                var k = y[p];
                "size" == t ? (y[p].colorClass = "", y[p].colorTap = "changeWareInfo", y[p].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != k.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != k.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != k.colorName || (I = p)) : h.get(k.colorName) && h.get(k.colorName) == k.colorName ? (h.get(k.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size && (I = p), 
                y[p].colorClass = "", y[p].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size == k.colorName ? (y[p].selectedtap = "", 
                y[p].colorClass = "no-goods") : y[p].selectedtap = "") : (a.setData({
                    sizeSelClass: ""
                }), y[p].colorClass = "no-goods", y[p].colorTap = "", y[p].selectedtap = "");
            }
            for (p = 0; p < b.length; p++) {
                var D = b[p];
                "spec" == t ? (b[p].colorClass = "", b[p].colorTap = "changeWareInfo", b[p].selectedtap = "", 
                a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.size != D.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.color != D.colorName && a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec != D.colorName || (C = p)) : m.get(D.colorName) && m.get(D.colorName) == D.colorName ? (m.get(b.colorName) == a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec && (C = p), 
                b[p].colorClass = "", b[p].colorTap = "changeWareInfo", a.data.wareInfo.ware.skuColorSizeHandler.currentColorSize.spec == D.colorName ? (b[p].selectedtap = "", 
                b[p].colorClass = "no-goods") : b[p].selectedtap = "") : (a.setData({
                    specSelClass: ""
                }), b[p].colorClass = "no-goods", b[p].colorTap = "", b[p].selectedtap = "");
            }
            -1 != u && (S[u].colorClass = "no-goods", S[u].selectedtap = ""), -1 != I && (y[I].colorClass = "no-goods", 
            y[I].selectedtap = ""), -1 != C && (b[C].colorClass = "no-goods", b[C].selectedtap = ""), 
            a.data.wareInfo.ware.skuColorSizeHandler.colorSet = S, a.data.wareInfo.ware.skuColorSizeHandler.sizeSet = y, 
            a.data.wareInfo.ware.skuColorSizeHandler.specSet = b, a.setData({
                wareInfo: f,
                isBuy: !1,
                isNoBuyInfoHide: !1
            });
        }
        a.setData({
            detailFirstComplete: !1
        });
    },
    navigatorToComment: function(e) {
        var a = this;
        a.data.commentDisabled || (a.setData({
            commentDisabled: !0
        }), null != e && null != e.currentTarget && null != e.currentTarget.dataset && 1 == e.currentTarget.dataset.commenttype ? (a.unionClick("MProductdetail_ProductShowEntrance", "5", "", "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=4", e), 
        wx.navigateTo({
            url: "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=4"
        })) : (a.unionClick("MProductdetail_ProductCommentEntrance", "5", "", "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=0", e), 
        wx.navigateTo({
            url: "../assess/assess?wareId=" + a.data.wareInfo.ware.wareId + "&type=0"
        })));
    },
    toThirdAddressPage: function(e) {
        var a = this;
        if (e) {
            var o = a.data.wareInfo, t = o.isBuy;
            if (e.stock) {
                o.stock.status = e.stock.status;
                var r = e.stock.jdPrice;
                if (r) {
                    var s = r.split(".");
                    s && s.length > 1 && (o.jdPriceIntegerPart = s[0], o.jdPriceFractionPart = s[1]);
                }
                e.stock.iconList && e.stock.iconList.length > 0 && (o.ware.iconList = e.stock.iconList), 
                e.stock.servIconList && e.stock.servIconList.length > 0 && (o.ware.servIconList = a.operateIconList(e.stock.servIconList, e.ware)), 
                e.ware && (o.ware.weightInfo = e.ware.weightInfo), o.stock.flag = e.stock.flag, 
                t = e.stock.flag;
            }
            if (e.proInformation && (o.proInformation = e.proInformation), e.ware.yuShouInFo && e.ware.yuShouInFo.isYuShou && !e.ware.miaosha ? (a.data.yuShou.isYuShou = !0, 
            a.operateYuShou(e)) : a.data.yuShou.isYuShou = !1, o.defaultAddress) o.defaultAddress.provinceName = a.data.privoinceName, 
            o.defaultAddress.cityName = a.data.cityName, o.defaultAddress.countyName = a.data.countryName, 
            o.defaultAddress.townName = a.data.townName, o.defaultAddress.provinceId = a.data.privoinceId, 
            o.defaultAddress.cityId = a.data.cityId, o.defaultAddress.countyId = a.data.countryId, 
            o.defaultAddress.townId = a.data.townId; else {
                var n = new Object();
                n.provinceName = a.data.privoinceName, n.cityName = a.data.cityName, n.countyName = a.data.countryName, 
                n.townName = a.data.townName, n.provinceId = a.data.privoinceId, n.cityId = a.data.cityId, 
                n.countyId = a.data.countryId, n.townId = a.data.townId, o.defaultAddress = n;
            }
            wx.setStorageSync("regionAddress", a.data.privoinceId + "%2C" + a.data.cityId + "%2C" + a.data.countryId + "%2C" + a.data.townId), 
            a.data.wareInfo.ware.cartFlag = t, a.setData({
                wareInfo: o,
                isBuy: t
            }), a.getBuyStatus();
        }
    },
    navigatorToThirdAddress: function(e) {
        this.unionClick("MProductdetail_Address", "5", "", "../chooseaddress/chooseaddress?from=item", e), 
        this.setData({
            navigatorToThirdAddress: ""
        }), wx.navigateTo({
            url: "../chooseaddress/chooseaddress?from=item"
        });
    },
    goPay: function(e, a) {
        var o = this;
        if (!o.data.buyDisabled && (o.setData({
            buyLoading: !0,
            buyDisabled: !0
        }), wx.showToast({
            title: "请稍后...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), null != o.data.wareInfo && null != o.data.wareInfo.ware && o.data.wareInfo.ware.wareId > 0)) {
            o.data.wareInfo.ware.wareId, o.data.buyNumValue;
            var t = "/pages/pay/pay?wareId=" + o.data.wareInfo.ware.wareId + "&wareNum=" + o.data.buyNumValue + "&enterOrder=true", r = "../pay/pay?wareId=" + o.data.wareInfo.ware.wareId + "&wareNum=" + o.data.buyNumValue;
            a && (t += "&proType=presale", r += "&proType=presale"), this.getLoginState({
                event: e,
                returnUrl: t,
                success: function() {
                    wx.hideToast(), wx.navigateTo({
                        url: r
                    });
                },
                isRedirect: !1
            });
        }
    },
    goYuShou: function(e) {
        var a = this;
        this.addCartMPing("WShopCart_Payment", a.data.wareInfo.ware.wareId, a.data.buyNumValue), 
        this.goPay(e, !0);
    },
    getGoToBuyFormId: function(e) {
        var a = e.detail.formId;
        d.messagePush({
            formId: a,
            times: 1,
            type: 10002
        });
    },
    goToBuy: function(e) {
        try {
            var a = this;
            e.detail.formId && this.getGoToBuyFormId(e), this.addCartMPing("MProductdetail_Easybuy", a.data.wareInfo.ware.wareId, a.data.buyNumValue), 
            this.goPay(e, !1);
        } catch (e) {
            s.reportErr("item gotobuy function error: " + e.errMsg);
        }
    },
    loginModalShow: function() {
        s.globalLoginShow(this);
    },
    unionClick: function(e, a, o, t, r) {
        n.click({
            eid: e,
            elevel: a,
            eparam: o,
            pname: "",
            pparam: "",
            target: t,
            event: r
        });
    },
    addCartMPing: function(e, a, o) {
        try {
            var t = '{"' + a + '":"' + o + '"}', r = {
                eid: e,
                elevel: "5",
                eparam: a,
                pname: "",
                pparam: "",
                shoppingList: JSON.parse(t)
            };
            n.addToCart(r);
        } catch (e) {
            s.reportErr("item addCartMPing function error: " + e.errMsg);
        }
    },
    goToCart: function(e) {
        this.unionClick("WProductDetail_CartIcon", "", "", "../cart/cart", e), wx.getStorageSync("activityUrl") || r.globalData && r.globalData.isCartNavigate ? wx.redirectTo({
            url: "../cart/cart"
        }) : wx.switchTab({
            url: "../cart/cart"
        });
    },
    goToChat: function(e) {
        var a = this, o = getCurrentPages(), t = "pid=" + a.data.wareId + "&entry=pop_m_xqx_item&venderId=" + a.data.wareInfo.ware.venderId;
        this.getLoginState({
            event: e,
            returnUrl: "/pages/chat/chat?" + t,
            success: function() {
                o.length > 4 ? wx.redirectTo({
                    url: "../chat/chat?" + t
                }) : wx.navigateTo({
                    url: "../chat/chat?" + t
                });
            },
            isRedirect: !1
        });
    },
    senYuyueMsg: function() {
        var e = this, a = wx.getStorageSync("appid"), o = e.data.wareInfo.ware.wname, t = e.data.wareInfo.ware.wareId, n = e.data.wareInfo.yuYue.buyStartTime, i = wx.getStorageSync("oi_key"), d = e.data.wareInfo.ware.jdPrice, l = r.globalRequestUrl + e.data.productDir + "/ware/preSellAndSubscribe.json?appid=" + a + "&businessType=50004&activityName=" + o + "&activityId=" + t + "&identityKey=" + i + "&subscribeTime=" + n + "&price=" + d;
        s.request({
            url: l,
            success: function(e) {
                console.log("发送预约提醒====", e);
            },
            fail: function() {
                console.log("发送预约消息失败=====");
            }
        });
    },
    getGoYuyueFormId: function(e) {
        var a = e.detail.formId;
        d.messagePush({
            formId: a,
            times: 1,
            type: 40001
        });
    },
    goYuyue: function(e) {
        var a = this;
        if (a.unionClick("WShopCart_Appointment", "", a.data.wareInfo.ware.wareId, "", e), 
        e.detail.formId && this.getGoYuyueFormId(e), a.data.wareInfo.ware.wareId) {
            var o = "/pages/product/product?wareId=" + a.data.wareInfo.ware.wareId, t = r.globalRequestUrl + a.data.productDir + "/ware/appoint.json?wareId=" + a.data.wareInfo.ware.wareId;
            this.getLoginState({
                event: e,
                returnUrl: o,
                success: function() {
                    wx.showToast({
                        title: "请稍后...",
                        icon: "loading",
                        duration: 1e4,
                        mask: !0
                    }), s.request({
                        url: t,
                        success: function(e) {
                            if (e && e.yuyueAppoint && e.yuyueAppoint.title && e.yuyueAppoint.content) {
                                for (var o = e.yuyueAppoint.content.split("\n") ? e.yuyueAppoint.content.split("\n") : [], t = 0; t < o.length; t++) -1 != o[t].indexOf("我的京东--我的活动--我的预约") && (o[t] = o[t].replace("我的京东--我的活动--我的预约", "我的--我的预约"));
                                wx.hideToast(), r.globalConfig && r.globalConfig.isMessagePush && a.senYuyueMsg(), 
                                "预约成功！" == e.yuyueAppoint.title && a.setData({
                                    "wareInfo.yuYue.yuyueNum": parseInt(a.data.wareInfo.yuYue.yuyueNum) + 1
                                }), a.data.modal = {
                                    isShow: !0,
                                    title: e.yuyueAppoint.title,
                                    txtList: o,
                                    textAlign: "left",
                                    buttons: [ {
                                        name: "我知道了",
                                        background: "#fff",
                                        color: "#f23030",
                                        bindTap: "closeModal"
                                    }, {
                                        name: "我的预约",
                                        background: "#f23030",
                                        color: "#fff",
                                        bindTap: "goMyYuyueList"
                                    } ]
                                }, a.setData({
                                    modal: a.data.modal
                                });
                            } else a.data.modal = {
                                isShow: !0,
                                title: "出错啦，请重试",
                                txtList: null,
                                textAlign: "left",
                                buttons: [ {
                                    name: "我知道了",
                                    background: "#fff",
                                    color: "#f23030",
                                    bindTap: "refreshPage"
                                } ]
                            }, a.setData({
                                modal: a.data.modal
                            }), wx.hideToast();
                        },
                        fail: function() {
                            wx.hideToast();
                        }
                    });
                },
                isRedirect: !0
            });
        }
    },
    goMyYuyueList: function() {
        this.closeModal(), wx.navigateTo({
            url: "../appointment/appointment"
        });
    },
    goYuyueBuy: function(e) {
        var a = this, o = "/pages/product/product?wareId=" + a.data.wareInfo.ware.wareId, t = r.globalRequestUrl + a.data.productDir + "/ware/isAppoint.json?wareId=" + a.data.wareInfo.ware.wareId;
        this.addCartMPing("WShopCart_BuyNow", a.data.wareInfo.ware.wareId, a.data.buyNumValue), 
        a.data.isBuy && (wx.showToast({
            title: "请稍后...",
            icon: "loading",
            duration: 1e4,
            mask: !0
        }), this.getLoginState({
            event: e,
            returnUrl: o,
            success: function() {
                s.request({
                    url: t,
                    success: function(e) {
                        wx.hideToast(), e && e.isAppoint ? a.addCartRequest() : e.text && (a.data.modal = {
                            isShow: !0,
                            title: e.text,
                            txtList: null,
                            textAlign: "left",
                            buttons: [ {
                                name: "我知道了",
                                background: "#fff",
                                color: "#f23030",
                                bindTap: "closeModal"
                            } ]
                        }, a.setData({
                            modal: a.data.modal
                        }));
                    },
                    fail: function() {
                        a.data.modal = {
                            isShow: !0,
                            title: "出错啦，请重试",
                            txtList: null,
                            textAlign: "left",
                            buttons: [ {
                                name: "我知道了",
                                background: "#fff",
                                color: "#f23030",
                                bindTap: "refreshPage"
                            } ]
                        }, a.setData({
                            modal: a.data.modal
                        }), wx.hideToast();
                    }
                });
            },
            isRedirect: !0
        }));
    },
    addCartRequest: function() {
        s.umpMonitor("2502");
        var e = this, a = this.data.wareId, o = this.data.buyNumValue, n = wx.getStorageSync("sid"), i = wx.getStorageSync("USER_FLAG_CHECK");
        if (this.addCartMPing("WProductDetail_AddToCart", a, o), this.data.isBuy) {
            wx.showToast({
                title: "请稍后...",
                icon: "loading",
                duration: 1e4,
                mask: !0
            });
            var d = r.globalRequestUrl + e.data.pDir + "/cart/add.json?wareId=" + a + "&num=" + o + "&sid=" + n + "&USER_FLAG_CHECK=" + i;
            e.data.locShopId && e.data.isShowLoc && (d = d + "&locId=" + e.data.locShopId), 
            s.request({
                url: d,
                success: function(a) {
                    var o = 0, r = "", s = {};
                    if (a && a.cartJson) {
                        if (a.cartJson.Num) {
                            var n = a.cartJson.Num;
                            n > 0 && (n > 99 && (n = "99+"), wx.setStorageSync("itemCartNum", n), e.setData({
                                cartNum: n,
                                isCartNumShow: !0
                            }));
                        }
                        a.cartJson.resultCode && (o = a.cartJson.resultCode), r = a.cartJson.resultMsg ? a.cartJson.resultMsg : "抱歉，加入购物车失败，请刷新页面重试", 
                        s = 0 == o ? {
                            icon: t.default.icon.success,
                            message: "加入购物车成功",
                            pageObj: e
                        } : 15 == o ? {
                            icon: t.default.icon.success,
                            message: "小程序内暂不支持购买哦，请去京东APP进行购买",
                            pageObj: e
                        } : {
                            icon: t.default.icon.error,
                            message: r,
                            pageObj: e
                        }, t.default.show(s);
                    }
                    wx.hideToast();
                },
                fail: function(e) {
                    wx.hideToast(), s.reportErr("item add.json: " + e.errMsg);
                }
            });
        }
    },
    addCartFn: function(e) {
        var a = this, o = e.detail.formId;
        d.messagePush({
            formId: o,
            times: 1,
            type: 10001
        }), a.data.isBuy && a.data.isShowLoc && !a.data.locVenderInfo ? a.openLocPage({
            tapFrom: 2
        }, e) : a.addCartRequest();
    },
    tapPriceInfoFn: function() {
        wx.showModal({
            title: "渠道价",
            content: "在小程序内购买尊享特殊优惠噢",
            showCancel: !1,
            confirmText: "我知道了",
            confirmColor: "#F23030"
        });
    },
    getSelfCookie: function() {
        var e = "";
        try {
            var a = wx.getStorageSync("regionAddress");
            a && (e = e + "regionAddress=" + a + ";");
        } catch (e) {
            n.error(e);
        }
        return e;
    }
}));