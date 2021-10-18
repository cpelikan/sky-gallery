export const eventEmit = (elem: HTMLElement, eventName: string, detail?: {}) =>{
    let event = new CustomEvent(eventName, {
        detail: detail
    });
    elem.dispatchEvent(event);
}