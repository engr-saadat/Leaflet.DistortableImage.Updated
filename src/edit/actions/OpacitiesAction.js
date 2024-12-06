let opacities = [100, 80, 60, 40, 20, 0]; // Set numeric values from 0 to 100.

// Add custom CSS scripts and overwrites. Pending for better implementation of CSSStyleSheet in browsers.
const subtoolbarCss = new CSSStyleSheet();
subtoolbarCss.replaceSync(
  `.leaflet-toolbar-icon-vertical {
        box-sizing: border-box !important;
        display: block !important;
        width: 30px !important;
        height: 30px !important;
        line-height: 30px !important;
        padding: 0 !important;
        text-align: center !important;
        text-decoration: none !important;
        background-color: white;
        border:transparent !important;
        font-size: 12px !important;
        font-weight: bold !important;
        color:#0087A8 !important;
        float: none !important;
        margin: auto !important;
        z-index:900 !important;
     
      }
    `
);

subtoolbarCss.insertRule(
  `.leaflet-toolbar-1 li:first-child a {
        border-radius: 4px 4px 0px 0px !important;
    }`
);
document.adoptedStyleSheets = [subtoolbarCss];

opacities = opacities.map((o) => {
  isNaN(o) || o > 100 ? (o = 100) : o;
  o < 0 ? (o = 0) : o;

  return L.EditAction.extend({
    options: {
      toolbarIcon: {
        html: o,
        tooltip: "Opacity " + o + "%",
        className: "leaflet-toolbar-icon-vertical",
        style:
          "background-color:rgb(" +
          (100 - o) +
          "%," +
          (100 - o) +
          "%," +
          (100 - o) +
          "%);",
      },
    },
    addHooks() {
      this._overlay.editing._setOpacities(o / 100);
    },
  });
});

L.OpacitiesToolbar2 = L.Toolbar2.extend({
  options: {
    className: "",
    filter: function () {
      return true;
    },
    actions: [],
    style: `translate(-1px, -${(opacities.length + 1) * 30}px)`,
  },

  appendToContainer(container) {
    let baseClass = this.constructor.baseClass + "-" + this._calculateDepth();
    let className = baseClass + " " + this.options.className;
    let Action;
    let action;
    let i;
    let j;
    let l;
    let m;

    this._container = container;
    this._ul = L.DomUtil.create("ul", className, container);
    this._ul.style.transform = this.options.style ? this.options.style : "";

    // Ensure that clicks, drags, etc. don't bubble up to the map.
    // These are the map events that the L.Draw.Polyline handler listens for.
    // Note that L.Draw.Polyline listens to 'mouseup', not 'mousedown', but
    // if only 'mouseup' is silenced, then the map gets stuck in a halfway
    // state because it receives a 'mousedown' event and is waiting for the
    // corresponding 'mouseup' event.
    this._disabledEvents = [
      "click",
      "mousemove",
      "dblclick",
      "mousedown",
      "mouseup",
      "touchstart",
    ];

    for (j = 0, m = this._disabledEvents.length; j < m; j++) {
      L.DomEvent.on(
        this._ul,
        this._disabledEvents[j],
        L.DomEvent.stopPropagation
      );
    }

    /* Instantiate each toolbar action and add its corresponding toolbar icon. */
    for (i = 0, l = this.options.actions.length; i < l; i++) {
      Action = this._getActionConstructor(this.options.actions[i]);

      action = new Action();
      action._createIcon(this, this._ul, this._arguments);
    }
  },
});

L.OpacitiesAction = L.EditAction.extend({
  initialize(map, overlay, options) {
    const edit = overlay.editing;
    const mode = edit._mode;

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
      tooltip: "Set custom opacity",
      className: mode === "lock" ? "disabled" : "",
    };

    options.subToolbar = new L.OpacitiesToolbar2({
      actions: opacities,
    });

    L.DistortableImage.action_map.o = mode === "lock" ? "" : "_setOpacities";

    L.EditAction.prototype.initialize.call(this, map, overlay, options);
  },

  addHooks() {
    const link = this._link;
    if (L.DomUtil.hasClass(link, "subtoolbar_enabled")) {
      L.DomUtil.removeClass(link, "subtoolbar_enabled");
      setTimeout(() => {
        this.options.subToolbar._hide();
      }, 100);
    } else {
      L.DomUtil.addClass(link, "subtoolbar_enabled");
    }

    L.IconUtil.toggleXlink(link, "opacities", "cancel");
    L.IconUtil.toggleTitle(link, "Make Image Transparent", "Cancel");
  },
});
