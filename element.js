customElements.define("fit-text", class extends HTMLElement {
    constructor() {
        super().attachShadow({ mode: "open" }).innerHTML = `<slot style=display:inline-block />` +
            `<style>:host{display:inline-block;width:100%;white-space:nowrap}</style>`
    }
    connectedCallback(// define variables and functions as parameters to save LET declarations
        slot = this.shadowRoot.querySelector("slot"),
        // FUNCTION resizes the text
        resize = () => requestAnimationFrame(() => this.style.fontSize = parseInt(getComputedStyle(slot).fontSize) * (this.clientWidth / slot.scrollWidth) + "px"),
        // FUNCTION add listener; return removeEventListener function
        event = (name, _ = addEventListener(name, resize)) => () => removeEventListener(name, resize)
    ) {
        this.shadowRoot || this
        this.r = event("resize")
        this.l = event("loadingdone")
        resize() // resize the text on first load
    }
    disconnectedCallback() {
        this.r() // remove "resize" listener
        this.l() // remove font "loadingdone" listener
    }
})