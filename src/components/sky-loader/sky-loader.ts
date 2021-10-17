
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
            :host{
                position: fixed;
                bottom: 0;
                left:0;
                right:0;
                height:5rem;
                padding:1rem;
                backgroud:rgba(255,255,255,.59);
                font-size:3rem;
                text-align:right;
            }
        </style>    
      `;
      this.shadowDOM.innerHTML = style;
        const html = document.createElement('div');
        html.innerHTML = 'Loading...';
        this.shadowDOM.appendChild(html)
    }

}

customElements.define('sky-loader', SkyLoader);