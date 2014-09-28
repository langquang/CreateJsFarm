/**
 * Created by CPU001 on 9/22/2014.
 */

var IsoBuidling = function (shop_data, entityId) {
    this.initialize(shop_data, entityId);
};


var p = IsoBuidling.prototype = Object.create(IsoEntity.prototype);

//======================================= property ================================
p._constrcutor_step = 1;

//======================================= override ================================
IsoBuidling.prototype.IsoEntity_onCreatedByCursorClick = p.onCreatedByCursorClick;
IsoBuidling.prototype.onCreatedByCursorClick = function (current_cursor) {
};

IsoBuidling.prototype.IsoEntity_loadDataCompleted = p.loadDataCompleted;
IsoBuidling.prototype.loadDataCompleted = function (evt) {
    this.IsoEntity_loadDataCompleted(evt);
    this._constrcutor_step = this.shop_data.step;
    this.sprite.gotoAndStop(this._constrcutor_step - 1);

};

// ====================================== Constructor =============================
IsoBuidling.prototype.IsoEntity_initialize = p.initialize;
IsoBuidling.prototype.initialize = function (shop_data, entityId) {
    this.IsoEntity_initialize(shop_data, entityId);
    this.entityType = ENTITY_TYPE_BUILDING;
};