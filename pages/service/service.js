var e = require("../../utils/h5Login.js");

require("../../utils/util.js"), getApp();

Page({
    data: {
        h5Url: "",
        returnpage: "/pages/service/service"
    },
    onLoad: function(t) {
        var r = this, a = "", o = encodeURIComponent("https://tuihuan.jd.com/afs/orders?sourceType=120");
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (a = e.data.url + "?to=" + o + "&tokenkey=" + e.data.tokenkey, 
            r.setData({
                h5Url: a
            }));
        });
    }
});