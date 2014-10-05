/**
 * Created by CPU001 on 9/22/2014.
 */

var IsoBuidling = function (shop_data, entityId) {
    this.initialize(shop_data, entityId);
};


var p = IsoBuidling.prototype = Object.create(IsoEntity.prototype);

//======================================= property ================================
p._constrcutor_step = 1;
p._icon = null;
p._isHarvesting = false;


p.harvest = function () {

    this.last_harvest = getSeconds();
    sendHarvest(this.entityId);
    this._icon.visible = false;
    this._isHarvesting = false;
    return this.shop_data.income;
};

p.canHarvest = function () {
    return this._icon.visible && this._isHarvesting == false;
};

p.checkHarvest = function (cur_seconds) {
    this._icon.visible = this.last_harvest == 0 || this.last_harvest + this.shop_data.time <= cur_seconds;
};


//======================================= override ================================
IsoBuidling.prototype.IsoEntity_onCreatedByCursorClick = p.onCreatedByCursorClick;
IsoBuidling.prototype.onCreatedByCursorClick = function (current_cursor) {
};

IsoBuidling.prototype.IsoEntity_loadDataCompleted = p.loadDataCompleted;
IsoBuidling.prototype.loadDataCompleted = function (evt) {
    this.IsoEntity_loadDataCompleted(evt);
    this._constrcutor_step = this.shop_data.step;
    this.sprite.gotoAndStop(this._constrcutor_step - 1);
    this.addChild(this._icon);


};

IsoBuidling.prototype.IsoEntity_handleEvt = p.handleEvt;
IsoBuidling.prototype.handleEvt = function (evt) {
    this.IsoEntity_handleEvt(evt);
    if (evt.type == "rollover") {
        gEntityInfo.show(true, this.x, this.y);
        if( this.canHarvest() ){
            gEntityInfo.setInfo(this.shop_data.name, "Click to collect profits", null);
        }else{
            gEntityInfo.setInfo(this.shop_data.name, "Harvest in: ", this);
        }
    }
    else if (evt.type == "rollout") {
        gEntityInfo.show(false, this.x, this.y);
    } else if (evt.type == "click") {
        if (gCursor.state == CURSOR_ARROW) {

            if (this.canHarvest()) {

                if( gHud.getEnegry() <= 0 ){
                    showTextError("not enough enegry!", this.x, this.y);
                }else{
                    this._isHarvesting = true;
                    var harvestbar = new HarvestBar();
                    harvestbar.show(this, this.x, this.y);
                }
            }
        }
    }
};


// ====================================== Constructor =============================
IsoBuidling.prototype.IsoEntity_initialize = p.initialize;
IsoBuidling.prototype.initialize = function (shop_data, entityId) {
    this.IsoEntity_initialize(shop_data, entityId);
    this.entityType = ENTITY_TYPE_BUILDING;

    this._icon = new createjs.Sprite(gGoldSheet);
    this._icon.y = -50;
    this._icon.gotoAndPlay(getRandomInt(0, 49));
};