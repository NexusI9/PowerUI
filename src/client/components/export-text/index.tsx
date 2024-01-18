import { ExportTextConfig } from "@ctypes/export.template"
import './index.scss';
import ArrowVertical from '@icons/vertical.svg';
import ArrowHorizontal from '@icons/horizontal.svg';
import { Icon } from "@components/icon";
import { ExportGroupText } from "@ctypes/text";
import { TextGroup } from "./textgroup";

export const ExportText = (props: ExportTextConfig) => {

    const groupMap: { [key: string]: { headline: string; fonts: Array<ExportGroupText> } } = {
        fontFamily: {
            headline: 'Font Family',
            fonts: [
                {
                    detail: {
                        topRow: 'Font Family Primary',
                        bottomRow: 'Inter'
                    },
                    body: { content: 'Inter', style: { fontSize: '24px' } }
                }
            ]
        },
        fontWeight: {
            headline: 'Font Weight',
            fonts: [
                {
                    detail: {
                        topRow: 'Font Weight Bold',
                        bottomRow: '800'
                    },
                    body: { content: 'Bold', style: { fontSize: '24px', fontWeight: 'bold' } }
                },
                {
                    detail: {
                        topRow: 'Font Weight Regular',
                        bottomRow: '400'
                    },
                    body: { content: 'Regular', style: { fontSize: '24px', fontWeight: 'regular' } }
                }
            ]
        },
        fontSize: {
            headline: 'Font Size',
            fonts: [
                {
                    detail: {
                        topRow: '52px (3.25em)',
                        bottomRow: <small className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</small>
                    },
                    body: { content: 'Header 1', style: { fontSize: '52px' } }
                },
                {
                    detail: {
                        topRow: '32px (2em)',
                        bottomRow: <small className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</small>
                    },
                    body: { content: 'Header 2', style: { fontSize: '32px' } }
                },
                {
                    detail: {
                        topRow: '24px (1.5em)',
                        bottomRow: <small className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</small>
                    },
                    body: { content: 'Header 3', style: { fontSize: '24px' } }
                }
            ]
        }
    };

    return (<div className="export-text">
        {props.fontFamily && <TextGroup {...groupMap.fontFamily} />}
        {props.fontWeight && <TextGroup {...groupMap.fontWeight} />}
        <TextGroup {...groupMap.fontSize} />
    </div>);
}