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

p._data = null;

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
    this._data = this.loader.getResult("gui_hud");
    var animation_data = this._data.anim;
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