L.ScaleAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    options = options || {};
    options.toolbarIcon = {
      svg: false,
      html: `<div style="    width: 30px;
      height: 30px;
      border-radius:50%;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
      ">
      <svg
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M6.96989 8.10686L9.35143 5.51937L7.12158 5.61179L7.07009 4.36953L11.418 4.18933L11.5982 8.53724L10.3559 8.58873L10.2635 6.35887L7.88198 8.94636L7.94865 10.5551L12.9177 10.3491L12.6088 2.89559L5.15522 3.2045L5.36116 8.17354L6.96989 8.10686ZM13.7995 1.60184L14.2114 11.5399L8.00014 11.7973L8.10311 14.2819L1.89181 14.5393L1.63438 8.328L4.1189 8.22502L3.86147 2.01373L13.7995 1.60184ZM6.65491 9.36431L2.92813 9.51877L3.08258 13.2455L6.80936 13.0911L6.65491 9.36431Z"
    fill="black"
  />
</svg>

</div>`,
      tooltip: overlay.options.translation.scaleImage,
      className: "scale",
    };

    L.DistortableImage.action_map.s = "_scaleMode";
    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const edit = this._overlay.editing;
    edit._scaleMode();
  },
});
