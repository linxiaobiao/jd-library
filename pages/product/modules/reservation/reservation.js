var u = {
    operateYuYue: function(u) {
        var t = this;
        t.data.yuYue.isYuYue = u.yuYue.isYuYue, t.data.yuYue.yuyueType = u.yuYue.yuyueType;
        var o = u.yuYue.yuyueType, e = parseInt(u.yuYue.buyStartTime), a = parseInt(u.yuYue.buyEndTime);
        t.data.yuYue.isNoCountTime = !1, 1 == o && (parseInt(u.yuYue.yuYueStartTime) > 0 ? (t.data.yuYue.countDownText = "距预约开始：", 
        t.countDown(u.yuYue.yuYueStartTime)) : t.data.yuYue.isYuYue = !1), 2 == o && (t.data.yuYue.countDownText = "距预约结束：", 
        t.countDown(u.yuYue.yuYueEndTime)), 3 == o && (e > 0 ? (t.data.yuYue.countDownText = "距抢购开始：", 
        t.countDown(e)) : (t.data.yuYue.countDownText = "抢购时间未定请您耐心等候", t.setData({
            countTimeObj: null,
            "yuYue.isNoCountTime": !0
        }))), 4 == o && (t.data.yuYue.countDownText = "距抢购结束：", t.data.isShowReasonTips = !0, 
        t.countDown(a)), 5 == o && (t.data.yuYue.isYuYue = !1);
    },
    operateYuShou: function(u) {
        var t = this, o = u.ware.yuShouInFo;
        t.data.yuShou.yuShouInfo = o, o.yuShouPrice && (t.data.yuShou.yuShouPrice = t.splitPrice(o.yuShouPrice)), 
        1 == o.yushouStepType ? t.data.yuShou.isYuShouDeposit = !1 : t.data.yuShou.isYuShouDeposit = !0, 
        o.yuShouText && (t.data.yuShou.yuShouInfo.yuShouText = o.yuShouText.replace("（定金可抵", "¥").replace("元）", "")), 
        o.tailMoney && (t.data.yuShou.tailMoney = t.splitPrice(o.tailMoney)), 0 == o.yuShouType ? (t.data.yuShou.countDownText = "距预售开始：", 
        t.countDown(o.countdownNumMills)) : 1 == o.yuShouType && (t.data.yuShou.countDownText = t.data.yuShou.isYuShouDeposit ? "距支付定金结束：" : "距预售结束：", 
        t.countDown(o.countdownNumMills), t.data.isShowReasonTips = !0);
    },
    showYushouRule: function() {
        var u = this;
        u.data.yuShou.yuShouInfo.yushouRule && (u.data.modal = {
            isShow: !0,
            title: "预售规则",
            txtList: u.data.yuShou.yuShouInfo.yushouRule,
            textAlign: "left",
            buttons: [ {
                name: "我知道了",
                background: "#fff",
                color: "#f23030",
                bindTap: "closeModal"
            } ]
        }, u.setData({
            modal: u.data.modal
        }));
    },
    showYuyueRule: function() {
        var u = this;
        u.data.wareInfo.yuYue.yuyueRuleText && (u.data.modal = {
            isShow: !0,
            title: "预约规则",
            txtList: u.data.wareInfo.yuYue.yuyueRuleText,
            textAlign: "left",
            buttons: [ {
                name: "我知道了",
                background: "#fff",
                color: "#f23030",
                bindTap: "closeModal"
            } ]
        }, u.setData({
            modal: u.data.modal
        }));
    }
};

module.exports = u;