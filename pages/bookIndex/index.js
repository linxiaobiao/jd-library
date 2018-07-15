var t = function(t) {
    return t && t.__esModule ? t : {
        default: t
    };
}(require("../../components/toast/toast.js")), r = require("../../utils/util.js"), e = require("../../utils/keplerReport.js").init(), a = require("../../utils/unionClick").unionClick, i = getApp();

Page({
    data: {
        login: {
            encryptedData: "",
            iv: ""
        },
        searchdata: {
            bable: !1
        },
        page: 0,
        productListArray: [ [ {
            wloading: 1,
            images: [],
            wtip: "推荐小马达开启中..."
        } ] ],
        productList: [],
        currGroupPage: 0,
        currGroupPageIdx: "01",
        detailsTime: new Date().getTime()
    },
    onLoad: function(t) {
        e.set({
            urlParam: t,
            title: "京东图书首页",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var t = this, r = this.data.blogin;
        this.checkIsLogin({
            returnUrl: "",
            success: function(e) {
                "999" == e.code ? t.setData({
                    blogin: !1
                }) : t.setData({
                    blogin: !0
                }), r != t.data.blogin && (t.setData({
                    productList: [],
                    productListArray: [ [ {
                        wloading: 1,
                        images: [],
                        wtip: "推荐小马达开启中..."
                    } ] ],
                    currGroupPage: 0,
                    currGroupPageIdx: "01"
                }), t.getWareInfos());
            },
            fail: function() {
                t.setData({
                    blogin: !1
                }), r != t.data.blogin && (t.setData({
                    productList: [],
                    productListArray: [ [ {
                        wloading: 1,
                        images: [],
                        wtip: "推荐小马达开启中..."
                    } ] ],
                    currGroupPage: 0,
                    currGroupPageIdx: "01"
                }), t.getWareInfos());
            }
        }), e.pv();
    },
    getAgain: function() {
        this.getWareInfos();
    },
    getWareInfos: function(t, e) {
        var a = this.data.productListArray;
        if (a.length > 4 && a[a.length - 1].length > 5) console.log("最多加载五组数据~"); else {
            t = t || this.data.page;
            var s = this;
            this.setData({
                bloading: !0
            }), wx.login({
                success: function(a) {
                    a.code && wx.getUserInfo({
                        success: function(o) {
                            s.setData({
                                "login.encryptedData": o.encryptedData,
                                "login.iv": o.iv
                            }), r.request({
                                url: i.globalRequestUrl + "/kwxitem/recommend/getRecommendProducts.json",
                                data: {
                                    code: a.code,
                                    page: t || s.data.page,
                                    pageSize: 10,
                                    category: "1713",
                                    wxVersion: "5c2aa14de7484f4bb8214cc1b1565d9d",
                                    iv: o.iv,
                                    encryptedData: o.encryptedData
                                },
                                success: function(t) {
                                    if (t && t.list) {
                                        s.data.productListArray[0][0].wloading && s.setData({
                                            productListArray: []
                                        });
                                        var r = t.list;
                                        r.push({
                                            luanqibazao: "1"
                                        });
                                        var a = s.data.productListArray;
                                        a.push(r), s.setData({
                                            bloading: !1,
                                            productList: r,
                                            productListArray: a
                                        }), console.log("me.data.productListArray", s.data.productListArray), e && e();
                                    } else s.setData({
                                        productList: [],
                                        productListArray: [ [ {
                                            wnull: 1,
                                            wname: "加载数据失败",
                                            wtip: "数据有些问题，试试重新加载~"
                                        } ] ]
                                    });
                                },
                                fail: function() {}
                            });
                        }
                    });
                }
            });
        }
    },
    checkIsLogin: function(t) {
        t.returnUrl;
        var e = t.success, a = void 0 === e ? function() {} : e, s = t.fail, o = void 0 === s ? function() {} : s;
        r.request({
            url: i.globalRequestUrl + "/item/wxdetail/isLogin.json",
            selfCookie: this.getSelfCookie(),
            success: function(t) {
                a(t);
            },
            fail: function(t) {
                r.reportErr("item isLogin.json fail: " + t.errMsg), o();
            }
        });
    },
    swiperChange: function(t) {
        if (t.detail.source) {
            var r = t.detail.current, e = r < 10 ? r + 1 : r > 10 && r < 21 ? r - 10 : r > 21 && r < 32 ? r - 21 : r > 32 && r < 43 ? r - 32 : r > 43 && r < 54 ? r - 43 : "";
            e = e ? e < 10 ? "0" + e : 10 == e ? e : "" : e, this.setData({
                currGroupPage: r,
                currGroupPageIdx: e
            });
            var a = t.detail.current;
            if (54 == a ? this.setData({
                leftTipOver: !0
            }) : this.setData({
                leftTipOver: !1,
                leftTip: !1
            }), 10 == a || 21 == a || 32 == a || 43 == a || 54 == a) {
                this.data.productListArray;
                var i = 1;
                a > 45 && (i = 2), this.setData({
                    currGroupOver: !0,
                    leftTip: 1 == i || 2 == i,
                    leftTipOver: 2 == i,
                    rightTip: !1
                });
            } else this.setData({
                currGroupOver: !1
            });
        } else this.setData({
            currGroupPage: this.data.currGroupPage
        });
    },
    touchStart: function(t) {
        this.setData({
            currTouchX: t.changedTouches[0].clientX
        });
    },
    touchMove: function(t) {
        var r = t.changedTouches[0].clientX, e = !0;
        if (e = !(r - this.data.currTouchX > 0), !this.data.bloading && this.data.currGroupOver) {
            e ? this.setData({
                leftTip: !0,
                rightTip: !1
            }) : this.setData({
                leftTip: !1,
                rightTip: !1
            });
            var a = this.data.page + 1;
            this.setData({
                page: a
            });
            var i = this;
            this.getWareInfos(a, function() {
                i.data.currGroupOver && e && i.setData({
                    currGroupPage: ++i.data.currGroupPage,
                    currGroupPageForCurrent: i.data.currGroupPage,
                    currGroupOver: !1,
                    leftTip: !1,
                    rightTip: !1
                });
            });
        }
    },
    findMorebooks: function(t) {
        a(e, "WLibrary_FindBook", "", this.data.currGroupPage, "../category/category", t), 
        wx.switchTab({
            url: "../category/category"
        });
    },
    addCartMPing: function(t, a, i) {
        try {
            var s = '{"' + a + '":"' + i + '"}', o = {
                eid: t,
                elevel: "5",
                eparam: a,
                pname: "",
                pparam: "",
                shoppingList: JSON.parse(s)
            };
            e.addToCart(o);
        } catch (t) {
            r.reportErr("item addCartMPing function error: " + t.errMsg);
        }
    },
    addCartFn: function(e) {
        var a = this, s = e.currentTarget.dataset.wareid, o = wx.getStorageSync("sid"), c = wx.getStorageSync("USER_FLAG_CHECK");
        this.addCartMPing("WLibrary_AddCart", this.data.currGroupPage + "_" + s, 1), r.request({
            url: i.globalRequestUrl + "/kwxp/cart/add.json?wareId=" + s + "&num=1&sid=" + o + "&USER_FLAG_CHECK=" + c,
            selfCookie: this.getSelfCookie(),
            success: function(r) {
                var e = 0, i = "", s = {};
                if (r && r.cartJson) {
                    if (r.cartJson.Num) {
                        var o = r.cartJson.Num;
                        o > 0 && (o > 99 && (o = "99+"), wx.setStorageSync("itemCartNum", o), a.setData({
                            cartNum: o,
                            isCartNumShow: !0
                        }));
                    }
                    r.cartJson.resultCode && (e = r.cartJson.resultCode), i = r.cartJson.resultMsg ? r.cartJson.resultMsg : "抱歉，加入购物车失败，请再试一下", 
                    s = 0 == e ? {
                        icon: t.default.icon.success,
                        message: "加入购物车成功",
                        pageObj: a
                    } : {
                        icon: t.default.icon.error,
                        message: i,
                        pageObj: a
                    }, t.default.show(s);
                }
            },
            fail: function(t) {
                r.reportErr("item add.json: " + t.errMsg);
            }
        });
    },
    getSelfCookie: function() {
        var t = "";
        try {
            var r = wx.getStorageSync("regionAddress");
            r && (t = t + "regionAddress=" + r + ";");
        } catch (t) {
            e.error(t);
        }
        return t;
    },
    gotoProductDetails: function(t) {
        var r = new Date().getTime();
        if (!(r - this.data.detailsTime < 2e3)) {
            this.setData({
                detailsTime: r
            });
            var i = t.currentTarget.dataset.wareid;
            a(e, "WLibrary_BookCard", "4", this.data.currGroupPage + "_" + i, "../product/product", t), 
            wx.navigateTo({
                url: "../product/product?wareId=" + i
            });
        }
    },
    gotoMoreList: function(t) {
        a(e, "WLibrary_AuthorName", "4", this.data.currGroupPage, "../searchlist/searchlist", t), 
        wx.navigateTo({
            url: "../searchlist/searchlist?name=" + t.currentTarget.dataset.author + "&search=-1&author=作品列表"
        });
    },
    gotoSearch: function(t) {
        console.log("gotoSearch"), a(e, "WLibrary_HomeSearch", "", "", "../searchlist/searchlist", t), 
        wx.navigateTo({
            url: "../searchlist/searchlist?bfocus=true"
        });
    },
    onShareAppMessage: function() {
        return {
            title: i.shareDesc,
            desc: i.shareDesc,
            path: "/pages/recommend/recommend"
        };
    }
});