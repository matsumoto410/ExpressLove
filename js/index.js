$(function() {
    var NebPay = require("nebpay"); //https://github.com/nebulasio/nebPay
    var nebpay = new NebPay();

    var dappAddress = "n1h6GwUtyvwAUaJhcJeoWx1gWEvLqWssPKj";

    $("#savebutton").click(function() {
        var uuid = guid();

        var expressLoveWords = $("#expressLoveWords").val();
        if (expressLoveWords == "") {
            alert("请输入你要说的话。");
            return;
        }

        expressLoveWords = expressLoveWords.replace(/\n/g, "<br>");

        var to = dappAddress;
        var value = "0";
        var callFunction = "save";
        var callArgs = "[\"" + uuid + "\",\"" + expressLoveWords + "\"]";
        nebpay.call(to, value, callFunction, callArgs, {
            listener: function(resp) {
                console.log(JSON.stringify(resp));
                var expressLoveURL = "https://matsumoto410.github.io/ExpressLove/display.html" + "?uuid=" + uuid;

                $("#expressLoveURL").val(expressLoveURL);
            }
        });
    });
	
	$("#testbutton").click(function(){
		var expressLoveURL = $("#expressLoveURL").val().trim();
		if(expressLoveURL != ""){
			window.open(expressLoveURL);
		}else{
			alert("网址为空。");
		}
		
	});



});

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    function(c) {
        var r = Math.random() * 16 | 0,
        v = c == 'x' ? r: (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

