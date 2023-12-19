import { useEffect } from "react";

export function send(request:any){
    parent.postMessage( { pluginMessage: request }, "*" );
}

export function get(request:any){

    return new Promise<any>((resolve, reject) => {
        send(request);

        const callback = ({data:{pluginMessage}}:{data:{type:string,pluginMessage:any}}):any => {

            if(!pluginMessage.type){
                return reject('No type has been set in API, make sure to return a type that is equal to the emitted message');
            }
            
            if(pluginMessage.type === request.type){
                resolve(pluginMessage);
                return window.removeEventListener("message", callback);
            }
        };

        window.addEventListener("message", callback);

    });


}




export function listen(callback:any){

    interface callbackInterface{
        data:{
            pluginMessage:any;
        };
    }

    const handleCallback = ({data:{pluginMessage}}:callbackInterface) => callback(pluginMessage);

    useEffect(() => {
        window.addEventListener("message", handleCallback)

       return () => window.removeEventListener("message", handleCallback)
    },[callback]);
}

