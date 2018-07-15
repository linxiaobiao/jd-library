function t(t, a, e) {
    return a in t ? Object.defineProperty(t, a, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[a] = e, t;
}

var a = require("../../components/JKPTab/JKPTab.js"), e = require("../../utils/util.js"), r = require("../../utils/keplerReport.js").init(), s = getApp();

Page(Object.assign({}, a.JKPTab, {
    data: {
        rankListTab: {
            list: [ {
                title: "畅销榜",
                iconName: "hot-sale",
                rankId: "rank3008"
            }, {
                title: "新书榜",
                iconName: "new-book",
                rankId: "rank3009"
            } ],
            selectedRankId: "rank3008"
        },
        tabData: {
            tab: {
                list: [],
                selectedId: "",
                scroll: !0,
                menu: !0,
                menuTopTip: "请选择以下标签",
                menuStatus: "close"
            }
        },
        updataTipShow: !1,
        soDir: "/kwxso",
        scrollTop: 0,
        topVal: 0,
        tabTranslateY: 0
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                var e = t.windowWidth, r = t.windowHeight, s = parseFloat(e / 750).toFixed(3);
                a.setData({
                    screenHeight: r,
                    screenWidth: e,
                    rpxRatio: s
                });
            }
        }), (0, e.promiseRequest)({
            url: "" + s.globalRequestUrl + this.data.soDir + "/rank/rankList?rankId=" + this.data.rankListTab.selectedRankId + "&cateId=1713&time=1DAY&_format_=json"
        }).then(function(t) {
            return a.resolveTabData(t), (0, e.promiseRequest)({
                url: "" + s.globalRequestUrl + a.data.soDir + "/rank/rankInfo?rankId=" + a.data.rankListTab.selectedRankId + "&cateId=" + a.data.tabData.tab.selectedId + "&time=1DAY&_format_=json"
            });
        }).then(function(t) {
            a.resolveListData(t);
        }).catch(function(t) {
            (0, e.reportErr)(encodeURIComponent("request异常，具体信息：") + t.errMsg);
        }), r.set({
            urlParam: t,
            title: "排行榜",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        r.pv();
    },
    handleRankListTab: function(a) {
        var e;
        this.setData((e = {}, t(e, "rankListTab.selectedRankId", a.target.dataset.rankId), 
        t(e, "scrollTop", .001 * Math.random()), e)), this.requestListData(), r.click({
            eid: "WLibrary_RankTab",
            elevel: "",
            eparam: a.target.dataset.rankId,
            target: "",
            event: a
        });
    },
    updataTipShow: function() {
        var t = this;
        this.setData({
            updataTipShow: !0
        }), setTimeout(function() {
            t.setData({
                updataTipShow: !1
            });
        }, 2e3);
    },
    resolveTabData: function(t) {
        var a = void 0;
        t && t.rankList && t.rankList.result && t.rankList.result.cateList && (a = t.rankList.result.cateList);
        var e = {};
        a && (e["tabData.tab.list"] = a, e["tabData.tab.selectedId"] = a[0].id), t && t.rankList && t.rankList.result && t.rankList.result.topLabel && (e["tabData.tab.menuTopTip"] = t.rankList.result.topLabel), 
        this.setData(e);
    },
    requestListData: function() {
        (0, e.request)({
            url: "" + s.globalRequestUrl + this.data.soDir + "/rank/rankInfo?rankId=" + this.data.rankListTab.selectedRankId + "&cateId=" + this.data.tabData.tab.selectedId + "&time=1DAY&_format_=json",
            success: this.resolveListData.bind(this)
        });
    },
    resolveListData: function(t) {
        var a = {};
        t && t.rankInfo && t.rankInfo.result && (t.rankInfo.result.rankInfo && (a.rankInfo = t.rankInfo.result.rankInfo), 
        t.rankInfo.result.refreshTime && t.rankInfo.result.refreshTime.topPrompt && (a.topPrompt = t.rankInfo.result.refreshTime.topPrompt), 
        this.setData(a));
    },
    handleTabTap: function(t) {
        this.updataTipShow(), this.requestListData(), this.setData({
            scrollTop: .001 * Math.random()
        }), r.click({
            eid: "WLibrary_RankClassTab",
            elevel: "",
            eparam: "" + this.data.tabData.tab.selectedId,
            target: "",
            event: t
        });
    },
    handleUnfoldTabTap: function(t) {
        this.updataTipShow(), this.requestListData(), this.setData({
            scrollTop: .001 * Math.random()
        }), r.click({
            eid: "WLibrary_RankClassTab",
            elevel: "",
            eparam: "" + this.data.tabData.tab.selectedId,
            target: "",
            event: t
        });
    },
    handleTabMask: function() {
        this.setData(t({}, "tabData.tab.menuStatus", "close"));
    },
    goToProduct: function(t) {
        var a = t.currentTarget.dataset.wareid;
        wx.navigateTo({
            url: "../product/product?wareId=" + a
        }), r.click({
            eid: "WLibrary_RankProduct",
            elevel: "4",
            eparam: this.data.tabData.tab.selectedId + "_" + (t.currentTarget.dataset.idx + 1) + "_" + a,
            target: "../product/product?wareId=" + a,
            event: t
        });
    },
    listScroll: function(t) {
        var a = this.data.topVal - t.detail.scrollTop;
        a > 0 ? this.setData({
            topVal: t.detail.scrollTop,
            tabTranslateY: 0
        }) : a <= 0 && t.detail.scrollTop > 46 && this.setData({
            topVal: t.detail.scrollTop,
            tabTranslateY: -46
        });
    },
    handleUnfoldTabMenu: function(t) {
        r.click({
            eid: "WLibrary_RankClassUnfold",
            elevel: "",
            eparam: "",
            target: "",
            event: t
        });
    }
}));