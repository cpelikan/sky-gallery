import stylesheet from './sky-theme.scss'; 
import darkTheme from './dark-theme.scss'; 
import ligthTheme from './ligth-theme.scss'; 

export class SkyTheme extends HTMLElement {

    private shadowDOM = this.attachShadow({mode: 'closed'});
    
    private LABELS: any = {
        0 : `<span>Dark</span> Theme`,
        1: `<span>Ligth</span> Theme`
    }

    private getNodeName = ()=> this.nodeName.replace('-', '_');

    private status: number = 0;

    private THEME: any = {
        0 : ligthTheme,
        1 : darkTheme
    }

    constructor(){
        super();
        
        let view: any = `
            <style>           
                ${stylesheet}
            </style>                  
            <label class="theme">
                <input class="theme-checkbox" type="checkbox" id="switchTheme">
                <div class="theme-switch"></div>
                <span data-role="label" class="theme-label">${this.LABELS[this.status]}</span>
            </label>
        `;

        this.shadowDOM.innerHTML = view;
    
    }

    connectedCallback(){
        const btn = <HTMLInputElement> this.shadowDOM.getElementById('switchTheme');
        btn.addEventListener('change', ()=>{
            this.status = btn.checked ? 1 : 0;
            this.shadowDOM.querySelector('[data-role="label"]').innerHTML = this.LABELS[this.status];
            
            const theme = document.getElementById(this.getNodeName());
            theme.innerHTML = '';
            theme.innerHTML = this.THEME[this.status ? 0 : 1];
            
            this.swithTheme();
        });
        
        this.initTheme();
    }

    initTheme(){
        const theme = document.createElement('style');
        theme.id = this.getNodeName();
        theme.appendChild(document.createTextNode(this.THEME[1]));
        document.head.appendChild(theme)
    }

    swithTheme(){

    }

}

customElements.define('sky-theme', SkyTheme);