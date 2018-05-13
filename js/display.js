$(function() {
    var url = window.location.search;
    var uuid = "";
    var str = "";
    if (url.indexOf("?") != -1) {
        str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == "uuid") {
                uuid = decodeURI(strs[i].split("=")[1]);
            }
        }
    }

    var uuid = uuid.trim();

    if (uuid == "") {

} else {

        getLoveWords(uuid);
    }

});


function getLoveWords(uuid) {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1h6GwUtyvwAUaJhcJeoWx1gWEvLqWssPKj";

    var to = dappAddress;
    var value = "0";
    var callFunction = "get";
    var callArgs = "[\"" + uuid + "\"]";
    nebpay.simulateCall(to, value, callFunction, callArgs, {
        listener: function(resp) {
            console.log(JSON.stringify(resp.result));
			if(resp.result == null || resp.result == ""){
				alert("对不起，没有找到对应记录");
				return;
			}
            var obj = JSON.parse(resp.result);
			if(obj == null){
				alert("对不起，没有找到对应记录");
				return;
			}
			var str = obj.expressLoveWords;
			
			str += "<br><br>创建于：";
			str += new Date(obj.createdDate * 1000).toLocaleString();
            $("#searchResult").html(str);

        }
    });
}