export function freezeScroll(elements: Array<string>, freeze: boolean) {
    elements.forEach(className => {
        if (freeze) {
            document.querySelector(className)?.classList.add('freeze-scroll');
        } else {
            document.querySelector(className)?.classList.remove('freeze-scroll');
        }
    });
}

export function setHeight(panel: any, y: number): number | undefined {
    panel.style.height = 'auto';
    const { height } = panel.getBoundingClientRect();
    const margin = 30;
    return (y + height > window.innerHeight) ? (window.innerHeight - y - margin) : undefined;
}

export function setPosition({ panel, panelY, scroll, offsetTop, id, commandid }: { panel: any, panelY: number, scroll: number, offsetTop: number, id: number, commandid: number }) {
    const newHeight = setHeight(panel, panelY);
    panel.style.height = newHeight && `${newHeight}px` || 'auto';  //Update height

    //assign scroll if activeCommand id === state id
    if (commandid === id) {
        if (scroll) panel.scrollTo(0, scroll); //Update scroll pos
        if (offsetTop) {
            const offset = panelY - offsetTop;
            const newPosition = (offset > 0) ? `${offset}px` : `${panelY - (newHeight || 0) / 2}px`;

            panel.style.top = newPosition; //Update panel top position
        }
    }
}