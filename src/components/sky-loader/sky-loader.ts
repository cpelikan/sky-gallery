import view  from './sky-loader.html';
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
                background:rgba(255,255,255,0.59);
                font-size:3rem;
            }
            div{
                display:flex;
                justify-content: end;
            }

            .lds-ellipsis {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
            }
            .lds-ellipsis div {
                position: absolute;
                top: 33px;
                width: 13px;
                height: 13px;
                border-radius: 50%;
                background: #fff;
                animation-timing-function: cubic-bezier(0, 1, 1, 0);
            }
            .lds-ellipsis div:nth-child(1) {
                left: 8px;
                animation: lds-ellipsis1 0.6s infinite;
            }
            .lds-ellipsis div:nth-child(2) {
                left: 8px;
                animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(3) {
                left: 32px;
                animation: lds-ellipsis2 0.6s infinite;
                }
                .lds-ellipsis div:nth-child(4) {
                left: 56px;
                animation: lds-ellipsis3 0.6s infinite;
                }
                @keyframes lds-ellipsis1 {
                0% {
                    transform: scale(0);
                }
                100% {
                    transform: scale(1);
                }
                }
                @keyframes lds-ellipsis3 {
                0% {
                    transform: scale(1);
                }
                100% {
                    transform: scale(0);
                }
                }
                @keyframes lds-ellipsis2 {
                0% {
                    transform: translate(0, 0);
                }
                100% {
                    transform: translate(24px, 0);
                }
            }
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