/**
 * Created by CPU001 on 10/4/2014.
 */
// socket
var socket = io.connect('192.168.1.20:3000');
//==================================== MSG ===============================
var _msg_login_ = "login";
var _msg_buy_ = "buy";
var _msg_harvest_ = "harvest";
var _msg_move_ = "move";
var _msg_delete_ = "delete";
var _msg_visit_ = "visit";
var _msg_boots_ = "boots";

var _storeLoginData;
//====================================== RECIVE ==================================================
socket.on(_msg_login_, function (data) {
    console.log("Login response");
    console.log(data);

    var res = JSON.parse(data);
    var buildings =  res.buildings;
    for (var key in buildings)
    {
        var buidlding_data = buildings[key];
        var shop_data = gItemConfig[buidlding_data.shop_id];
        var building = gIsoState.createIsoEntity(shop_data, buidlding_data.x, buidlding_data.y);
        gIsoState.add(building);
    }

});


//====================================== send ==================================================
function sendLogin(userId) {
    console.log("Connecting......");
    socket.emit(_msg_login_, JSON.stringify({userId: userId}));
}

function sendBuy(userId, id, x, y) {
    socket.emit(_msg_buy_, JSON.stringify({userId: userId, id: id, x: x, y: y}));
}

function sendDelete(userId, buildingId) {
    socket.emit(_msg_login_, JSON.stringify({userId: userId, buildingId: buildingId}));
}