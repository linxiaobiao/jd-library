function t(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}

var e = t(require("../../components/slide/slide.js")), a = t(require("../../components/toast/toast.js")), i = require("../../utils/util.js"), s = require("../../utils/keplerReport.js").init(), o = require("../../utils/message_push.js"), r = getApp();

Page(Object.assign({}, e.default, {
    data: {
        pDir: "/kwxp",
        isLogined: !0,
        atLeastDefaultNum: -1,
        returnpage: "/pages/cart/cart",
        fromPageType: "switchTab",
        fromPageLevel: 1,
        objTextTemplate: {
            editTxt: "编辑",
            deleteTxt: "删除",
            completeTxt: "完成",
            noshoppingTxt: "无货",
            beginNumerTxt: "件起购"
        },
        objTextGift: {
            sureTxt: "确定",
            alreadyAdditionalBuyTxt: "已换购",
            alreadyGotTxt: "已领取",
            unitTxt: "件"
        },
        heightInfo: {
            boxMinHeight: "auto",
            boxMaxHeight: "auto"
        },
        objTextMain: {
            loginInfoTxt: "登录后可同步电脑与手机购物车",
            loginTxt: "登录",
            emptyTxt: "购物车空空如也,赶紧逛逛吧~",
            giftTxt: "[赠品] ",
            annexTxt: "[附件] ",
            giftBeanTxt: "[赠京豆] ",
            serviceTxt: "[服务] ",
            allCheckTxt: "全选",
            sumTxt: "合计:",
            allCountTxt: "总额:",
            minusTxt: "立减:",
            goCheckTxt: "去结算",
            noshoppingTxt: "无货",
            additionalBuyTxt: "换购",
            giftOnlyTxt: "赠品",
            deleteTxt: "删除"
        },
        slideItems: {},
        isGiftWinShow: !1,
        toTopDisplay: "none",
        scrollTop: 0,
        anchor: "",
        promotionDialog: {
            status: !1,
            shopId: "",
            skuId: "",
            skuNum: "",
            sType: "",
            suitId: "",
            suitNum: "",
            activeId: "",
            data: []
        },
        isOpenPromotionModule: !1
    },
    onLoad: function(t) {
        i.umpMonitor("2506"), this.setScreenInfo(), s.set({
            urlParam: t,
            title: "购物车",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var t = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: r.globalRequestUrl + t.data.pDir + "/cart/cart.json?ttt=" + new Date().getTime(),
            success: function(e) {
                t.injectData.call(t, e);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("购物车onShow数据请求request失败，具体信息：") + t.errMsg);
            }
        }), s.pv();
    },
    onMainContainerTap: function(t) {
        var e = "slide-btn-del" === t.target.dataset.selector;
        !(Object.keys(this.data.slideItems).length > 0) || e || this.setData({
            slideItems: {}
        });
    },
    injectData: function(t) {
        var e = this;
        if (t.desPin && "" != t.desPin) {
            if (this.setData({
                isLogined: !0
            }), !t.cart || !t.cart.Num || t.cart.Num <= 0) return this.setData({
                isCartEmpty: !0
            }), !1;
        } else if (this.setData({
            isLogined: !1
        }), !t.cart || !t.cart.Num || t.cart.Num <= 0) return this.setData({
            isCartEmpty: !1,
            vendors: [],
            Num: 0
        }), !1;
        t && t.cart && t.cart.vendors && this.replaceVendors(t.cart.vendors), this.setData({
            isOpenPromotionModule: t.isOpenPromotionModule
        }), this.shopCheckedStatus(), this.renderMainData(t), setTimeout(function() {
            e.setData({
                selfFreightInfo: t && t.cart && t.cart.selfFreightInfo,
                limitBookNum: t && t.cart && t.cart.limitBookNum,
                limitNotBookNum: t && t.cart && t.cart.limitNotBookNum,
                cartYanBaoInfo: !(!t || !t.cartYanBaoInfo)
            });
        }, 1e3);
    },
    replaceVendors: function(t) {
        this.data.vendors = t;
    },
    shopCheckedStatus: function(t) {
        var e, a = this;
        void 0 != a.data.vendors && (e = t ? a.data.vendors.map(function(e) {
            return e.vendorId == t && (e.checkedStatus = a.shopCheck(e.vendorId)), e;
        }) : a.data.vendors.map(function(t) {
            return t.checkedStatus = a.shopCheck(t.vendorId), t;
        }), this.data.newVendors = e);
    },
    shopCheck: function(t) {
        var e = this.data.vendors.filter(function(e) {
            return e.vendorId == t;
        }), a = 0, i = 0;
        return e[0] && e[0].sorted ? (e[0].sorted.forEach(function(t, e) {
            1 == t.itemType ? (a++, 1 == t.item.CheckType && i++) : t.item.Skus.forEach(function(t, e) {
                a++, 1 == t.CheckType && i++;
            });
        }), i == a ? "checked" : "") : "";
    },
    renderMainData: function(t) {
        t && t.cart && !t.cart.Num && (this.data.newVendors = []), this.data.isLogined && this.setData({
            isCartEmpty: !(t && t.cart && t.cart.Num)
        }), this.setData({
            vendors: this.data.newVendors,
            Num: t && t.cart && t.cart.Num || 0,
            checkedWareNum: t && t.cart && t.cart.checkedWareNum || 0,
            PriceShow: t && t.cart && t.cart.PriceShow || 0,
            Price: t && t.cart && void 0 != t.cart.Price && t.cart.Price.toFixed(2),
            RePrice: t && t.cart && void 0 != t.cart.RePrice && t.cart.RePrice.toFixed(2)
        });
    },
    getDataSkuInfo: function(t) {
        var e = "", a = this.data.vendors.filter(function(e) {
            return e.vendorId == t;
        });
        return a[0] && a[0].sorted && a[0].sorted.forEach(function(t, a) {
            if (1 == t.itemType) {
                var i = t.item.Id + "@@" + t.item.Num;
                e = "" == e ? i : e + "@@@" + i;
            } else if (9 == t.itemType || 12 == t.itemType) {
                var s, o, r;
                s = t.item.Id, o = t.item.Num, r = 16 == t.item.SType ? 13 : t.item.SType, t.item.Skus.forEach(function(t, a) {
                    var i = s + "@@" + o + "@@" + r + "@@" + t.Id + "@@" + t.Num;
                    e = "" == e ? i : e + "@@@" + i;
                });
            }
        }), e;
    },
    changeSelected: function(t) {
        var e, a, i = t.currentTarget.dataset.info, s = JSON.parse(i), o = s.shopid, n = 6;
        "pure" == s.productType ? (e = s.skuid, a = s.skunum) : "suit" == s.productType && (e = s.suitId, 
        a = s.suitNum), s.isChecked && "checked" == s.isChecked || (n = 5);
        var c = r.globalRequestUrl + this.data.pDir + "/cart/check.json?wareId=" + e + "&num=" + a + "&checked=" + n;
        "suit" == s.productType && (c = this.appendSuit(c, s.sType, s.skuid, s.skunum)), 
        this.saveCheckInfo4Product(o, c);
    },
    selectGroup: function(t) {
        var e = this, a = 6, i = t.currentTarget.dataset.shopid, s = e.data.vendors.filter(function(t) {
            return t.vendorId == i;
        });
        s[0].checkedStatus && "checked" == s[0].checkedStatus || (a = 5), e.saveCheckInfo4Shop(i, a);
    },
    saveCheckInfo4Shop: function(t, e) {
        var a = this, s = a.getDataSkuInfo(t);
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: r.globalRequestUrl + a.data.pDir + "/cart/checkWares.json?wareInfos=" + s + "&checked=" + e,
            success: function(e) {
                e && a.checkProductRender(t, e);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("saveCheckInfo4Shop执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    saveCheckInfo4Product: function(t, e, a) {
        var s = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: e,
            success: function(e) {
                e && (s.checkProductRender(t, e), a && a());
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("saveCheckInfo4Product执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    checkProductRender: function(t, e) {
        var i = void 0;
        if (e && e.cart && "0" != e.cart.resultCode) return a.default.show({
            icon: a.default.icon.error,
            message: "数量不能修改哦~",
            duration: 2e3,
            pageObj: this
        }), !1;
        if (e && e.cart && e.cart.vendors) {
            i = e.cart.vendors;
            for (var s = 0; s < e.cart.vendors.length; s++) this.data.vendors[s] && this.data.vendors[s].checkedStatus ? i[s].checkedStatus = this.data.vendors[s].checkedStatus : i[s].checkedStatus = "";
        }
        this.replaceVendors(i), this.shopCheckedStatus(t), this.renderMainData(e);
    },
    checkLimitNum: function(t) {
        var e = t.currentTarget.dataset.info;
        if ((e = JSON.parse(e)).isLimited) return !1;
        this.subWareBybutton(e);
    },
    subWareBybutton: function(t) {
        var e = t.skunum, a = t.remainNumInt, i = void 0;
        i = parseInt(e) - 1, a = parseInt(a), i <= 0 || (i > a && a >= 0 && (i = a), this.modifyNum(i, t));
    },
    addWareBybutton: function(t) {
        var e = t.currentTarget.dataset.info, a = e = JSON.parse(e), i = a.skunum, s = a.limitSukNum, o = a.remainNumInt, r = void 0;
        r = parseInt(i) + 1, s = parseInt(s), o = parseInt(o), r > s || r > o && o >= 0 || this.modifyNum(r, e);
    },
    modifyWare: function(t) {
        var e = t.detail.value, i = t.currentTarget.dataset.info, s = i = JSON.parse(i), o = s.skunum, r = s.limitSukNum, n = s.remainNumInt, c = s.iatleastnum;
        if (o == e) return !1;
        e < c && (a.default.show({
            icon: a.default.icon.error,
            message: "商品限购，最少需要购买" + c + "件哦~",
            duration: 2e3,
            pageObj: this
        }), e = c), r = parseInt(r), n = parseInt(n), e > r && (a.default.show({
            icon: a.default.icon.error,
            message: "修改数量失败，请重试",
            duration: 2e3,
            pageObj: this
        }), e = r), e > n && n >= 0 && (e = n), e < 1 && (a.default.show({
            icon: a.default.icon.error,
            message: "修改数量失败，请重试",
            duration: 2e3,
            pageObj: this
        }), e = 1), this.modifyNum(e, i);
    },
    modifyNum: function(t, e) {
        var a = e.productType, i = e.skuid, s = e.shopid, o = void 0, n = void 0, c = void 0;
        if ("pure" == a) o = i, n = t; else if ("suit" == a) {
            var u = e.suitId, d = e.suitNum, l = e.sType;
            o = u, d = t;
        }
        c = r.globalRequestUrl + this.data.pDir + "/cart/modify.json?wareId=" + o + "&num=" + n, 
        "suit" == a && (c = this.appendSuit(c, l, i, d)), this.changeNum2Server(s, c);
    },
    changeNum2Server: function(t, e) {
        var a = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: e,
            success: function(e) {
                e && (a.saveCartNum(e), a.checkProductRender(t, e));
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("changeNum2Server执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    saveCartNum: function(t) {
        if (t && t.cartJson && t.cartJson.Num) {
            var e = t.cartJson.Num;
            e > 0 && (e > 99 && (e = "99+"), wx.setStorageSync("itemCartNum", e));
        } else wx.setStorageSync("itemCartNum", 0);
    },
    appendSuit: function(t, e, a, i) {
        return t && (e && (t += "&sType=" + e), a && (t += "&suitSkuId=" + a), i && (t += "&suitSkuNum=" + i)), 
        t;
    },
    submitFn: function(t) {
        o.messagePush({
            formId: t.detail.formId,
            times: 1,
            type: 10003
        }), this.data.isLogined || i.getUserInfo(t), this.pingClick("WShopCart_GoToSettle", "", "A", "../pay/pay", t), 
        wx.navigateTo({
            url: "/pages/pay/pay"
        });
    },
    toLogin: function(t) {
        i.getUserInfo(t), i.globalLoginShow(this);
    },
    checkAllHandler: function(t) {
        var e = t.currentTarget.dataset.checktype, a = 0;
        e && ("all" == e ? a = 8 : "notall" == e && (a = 7), this.changeAndSaveAllChecked(a));
    },
    changeAndSaveAllChecked: function(t) {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: r.globalRequestUrl + e.data.pDir + "/cart/check.json?checked=" + t,
            success: function(t) {
                t && e.checkProductRender("", t);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("changeAndSaveAllChecked执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    deleteItem: function(t) {
        var e, a, i = t.currentTarget.dataset.info, s = i = JSON.parse(i), n = s.productType, c = s.skuid, u = s.skunum, d = s.shopid, l = this;
        wx.showModal({
            content: "确认要删除此商品吗？",
            success: function(s) {
                if (s.confirm) {
                    if ("pure" == n) e = c, a = u; else if ("suit" == n) {
                        var h = i.suitId, f = i.suitNum, p = i.sType;
                        e = h, a = f;
                    }
                    var m = r.globalRequestUrl + l.data.pDir + "/cart/remove.json?wareId=" + e + "&num=" + a;
                    "suit" == n && (m = l.appendSuit(m, p, c, u)), l.changeNum2Server(d, m), o.messagePush({
                        formId: t.detail.formId,
                        times: 1,
                        type: 10005
                    });
                } else s.cancel && l.setData({
                    slideItems: {}
                });
            }
        });
    },
    beWareDetail: function(t) {
        var e = t.currentTarget.dataset.skuid, a = wx.getStorageSync("activityUrl");
        e && (a ? wx.redirectTo({
            url: "/pages/product/product?wareId=" + e
        }) : wx.navigateTo({
            url: "/pages/product/product?wareId=" + e
        }));
    },
    beMSearchPage: function(t) {
        for (var e = t.currentTarget.dataset.activityid, a = t.currentTarget.dataset.skuid, i = t.currentTarget.dataset.canselectpromotions, o = "", r = 0; r < i.length; r++) 1 == i[r].checkType && (o = i[r].title);
        s.click({
            eid: "WShop_GoTogether",
            elevel: "3",
            eparam: "",
            target: "/pages/piecelist/piecelist?activityId=" + e + "&skuId=" + a + "&promotionTitle=" + o,
            event: t
        }), e && a && wx.navigateTo({
            url: "/pages/piecelist/piecelist?activityId=" + e + "&skuId=" + a + "&promotionTitle=" + o
        });
    },
    showChooseGifts: function(t) {
        var e = t.currentTarget.dataset.id, a = r.globalRequestUrl + this.data.pDir + "/cart/getCartSelectGifts.json?promotionId=" + e, s = this;
        wx.showLoading({
            title: "加载中"
        }), i.request({
            url: a,
            success: function(t) {
                t && s.dealWithGiftData(t);
            },
            complete: function() {
                wx.hideLoading();
            },
            fail: function(t) {
                i.reportErr(encodeURIComponent("showChooseGifts执行失败，具体信息：") + t.errMsg);
            }
        });
    },
    dealWithGiftData: function(t) {
        this.setData({
            heightInfo: {
                boxMinHeight: 1 * this.data.screenHeight / 3 - 135 + "px",
                boxMaxHeight: 2 * this.data.screenHeight / 3 - 135 + "px"
            },
            giftData: t,
            isFreezed: !0,
            isGiftWinShow: !0
        });
    },
    deleteGifts: function(t) {
        var e, a = t.currentTarget.dataset.info, i = a = JSON.parse(a), s = i.giftid, n = i.giftnum, c = i.shopid, u = (i.vendorId, 
        i.suitId), d = i.suitNum, l = i.giftSType, h = this;
        wx.showModal({
            content: "确认要删除此商品吗？",
            success: function(a) {
                a.confirm ? (e = r.globalRequestUrl + h.data.pDir + "/cart/remove.json?wareId=" + u + "&num=" + d, 
                e = h.appendSuit(e, l, s, n), o.messagePush({
                    formId: t.detail.formId,
                    times: 1,
                    type: 10005
                }), h.changeNum2Server(c, e)) : a.cancel;
            }
        });
    },
    closeGiftBox: function() {
        this.setData({
            isGiftWinShow: !1
        });
    },
    selectGifts: function(t) {
        var e = this, i = e.data.giftData.suit, s = e.data.giftData.suit.giftList, o = t.currentTarget.dataset.gid, r = t.currentTarget.dataset.gnum, n = s.map(function(t) {
            if (t.id == o) if (t.checkType) "1" == t.checkType && (t.checkType = 0, i.selectedGiftSize = i.selectedGiftSize - r, 
            t.cls && "newSelect" != t.cls || (t.cls = "newCancel")); else {
                var s = i.selectedGiftSize + Number(r);
                if (1 == i.maxGiftNum) {
                    0 == i.selectedGiftSize ? i.selectedGiftSize = s : i.selectedGiftSize = s - 1;
                    var n = e.data.giftData.suit.giftList;
                    n.forEach(function(t) {
                        t.checkType && delete t.checkType;
                    }), e.setData({
                        "giftData.suit.giftList": n
                    }), t.checkType = 1, t.cls && "newCancel" != t.cls || (t.cls = "newSelect");
                } else if (s > i.maxGiftNum) {
                    var c = "";
                    2 == i.giftType ? c = "换购" : 4 == giftType && (c = "满赠"), a.default.show({
                        icon: a.default.icon.error,
                        message: "最多只能" + c + "件哦!",
                        duration: 2e3,
                        pageObj: e
                    });
                } else i.selectedGiftSize = s, t.checkType = 1, t.cls && "newCancel" != t.cls || (t.cls = "newSelect");
            }
            return t;
        });
        i.giftList = n, this.setData({
            "giftData.suit": i
        });
    },
    hideChooseGifts: function() {
        var t, e = this, a = e.data.giftData.suit, i = e.data.giftData.suit.giftList, s = "", o = "", n = !1;
        t = 13 == a.promotionAmount.sType ? "16" : "", i.forEach(function(e) {
            if ("1" == e.checkType) {
                i = a.suitId + "@@1@@" + t + "@@" + e.id + "@@1";
                s = "" == s ? i : s + "@@@" + i;
            }
            if ("newSelect" == e.cls && (delete e.cls, n = !0), "newCancel" == e.cls) {
                delete e.cls, n = !0;
                var i = a.suitId + "@@1@@" + t + "@@" + e.id + "@@1";
                o = "" == o ? i : o + "@@@" + i;
            }
        });
        var c;
        n ? (c = "" == s ? r.globalRequestUrl + e.data.pDir + "/cart/removeWares.json?wareInfos=" + o : r.globalRequestUrl + e.data.pDir + "/cart/addWares.json?wareInfos=" + s, 
        e.saveCheckInfo4Product("", c, function() {
            e.closeGiftBox();
        })) : e.closeGiftBox();
    },
    openPromotionDialog: function(t) {
        var e = t.currentTarget.dataset;
        this.setData({
            promotionDialog: {
                status: !0,
                shopId: e.shopid,
                skuId: e.skuid,
                skuNum: e.skunum,
                sType: e.stype,
                suitId: e.suitid,
                suitNum: e.suitnum,
                activeId: e.activeid,
                data: JSON.parse(e.promotions)
            }
        });
    },
    hidePromotionDialog: function() {
        this.setData({
            promotionDialog: {
                status: !1,
                shopId: "",
                skuId: "",
                skuNum: "",
                sType: "",
                suitId: "",
                suitNum: "",
                activeId: "",
                data: []
            }
        });
    },
    setPromotion: function(t) {
        var e = this, a = this.data.promotionDialog, s = t.currentTarget.dataset.promotionid, o = a.activeId, n = "s" + a.skuId;
        s != o && (this.setData({
            promotionDialog: Object.assign(a, {
                activeId: s
            })
        }, function() {
            e.hidePromotionDialog();
        }), i.request({
            url: r.globalRequestUrl + this.data.pDir + "/cart/changePromotion.json",
            data: {
                suitId: a.suitId,
                suitNum: a.suitNum,
                skuId: a.skuId,
                skuNum: a.skuNum,
                sType: a.sType,
                activePromotionId: s
            },
            success: function(t) {
                t && t.cart && t.cart.cartInfo ? (e.checkProductRender(a.shopId, {
                    cart: t.cart.cartInfo
                }), e.setData({
                    anchor: n
                })) : console.log("数据结构异常！");
            },
            complete: function() {},
            fail: function(t) {
                i.reportErr(encodeURIComponent("购物车更改促销数据请求request失败，具体信息：") + t.errMsg);
            }
        }));
    },
    setScreenInfo: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                t.setData({
                    screenHeight: e.windowHeight
                });
            }
        });
    },
    listScroll: function(t) {
        t.detail.scrollTop > this.data.screenHeight && "none" == this.data.toTopDisplay && this.setData({
            toTopDisplay: "block"
        }), t.detail.scrollTop <= this.data.screenHeight && "block" == this.data.toTopDisplay && this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function() {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    pingClick: function(t, e, a, i, o) {
        s.click({
            eid: t,
            elevel: e,
            eparam: a,
            pname: "",
            pparam: "",
            target: i,
            event: o
        });
    }
}));