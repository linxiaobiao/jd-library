var a = getApp();

Page({
    data: {
        version: "release",
        appId: "",
        path: "",
        extData: null
    },
    onLoad: function(t) {
        console.log("wxappBridge_options==========", t);
        var p = this, e = "";
        if (t) {
            var d = {};
            t.appid && (p.data.appId = t.appid), t.path && (p.data.path = t.path);
            for (var r in t) {
                var o = r.split(".");
                o[0] && "params" == o[0] && o[1] && (d[o[1]] = t[r], e = e + "&" + o[1] + "=" + t[r]);
            }
            if (a.globalRequestUrl && -1 != a.globalRequestUrl.indexOf("beta") ? p.data.version = "trial" : p.data.version = "release", 
            console.log("extData=====", d), p.setData({
                extData: d,
                appId: p.data.appId,
                path: p.data.path,
                version: p.data.version
            }), !p.data.appId && p.data.path) {
                -1 == p.data.path.indexOf("?") && (p.data.path = p.data.path + "?jumpFrom=wxappBridge");
                var i = "../../" + p.data.path + e;
                return void wx.redirectTo({
                    url: i
                });
            }
        }
    },
    onShow: function() {}
});