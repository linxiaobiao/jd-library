function e() {
    for (var e = "", t = 1; t <= 32; t++) e += Math.floor(16 * Math.random()).toString(16), 
    8 != t && 12 != t && 16 != t && 20 != t || (e += "-");
    var o = Date.parse(new Date());
    return o /= 1e3, e += "-" + o;
}

function t(t, o, n) {
    return void 0 != n ? (n = n.split("_")[0], o = Number(o + 1), n + "_" + o + "_" + t) : (n = w.hex_md5(e())) + "_" + o + "_" + t;
}

function o(e) {
    return "[object Array]" === Object.prototype.toString.call(e);
}

function n(e, t) {
    var n = [];
    return t.forEach(function(t) {
        var i = null;
        i = o(t) ? {
            key: t[0],
            value: o(e[t[1]]) ? e[t[1]].join(";") : e[t[1]] || "unknown"
        } : {
            key: t,
            value: o(e[t]) ? e[t].join(";") : e[t] || "unknown"
        }, n.push(i);
    }), n;
}

function i(e) {
    return new d(function(t, o) {
        e.method({
            complete: function(o) {
                var i = n(o, e.infos);
                t(i);
            }
        });
    });
}

function s() {
    return p.filter(function(e) {
        return e.method;
    }).map(function(e) {
        return i(e);
    });
}

function a(t) {
    var o = [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "system", "platform" ];
    m || (m = e(), f.setCookie({
        data: {
            shshshfpa: {
                value: m,
                maxAge: 3153e3
            }
        }
    }));
    var n = t.reduce(function(e, t) {
        return o.indexOf(t.key) > -1 ? e + t.value + "," : e + "";
    }, "");
    _ = w.hex_md5(n.substring(0, n.length - 1)), f.setCookie({
        data: {
            shshshfp: {
                value: _,
                maxAge: 3153e3
            }
        }
    });
}

function r(e) {
    var t = new Date();
    if (t.setHours(0, 0, 0, 0), t = t.getTime(), (f.getCookie("hf_time") || 0) < t) {
        var o = {
            browser_info: _,
            client_time: new Date().getTime(),
            period: 24,
            shshshfpa: m,
            whwswswws: g,
            msdk_version: "2.1.1",
            cookie_pin: k,
            visitkey: f.getCookie("visitkey"),
            wid: f.getCookie("wq_uin"),
            open_id: f.getCookie("open_id"),
            nickName: f.getCookie("nickName"),
            avatarUrl: f.getCookie("avatarUrl")
        };
        e.map(function(e) {
            o[e.key] = e.value;
        }), c({
            appname: "jdwebm_xcx",
            jdkey: "",
            whwswswws: g,
            businness: "wechat_xcx",
            body: o
        }, "hf");
    }
}

function u() {
    if (v) {
        var e = Number(v.split("_")[1]);
        v = t(new Date().getTime(), e, v), f.setCookie({
            data: {
                shshshsID: {
                    value: escape(v),
                    maxAge: 1800
                }
            }
        });
    } else v = t(new Date().getTime(), 1), f.setCookie({
        data: {
            shshshsID: {
                value: escape(v),
                maxAge: 1800
            }
        }
    });
    var o = "function" == typeof getCurrentPages ? getCurrentPages() : [], n = o && o.length ? o[o.length - 1].route || o[o.length - 1].__route__ : "pages/index/index", i = {
        sid: v.split("_")[0],
        squence: v.split("_")[1],
        create_time: v.split("_")[2],
        shshshfpa: m,
        whwswswws: g,
        browser_info: _,
        page_name: "http://wq.jd.com/wxapp/" + n,
        msdk_version: "2.1.1",
        cookie_pin: k,
        wid: f.getCookie("wq_uin")
    };
    c({
        appname: "jdwebm_pv",
        jdkey: "",
        whwswswws: g,
        businness: "wechat_xcx",
        body: i
    }, "pv");
}

function h(e) {
    a(e), r(e), u();
}

function c(e, t) {
    var o = {
        url: "https://wxapp.m.jd.com/blackhole/getinfo",
        data: {
            body: JSON.stringify(e)
        },
        method: "POST",
        priority: "REPORT",
        success: function(e) {
            0 == e.code && ("hf" == t && f.setCookie({
                data: {
                    shshshfpb: {
                        value: e.whwswswws,
                        maxAge: 3153e3
                    }
                }
            }), "hf" == t && f.setCookie({
                data: {
                    hf_time: {
                        value: new Date().getTime(),
                        maxAge: 3153e3
                    }
                }
            }));
        },
        fail: function(e) {
            console.log(e);
        }
    };
    l.request(o);
}

getApp();

var f = require("./wx.cookie.js"), w = require("./Mmd5.js").Mmd5(), d = require("./lib/promise.js"), l = require("./util.js"), p = [ {
    method: wx.getScreenBrightness,
    infos: [ [ "screenBrightness", "value" ] ]
}, {
    method: wx.getSystemInfo,
    infos: [ "brand", "model", "pixelRatio", "screenWidth", "screenHeight", "windowWidth", "windowHeight", "language", "version", "system", "platform", "fontSizeSetting", "SDKVersion" ]
}, {
    method: wx.getNetworkType,
    infos: [ "networkType" ]
} ], m = f.getCookie("shshshfpa"), g = f.getCookie("shshshfpb"), k = f.getCookie("jdpin") || f.getCookie("pin"), v = f.getCookie("shshshsID"), _ = void 0;

module.exports = {
    Jdwebm: function() {
        var e = s();
        d.all(e).then(function(e) {
            var t = [ {
                key: "bluetooth",
                value: ""
            } ], o = [ {
                key: "beacons",
                value: ""
            } ];
            h((e = e.concat(t, o)).reduce(function(e, t) {
                return e.concat(t);
            }, []));
        }).catch(function(e) {
            console.log(e);
        });
    },
    CookieUtils: f
};