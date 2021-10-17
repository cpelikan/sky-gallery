import { DataImage } from '@models';
import { EventEmit } from '../../service'; 

export class SkyImg extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'closed'});
    private _prop: DataImage; 
    
    get prop() {
        return this._prop;
    }
    set prop(prop) {
        this._prop = prop;
    }

    constructor(){
        super();
        let style: any = `
        <style>
            :host{
                display:inline-block;
                height:15rem;
                widht:15rem;
                padding:1rem;
            }
        </style>    
      `;
      this.shadowDOM.innerHTML = style;
    }

    connectedCallback(){
        const img = document.createElement('img');
        img.src = this.prop?.thumb;

        img.addEventListener('load', (evt)=> EventEmit(this, evt.type));
        img.addEventListener('error', (evt)=> EventEmit(this, evt.type));
        
        this.shadowDOM.appendChild(img)
    }
}

customElements.define('sky-img', SkyImg);