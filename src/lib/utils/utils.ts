export function clone(val: any) {
    return JSON.parse(JSON.stringify(val))
}

export function shallowClone(obj: any) {
    let copy: { [key: string]: any } = {};
    for (let key in obj) { copy[key] = obj[key as keyof typeof obj]; }
    return copy || obj;
}

export function clamp(min: number, value: number, max: number): number {
    if (value <= min) { return min; }
    if (value >= max) { return max; }
    return value;
}


export function isNumber(value: string) {
    return !Number.isNaN(Number(value))
}

export function lastIndexOfArray(array: Array<any>, fallback?: any) {
    return array.slice(-1)[0] || fallback;
}


export function traverseCallback(object: any, callback: any, index: number = 0): any {
    if (Array.isArray(object)) {
        return object.map((item: any, i: number) => traverseCallback(item, callback, i))
    } else {
        return callback(object, index);
    }
}

export const itemFromIndex = (active: number | Array<number>, list: Array<any> | Array<Array<any>>): any => {
    if (Array.isArray(active)) {
        return (list as Array<Array<any>>)[active[0]][active[1]];
    }
    return (list as Array<any>)[active];
};


export const envelop = (min: number, value: number, max: number = 1): number => min + (max - min) * value;

export const mix = (valueA: number, valueB: number, factor: number) => ((1 - factor) * valueA) + factor * ((valueA + valueB) / 2);
