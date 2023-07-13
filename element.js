customElements.define("fit-text", class extends HTMLElement {
    constructor() {
        super().attachShadow({ mode: "open" }).innerHTML = `<slot style=display:inline-block />` +
            `<style>:host{display:inline-block;width:100%;white-space:nowrap}</style>`
    }
    connectedCallback(// define variables and functions as parameters to save LET declarations
        slot = this.shadowRoot.querySelector("slot"),
        // FUNCTION resizes the text to fit the <fit-text> element
        fit = () => setTimeout(() => this.style.fontSize = parseInt(getComputedStyle(slot).fontSize) * (this.clientWidth / slot.scrollWidth) + "px"),
        // FUNCTION add listener; return removeEventListener function
        event = (name, _ = addEventListener(name, fit)) => () => removeEventListener(name, fit)
    ) {
        this.r = event("resize") // fit when the window resizes
        this.l = event("loadingdone") // fit when fonts load
        fit() // fit the text on first load
    }
    disconnectedCallback() {
        this.r() // remove "resize" listener
        this.l() // remove font "loadingdone" listener
    }
})