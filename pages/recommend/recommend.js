(function(t) {
    t && t.__esModule;
})(require("../../components/toast/toast.js")), require("../../utils/util.js");

var t = require("../../utils/h5Login.js"), e = (require("../../utils/keplerReport.js").init(), 
require("../../utils/individualMark.js")), a = getApp();

Page({
    data: {
        h5Hash: {},
        url: "",
        pageTitle: "",
        shareTitle: a.shareDesc,
        shareSetting: {
            isset: !1,
            url: "",
            rurl: "",
            title: a.shareDesc,
            imgurl: ""
        }
    },
    onLoad: function(t) {
        if (t && void 0 != t.url) {
            var e = decodeURIComponent(t && t.url);
            try {
                var a = wx.getSystemInfoSync();
                a && a.SDKVersion && (e = this.addUrlParam(e, {
                    wxappver: a.SDKVersion
                }));
            } catch (t) {
                console.error(t);
            }
            this.setData({
                url: e,
                shareTitle: t.shareTitle || ""
            }), t.pageTitle && wx.setNavigationBarTitle({
                title: t.pageTitle
            });
        }
    },
    onShow: function(t) {
        console.log("recommend ", t, "this.data.url ", this.data.url), "1008" == a.globalData.scene && this.data.url ? this.initH5Login(a.globalData.fromH5LoginRedirectUrl || this.data.url) : this.initData();
    },
    initH5Login: function(i) {
        i = decodeURIComponent(i);
        var r = this, n = "", s = {
            appkey: wx.getStorageSync("jdwcx").wxversion,
            source: a.globalData.source,
            customerinfo: e.getCustomerinfo() || ""
        }, o = JSON.stringify(s), l = encodeURIComponent(i + "&cookie=" + o);
        t.promiseGentoken().then(function(t) {
            0 == t.data.err_code && (n = t.data.url + "?to=" + l + "&tokenkey=" + t.data.tokenkey, 
            r.setData({
                url: n
            }));
        });
    },
    initData: function() {
        var t = this, e = "https://pro.m.jd.com/mini/active/2YNjXaTGnVWMVcccZkcrZb6sQY8V/index.html?wxAppName=Kepler&_wv=1&activenologin=1&_mlogin=1";
        wx.request({
            url: 'https://api.m.jd.com/client.action?functionId=queryMaterialAdverts&body={"ids":"00951805","stage":0,"commentType":"","sourceCode":"jshop","pageId":"ADSDFSDFS"}&screen=1081*1921&client=wh5&clientVersion=1.0.0&sid=994d51c8310a73bf7fd138a961cbc616&uuid=788324938&_=1481687503366',
            success: function(i) {
                var r = i.data && i.data.advertInfos || [];
                if (r.length) {
                    for (var n = r[0].list, s = {}, o = 0, l = n.length; o < l; o++) {
                        var c = n[o];
                        s[c.comment[0] || "default"] = c.link;
                    }
                    s[a.globalData.fromAppid] ? s[a.globalData.fromAppid] = "https:" + s[a.globalData.fromAppid] + "?wxAppName=Kepler&_wv=1&activenologin=1&_mlogin=1" : s.default ? s[a.globalData.fromAppid] = "https:" + s.default + "?wxAppName=Kepler&_wv=1&activenologin=1&_mlogin=1" : s[a.globalData.fromAppid] = e;
                    var u = s[a.globalData.fromAppid];
                    t.setData({
                        url: u
                    }), t.initH5Login(t.data.url);
                } else t.setData({
                    url: e
                });
            },
            fail: function() {
                t.setData({
                    url: e
                });
            }
        });
    },
    addUrlParam: function(t, e) {
        var a = t.split("#"), i = a[1];
        t.indexOf("?");
        t = a[0];
        for (var r in e) {
            var n = new RegExp("([?&])" + r + "=[^&]*(&|$)", "i");
            n.test(t) ? t = t.replace(n, "$1" + r + "=" + e[r] + "$2") : t += (t.indexOf("?") > -1 ? "&" : "?") + r + "=" + e[r];
        }
        return i && (t = t + "#" + i), console.log("url", t), t;
    },
    onMessage: function(t) {
        for (var e = t.detail.data || [], a = null, i = e.length; i >= 0; i--) if (e[i] && e[i].snsset) {
            a = e[i];
            break;
        }
        a && (this.data.shareSetting.isset = !0, this.data.shareSetting.url = a.url || "", 
        this.data.shareSetting.title = a.title || "", this.data.shareSetting.imgurl = a.imgurl || "", 
        this.data.shareSetting.rurl = a.rurl || "");
    },
    onShareAppMessage: function(t) {
        if (console.log("onShareAppMessage", t, this.data.shareSetting), this.data.shareSetting.isset) {
            var e = this.data.shareSetting.rurl, a = {
                title: this.data.shareSetting.title || this.data.shareTitle || "京东购物·多快好省",
                path: "/pages/recommend/recommend?url=" + encodeURIComponent(this.data.shareSetting.url || t.webViewUrl),
                success: function(t) {
                    e ? (console.log("callback", e), wx.redirectTo({
                        url: "/pages/recommend/recommend?url=" + encodeURIComponent(e)
                    })) : wx.showToast({
                        title: "转发成功",
                        icon: "success"
                    });
                },
                fail: function() {}
            };
            return this.data.shareSetting.imgurl && (a.imageUrl = this.data.shareSetting.imgurl), 
            this.data.shareSetting = {
                isset: !1,
                url: "",
                rurl: "",
                title: "",
                imgurl: ""
            }, a;
        }
        return {
            title: this.data.shareTitle || "京东购物·多快好省",
            path: "/pages/recommend/recommend?url=" + encodeURIComponent(t.webViewUrl),
            success: function(t) {
                wx.showToast({
                    title: "转发成功",
                    icon: "success"
                });
            },
            fail: function() {}
        };
    }
});