import stylesheet from './sky-full.scss'; 

import { BaseDataImage, MediaType } from '@models';
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
          ${stylesheet}
        </style>    
      `;
      this.shadowDOM.innerHTML = style;
    }

    connectedCallback(){
        
        const media: HTMLElement = this.getMedia(this.prop.mediaType);
        
        const text = document.createElement('p');
        text.innerText = this.prop.title;
        this.shadowDOM.appendChild(media);
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

    getMedia(mediaType: MediaType){

        let elem;
        switch (mediaType) {
        default:
        case 'image':
            elem = document.createElement('img');
            elem.src = this.prop.full;
            break;
        case 'rich:video':
        case 'hosted:video':    
            const img = document.createElement('img');
            img.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7wODIABmDLcp9sin2YAPs1NIjvszHnPknmQ&usqp=CAU';
            elem = document.createElement('a');
            elem.href = this.prop.full;
            elem.target = '_blank';
            elem.className='thumb';
            elem.append(img)    
            break;
           
        }

       
      

        return elem;
      
    }
}

customElements.define('sky-full', SkyFull);