import view  from './sky-loader.html';
import stylesheet from './sky-loader.scss'; 
export class SkyLoader extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'closed'});
    public _active: boolean = false; 

    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.toggleAttribute('hidden', !active)
    }

    constructor(){
        super();
        let style: any = `
        <style>           
            ${stylesheet}
        </style>      
      `;
      this.shadowDOM.innerHTML = style;
        const html = document.createElement('div');
        html.innerHTML = `${view} <span>Loading</span>`;
        this.setAttribute('hidden', "true"); //PATCH TO BE RECACT
        this.shadowDOM.appendChild(html)
    }

}

customElements.define('sky-loader', SkyLoader);