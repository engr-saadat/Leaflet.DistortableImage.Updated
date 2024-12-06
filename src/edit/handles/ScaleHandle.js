L.ScaleHandle = L.EditHandle.extend({
  options: {
    TYPE: "scale",
    icon: L.icon({
      iconUrl:
        // eslint-disable-next-line max-len
        "data:image/png;base64,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",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
  },

  _onHandleDrag() {
    const overlay = this._handled;
    const map = overlay._map;
    let edgeMinWidth = overlay.edgeMinWidth;
    const formerLatLng = overlay.getCorner(this._corner);
    const newLatLng = this.getLatLng();
    const scale = this._calculateScalingFactor(formerLatLng, newLatLng);

    /*
     * checks whether the "edgeMinWidth" property is set and tracks the minimum edge length;
     * this enables preventing scaling to zero, but we might also add an overall scale limit
     */

    if (!edgeMinWidth) {
      edgeMinWidth = 50;
    } /* just in case */
    const corner1 = map.latLngToLayerPoint(overlay.getCorner(0));
    const corner2 = map.latLngToLayerPoint(overlay.getCorner(1));
    const w = Math.abs(corner1.x - corner2.x);
    const h = Math.abs(corner1.y - corner2.y);
    const distance = Math.sqrt(w * w + h * h);

    if (distance > edgeMinWidth || scale > 1) {
      overlay.scaleBy(scale);
      /*
       * running scale logic even for a scale ratio of 1
       * prevents a small, occasional marker flicker
       */
    } else {
      overlay.scaleBy(1);
    }
  },

  updateHandle() {
    this.setLatLng(this._handled.getCorner(this._corner));
  },
});

L.scaleHandle = function (overlay, idx, options) {
  return new L.ScaleHandle(overlay, idx, options);
};
