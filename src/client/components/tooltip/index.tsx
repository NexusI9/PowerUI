import { useState } from 'react';
import './index.scss';
import { useSelector } from 'react-redux';
import { ToolTipItem } from '@lib/interfaces';
import { Input } from '@components/input';
import { send } from '@lib/ipc';


export const Tooltip = () => {

    const { content, boundingBox } = useSelector((state: any) => state.tooltip);

    console.log({ content, boundingBox });

    return (<div className='tooltip' data-display={!!content.length}>
        {content?.map((content: ToolTipItem, i: number) => {
            switch (content.type) {

                case 'INPUT':
                    return <Input
                        key={JSON.stringify(content) + i}
                        onBlur={() => send({ type: content.action, ...content.payload })}
                        value={content.value}
                        placeholder=''
                    />

                case 'TEXT':
                    return <p key={JSON.stringify(content) + i} ><small>{content.value}</small></p>

                default:
                    return null;
            }
        })}
    </div>);

}