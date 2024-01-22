import { ExportGroupText } from "@ctypes/text";

export const TextItem = (props: ExportGroupText) => (
    <div className="export-text-template-item">
        <div className="export-text-template-detail flex f-col">
            {<p {...(props.detail.style && { style: props.detail.style })}><small>{typeof props.detail.topRow === 'string' && props.detail.topRow || props.detail.topRow}</small></p>}
            {<p {...(props.detail.style && { style: props.detail.style })}><small>{typeof props.detail.bottomRow === 'string' && props.detail.bottomRow || props.detail.bottomRow}</small></p>}
        </div>
        <p {...(props.body.style && { style: props.body.style })}>{props.body.content}</p>
    </div>
);