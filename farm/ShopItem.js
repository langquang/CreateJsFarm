/**
 * Created by CPU001 on 9/23/2014.
 */

var ShopItem = function () {
    this.initialize();
};

var p = ShopItem.prototype = new createjs.Container();
//============================== propertys
p._background = null;
p._txtGold = null;
p._txtName = null;
p._icon = null;
p._data = null;
p.loader = null;
p._scale_rate = 1;
p._filter_value =  [new createjs.BlurFilter(2,2,2), new createjs.ColorMatrixFilter(new createjs.ColorMatrix(0,0,-100,0))];

//======================================= Function ===========================
p.setItem = function(item_data, anim_data){
    this._data = item_data;
    var ss = new createjs.SpriteSheet(anim_data);
    // background
    this._background = new createjs.Sprite(ss);
    this._background.gotoAndStop(1);
    this.addChild(this._background);
    // txtName
    this._txtName = new createjs.Text("Name", "bold 14px Arial", "#000");
    this._txtName.textAlign = "center";
    this._txtName.x = 70;
    this._txtName.y = 10;
    this.addChild(this._txtName);
    // txtName
    this._txtGold = new createjs.Text("500", "bold 14px Arial", "#FFF");
    this._txtGold.x = 55;
    this._txtGold.y = 150;
    this.addChild(this._txtGold);

    if( this._data != null ){
        this._txtName.text = this._data.name;
        this._txtGold.text = this._data.price;
    }

    this.loadData(this._data.texture);
};

p.loadData = function (texture) {
    var manifest = [
        {src: "assets/" + texture + ".json", id: this._data.name}
    ];

    // loader is global
    this.loader = new createjs.LoadQueue();
    this.loader.on("complete", this.loadDataCompleted, this);
    this.loader.loadManifest(manifest);
};

p.loadDataCompleted = function (evt) {
    var animation_data = this.loader.getResult(this._data.name).anim;
    var ss = new createjs.SpriteSheet(animation_data);
    this._icon = new createjs.Sprite(ss);
    this._scale_rate = 100/this._icon.getBounds().width;
    this._icon.scaleX = this._scale_rate;
    this._icon.scaleY = this._scale_rate;
    this._icon.x = 76;
    this._icon.y = 90;
    this._icon.gotoAndStop(ss.getNumFrames() -1 );
    this.addChild(this._icon);

    this.on("dblclick", this.handleEvt, this);
    this.on("rollover", this.handleEvt, this);
    this.on("rollout", this.handleEvt, this);
};

p.handleEvt = function (evt) {
    if (evt.type == "rollover") {
        this._icon.scaleX = this._scale_rate*1.1;
        this._icon.scaleY = this._scale_rate*1.1;
    }
    else if (evt.type == "rollout") {
        this._icon.scaleX = this._scale_rate;
        this._icon.scaleY = this._scale_rate;
    }
};


//======================================= Override============================
//======================================= Constructor==========================
ShopItem.prototype.Container_initialize = p.initialize;
ShopItem.prototype.initialize = function () {
    this.Container_initialize();
};