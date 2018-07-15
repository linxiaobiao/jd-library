var e = require("../../utils/h5Login.js");

getApp();

Page({
    data: {
        venderListUrl_h5: ""
    },
    onLoad: function(o) {
        console.log("options=======", o);
        var t = "https://md-mobile.jd.com/kepler/storeList?skuId=" + o.skuId + "&storeGroupId=" + o.storeGroupId + "&venderId=" + o.venderId + "&lng=" + o.lng + "&lat=" + o.lat + "&buyCount=" + o.buyCount + "&un_area=1&tapFrom=" + o.tapFrom;
        console.log(t);
        var n = this, r = "", a = encodeURIComponent(t);
        e.promiseGentoken().then(function(e) {
            0 == e.data.err_code && (r = e.data.url + "?to=" + a + "&tokenkey=" + e.data.tokenkey, 
            n.setData({
                venderListUrl_h5: r
            }));
        });
    },
    onShow: function() {}
});