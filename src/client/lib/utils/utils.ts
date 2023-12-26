export function clone(val: any) {
    return JSON.parse(JSON.stringify(val))
}

export function clamp(min: number, value: number, max: number): number {
    if (value <= min) { return min; }
    if (value >= max) { return max; }
    return value;
}


export function isNumber(value:string){
    return !Number.isNaN(Number(value))
}

export function lastIndexOfArray(array:Array<any>, fallback?:any){
    return array.slice(-1)[0] || fallback ;
}
