var t = require("../../utils/keplerReport.js").init(), e = {
    bAll: !1,
    showAllMenus: function(e) {
        t.click({
            eid: "showAllMenus",
            eparam: "",
            target: "",
            event: e
        }), this.setData({
            "slidebarData.bAll": !0
        });
    },
    gotoTab: function(e) {
        t.click({
            eid: "gotoTab_" + e.currentTarget.dataset.pageid,
            eparam: "",
            target: e.currentTarget.dataset.path,
            event: e
        }), wx.switchTab({
            url: e.currentTarget.dataset.path
        });
    },
    back: function() {
        this.setData({
            "slidebarData.bAll": !1
        });
    }
};

module.exports = {
    slidebar: e
};