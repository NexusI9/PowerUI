import { Font } from "@components/font";
import { Style } from "@templates/style";
import FontPlus from '@icons/font-plus.svg';
import { DEFAULT_STYLE_TEXT, GET_TEXT_STYLES_COMMAND } from "@lib/constants";
import { FolderOptions } from "src/types/folder";
import { StyleFolder } from "src/types/style";
import { useDispatch, useSelector } from "react-redux";
import SetIcon from '@icons/font-set.svg';
import { switchDisplay } from "@lib/slices/style";
import { send } from "@lib/ipc";

//configs
import { CREATE_FONT_SET_CONFIG, EDIT_FONT_CONFIG } from "./workbench.config";
import { EXPORT_FONT_CONFIG } from "./export.config";
import { DEV_FONT_CONFIG } from "./dev.config";

//Reducer dispatch
import { init as initWorkbench } from "@lib/slices/workbench.template";
import { init as initExport } from "@lib/slices/export.template";
import { init as initDev } from "@lib/slices/dev.template";
import { useEffect } from "react";


export default () => {

    const dispatch = useDispatch();

    //listen to context menu active commmand to dispatch Dev or Export floating window
    const onCreateFont = (folder: StyleFolder) => {
        dispatch(initWorkbench({ ...CREATE_FONT_SET_CONFIG, folder }));
        dispatch(switchDisplay('list'));
    }
    const onExportFont = (folder: StyleFolder) => dispatch(initExport({ ...EXPORT_FONT_CONFIG, folder }));
    const onDevFont = (folder: StyleFolder) => dispatch(initDev({ ...DEV_FONT_CONFIG, folder }));
    const onEditFont = (folder: StyleFolder) => dispatch(initWorkbench({ ...EDIT_FONT_CONFIG, folder: folder, config: { styles: folder.styles as any } }))
   
    //listen to context menu active commmand to dispatch Dev or Export floating window
    const activeCommand = useSelector((state: any) => state.contextmenu.activeCommand);
    useEffect(() => {
        if (activeCommand && activeCommand.payload) {
            const { action, payload: { folder } } = activeCommand;
            if (action && folder) {
                const commandDispatch = {
                    'INIT_EXPORT': onExportFont,
                    'INIT_DEV': onDevFont
                }
                try { commandDispatch[action as keyof typeof commandDispatch](folder); } catch (e) { console.log(`Couldn't dispatch, didn't find a key ${action}`); }
            }
        }
    }, [activeCommand]);

    const padConfig = {
        icon: FontPlus,
        value: 'Create Fonts Set',
        onClick: onCreateFont
    };


    const options: FolderOptions = {
        header: {
            button: { iconLeft: SetIcon, onClick: onCreateFont, value: 'New Set', role: 'TERTIARY' },
            export: { onClick: onExportFont },
            dev: { onClick: onDevFont }
        },
        folder: {
            add: { icon: SetIcon, onClick: onCreateFont },
            kebab: [
                [
                    { value: 'Sort by name', action: 'SORT_STYLE_NAME', payload: {}, receiver: 'API' },
                    { value: 'Sort by scale', action: 'SORT_STYLE_TEXT_SCALE', payload: {}, receiver: 'API' },
                    { value: 'Sort by font', action: 'SORT_STYLE_TEXT_FONT', payload: {}, receiver: 'API' }
                ],
                [
                    { value: 'Export styles', action: 'INIT_EXPORT', receiver: 'STORE', icon: 'upload' },
                    { value: 'See code', action: 'INIT_DEV', receiver: 'STORE', icon: 'dev' },
                ]
            ],
            edit: { onClick: onEditFont }
        }
    };

    const handleAddItem = ({ name }: { name: string }) => send({ action: "ADD_STYLE", payload: { name, style: DEFAULT_STYLE_TEXT } });

    return (
        <Style
            title="Fonts"
            onAddItem={handleAddItem}
            padStyle={padConfig}
            getStyleMethod={GET_TEXT_STYLES_COMMAND}
            styleItem={Font}
            options={options}
        />
    );
}