// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { StyleFolder, StyleItem } from "@lib/interfaces";
import { classifyStyle, updateFolderName } from "@lib/utils";

figma.showUI(__html__, { themeColors: true });
figma.ui.resize(750, 655);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {

  switch (msg.type) {

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
      let paintStyles: Array<StyleItem> = figma.getLocalPaintStyles().map(({ name, id, key, paints }) => ({ id, figmaKey: key, name, paints: paints as Paint[], type: "style" })); //only keep necessary keys;
      figma.ui.postMessage({ type: msg.type, styles: classifyStyle(paintStyles) });
      break;


    case 'GET_TEXT_STYLES':
      figma.ui.postMessage(figma.getLocalTextStyles());
      break;

    case 'UPDATE_STYLE_FOLDER':
      let { level, newName, folder } = msg;
      updateFolderName({folder, level, name:newName});
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
        figma.ui.postMessage({ type: 'RELOAD_PAGE' });
        break;
    }

  });

});
