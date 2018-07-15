function e(e) {
    this.key = e.key, this.value = e.value, this.expires = e.expires || s();
}

function o(o) {
    k[o.key] = JSON.parse(JSON.stringify(new e(o)));
}

function n(e) {
    Object.keys(e).forEach(function(n) {
        o(e[n]);
    });
}

function t(e) {
    if (k[e]) return r(e), k[e];
}

function r(e) {
    i(k[e].expires) && (console.log("发现过期的key", e), delete k[e], a(k));
}

function i(e) {
    return "session" !== e && (console.log(e, new Date(e), new Date(), new Date(e) <= new Date()), 
    new Date(e) <= new Date() || void 0);
}

function a(e, o) {
    console.info("toLocal", e), wx.setStorage({
        key: "cookies",
        data: e,
        success: function(e) {
            o && o(null, e);
        },
        fail: function(e) {
            console.error("保存cookie出错", e), o && o(e);
        }
    });
}

function c(e) {
    var o = !1;
    if (Object.keys(e).forEach(function(e) {
        e.match(/\./) && (o = !0);
    }), !o) return e;
    var n = {};
    return Object.keys(e).forEach(function(o) {
        Object.keys(e[o]).forEach(function(t) {
            var r = e[o][t];
            "Invalid Date" == new Date(r.date) && console.warn("cookie convert warning--\x3e", o, t, r), 
            n[t] = {
                key: t,
                expires: r.date,
                value: r.value
            };
        });
    }), console.log("转换后的新版本cookie", n), n;
}

function s(e) {
    var o = e || 31536e6;
    return new Date(new Date().getTime() + o).toGMTString();
}

function u(e) {
    function o(e) {
        t = !0, console.error(e);
    }
    var n = {}, t = !1;
    if (Object.keys(e).forEach(function(t) {
        var r = e[t];
        if (t.match(/\./)) return o("cookie字段名不合法:" + t);
        if (void 0 === r.value) return o("cookie值为undefined:" + t);
        if (r.decode && (r.value = decodeURIComponent(r.value)), r.expires || (r.expires = s()), 
        "Invalid Date" == new Date(r.expires)) return o("cookie的过期时间格式错误:" + t);
        r.maxAge && ("number" == typeof r.maxAge || r.maxAge.match(/\d+/)) && (r.expires = s(1e3 * r.maxAge));
        var i = {};
        i.key = t, i.value = r.value, i.expires = new Date(r.expires).toGMTString(), i.value ? n[t] = i : console.warn("cookie checkAndFormat error,cookie值为空字符串", i.key, i.value);
    }), !t) return n;
}

function f(e) {
    var o = [];
    return Object.keys(e).forEach(function(n) {
        o.push(n + "=" + encodeURIComponent(e[n].value));
    }), o.join(";");
}

function l(e) {
    var o = {};
    return Object.keys(e).forEach(function(n) {
        var t = e[n];
        if ("string" != typeof t && "number" != typeof t) console.warn("setCookie fastFormat error 非法value", t); else {
            var r = {};
            r.key = n, r.value = t, r.expires = s(), o[n] = r;
        }
    }), o;
}

var k = function() {
    console.info("初始化cookie，应只在启动应用时执行一次");
    var e;
    try {
        e = wx.getStorageSync("cookies");
    } catch (e) {
        console.error("cookie初始化读取失败:", e);
    }
    return e && a(e = c(e), function(e, o) {
        console.log("toLocal", e, o);
    }), e || {};
}(), v = {};

v.getCookie = function(e) {
    if (!e) return f(k);
    if ("string" == typeof e) {
        var o = t(e);
        return o ? o.value : (console.info("获取的cookie字段不存在或已过期:", e), "");
    }
}, v.setCookie = function(e) {
    if (!e || !e.data) return console.error("setCookie 参数错误:没有数据");
    var o;
    if (!(o = e.defaultExpires ? l(e.data) : u(e.data))) return console.error("setCookie数据错误,数据不合法");
    n(o), a(k, e.cb);
}, v.setCookieInHeader = function(e) {
    if (console.log("-----------------------------setCookieInHeader", e), e.header && e.header["set-cookie"] && e.header["set-cookie"].length) {
        var o = {};
        e.header["set-cookie"].forEach(function(e) {
            var n = e.split(";"), t = {};
            t.kvs = n.shift();
            var r = t.kvs.split("=");
            if (2 != r.length) return console.error("cookie value error ", t.kvs);
            n.forEach(function(e) {
                return e.match(/^\s*Expires=/i) ? t.expires = new Date(e.split("=")[1]) : e.match(/^\s*Max-age=/i) ? t.maxAge = e.split("=")[1] : void 0;
            }), o[r[0]] = {
                key: r[0],
                value: r[1],
                expires: t.expires,
                maxAge: t.maxAge
            };
        }), v.setCookie({
            data: o,
            cb: e.cb
        });
    }
}, v.removeCookie = function(e) {
    e.forEach(function(e) {
        delete k[e];
    }), a(k);
}, module.exports = v;