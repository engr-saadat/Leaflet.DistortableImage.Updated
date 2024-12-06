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
      "><svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.50385 13.9047C4.51758 14.2359 4.66233 14.5481 4.90625 14.7726C5.15018 14.9971 5.4733 15.1155 5.80454 15.1018L12.0492 14.843C12.3804 14.8293 12.6926 14.6845 12.9171 14.4406C13.1417 14.1967 13.2601 13.8736 13.2463 13.5423L12.9358 6.04875L14.1847 5.99699L14.1329 4.74806L11.6351 4.85158L11.5833 3.60266C11.5696 3.27142 11.4248 2.9592 11.1809 2.73469C10.937 2.51018 10.6139 2.39176 10.2826 2.40549L6.53585 2.56078C6.20461 2.57451 5.89239 2.71926 5.66788 2.96318C5.44337 3.20711 5.32495 3.53023 5.33868 3.86147L5.39044 5.1104L2.89259 5.21392L2.94435 6.46285L4.19328 6.41109L4.50385 13.9047ZM6.58761 3.80971L10.3344 3.65442L10.3862 4.90335L6.63937 5.05863L6.58761 3.80971ZM6.06667 6.33344L11.6868 6.10051L11.9974 13.5941L5.75278 13.8529L5.4422 6.35932L6.06667 6.33344Z" fill="black"/>
<path d="M6.74316 7.55652L7.99209 7.50476L8.19914 12.5005L6.95021 12.5522L6.74316 7.55652ZM9.24102 7.45299L10.4899 7.40123L10.697 12.3969L9.44807 12.4487L9.24102 7.45299Z" fill="black"/>
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
