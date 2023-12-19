import './index.scss';
import { Folder as FolderInterface } from '@lib/interfaces';
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

export const Folder = ({
    title,
    children,
    hideHeader = false,
    allowEdit = true,
    custom,
    attributes,
    level
}: FolderInterface
) => {

    const [display, setDisplay] = useState(true);

    const folderIconMap: Array<OptionInterface> = [
        { icon: Move, onClick: () => 0 },
        { icon: Carrot, onClick: () => setDisplay(!display) }
    ];

    const editIconMap: Array<OptionInterface> = [
        { icon: Pen, onClick: () => 0, disabled: !allowEdit },
        { icon: custom?.generateIcon || SwatchIcon, onClick: () => 0 },
        { icon: Kebab, onClick: () => 0 }
    ];



    const handleOnBlur = (e:any) => {

        const currentFolder = attributes.title;
        const folder = e.target.value;
        const styles = attributes.styles;

        if(currentFolder !== folder){
            send({type:'UPDATE_STYLE_FOLDER_NAME', level, folder, styles});
        }

    }

    return (
        <div className={`folder flex f-col ${!display && 'hide' || ''}`}>
            {!hideHeader && <div className='folder-header flex f-row'>
                <div className="folder-header-left flex f-row gap-s">
                    <OptionsRow options={folderIconMap} className='folder-grab' />
                    <Input value={title} type='discrete' onBlur={handleOnBlur}/>
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