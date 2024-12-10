L.RestoreAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    const mode = L.Utils.getNestedVal(overlay, "editing", "_mode");
    const edited = overlay.edited;

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
<svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.7269 3.65268L1.24023 6.13935M1.24023 6.13935L3.7269 8.62602M1.24023 6.13935H8.07857C8.73807 6.13935 9.37057 5.87736 9.83691 5.41102C10.3032 4.94468 10.5652 4.31219 10.5652 3.65268C10.5652 2.99318 10.3032 2.36068 9.83691 1.89434C9.37057 1.428 8.73807 1.16602 8.07857 1.16602H7.4569" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


</div>`,
      tooltip: overlay.options.translation.restoreImage,
      className: edited && mode !== "lock" ? "" : "disabled",
    };

    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const ov = this._overlay;

    L.DomEvent.on(
      ov,
      {
        edit: this._enableAction,
        restore: this._disableAction,
      },
      this
    );

    ov.restore();
  },
});
