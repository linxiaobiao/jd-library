function e(e) {
    var t = !0;
    for (var n in e) if (!e[n]) return t = !1;
    return t;
}

function t(e) {
    return /^1[3-9][0-9]{9}$/.test(e);
}

function n(e) {
    var t = "";
    for (var n in e) t += n + "=" + encodeURIComponent(e[n]) + "&";
    return t.substring(0, t.length - 1);
}

require("../../utils/rsa_common.js"), require("../../utils/base64.js");

var a = require("../../utils/util.js"), o = require("../../utils/h5Login.js"), i = null, r = getApp();

Page({
    data: {
        inputVaild: {
            phonecode: !1,
            msgcode: !1
        },
        iconClear: {
            phoneClear: !0,
            msgClear: !0
        },
        canLogin: !1,
        getMsgCode: !1,
        getMsgCodeText: "获取验证码",
        phoneInput: "",
        msgInput: "",
        msgWarn: !0,
        warnShow: !0,
        returnpage: "",
        waitTime: !0,
        fromPageType: "",
        jdlogin: !1,
        isLogout: ""
    },
    onLoad: function(e) {
        var t = this;
        t.options = e, t.userInfo = {}, t.data.returnpage = e.returnpage ? decodeURIComponent(e.returnpage) : "", 
        t.data.fromPageType = e.fromPageType, t.data.jdlogin = e.jdlogin, t.data.isLogout = e.isLogout, 
        wx.login({
            success: function(e) {
                t.radata = e, wx.getSetting({
                    success: function(e) {
                        e.authSetting["scope.userInfo"] ? t.getUserInfo() : wx.authorize({
                            scope: "scope.userInfo",
                            success: function(e) {
                                t.getUserInfo();
                            },
                            fail: function(e) {
                                t.authorize();
                            }
                        });
                    },
                    fail: function(e) {
                        t.getUserInfo();
                    }
                });
            }
        });
    },
    getUserInfo: function() {
        var e = this;
        wx.showLoading({
            title: "加载中"
        }), setTimeout(function() {
            wx.hideLoading();
        }, 2e3);
        var t = wx.getStorageSync("wxuserinfo");
        t ? (this.userInfo = t, this.encryptedData = encodeURIComponent(t.encryptedData), 
        this.ivData = encodeURIComponent(t.iv), this.smsLogin()) : wx.getUserInfo({
            success: function(t) {
                e.userInfo = t, e.encryptedData = encodeURIComponent(t.encryptedData), e.ivData = encodeURIComponent(t.iv);
            },
            fail: function() {},
            complete: function() {
                e.smsLogin();
            }
        });
    },
    authorize: function() {
        var e = this;
        wx.showModal({
            title: "打开设置页面进行授权",
            content: "需要获取您的公开信息（昵称、头像等），请到小程序的设置中打开用户信息授权",
            cancelText: "取消",
            confirmText: "去设置",
            success: function(t) {
                t.confirm ? wx.openSetting({
                    success: function(t) {
                        t.authSetting["scope.userInfo"] && e.getUserInfo();
                    }
                }) : e.getUserInfo();
            },
            fail: function(t) {
                e.getUserInfo();
            }
        });
    },
    smsLogin: function() {
        var e = this, t = wx.getStorageSync("jdlogin_guid") || "", n = wx.getStorageSync("jdlogin_lsid") || "", s = wx.getStorageSync("jdlogin_pt_key") || "", g = wx.getStorageSync("appid"), c = wx.getStorageSync("activityUrl") || "";
        !!e.data.jdlogin && (e.radata.code = "", e.encryptedData = "", e.ivData = ""), wx.request({
            url: r.globalRequestUrl + "/wxapplogin/cgi-bin/login/smslogin?appid=269&code=" + e.radata.code + "&wxappid=" + g + "&user_data=" + e.encryptedData + "&user_iv=" + e.ivData,
            method: "GET",
            header: {
                Cookie: "guid=" + t + "; lsid=" + n + "; pt_key=" + s
            },
            success: function(t) {
                var n = t.data;
                if (n.err_code) wx.hideLoading(), console.log("获取数据信息失败"); else {
                    try {
                        wx.setStorageSync("jdlogin_guid", n.guid), wx.setStorageSync("jdlogin_lsid", n.lsid);
                    } catch (e) {
                        console.log(e);
                    }
                    if (1 == n.autologin) wx.hideLoading(), e.data.fromPageType && "switchTab" == e.data.fromPageType ? (a.loginSuccessCb(), 
                    wx.switchTab({
                        url: e.data.returnpage
                    })) : c ? o.jshopH5Login(e.data.returnpage) : (a.loginSuccessCb(), wx.redirectTo({
                        url: e.data.returnpage
                    })); else if (n.wx_bind) if (1 == e.options.isLogout) {
                        var r = n.jd_pin, s = n.wx_img_url, g = n.wx_token;
                        wx.redirectTo({
                            url: "../accountBind/accountBind?nickname=" + r + "&fromPageType=" + e.data.fromPageType + "&url=" + encodeURIComponent(s) + "&token=" + g + "&returnpage=" + e.data.returnpage
                        });
                    } else e.doSure(n.wx_token); else wx.hideLoading();
                    i = n.rsa_modulus;
                }
            },
            fail: function() {
                wx.hideLoading();
            },
            complete: function() {}
        });
    },
    doSure: function(e) {
        var t = this, n = wx.getStorageSync("jdlogin_guid"), i = wx.getStorageSync("jdlogin_lsid"), s = wx.getStorageSync("activityUrl") || "";
        wx.request({
            url: r.globalRequestUrl + "/wxapplogin/cgi-bin/login/wxconfirmlogin",
            data: {
                wx_token: e
            },
            method: "POST",
            header: {
                "content-type": "application/x-www-form-urlencoded",
                cookie: "guid=" + n + "; lsid=" + i
            },
            success: function(e) {
                wx.hideLoading();
                var n = e.data;
                if (!n.err_code) {
                    try {
                        wx.setStorageSync("jdlogin_pt_key", n.pt_key), wx.setStorageSync("jdlogin_pt_token", n.pt_token), 
                        n.pt_pin && wx.setStorageSync("jdlogin_pt_pin", n.pt_pin);
                    } catch (e) {}
                    t.data.returnpage && (t.data.fromPageType && "switchTab" == t.data.fromPageType ? (a.loginSuccessCb(), 
                    wx.switchTab({
                        url: t.data.returnpage
                    })) : s ? o.jshopH5Login(t.data.returnpage) : (a.loginSuccessCb(), wx.redirectTo({
                        url: t.data.returnpage
                    })));
                }
            },
            fail: function() {
                wx.hideLoading(), console.log("wxlogin fail");
            }
        });
    },
    changeInput: function(n) {
        var a = this.data.inputVaild, o = n.detail.value, i = n.target.dataset.name;
        switch (i) {
          case "phonecode":
            this.setData({
                phoneInput: o
            });
            break;

          case "msgcode":
            this.setData({
                msgInput: o
            });
        }
        o ? (a[i] = !0, "phonecode" == i && (t(o) ? this.setData({
            getMsgCode: !0
        }) : (a[i] = !1, this.setData({
            getMsgCode: !1
        })))) : (a[i] = !1, "phonecode" == i && this.setData({
            getMsgCode: !1
        })), e(a) ? this.setData({
            canLogin: !0
        }) : this.setData({
            canLogin: !1
        });
    },
    inputFocus: function(e) {
        switch (e.target.dataset.name) {
          case "phonecode":
            this.setData({
                "iconClear.phoneClear": !1
            });
            break;

          case "msgcode":
            this.setData({
                "iconClear.msgClear": !1
            });
        }
    },
    inputBlur: function(e) {
        switch (e.target.dataset.name) {
          case "phonecode":
            this.setData({
                "iconClear.phoneClear": !0
            });
            break;

          case "msgcode":
            this.setData({
                "iconClear.msgClear": !0
            });
        }
    },
    clearPhoneInput: function() {
        return this.data.inputVaild.phonecode = !1, this.setData({
            phoneInput: "",
            canLogin: !1,
            getMsgCode: !1
        }), !1;
    },
    clearMsgInput: function() {
        return this.data.inputVaild.msgcode = !1, this.setData({
            msgInput: "",
            canLogin: !1
        }), !1;
    },
    obtainCode: function(e) {
        var t = this;
        if (this.data.getMsgCode && t.data.waitTime) {
            t.setData({
                warnShow: !0,
                warnText: ""
            });
            var a = this.data.phoneInput, o = wx.getStorageSync("jdlogin_lsid"), i = wx.getStorageSync("jdlogin_guid");
            this.data.imgInput;
            wx.showModal({
                title: " 提示",
                content: "我们将发送到" + a,
                success: function(e) {
                    if (e.confirm) {
                        var s = n({
                            appid: 269,
                            guid: i,
                            lsid: o,
                            mobile: a
                        });
                        wx.request({
                            url: r.globalRequestUrl + "/wxapplogin/cgi-bin/login/smslogin_sendmsg",
                            data: s,
                            method: "POST",
                            header: {
                                "content-type": "application/x-www-form-urlencoded",
                                cookie: "guid=" + i + "; lsid=" + o
                            },
                            success: function(e) {
                                if (0 == (e = e.data).err_code) {
                                    wx.setStorageSync("jdlogin_guid", e.guid), wx.setStorageSync("jdlogin_lsid", e.lsid);
                                    var n = 120;
                                    t.setData({
                                        "inputVaild.imgcode": !0,
                                        imgCodeShow: !1,
                                        getMsgCode: !1,
                                        getMsgCodeText: n + "s",
                                        waitTime: !1
                                    });
                                    var a = setInterval(function() {
                                        if (--n > 0) t.setData({
                                            getMsgCodeText: n + "s"
                                        }); else {
                                            clearInterval(a);
                                            wx.getStorageSync("jdlogin_lsid");
                                            t.setData({
                                                "inputVaild.imgcode": !1,
                                                getMsgCode: !0,
                                                getMsgCodeText: "获取验证码",
                                                waitTime: !0
                                            });
                                        }
                                    }, 1e3);
                                } else t.setData({
                                    warnShow: !1,
                                    warnText: e.err_msg || "服务异常"
                                });
                            },
                            fail: function() {
                                t.setData({
                                    warnShow: !1,
                                    warnText: "服务异常"
                                });
                            },
                            complete: function() {}
                        });
                    }
                }
            });
        }
    },
    doLogin: function(e) {
        if (this.data.canLogin) {
            this.setData({
                warnShow: !0,
                warnText: "",
                canLogin: !1
            });
            var t = this, i = wx.getStorageSync("jdlogin_guid"), s = wx.getStorageSync("jdlogin_lsid"), g = (wx.getStorageSync("jdlogin_pt_pin"), 
            wx.getStorageSync("jdlogin_pt_key"), wx.getStorageSync("jdlogin_pt_token"), wx.getStorageSync("activityUrl") || ""), c = this.data.phoneInput, d = this.data.msgInput, u = n({
                mobile: c,
                smscode: d
            });
            wx.request({
                url: r.globalRequestUrl + "/wxapplogin/cgi-bin/login/dosmslogin",
                data: u,
                method: "POST",
                header: {
                    "content-type": "application/x-www-form-urlencoded",
                    cookie: "guid=" + i + "; lsid=" + s
                },
                success: function(e) {
                    var n = e.data;
                    if (n.err_code) t.setData({
                        warnShow: !1,
                        warnText: n.err_msg
                    }); else {
                        try {
                            wx.setStorageSync("jdlogin_pt_pin", n.pt_pin), wx.setStorageSync("jdlogin_pt_key", n.pt_key), 
                            wx.setStorageSync("jdlogin_pt_token", n.pt_token), wx.setStorageSync("jdlogin_pt_key_expire_time", n.expire_time), 
                            wx.setStorageSync("jdlogin_pt_key_refresh_time", n.refresh_time);
                        } catch (e) {
                            console.log(e);
                        }
                        1 == n.need_receiver ? wx.redirectTo({
                            url: "../login-receive/login-receive?mobile=" + c + "&returnpage=" + encodeURIComponent(t.data.returnpage) + (t.data.fromPageType ? "&fromPageType=" + t.data.fromPageType : "")
                        }) : t.data.returnpage && (t.data.fromPageType && "switchTab" == t.data.fromPageType ? (a.loginSuccessCb(), 
                        wx.switchTab({
                            url: t.data.returnpage
                        })) : g ? o.jshopH5Login(t.data.returnpage) : (a.loginSuccessCb(), wx.redirectTo({
                            url: t.data.returnpage
                        })));
                    }
                },
                fail: function() {},
                complete: function() {}
            });
        }
    },
    goProtocol: function() {
        wx.navigateTo({
            url: "../protocolTxt/protocolTxt?returnpage=" + this.data.returnpage
        });
    }
});