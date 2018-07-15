var t = require("../../../../utils/util.js"), e = getApp(), a = {
    getOptionParam: function(t) {
        if (t.scene) {
            var e = decodeURIComponent(t.scene), a = e.split("&");
            if (a[0] ? wx.setStorageSync("customerinfo", a[0]) : wx.removeStorageSync("customerinfo"), 
            a[1]) {
                var i = wx.getStorageSync("wxappStorageName"), r = wx.getStorageSync(i);
                r.unionid = a[1], wx.setStorageSync(i, r);
            }
            a[2] && (t.wareId = a[2]);
            var s = e.split("&");
            console.log(s), "jingFen" == s[0] && (s[1] && (t.wareId = s[1]), s[2] && (t.spreadUrl = "https://union-click.jd.com/jdc?d=" + s[2]));
        }
    },
    updateAddressData: function() {
        var a = this;
        wx.getStorage({
            key: "item_chooseaddress",
            success: function(i) {
                if (i && i.data.addressResult && i.data.addressResult.address && i.data.addressResult.address.length) {
                    for (var r = i.data.addressResult.address, s = 0, n = "", o = "getTowns", u = "", d = "", c = "", m = "", l = "", g = "", f = "", h = "", w = 0; w < r.length; w++) s += 1, 
                    0 == w ? (n = n + "provinceId=" + (l = r[w].regionId) + "&", u = r[w].title) : 1 == w ? (n = n + "cityId=" + (g = r[w].regionId) + "&", 
                    d = r[w].title) : 2 == w ? (n = n + "countryId=" + (f = r[w].regionId) + "&", c = r[w].title) : (n = n + "townId=" + (h = r[w].regionId) + "&", 
                    m = r[w].title);
                    4 == s && (o = "directStock"), a.setData({
                        privoinceName: u,
                        cityName: d,
                        countryName: c,
                        townName: m,
                        privoinceId: l,
                        cityId: g,
                        countryId: f,
                        townId: h
                    }), t.request({
                        url: e.globalRequestUrl + a.data.productDir + "/ware/thirdAddress.json?" + n + "action=" + o + "&wareId=" + a.data.wareId,
                        selfCookie: a.getSelfCookie(),
                        success: a.toThirdAddressPage.bind(a),
                        fail: function(e) {
                            t.reportErr("item thirdAddress.json: " + e.errMsg);
                        }
                    });
                }
                wx.removeStorage({
                    key: "item_chooseaddress",
                    fail: function(t) {}
                });
            },
            error: function(t) {
                wx.removeStorage({
                    key: "item_chooseaddress",
                    fail: function(t) {}
                });
            }
        });
    },
    updateCartNum: function() {
        var t = this;
        wx.getStorage({
            key: "itemCartNum",
            success: function(e) {
                null != e.data && void 0 != e.data && ("number" == typeof e.data && e.data > 0 || "string" == typeof e.data && "99+" == e.data ? t.setData({
                    cartNum: e.data,
                    isCartNumShow: !0
                }) : t.setData({
                    cartNum: e.data,
                    isCartNumShow: !1
                }));
            }
        });
    },
    toViewCartNum: function(t) {
        if (t.desPin && "" != t.desPin) if (null != t.cart.Num || void 0 != t.cart.Num) {
            var e = t.cart.Num;
            e > 0 ? (e > 99 && (e = "99+"), wx.setStorageSync("itemCartNum", e), this.setData({
                cartNum: e,
                isCartNumShow: !0
            })) : 0 == e && (wx.setStorageSync("itemCartNum", e), this.setData({
                cartNum: e,
                isCartNumShow: !1
            }));
        } else wx.removeStorageSync("itemCartNum"), this.setData({
            cartNum: 0,
            isCartNumShow: !1
        }); else ;
    },
    sortServIconList: function(t) {
        if (!t || !t.length) return t;
        for (var e = [], a = [], i = 0; i < t.length; i++) {
            var r = t[i];
            r.iconType && "right" == r.iconType ? e.push(r) : a.push(r);
        }
        return e.concat(a);
    },
    operateIconList: function(t, e) {
        var a = this;
        if (e && e.shortService && e.serviceIconUrl && e.service) {
            var i = {
                iconType: "right",
                imageUrl: e.serviceIconUrl,
                show: !0,
                text: e.shortService,
                tip: e.service
            };
            t && t.length > 0 ? t.unshift(i) : (t = []).unshift(i);
        }
        return a.sortServIconList(t);
    },
    closeModal: function() {
        this.setData({
            "modal.isShow": !1
        });
    },
    splitPrice: function(t) {
        if (!t) return !1;
        var e = t.replace("¥", "");
        if (!parseInt(e)) return "待发布";
        var a = e.split(".");
        return {
            bigPrice: a[0] ? a[0] : "00",
            smallPrice: a[1] ? a[1] : "00"
        };
    },
    formatSeconds: function(t) {
        var e = Math.floor(t / 86400), a = Math.floor(t % 86400 / 3600), i = Math.floor(t % 86400 % 3600 / 60), r = t % 86400 % 3600 % 60;
        return {
            days: e,
            hours: a < 10 ? "0" + a : a,
            minutes: i < 10 ? "0" + i : i,
            sec: r < 10 ? "0" + r : r
        };
    },
    countDown: function(t) {
        var e = this, a = parseInt(t), i = e.formatSeconds(a);
        e.setData({
            countTimeObj: i
        }), e.data.countDownTimer && clearInterval(e.data.countDownTimer), e.data.countDownTimer = setInterval(function() {
            var t = e.formatSeconds(a);
            0 == t.days && 0 == t.hours && 0 == t.minutes && 0 == t.sec ? (clearInterval(e.data.countDownTimer), 
            e.refreshPage()) : a--, e.data.countTimeObj = t, e.setData({
                countTimeObj: e.data.countTimeObj
            });
        }, 1e3);
    },
    getLoginState: function(e) {
        var a = e.event, i = e.returnUrl, r = void 0 === i ? "" : i, s = e.success, n = void 0 === s ? function() {} : s, o = e.isRedirect, u = void 0 !== o && o;
        this.data.isLogin ? n() : (t.getUserInfo(a), this.setData({
            returnpage: r,
            fromPageLevel: u ? 0 : 1
        }), this.loginModalShow());
    },
    getRandomNum: function(t, e) {
        var a = e - t, i = Math.random();
        return t + Math.round(i * a);
    },
    buyNumTipBlurFn: function() {
        var t = this, e = t.data.buyNumValue.toString().replace(/^0+/, ""), a = parseInt(t.data.lowestBuyNum);
        e = parseInt(e), isNaN(e) ? t.data.lowestBuy && a > 1 ? t.setData({
            buyNumTip: "(" + a + "件起购)",
            buyNumValue: a,
            leftLimited: "1"
        }) : t.setData({
            buyNumTip: "(最少1件)",
            buyNumValue: 1,
            leftLimited: "1"
        }) : e >= 200 ? t.setData({
            buyNumTip: "(限购200件)",
            buyNumValue: 200,
            rightLimited: "1"
        }) : t.data.lowestBuy && a > 1 && e <= a ? t.setData({
            buyNumTip: "(" + a + "件起购)",
            buyNumValue: a,
            leftLimited: "1"
        }) : e <= 1 ? t.setData({
            buyNumTip: "(最少1件)",
            buyNumValue: 1,
            leftLimited: "1"
        }) : t.setData({
            buyNumTip: "",
            buyNumValue: e,
            leftLimited: "0",
            rightLimited: "0"
        });
    },
    MinCheckFn: function() {
        var t = parseInt(this.data.buyNumValue), e = parseInt(this.data.lowestBuyNum);
        this.data.lowestBuy && e > 1 ? t <= e ? this.setData({
            leftLimited: "1"
        }) : this.setData({
            leftLimited: "0"
        }) : t <= 1 ? this.setData({
            leftLimited: "1"
        }) : this.setData({
            leftLimited: "0"
        });
    },
    MaxCheckFn: function() {
        var t = this;
        parseInt(this.data.buyNumValue) >= 200 ? t.setData({
            rightLimited: "1"
        }) : t.setData({
            rightLimited: "0"
        });
    },
    assessImg: function(t, e, a, i) {
        var r = (t - 2 * e - 3 * a) / i;
        this.setData({
            assessImgWidth: r,
            assessImgHeight: r
        });
    },
    autoHeight: function(t, e, a, i) {
        for (var r = this, s = r.data.detailImgUrls, n = 0; n < s.length; n++) n == i && (r.data.imgHeight[n] = parseInt(t * e / a), 
        s[n].imgHeight = r.data.imgHeight[n]);
        s[i].display = a < 1 * t / 3 ? "none" : "block", r.setData({
            detailImgUrls: s
        });
    },
    toViewCommentPage: function(t) {
        var e = this;
        if (e.setData({
            wareComment: t
        }), null != e.data.wareComment && null != e.data.wareComment.wareDetailComment && null != e.data.wareComment.wareDetailComment) {
            var a = parseInt(e.data.wareComment.wareDetailComment.goodCnt) / parseInt(e.data.wareComment.wareDetailComment.allCnt) * 100;
            isNaN(a) || (a = 100 == a ? "100%" : ("" + a).substring(0, 2) + "%", e.setData({
                commentPercent: a
            }));
        }
    },
    getBuyStatus: function() {
        var t = this, e = t.data.wareInfo;
        null != e && null != e.ware ? "1" == e.ware.type || e.ware.isBuyCode || "1" == e.ware.isXnzt && e.isXnztEnable || e.ware.isJdOtc || e.ware.isOP || e.ware.isSam || e.ware.isOilCard || e.ware.isCustomize || e.ware.isGameCharge || null != e.feeType || !e.ware.cartFlag || !e.stock.flag || !t.data.isShowLoc && null != e.ware.locInfo && e.ware.locInfo.isloc || e.ware.maintainFlag ? t.setData({
            isBuy: !1
        }) : t.setData({
            isBuy: !0
        }) : t.setData({
            isBuy: !1
        }), this.data.isBuy ? t.setData({
            buyDisabled: !1
        }) : t.setData({
            buyDisabled: !0
        }), null == e || null == e.ware || e.stock.flag ? t.data.isBuy || t.setData({
            buyBtnText: "暂不支持购买"
        }) : t.setData({
            buyBtnText: "暂时无货"
        }), (e && e.ware && !e.ware.cartFlag || e.stock && !e.stock.flag) && t.setData({
            noBuyInfoTxt: "所选的地区暂时无货，非常抱歉！"
        }), t.setData({
            isNoBuyInfoHide: t.data.isBuy
        });
    }
};

module.exports = a;