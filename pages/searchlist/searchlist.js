var t = require("../../utils/util.js"), a = require("../../utils/keplerReport.js").init(), e = require("../../utils/unionClick").unionClick, o = getApp();

Page({
    data: {
        searchdata: {
            type: 1,
            bable: !0
        },
        confirmdata: {
            visible: !1,
            title: "确定清空历史搜索吗？",
            message: "",
            leftTxt: "取消",
            rightTxt: "确定"
        },
        itemList: [],
        categoryInfo: {},
        productList: [],
        bgetproduct: !1,
        nomoreProduct: !1,
        keyword: "",
        sort: "",
        priceSort: 2,
        page: 1,
        currKey: "",
        promotionFlag: {
            3: "券",
            4: "豆",
            5: "赠",
            55: "",
            100: "plus"
        },
        top: 0,
        detailsTime: new Date().getTime(),
        sortTime: new Date().getTime(),
        historyData: [],
        kwxcid1: ""
    },
    onLoad: function(t) {
        console.log(t), this.setData({
            "categoryInfo.cid": t.cid || "",
            "categoryInfo.path": t.path || "",
            "categoryInfo.name": t.name,
            keyword: t.name,
            "searchdata.bfocus": !!t.bfocus,
            "searchdata.text": t.name,
            search: t.search || 1,
            bgetproduct: !1,
            author: t.author,
            kwxcid1: t.kwxcid1 || "1713,4051,4052,4053,13887",
            historyData: wx.getStorageSync("searchHistory")
        }), t.cid ? this.showProductOfCategory() : t.name && this.showProductList();
        var e = t.author ? t.author : "搜索";
        wx.setNavigationBarTitle({
            title: e
        }), a.set({
            urlParam: t,
            title: "搜索页",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var t = this;
        wx.getSystemInfo({
            success: function(a) {
                console.log(a);
                var e = 2 * a.windowHeight;
                t.data.author && (e += 116), t.setData({
                    scrollHeight: e
                });
            }
        }), a.pv();
    },
    onShareAppMessage: function() {
        return {
            title: "搜索",
            desc: o.shareDesc,
            path: "/pages/searchlist/searchlist?name=" + this.data.keyword
        };
    },
    showProductList: function(a, e, s, r, i) {
        var c = this;
        e = e || 1;
        var n = {
            _format_: "json",
            keyword: a || this.data.keyword,
            page: e,
            sort: s || this.data.sort || "",
            kwxcid1: i || "1713,4051,4052,4053,13887"
        };
        r && (n.categoryId = this.data.categoryInfo.cid), t.request({
            url: o.globalRequestUrl + "/kwxso/ware/searchList.action",
            data: n,
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                console.log("searchresult: ", t);
                var a = t.valueKwx;
                if (a.wareList && a.wareList.wareList) {
                    var o = void 0, s = void 0, r = t.valueKwx.wareList.wareList;
                    for (var i in r) {
                        var n = r[i], d = n.jdPrice;
                        if (d) {
                            var h = d.indexOf(".");
                            o = d.substring(0, h), s = d.substring(h), n.bigPrice = o, n.smallPrice = s;
                        }
                        var l = n.promotionFlag;
                        for (var u in l) {
                            var g = l[u];
                            l[u] = c.data.promotionFlag[g] || "";
                        }
                    }
                    var p = t.valueKwx.wareList.wareList, w = c.data.keyword + "-" + c.data.sort;
                    console.log("me.data.currKey", c.data.currKey, w), "" != c.data.currKey && w == c.data.currKey ? p = c.data.productList.concat(t.valueKwx.wareList.wareList) : c.setData({
                        scrollTop: 0
                    }), c.setData({
                        productList: p,
                        page: e,
                        loading: !1,
                        currKey: c.data.keyword + "-" + c.data.sort,
                        bgetproduct: !0,
                        nomoreProduct: !1
                    }), console.log("2　this.data.bgetproduct：　" + c.data.bgetproduct);
                } else if ("number" == typeof a) wx.redirectTo({
                    url: "../../pages/product/product?wareId=" + t.valueKwx
                }); else {
                    var y = void 0, f = c.data.keyword + "-" + c.data.sort;
                    "" != c.data.currKey && f == c.data.currKey ? y = c.data.productList : c.setData({
                        scrollTop: 0
                    }), c.setData({
                        productList: y,
                        page: e,
                        loading: !1,
                        currKey: c.data.keyword + "-" + c.data.sort,
                        bgetproduct: !0,
                        nomoreProduct: !0
                    });
                }
            }
        });
    },
    showProductOfCategory: function() {
        this.showProductList(this.data.categoryInfo.name, 1, "", this.data.categoryInfo.cid, this.data.kwxcid1);
    },
    showProductBySort: function(t) {
        var o = new Date().getTime();
        if (!(o - this.data.sortTime < 800)) {
            this.setData({
                sortTime: o
            });
            var s = t.currentTarget.dataset.sort;
            3 != s && 2 != s || (s = 3 == s ? 2 : 3, this.setData({
                priceSort: s
            })), s != this.data.sort && (this.setData({
                sort: s,
                bgetproduct: !1
            }), e(a, "WLibrary_FilterTab", "", "", "", t), this.showProductList(this.data.keyword, 1, s));
        }
    },
    getMore: function(t) {
        var a = this.data.page;
        this.data.loading || (console.log("getMore page: ", this.data, a), this.setData({
            loading: !0
        }), a++, this.showProductList(this.data.keyword, a));
    },
    gotoProductDetail: function(t) {
        var a = new Date().getTime();
        if (console.log("time", a - this.data.detailsTime), !(a - this.data.detailsTime < 3e3)) {
            this.setData({
                detailsTime: a
            });
            var e = getCurrentPages(), o = t.currentTarget.dataset.wareid;
            console.log("searchList: " + e.length), e.length > 4 ? wx.redirectTo({
                url: "../../pages/product/product?wareId=" + o
            }) : wx.navigateTo({
                url: "../../pages/product/product?wareId=" + o
            });
        }
    },
    gotoScroll: function(t) {
        t.detail.scrollTop > 300 ? this.setData({
            bShowTop: !0
        }) : this.setData({
            bShowTop: !1
        }), this.data.top - t.detail.scrollTop > 0 ? this.setData({
            up: !0,
            nomoreProduct: !1
        }) : this.setData({
            up: !1
        }), this.setData({
            top: t.detail.scrollTop
        });
    },
    gotop: function() {
        console.log("1: " + this.data.scrollTop), this.setData({
            scrollTop: 0
        }), console.log(this.data.scrollTop);
    },
    gotoSearch: function(t) {
        this.setData({
            "searchdata.text": t.currentTarget.dataset.value,
            "searchdata.bfocus": !0
        });
    },
    setFocus: function() {
        this.setData({
            "searchdata.bfocus": !0
        });
    },
    inputText: function(t) {
        this.setData({
            "searchdata.text": t.detail.value
        });
    },
    search: function(t) {
        var o = t.currentTarget.dataset.history;
        o && this.setData({
            "searchdata.text": o
        });
        var s = this.data.searchdata.text;
        s.trim() ? (e(a, "WLibrary_Search", "", "", "../searchlist/searchlist", t), this.setData({
            keyword: s,
            sort: "",
            "searchdata.bfocus": !1,
            "searchdata.text": s,
            search: 1,
            bgetproduct: !1
        }), this.setHistory(s), this.showProductList()) : wx.navigateBack({
            delta: 1
        });
    },
    setHistory: function(t) {
        var a = wx.getStorageSync("searchHistory"), e = a.length || 0;
        if (0 == e) wx.setStorageSync("searchHistory", [ t ]); else {
            if (this.judgeRepeat(a, t)) return;
            20 == e && a.pop(), a.unshift(t), wx.setStorageSync("searchHistory", a);
        }
        this.setData({
            historyData: wx.getStorageSync("searchHistory")
        });
    },
    judgeRepeat: function(t, a) {
        var e = !1, o = t.indexOf(a);
        return -1 != o && (t.splice(o, 1), t.unshift(a), wx.setStorageSync("searchHistory", t), 
        this.setData({
            historyData: wx.getStorageSync("searchHistory")
        }), e = !0), e;
    },
    cancel: function(t) {
        console.log("cancel"), e(a, "WLibrary_Cancel", "", "", "", t), wx.navigateBack({
            delta: 1
        });
    },
    clearText: function() {
        this.setData({
            "searchdata.text": "",
            "searchdata.bfocus": !0
        });
    },
    startMoveItem: function(t) {
        console.log("clientX", t.touches[0].clientX), this.setData({
            itemX: t.touches[0].clientX
        });
    },
    moveItem: function(t) {
        var a = t.touches[0].clientX, e = "left:30rpx;", o = 0, s = this.data.itemX - a;
        console.log("cx", t.touches[0].clientX), console.log("bi", s), s > 0 && (e = "left:" + -s + "rpx", 
        o = t.currentTarget.dataset.hindex || 0), this.setData({
            hstyle: e,
            hindex: o
        });
    },
    stopMoveItem: function(t) {
        console.log("stopMoveItem", t);
        var a = t.changedTouches[0].clientX, e = "left:30rpx;", o = this.data.itemX - a;
        console.log("stopMoveItem bi", o), o > 0 && (e = "left:" + -(o = 120) + "rpx"), 
        console.log("cx", t.changedTouches[0].clientX), this.setData({
            hstyle: e
        });
    },
    deleteItem: function(t) {
        var a = wx.getStorageSync("searchHistory");
        a.splice(t.currentTarget.dataset.hindex, 1), wx.setStorageSync("searchHistory", a);
        this.setData({
            historyData: wx.getStorageSync("searchHistory"),
            hindex: "left:30rpx;"
        });
    },
    clearHistory: function() {
        this.setData({
            "confirmdata.visible": !0
        });
    },
    cancelHook: function() {
        this.setData({
            "confirmdata.visible": !1
        });
    },
    submitHook: function() {
        wx.setStorageSync("searchHistory", []), this.setData({
            "confirmdata.visible": !1,
            historyData: wx.getStorageSync("searchHistory")
        });
    }
});