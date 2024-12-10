L.ScaleHandle = L.EditHandle.extend({
  options: {
    TYPE: "scale",
    icon: L.divIcon({
      html: `<div style="    width: 20px;
      height: 20px;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
          padding: 2px;
      border-radius: 50%;"><svg height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" style="height: 20px; color: rgb(255, 255, 255);"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"><path d="m304 96h112v112"></path><path d="m405.77 106.2-293.79 293.82"></path><path d="m208 416h-112v-112"></path></g></svg></div>`,

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
