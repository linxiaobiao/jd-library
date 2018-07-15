var r = {
    getMoreWorklist: function(r) {
        var t = getCurrentPages(), e = r.currentTarget.dataset.wareid, a = r.currentTarget.dataset.author;
        this.unionClick("WLibrary_Author", "4", e, "", r), console.log("getMoreWorklist: " + t.length), 
        t.length > 4 ? wx.redirectTo({
            url: "../searchlist/searchlist?name=" + a + "&search=-1&author=作品列表"
        }) : wx.navigateTo({
            url: "../searchlist/searchlist?name=" + a + "&search=-1&author=作品列表"
        });
    }
};

module.exports = {
    bookAuthor: r
};