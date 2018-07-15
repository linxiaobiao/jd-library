var a = require("utils/appBase/appBase.js");

App({
    onLaunch: function(e) {
        a.appLaunch(e, this);
    },
    onShow: function(e) {
        a.appShow(e, this);
        var t = e.scene;
        console.log("scene", t, e);
        var r = "";
        try {
            e.referrerInfo && e.referrerInfo.appId ? r = e.referrerInfo.appId : e.query && e.query.appid && (r = e.query.appid), 
            this.globalData.fromAppid = r, this.globalData.scene = t || "1001";
        } catch (a) {
            console.log("try catch 的 catch", a);
        }
        console.log("this.globalData", this.globalData);
    },
    globalWxclient: "",
    globalData: {
        wxappStorageName: "jdwcx",
        unionid: "",
        wxversion: "5c2aa14de7484f4bb8214cc1b1565d9d",
        appid: "wx3fc9671963892930",
        fromAppid: "",
        source: "3_3",
        scene: "1001",
        kxcxtype: "3",
        brokerageAdt: "89",
        isIphoneX: !1
    },
    globalConfig: {
        haveAuthorFloor: !0,
        isMessagePush: !1,
        needDocumentary: !1,
        haveSlidebar: !0,
        slidebarData: [ {
            pagePath: "/pages/recommend/recommend",
            text: "首页",
            pageId: "recommend",
            iconPath: "../../images/home.png"
        }, {
            pagePath: "/pages/category/category",
            text: "找书",
            pageId: "category",
            iconPath: "../../images/search.png"
        }, {
            pagePath: "/pages/rankList/rankList",
            text: "排行榜",
            pageId: "rankList",
            iconPath: "../../images/rank.png"
        }, {
            pagePath: "/pages/cart/cart",
            text: "购物车",
            pageId: "cart",
            iconPath: "../../images/carts.png"
        } ]
    },
    globalRequestUrl: "https://wxapp.m.jd.com",
    messagePushRequestUrl: "https://push.k.jd.com",
    shareDesc: "挑好书，上京东"
});