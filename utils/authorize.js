module.exports = {
    getLocation: function(t) {
        var n = t && t.type ? t.type : "wgs84", e = !(!t || !t.altitude) && t.altitude;
        return new Promise(function(t, o) {
            wx.getLocation && wx.getLocation({
                type: n,
                altitude: e,
                success: function(n) {
                    t(n);
                },
                fail: function() {
                    wx.showModal({
                        title: "打开设置页面进行授权",
                        content: "需要获取您的地理位置，请到小程序的设置中打开地理位置授权",
                        confirmText: "去设置",
                        success: function(n) {
                            n.confirm ? wx.openSetting({
                                success: function(n) {
                                    n.authSetting["scope.userLocation"] && wx.getLocation({
                                        altitude: !1,
                                        success: function(n) {
                                            t(n);
                                        }
                                    });
                                }
                            }) : o("获取地理位置失败");
                        },
                        fail: function() {}
                    });
                }
            });
        });
    }
};