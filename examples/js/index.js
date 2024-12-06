let map;

(() => {
  map = L.map("map").setView([51.505, -0.09], 13);
  map.addGoogleMutant();

  map.whenReady(() => {
    img = L.distortableImageOverlay("example.jpg", {
      selected: true,
      fullResolutionSrc: "large.jpg",
      actions: [
        L.ScaleAction,
        L.RotateAction,
        L.OpacitiesAction,
        L.RestoreAction,
        L.DeleteAction,
      ],
    }).addTo(map);
  });
})();

L.Control.geocoder().addTo(map);
