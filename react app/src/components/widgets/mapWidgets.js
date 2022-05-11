import React, { useEffect } from "react";
import Bookmarks from "@arcgis/core/widgets/Bookmarks";
import Expand from "@arcgis/core/widgets/Expand";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
export function BookmarksWidget({ view }) {
  useEffect(() => {
    let bookmark = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    });
    let expand = new Expand({
      view,
      content: bookmark,
    });
    // Add the widget to the top-right corner of the view
    view.ui.add(expand, "top-right");
  }, []);
  return null;
}
export function BasemapGalleryWidget({ view }) {
  useEffect(() => {
    let basemapGallery = new BasemapGallery({
      view,
    });
    let expand = new Expand({
      view,
      content: basemapGallery,
    });
    // Add the widget to the top-right corner of the view
    view.ui.add(expand, "top-right");
  }, []);
  return null;
}
