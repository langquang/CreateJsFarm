//this.createjs = this.createjs || {};

var dependency = {};
var visited = {};
var depth = 0;

function zorder(children) {

    if(children.length < 2)
    {
        return;
    }

    dependency = {};
    var i = 0;
    var max = children.length;
    for (i = 0; i < max; ++i) {
        var behind = [];
        var objA = children[i];
        var rightA = objA.isoX;
        var frontA = objA.isoY;

        for (var j = 0; j < max; ++j) {
            var objB = children[j];

            // See if B should go behind A
            // simplest possible check, interpenetrations also count as "behind", which does do a bit more work later, but the inner loop tradeoff for a faster check makes up for it
            if ((objB.isoX < rightA) &&
                (objB.isoY < frontA) &&
                (i !== j)) {
                behind.push(objB);
            }
        }
        dependency[objA.entityId] = behind;
    }

    visited = {};
    depth = 0;
    for (i = 0; i < children.length; i++) {
        if (true != visited[children[i].entityId])
            place(children[i]);
    }
    // Clear out temporary dictionary so we're not retaining memory between calls
    visited = {};
}

function place(obj) {
    visited[obj.entityId] = true;
    for (var i = 0; i < dependency[obj.entityId].length; i++) {
        var inner = dependency[obj.entityId][i];
        if (true != visited[inner.entityId])
            place(inner);
    }
    if( obj.sprite != null ){
        isoContainer.setChildIndex(obj.sprite, depth);
        //console.log(obj.entityId, depth);
        ++depth;
    }

}

function screenToIso(screenPt){
    var  y = screenPt.e(2) - screenPt.e(1) / 2;
    var  x = screenPt.e(1) / 2 + screenPt.e(2);
    return $V([x,y,0]);
}

function isoToScreen(isoPt){
    var  y = (isoPt.e(1) + isoPt.e(2)) / 2;
    var  x = isoPt.e(1) - isoPt.e(2);
    return $V([x,y,0]);
}
