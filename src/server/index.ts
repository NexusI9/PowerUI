// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { sort_by_hsl } from "@lib/utils/utils.color";
import { StyleColor } from "@lib/interfaces";
import {
  classifyStyle,
  updateColor,
  updateFolderName,
  updateStyleName,
  addStyle,
  get_styles_of_folder,
  sort_by_name
} from "@lib/utils/utils.style";

figma.showUI(__html__, { themeColors: true });
figma.ui.resize(750, 655);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {

  switch (msg.action) {

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

    case 'GET_PAINT_STYLES':
      let paintStyles: Array<StyleColor> = figma.getLocalPaintStyles().map(({ name, id, key, paints }) => ({ id, figmaKey: key, name, paints: paints as Paint[], type: "COLOR" })); //only keep necessary keys;
      figma.ui.postMessage({ action: msg.action, styles: classifyStyle(paintStyles) });
      break;

    case 'GET_TEXT_STYLES':
      figma.ui.postMessage(figma.getLocalTextStyles());
      break;

    case 'UPDATE_STYLE_FOLDER':
      updateFolderName({ folder: msg.folder, level: msg.level, name: msg.newName });
      break;

    case 'UPDATE_STYLE_NAME':
      updateStyleName(msg);
      break;

    case 'UPDATE_STYLE_COLOR':
      updateColor(msg);
      break;

    case 'ADD_STYLE_COLOR':
      addStyle(msg);
      break;

    case 'DUPLICATE_FOLDER':
      get_styles_of_folder(msg.folder).forEach(item => {
        const parts = item.name.split('/');
        parts[msg.folder.level] += ` (copy)`;
        addStyle({ 
          name: parts.join('/'), 
          style: (item.type === 'COLOR' && item.paints) || (item.type === 'TEXT' && item.texts), 
          type: item.type 
        });
      });
      break;

    case 'DELETE_FOLDER':
      get_styles_of_folder(msg.folder).forEach(item => figma.getStyleById(item.id)?.remove());
      break;

    case 'DELETE_STYLE':
      figma.getStyleById(msg.style.id)?.remove();
      break;

    case 'SORT_STYLE_NAME':
      sort_by_name(msg.folder.styles);
      break;

      
    case 'SORT_STYLE_COLOR_BRIGHTNESS':
      sort_by_hsl(msg.folder.styles,'BRIGHTNESS');
      break;


    case 'SORT_STYLE_COLOR_SATURATION':
      sort_by_hsl(msg.folder.styles, 'SATURATION');
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


