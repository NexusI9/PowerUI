export function get(request:{}){

    return new Promise((resolve, reject) => {
        parent.postMessage( { pluginMessage: request }, "*" );

        const callback = ({data:{pluginMessage}}:{data:{pluginMessage:any}}) => {
            resolve(pluginMessage);
            window.removeEventListener("message", callback);
        };

        window.addEventListener("message", callback);
    });

}

