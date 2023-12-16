// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { CleanStyle } from "@lib/interfaces";
import { classifyStyle } from "@lib/utils";

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

    case 'getPaintStyles':

      let styles:Array<CleanStyle> = figma.getLocalPaintStyles().map(({ name, id, key, paints }) => ({ id, key, name, paints: paints as Paint[] })); //only keep necessary;
      console.log( classifyStyle(styles) );

      figma.ui.postMessage(styles);
      break;

    case 'getTextStyles':
      figma.ui.postMessage(figma.getLocalTextStyles());
      break;

    default:

  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  //figma.closePlugin();
};
