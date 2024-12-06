L.RotateAction = L.EditAction.extend({
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
      "><svg width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_460_18131)">
<path d="M5.96386 6.82452L4.97323 5.90625C4.39867 6.71374 4.05844 7.63312 3.98264 8.57533L5.34499 8.51887C5.41509 7.9282 5.62738 7.34516 5.96386 6.82452ZM5.40089 9.86772L4.03855 9.92419C4.19205 10.8569 4.60044 11.7452 5.23985 12.5024L6.1511 11.5053C5.77944 11.014 5.51991 10.4573 5.40089 9.86772ZM6.23077 13.4274C7.03826 14.002 7.96383 14.3285 8.90604 14.4043L8.84929 13.0352C8.25835 12.9583 7.68233 12.7525 7.16141 12.4093L6.23077 13.4274ZM9.81157 3.65194L9.72576 1.58144L6.7843 4.77727L9.97733 7.65129L9.86804 5.01428C11.7968 5.25862 13.3224 6.85734 13.4054 8.86039C13.4884 10.8634 12.1004 12.5829 10.1984 12.986L10.2549 14.3484C12.9052 13.9075 14.8683 11.5561 14.7542 8.80448C14.6402 6.05282 12.4893 3.872 9.81157 3.65194Z" fill="#101010"/>
</g>
<defs>
<clipPath id="clip0_460_18131">
<rect width="16.2002" height="16.2002" fill="white" transform="translate(0.929688 1.26807) rotate(-2.37328)"/>
</clipPath>
</defs>
</svg>

</div>`,
      tooltip: overlay.options.translation.rotateImage,
      className: "rotate",
    };

    L.DistortableImage.action_map.r = "_rotateMode";
    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const edit = this._overlay.editing;
    edit._rotateMode();
  },
});
