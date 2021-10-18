
import { DataImage } from '@models';
import { fetchData/*, CATEGORIES*/, getIndexFetch, resetIndexFetch } from '../../service/fetch-data';
import { SkyFilter } from '../sky-filter/sky-filter';
import { SkyImg } from '../sky-image/sky-image';
import { SkyLoader } from '../sky-loader/sky-loader';
import { IMAGES_NOT_FOUND } from '../../dictionary/dictionary';

export class SkyGallery extends HTMLElement {
    
  private shadowDOM = this.attachShadow({mode: 'closed'});
  private loader = new SkyLoader;
  private filter = new SkyFilter;
  private galleryRoot = document.createElement('div');
  private state = {
    filter : ''
  }

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
  }

  async connectedCallback() {
    this.shadowDOM.appendChild(this.filter)
    this.shadowDOM.appendChild(this.galleryRoot);
    this.shadowDOM.appendChild(this.loader)
    this.infiniteScroll();

    this.addListeners();
  }

  async getDataSet(){
    
    this.loader.active = true;
    const data = await fetchData(this.state.filter);
    this.loader.active = false;
    
    (!!data?.length) ? 
          this.drawImages(data) : 
          this.showMessage();
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
    const checkRules = [
      !!this.state.filter,
      getIndexFetch() !== null,
      !this.loader.active,
      ...checklist
    ]
   
    if(checkRules.every(check => !!check)){
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

  showMessage(){
    if(this.galleryRoot.innerHTML === ''){
      const message = document.createElement('h2');
      message.innerHTML = IMAGES_NOT_FOUND(this.state.filter);
      this.galleryRoot.appendChild(message);
    }
  }

  addListeners(){
    this.filter.addEventListener('valueChange', (evt: CustomEvent)=>{
      this.state.filter = evt.detail?.value;
      this.galleryRoot.innerHTML = '';
      resetIndexFetch();
      this.proxyFetch([]);
    });

  }

}

customElements.define('sky-gallery', SkyGallery);
