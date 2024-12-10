L.RotateHandle = L.EditHandle.extend({
  options: {
    TYPE: "rotate",
    icon: L.divIcon({
      html: `<div style="    width: 26px;
      height: 26px;
      background: black;
      display: flex;
      justify-content: center;
      align-items: center;
          padding: 2px;
      border-radius: 50%;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18" version="1.1"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
      <g class="currentLayer" style=""><title>Layer 1</title><g id="surface1" class="" fill="#fff" fill-opacity="1">
      <path style="stroke: none; fill-rule: nonzero;" d="M 1.328125 8.335938 L 3.519531 8.84375 C 3.734375 7.933594 4.179688 7.078125 4.808594 6.375 L 3.132812 4.875 C 2.25 5.859375 1.628906 7.054688 1.328125 8.335938 Z M 1.328125 8.335938 " id="svg_1" fill="#fff" fill-opacity="1"/>
      <path style="stroke: none; fill-rule: nonzero;" d="M 1.125 11.234375 C 1.332031 12.691406 1.945312 14.054688 2.894531 15.183594 L 4.628906 13.738281 C 3.949219 12.933594 3.511719 11.957031 3.363281 10.921875 C 3.363281 10.921875 1.125 11.234375 1.125 11.234375 Z M 1.125 11.234375 " id="svg_2" fill="#fff" fill-opacity="1"/>
      <path style="stroke: none; fill-rule: nonzero;" d="M 10.125 2.339844 L 10.125 0 L 6.75 3.375 L 10.125 6.75 L 10.125 4.613281 C 12.6875 5.136719 14.625 7.410156 14.625 10.125 C 14.625 13.226562 12.101562 15.75 9 15.75 C 8.054688 15.75 7.121094 15.511719 6.300781 15.0625 L 5.21875 17.035156 C 6.371094 17.664062 7.679688 18 9 18 C 13.34375 18 16.875 14.464844 16.875 10.125 C 16.875 6.167969 13.933594 2.886719 10.125 2.339844 Z M 10.125 2.339844 " id="svg_3" fill="#fff" fill-opacity="1"/>
      </g></g></svg></div>`,

      iconAnchor: [13, 13],
    }),
  },

  _onHandleDrag() {
    const overlay = this._handled;
    const formerLatLng = overlay.getCorner(this._corner);
    const newLatLng = this.getLatLng();
    const angle = this.calculateAngleDelta(formerLatLng, newLatLng);

    /*
     * running rotation logic even for an angle delta of 0
     * prevents a small, occasional marker flicker
     */
    overlay.rotateBy(angle, "rad");
  },

  updateHandle() {
    this.setLatLng(this._handled.getCorner(this._corner));
  },
});

L.rotateHandle = function (overlay, idx, options) {
  return new L.RotateHandle(overlay, idx, options);
};
