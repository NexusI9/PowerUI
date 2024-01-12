export interface ContrastPropreties {
    ratio: number;
    large: 'AAA' | 'AA' | undefined;
    regular: 'AAA' | 'AA' | undefined;
}

export interface Contrast {
    black: ContrastPropreties;
    white: ContrastPropreties;
}

export interface ShadeSet extends Partial<PaintStyle> {
    type: 'PAINT';
    contrast: Contrast;
    primary?: boolean;
    index?: number | string;
}