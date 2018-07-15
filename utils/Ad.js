function t(t, e) {
    var r = {}.toString;
    return r.call(t) === r.call(e);
}

function e(r, o) {
    if (t({}, r)) {
        var n = [];
        for (var u in r) {
            var i = r[u];
            if (t([], i)) for (var a = 0, c = i.length; a < c; a += 1) t([], i[a]) || t({}, i[a]) ? ((s = {})[u + "[" + a + "]"] = i[a], 
            n.push(e(s, !0))) : n.push(u + "[]=" + i[a]); else if (t({}, i)) for (var m in i) if (t([], i[m]) || t({}, i[m])) {
                var s = {};
                s[u + "[" + m + "]"] = i[m], n.push(e(s, !0));
            } else n.push(u + "[" + m + "]=" + i[m]); else o ? n.push("[" + u + "]=" + i) : n.push(u + "=" + i);
        }
        return n.join("&");
    }
    return "";
}

function r() {
    try {
        var t = getCurrentPages().slice(-1)[0];
        return t ? t.__route__ : "";
    } catch (t) {
        return console.error(t), "";
    }
}

function o(t) {
    return Boolean(t);
}

function n(t) {
    var e = wx.getStorageSync("__jdv").split("|"), r = [ void 0, t.utm_source, t.utm_campaign, t.utm_medium, t.utm_term, void 0 ];
    if (e.length === r.length) {
        for (var o = 0, n = r.length; o < n; o += 1) r[o] || (e[o] ? r[o] = e[o] : r[o] = "-");
        return r.join("|");
    }
    return e.join("|");
}

function u(t) {
    var o = {}, n = Object.assign({}, t);
    o.from = n.from || "", o.gdt_vid = n.gdt_vid || "", o.platform = n.platform || "", 
    o.cid = n.cid || "", o.csrc = n.csrc || "", o.isop = n.isop || "", o.utm_campaign = n.utm_campaign || (1 == n.platform ? "t_256716187_1" : 2 == n.platform ? "t_1000072653_1" : ""), 
    o.utm_medium = n.utm_medium || "weixin_shouq", o.utm_source = n.utm_source || "jdzt_wxsq_refer_null", 
    o.utm_term = n.utm_term || n.gdt_vid, o.mt = n.mt || "", o.vid = n.vid || "", o.jtsid = n.sid || "", 
    o.jtpin = n.pin || "", n.utm_campaign = o.utm_campaign, n.utm_medium = o.utm_medium, 
    n.utm_source = o.utm_source, n.utm_term = o.utm_term;
    var u = r();
    o.turl = u ? encodeURIComponent(u + "?" + e(n)) : "", o.wxVersion = wx.getStorageSync("appid");
    var i = getApp().globalWxclient;
    return "tempwx" === i && (o.wxclient = i), o.jda = wx.getStorageSync("__jda"), o;
}

function i(t) {
    wx.login({
        success: function(e) {
            e.code ? a({
                url: getApp().globalRequestUrl + "/kwxitem/report/zhitou.json",
                data: Object.assign({
                    code: e.code
                }, t),
                success: function(t) {
                    console && console.log("Ad request success:", t);
                },
                fail: function(t) {
                    console && console.log("Ad request error:", t);
                }
            }) : console.log(e.errMsg);
        },
        fail: function() {
            console.log("wx.login调用失败");
        }
    });
}

var a = require("./util").request;

module.exports = {
    reportAdsData: function(t) {
        if ("platform" in t && (t.platform || (t.platform = "19999"), o(t.platform))) {
            var e = getApp(), r = u(t);
            e.globalData.__ad__ = {
                jda: r.jda,
                jdv: n(r),
                reqParams: r
            }, i(r);
        }
    }
};