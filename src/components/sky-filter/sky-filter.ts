import { eventEmit, debounce } from '../../service'; 

export class SkyFilter extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'open'});
    private input: HTMLInputElement;
    private delay: number = 500;
    
    private debouncedFilter: Function = debounce((value: string) => {
        eventEmit(this, 'valueChange', {
            value : value
        })
    }, this.delay);


    constructor(){
        super();
        let style: any = `
        <style>
            :host{
                display:inline-block;
            }

           
        </style>    
      `;
      this.shadowDOM.innerHTML = style;      
      this.input = document.createElement('input');
      this.input.type = 'text';
    }

    connectedCallback(){
        this.shadowDOM.appendChild(this.input);
        this.addListeners();
    }

    addListeners(){
        this.input.addEventListener('input', (evt: InputEvent)=>{
            evt.stopPropagation();
            const value = this.input.value;
            this.debouncedFilter(value);                     
        })
    }
    

}

customElements.define('sky-filter', SkyFilter);