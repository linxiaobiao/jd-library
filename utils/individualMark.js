module.exports = {
    getCustomerinfo: function() {
        return wx.getStorageSync("customerinfo");
    }
};