export function freezeScroll(elements:Array<string>, freeze:boolean){
    elements.forEach( className => {
        if(freeze){
            document.querySelector(className)?.classList.add('freeze-scroll');
        }else{
            document.querySelector(className)?.classList.remove('freeze-scroll');
        }
    });
}