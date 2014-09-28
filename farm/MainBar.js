/**
 * Created by CPU001 on 9/25/2014.
 */

var MainBar = function () {
    this.initialize();
};

var p = MainBar.prototype = new createjs.Container();
//============================== propertys
p._background = null;
p._background_2 = null;
p._btnArrow = null;
p._btnStop = null;
p._btnDelete = null;
p._btnMove = null;
p._btnShop = null;
p._btnFriendNext = null;
p._btnFriendPrev = null;

// container
p._friendListContainer = null;
p._friendlistMask = null;

// tween
p._tween_distance = 80;
p._tween_min = -340;
p._cur_tap_max_tween_index = 0;
p._cur_tap_cur_tween_index = 0;
//data
p.shop_data = null;
p._data_friends = [
    {name: "friend_1", level: 5},
    {name: "friend_2", level: 8},
    {name: "friend_3", level: 20},
    {name: "friend_4", level: 20},
    {name: "friend_5", level: 10},
    {name: "friend_6", level: 20},
    {name: "friend_7", level: 20},
    {name: "friend_8", level: 20},
    {name: "friend_9", level: 100},
    {name: "friend_10", level: 20},
    {name: "friend_11", level: 20},
    {name: "friend_12", level: 20},
    {name: "friend_13", level: 20},
    {name: "friend_14", level: 20},
    {name: "friend_15", level: 20},
    {name: "friend_16", level: 20},
    {name: "friend_17", level: 20},
    {name: "friend_18", level: 20},
    {name: "friend_19", level: 20},
    {name: "friend_20", level: 20},
    {name: "friend_21", level: 20},
    {name: "friend_22", level: 20}
];

p._frame_buy_1 = 0;
p._frame_buy_2 = 1;
p._frame_stop_1 = 2;
p._frame_stop_2 = 3;
p._frame_arrow_1 = 4;
p._frame_arrow_2 = 5;
p._frame_delete_1 = 6;
p._frame_delete_2 = 7;
p._frame_move_1 = 8;
p._frame_move_2 = 9;
p._frame_friend_1 = 10;
p._frame_friend_2 = 11;
p._frame_star = 12;
p._frame_next_1 = 13;
p._frame_next_2 = 14;
p._frame_prev_1 = 15;
p._frame_prev_2 = 16;
p._frame_home = 17;
p._frame_bg = 18;
p._frame_gold = 19;
p._frame_energy = 20;
p._frame_level = 21;
p._frame_runer = 22;
p._frame_bg_2 = 23;

//=======================================Functions =========================
p.loadData = function () {
    var manifest = [
        {src: "assets/gui_hud.json", id: "gui_hud"},
        {src: "assets/gui_hud.png", id: "gui_hud_texture"}
    ];

    // loader is global
    this.loader = new createjs.LoadQueue();
    this.loader.on("complete", this.loadDataCompleted, this);
    this.loader.loadManifest(manifest);
};

p.loadDataCompleted = function (evt) {
    this.shop_data = this.loader.getResult("gui_hud");
    var animation_data = this.shop_data.anim;
    var ss = new createjs.SpriteSheet(animation_data);
    // background
    this._background = new createjs.Sprite(ss);
    this._background.gotoAndStop(this._frame_bg);
    this.addChild(this._background);
    // background 2
    this._background_2 = new createjs.Sprite(ss);
    this._background_2.gotoAndStop(this._frame_bg_2);
    this._background_2.x = 180;
    this.addChild(this._background_2);


    // mask
    var g = new createjs.Graphics();
    g.beginFill("#00F").drawRect(0, 0, 480, 100);
    this._friendlistMask = new createjs.Shape(g);
    this._friendlistMask.x = this._tween_min;
    this._friendlistMask.y = -100;
//    this.addChild(this._friendlistMask);    // hide mask

    // friend list container
    this._friendListContainer = new createjs.Container();
    this._friendListContainer.x = this._friendlistMask.x;
    this._friendListContainer.y = this._friendlistMask.y;
    this._friendListContainer.mask = this._friendlistMask;  // set mask
    this._friendListContainer.visible = true;
    this.addChild(this._friendListContainer);
    for (var i = 0; i < this._data_friends.length; i++) {
        var friend_item = new FriendListItem();
        friend_item.setFriendInfo(this._data_friends[i], animation_data, this._frame_friend_1, this._frame_friend_2);
        friend_item.x = 43 +  i * this._tween_distance;
        friend_item.y = 50;
        this._friendListContainer.addChild(friend_item);
    }
    this._cur_tap_max_tween_index = Math.ceil(this._data_friends.length) - 6;

    // btn Next
    ss = new createjs.SpriteSheet(animation_data);
    this._btnShop = new createjs.Sprite(ss);
    this._btnShop.gotoAndStop(this._frame_buy_1);
    this._btnShop.x = 227;
    this._btnShop.y = -65;
    this._btnShop.on("click", this.handleBtnShopEvent, this);
    this._btnShop.on("rollover", this.handleBtnShopEvent, this);
    this._btnShop.on("rollout", this.handleBtnShopEvent, this);
    this.addChild(this._btnShop);
    // btn Arrow
    ss = new createjs.SpriteSheet(animation_data);
    this._btnArrow = new createjs.Sprite(ss);
    this._btnArrow.gotoAndStop(this._frame_arrow_1);
    this._btnArrow.x = 295;
    this._btnArrow.y = -93;
    this._btnArrow.on("click", this.handleBtnArrowEvent, this);
    this._btnArrow.on("rollover", this.handleBtnArrowEvent, this);
    this._btnArrow.on("rollout", this.handleBtnArrowEvent, this);
    this.addChild(this._btnArrow);
    // btn delete
    ss = new createjs.SpriteSheet(animation_data);
    this._btnDelete = new createjs.Sprite(ss);
    this._btnDelete.gotoAndStop(this._frame_delete_1);
    this._btnDelete.x = 350;
    this._btnDelete.y = -93;
    this._btnDelete.on("click", this.handleBtnDeleteEvent, this);
    this._btnDelete.on("rollover", this.handleBtnDeleteEvent, this);
    this._btnDelete.on("rollout", this.handleBtnDeleteEvent, this);
    this.addChild(this._btnDelete);
    // btn Move
    ss = new createjs.SpriteSheet(animation_data);
    this._btnMove = new createjs.Sprite(ss);
    this._btnMove.gotoAndStop(this._frame_move_1);
    this._btnMove.x = 295;
    this._btnMove.y = -35;
    this._btnMove.on("click", this.handleBtnMoveEvent, this);
    this._btnMove.on("rollover", this.handleBtnMoveEvent, this);
    this._btnMove.on("rollout", this.handleBtnMoveEvent, this);
    this.addChild(this._btnMove);
    // btn stop
    ss = new createjs.SpriteSheet(animation_data);
    this._btnStop = new createjs.Sprite(ss);
    this._btnStop.gotoAndStop(this._frame_stop_1);
    this._btnStop.x = 350;
    this._btnStop.y = -35;
    this._btnStop.on("click", this.handleBtnStopEvent, this);
    this._btnStop.on("rollover", this.handleBtnStopEvent, this);
    this._btnStop.on("rollout", this.handleBtnStopEvent, this);
    this.addChild(this._btnStop);
    // btn friend next
    ss = new createjs.SpriteSheet(animation_data);
    this._btnFriendNext = new createjs.Sprite(ss);
    this._btnFriendNext.gotoAndStop(this._frame_next_1);
    this._btnFriendNext.x = 160;
    this._btnFriendNext.y = -50;
    this._btnFriendNext.on("click", this.handleBtnFriendNextEvent, this);
    this._btnFriendNext.on("rollover", this.handleBtnFriendNextEvent, this);
    this._btnFriendNext.on("rollout", this.handleBtnFriendNextEvent, this);
    this.addChild(this._btnFriendNext);
    // btn friend prev
    ss = new createjs.SpriteSheet(animation_data);
    this._btnFriendPrev = new createjs.Sprite(ss);
    this._btnFriendPrev.gotoAndStop(this._frame_prev_1);
    this._btnFriendPrev.x = -358;
    this._btnFriendPrev.y = -50;
    this._btnFriendPrev.on("click", this.handleBtnFriendPrevEvent, this);
    this._btnFriendPrev.on("rollover", this.handleBtnFriendPrevEvent, this);
    this._btnFriendPrev.on("rollout", this.handleBtnFriendPrevEvent, this);
    this.addChild(this._btnFriendPrev);

    // set cursor icon
    gCursor.setTexture(animation_data);
};

p.handleBtnShopEvent = function (evt) {
    if (evt.type == "click") {
        this._btnShop.gotoAndStop(this._frame_buy_1);
        showIBShop(true);
        gCursor.setState(CURSOR_ARROW);
        gCursor.attachIsoEntity(null);
    } else if (evt.type == "rollover") {
        this._btnShop.gotoAndStop(this._frame_buy_2);
    } else if (evt.type == "rollout") {
        this._btnShop.gotoAndStop(this._frame_buy_1);
    }
};

p.handleBtnArrowEvent = function (evt) {
    if (evt.type == "click") {
        this._btnArrow.gotoAndStop(this._frame_arrow_1);
        gCursor.attachIsoEntity(null);
        gCursor.setState(CURSOR_ARROW);
    } else if (evt.type == "rollover") {
        this._btnArrow.gotoAndStop(this._frame_arrow_2);
    } else if (evt.type == "rollout") {
        this._btnArrow.gotoAndStop(this._frame_arrow_1);
    }
};

p.handleBtnDeleteEvent = function (evt) {
    if (evt.type == "click") {
        this._btnDelete.gotoAndStop(this._frame_delete_1);
        gCursor.setState(CURSOR_REMOVE);
        gCursor.attachIsoEntity(null);
    } else if (evt.type == "rollover") {
        this._btnDelete.gotoAndStop(this._frame_delete_2);
    } else if (evt.type == "rollout") {
        this._btnDelete.gotoAndStop(this._frame_delete_1);
    }
};

p.handleBtnMoveEvent = function (evt) {
    if (evt.type == "click") {
        this._btnMove.gotoAndStop(this._frame_move_1);
        gCursor.setState(CURSOR_MOVE);
        gCursor.attachIsoEntity(null);
    } else if (evt.type == "rollover") {
        this._btnMove.gotoAndStop(this._frame_move_2);
    } else if (evt.type == "rollout") {
        this._btnMove.gotoAndStop(this._frame_move_1);
    }
};

p.handleBtnFriendNextEvent = function (evt) {
    if (evt.type == "click") {
        this._btnFriendNext.gotoAndStop(this._frame_next_1);

        if( this._cur_tap_cur_tween_index < this._cur_tap_max_tween_index ){
            this._cur_tap_cur_tween_index++;
            var toX = this._tween_min - this._cur_tap_cur_tween_index*this._tween_distance;
             createjs.Tween.get(this._friendListContainer).to({x: toX }, 200).call(this.handleTweenCompleted);
        }

    } else if (evt.type == "rollover") {
        this._btnFriendNext.gotoAndStop(this._frame_next_2);
    } else if (evt.type == "rollout") {
        this._btnFriendNext.gotoAndStop(this._frame_next_1);
    }
};

p.handleTweenCompleted = function () {
    //Tween complete
};

p.handleBtnFriendPrevEvent = function (evt) {
    if (evt.type == "click") {
        this._btnFriendPrev.gotoAndStop(this._frame_prev_1);

        if( this._cur_tap_cur_tween_index > 0 ){
            this._cur_tap_cur_tween_index--;
            var toX = this._tween_min - this._cur_tap_cur_tween_index*this._tween_distance;
            createjs.Tween.get(this._friendListContainer).to({x: toX }, 200).call(this.handleTweenCompleted);
        }

    } else if (evt.type == "rollover") {
        this._btnFriendPrev.gotoAndStop(this._frame_prev_2);
    } else if (evt.type == "rollout") {
        this._btnFriendPrev.gotoAndStop(this._frame_prev_1);
    }
};

p.handleBtnStopEvent = function (evt) {
    if (evt.type == "click") {
        this._btnArrow.gotoAndStop(this._frame_arrow_1);
        gCursor.attachIsoEntity(null);
        gCursor.setState(CURSOR_ARROW);

    } else if (evt.type == "rollover") {
        this._btnStop.gotoAndStop(this._frame_stop_2);
    } else if (evt.type == "rollout") {
        this._btnStop.gotoAndStop(this._frame_stop_1);
    }
};


//======================================= Override==========================
//======================================= Constructor==========================
MainBar.prototype.Container_initialize = p.initialize;
MainBar.prototype.initialize = function () {
    this.Container_initialize();
    this.loadData();
    this.x = stageWidth / 2;
    this.y = stageHeight;
};