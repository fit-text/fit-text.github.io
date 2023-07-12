customElements.define(
    "fit-text",
    class extends HTMLElement {
        constructor() {
            super()
                .attachShadow({ mode: "open" })
                .innerHTML = `<div><slot></slot></div>` +
                `<style>:host{display:inline-block;width:100%}div{display:inline-block;white-space:nowrap}</style>`;
        }
        disconnectedCallback() {
            // clean up all EventListeners
            this.r(); // remove "resize" listener
            this.f(); // remove font "loadingdone" listener
        }
        connectedCallback() {
            let addListener = (
                root,
                event,
                callback,
                _ = root.addEventListener(event, callback) // add listener, saves a return statement
            ) => () => root.removeEventListener(event, callback);
            let inner = this.shadowRoot.querySelector("div");
            let animationFrame; // declare all LET in one batch
            // FUNCTION: addListener - return a function that removes the listener
            // FUNCTION: resizeText - resizes the text
            let resizeText = () => {
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(() =>
                    this.style.fontSize =
                    (this.clientWidth / inner.scrollWidth)
                    *
                    parseInt(getComputedStyle(inner).fontSize) + "px"
                )
            }
            // create listeners and removeListener functions
            this.r = addListener(window, "resize", resizeText);
            this.f = addListener(document.fonts, "loadingdone", resizeText);
            //now resize the text on first load
            resizeText();
        }
    }
)