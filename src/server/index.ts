// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { sort_by_hsl } from "@lib/utils/color";
import { StyleColor } from "@ctypes/style";
import {
  classifyStyle,
  updateColor,
  updateFolderName,
  updateStyleName,
  addStyle,
  get_styles_of_folder,
  sort_by_name,
  duplicateFolder
} from "@lib/utils/style";
import { createSwatch } from "@lib/utils/shade";
import { ColorRGB } from "@ctypes/color";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH, GET_PAINT_STYLES_COMMAND, GET_TEXT_STYLES_COMMAND } from "@lib/constants";


figma.showUI(__html__, { themeColors: true });
figma.ui.resize(DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {

  const {action, payload} = msg;
  switch (action) {

    //styles references: https://www.figma.com/plugin-docs/api/figma/#styles
    case "create-rectangles":

      const nodes: SceneNode[] = [];
      for (let i = 0; i < msg.count; i++) {
        const rect = figma.createRectangle();
        rect.x = i * 150;
        rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
      }
      figma.currentPage.selection = nodes;
      figma.viewport.scrollAndZoomIntoView(nodes);

      break;

    case GET_PAINT_STYLES_COMMAND:
      let paintStyles: Array<StyleColor> = figma.getLocalPaintStyles().map(({ name, id, key, paints }) => ({ id, figmaKey: key, name, paints: paints as Paint[], type: "COLOR" })); //only keep necessary keys;
      figma.ui.postMessage({ action: action, styles: classifyStyle(paintStyles) });
      break;

    case GET_TEXT_STYLES_COMMAND:
      figma.ui.postMessage({ action: action, styles: figma.getLocalTextStyles() });
      break;

    case 'UPDATE_STYLE_FOLDER':
      updateFolderName({ folder: payload.folder, level: payload.level, name: payload.newName });
      break;

    case 'UPDATE_STYLE_NAME':
      updateStyleName(payload);
      break;

    case 'UPDATE_STYLE_COLOR':
      updateColor(payload);
      break;

    case 'ADD_STYLE_COLOR':
      addStyle(payload);
      break;

    case 'DUPLICATE_FOLDER':
      duplicateFolder(payload);
      break;

    case 'DELETE_FOLDER':
      get_styles_of_folder(payload.folder).forEach(item => figma.getStyleById(item.id)?.remove());
      break;

    case 'DELETE_STYLE':
      figma.getStyleById(payload.style.id)?.remove();
      break;

    case 'SORT_STYLE_NAME':
      sort_by_name(payload.folder.styles);
      break;


    case 'SORT_STYLE_COLOR_BRIGHTNESS':
      sort_by_hsl(payload.folder.styles, 'BRIGHTNESS');
      break;


    case 'SORT_STYLE_COLOR_SATURATION':
      sort_by_hsl(payload.folder.styles, 'SATURATION');
      break;

    case 'CREATE_SWATCH':
      createSwatch(payload);
      break;

    case 'EDIT_SWATCH':
      payload.config?.styles?.forEach((style: StyleColor, i: number) => {
        try { updateColor({ style, color: payload.set[i].color as ColorRGB }); }
        catch (_) { }
      });
      break;

    case 'RESIZE_WINDOW':
      figma.ui.resize(Math.max(payload.width, 540) || DEFAULT_WINDOW_WIDTH, Math.max(payload.height, 320) || DEFAULT_WINDOW_HEIGHT);
      break;
    default:

  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
};

figma.on("documentchange", ({ documentChanges }) => {

  documentChanges.map(change => {

    switch (change.type) {

      case 'STYLE_PROPERTY_CHANGE':
      case 'STYLE_CREATE':
      case 'STYLE_DELETE':
        figma.ui.postMessage({ action: 'RELOAD_PAGE' });
        break;
    }

  });

});


