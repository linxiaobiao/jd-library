var e = require("../../utils/util.js"), t = require("../../utils/keplerReport.js").init(), a = getApp();

Page({
    data: {
        homedir: "/kwxhome",
        pageNum: 1,
        pageSize: 10,
        returnpage: "/pages/appointment/appointment",
        firstHasData: !0,
        moreLoading: !1,
        noMore: !1,
        toTopDisplay: "none",
        scrollTop: "",
        appointmentList: [],
        lock: !0,
        noAppointmentItem: {
            msg: "当前没有预约商品"
        }
    },
    onLoad: function(o) {
        var i = this;
        t.set({
            urlParam: o,
            title: "我的预约",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
        var n = this;
        wx.showToast({
            title: "加载中...",
            icon: "loading",
            duration: 8e3,
            mask: !0
        }), e.request({
            url: a.globalRequestUrl + "/home/user/preSells.json?page=" + n.data.pageNum + "&pageSize=" + n.data.pageSize,
            success: function(e) {
                if ("999" == e.code) i.loginModalShow(); else if (e && e.preSellList && e.preSellList.length > 0) {
                    var t = {
                        firstHasData: !0,
                        pageNum: n.data.pageNum + 1,
                        appointmentList: e.preSellList
                    };
                    1 == e.totalpage && e.preSellList.length >= 3 && (t.noMore = !0), i.setData(t);
                } else i.setData({
                    firstHasData: !1
                });
            },
            complete: function() {
                wx.hideToast();
            },
            fail: function(t) {
                e.reportErr(encodeURIComponent("预约列表页初始化数据请求失败，具体信息：") + t.errMsg);
            }
        }), wx.getSystemInfo({
            success: function(e) {
                n.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        });
    },
    onShow: function() {
        t.pv();
    },
    loginModalShow: function() {
        e.globalLoginShow(this);
    },
    beWareDetail: function(e) {
        var t = e.currentTarget.dataset.skuid;
        t && wx.navigateTo({
            url: "/pages/product/product?wareId=" + t
        });
    },
    scroll: function(e) {
        e.detail.scrollTop > this.data.screenHeight ? this.setData({
            toTopDisplay: "block"
        }) : this.setData({
            toTopDisplay: "none"
        });
    },
    toTopTap: function(e) {
        this.setData({
            toTopDisplay: "none",
            scrollTop: .001 * Math.random()
        });
    },
    ForReachBottom: function() {
        var t = this, o = this;
        this.data.noMore || (o.setData({
            moreLoading: !0
        }), this.data.lock && (this.setData({
            lock: !1
        }), e.request({
            url: a.globalRequestUrl + "/home/user/preSells.json?page=" + o.data.pageNum + "&pageSize=" + o.data.pageSize,
            success: function(e) {
                var a = {
                    moreLoading: !1,
                    lock: !0,
                    pageNum: o.data.pageNum + 1
                };
                if (e && e.preSellList && e.preSellList.length > 0) {
                    var i = t.data.appointmentList.concat(e.preSellList);
                    a.appointmentList = i;
                }
                o.data.pageNum >= e.totalpage && (a.noMore = !0), t.setData(a);
            },
            complete: function() {},
            fail: function(t) {
                e.reportErr(encodeURIComponent("预约列表页 分页数据第" + o.data.pageNum + "页请求失败，具体信息：") + t.errMsg);
            }
        })));
    }
});