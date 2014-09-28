/**
 * Created by CPU001 on 9/29/2014.
 */

var DarkLock = function () {
    this.initialize();
};

var p = DarkLock.prototype = new createjs.Container();
//============================== propertys
p._shape = null;
p._isShow = false;

//======================================= Function ===========================
p.show = function(visible){
    this._isShow = visible;
    if( visible ){
        gUIContainer.addChild(this._shape);
    }else {
        gUIContainer.removeChild(this._shape);
    }
};

p.isShowing = function(){
   return this._isShow;
};


//======================================= Override============================
//======================================= Constructor==========================
DarkLock.prototype.Container_initialize = p.initialize;
DarkLock.prototype.initialize = function () {
    this.Container_initialize();

    var g = new createjs.Graphics();
    g.beginFill("#000");
    g.drawRect(0, 0, stageWidth, stageHeight);
    g.endFill();

    this._shape = new createjs.Shape(g);
    this._shape.alpha = 0.6;

};