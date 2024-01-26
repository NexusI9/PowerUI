// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { sort_by_hsl } from "@lib/utils/color";
import {
  classifyStyle,
  updateColor,
  updateFolderName,
  updateStyleName,
  addStyle,
  get_styles_of_folder,
  sort_by_name,
  duplicateFolder,
  updateText,
  createSet,
  paintStylesToCSS,
  textStylesToCss,
  updateStyle
} from "@lib/utils/style";

import {
  loadLocalFont,
  sortByFont,
  sortByScale,
  storeFonts
} from "@lib/utils/font.back";

import {
  DEFAULT_WINDOW_HEIGHT,
  DEFAULT_WINDOW_WIDTH,
  GET_PAINT_STYLES_COMMAND,
  GET_TEXT_STYLES_COMMAND
} from "@lib/constants";

import { TextDico } from "@ctypes/text";
import { exportPaintSet, exportTextSet } from "@lib/utils/export";

let systemFonts: TextDico;

figma.showUI(__html__, { themeColors: true });
figma.ui.resize(DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {


  const { action, payload } = msg;
  switch (action) {

    //styles references: https://www.figma.com/plugin-docs/api/figma/#styles
    case GET_PAINT_STYLES_COMMAND:
      figma.ui.postMessage({ action: action, styles: classifyStyle(figma.getLocalPaintStyles()) });
      break;

    case GET_TEXT_STYLES_COMMAND:
      figma.ui.postMessage({ action: action, styles: classifyStyle(figma.getLocalTextStyles()) });
      break;

    case 'UPDATE_FOLDER_NAME':
      updateFolderName(payload);
      break;

    case 'UPDATE_STYLE_NAME':
      updateStyleName(payload);
      break;

    case 'UPDATE_STYLE_COLOR':
      updateColor(payload);
      break;

    case 'UPDATE_STYLE_TEXT':
      updateText(payload);
      break;

    case 'ADD_STYLE':
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

    case 'SORT_STYLE_TEXT_SCALE':
      sortByScale(payload.folder.styles);
      break;

    case 'SORT_STYLE_TEXT_FONT':
      sortByFont(payload.folder.styles);
      break;

    case 'CREATE_SET':
      createSet(payload);
      break;

    case 'EDIT_SWATCH':
      payload.set?.forEach(updateStyle);
      break;

    case 'EDIT_FONT_SET':
      const editedFonts = payload.set?.map(async (style: TextStyle) => {
        await figma.loadFontAsync(style.fontName);
        return updateStyle(style);
      });
      //Manualy reload_page cause async process doesn't trigger document change listener
      Promise.all(editedFonts).then(() => figma.ui.postMessage({ action: 'RELOAD_PAGE' }));
      break;

    case 'RESIZE_WINDOW':
      figma.ui.resize(Math.max(payload.width, 540) || DEFAULT_WINDOW_WIDTH, Math.max(payload.height, 320) || DEFAULT_WINDOW_HEIGHT);
      break;

    case 'FONT_LIST':
      storeFonts(msg, systemFonts)
        .then(({ fonts }: { fonts: TextDico }) => {
          //Store fonts in global variable
          if (fonts && !systemFonts) { systemFonts = fonts }
          figma.ui.postMessage({ ...msg, payload: Object.keys(systemFonts) }); //only send font names (== keys of systemFonts)
        })
        .catch(() => figma.ui.postMessage({ ...msg, payload: [] }));
      break;

    case 'LOAD_FONT':
      loadLocalFont(msg, systemFonts)
        .then(msg => figma.ui.postMessage(msg))
        .catch(e => console.warn(e));
      break;

    case 'PAINT_CSS_STYLES':
      figma.ui.postMessage({ ...msg, payload: paintStylesToCSS(msg) });
      break;

    case 'TEXT_CSS_STYLES':
      figma.ui.postMessage({ ...msg, payload: textStylesToCss(msg) });
      break;

    case 'EXPORT_PAINT_SET':
      exportPaintSet(msg);
      break;

    case 'EXPORT_TEXT_SET':
      exportTextSet(msg);
      break;
  }

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


