import './index.scss';
import { ContextMenuCommand, Folder as FolderInterface } from '@ctypes/contextmenu';
import { OptionsRow } from '@components/options-row';
import Move from '@icons/move.svg';
import Carrot from '@icons/carrot.svg';
import { Option as OptionInterface } from '@ctypes/contextmenu';
import { useMemo, useState } from 'react';
import Add from '@icons/add.svg';
import Pen from '@icons/pencil.svg';
import Kebab from '@icons/kebab-vertical.svg';
import { Input } from '@components/input';
import { send } from '@lib/ipc';
import { useDispatch } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/slice.contextmenu';

export const Folder = ({
    title,
    children,
    hideHeader = false,
    allowEdit = true,
    custom,
    attributes,
    level,
    root = false
}: FolderInterface
) => {



    const dispatch = useDispatch();
    const [display, setDisplay] = useState(true);
    const DEFAULT_COMMANDS: Array<ContextMenuCommand> = [
        { text: 'Duplicate folder', action: 'DUPLICATE_FOLDER', payload: {} },
        { text: 'Delete folder', action: 'DELETE_FOLDER', payload: {} }
    ];

    const contextMenuItems = useMemo(() => {
        let menu: Array<ContextMenuCommand> | Array<Array<ContextMenuCommand>> = DEFAULT_COMMANDS;

        if (custom?.options?.kebab) {
            menu = [menu];
            menu = menu.concat([custom.options.kebab]) //concat eventuals custom options
        }

        return menu.map((item) =>
            Array.isArray(item) ?
                item.map(it => ({ ...it, payload: { folder: attributes } })) :
                ({ ...item, payload: { folder: attributes } }));;
    }, [attributes]);

    const folderIconMap: Array<OptionInterface> = [
        { icon: Move, onClick: () => 0 },
        { icon: Carrot, onClick: () => setDisplay(!display) }
    ];




    const editIconMap: Array<OptionInterface> = [
        { icon: Pen, onClick: () => 0, disabled: !allowEdit },
        { icon: custom?.options?.add?.icon || Add, onClick: () => 0 },
        { icon: Kebab, onClick: (e: any) => dispatch(displayContextMenu({ commands: contextMenuItems, position: { x: e.clientX, y: e.clientY } })) }
    ];


    const handleOnBlur = (e: any) => {

        const newName = e.target.value;
        const oldName = attributes.title;
        if (newName !== oldName) {
            send({ action: 'UPDATE_STYLE_FOLDER', level, newName, folder: attributes });
        }
    }

    return (
        <div className={`folder flex f-col ${!display && 'hide' || ''} ${root && 'root' || ''}`}>
            {!hideHeader && <div className='folder-header flex f-row'>
                <div className="folder-header-left flex f-row gap-s">
                    <OptionsRow options={folderIconMap} className='folder-grab' />
                    <Input value={title} type='discrete' onBlur={handleOnBlur} onEnter={handleOnBlur} />
                </div>
                <OptionsRow options={editIconMap} />
            </div>
            }
            <div className={`folder-body flex f-col gap-m`}>
                {children}
            </div>
        </div>
    );
}