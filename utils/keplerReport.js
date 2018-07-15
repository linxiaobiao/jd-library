!function() {
    function e(t) {
        t = t || "tr-" + n++, this.name = t, this.logCache = [], this.env = [], this.ext = {}, 
        this.isReady = e.isWxDataReady, e.loggerList && e.loggerList instanceof Array && e.loggerList.push(this);
    }
    var t = {
        jsVer: "1.1.0",
        jdaKey: "__jda",
        jddKey: "__jdd",
        jdvKey: "__jdv",
        customerInfoKey: "union_customerinfo",
        jdvTimeMS: 864e5,
        customerInfoTime: 86400,
        sessionTime: 1800,
        referKey: "__refer",
        md5Salt: "5YT%aC89$22OI@pQ",
        addr: function() {
            var e = "http://neptune.jd.com/log/m";
            try {
                var t = getApp();
                t && t.globalRequestUrl && (e = t.globalRequestUrl.replace(/\/*$/, "/neptune/log/m"));
            } catch (e) {}
            return e;
        },
        sceneMap: {
            1007: [ "weixin", "t_1000578832_xcx_1007_drxxkp", "", "" ],
            1008: [ "weixin", "t_1000578832_xcx_1008_qlxxkp", "", "" ],
            1036: [ "weixin", "t_335139774_xcx_1036_appfxxx", "", "" ],
            1044: [ "weixin", "t_1000578832_xcx_1044_fxxxkp", "", "" ],
            1020: [ "weixin", "t_1000072662_xcx_1020_gzhjs", "", "" ],
            1035: [ "weixin", "t_1000072662_xcx_1035_cdl", "", "" ],
            1043: [ "weixin", "t_1000072662_xcx_1043_gzhxx", "", "" ],
            1058: [ "weixin", "t_1000072663_xcx_1058_gzhwz", "", "" ],
            1074: [ "weixin", "t_1000072663_xcx_1074_gzhxx", "", "" ],
            1067: [ "weixin", "t_1000578835_xcx_1067_gzh", "", "" ],
            1068: [ "weixin", "t_1000578835_xcx_1068_fjxcx", "", "" ],
            1028: [ "direct", "t_1000578836_xcx_1028_kqkb", "", "" ],
            1029: [ "direct", "t_1000578836_xcx_1029_kqxq", "", "" ],
            1052: [ "direct", "t_1000578836_xcx_1052_kqmdlb", "", "" ],
            1001: [ "direct", "t_1000578828_xcx_1001_fxrk", "", "" ],
            1022: [ "direct", "t_1000578828_xcx_1022_zdrk", "", "" ],
            1023: [ "direct", "t_1000578828_xcx_1023_zmtb", "", "" ],
            1024: [ "direct", "t_1000578828_xcx_1024_xcxjs", "", "" ],
            1054: [ "direct", "t_1000578828_xcx_1054_dbss", "", "" ],
            1089: [ "direct", "t_1000578828_xcx_1089_ltkxl", "", "" ],
            1090: [ "direct", "t_1000578828_xcx_1090_xcxcd", "", "" ],
            1014: [ "weixin", "t_1000578827_xcx_1014_xcxmbxx", "", "" ],
            1034: [ "weixin", "t_1000578827_xcx_1034_zfwcxx", "", "" ],
            1017: [ "weixin", "t_1000578829_xcx_1017_tyb", "", "" ],
            1026: [ "weixin", "t_1000578829_xcx_1026_fjxcx", "", "" ],
            1030: [ "weixin", "t_1000578829_xcx_1030_zdhcs", "", "" ],
            1039: [ "weixin", "t_1000578829_xcx_1039_yds", "", "" ],
            1056: [ "weixin", "t_1000578829_xcx_1056_ylbf", "", "" ],
            1059: [ "weixin", "t_1000578829_xcx_1059_yqy", "", "" ],
            1064: [ "weixin", "t_1000578829_xcx_1064_wifilj", "", "" ],
            1073: [ "weixin", "t_1000578829_xcx_1073_kfxx", "", "" ],
            1078: [ "weixin", "t_1000578829_xcx_1078_wifilj", "", "" ],
            1092: [ "direct", "t_1000578829_xcx_1092_csfwrk", "", "" ],
            1011: [ "weixin", "t_1000578833_xcx_1011_smewm", "", "" ],
            1012: [ "weixin", "t_1000578833_xcx_1012_tpsm", "", "" ],
            1013: [ "weixin", "t_1000578833_xcx_1013_xcsm", "", "" ],
            1025: [ "weixin", "t_1000578833_xcx_1025_smywm", "", "" ],
            1031: [ "weixin", "t_1000578833_xcx_1031_tpsm", "", "" ],
            1032: [ "weixin", "t_1000578833_xcx_1032_xcsm", "", "" ],
            1047: [ "weixin", "t_1000578833_xcx_1047_smxcxm", "", "" ],
            1048: [ "weixin", "t_1000578833_xcx_1048_tpsm", "", "" ],
            1049: [ "weixin", "t_1000578833_xcx_1049_xcsm", "", "" ],
            1072: [ "weixin", "t_1000578833_xcx_1072_ewmsk", "", "" ],
            1005: [ "weixin", "t_1000578826_xcx_1005_fxss", "", "" ],
            1006: [ "weixin", "t_1000578826_xcx_1006_fxss", "", "" ],
            1027: [ "weixin", "t_1000578826_xcx_1027_dbss", "", "" ],
            1042: [ "weixin", "t_1000578826_xcx_1042_tjss", "", "" ],
            1053: [ "weixin", "t_1000578826_xcx_1053_sys", "", "" ],
            1019: [ "direct", "t_1000578830_xcx_1019_qb", "", "" ],
            1057: [ "direct", "t_1000578830_xcx_1057_yxkxqy", "", "" ],
            1071: [ "direct", "t_1000578830_xcx_1071_yxklby", "", "" ],
            1037: [ "weixin", "t_1000578834_xcx_1037_xcxtz", "", "" ],
            1038: [ "weixin", "t_1000578834_xcx_1038_xcxtz", "", "" ]
        }
    }, n = 0;
    e.loggerList = [], e.dependList = {
        sysinfo: 0,
        netType: 0
    }, e.isWxDataReady = !1, e.dataReady = function(t) {
        if (!e.isWxDataReady) {
            e.dependList[t] = 1;
            for (var n in e.dependList) if (!e.dependList[n]) return;
            e.isWxDataReady = !0;
            for (var n = 0, i = e.loggerList.length; n < i; n++) e.loggerList[n].ready();
            delete e.loggerList;
        }
    }, e.pr = e.prototype, e.pr.ready = function() {
        this.isReady = !0;
        for (var e = this.logCache.length, t = 0; t < e; t++) this.sendData.apply(this, this.logCache[t]);
    }, e.pr.sendData = function(n, i, r) {
        var a;
        (a = "pv" == i ? this.initPvData(r) : "cl" == i ? this.initClickData(r) : "cd" == i ? this.initShoppingData(r) : "od" == i ? this.initOrderData(r) : "sr" == i ? this.initPageUnloadData() : "ep" == i ? this.initExposureData(r) : r).tpc = n, 
        a.report_ts = e.now() / 1e3, a.token = e.md5(a.report_ts + t.md5Salt), a.data[0].typ = i, 
        this.request(a, "sr" == i || "cl" == i);
    }, e.pr.send = function(e, t, n) {
        this.isReady ? this.sendData.apply(this, arguments) : this.logCache.push(arguments);
    }, e.pr.request = function(n, i) {
        var r = !1;
        if (wx.request({
            url: t.addr() + "?std=" + n.std,
            data: n,
            method: "POST",
            header: {
                "content-type": "application/json"
            },
            success: function(e) {
                console.log("requestDone", n), r = !0;
            }
        }), i) for (var a = e.now() + 100; e.now() < a || r; ) ;
    }, function(e) {
        function t(e) {
            return a(s(r(e), 8 * e.length));
        }
        function n(e) {
            for (var t, n = l ? "0123456789ABCDEF" : "0123456789abcdef", i = "", r = 0; r < e.length; r++) t = e.charCodeAt(r), 
            i += n.charAt(t >>> 4 & 15) + n.charAt(15 & t);
            return i;
        }
        function i(e) {
            for (var t, n, i = "", r = -1; ++r < e.length; ) t = e.charCodeAt(r), n = r + 1 < e.length ? e.charCodeAt(r + 1) : 0, 
            55296 <= t && t <= 56319 && 56320 <= n && n <= 57343 && (t = 65536 + ((1023 & t) << 10) + (1023 & n), 
            r++), t <= 127 ? i += String.fromCharCode(t) : t <= 2047 ? i += String.fromCharCode(192 | t >>> 6 & 31, 128 | 63 & t) : t <= 65535 ? i += String.fromCharCode(224 | t >>> 12 & 15, 128 | t >>> 6 & 63, 128 | 63 & t) : t <= 2097151 && (i += String.fromCharCode(240 | t >>> 18 & 7, 128 | t >>> 12 & 63, 128 | t >>> 6 & 63, 128 | 63 & t));
            return i;
        }
        function r(e) {
            var t, n = Array(e.length >> 2);
            for (t = 0; t < n.length; t++) n[t] = 0;
            for (t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
            return n;
        }
        function a(e) {
            for (var t = "", n = 0; n < 32 * e.length; n += 8) t += String.fromCharCode(e[n >> 5] >>> n % 32 & 255);
            return t;
        }
        function s(e, t) {
            e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;
            for (var n = 1732584193, i = -271733879, r = -1732584194, a = 271733878, s = 0; s < e.length; s += 16) {
                var c = n, u = i, l = r, f = a;
                i = p(i = p(i = p(i = p(i = _(i = _(i = _(i = _(i = x(i = x(i = x(i = x(i = o(i = o(i = o(i = o(i, r = o(r, a = o(a, n = o(n, i, r, a, e[s + 0], 7, -680876936), i, r, e[s + 1], 12, -389564586), n, i, e[s + 2], 17, 606105819), a, n, e[s + 3], 22, -1044525330), r = o(r, a = o(a, n = o(n, i, r, a, e[s + 4], 7, -176418897), i, r, e[s + 5], 12, 1200080426), n, i, e[s + 6], 17, -1473231341), a, n, e[s + 7], 22, -45705983), r = o(r, a = o(a, n = o(n, i, r, a, e[s + 8], 7, 1770035416), i, r, e[s + 9], 12, -1958414417), n, i, e[s + 10], 17, -42063), a, n, e[s + 11], 22, -1990404162), r = o(r, a = o(a, n = o(n, i, r, a, e[s + 12], 7, 1804603682), i, r, e[s + 13], 12, -40341101), n, i, e[s + 14], 17, -1502002290), a, n, e[s + 15], 22, 1236535329), r = x(r, a = x(a, n = x(n, i, r, a, e[s + 1], 5, -165796510), i, r, e[s + 6], 9, -1069501632), n, i, e[s + 11], 14, 643717713), a, n, e[s + 0], 20, -373897302), r = x(r, a = x(a, n = x(n, i, r, a, e[s + 5], 5, -701558691), i, r, e[s + 10], 9, 38016083), n, i, e[s + 15], 14, -660478335), a, n, e[s + 4], 20, -405537848), r = x(r, a = x(a, n = x(n, i, r, a, e[s + 9], 5, 568446438), i, r, e[s + 14], 9, -1019803690), n, i, e[s + 3], 14, -187363961), a, n, e[s + 8], 20, 1163531501), r = x(r, a = x(a, n = x(n, i, r, a, e[s + 13], 5, -1444681467), i, r, e[s + 2], 9, -51403784), n, i, e[s + 7], 14, 1735328473), a, n, e[s + 12], 20, -1926607734), r = _(r, a = _(a, n = _(n, i, r, a, e[s + 5], 4, -378558), i, r, e[s + 8], 11, -2022574463), n, i, e[s + 11], 16, 1839030562), a, n, e[s + 14], 23, -35309556), r = _(r, a = _(a, n = _(n, i, r, a, e[s + 1], 4, -1530992060), i, r, e[s + 4], 11, 1272893353), n, i, e[s + 7], 16, -155497632), a, n, e[s + 10], 23, -1094730640), r = _(r, a = _(a, n = _(n, i, r, a, e[s + 13], 4, 681279174), i, r, e[s + 0], 11, -358537222), n, i, e[s + 3], 16, -722521979), a, n, e[s + 6], 23, 76029189), r = _(r, a = _(a, n = _(n, i, r, a, e[s + 9], 4, -640364487), i, r, e[s + 12], 11, -421815835), n, i, e[s + 15], 16, 530742520), a, n, e[s + 2], 23, -995338651), r = p(r, a = p(a, n = p(n, i, r, a, e[s + 0], 6, -198630844), i, r, e[s + 7], 10, 1126891415), n, i, e[s + 14], 15, -1416354905), a, n, e[s + 5], 21, -57434055), r = p(r, a = p(a, n = p(n, i, r, a, e[s + 12], 6, 1700485571), i, r, e[s + 3], 10, -1894986606), n, i, e[s + 10], 15, -1051523), a, n, e[s + 1], 21, -2054922799), r = p(r, a = p(a, n = p(n, i, r, a, e[s + 8], 6, 1873313359), i, r, e[s + 15], 10, -30611744), n, i, e[s + 6], 15, -1560198380), a, n, e[s + 13], 21, 1309151649), r = p(r, a = p(a, n = p(n, i, r, a, e[s + 4], 6, -145523070), i, r, e[s + 11], 10, -1120210379), n, i, e[s + 2], 15, 718787259), a, n, e[s + 9], 21, -343485551), 
                n = d(n, c), i = d(i, u), r = d(r, l), a = d(a, f);
            }
            return Array(n, i, r, a);
        }
        function c(e, t, n, i, r, a) {
            return d(u(d(d(t, e), d(i, a)), r), n);
        }
        function o(e, t, n, i, r, a, s) {
            return c(t & n | ~t & i, e, t, r, a, s);
        }
        function x(e, t, n, i, r, a, s) {
            return c(t & i | n & ~i, e, t, r, a, s);
        }
        function _(e, t, n, i, r, a, s) {
            return c(t ^ n ^ i, e, t, r, a, s);
        }
        function p(e, t, n, i, r, a, s) {
            return c(n ^ (t | ~i), e, t, r, a, s);
        }
        function d(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }
        function u(e, t) {
            return e << t | e >>> 32 - t;
        }
        var l = 0;
        e.md5 = function(e) {
            return n(t(i(e)));
        };
    }(e), function(e) {
        e.now = function() {
            return new Date().getTime();
        }, e.getUUid = function() {
            return e.now() + "" + parseInt(2147483647 * Math.random());
        }, e.storage = {
            get: function(e) {
                var t = "";
                try {
                    t = wx.getStorageSync(e);
                } catch (e) {}
                return t;
            },
            set: function(e, t) {
                try {
                    wx.setStorageSync(e, t);
                } catch (e) {}
            },
            del: function(e, t, n, i) {}
        }, e.isObject = function(e) {
            return "[object Object]" == {}.toString.call(e);
        }, e.extend = function(t, n) {
            if (e.isObject(t) && e.isObject(n)) for (var i in n) t[i] = n[i];
        }, e.url = {
            joinParam: function(t) {
                if (e.isObject(t)) {
                    var n = [];
                    for (var i in t) n.push(i + "=" + t[i]);
                    return n.join("&");
                }
            }
        }, e.isWxEvent = function(t) {
            return !!(e.isObject(t) && t.type && t.target);
        };
    }(e);
    var i = e.storage.get, r = e.storage.set, a = e.isObject, s = e.extend, c = e.now, o = 0, x = o++, _ = o++, p = o++, d = o++, u = o++, l = o++, f = o++, v = o++, h = o++, g = o++, m = o++, w = o++, y = o++, j = o++, D = o++, C = o++, k = o++, b = o++, I = o++, R = o++, S = o++, T = o++, P = o++, U = o++, A = o++, L = o++;
    e.pr.getData = function(e) {
        for (var t = {}, n = 0, i = e.length; n < i; n++) {
            var r = e[n];
            t[r[0]] = this.env[r[1]] || "";
        }
        return t;
    };
    var q = function(e, n, i) {
        var r = (e || "").split(".");
        r.length > 1 ? i[h] = i[h] || 1 * r[1] + t.sessionTime < n : i[h] = !0;
    }, K = null, z = function(e, n, i) {
        var r = (e || "").split("|"), a = "", s = "", c = "", o = "", x = !1;
        r.length >= 6 && (n - r[5] <= t.jdvTimeMS ? (a = r[1], s = r[2], c = r[3], o = r[4]) : x = !0);
        var _ = i[j], p = [];
        if (K && t.sceneMap[K]) {
            var d = t.sceneMap[K];
            p[0] = d[0], p[1] = encodeURIComponent(d[1]), p[2] = encodeURIComponent(d[2]) || "none", 
            p[3] = encodeURIComponent(d[3]) || "-", K = null;
        }
        _ && _.utm_source && (p[0] = encodeURIComponent(_.utm_source), p[1] = encodeURIComponent(_.utm_campaign || "") || s, 
        p[2] = encodeURIComponent(_.utm_medium || "") || c, p[3] = encodeURIComponent(_.utm_term || "") || o, 
        x = !0);
        var u = !1;
        p.length > 0 && "direct" != p[0] ? u = (p[0] !== a || p[1] !== s || p[2] !== c) && "referral" !== p[2] : p.length > 0 && "direct" == p[0] && ("direct" === a || !a) && (u = p[1] !== s || p[2] !== c || p[3] !== o);
        var l = "";
        return (i[h] || u) && (a = p[0] || a, s = p[1] || s, c = p[2] || c, o = p[3] || o), 
        (x || u || r.length < 5) && (l = [ 1, a || "direct", s || "-", c || "none", o || "-", n ].join("|")), 
        i[h] = i[h] || u, l;
    }, O = function(e, n, i) {
        var r = (e || "").split("."), a = 1;
        return r.length > 1 ? (i[h] = i[h] || 1 * r[1] + t.sessionTime < n, a = (i[h] ? 1 : 1 * r[0] + 1) || 1) : i[h] = !0, 
        i[l] = a, a + "." + n;
    }, E = function(t, n, i) {
        var r, a, s, c, o = (t || "").split("."), x = 1, l = 1;
        return o.length > 5 ? (x = o[0] || x, r = o[1] || e.getUUid(), a = o[2] || n, i[h] ? (s = o[4] || n, 
        c = n, l = 1 * o[5] + 1 || 1) : (s = o[3] || n, c = o[4] || n, l = 1 * o[5] || 1)) : (r = e.getUUid(), 
        a = s = c = n, l = 1), i[_] = r, i[p] = a, i[d] = s, i[u] = c, i[f] = l, [ x, r, a, s, c, l ].join(".");
    }, W = function(e, n, i) {
        var r = i[j], a = "", s = "";
        if (r && r.customerinfo) a = r.customerinfo, s = n; else {
            var c = e instanceof Array ? e : [];
            2 == c.length && n - c[1] < t.customerInfoTime && (a = c[0], s = c[1]);
        }
        return i[P] = a, a ? [ a, s ] : [];
    }, M = function(e) {
        var t = i("jdwcx") || i("jdzdm");
        t && (t.unionid && (e[S] = t.unionid), t.wxversion && (e[T] = t.wxversion));
    };
    e.pr.setupPageview = function() {
        var e = this.env, n = c(), a = parseInt(n / 1e3), s = i(t.jdaKey), o = i(t.jddKey), x = i(t.jdvKey);
        e[h] = !1, q(o, a, e);
        var _ = z(x, n, e), p = O(o, a, e), d = E(s, a, e);
        _ && r(t.jdvKey, _), r(t.jddKey, p), r(t.jdaKey, d);
        var u = W(i(t.customerInfoKey), a, e);
        r(t.customerInfoKey, u), e[v] = _ || x, M(this.env);
        var l = getCurrentPages(), f = l.length;
        if (f > 0) {
            if (e[w] = l[f - 1].__route__, e[h]) e[b] = "", e[I] = ""; else {
                var g = i(t.referKey);
                e[b] = g[0], e[I] = g[1];
            }
            r(t.referKey, [ e[w], e[y] ]);
        }
    }, e.pr.initPvData = function(e) {
        this.pageLoadTime = c(), this.maxClickDeep = 0, e = e || {};
        var t = this.baseEnv(), n = [ [ "sku", U ], [ "shp", A ], [ "tit", m ], [ "ldt", L ] ], i = this.getData(n);
        return i.page_id = e.pageId || this.env[D] || "", i.pname = e.pname || this.env[C] || this.env[w] || "", 
        i.pparam = e.pparam || this.env[k] || this.env[y] || "", s(t.data[0], i), s(t.data[0].ext, e.ext), 
        t;
    }, e.pr.initClickData = function(t) {
        var n = this.baseEnv(), i = n.data[0];
        if (i.eid = t.eid || "", i.eparam = t.eparam || "", i.elevel = t.elevel || "", i.page_id = t.pageId || this.env[D] || "", 
        i.pname = t.pname || this.env[C] || this.env[w] || "", i.pparam = t.pparam || this.env[k] || this.env[y] || "", 
        i.tar = t.target || "", i.x = 0, i.y = 0, e.isWxEvent(t.event)) {
            var r = t.event;
            if (r.touches && r.touches.length > 0) {
                i.x = parseInt(r.touches[0].pageX);
                var a = parseInt(r.touches[0].pageY);
                i.y = a, a > this.maxClickDeep && (this.maxClickDeep = a);
            }
        }
        return s(i.ext, t.ext), n;
    }, e.pr.initExposureData = e.pr.initClickData, e.pr.initShoppingData = function(e) {
        var t = this.baseEnv(), n = t.data[0];
        return n.eid = e.eid || "", n.eparam = e.eparam || "", n.elevel = e.elevel || "", 
        n.page_id = e.pageId || this.env[D] || "", n.pname = e.pname || this.env[C] || this.env[w] || "", 
        n.pparam = e.pparam || this.env[k] || this.env[y] || "", n.sku_list = e.shoppingList ? JSON.stringify(e.shoppingList) : "", 
        s(n.ext, e.ext), t;
    }, e.pr.initOrderData = function(e) {
        var t = this.baseEnv(), n = t.data[0];
        return n.eid = e.eid || "", n.eparam = e.eparam || "", n.elevel = e.elevel || "", 
        n.page_id = e.pageId || this.env[D] || "", n.pname = e.pname || this.env[C] || this.env[w] || "", 
        n.pparam = e.pparam || this.env[k] || this.env[y] || "", n.sku_list = e.orderList ? JSON.stringify(e.orderList) : "", 
        n.order_total_fee = e.total || 0, n.sale_ord_id = e.orderid || "", s(n.ext, e.ext), 
        t;
    }, e.pr.initPageUnloadData = function() {
        var e = ((c() - this.pageLoadTime) / 1e3).toFixed(3), t = this.baseEnv(), n = t.data[0];
        return n.alive_seconds = e, n.click_deep = this.maxClickDeep, t;
    }, function() {
        e.wxDat = {};
        var t = e.wxDat;
        wx.getSystemInfo({
            success: function(e) {
                t.dvc = e.model, t.pixelRatio = (e.pixelRatio || "") + "", t.scr = parseInt(e.windowWidth) + "x" + parseInt(e.windowHeight), 
                t.lang = e.language, t.wxver = e.version;
            },
            complete: function() {
                e.dataReady("sysinfo");
            }
        }), wx.getNetworkType({
            success: function(e) {
                t.net = e.networkType;
            },
            complete: function() {
                e.dataReady("netType");
            }
        });
    }(), e.pr.setData = function(t) {
        if (a(t)) {
            var n = {
                account: [ R ],
                siteId: [ x ],
                skuid: [ U ],
                shopid: [ A ],
                title: [ m ],
                loadtime: [ L ],
                urlParam: [ y, e.url.joinParam ],
                pageId: [ D ],
                pname: [ C ],
                pparam: [ k ]
            };
            for (var i in t) {
                var r = n[i];
                r ? this.env[r[0]] = r[1] ? r[1](t[i]) : t[i] : this.ext[i] = t[i];
            }
            this.env[j] = t.urlParam || {};
        }
    }, e.appDat = {}, e.setAppData = function(t) {
        for (var n in t) e.appDat[n] = t[n];
    }, e.scene = null, e.setScene = function(t) {
        e.scene = t, K = t;
    }, e.pr.baseEnv = function() {
        var n = this.env, r = e.wxDat, a = {
            cli: "wx-app",
            std: n[x] || "WXAPP-JA2016-1",
            uuid: n[_] || "",
            scr: r.scr || "",
            dvc: r.dvc || "",
            lang: r.lang || "",
            appid: "",
            appkey: n[T] || "",
            openid: r.openid || "",
            unionid: n[S] || "",
            gender: r.gender || "",
            city: r.city || "",
            province: r.province || "",
            country: r.country || "",
            wxver: r.wxver || "",
            data: []
        }, c = [ [ "ctp", w ], [ "par", y ], [ "ref", b ], [ "rpr", I ], [ "seq", l ], [ "vts", f ], [ "pin", R ], [ "fst", p ], [ "pst", d ], [ "vct", u ] ], o = this.getData(c);
        return o.jsver = t.jsVer, o.net = r.net || "", o.lat = r.lat || "", o.lon = r.lon || "", 
        o.speed = r.speed || "", o.accuracy = r.accuracy || "", o.pixelRatio = r.pixelRatio || "", 
        o.jdv = n[v] || "", o.customerInfo = n[P] || "", o.unpl = i("unpl") || "", o.scene = e.scene, 
        o.ext = {}, s(o.ext, this.ext), s(o.ext, e.appDat), a.data.push(o), a;
    }, e.pr.exports = function() {
        var t = this;
        return {
            set: function(e) {
                t.setData(e), t.setupPageview(), t.env[g] = !0;
            },
            pv: function(n) {
                t.lastPvTime && e.now() - t.lastPvTime < 100 || (t.lastPvTime = e.now(), t.env[g] || t.setupPageview(), 
                t.send("wx_app.000000", "pv", n), t.env[g] = !1);
            },
            click: function(e) {
                t.send("wx_app.000001", "cl", e);
            },
            exposure: function(e) {
                t.send("wx_app.000005", "ep", e);
            },
            autoClick: function(e) {
                var n, i = e.target.dataset, r = e.currentTarget.dataset;
                if (i && i.eid ? n = i : r && r.eid && (n = r), n) {
                    var a = {
                        eid: n.eid,
                        elevel: n.elevel,
                        eparam: n.eparam,
                        pname: n.pname,
                        pparam: n.pparam,
                        target: n.target,
                        event: e
                    };
                    t.send("wx_app.000001", "cl", a);
                }
            },
            addToCart: function(e) {
                t.send("wx_app.000002", "cd", e);
            },
            order: function(e) {
                t.send("wx_app.000003", "od", e);
            },
            pageUnload: function() {
                t.send("wx_app.000004", "sr");
            }
        };
    }, module.exports = {
        init: function(t) {
            return new e(t).exports();
        },
        setAppData: function(t) {
            e.setAppData(t);
        },
        setScene: function(t) {
            e.setScene(t);
        }
    };
}();