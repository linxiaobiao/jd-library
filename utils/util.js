function e(e) {
    return (e = e.toString())[1] ? e : "0" + e;
}

function t(e) {
    if (!e || e == {} || !e.url) return console.log("Data request can not be executed without URL."), 
    !1;
    var t = e.url, r = new Date().getTime();
    t = t.indexOf("?") > 0 ? t + "&fromType=wxapp&timestamp=" + r : t + "?fromType=wxapp&timestamp=" + r, 
    "1" == wx.getStorageSync("presale") && (t += "&isPresale=true");
    var n = a(), i = e.selfCookie;
    i && (n += i), e.data = o(e.data), wx.request({
        url: t,
        data: e.data || {},
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            Cookie: n
        },
        method: e.method || "POST",
        success: function(t) {
            wx.setStorageSync("desPin", t.data.desPin), t.data && t.data.sid && t.data.userFlagCheck ? (wx.setStorageSync("sid", t.data.sid), 
            wx.setStorageSync("USER_FLAG_CHECK", t.data.userFlagCheck)) : t.data && t.data.cookie && t.data.cookie.sid && t.data.cookie.userFlagCheck && (wx.setStorageSync("sid", t.data.cookie.sid), 
            wx.setStorageSync("USER_FLAG_CHECK", t.data.cookie.userFlagCheck)), e.success && e.success(t.data);
        },
        fail: function(t) {
            e.fail && e.fail(t), console.log(t.errMsg), wx.showToast({
                title: "网络信号较差",
                icon: "loading",
                duration: 3e3
            });
        },
        complete: function() {
            e.complete && e.complete();
        }
    });
}

function o(e) {
    var t = "";
    for (var o in e) t += o + "=" + encodeURIComponent(e[o]) + "&";
    return t.substring(0, t.length - 1);
}

function a() {
    var e = getApp(), t = "";
    try {
        var o = wx.getStorageSync("sid"), a = wx.getStorageSync("USER_FLAG_CHECK");
        o && a && (t = "sid=" + o + ";USER_FLAG_CHECK=" + a + ";");
        var r = wx.getStorageSync("jdlogin_pt_key");
        r && (t = t + "pt_key=" + r + ";");
        var i = wx.getStorageSync("unpl");
        i && (t = t + "unpl=" + i + ";");
        var g = wx.getStorageSync("wxappStorageName"), l = wx.getStorageSync(g);
        l && l.wxversion && (t = t + "appkey=" + l.wxversion + ";");
        var s = n.getCustomerinfo();
        if (s && (t = t + "kepler-customerInfo=" + s + ";"), e && e.globalConfig && e.globalConfig.isTriTemplate) {
            var c = n.getExtuserid();
            c && (t = t + "extuserid=" + c + ";");
        }
        var u = wx.getStorageSync("appid");
        u && (t = t + "appid=" + u + ";");
        var d = wx.getStorageSync("mpChannelId");
        d && (t = t + "mpChannelId=" + d + ";"), t += "tempwx" == getApp().globalWxclient ? "wxclient=tempwx;" : "wxclient=gxhwx;";
        var p = wx.getStorageSync("oi_key");
        p && (t = t + "oikey=" + p + ";");
    } catch (e) {
        console.log(e);
    }
    return t;
}

var r = require("./lib/promise.js"), n = require("individualMark.js");

module.exports = {
    formatTime: function(t) {
        var o = t.getFullYear(), a = t.getMonth() + 1, r = t.getDate(), n = t.getHours(), i = t.getMinutes(), g = t.getSeconds();
        return [ o, a, r ].map(e).join("/") + " " + [ n, i, g ].map(e).join(":");
    },
    request: t,
    transfer2Array: function(e) {
        var t = [], o = [];
        for (var a in e) t.push(a), o.push(e[a]);
        return {
            arrKey: t,
            arrValue: o
        };
    },
    reportErr: function(e) {
        var t = getApp(), o = getCurrentPages(), a = o[o.length - 1].__route__, r = t.globalRequestUrl + "/mapi/log/extraction.action?data=", n = {};
        e && (n.product = a, n.exception = e, r += JSON.stringify(n), wx.request({
            url: r
        }));
    },
    globalLoginShow: function(e) {
        wx.removeStorageSync("jdlogin_pt_key"), wx.removeStorageSync("jdlogin_pt_pin");
        var t = "";
        e.data.returnpage && (t = encodeURIComponent(e.data.returnpage));
        var o;
        e.data.fromPageType && (o = encodeURIComponent(e.data.fromPageType));
        var a;
        e.data.fromPageLevel && (a = e.data.fromPageLevel), setTimeout(function() {
            var e = "/pages/login/login?returnpage=" + t + (o ? "&fromPageType=" + o : "");
            a && 1 == a ? wx.navigateTo({
                url: e
            }) : wx.redirectTo({
                url: e
            });
        }, 500);
    },
    globallogout: function(e) {
        var o = getApp(), a = "";
        if (e.data.returnpage) a = encodeURIComponent(e.data.returnpage); else {
            var r = getCurrentPages(), n = r[r.length - 1].__route__;
            a = encodeURIComponent(n);
        }
        var i;
        e.data.fromPageType && (i = encodeURIComponent(e.data.fromPageType));
        var g;
        e.data.fromPageLevel && (g = e.data.fromPageLevel), t({
            url: o.globalRequestUrl + "/kwxhome/myJd/logout.json",
            success: function(t) {
                if (null != t && "0" == t.code) {
                    wx.removeStorageSync("sid"), wx.removeStorageSync("USER_FLAG_CHECK"), wx.removeStorageSync("jdlogin_pt_key"), 
                    wx.removeStorageSync("jdlogin_pt_pin"), wx.removeStorageSync("itemCartNum"), o.globalConfig && o.globalConfig.isOperatorTemplate && (wx.removeStorageSync("extuserid"), 
                    wx.removeStorageSync("customerinfo"), wx.removeStorageSync("unpl"), wx.setStorageSync("isUserRelBinded", !1));
                    var r = "/pages/login/login?returnpage=" + a + (i ? "&fromPageType=" + i : "");
                    e.isLogout && (r += "&isLogout=1"), g && 1 == g ? wx.navigateTo({
                        url: r
                    }) : wx.redirectTo({
                        url: r
                    });
                }
            }
        });
    },
    promiseRequest: function(e) {
        return new r(function(o, a) {
            t({
                url: e.url,
                data: e.data,
                success: o,
                fail: a
            });
        });
    },
    loginSuccessCb: function() {
        var e = getApp();
        e.globalConfig && e.globalConfig.needBindUserRel && require("bindUserRel.js").bindUserRel();
    },
    getUserInfo: function(e) {
        e.detail.encryptedData && e.detail.iv && "getUserInfo:ok" == e.detail.errMsg ? wx.setStorageSync("wxuserinfo", e.detail) : (wx.removeStorageSync("wxuserinfo"), 
        console.log("用户拒绝授权"));
    },
    umpMonitor: function(e) {
        if (e) {
            var t = wx.getStorageSync("appid");
            t && wx.request({
                url: getApp().globalRequestUrl + "/kact/act/udo?appid=" + t + "&type=" + e,
                data: {},
                header: {
                    "content-type": "application/json"
                },
                method: "GET",
                success: function(e) {
                    console.log("ump 监控埋点");
                }
            });
        }
    },
    getPhoneModel: function(e) {
        wx.getSystemInfo({
            success: function(t) {
                -1 != t.model.search("iPhone X") && (e.globalData.isIphoneX = !0);
            }
        });
    }
};