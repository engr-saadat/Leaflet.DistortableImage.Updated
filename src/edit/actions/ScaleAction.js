L.ScaleAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    options = options || {};
    options.toolbarIcon = {
      svg: false,
      html: `<div class="iconStyle">
      
<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.81079 7.02132L8.29744 4.53467H6.06567V3.29134H10.4173V7.64298H9.17398V5.41121L6.68733 7.89786V9.50797H11.6606V2.04801H4.20068V7.02132H5.81079ZM12.904 0.804688V10.7513H6.68733V13.2379H0.470703V7.02132H2.95735V0.804688H12.904ZM5.44401 8.26464H1.71403V11.9946H5.44401V8.26464Z" fill="none"/>
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
