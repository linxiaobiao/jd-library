var t = require("../../utils/util.js"), a = require("../../utils/keplerReport.js").init(), e = require("../../utils/unionClick").unionClick, r = getApp();

Page({
    data: {
        searchdata: {
            type: 1,
            bable: !1
        },
        curTabId: 0,
        curContentId: 0,
        categoryList: [],
        superList: [ {
            name: "图书",
            id: "1713"
        }, {
            name: "音乐",
            id: "4051"
        }, {
            name: "影视",
            id: "100005754"
        }, {
            name: "教育",
            id: "100005756"
        }, {
            name: "邮币",
            id: "13887"
        } ],
        superCurIndex: 0,
        kwxcid1List: [ "1713", "4051", "4052", "4053", "13887" ]
    },
    onLoad: function(t) {
        this.getCatogoryList("1713"), a.set({
            urlParam: t,
            title: "分类页",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        a.pv();
    },
    onShareAppMessage: function() {
        return {
            title: r.shareDesc,
            desc: r.shareDesc,
            path: "/pages/category/category"
        };
    },
    showCurrTab: function(t) {
        var r = t.currentTarget.dataset.id, s = t.currentTarget.dataset.cid;
        e(a, "WLibrary_ClassTab", "", s, "", t), this.setData({
            curTabId: r,
            curContentId: r
        });
    },
    getCatogoryList: function(a) {
        var e = this;
        t.request({
            url: r.globalRequestUrl + "/kwxso/category/list.action?_format_=json",
            data: {
                catelogyId: a
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded"
            },
            success: function(t) {
                e.setData({
                    categoryList: t.catalogBranchKwx.data
                });
            }
        });
    },
    gotoSearchList: function(t) {
        var r = t.currentTarget.dataset;
        e(a, "WLibrary_ClassTab3", "", r.cid, "../searchlist/searchlist", t), wx.navigateTo({
            url: "../searchlist/searchlist?cid=" + r.cid + "&path=" + r.path + "&name=" + r.name + "&kwxcid1=" + this.data.kwxcid1List[this.data.superCurIndex]
        });
    },
    gotoSearch: function(t) {
        e(a, "WLibrary_ClassSearch", "", "", "../searchlist/searchlist", t), wx.navigateTo({
            url: "../searchlist/searchlist?bfocus=true"
        });
    },
    supertabClick: function(t) {
        this.setData({
            superCurIndex: t.currentTarget.dataset.index,
            curTabId: 0
        }), this.getCatogoryList(t.currentTarget.dataset.id);
    }
});