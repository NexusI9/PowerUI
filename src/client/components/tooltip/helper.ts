export function convertPayload(payload:any, value:any): Object{

    Object.keys(payload).map(key => {
        if(payload[key as keyof typeof payload] === null){
            payload[key as keyof typeof payload] = value;
        }
    });

    return payload;
}