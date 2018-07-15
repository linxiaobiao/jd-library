var e = require("../../utils/util.js"), s = require("../../utils/keplerReport.js").init(), a = getApp();

Page({
    data: {
        pDir: "/kwxp",
        screenHeight: 0,
        screenWidth: 0,
        name: "mjs",
        addressList: [],
        chooseAddressFlag: 0,
        isIphoneX: a.globalData.isIphoneX
    },
    onLoad: function(e) {
        var a = this;
        wx.getSystemInfo({
            success: function(e) {
                a.setData({
                    screenHeight: e.windowHeight,
                    screenWidth: e.windowWidth
                });
            }
        }), s.set({
            urlParam: e,
            title: "收货地址",
            siteId: "WXAPP-JA2016-1",
            account: wx.getStorageSync("desPin") ? wx.getStorageSync("desPin") : "-"
        });
    },
    onShow: function() {
        var t = this;
        e.request({
            url: a.globalRequestUrl + t.data.pDir + "/norder/address.json",
            success: t.addressulDate.bind(t),
            fail: function(s) {
                e.reportErr(encodeURIComponent("结算页地址列表首屏数据请求失败：") + s.errMsg);
            }
        }), s.pv();
    },
    addressulDate: function(e) {
        this.setData({
            addressList: e.addressList
        });
    },
    chooseAddress: function(s) {
        var t = this;
        e.request({
            url: a.globalRequestUrl + t.data.pDir + "/norder/updateOrderAddressTouch.json?addressId=" + s.currentTarget.id,
            success: function() {
                if (0 == t.data.chooseAddressFlag) {
                    var e = getCurrentPages(), s = e[e.length - 2];
                    s && s.data && s.data.presaleData && s.data.presaleData.presaleStepPay && 2 == s.data.presaleData.presaleStepPay && (s.data.resetDefaultPhoneNum = !0), 
                    wx.navigateBack();
                }
                t.data.chooseAddressFlag++;
            },
            fail: function(s) {
                e.reportErr(encodeURIComponent("结算页地址列表选择地址请求失败：") + s.errMsg);
            }
        });
    },
    newAddress: function(a) {
        try {
            var t = this;
            s.click({
                eid: "MNeworderAddress_AddAddress",
                elevel: "",
                ename: "",
                eparam: "",
                event: a
            }), t.data.addressList && t.data.addressList.length >= 20 ? wx.showModal({
                content: "您的地址已达20条，请删除部分当前地址后再建",
                showCancel: !1
            }) : wx.redirectTo({
                url: "../address/address?addressId=0&addressType=add"
            });
        } catch (s) {
            e.reportErr(encodeURIComponent("结算页地址列表新增地址按钮点击事件报错") + s.message);
        }
    },
    editAddress: function(e) {
        s.click({
            eid: "MNeworderAddress_EditAddress",
            elevel: "",
            ename: "",
            eparam: "",
            event: e
        });
    }
});