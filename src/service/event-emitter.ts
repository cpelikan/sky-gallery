export const eventEmit = (elem: HTMLElement, eventName: string) =>{
    let event = new Event(eventName);
    elem.dispatchEvent(event);
}