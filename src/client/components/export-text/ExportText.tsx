import { ExportTextConfig } from "@ctypes/export.template"
import './ExportText.scss';
import ArrowVertical from '@icons/vertical.svg';
import ArrowHorizontal from '@icons/horizontal.svg';
import { Icon } from "@components/icon";
import { ExportGroupText } from "@ctypes/text";
import { TextGroup } from "./TextGroup";
import { DEFAULT_TYPEFACE } from "@lib/constants";

export default (props: ExportTextConfig) => {

    const typeface = typeof props.typeface === "string" && props.typeface || DEFAULT_TYPEFACE;
    const groupMap: { [key: string]: { headline: { content: string; style?: any }; fonts: Array<ExportGroupText> } } = {
        fontFamily: {
            headline: {
                content: 'Font Family',
                style: { fontFamily: typeface }
            },
            fonts: [
                {
                    detail: {
                        topRow: 'Font Family Primary',
                        bottomRow: 'Inter',
                        style: { fontFamily: typeface }
                    },
                    body: { content: 'Inter', style: { fontSize: '24px' } }
                }
            ]
        },
        fontWeight: {
            headline: {
                content: 'Font Weight',
                style: { fontFamily: typeface }
            },
            fonts: [
                {
                    detail: {
                        topRow: 'Font Weight Bold',
                        bottomRow: '800',
                        style: { fontFamily: typeface }
                    },
                    body: { content: 'Bold', style: { fontSize: '24px', fontWeight: 'bold' } }
                },
                {
                    detail: {
                        topRow: 'Font Weight Regular',
                        bottomRow: '400',
                        style: { fontFamily: typeface },
                    },
                    body: { content: 'Regular', style: { fontSize: '24px', fontWeight: 'regular' } }
                }
            ]
        },
        fontSize: {
            headline: {
                content: 'Font Size',
                style: { fontFamily: typeface }
            },
            fonts: [
                {
                    detail: {
                        topRow: '52px (3.25em)',
                        bottomRow: <span className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</span>,
                        style: { fontFamily: typeface }
                    },
                    body: { content: 'Header 1', style: { fontSize: '52px' } }
                },
                {
                    detail: {
                        topRow: '32px (2em)',
                        bottomRow: <span className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</span>,
                        style: { fontFamily: typeface }
                    },
                    body: { content: 'Header 2', style: { fontSize: '32px' } }
                },
                {
                    detail: {
                        topRow: '24px (1.5em)',
                        bottomRow: <span className="flex f-row gap-s f-center-h"><Icon icon={ArrowVertical} />1.2 &nbsp; <Icon icon={ArrowHorizontal} />0%</span>,
                        style: { fontFamily: typeface }
                    },
                    body: { content: 'Header 3', style: { fontSize: '24px' } }
                }
            ]
        }
    };

    return (<div className="export-text flex f-col gap-m full-height f-center-h">
        <p className="text-color-discrete"><small>Template preview</small></p>
        <div className="export-text-template">
            {props.fontFamily && <TextGroup {...groupMap.fontFamily} />}
            {props.fontWeight && <TextGroup {...groupMap.fontWeight} />}
            <TextGroup {...groupMap.fontSize} />
        </div>
    </div>);
}