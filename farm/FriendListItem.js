/**
 * Created by CPU001 on 9/25/2014.
 */

var FriendListItem = function () {
    this.initialize();
};

var p = FriendListItem.prototype = new createjs.Container();
//============================== propertys
p._background = null;
p._txtLevel = null;
p._txtName = null;
p._icon = null;
p.shop_data = null;
p.loader = null;
p._scale_rate = 1;
p._frame_1 = 0;
p._frame_2 = 0;

//======================================= Function ===========================
p.setFriendInfo = function (friend_data, anim_data, frame_1, frame_2) {
    this.shop_data = friend_data;
    this._frame_1 = frame_1;
    this._frame_2 = frame_2;
    var ss = new createjs.SpriteSheet(anim_data);
    // background
    this._background = new createjs.Sprite(ss);
    this._background.gotoAndStop(this._frame_1);
    this.addChild(this._background);
    // txtName
    this._txtName = new createjs.Text( this.shop_data.name, "bold 12px Arial", "#000");
    this._txtName.textAlign = "center";
    this._txtName.x = 0;
    this._txtName.y = -45;
    this.addChild(this._txtName);
    // txtName
    this._txtLevel = new createjs.Text( this.shop_data.level, "bold 14px Arial", "#000");
    this._txtLevel.x = 8;
    this._txtLevel.y = 25;
    this.addChild(this._txtLevel);

    this.on("click", this.handleEvent, this);
    this.on("rollover", this.handleEvent, this);
    this.on("rollout", this.handleEvent, this);
};

p.handleEvent = function (evt) {
    if (evt.type == "click") {
        this._background.gotoAndStop(this._frame_1);

    } else if (evt.type == "rollover") {
        this._background.gotoAndStop(this._frame_2);
    } else if (evt.type == "rollout") {
        this._background.gotoAndStop(this._frame_1);
    }
};


//======================================= Override============================
//======================================= Constructor==========================
FriendListItem.prototype.Container_initialize = p.initialize;
FriendListItem.prototype.initialize = function () {
    this.Container_initialize();
};