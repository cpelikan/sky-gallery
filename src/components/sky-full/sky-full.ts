import { BaseDataImage } from '@models';
import { fullScreen, fullScreenExit } from '../../service';

export class SkyFull extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'closed'});
    private _prop: BaseDataImage; 
    
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
                display:flex;
                align-items: center;
                justify-content: center;
                flex-flow: column;
                padding:1rem;
            }

            img{
                max-width:100%;
                max-height:100%;
            }

            h1{
                color:#FFF;
            }
        </style>    
      `;
      this.shadowDOM.innerHTML = style;
    }

    connectedCallback(){
        
        const img = document.createElement('img');
        img.src = this.prop.full;
        
        const text = document.createElement('h1');
        text.innerText = this.prop.title;
        this.shadowDOM.appendChild(img);
        this.shadowDOM.appendChild(text);

        fullScreen(this);

        this.addEventListener('fullscreenchange', () => {
            if (!document.fullscreenElement) {
                this.parentNode.removeChild(this);
            }
        });

        this.addEventListener('click', () => {
            fullScreenExit()
        });
    }
}

customElements.define('sky-full', SkyFull);