module.exports = {
    DateTime: function() {
        var t = new Date();
        var Y = t.getFullYear();
        var M = ("00" + (t.getMonth() + 1)).substr(-2);
        var D = ("00" + t.getDate()).substr(-2);
        var H = ("00" + t.getHours()).substr(-2);
        var I = ("00" + t.getMinutes()).substr(-2);
        var S = ("00" + t.getSeconds()).substr(-2);
        return Y + "-" + M + "-" + D + " " + H + ":" + I + ":" + S;
    }
};
