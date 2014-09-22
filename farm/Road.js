/**
 * Created by CPU001 on 9/21/2014.
 */


var IsoRoad = function (buildingId, entityId, texture) {
    this.initialize(buildingId, entityId, texture);
};

var p = IsoRoad.prototype = Object.create(IsoEntity.prototype);

//======================================= override ================================
IsoRoad.prototype.IsoEntity_onCreatedByCursorClick = p.onCreatedByCursorClick;
IsoRoad.prototype.onCreatedByCursorClick = function (current_cursor) {
    gIsoState.execRoad(this, true);
};

// ====================================== Constructor =============================
IsoRoad.prototype.IsoEntity_initialize = p.initialize;
IsoRoad.prototype.initialize = function (buildingId, entityId, texture) {
    this.IsoEntity_initialize(buildingId, entityId, texture);
    this.entityType = ENTITY_TYPE_ROAD;
};