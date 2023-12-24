import './index.scss';
import { ContextMenuCommand, Folder as FolderInterface } from '@lib/interfaces';
import { OptionsRow } from '@components/options-row';
import Move from '@icons/move.svg';
import Carrot from '@icons/carrot.svg';
import { Option as OptionInterface } from '@lib/interfaces';
import { useState } from 'react';
import SwatchIcon from '@icons/swatch.svg';
import Pen from '@icons/pencil.svg';
import Kebab from '@icons/kebab-vertical.svg';
import { Input } from '@components/input';
import { send } from '@lib/ipc';
import { useDispatch } from 'react-redux';
import { display as displayContextMenu } from '@lib/slices/contextmenu.slice';

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

    const folderIconMap: Array<OptionInterface> = [
        { icon: Move, onClick: () => 0 },
        { icon: Carrot, onClick: () => setDisplay(!display) }
    ];

    const contextMenuItems:Array<ContextMenuCommand> = [
        {text: 'Duplicate folder', action:'DUPLICATE_FOLDER', payload:{folder:attributes}},
        {text: 'Delete folder', action:'DELETE_FOLDER', payload:{folder:attributes}}
    ]

    const editIconMap: Array<OptionInterface> = [
        { icon: Pen, onClick: () => 0, disabled: !allowEdit },
        { icon: custom?.generateIcon || SwatchIcon, onClick: () => 0 },
        { icon: Kebab, onClick: (e:any) => dispatch(displayContextMenu({commands:contextMenuItems, position:{x:e.clientX, y:e.clientY}})) }
    ];


    const handleOnBlur = (e: any) => {

        const newName = e.target.value;
        const oldName = attributes.title;
        if (newName !== oldName) {
            send({ type: 'UPDATE_STYLE_FOLDER', level, newName, folder: attributes });
        }
    }

    return (
        <div className={`folder flex f-col ${!display && 'hide' || ''} ${root && 'root' || ''}`}>
            {!hideHeader && <div className='folder-header flex f-row'>
                <div className="folder-header-left flex f-row gap-s">
                    <OptionsRow options={folderIconMap} className='folder-grab' />
                    <Input value={title} type='discrete' onBlur={handleOnBlur} />
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