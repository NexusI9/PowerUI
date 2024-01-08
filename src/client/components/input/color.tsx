export const Color = ({ onChange, onClick, style }: any) => (
    <label {...(style && {style:style})} >
        <input type='color' onChange={onChange || void 0} onClick={onClick || void 0} />
    </label>
)