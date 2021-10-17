
import { DataImage } from '@models';
import { fetchData/*, CATEGORIES*/, getIndexFetch } from '../../service/fetch-data';
import { SkyImg } from '../sky-image/sky-image';
import { SkyLoader } from '../sky-loader/sky-loader';

export class SkyGallery extends HTMLElement {
    
  private shadowDOM = this.attachShadow({mode: 'closed'});
  private loader = new SkyLoader;
  private galleryRoot = document.createElement('div');

  constructor(){ 
    super();       
      
    let style: any = `
      <style>
          :host{
              display:block;
          }
      </style>    
    `;
    this.shadowDOM.innerHTML = style;
      
    this.shadowDOM.appendChild(this.galleryRoot);

      
    //const template = document.createElement('template');
      
  }

  async connectedCallback() {
    this.shadowDOM.appendChild(this.loader)
    this.infiniteScroll();
  }

  async getDataSet(){
    this.loader.active = true;
    const data = await fetchData();
    this.loader.active = false;
    this.drawImages(data);
  }

  drawImages(data: DataImage[]){
    const imgNum: number = data.length;
    const counter: string[] = [];
    
    const handlerProxy = {
      
       // => rev type any
      set: (target:any, property:any, value:any, receiver:any) =>{   
        //console.log("Set %s to %o", property, value, counter, imgNum);   
        target[property] = value;
        this.proxyFetch([
                  counter.length === imgNum,
                  !!Number(property),
                  this.getBoundingClientRect().height + this.getBoundingClientRect().y < window.innerHeight
        ]);
        return true;
      }
    }
    
    const proxyCounter = new Proxy(counter, handlerProxy);
    

    data.forEach((dataImg: DataImage)=>{
        const img = new SkyImg;
        img.prop = dataImg;
        this.galleryRoot.appendChild(img);
        img.addEventListener('load', (evt)=> {
          evt.stopPropagation();
          proxyCounter.push(true);
        
        })
        img.addEventListener('error', (evt)=> {
          evt.stopPropagation();
          proxyCounter.push(true);
          
        })
    })
    
  }

  proxyFetch(checklist: boolean[]){
    checklist.push(getIndexFetch() !== null);
    checklist.push(!this.loader.active);
   
    if(checklist.every(check => !!check)){
      this.getDataSet();
    }
  }

  infiniteScroll(){
    const limit:HTMLElement = document.createElement('hr');
    
    this.shadowDOM.appendChild(limit);
      
      // => rev type any
      const handleIntersect = (entries: any) =>  {
        
        entries.forEach((entry:any) => {
          
          this.proxyFetch([
                              (entry.isIntersecting)
          ])
      });
    }
    
    let observer = new IntersectionObserver(handleIntersect);
    observer.observe(limit);
  }

}

customElements.define('sky-gallery', SkyGallery);
