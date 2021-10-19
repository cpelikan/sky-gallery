import stylesheet from './sky-image.scss'; 

import { DataImage } from '@models';
import { eventEmit } from '../../service'; 
import { SkyFull } from '../sky-full/sky-full';

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
            ${stylesheet}
        </style>    
      `;
      this.shadowDOM.innerHTML = style;
    }

    connectedCallback(){
        const img: HTMLImageElement = document.createElement('img');
        img.src = this.prop?.thumb;
        img.width = this.prop?.width;
        img.height = this.prop?.height;
        img.className = 'frame';


        img.addEventListener('load', (evt)=> eventEmit(this, evt.type));
        img.addEventListener('error', (evt)=> eventEmit(this, evt.type));
        img.addEventListener('click', ()=> this.goFullScreen(this.prop));
        this.shadowDOM.appendChild(img);
    }

    goFullScreen({full, title}: DataImage){
        const fullScreen = new SkyFull;
        fullScreen.prop = {full, title}
        document.body.appendChild(fullScreen);
    }

}

customElements.define('sky-img', SkyImg);