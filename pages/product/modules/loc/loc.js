var e = require("../../../../utils/authorize.js"), t = {
    setLocVenderInfo: function(e) {
        var t = this;
        if (e.locShopName || e.shopAddress || e.distance && e.locShopId) {
            var o = {};
            o.venderName = e.locShopName ? e.locShopName : "", o.distance = e.distance ? e.distance : "", 
            o.venderInfo = e.shopAddress ? e.shopAddress : "", t.data.locShopId = e.locShopId, 
            t.data.isShowLoc = !0, t.data.locVenderInfo = o, e.tapFrom && 2 == e.tapFrom && e.wareId && e.buyCount && (t.data.wareId = e.wareId, 
            t.data.buyNumValue = e.buyCount, t.data.isBuy = !0, t.addCartRequest()), this.setData({
                isShowLoc: t.data.isShowLoc,
                locVenderInfo: o
            });
        }
    },
    goVenderList: function(e, t, o) {
        var a = this, d = [ a.data.wareId, a.data.storeGroupId, a.data.venderId, e.longitude, e.latitude, a.data.buyNumValue ], r = d[0], n = d[1], s = d[2], i = d[3], u = d[4], c = d[5];
        if (r && n && s && c) {
            var l = "venderListH5/venderListH5?skuId=" + r + "&storeGroupId=" + n + "&venderId=" + s + "&lng=" + i + "&lat=" + u + "&buyCount=" + c + "&tapFrom=" + t.tapFrom;
            console.log("path==============", l), a.data.isLogin ? wx.redirectTo({
                url: "../" + l
            }) : a.getLoginState({
                event: o,
                returnUrl: "/pages/" + l,
                success: function() {
                    wx.redirectTo({
                        url: "../" + l
                    });
                },
                fail: function() {
                    wx.redirectTo({
                        url: "../" + l
                    });
                },
                isRedirect: !0
            });
        }
    },
    openLocPage: function(t, o) {
        var a = this;
        e.getLocation().then(function(e) {
            a.goVenderList(e, t, o);
        }, function(e) {
            toast.show({
                icon: toast.icon.error,
                message: e,
                pageObj: a
            });
        });
    }
};

module.exports = t;