export function setupZoomRendererSwitch(view, layers, renderers) {
    view.watch("zoom", function (newZoom) {
      const type = newZoom >= 13 ? "pin" : "heatmap";
  
      layers.forEach(layerInfo => {
        layerInfo.layer.renderer = renderers[type][layerInfo.key];
      });
    });
  }