customElements.define(
    "fit-text",
    class extends HTMLElement {
        constructor() {
            super()
                .attachShadow({ mode: "open" })
                .innerHTML = `<div id=o><div id=i><slot></slot></div></div>` +
                `<style>#i{display:inline-block;white-space:nowrap}</style>`;
        }
        disconnectedCallback() {
            this.r(); // remove "resize" listener
            this.f(); // remove font "loadingdone" listener
        }
        connectedCallback() {
            let inner = this.shadowRoot.querySelector("#i");
            let outer = this.shadowRoot.querySelector("#o");
            let animationFrame; // declare all LET in one batch
            // FUNCTION: addListener - return a function that removes the listener
            let addListener = (
                root,
                event,
                callback,
                _ = root.addEventListener(event, callback) // add listener, saves a return statement
            ) => () => root.removeEventListener(event, callback);
            // FUNCTION: resizeText - resizes the text
            let resizeText = () => {
                cancelAnimationFrame(animationFrame);
                animationFrame = requestAnimationFrame(() =>
                    inner.style.fontSize =
                    (outer.clientWidth / inner.scrollWidth)
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