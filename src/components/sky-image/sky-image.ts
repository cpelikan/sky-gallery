import { DataImage } from "@models";

export class SkyImg extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'closed'});
    private _prop: DataImage; 
    
    get prop() {
        return this._prop;
    }
    set prop(prop) {
        this._prop = prop;
    }

    connectedCallback(){
        const img = document.createElement('img');
        
        img.src = this.prop?.thumb;
        this.shadowDOM.appendChild(img)
    }
}

customElements.define('sky-img', SkyImg);