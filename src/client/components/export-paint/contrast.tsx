export const Contrast = ({ color, ratio, AAA, AA }: { color: string, ratio: number, AAA: boolean, AA: boolean }) => (
    <div className="export-paint-contrast flex f-row f-center-h gap-xs">
        <span style={{ background: color || '#000000' }}></span>
        <p>{ratio}</p>
        {AAA && <p>AAA</p>}
        {AA && <p>AA</p>}
    </div>
);