
import { fetchData } from '../../service'
import { SkyImg } from '../sky-image/sky-image'

export class SkyGallery extends HTMLElement {
    
    private shadowDOM = this.attachShadow({mode: 'closed'});

    constructor(){
        super();       
        
        const galleryRoot = document.createElement('div')    
        galleryRoot.innerHTML = 'Hello Gallery';
        
        this.shadowDOM.appendChild(galleryRoot)

       
        //const template = document.createElement('template');


        
    }

    async connectedCallback() {

        const data = await fetchData()
        
        data.forEach((dataImg)=>{
            const img = new SkyImg;
            img.prop = dataImg;
            
            this.shadowDOM.appendChild(img)
        })

    
      }
}

customElements.define('sky-gallery', SkyGallery);
