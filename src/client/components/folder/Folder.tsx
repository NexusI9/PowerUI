import './Folder.scss';
import { ContextMenuCommand } from 'src/types/contextmenu';
import { Folder as IFolder, Option as IOption } from 'src/types/folder';
import { OptionsRow } from '@components/options-row';
import Move from '@icons/move.svg';
import Carrot from '@icons/carrot.svg';
import { useMemo, useState } from 'react';
import Add from '@icons/add.svg';
import Filter from '@icons/filter.svg'
import Kebab from '@icons/kebab-vertical.svg';
import { Input } from '@components/input';
import { send } from '@lib/ipc';
import { useDispatch } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/contextmenu';
import { MultiArray } from 'src/types/global';
import { traverseCallback } from '@lib/utils/utils';
import { Button as IButton } from '@ctypes/input';

export default ({
    title,
    children,
    hideHeader = false,
    allowEdit = true,
    options,
    attributes,
    level,
    root = false
}: IFolder
) => {

    const dispatch = useDispatch();
    const [display, setDisplay] = useState(true);
    const DEFAULT_COMMANDS: Array<ContextMenuCommand> = [
        { value: 'Duplicate folder', action: 'DUPLICATE_FOLDER', receiver: 'API' },
        { value: 'Delete folder', action: 'DELETE_FOLDER', receiver: 'API' },
        { value: 'Rename styles', action: 'INIT_RENAME', receiver: 'STORE' }
    ];

    const contextMenuItems = useMemo(() => {
        //set default commands
        let menu: MultiArray<ContextMenuCommand> = [
            DEFAULT_COMMANDS,
            ...options?.folder?.kebab || []
        ];

        //map folder to payload
        return traverseCallback(menu, (item: any) => ({ ...item, payload: { ...item.payload, folder: attributes } }));
    }, [attributes]);

    const folderIconMap: Array<IButton> = [
        //{ iconLeft: Move, onClick: () => 0, role: 'GHOST' }, //Temporary Remove move feature
        { iconLeft: Carrot, onClick: () => setDisplay(!display), role: 'GHOST' }
    ];


    const editIconMap: Array<IButton> = [
        {
            iconLeft: Filter,
            onClick: () => options?.folder?.edit?.onClick(attributes) || void 0,
            role: allowEdit ? 'GHOST' : 'DISABLED'
        },
        {
            iconLeft: options?.folder?.add?.icon || Add,
            onClick: () => options?.folder?.add?.onClick(attributes) || void 0,
            role: 'GHOST'
        },
        {
            iconLeft: Kebab,
            onClick: (e: any) => dispatch<any>(displayContextMenu({ commands: contextMenuItems, position: { x: e.clientX, y: e.clientY } })),
            role: 'GHOST'
        }
    ];


    const handleOnBlur = (e: any) => {

        const newName = e.target.value;
        const oldName = attributes.name;

        if (newName !== oldName) {
            send({ action: 'UPDATE_FOLDER_NAME', payload: { level, name: newName, folder: attributes } });
        }
    }

    return (
        <div className={`folder flex f-col ${!display && 'hide' || ''} ${root && 'root' || ''}`}>
            {!hideHeader && <div className='folder-header flex f-row'>
                <div className="folder-header-left flex f-row">
                    <OptionsRow options={[folderIconMap]} className='folder-grab' />
                    <Input value={title} appearance={{ minified: true, stroke: false }} onBlur={handleOnBlur} onEnter={handleOnBlur} />
                </div>
                <OptionsRow options={[editIconMap]} />
            </div>
            }
            <div className={`folder-body flex f-col gap-m`}>
                {children}
            </div>
        </div>
    );
}